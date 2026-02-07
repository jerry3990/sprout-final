export type CategoryCard = {
  id: string
  image: string
  title: string
  description: string
}

export type Category = {
  id: string
  label: string
  title: string
  description: string
  cards: CategoryCard[]
}

/* Experience categories in this exact priority order: Education, Workforce, Community, Conferences */
export const CATEGORIES: Category[] = [
  {
    id: 'education',
    label: 'EDUCATION',
    title: 'EDU Engagement',
    description:
      'Designed to turn student energy into meaningful connections. These experiences help students explore, collaborate, and feel part of something bigger from their very first day on campus.',
    cards: [
      {
        id: 'edu-1',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        title: 'Orientation Experiences',
        description:
          'Welcomes students through guided interaction that makes first days feel approachable and familiar.',
      },
      {
        id: 'edu-2',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
        title: 'Student Connection Experiences',
        description:
          'Helps students form natural connections and friendships early on.',
      },
      {
        id: 'edu-3',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
        title: 'Campus Discovery Experiences',
        description:
          'Encourages exploration of campus spaces through shared discovery.',
      },
    ],
  },
  {
    id: 'workforce',
    label: 'WORKFORCE',
    title: 'Workforce Experiences',
    description:
      "Designed to strengthen human connection at work. These experiences focus on conversation, collaboration, and shared understanding — helping people connect beyond roles, titles, and day-to-day tasks. Rather than play for play's sake, they are thoughtfully structured moments that support onboarding, team alignment, and a more connected workplace.",
    cards: [
      {
        id: 'wf-1',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
        title: 'Onboarding Experiences',
        description:
          'Helps new employees settle in, understand their environment, and feel part of the team.',
      },
      {
        id: 'wf-2',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
        title: 'Team Connection Experiences',
        description:
          'Brings teams together through shared moments that build trust and communication.',
      },
      {
        id: 'wf-3',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
        title: 'Workplace Alignment Experiences',
        description:
          'Alignment doesn\'t come from meetings alone. We design moments that help teams connect around shared goals, values, and understanding beyond daily tasks.',
      },
    ],
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    title: 'Community Experiences',
    description:
      'Designed to bring people together through shared moments. These experiences focus on participation, celebration, and togetherness — creating spaces where people feel comfortable showing up as themselves. From informal gatherings to larger social moments, each experience is shaped around connection rather than performance.',
    cards: [
      {
        id: 'comm-1',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
        title: 'Community Gathering Experiences',
        description:
          'Creates relaxed spaces for people to connect naturally.',
      },
      {
        id: 'comm-2',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&h=400&fit=crop',
        title: 'Social & Cultural Experiences',
        description:
          'Celebrates culture, identity, and shared stories through interaction.',
      },
      {
        id: 'comm-3',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
        title: 'Community Discovery Experiences',
        description:
          'Turns shared spaces into places of collective exploration and memory.',
      },
    ],
  },
  {
    id: 'conferences',
    label: 'CONFERENCES',
    title: 'Conference Experiences',
    description:
      'Designed to make large gatherings feel more human. These experiences help turn conferences, exhibitions, and brand events into spaces for interaction and participation. By encouraging movement, conversation, and discovery across the event environment, we help attendees connect beyond sessions, booths, and schedules.',
    cards: [
      {
        id: 'conf-1',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
        title: 'Attendee Engagement Experiences',
        description:
          'Encourages interaction and connection beyond scheduled sessions.',
      },
      {
        id: 'conf-2',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
        title: 'Exhibition Discovery Experiences',
        description:
          'Guides attendees through event spaces with purpose and curiosity.',
      },
      {
        id: 'conf-3',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
        title: 'Brand Participation Experiences',
        description:
          'Creates interactive moments that invite participation, not observation.',
      },
    ],
  },
]
