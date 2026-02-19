'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { DeveloperModal } from '@/components/ui/DeveloperModal';
import { Heart, Plus, Sparkles, Camera, MapPin, Music, BookOpen } from 'lucide-react';

export function PromoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FadeIn delay={0.1} className="bg-blue-500 p-8 text-white flex flex-col justify-between aspect-square rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-display text-4xl leading-none uppercase">Latest Adventure</h3>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase w-max mt-4 hover:bg-gray-100 transition-colors">
                    View Gallery
                </button>
            </FadeIn>

            <FadeIn delay={0.2} className="relative group overflow-hidden aspect-square rounded-lg shadow-lg">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjUfRDWxGNctvwubnzwEa-RXCLI_Don1-FJh-kckiaQv_bEE6KwWPxcq_nV3OXc1fbpuSXghCWKTL0Dl8-6HKmJPTBPbC979UvbWBt23mjeYMoHCOZRa8Ga72sOSjoycvF-CiX0aK6O_lUHMQIGsIE9jSgUEJMSwfXBSuyLOYkPjGwamx_rf7N1UOYmNHMhEOW-o88C8YENFUtw8MJGuEi30eV2Mq5vWxWbqwV-yTQhsa75sfIktxGy3LPJ_Es62O4bXZBt1Qx5A"
                    alt="Cantika's travel photo"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </FadeIn>

            <FadeIn delay={0.3} className="bg-[#F8F5F2] dark:bg-card p-6 flex flex-col justify-between border border-border aspect-square rounded-lg shadow-lg">
                <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-display uppercase text-xl text-primary">Social Moments</span>
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <div className="w-3 h-3 rounded-full bg-indigo-300"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 h-full">
                    <div className="relative w-full h-full">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq0nL8WKYgK6Kg0CU49o54sC3htaJ8i2Mw8PDLQ6x9Ngv8o8XOIr08WsNoXuLIjgBsC8M0MBVgB-I9qLKlMNeFWntQq0go7m1-SBwmmobSpr9nP1-Ff_v-wGeOWcgZvEgr2S48Wdx08eMYZLWoDtTLQ5Gyr6LjJUgPAdGP8a8nIk4n46p072LQ_2QOaHoKSJcTfbqvZYYjvPKNlMk0B-m49jpaaNbDyHeH-VFugTnOMvEamq4mpQI9eW1AMnTTWJYIO4GEx9RgiQ"
                            alt="Social Moment 1"
                            fill
                            sizes="(max-width: 768px) 50vw, 16vw"
                            className="object-cover rounded-sm"
                        />
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6gA8pOp0PpRgOKbqMgkiUNVmGEaj5ssjwYicKFGWdlK_VxIP-7yUQPkavNV5jEx6S71e3gQpg0QmBKI4lKWFHL9A_aqnlnaNnYxnkvSN1gx9o4bIyFjVrax0NDpDLd_JnIFDVES9Z6CAKa5qAC5_E37K67esI6Mh1-GJWeAbo7OeP1lXzBv6q7S1OoODtWNrsgNgL1MUXsJbYzIEwMhf2wtqUGRIOZHcwBWB5Fd-8INqeSMIi15kIdqDORFLOboi1t6ZlQlpJxQ"
                            alt="Social Moment 2"
                            fill
                            sizes="(max-width: 768px) 50vw, 16vw"
                            className="object-cover rounded-sm"
                        />
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}

