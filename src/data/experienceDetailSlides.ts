export type ExperienceDetailSlide = {
  id: string
  title: string
  paragraph1: string
  paragraph2: string
  intensity: string
  groupSize: string
  mediaImage: string
  ctaOverlayText: string
  ctaButtonText: string
}

export const EXPERIENCE_DETAIL_TABS = [
  { id: 'education', label: 'EDUCATION' },
  { id: 'community', label: 'COMMUNITY' },
  { id: 'conferences', label: 'CONFERENCES' },
  { id: 'adventure', label: 'ADVENTURE' },
] as const

/** 4 tabs × 3 points = 12 slides. Index = tabIndex * 3 + pointIndex */
export const EXPERIENCE_DETAIL_SLIDES: ExperienceDetailSlide[] = [
  // EDUCATION (tab 0) – 3 points
  {
    id: 'orientation',
    title: 'ORIENTATION',
    paragraph1: 'Orientation should feel inviting, not overwhelming.',
    paragraph2:
      'We create interactive welcomes that replace one-way information with movement, conversation, and shared moments — helping students feel comfortable, included, and at ease from day one.',
    intensity: 'Low to Medium',
    groupSize: 'Flexible (small to large cohorts)',
    mediaImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=85',
    ctaOverlayText: 'See how orientation feels, not just how it works',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'connection',
    title: 'STUDENT CONNECTION',
    paragraph1: 'Connection starts with shared moments.',
    paragraph2:
      'We design experiences that help students form natural friendships and feel part of the community through guided interaction and discovery.',
    intensity: 'Medium',
    groupSize: 'Small to medium groups',
    mediaImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85',
    ctaOverlayText: 'Discover how we build connection from day one',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'discovery',
    title: 'CAMPUS DISCOVERY',
    paragraph1: 'Turn campus into a place of exploration.',
    paragraph2:
      'Encourages exploration of campus spaces through shared discovery — helping students feel at home and connected to their new environment.',
    intensity: 'Low to Medium',
    groupSize: 'Flexible',
    mediaImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=85',
    ctaOverlayText: 'See how discovery creates belonging',
    ctaButtonText: "LET'S TALK →",
  },
  // COMMUNITY (tab 1) – 3 points
  {
    id: 'community-events',
    title: 'COMMUNITY EVENTS',
    paragraph1: 'Bring neighbourhoods together through shared experiences.',
    paragraph2:
      'From block parties to cultural festivals, we design events that build trust, celebrate diversity, and create lasting memories for everyone involved.',
    intensity: 'Low to High',
    groupSize: '50 to 500+',
    mediaImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85',
    ctaOverlayText: 'See how we turn spaces into places',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'volunteer-engagement',
    title: 'VOLUNTEER ENGAGEMENT',
    paragraph1: 'Meaningful ways to give back and connect.',
    paragraph2:
      'We create volunteer experiences that feel rewarding and inclusive — from single-day activations to ongoing programmes that build real relationships.',
    intensity: 'Low to Medium',
    groupSize: 'Small to large teams',
    mediaImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=85',
    ctaOverlayText: 'Discover volunteer experiences that inspire',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'local-partnerships',
    title: 'LOCAL PARTNERSHIPS',
    paragraph1: 'Rooted in place, built with locals.',
    paragraph2:
      'We partner with local organisations, artists, and venues to deliver authentic experiences that reflect and strengthen the community.',
    intensity: 'Medium',
    groupSize: 'Flexible',
    mediaImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85',
    ctaOverlayText: 'See how we collaborate with communities',
    ctaButtonText: "LET'S TALK →",
  },
  // CONFERENCES (tab 2) – 3 points
  {
    id: 'keynotes-workshops',
    title: 'KEYNOTES & WORKSHOPS',
    paragraph1: 'Turn talks into experiences that stick.',
    paragraph2:
      'We design keynote and workshop flows that keep audiences engaged — from interactive openings to breakout sessions that drive real conversation.',
    intensity: 'Medium',
    groupSize: '50 to 2000+',
    mediaImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85',
    ctaOverlayText: 'See how we reimagine conference content',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'networking-experiences',
    title: 'NETWORKING EXPERIENCES',
    paragraph1: 'Connection that feels natural, not forced.',
    paragraph2:
      'Structured networking moments — from curated round tables to immersive activations — that help attendees meet the right people and leave with real connections.',
    intensity: 'Low to Medium',
    groupSize: '50 to 500',
    mediaImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=85',
    ctaOverlayText: 'Discover networking that actually works',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'full-conference',
    title: 'FULL CONFERENCE DESIGN',
    paragraph1: 'End-to-end events that flow from first touch to last.',
    paragraph2:
      'From registration and wayfinding to main stage and side sessions, we design the full journey so every moment supports your goals and your brand.',
    intensity: 'Medium to High',
    groupSize: '100 to 5000+',
    mediaImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=85',
    ctaOverlayText: 'See how we design the full experience',
    ctaButtonText: "LET'S TALK →",
  },
  // ADVENTURE (tab 3) – 3 points
  {
    id: 'team-adventures',
    title: 'TEAM ADVENTURES',
    paragraph1: 'Outdoor experiences that build trust and clarity.',
    paragraph2:
      'From guided hikes to challenge-based retreats, we create adventures that push boundaries, spark conversation, and strengthen teams in memorable settings.',
    intensity: 'Medium to High',
    groupSize: '10 to 200',
    mediaImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85',
    ctaOverlayText: 'See how adventure can transform your team',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'retreats',
    title: 'RETREATS & GETAWAYS',
    paragraph1: 'Step away to think clearly and connect deeply.',
    paragraph2:
      'We design retreats that balance reflection and activity — the right mix of nature, facilitation, and free time so groups return refreshed and aligned.',
    intensity: 'Low to Medium',
    groupSize: '8 to 80',
    mediaImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=85',
    ctaOverlayText: 'Discover retreats that restore and inspire',
    ctaButtonText: "LET'S TALK →",
  },
  {
    id: 'custom-expeditions',
    title: 'CUSTOM EXPEDITIONS',
    paragraph1: 'One-of-a-kind journeys built around your goals.',
    paragraph2:
      'From multi-day expeditions to single-day adventures, we design bespoke experiences that combine exploration, storytelling, and meaningful outcomes.',
    intensity: 'High',
    groupSize: 'Small to medium',
    mediaImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=85',
    ctaOverlayText: 'See how we build expeditions from scratch',
    ctaButtonText: "LET'S TALK →",
  },
]

export const SLIDES_PER_TAB = 3
