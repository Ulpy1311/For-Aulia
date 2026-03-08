export interface MemoryItem {
    id: string;
    title: string;
    date: string;
    image: string;
    description: string;
    isHidden?: boolean; // Tanda ini akan digunakan untuk blur/hide dari admin
}

export const memorySeed: MemoryItem[] = [
    {
        id: '01',
        title: 'IT STARTED WITH A STORY REPLY',
        date: 'August 11, 2024',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
        description: 'It all started with a simple story reply. From there, our conversation gradually became a routine I looked forward to every day.',
    },
    {
        id: '02',
        title: 'FIRST LONG CHAT',
        date: 'August 20, 2024',
        image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format&fit=crop',
        description: 'That night we talked so long we lost track of time. From trivial topics to personal matters, it felt connected without being forced.',
    },
    {
        id: '03',
        title: 'FIRST VIDEO CALL UNTIL DAWN',
        date: 'September 05, 2024',
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop',
        description: 'Our first video call felt awkward at first, but eventually became comfortable. Since then, the screen has been the main bridge in this relationship.',
    },
    {
        id: '04',
        title: 'ROUTINE GOOD MORNINGS',
        date: 'October 2024',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800&auto=format&fit=crop',
        description: 'Good morning messages became a necessity. If one of us was late, the other would wait. Distance is just a number, but attention is real.',
    },
    {
        id: '05',
        title: 'FIRST SMALL ARGUMENT',
        date: 'November 15, 2024',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop',
        description: 'We had an argument. Misunderstandings that usually happen because of text messages. But from here we learned to communicate better.',
        isHidden: true, // Example hidden/blurred by default
    },
    {
        id: '06',
        title: 'TALKING ABOUT THE FUTURE',
        date: 'December 25, 2024',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        description: 'A serious conversation about where this is going. We may not have met yet, but our plans are much further than the distance between us.',
    },
    {
        id: '07',
        title: 'THE LONGEST SILENCE',
        date: 'January 2025',
        image: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=800&auto=format&fit=crop',
        description: 'There was a phase where we were both busy and silence filled the chat room. Exhausted, but missing each other. A test of ego for both of us.',
        isHidden: true,
    },
    {
        id: '08',
        title: 'RECONCILIATION & REALIZATION',
        date: 'February 10, 2025',
        image: 'https://images.unsplash.com/photo-1500673922987-e212871f15f5?q=80&w=800&auto=format&fit=crop',
        description: 'We talked again. Lowered our egos and realized that holding on is much harder but more worth it than letting go.',
    },
    {
        id: '09',
        title: 'FIRST ANNIVERSARY (LDR)',
        date: 'August 11, 2025',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
        description: 'One full year without meeting, just passing through screens. Hard? Very. But looking back at what we’ve been through, I’m glad we didn’t stop.',
    },
    {
        id: '10',
        title: 'THE PROMISE TO MEET',
        date: 'Present Day',
        image: 'https://images.unsplash.com/photo-1533227260815-a56cf8caa239?q=80&w=800&auto=format&fit=crop',
        description: 'We haven’t met yet. The ticket hasn’t been booked. But the plan is there. Until that day comes, I’ll keep this feeling right here.',
    }
];
