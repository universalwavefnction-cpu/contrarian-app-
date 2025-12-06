import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '../constants';
import { MessageSquare, Heart, Map, Share2, MoreHorizontal, TrendingUp, X, MapPin, Users, Calendar, ChevronRight, Building2, ArrowLeft, Plus, Bell, Settings, Snowflake, Dumbbell, Coffee, Salad, Wifi, Star, Navigation, ExternalLink, Clock } from 'lucide-react';

interface CityChapter {
    id: string;
    city: string;
    country: string;
    members: number;
    nextEvent: string;
    imageUrl: string;
    description: string;
}

interface LocalPost {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    likes: number;
    comments: number;
    timestamp: string;
    tags: string[];
}

interface Place {
    id: string;
    name: string;
    type: 'ice_bath' | 'sauna' | 'gym' | 'coworking' | 'healthy_food' | 'outdoor';
    address: string;
    rating: number;
    reviews: number;
    description: string;
    hours: string;
    verified: boolean;
    imageUrl: string;
}

const CITY_CHAPTERS: CityChapter[] = [
    {
        id: 'berlin',
        city: 'Berlin',
        country: 'Germany',
        members: 156,
        nextEvent: 'Dec 14, 7pm',
        imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=200&fit=crop',
        description: 'The Berlin chapter meets weekly at various co-working spaces. Focus on biohacking and tech optimization.'
    },
    {
        id: 'munich',
        city: 'Munich',
        country: 'Germany',
        members: 89,
        nextEvent: 'Dec 12, 6pm',
        imageUrl: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=400&h=200&fit=crop',
        description: 'The Munich chapter gathers bi-weekly for deep work sessions and protocol experiments.'
    }
];

const LOCAL_POSTS: Record<string, LocalPost[]> = {
    berlin: [
        {
            id: 'bp1',
            userId: 'u10',
            userName: 'Max Biohacker',
            userAvatar: 'https://picsum.photos/100/100?random=20',
            content: 'Just found an amazing ice bath spot near Tempelhofer Feld! Who wants to join for a cold plunge session this Saturday? Bringing my Oura ring to track HRV changes. 🧊',
            likes: 34,
            comments: 12,
            timestamp: '1h ago',
            tags: ['#ColdExposure', '#Berlin']
        },
        {
            id: 'bp2',
            userId: 'u11',
            userName: 'Anna Coder',
            userAvatar: 'https://picsum.photos/100/100?random=21',
            content: 'Deep work session at Factory Berlin tomorrow 9am-1pm. We have 8 spots left. Pomodoro technique + no phones policy. Coffee provided ☕',
            likes: 28,
            comments: 8,
            timestamp: '3h ago',
            tags: ['#DeepWork', '#Productivity']
        },
        {
            id: 'bp3',
            userId: 'u12',
            userName: 'Jonas K.',
            userAvatar: 'https://picsum.photos/100/100?random=22',
            content: 'Anyone tried the new nootropics stack from that shop in Kreuzberg? Looking for reviews before I commit. Currently on Lion\'s Mane + Alpha-GPC.',
            likes: 15,
            comments: 23,
            timestamp: '5h ago',
            tags: ['#Nootropics', '#Biohacking']
        }
    ],
    munich: [
        {
            id: 'mp1',
            userId: 'u13',
            userName: 'Lisa Wellness',
            userAvatar: 'https://picsum.photos/100/100?random=23',
            content: 'Reminder: Our sauna + ice bath meetup at Müller\'sches Volksbad is this Thursday! 15 people confirmed so far. Bring your own towel. Entry is €5.',
            likes: 42,
            comments: 18,
            timestamp: '2h ago',
            tags: ['#Sauna', '#Munich']
        },
        {
            id: 'mp2',
            userId: 'u14',
            userName: 'Thomas Dev',
            userAvatar: 'https://picsum.photos/100/100?random=24',
            content: 'Started the Monk Mode protocol 5 days ago. Working from the quiet room at TUM library. Already seeing focus improvements. Anyone want to join the accountability group?',
            likes: 31,
            comments: 9,
            timestamp: '4h ago',
            tags: ['#MonkMode', '#Focus']
        },
        {
            id: 'mp3',
            userId: 'u15',
            userName: 'Maria S.',
            userAvatar: 'https://picsum.photos/100/100?random=25',
            content: 'Zone 2 running group meets every Sunday at 8am in Englischer Garten. All paces welcome. We do 45-60 mins at conversational pace. 🏃‍♀️',
            likes: 27,
            comments: 14,
            timestamp: '6h ago',
            tags: ['#Zone2', '#Fitness']
        }
    ]
};

