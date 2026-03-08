import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function AdminNotesTab() {
    const [notes, setNotes] = useState<{id: string, title: string, content: string, date: string, isArchived: boolean, isHidden: boolean}[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ id: '', title: '', content: '', date: '', isArchived: false, isHidden: false });

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/db?collection=notes');
            const data = await res.json();
            if (data.success) {
                setNotes(data.data);
            }
        } catch {
            toast.error("Gagal mengambil data notes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSave = async () => {
        const url = formData.id ? '/api/db' : '/api/db';
        const method = formData.id ? 'PUT' : 'POST';
        const body = formData.id
            ? { collection: 'notes', id: formData.id, updates: formData }
            : { collection: 'notes', item: { ...formData, id: Date.now().toString() } };

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Catatan disimpan");
                setIsFormOpen(false);
                fetchNotes();
            } else {
                toast.error("Gagal menyimpan");
            }
        } catch {
            toast.error("Gagal menyimpan");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus catatan ini selamanya?")) return;
        try {
            const res = await fetch(`/api/db?collection=notes&id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Dihapus");
                fetchNotes();
            }
        } catch {
            toast.error("Gagal");
        }
    };

    const toggleHide = async (note: {id: string, [key: string]: unknown}, field: 'isHidden' | 'isArchived') => {
        try {
            const res = await fetch('/api/db', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ collection: 'notes', id: note.id, updates: { [field]: !note[field] } })
            });
            if (res.ok) fetchNotes();
        } catch {
            toast.error("Gagal update status");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-card p-6 rounded-3xl border border-border">
                <div>
                    <h3 className="text-xl font-serif">Notes & Journals</h3>
                    <p className="text-sm text-muted-foreground mt-1">Buat catatan baru, arsipkan, atau sembunyikan dengan efek blur di depan.</p>
                </div>
                <button
                    onClick={() => { setFormData({ id: '', title: '', content: '', date: new Date().toISOString().split('T')[0], isArchived: false, isHidden: false }); setIsFormOpen(true); }}
                    className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> New Note
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-card p-6 rounded-3xl border border-border">
                    <h4 className="font-semibold mb-4 text-lg">{formData.id ? 'Edit Note' : 'Create Journal'}</h4>
                    <div className="space-y-4">
                        <input
                            placeholder="Title (e.g. Tentang Hari Ini)"
                            value={formData.title} onChange={e => setFormData(p => ({...p, title: e.target.value}))}
                            className="w-full p-3 rounded-xl bg-foreground/5 border-transparent focus:border-violet-400 focus:bg-foreground/10 outline-none text-sm"
                        />
                        <input
                            type="date"
                            value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
                            className="w-full p-3 rounded-xl bg-foreground/5 border-transparent focus:border-violet-400 focus:bg-foreground/10 outline-none text-sm font-mono"
                        />
                        <div className="relative">
                            <textarea
                                placeholder="Tulis catatan panjangmu di sini..."
                                value={formData.content} onChange={e => setFormData(p => ({...p, content: e.target.value}))}
                                className="w-full p-3 rounded-xl bg-foreground/5 border-transparent focus:border-violet-400 focus:bg-foreground/10 outline-none text-sm h-64 resize-none leading-relaxed font-serif"
                            />
                            <div className="absolute top-3 right-3 opacity-30 pointer-events-none flex items-center gap-1.5 text-xs font-mono uppercase">
                                <Sparkles className="w-3 h-3" /> AI Ready
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <button onClick={handleSave} className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
                                Publish Note
                            </button>
                            <button onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground">
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="text-center p-8 text-muted-foreground animate-pulse text-sm">Memuat jurnal...</div>
            ) : (
                <div className="grid gap-4">
                    {notes.map(note => (
                        <div key={note.id} className={`p-5 bg-card rounded-2xl border ${note.isHidden ? 'border-amber-500/30 bg-amber-500/5' : note.isArchived ? 'border-dashed opacity-70' : 'border-border'} flex justify-between items-start gap-4 transition-all group hover:border-foreground/30`}>
                            <div className={`flex-1 ${note.isHidden ? 'blur-sm select-none opacity-50 contrast-75 brightness-75 transition-all duration-300 group-hover:blur-none group-hover:opacity-100 group-hover:contrast-100 group-hover:brightness-100' : ''}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-lg font-serif">{note.title}</h4>
                                    <span className="text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded-md">{note.date}</span>
                                    {note.isArchived && <span className="text-[10px] bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">Archived</span>}
                                    {note.isHidden && <span className="text-[10px] bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">Blurred</span>}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-serif text-balance">{note.content}</p>
                            </div>

                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => { setFormData(note); setIsFormOpen(true); }}
                                    className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => toggleHide(note, 'isHidden')}
                                    className={`p-2 rounded-lg ${note.isHidden ? 'bg-amber-500/10 text-amber-600' : 'bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground'}`}
                                    title="Toggle Blur"
                                >
                                    {note.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500/70 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
