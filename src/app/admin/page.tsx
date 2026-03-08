'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, LogOut, Sparkles, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
    const router = useRouter();
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth', { method: 'DELETE' });
            router.push('/admin/login');
            router.refresh();
        } catch {
            toast.error('Gagal keluar.');
        }
    };

    const handleAiGenerate = async () => {
        if (!aiPrompt) return toast.error('Ketik sesuatu untuk AI');
        setIsAiLoading(true);
        setAiResponse('... sedang memikirkan kenangan yang pas ...');
        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt })
            });
            const data = await res.json();
            if (data.success) {
                setAiResponse(data.result);
            } else {
                setAiResponse('Gagal menghubungi AI.');
            }
        } catch {
            setAiResponse('Terjadi kesalahan jaringan.');
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card/40 backdrop-blur-md p-6 flex flex-col gap-6 relative">
                <div className="flex items-center gap-3 border-b border-border pb-6">
                    <Settings className="w-6 h-6" />
                    <h1 className="font-serif text-xl tracking-tight">Admin Control</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {['Dashboard', 'Stories', 'Galleries', 'Notes', 'Changelogs'].map(tab => (
                        <button key={tab} className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-foreground/5 transition-colors font-medium text-sm text-muted-foreground hover:text-foreground">
                            {tab}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors mt-auto font-medium text-sm"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-10">
                    <h2 className="text-3xl font-serif mb-2">Welcome Back, Admin</h2>
                    <p className="text-muted-foreground">Kelola semua memori yang ingin ditampilkan atau disembunyikan (blur).</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* NVIDIA AI Generator Panel */}
                    <section className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-violet-500 mb-2">
                            <Sparkles className="w-5 h-5" />
                            <h3 className="font-semibold text-lg">AI Memory Assistant</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Bantuan dari model NVIDIA z-ai/glm5 untuk merangkai kata kenangan.
                        </p>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Apa yang sedang kamu pikirkan tentang kenangan jarak jauh ini? Biarkan AI merangkainya..."
                            className="w-full h-24 p-4 rounded-xl border border-border bg-foreground/5 text-sm resize-none focus:outline-none focus:border-violet-400"
                        />
                        <button
                            onClick={handleAiGenerate}
                            disabled={isAiLoading}
                            className="bg-foreground text-background py-3 rounded-xl font-medium text-sm hover:bg-foreground/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isAiLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : 'Generate AI Note'}
                        </button>

                        {aiResponse && (
                            <div className="mt-4 p-4 bg-muted rounded-xl border border-border/50 text-sm whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                                {aiResponse}
                            </div>
                        )}
                    </section>

                    {/* Quick Stats Panel */}
                    <section className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Website Health</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-foreground/5 rounded-xl">
                                <span className="block text-3xl font-serif text-foreground">0</span>
                                <span className="text-sm text-muted-foreground">Total Visitors</span>
                            </div>
                            <div className="p-4 bg-foreground/5 rounded-xl">
                                <span className="block text-3xl font-serif text-foreground">50+</span>
                                <span className="text-sm text-muted-foreground">Stories & Photos</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-4">
                            * Integrasikan dengan Vercel Web Analytics untuk statistik live visitor. Data tersimpan dengan mode stealth blur untuk privasi.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
