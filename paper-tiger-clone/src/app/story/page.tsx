'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

// Memory-focused data structure
const memories = [
    {
        id: '01',
        title: 'SUNSET AT KUTA',
        date: 'June 12, 2024',
        location: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
        category: 'Travel',
        description: 'Trying to catch the sunset but getting distracted by how beautiful the water looked. We talked for hours about nothing and everything. A core memory of feeling completely at peace.'
    },
    {
        id: '02',
        title: 'GRADUATION DAY',
        date: 'October 25, 2023',
        location: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
        category: 'Milestone',
        description: 'The end of one chapter and the start of another. I remember feeling terrified yet unstoppable. The gown was hot, the speeches were long, but the pride in my parents\' eyes made it all worth it.'
    },
    {
        id: '03',
        title: 'COFFEE & CODE',
        date: 'August 14, 2023',
        location: 'Favorite Cafe',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
        category: 'Daily Life',
        description: 'One of those late nights where the code just flows. The smell of roasted beans, the lo-fi playlist, and the satisfaction of finally fixing that one bug that haunted me for days.'
    },
    {
        id: '04',
        title: 'ART EXHIBITION',
        date: 'March 02, 2023',
        location: 'National Gallery',
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1974&auto=format&fit=crop',
        category: 'Inspiration',
        description: 'Getting lost in abstract colors and shapes. It reminds me that creativity has no boundaries. I stood in front of this one painting for 20 minutes just absorbing the energy.'
    },
    {
        id: '05',
        title: 'THE FIRST DESIGN',
        date: 'November 10, 2022',
        location: 'Home Studio',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        category: 'Work',
        description: 'Looking back at my first major design project. It wasn\'t perfect, but it was mine. The start of a journey into branding and identity that I never knew I would love so much.'
    },
    {
        id: '06',
        title: 'SICK DAY',
        date: 'July 22, 2022',
        location: 'Bedroom',
        image: 'https://images.unsplash.com/photo-1512918760532-3ad860030499?q=80&w=2069&auto=format&fit=crop',
        category: 'Life',
        description: 'Sometimes you just need to stop. A reminder that rest is also productive. Tea, books, and silence. Recovering and resetting for what comes next.'
    },
    {
        id: '07',
        title: 'TOKYO NIGHTS',
        date: 'May 15, 2024',
        location: 'Shinjuku, Japan',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
        category: 'Travel',
        description: 'Neon lights reflecting in the rain. The city that never sleeps felt surprisingly intimate. Found a small ramen shop tucked away in an alley that changed my life.'
    },
    {
        id: '08',
        title: 'MOUNTAIN HIKE',
        date: 'April 02, 2024',
        location: 'Mount Bromo',
        image: 'https://images.unsplash.com/photo-1506359585186-e69219e81bad?q=80&w=2069&auto=format&fit=crop',
        category: 'Adventure',
        description: 'Woke up at 2 AM to catch the sunrise. The cold was biting, but the view above the clouds was surreal. A reminder of how small we are in this vast, beautiful world.'
    },
    {
        id: '09',
        title: 'NEW APARTMENT',
        date: 'January 10, 2024',
        location: 'South Jakarta',
        image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1974&auto=format&fit=crop',
        category: 'Milestone',
        description: 'Keys in hand, empty rooms full of potential. The first night sleeping on a mattress on the floor, dreaming of how to fill this space with memories and love.'
    },
    {
        id: '10',
        title: 'MIDNIGHT SNACK',
        date: 'December 24, 2023',
        location: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop',
        category: 'Daily Life',
        description: 'Making instant noodles at 1 AM. It’s a simple pleasure, but sharing it with someone special makes it feel like a five-star meal. Quiet moments are the loudest.'
    },
    {
        id: '11',
        title: 'CREATIVE BLOCK',
        date: 'September 18, 2023',
        location: 'Workspace',
        image: 'https://images.unsplash.com/photo-1501747315-124a0daca060?q=80&w=1974&auto=format&fit=crop',
        category: 'Work',
        description: 'Staring at a blank screen for hours. Frustration mounting. Then, a walk outside, a breath of fresh air, and suddenly the ideas started flowing again. Trust the process.'
    },
    {
        id: '12',
        title: 'CAT CAFE',
        date: 'August 05, 2023',
        location: 'Kemang',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
        category: 'Life',
        description: 'Surrounded by purring fluffballs. It’s impossible to be stressed here. One orange tabby fell asleep on my lap and I didn’t move for an hour. Pure therapy.'
    },
    {
        id: '13',
        title: 'BEACH DAY',
        date: 'July 01, 2023',
        location: 'Pantai Indah Kapuk',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
        category: 'Daily Life',
        description: 'Salty hair, sandy toes. Sometimes you need to escape the concrete jungle just to see the horizon. The sound of waves is the best playlist.'
    },
    {
        id: '14',
        title: 'MUSEUM DATE',
        date: 'June 14, 2023',
        location: 'MACAN',
        image: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop',
        category: 'Inspiration',
        description: 'Walking hand in hand through immersive installations. Art is better when shared. We argued about the meaning of a sculpture and laughed about it later.'
    },
    {
        id: '15',
        title: 'FAMILY DINNER',
        date: 'May 20, 2023',
        location: 'Grandma\'s House',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
        category: 'Life',
        description: 'The table was full of food, and the room was full of laughter. No phones, just stories from the past and dreams for the future. Family is everything.'
    },
    {
        id: '16',
        title: 'SOLO TRIP',
        date: 'April 10, 2023',
        location: 'Yogyakarta',
        image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?q=80&w=1973&auto=format&fit=crop',
        category: 'Travel',
        description: 'Exploring the ancient temples alone. It was daunting at first, but liberating. Learned to enjoy my own company and move at my own pace.'
    },
    {
        id: '17',
        title: 'RAINY DAY READ',
        date: 'March 05, 2023',
        location: 'Window Seat',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1998&auto=format&fit=crop',
        category: 'Life',
        description: 'Thunder outside, warm tea inside. Finished a book in one sitting. Getting lost in a fictional world is the best way to spend a gloomy afternoon.'
    },
    {
        id: '18',
        title: 'PROJECT LAUNCH',
        date: 'February 01, 2023',
        location: 'Office',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
        category: 'Work',
        description: 'Months of hard work finally going live. The team high-fived, we popped some sparkling juice. Exhausted but incredibly proud of what we built together.'
    },
    {
        id: '19',
        title: 'CONCERT NIGHT',
        date: 'January 15, 2023',
        location: 'Stadium',
        image: 'https://images.unsplash.com/photo-1459749411177-717442659e50?q=80&w=2070&auto=format&fit=crop',
        category: 'Adventure',
        description: 'Screaming the lyrics until my voice gave out. The energy of the crowd was electric. For two hours, nothing else mattered but the music.'
    },
    {
        id: '20',
        title: 'FLOWER MARKET',
        date: 'December 10, 2022',
        location: 'Rawa Belong',
        image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=2070&auto=format&fit=crop',
        category: 'Inspiration',
        description: 'Woke up early to buy fresh blooms. The colors, the scents—it was sensory overload in the best way. Filled my room with lilies and roses.'
    },
    {
        id: '21',
        title: 'SKETCHING SESSION',
        date: 'November 05, 2022',
        location: 'Park Bench',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
        category: 'Inspiration',
        description: 'Trying to capture the way the light hit the trees. My sketches were messy, but the act of observing made me appreciate the details I usually miss.'
    },
    {
        id: '22',
        title: 'COOKING CLASS',
        date: 'October 20, 2022',
        location: 'Culinary Studio',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop',
        category: 'Life',
        description: 'Attempting to make pasta from scratch. Flour everywhere. It didn\'t look like the photo, but it tasted like victory (and a lot of garlic).'
    },
    {
        id: '23',
        title: 'ROAD TRIP',
        date: 'September 12, 2022',
        location: 'Java Coast',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
        category: 'Adventure',
        description: 'No destination, just driving. Windows down, classic rock playing. We found a hidden cove that wasn\'t on the map and watched the waves crash.'
    },
    {
        id: '24',
        title: 'VINTAGE SHOPPING',
        date: 'August 28, 2022',
        location: 'Santa Market',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop',
        category: 'Daily Life',
        description: 'Hunting for treasures in piles of old clothes. Found a denim jacket from the 90s that fits perfectly. It smells like history (and mothballs).'
    },
    {
        id: '25',
        title: 'GOLDEN HOUR',
        date: 'July 15, 2022',
        location: 'Rooftop',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop',
        category: 'Inspiration',
        description: 'The city bathed in gold. For a few minutes, the chaos of Jakarta looked peaceful. Capturing this light is a photographer\'s dream.'
    },
    {
        id: '26',
        title: 'LATE NIGHT WORK',
        date: 'June 30, 2022',
        location: 'Home Office',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop',
        category: 'Work',
        description: 'Deadline approaching. The world is asleep, but my mind is racing. There\'s a unique clarity that comes at 3 AM. Just me and the work.'
    },
    {
        id: '27',
        title: 'PICNIC DATE',
        date: 'May 10, 2022',
        location: 'Botanical Garden',
        image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=2070&auto=format&fit=crop',
        category: 'Life',
        description: 'Sandwiches, fruit, and a checkered blanket. Watching clouds pass by. Simple moments like this are what recharge the soul.'
    },
    {
        id: '28',
        title: 'FILM PHOTOGRAPHY',
        date: 'April 22, 2022',
        location: 'Old Town',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2264&auto=format&fit=crop',
        category: 'Inspiration',
        description: 'Shooting with an analog camera. You have to be intentional with every shot. Creating something tangible in a digital world feels special.'
    },
    {
        id: '29',
        title: 'NEW YEAR EVE',
        date: 'January 01, 2022',
        location: 'City Center',
        image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=2069&auto=format&fit=crop',
        category: 'Milestone',
        description: 'Fireworks lighting up the sky. Holding hands and counting down. 3... 2... 1... Happy New Year. A fresh start, full of hope.'
    },
    {
        id: '30',
        title: 'FIRST EXHIBITION',
        date: 'December 15, 2021',
        location: 'Small Gallery',
        image: 'https://images.unsplash.com/photo-1547826039-bfc35e7f1c13?q=80&w=2074&auto=format&fit=crop',
        category: 'Work',
        description: 'Seeing my work on a wall for the first time. The nerves, the excitement. A stranger told me my piece moved them to tears. I\'ll never forget that.'
    }
];

