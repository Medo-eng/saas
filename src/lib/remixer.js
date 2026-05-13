const REMIX_STYLES = [
  {
    id: 'aggressor',
    name: 'The Aggressor',
    emoji: '🔥',
    color: '#E74C3C',
    description: 'Direct, confrontational, opinion-driven hook that demands attention.',
    transform: (title) => ({
      hook: `STOP scrolling. Here's what nobody has the guts to tell you about "${title}"...`,
      caption: `Most creators are too scared to say this. "${title}" just exposed a truth the industry doesn't want you to hear. Here's the raw breakdown 👇`,
      cta: 'Save this before it gets buried.',
      hashtags: '#HardTruth #ContentStrategy #ViralTake #NoDuplication',
    }),
  },
  {
    id: 'storyteller',
    name: 'The Storyteller',
    emoji: '📖',
    color: '#9B59B6',
    description: 'Narrative arc that pulls the audience into a compelling journey.',
    transform: (title) => ({
      hook: `Let me tell you a story that started with "${title}" and ended with everything changing...`,
      caption: `I watched "${title}" at 2 AM and it completely shifted my perspective. Here's the story of how one video changed the entire game 🧵`,
      cta: 'Follow for more stories that matter.',
      hashtags: '#Storytelling #CreatorJourney #ContentGold #DeepDive',
    }),
  },
  {
    id: 'educator',
    name: 'The Educator',
    emoji: '🎓',
    color: '#3498DB',
    description: 'Structured, value-packed breakdown with clear takeaways.',
    transform: (title) => ({
      hook: `"${title}" explained in 60 seconds — with 3 actionable takeaways you can use TODAY.`,
      caption: `I broke down "${title}" into a simple framework:\n\n✅ Takeaway 1: The core insight most people miss\n✅ Takeaway 2: How to apply this immediately\n✅ Takeaway 3: The hidden opportunity nobody is talking about\n\nBookmark this.`,
      cta: 'Share this with someone who needs it.',
      hashtags: '#LearnOnTikTok #ContentBreakdown #ValuePost #KnowledgeDrop',
    }),
  },
  {
    id: 'mystery',
    name: 'The Mystery',
    emoji: '🕵️',
    color: '#F39C12',
    description: 'Curiosity-driven hook that keeps the audience guessing.',
    transform: (title) => ({
      hook: `There's something hidden in "${title}" that 99% of viewers completely missed...`,
      caption: `I've watched "${title}" frame by frame. What I found buried at the 7-minute mark will change how you see everything. Are you ready? 👁️`,
      cta: 'Comment "REVEAL" to get the full breakdown.',
      hashtags: '#Mystery #HiddenGem #ContentSecret #MindBlown',
    }),
  },
  {
    id: 'comedian',
    name: 'The Comedian',
    emoji: '😂',
    color: '#2ECC71',
    description: 'Humor-first approach that makes the content relatable and shareable.',
    transform: (title) => ({
      hook: `POV: You just watched "${title}" and now you're questioning all your life choices 💀`,
      caption: `Me before "${title}": I know what I'm doing.\nMe after: *existential crisis in 4K*\n\nBut seriously, this had me DEAD. The part where they basically called out every creator... 😭\n\nWho else felt personally attacked?`,
      cta: 'Tag someone who needs to see this 😂',
      hashtags: '#CreatorHumor #ContentComedy #Relatable #SendHelp',
    }),
  },
];

export function extractVideoTitle(url) {
  // Extract a mock title from the YouTube URL
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
    return `Video ${videoId?.slice(0, 8) || 'Content'}`;
  } catch {
    return 'Viral Content';
  }
}

export function generateRemixes(youtubeUrl) {
  const title = extractVideoTitle(youtubeUrl);
  return REMIX_STYLES.map((style) => ({
    ...style,
    result: style.transform(title),
    url: youtubeUrl,
  }));
}
