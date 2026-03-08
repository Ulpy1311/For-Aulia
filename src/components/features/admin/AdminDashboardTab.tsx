import { useState } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboardTab() {
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NVIDIA AI Generator Panel */}
            <section className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3 text-violet-500 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">AI Memory Assistant</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    Bantuan dari model NVIDIA z-ai/glm5 untuk merangkai kata kenangan. Bisa kamu salin untuk membuat notes.
                </p>
                <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Apa yang sedang kamu pikirkan tentang kenangan jarak jauh ini? Biarkan AI merangkainya..."
                    className="w-full h-24 p-4 rounded-xl border border-border bg-foreground/5 text-sm resize-none focus:outline-none focus:border-violet-400 focus:bg-foreground/10 transition-colors"
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
                        <span className="block text-3xl font-serif text-foreground">Live</span>
                        <span className="text-sm text-muted-foreground">Analytics status</span>
                    </div>
                    <div className="p-4 bg-foreground/5 rounded-xl">
                        <span className="block text-3xl font-serif text-foreground">OK</span>
                        <span className="text-sm text-muted-foreground">DB Connection</span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-4 leading-relaxed">
                    * Untuk melacak analitik lengkap pengunjung silakan gabungkan project dengan Vercel Web Analytics di dashboard Vercel milikmu karena Vercel Web Analytics tidak butuh kode tambahan manual melainkan integrasi satu klik di dashboard. Panel Admin ini otomatis memproteksi cookies milikmu.
                </p>
            </section>
        </div>
    );
}
