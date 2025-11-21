import { Category, Difficulty, Protocol, Experiment, User, CommunityPost } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Optimizer',
  avatar: 'https://picsum.photos/100/100?random=1',
  streak: 14,
  level: 7,
  location: 'San Francisco, CA'
};

export const SAMPLE_PROTOCOLS: Protocol[] = [
  {
    id: 'p1',
    title: 'Dopamine Fast 2.0',
    description: 'Reset your reward system by abstaining from high-stimulation activities for 24 hours.',
    category: Category.Productivity,
    difficulty: Difficulty.Hard,
    durationDays: 1,
    participantCount: 12405,
    successRate: 68,
    tags: ['Mental Clarity', 'Discipline'],
    author: 'Dr. Cameron Sepah',
    verified: true,
    steps: ['No screens', 'No music', 'No fast food', 'Walk', 'Journal']
  },
  {
    id: 'p2',
    title: 'Monk Mode: Deep Work',
    description: '4 hours of uninterrupted deep work every morning before 11 AM.',
    category: Category.Productivity,
    difficulty: Difficulty.Medium,
    durationDays: 30,
    participantCount: 8900,
    successRate: 45,
    tags: ['Productivity', 'Focus'],
    author: 'Community',
    verified: false
  },
  {
    id: 'p3',
    title: 'Zone 2 Cardio Protocol',
    description: '45 mins of Zone 2 heart rate training 4x a week to boost mitochondrial efficiency.',
    category: Category.Fitness,
    difficulty: Difficulty.Medium,
    durationDays: 60,
    participantCount: 5432,
    successRate: 72,
    tags: ['Longevity', 'Endurance'],
    author: 'Peter Attia',
    verified: true
  },
  {
    id: 'p4',
    title: 'Stoic Morning Routine',
    description: 'Cold shower followed by 10 minutes of negative visualization journaling.',
    category: Category.Philosophy,
    difficulty: Difficulty.Easy,
    durationDays: 21,
    participantCount: 3200,
    successRate: 85,
    tags: ['Resilience', 'Mindset'],
    author: 'Ryan Holiday',
    verified: true
  },
  {
    id: 'p5',
    title: 'Carnivore Elimination',
    description: '30 days of strict beef, salt, and water to identify food sensitivities.',
    category: Category.Nutrition,
    difficulty: Difficulty.Hard,
    durationDays: 30,
    participantCount: 8500,
    successRate: 40,
    tags: ['Diet', 'Autoimmune'],
    author: 'Dr. Shawn Baker',
    verified: true
  },
  {
    id: 'p6',
    title: 'Huberman Sleep Stack',
    description: 'Morning sunlight, no caffeine after 2PM, Magnesium Threonate before bed.',
    category: Category.Biohacking,
    difficulty: Difficulty.Medium,
    durationDays: 14,
    participantCount: 15600,
    successRate: 78,
    tags: ['Sleep', 'Recovery'],
    author: 'Andrew Huberman',
    verified: true
  }
];

export const USER_EXPERIMENTS: Experiment[] = [
  {
    id: 'e1',
    protocolId: 'p3',
    protocolTitle: 'Zone 2 Cardio Protocol',
    startDate: '2023-10-01',
    day: 14,
    totalDays: 60,
    status: 'Active',
    category: Category.Fitness,
    moodLogs: [
        { date: '1', score: 60 }, { date: '3', score: 65 }, { date: '5', score: 55 },
        { date: '7', score: 70 }, { date: '10', score: 80 }, { date: '12', score: 85 },
        { date: '14', score: 82 }
    ]
  },
  {
    id: 'e2',
    protocolId: 'p2',
    protocolTitle: 'Monk Mode: Deep Work',
    startDate: '2023-10-10',
    day: 5,
    totalDays: 30,
    status: 'Active',
    category: Category.Productivity,
    moodLogs: [
        { date: '1', score: 40 }, { date: '2', score: 50 }, { date: '3', score: 45 },
        { date: '4', score: 60 }, { date: '5', score: 75 }
    ]
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post1',
    userId: 'u2',
    userName: 'Sarah Biohacks',
    userAvatar: 'https://picsum.photos/100/100?random=2',
    content: 'Just finished day 30 of the Cold Plunge protocol. HRV is up 15% and sleep latency is down to 5 mins. Highly recommend pairing with breathwork.',
    likes: 45,
    comments: 12,
    timestamp: '2h ago',
    tags: ['#ColdPlunge', '#Biohacking']
  },
  {
    id: 'post2',
    userId: 'u3',
    userName: 'DevGrind',
    userAvatar: 'https://picsum.photos/100/100?random=3',
    content: 'Failed my Dopamine Fast at hour 18 because I needed to check a deploy. Restarting tomorrow. Accountability partner needed!',
    likes: 12,
    comments: 8,
    timestamp: '5h ago',
    tags: ['#FailureIsLearning', '#Coding']
  }
];