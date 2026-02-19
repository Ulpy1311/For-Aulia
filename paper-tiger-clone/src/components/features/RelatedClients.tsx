'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientItem {
    id: string;
    name: string | React.ReactNode;
    bgClass: string;
    image?: string;
    textColor: string;
}

const clients: ClientItem[] = [
    {
        id: 'altsource',
        name: 'AltSource',
        bgClass: 'bg-blue-600',
        textColor: 'text-white',
    },
    {
        id: 'cirtec',
        name: <>Cirtec<br />Medical</>,
        bgClass: 'bg-gray-800',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv955hA70-YYaC8Aml2fHniJVdvOnDa-jCP0lJq0jhjXCLEAw4IsANv7cz2qun0vx1L3TZhWxeEXNxV29LnDmBwuLWRhxAJaXFB7kZCSekRJu1Iy8DgH5PlcqMCfWGEI_1RzumCgp-pnOIx3Aeqv0LTkpQAwpVaaCZ_AQ83sEbCMgh_ASvp7CLcinIfv1OkTzUefVI_33nBw_0k8ThCfMwVNG7N5SwkNzA9wHqOSdlLKpGUhYbkx6lV0n1Hu9-sMAS1CeFp2MjWQ',
        textColor: 'text-white',
    },
    {
        id: 'britax',
        name: 'britax',
        bgClass: 'bg-[#E5E5E5] dark:bg-gray-700',
        textColor: 'text-gray-900',
    },
    {
        id: 'pbs',
        name: 'PBS',
        bgClass: 'bg-[#4a4a4a]',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEB6SQajgS523mHUZPLcaRPaxySItDSdH18ZpSapvKncywK6tBS0QOexPje4D7Zn6Ay6IDiGrmltfZwwBN-b3J3--NzHj64gwzAa7556TOh_B4uHK3Cvh-LyXEulMe5iep-fRjcim-_VQpOFIfZkkXsue2caeVmw8H-2Y5TeAEdvygvoY_PvgGkAWlTAvNb1NxP4LTuFMcZmPP_JrHGUyElzZ5G0Z3TcdLVs4NvruRjC0dLph0LDAEPaEKrpKAQdEucTxvoO8bDQ',
        textColor: 'text-white',
    },
];

export function RelatedClients() {
    return (
        <div className="mt-32 pt-16 border-t border-border px-6 max-w-7xl mx-auto mb-20">
            <h2 className="font-display text-5xl md:text-6xl uppercase mb-12 text-foreground">
                Related Clients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {clients.map((client) => (
                    <div
                        key={client.id}
                        className={cn(
                            'group relative aspect-[4/3] overflow-hidden flex items-center justify-center p-8 transition-transform hover:scale-[1.02] duration-500 cursor-pointer',
                            client.bgClass
                        )}
                    >
                        {client.image && (
                            <Image
                                src={client.image}
                                alt="Texture"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover opacity-40 mix-blend-overlay"
                            />
                        )}
                        <span
                            className={cn(
                                'font-display text-4xl z-10 font-bold tracking-tight leading-none text-center',
                                client.textColor
                            )}
                        >
                            {client.name}
                        </span>
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <ArrowRight className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 w-6 h-6" />
                    </div>
                ))}
            </div>
        </div>
    );
}