const UPCOMING_EVENTS: Record<string, { title: string; date: string; attendees: number }[]> = {
    berlin: [
        { title: 'Ice Bath Session', date: 'Sat, Dec 14', attendees: 12 },
        { title: 'Deep Work Sprint', date: 'Tue, Dec 17', attendees: 8 },
        { title: 'Biohacking Meetup', date: 'Thu, Dec 19', attendees: 24 }
    ],
    munich: [
        { title: 'Sauna & Ice Bath', date: 'Thu, Dec 12', attendees: 15 },
        { title: 'Sunday Run Club', date: 'Sun, Dec 15', attendees: 18 },
        { title: 'Protocol Review', date: 'Wed, Dec 18', attendees: 10 }
    ]
};

const CITY_PLACES: Record<string, Place[]> = {
    berlin: [
        {
            id: 'bp1',
            name: 'Liquidrom',
            type: 'sauna',
            address: 'Möckernstraße 10, Kreuzberg',
            rating: 4.7,
            reviews: 89,
            description: 'Floating pools with underwater music, multiple saunas including aufguss sessions. Perfect for recovery.',
            hours: '9:00 - 24:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop'
        },
        {
            id: 'bp2',
            name: 'Kältekammer Berlin',
            type: 'ice_bath',
            address: 'Friedrichstraße 123, Mitte',
            rating: 4.9,
            reviews: 45,
            description: 'Professional cryotherapy and ice bath facility. -110°C chamber available. Book in advance.',
            hours: '8:00 - 20:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
        },
        {
            id: 'bp3',
            name: 'Factory Berlin',
            type: 'coworking',
            address: 'Rheinsberger Str. 76/77, Mitte',
            rating: 4.6,
            reviews: 156,
            description: 'Premium co-working with quiet zones, standing desks, and great coffee. Popular for deep work sessions.',
            hours: '24/7 for members',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop'
        },
        {
            id: 'bp4',
            name: 'Aspria Berlin',
            type: 'gym',
            address: 'Karlsruher Str. 20, Charlottenburg',
            rating: 4.8,
            reviews: 72,
            description: 'Luxury fitness club with excellent free weights, pool, sauna, and recovery facilities.',
            hours: '6:00 - 23:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop'
        },
        {
            id: 'bp5',
            name: 'Dean & David',
            type: 'healthy_food',
            address: 'Multiple locations',
            rating: 4.3,
            reviews: 234,
            description: 'Fresh salads, bowls, and smoothies. Good macros, protein options available. Fast service.',
            hours: '10:00 - 21:00',
            verified: false,
            imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop'
        },
        {
            id: 'bp6',
            name: 'Tempelhofer Feld',
            type: 'outdoor',
            address: 'Tempelhofer Damm, Tempelhof',
            rating: 4.9,
            reviews: 312,
            description: 'Former airport runway. Perfect for Zone 2 running, cycling, or morning sun exposure. Free entry.',
            hours: 'Sunrise - Sunset',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=200&fit=crop'
        }
    ],
    munich: [
        {
            id: 'mp1',
            name: 'Müller\'sches Volksbad',
            type: 'sauna',
            address: 'Rosenheimer Str. 1, Au',
            rating: 4.8,
            reviews: 156,
            description: 'Historic Art Nouveau swimming hall with sauna area. Stunning architecture. €5 entry for sauna.',
            hours: '7:30 - 23:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&h=200&fit=crop'
        },
        {
            id: 'mp2',
            name: 'Eisbach Wave',
            type: 'outdoor',
            address: 'Prinzregentenstraße, Englischer Garten',
            rating: 4.9,
            reviews: 89,
            description: 'Famous river surfing spot. Great for cold exposure in winter. Iconic Munich experience.',
            hours: 'Always open',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=300&h=200&fit=crop'
        },
        {
            id: 'mp3',
            name: 'Mates Coworking',
            type: 'coworking',
            address: 'Oberanger 28, Altstadt',
            rating: 4.5,
            reviews: 67,
            description: 'Quiet coworking with focus rooms. Good standing desks and natural lighting. Monthly plans available.',
            hours: '8:00 - 22:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop'
        },
        {
            id: 'mp4',
            name: 'Body + Soul Center',
            type: 'gym',
            address: 'Sendlinger Tor Platz 7',
            rating: 4.6,
            reviews: 98,
            description: 'Full-service gym with sauna, pool, and excellent equipment. Popular with biohackers.',
            hours: '6:00 - 23:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop'
        },
        {
            id: 'mp5',
            name: 'Gratitude Eatery',
            type: 'healthy_food',
            address: 'Türkenstraße 55, Maxvorstadt',
            rating: 4.7,
            reviews: 145,
            description: 'Plant-based restaurant with excellent protein bowls. Organic ingredients, great for recovery meals.',
            hours: '11:00 - 22:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop'
        },
        {
            id: 'mp6',
            name: 'Eisbachstudio',
            type: 'ice_bath',
            address: 'Leopoldstraße 82, Schwabing',
            rating: 4.8,
            reviews: 34,
            description: 'Dedicated cold exposure studio with ice baths and breathwork sessions. Wim Hof method classes.',
            hours: '7:00 - 21:00',
            verified: true,
            imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop'
        }
    ]
};

