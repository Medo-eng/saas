// This file is meant for Vercel Serverless Functions deployment.
// Place at: /api/paddle-webhook.js when deploying to Vercel.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;

    // Paddle sends different event types
    // We care about: subscription.activated, subscription.created, transaction.completed
    const eventType = event?.event_type || event?.alert_name;
    
    console.log(`[Paddle Webhook] Received: ${eventType}`);

    // Extract customer/visitor info from Paddle payload
    const passthrough = event?.data?.custom_data || JSON.parse(event?.passthrough || '{}');
    const visitorId = passthrough?.visitor_id;

    if (!visitorId) {
      console.warn('[Paddle Webhook] No visitor_id in passthrough data');
      return res.status(200).json({ received: true, warning: 'No visitor_id' });
    }

    // Update user to premium
    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: true, updated_at: new Date().toISOString() })
      .eq('visitor_id', visitorId);

    if (error) {
      console.error('[Paddle Webhook] Supabase error:', error);
      return res.status(500).json({ error: 'Database update failed' });
    }

    console.log(`[Paddle Webhook] Upgraded visitor ${visitorId} to premium`);
    return res.status(200).json({ success: true, visitor_id: visitorId });
  } catch (err) {
    console.error('[Paddle Webhook] Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
