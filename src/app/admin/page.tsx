'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, LogOut, LayoutDashboard, Library, BookOpen, Clock, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

import { AdminDashboardTab } from '@/components/features/admin/AdminDashboardTab';
import { AdminStoriesTab } from '@/components/features/admin/AdminStoriesTab';
import { AdminNotesTab } from '@/components/features/admin/AdminNotesTab';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleLogout = async () => {
        try {
            await fetch('/api/auth', { method: 'DELETE' });
            router.push('/admin/login');
            router.refresh();
        } catch {
            toast.error('Gagal keluar.');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <AdminDashboardTab />;
            case 'Stories':
                return <AdminStoriesTab />;
            case 'Notes':
                return <AdminNotesTab />;
            case 'Galleries':
                return <div className="p-8 bg-card rounded-3xl border border-border flex flex-col items-center justify-center text-center h-64"><ImageIcon className="w-12 h-12 text-muted-foreground/30 mb-4" /><h3 className="text-xl font-serif">Galleries Management</h3><p className="text-muted-foreground max-w-sm mt-2">Manage photos in your slideshow. Same logic as stories, coming soon for full sync.</p></div>;
            case 'Changelogs':
                return <div className="p-8 bg-card rounded-3xl border border-border flex flex-col items-center justify-center text-center h-64"><Clock className="w-12 h-12 text-muted-foreground/30 mb-4" /><h3 className="text-xl font-serif">Changelogs Editor</h3><p className="text-muted-foreground max-w-sm mt-2">Update version history manually directly from here without touching code.</p></div>;
            default:
                return <AdminDashboardTab />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/40 backdrop-blur-md p-6 flex flex-col gap-6 relative z-10 shrink-0">
                <div className="flex items-center gap-3 border-b border-border pb-6">
                    <Settings className="w-6 h-6" />
                    <h1 className="font-serif text-xl tracking-tight">Admin Control</h1>
                </div>

                <nav className="flex-1 space-y-1.5">
                    {[
                        { id: 'Dashboard', icon: LayoutDashboard },
                        { id: 'Stories', icon: Library },
                        { id: 'Galleries', icon: ImageIcon },
                        { id: 'Notes', icon: BookOpen },
                        { id: 'Changelogs', icon: Clock }
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${isActive ? 'bg-foreground text-background shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
                            >
                                <Icon className="w-4 h-4" /> {tab.id}
                            </button>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors mt-auto font-medium text-sm border border-red-500/20"
                >
                    <LogOut className="w-4 h-4" /> Secure Sign Out
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-gradient-to-br from-background via-background to-foreground/5 relative">
                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
                        <h2 className="text-3xl lg:text-4xl font-serif mb-2 tracking-tight">Overview: {activeTab}</h2>
                        <p className="text-muted-foreground max-w-xl text-balance leading-relaxed">Kelola semua memori, konten, konfigurasi, sensor (blur mode) dan buat tulisan secara instan tanpa perlu menyentuh kode sedikit pun.</p>
                    </header>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                        {renderContent()}
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            </main>
        </div>
    );
}