const placeTypeConfig: Record<Place['type'], { icon: React.ReactNode; label: string; color: string }> = {
    ice_bath: { icon: <Snowflake className="w-4 h-4" />, label: 'Ice Bath', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    sauna: { icon: <Snowflake className="w-4 h-4" />, label: 'Sauna', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    gym: { icon: <Dumbbell className="w-4 h-4" />, label: 'Gym', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
    coworking: { icon: <Wifi className="w-4 h-4" />, label: 'Co-working', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    healthy_food: { icon: <Salad className="w-4 h-4" />, label: 'Healthy Food', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
    outdoor: { icon: <Navigation className="w-4 h-4" />, label: 'Outdoor', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
};

export const CommunityHub: React.FC = () => {
    const [activeChapter, setActiveChapter] = useState<CityChapter | null>(null);
    const [activeTab, setActiveTab] = useState<'feed' | 'places'>('feed');
    const [selectedPlaceType, setSelectedPlaceType] = useState<Place['type'] | 'all'>('all');

    const handleJoinChapter = (chapter: CityChapter) => {
        setActiveChapter(chapter);
        setActiveTab('feed');
    };

    const handleBackToGlobal = () => {
        setActiveChapter(null);
    };

    // If a chapter is active, show the local feed
    if (activeChapter) {
        const posts = LOCAL_POSTS[activeChapter.id] || [];
        const events = UPCOMING_EVENTS[activeChapter.id] || [];
        const places = CITY_PLACES[activeChapter.id] || [];
        const filteredPlaces = selectedPlaceType === 'all'
            ? places
            : places.filter(p => p.type === selectedPlaceType);

        return (
            <div className="animate-fade-in">
                {/* Chapter Header */}
                <div className="relative mb-6 rounded-2xl overflow-hidden">
                    <div className="h-48 relative">
                        <img
                            src={activeChapter.imageUrl}
                            alt={activeChapter.city}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <button
                            onClick={handleBackToGlobal}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Global Feed
                        </button>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                    <h1 className="text-3xl font-bold text-white">{activeChapter.city}</h1>
                                </div>
                                <p className="text-slate-400 text-sm">{activeChapter.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                    <Users className="w-4 h-4 text-emerald-400" />
                                    <span className="text-white text-sm font-medium">{activeChapter.members} members</span>
                                </div>
                                <button className="p-2 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors">
                                    <Bell className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-slate-400 hover:text-white transition-colors">
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8 border-b border-white/5 pb-4">
                    <button
                        onClick={() => setActiveTab('feed')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'feed'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Feed
                    </button>
                    <button
                        onClick={() => setActiveTab('places')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'places'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <Map className="w-4 h-4" />
                        Places & Activities
                    </button>
                </div>

                {/* Feed Tab */}
                {activeTab === 'feed' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Local Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* New Post Input */}
                            <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder={`Share something with ${activeChapter.city} contrarians...`}
                                            className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none text-sm"
                                        />
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
                                        Post
                                    </button>
                                </div>
                            </div>

                            {/* Feed Header */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                    {activeChapter.city} Feed
                                </h2>
                                <div className="flex bg-white/5 rounded-lg p-1">
                                    <button className="text-xs font-medium text-white bg-slate-800 px-4 py-1.5 rounded-md shadow-sm">Recent</button>
                                    <button className="text-xs font-medium text-slate-400 hover:text-white px-4 py-1.5 transition-colors rounded-md">Popular</button>
                                </div>
                            </div>

                            {/* Posts */}
                            {posts.map(post => (
                                <div key={post.id} className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover border border-white/5" />
                                            <div>
                                                <h4 className="text-white font-medium text-sm">{post.userName}</h4>
                                                <span className="text-slate-500 text-xs">{post.timestamp}</span>
                                            </div>
                                        </div>
                                        <button className="text-slate-600 hover:text-slate-300 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                                        {post.content}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 uppercase tracking-wide font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-6 text-slate-500 pt-4 border-t border-white/5">
                                        <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors text-sm">
                                            <Heart className="w-4 h-4" /> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors text-sm">
                                            <MessageSquare className="w-4 h-4" /> {post.comments}
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-white transition-colors text-sm ml-auto">
                                            <Share2 className="w-4 h-4" /> Share
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Upcoming Events */}
                            <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    Upcoming Events
                                </h3>
                                <div className="space-y-3">
                                    {events.map((event, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                                            <div>
                                                <p className="text-white text-sm font-medium">{event.title}</p>
                                                <p className="text-slate-500 text-xs">{event.date}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-emerald-400">
                                                <Users className="w-3 h-3" />
                                                <span className="text-xs">{event.attendees}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 py-2.5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 rounded-xl text-sm font-medium transition-all">
                                    View All Events
                                </button>
                            </div>

                            {/* Quick Places Preview */}
                            <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                                    <Map className="w-4 h-4 text-emerald-400" />
                                    Popular Places
                                </h3>
                                <div className="space-y-2">
                                    {places.slice(0, 3).map(place => (
                                        <div
                                            key={place.id}
                                            onClick={() => setActiveTab('places')}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            <div className={`p-2 rounded-lg border ${placeTypeConfig[place.type].color}`}>
                                                {placeTypeConfig[place.type].icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{place.name}</p>
                                                <p className="text-slate-500 text-xs">{placeTypeConfig[place.type].label}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="text-xs">{place.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setActiveTab('places')}
                                    className="w-full mt-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                                >
                                    View All Places
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Switch Chapter */}
                            <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-amber-400" />
                                    Other Chapters
                                </h3>
                                <div className="space-y-2">
                                    {CITY_CHAPTERS.filter(c => c.id !== activeChapter.id).map(chapter => (
                                        <button
                                            key={chapter.id}
                                            onClick={() => setActiveChapter(chapter)}
                                            className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-4 h-4 text-blue-400" />
                                                <span className="text-slate-300 text-sm">{chapter.city}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-600" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Places Tab */}
                {activeTab === 'places' && (
                    <div>
                        {/* Place Type Filters */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            <button
                                onClick={() => setSelectedPlaceType('all')}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedPlaceType === 'all'
                                        ? 'bg-white/10 text-white border border-white/20'
                                        : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                                    }`}
                            >
                                All Places
                            </button>
                            {Object.entries(placeTypeConfig).map(([type, config]) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedPlaceType(type as Place['type'])}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selectedPlaceType === type
                                            ? config.color + ' border-current'
                                            : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                                        }`}
                                >
                                    {config.icon}
                                    {config.label}
                                </button>
                            ))}
                        </div>

                        {/* Places Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPlaces.map(place => (
                                <div key={place.id} className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
                                    {/* Image */}
                                    <div className="h-40 relative overflow-hidden">
                                        <img
                                            src={place.imageUrl}
                                            alt={place.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                        <div className="absolute top-3 left-3">
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${placeTypeConfig[place.type].color}`}>
                                                {placeTypeConfig[place.type].icon}
                                                {placeTypeConfig[place.type].label}
                                            </div>
                                        </div>
                                        {place.verified && (
                                            <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-emerald-500/30">
                                                Verified
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-white font-semibold">{place.name}</h3>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium">{place.rating}</span>
                                                <span className="text-slate-500 text-xs">({place.reviews})</span>
                                            </div>
                                        </div>

                                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{place.description}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{place.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{place.hours}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5">
                                                <Navigation className="w-3.5 h-3.5" />
                                                Directions
                                            </button>
                                            <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-lg transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredPlaces.length === 0 && (
                            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                                <Map className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400">No places found for this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Global Feed (default view)
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fade-in">

                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-xl font-medium text-white">Global Feed</h2>
                        <div className="flex bg-white/5 rounded-lg p-1">
                            <button className="text-xs font-medium text-slate-400 hover:text-white px-4 py-1.5 transition-colors rounded-md">Hot</button>
                            <button className="text-xs font-medium text-white bg-slate-800 px-4 py-1.5 rounded-md shadow-sm">New</button>
                            <button className="text-xs font-medium text-slate-400 hover:text-white px-4 py-1.5 transition-colors rounded-md">Top</button>
                        </div>
                    </div>

                    {COMMUNITY_POSTS.map(post => (
                        <div key={post.id} className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <img src={post.userAvatar} alt={post.userName} className="w-12 h-12 rounded-full object-cover border border-white/5" />
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{post.userName}</h4>
                                        <span className="text-slate-500 text-xs font-mono">{post.timestamp}</span>
                                    </div>
                                </div>
                                <button className="text-slate-600 hover:text-slate-300 transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-slate-300 mb-6 leading-relaxed font-light">
                                {post.content}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[11px] text-blue-400 bg-blue-500/5 px-2.5 py-1 rounded-md border border-blue-500/10 uppercase tracking-wide font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-8 text-slate-500 pt-6 border-t border-white/5">
                                <button className="flex items-center gap-2 hover:text-red-400 transition-colors text-sm group/btn">
                                    <Heart className="w-4 h-4 group-hover/btn:fill-red-500/20 group-hover/btn:text-red-400 transition-colors" /> {post.likes}
                                </button>
                                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors text-sm group/btn">
                                    <MessageSquare className="w-4 h-4 group-hover/btn:text-blue-400 transition-colors" /> {post.comments}
                                </button>
                                <button className="flex items-center gap-2 hover:text-white transition-colors text-sm ml-auto">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar - Local & Leaderboard */}
                <div className="space-y-8">
                    {/* Local Chapters */}
                    <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-lg shadow-black/20">
                        <div className="h-40 bg-slate-800 relative flex items-center justify-center group cursor-pointer overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400')] opacity-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                            <div className="z-10 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full flex items-center gap-2 group-hover:scale-105 transition-all shadow-xl">
                                <Map className="w-4 h-4 text-blue-400" />
                                <span className="text-white text-xs font-bold tracking-wide">Local Chapters</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-end mb-5">
                                <div>
                                    <h3 className="text-white font-medium">Join Your City</h3>
                                    <p className="text-slate-500 text-xs mt-1">Connect with local contrarians</p>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-400">
                                    <Building2 className="w-4 h-4" />
                                    <span className="text-xs font-medium">{CITY_CHAPTERS.length} cities</span>
                                </div>
                            </div>

                            {/* City List */}
                            <div className="space-y-2">
                                {CITY_CHAPTERS.map(chapter => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => handleJoinChapter(chapter)}
                                        className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all group/city"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden">
                                                <img src={chapter.imageUrl} alt={chapter.city} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-white text-sm font-medium">{chapter.city}</p>
                                                <p className="text-slate-500 text-xs">{chapter.members} members</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover/city:text-blue-400 group-hover/city:translate-x-0.5 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                        <h3 className="text-white font-medium mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                            <TrendingUp className="w-4 h-4 text-yellow-500" /> Monthly Rankings
                        </h3>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((rank) => (
                                <div key={rank} className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs font-mono w-5 text-center font-bold ${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-700' : 'text-slate-600'}`}>#{rank}</span>
                                        <div className="flex items-center gap-3">
                                            <img src={`https://picsum.photos/30/30?random=${rank + 10}`} className="w-8 h-8 rounded-full border border-white/5 group-hover:border-white/20 transition-colors" alt="User" />
                                            <span className="text-slate-300 text-sm font-medium">User_{100 + rank}</span>
                                        </div>
                                    </div>
                                    <span className="text-emerald-400 text-xs font-mono bg-emerald-500/10 px-2 py-1 rounded">9{9 - rank}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};