export default function StoryPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredMemories = selectedCategory
        ? memories.filter(memory => memory.category === selectedCategory)
        : memories;

    const categories = Array.from(new Set(memories.map(m => m.category)));

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-border">
                    <div className="space-y-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest gap-2"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            Back to Home
                        </Link>
                        <h1 className="font-display text-5xl md:text-7xl uppercase leading-none text-foreground">
                            Memory<br />Gallery
                        </h1>
                    </div>

                    <div className="flex flex-col items-end gap-6 w-full md:w-auto">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-right max-w-md">
                            A collection of moments, thoughts, and fragments of time. <br />
                            Each pixel holds a story.
                        </p>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-end gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`
                                    px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 rounded-sm border
                                    ${selectedCategory === null
                                        ? 'bg-foreground text-background border-foreground'
                                        : 'bg-transparent text-muted-foreground border-transparent hover:border-muted-foreground/50'
                                    }
                                `}
                            >
                                All
                            </button>
                            {categories.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedCategory(selectedCategory === tag ? null : tag)}
                                    className={`
                                        px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 rounded-sm border
                                        ${selectedCategory === tag
                                            ? 'bg-foreground text-background border-foreground'
                                            : 'bg-transparent text-muted-foreground border-transparent hover:border-muted-foreground/50'
                                        }
                                    `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid Gallery */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredMemories.map((memory) => (
                            <motion.article
                                key={memory.id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="group flex flex-col h-full bg-card border border-border overflow-hidden hover:shadow-xl transition-shadow duration-500"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
                                    <Image
                                        src={memory.image}
                                        alt={memory.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-background/80 backdrop-blur-sm border border-border px-2 py-1 text-[10px] font-mono uppercase tracking-wider font-bold">
                                            {memory.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4 border-b border-border/50 pb-4">
                                        <h2 className="font-display text-xl uppercase leading-tight group-hover:text-primary transition-colors">
                                            {memory.title}
                                        </h2>
                                        <span className="font-mono text-sm text-muted-foreground/50 font-bold">
                                            {memory.id}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {memory.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {memory.location}
                                        </span>
                                    </div>

                                    <p className="font-serif text-sm leading-relaxed text-muted-foreground flex-grow">
                                        &ldquo;{memory.description}&rdquo;
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredMemories.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="font-mono text-muted-foreground uppercase tracking-widest">No memories found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