export function FavoritingSection() {
    const moments = [
        { bg: 'bg-blue-100 dark:bg-blue-900/30', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANRUrkuRDpuqvGjcOn2KNhJ-M67oE6qfQeXj-_YRw3oZjdjL7--8yOqVpZa3iA88r17tftsQyNxHLLBzs5Q8jaAOpeHusQ6UsljgTjPXP6p8N7nrQguevP9P89MBkDuk4FoTUlHOOIFMSXD_XK81wNbLYlXmtuFEzi_sXXGtQCfA-00DFA5OS3x80hJ6f5pwnR692yvH_QvHln3RecPkDjHIJQqm6nuEO3hBS1BnRFHCL6HJjMavKMU8sb1Hg8FJ0oxoQ3VKQNOg' },
        { bg: 'bg-yellow-100 dark:bg-yellow-900/30', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1FaSUgWvvEITU2Z7InCTtJ8n2WAgpcPHcyeD6uN2Ve4c6J1xEwKUxmW0RKenQ0Oq1p6wu_xTbn4MhZm49NXLLada5XTHPksFL4JzGaBUMjgXJ30-BZD0l7-6ZBsl7YgqLsJP-EIg-EVpMJMZ3eNrNgOLxCkBCIN2mmSGJb2jZiJnZzQ_E-eCZM-NPwTRBwERWQNS5zmxNHNs-4S_GADnNhui5992my3bP0Qwz9Ap4CEg_JFAWVpsa05_4BFqTLO0XGAuPeyWf3A' },
        { bg: 'bg-red-100 dark:bg-red-900/30', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN8HFTiA3RLH_R-VghfIT-y5jVrLW21bfeNpRYARsOv9crAnjPHHptS-s1FLQMvJ2CHwYC-d2xzfDWvjVxfBJgGm1NRMp4RbHhb--WAP4kklpWltZe--RcMp5PPZ8La1doXiZPxycHGkT97VOfXrES-Z0HZmp5L_06_G9rmLM37OVXvxy40Ny2zGINiGwDz1D3xc_7La_7W6GGhDJik4jbXKlIRWdrszjcYkGzlNZnJcydY9wveffQNDZeQIrud8SVpjh3xEwAaQ' },
    ];

    return (
        <FadeIn className="bg-[#FDFBF7] dark:bg-card p-8 md:p-12 text-center border border-border rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
                <Heart className="text-blue-600 text-3xl" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-foreground mb-8">Cherished Moments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {moments.map((moment, i) => (
                    <div key={i} className={`${moment.bg} rounded-full p-4 aspect-square flex items-center justify-center overflow-hidden relative group hover:shadow-lg transition-all`}>
                        <Image
                            src={moment.img}
                            alt="Cherished Memory"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-md z-10 hover:bg-indigo-700 cursor-pointer">
                            <Plus className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
}

export function AppDownloadSection() {
    return (
        <FadeIn className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-200 dark:bg-card p-0 overflow-hidden relative h-[500px] rounded-lg shadow-lg group">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNRfYgRucjOhvFDYR4tiIdzVe6q_59ZZW17q4CqLn0L0SVGYMBBJsn2EdWQTWUkWHFlq6r6ZaeyiccPv4oza_8Fg9VmB--EC1tUP-ObkoeT8jnv5r1tOCeBUPR4HPrjGilEi5J4kU3MQiX7670-MKZOT5K6Wh9CK2WNUyTq7zZpwvQ048VzjfSa7GhMQF8MzgBDxCvhvwCGQ5uQAzg3KAQmNoFfnpabfsF6RpLM2j0UGLXrsTplkfbfNHv0VuiUG56Tpet4mJw1A')" }}></div>
            <div className="relative z-10 flex justify-center h-full items-end">
                <div className="relative w-4/5 h-4/5 transform translate-y-4 transition-transform group-hover:translate-y-0 duration-500">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgGwSZy8UswFF61tU_ftMwep5krNopHCq03h29GiURJsihhkXL7I1dFyPOv-3Ie1tUYqgXfyacaG8CkP7qXk8_bdaP0VzCSOJZ3mrSHq-VY5oGsMxPg46pZ2V2A0HIylqtsXBLA_TWuE2SCrO2VyfYDqWpOZFxrN6OOC_wFbkLllyDn5-j7AZfIfd_xgrDvXPZiRCcChvQjP5TmGU60eWbRoHnJZQ8ToIN7vUWMwwxHHHXrkH-KzHz37LRxzkgxSYdNNfCJjct8Q"
                        alt="Mobile app interface"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain rounded-t-3xl shadow-2xl"
                    />
                </div>
                <div className="absolute bottom-0 w-[240px] h-[400px] border-[8px] border-black rounded-[30px] border-b-0 pointer-events-none"></div>
            </div>
            <div className="relative z-10 p-8 text-left">
                <h3 className="font-display text-4xl md:text-5xl uppercase leading-none mb-4 text-foreground">Follow Her Journey</h3>
                <div className="inline-block bg-blue-600 text-white text-xs font-bold uppercase px-2 py-1 mb-6 transform -rotate-2 shadow-sm">Updated Daily</div>
                <p className="font-mono text-sm mb-6 max-w-xs text-muted-foreground">Travels. Thoughts. Life. Connect on social media and never miss a story.</p>
                <Button variant="solid" className='rounded-none uppercase text-xs font-bold'>Connect Now</Button>
            </div>
        </FadeIn>
    );
}

export function MenuGrid() {
    const items = [
        { title: 'The Great Getsby', cal: 'Favorite Novel • 2024', bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-indigo-900 dark:text-indigo-200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrBritOpC4SMr4tERNPnroHYaJzLI0riX-GvoklOBimu5yefciLuMLgToGIqXBqnHlQSG9KAzZtBSgZLRFqx1seOHrDWxo2RkKdDwNX_JRPShsFUIaug-6x9s5ztuNBadG-LU4Ze3TliInxF6dPG9VFif4GQ_uHaxZPSXxpTxstkZ4NvEOoz4-v-Njwrc8UBHMtWJBgKBC8wVM_Xv29Y3hEitvcPNuQTojcslWUAxAJdcHucN65bcS_R1BwNq_3NyFQqS1yGetnA' },
        { title: 'Paris, France', cal: 'Dream Destination • 2025', bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-900 dark:text-yellow-200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqATKARvxzmCVVtFk6CcinvC6OK2UmrrLyuTcW1OtZ7rxZKiqk7ivDxE9sv7YCn25ncxc-sCBzOBmnl9U0zENC2RP4pjMREEZaxy7y1ORC4fjSKhRjNLa_F51_Y78BL2CS46q4hBGvOxNvRxhDLgOJaClskz4odnMv4GGRwzo41uVdAHw-9OrL6_-R6K754o5AylIeMeykmMvopbryYAeUYz4XEreLnfIHAzv2EJgL-rCepyzEQEAC95d-eLnwzZFydlo8OY6faw' },
        { title: 'Golden Hour', cal: 'Photography • Hobby', bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-900 dark:text-blue-200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7KJmNwQelVcXHX04eaAlcMRVlQdQ7o18_Qh8thRcl74rT5aMcEmkE6L0lIxl3qbnPtnXGJo85MMyurqjM5B8GoKKjWKhYV-TelplTWf-7yXsoYC4C--QYYoWn_nWxoAhTtTcClqL4fxd6PLKP14WUqQOlq1RBVj6zdSnltO7vVgVfGzZYipQy7Kf47E5lNBNA1PGH_m2t1MfLOFXRmlpIJrTL_pqciCma1hQTXJFADysy3T2H4bmwNbPvHLLQUKBdcTlwg8cVhA' },
        { title: 'Coffee Runs', cal: 'Daily Ritual • 8:00 AM', bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-900 dark:text-orange-200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2wYyJPPPRboCU3IFDa7LUpeANojEy5-x0Nj0ZONIQHyoCowCYh2uZz3wiXOOS0yu4v0SuyMhDSy0tlObbMXmCWOt9ZwIZWzx2EphdVQGe82TFh8Fo4UB7rtg3XNxy0CFx-vb9OmzlFuGWwybiqLF59Lfz5IzqBiysE2RBmOiBuBW0BzMtIyLI28zG20cIEao1lFJ0vfuVb4plhXdN3lNJC_q_Ky4i3D4Ag1uHCeip6F0lebLQEfjd9UHovfu4WXY1XAncxUl66w' },
    ];

    return (
        <FadeIn className="grid grid-cols-2 gap-4">
            {items.map((item, i) => (
                <div key={i} className={`${item.bg} p-4 flex flex-col items-center text-center rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 shadow-md">
                        <Image src={item.img} alt={item.title} width={128} height={128} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h4 className={`font-bold ${item.text} mb-1`}>{item.title}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase">{item.cal}</p>
                </div>
            ))}
        </FadeIn>
    );
}

export function ParallaxCTA() {
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    return (
        <div className="relative overflow-hidden h-[400px] flex items-center bg-gray-900 text-white rounded-lg">
            <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyQAd9dQuXVUwhoI0YkzjEusOXagSfhexdy9QVTuDFQxdMiGsme9CFnk6OWIWMJwjuyA5gI4mRkWo1OS93aA-AQCDdDoK2Mv4s-VsNudQPx4UShmAp3wLuff0jsvlzeZATsK1FpC5GstrvYXBUXOfu2TjOZQf5Ey94Sss0iuOcDSdDNSzTt0lZ8Xlscs2otKaO1ThZeXHzSN8cYGTPe7OlqhF5DOVzSFeRlc7S-emG_2rS_Aqi8_ZQvSgxdlmEfVOlSlrXlwW85w"
                alt="Beautiful background"
                fill
                sizes="100vw"
                className="object-cover opacity-60"
            />
            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="p-8 flex flex-col justify-center bg-black/40 backdrop-blur-sm">
                    <FadeIn>
                        <h2 className="font-display text-4xl md:text-5xl uppercase leading-tight mb-4">Capturing life&apos;s most beautiful moments.</h2>
                        <div className="flex space-x-4 mt-4">
                            <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-gray-200 transition-colors">See Portfolio</button>
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="bg-blue-600 text-white px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-blue-700 transition-colors"
                            >
                                Contact Me
                            </button>
                        </div>
                    </FadeIn>
                </div>
                <div className="bg-white/95 text-gray-900 p-8 flex flex-col justify-center space-y-6">
                    <FadeIn delay={0.1} className="flex items-start space-x-4">
                        <Sparkles className="text-indigo-600 w-8 h-8" />
                        <div>
                            <h4 className="font-display text-xl uppercase text-indigo-900">Creative Soul</h4>
                            <p className="text-xs text-gray-600 mt-1">Always confident, always exploring. Turning ideas into reality.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2} className="flex items-start space-x-4">
                        <Camera className="text-indigo-600 w-8 h-8" />
                        <div>
                            <h4 className="font-display text-xl uppercase text-indigo-900">Visual Storyteller</h4>
                            <p className="text-xs text-gray-600 mt-1">Freezing time, one frame at a time. Memories that last forever.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3} className="flex items-start space-x-4">
                        <BookOpen className="text-indigo-600 w-8 h-8" />
                        <div>
                            <h4 className="font-display text-xl uppercase text-indigo-900">Lifelong Learner</h4>
                            <p className="text-xs text-gray-600 mt-1">Every day is a new lesson. Growing, loving, and living.</p>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <DeveloperModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
}
