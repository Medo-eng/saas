
const VISITOR_KEY = 'scriptvibe_visitor_id';
const USAGE_KEY = 'scriptvibe_usage_count';
const PREMIUM_KEY = 'scriptvibe_premium';
const MAX_FREE_USES = 4;

export function getVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID?.() || `sv-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function getUsageCount() {
  return parseInt(localStorage.getItem(USAGE_KEY) || '0', 10);
}

export function incrementUsage() {
  const count = getUsageCount() + 1;
  localStorage.setItem(USAGE_KEY, count.toString());
  return count;
}

export function hasReachedLimit() {
  return getUsageCount() >= MAX_FREE_USES && !isPremium();
}

export function isPremium() {
  return localStorage.getItem(PREMIUM_KEY) === 'true';
}

export function setPremium(val = true) {
  localStorage.setItem(PREMIUM_KEY, val.toString());
}

export function getRemainingUses() {
  if (isPremium()) return Infinity;
  return Math.max(0, MAX_FREE_USES - getUsageCount());
}
