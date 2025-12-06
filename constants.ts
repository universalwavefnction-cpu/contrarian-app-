import { Category, Difficulty, Protocol, Experiment, User, CommunityPost, BlogPost } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Optimizer',
  avatar: 'https://picsum.photos/100/100?random=1',
  streak: 14,
  level: 7,
  location: 'San Francisco, CA'
};

// ... (rest of the file remains unchanged until the end)

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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why Zone 2 Training is the Holy Grail of Longevity',
    excerpt: 'It’s not about burning calories. It’s about mitochondrial efficiency. Here is the science behind low-intensity cardio.',
    content: 'Full article content here...',
    author: { name: 'Dr. Peter Attia', avatar: 'https://picsum.photos/100/100?random=10' },
    date: 'Oct 12, 2023',
    readTime: '8 min read',
    category: Category.Fitness,
    imageUrl: 'https://picsum.photos/800/400?random=101',
    tags: ['Longevity', 'Cardio']
  },
  {
    id: 'b2',
    title: 'The Case Against "Clean Code"',
    excerpt: 'Over-abstraction is killing your startup. Why you should write "dirty" code until you find product-market fit.',
    content: 'Full article content here...',
    author: { name: 'Tech Contrarian', avatar: 'https://picsum.photos/100/100?random=11' },
    date: 'Nov 01, 2023',
    readTime: '5 min read',
    category: Category.Coding,
    imageUrl: 'https://picsum.photos/800/400?random=102',
    tags: ['Software Engineering', 'Startups']
  },
  {
    id: 'b3',
    title: 'Stoicism is Not About Suppressing Emotion',
    excerpt: 'A common misconception debauched. Real Stoicism is about processing emotion through reason, not ignoring it.',
    content: 'Full article content here...',
    author: { name: 'Ryan Holiday', avatar: 'https://picsum.photos/100/100?random=12' },
    date: 'Sep 28, 2023',
    readTime: '6 min read',
    category: Category.Philosophy,
    imageUrl: 'https://picsum.photos/800/400?random=103',
    tags: ['Philosophy', 'Mental Health']
  },
  {
    id: 'b4',
    title: 'Magnesium: The Missing Mineral',
    excerpt: '80% of the population is deficient. How magnesium impacts sleep, anxiety, and recovery.',
    content: 'Full article content here...',
    author: { name: 'Andrew Huberman', avatar: 'https://picsum.photos/100/100?random=13' },
    date: 'Oct 20, 2023',
    readTime: '10 min read',
    category: Category.Biohacking,
    imageUrl: 'https://picsum.photos/800/400?random=104',
    tags: ['Supplements', 'Health']
  },
  {
    id: 'b5',
    title: 'Deep Work in a Distracted World',
    excerpt: 'The ability to perform deep work is becoming increasingly rare and valuable. Here is how to cultivate it.',
    content: 'Full article content here...',
    author: { name: 'Cal Newport', avatar: 'https://picsum.photos/100/100?random=14' },
    date: 'Nov 05, 2023',
    readTime: '7 min read',
    category: Category.Productivity,
    imageUrl: 'https://picsum.photos/800/400?random=105',
    tags: ['Focus', 'Career']
  },
  {
    id: 'b6',
    title: 'Carnivore Diet: 30 Day Results',
    excerpt: 'I ate nothing but meat for a month. Here is what happened to my bloodwork and energy levels.',
    content: 'Full article content here...',
    author: { name: 'Experimenter X', avatar: 'https://picsum.photos/100/100?random=15' },
    date: 'Oct 15, 2023',
    readTime: '12 min read',
    category: Category.Nutrition,
    imageUrl: 'https://picsum.photos/800/400?random=106',
    tags: ['Diet', 'Keto']
  }
];

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
