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

export const CATEGORIES: Category[] = [
  {
    id: 'education',
    label: 'EDUCATION',
    title: 'Edu Engagement',
    description:
      'Designed to turn student energy into meaningful connections. These experiences help students explore, collaborate, and feel part of something bigger from their very first day on campus.',
    cards: [
      {
        id: 'edu-1',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        title: 'Orientation Experiences',
        description:
          'Welcome students with interactive moments that make first days feel exciting, not overwhelming.',
      },
      {
        id: 'edu-2',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
        title: 'Student Connections',
        description:
          'Break the ice and spark friendships through playful, group-based activities and shared goals.',
      },
      {
        id: 'edu-3',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
        title: 'Campus Discovery',
        description:
          'Explore campus life and resources through guided experiences that build confidence and belonging.',
      },
    ],
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    title: 'Community Impact',
    description:
      'Connect with local communities through meaningful projects. Build relationships, share skills, and create lasting change together.',
    cards: [
      {
        id: 'comm-1',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
        title: 'Local Partnerships',
        description:
          'Collaborate with neighbourhood organisations on projects that matter to the community.',
      },
      {
        id: 'comm-2',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&h=400&fit=crop',
        title: 'Volunteer Experiences',
        description:
          'Give back through hands-on volunteering that supports people and places around you.',
      },
      {
        id: 'comm-3',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
        title: 'Shared Spaces',
        description:
          'Create and use shared spaces that bring people together and strengthen community bonds.',
      },
    ],
  },
  {
    id: 'conferences',
    label: 'CONFERENCES',
    title: 'Conferences & Events',
    description:
      'From keynotes to workshops, our events bring people together to learn, network, and shape the future.',
    cards: [
      {
        id: 'conf-1',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
        title: 'Keynote Experiences',
        description:
          'Inspire and learn from leaders and experts in an environment designed for connection.',
      },
      {
        id: 'conf-2',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
        title: 'Workshop Sessions',
        description:
          'Hands-on sessions where you build skills and ideas alongside peers and facilitators.',
      },
      {
        id: 'conf-3',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
        title: 'Networking Events',
        description:
          'Structured and informal opportunities to meet others and grow your network.',
      },
    ],
  },
  {
    id: 'adventure',
    label: 'ADVENTURE',
    title: 'Adventure & Outdoors',
    description:
      'Step outside and discover. From day trips to multi-day experiences, adventure awaits those ready to explore.',
    cards: [
      {
        id: 'adv-1',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
        title: 'Day Expeditions',
        description:
          'Single-day adventures that get you into nature and back in time for reflection.',
      },
      {
        id: 'adv-2',
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=400&fit=crop',
        title: 'Trail & Trek',
        description:
          'Guided trails and treks that build stamina, teamwork, and a deeper connection to the outdoors.',
      },
      {
        id: 'adv-3',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        title: 'Wilderness Retreats',
        description:
          'Multi-day retreats that combine adventure with reflection and community.',
      },
    ],
  },
]
