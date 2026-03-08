import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export function AdminStoriesTab() {
    const [stories, setStories] = useState<{id: string, title: string, date: string, image: string, description: string, isHidden: boolean}[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ id: '', title: '', date: '', image: '', description: '', isHidden: false });

    // File upload state
    const [isUploading, setIsUploading] = useState(false);

    const fetchStories = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/db?collection=stories');
            const data = await res.json();
            if (data.success) {
                setStories(data.data);
            }
        } catch {
            toast.error("Gagal mengambil data stories");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const fd = new FormData();
        fd.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: fd
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setFormData(prev => ({ ...prev, image: data.url }));
                toast.success("Gambar berhasil diunggah");
            } else {
                throw new Error(data.error);
            }
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Gagal mengunggah gambar");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        const url = formData.id ? '/api/db' : '/api/db';
        const method = formData.id ? 'PUT' : 'POST';
        const body = formData.id
            ? { collection: 'stories', id: formData.id, updates: formData }
            : { collection: 'stories', item: { ...formData, id: Date.now().toString() } };

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Berhasil disimpan");
                setIsFormOpen(false);
                fetchStories();
            } else {
                toast.error("Gagal menyimpan data");
            }
        } catch {
            toast.error("Gagal menyimpan data");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus cerita ini secara permanen?")) return;
        try {
            const res = await fetch(`/api/db?collection=stories&id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Dihapus");
                fetchStories();
            }
        } catch {
            toast.error("Gagal menghapus");
        }
    };

    const toggleHide = async (story: {id: string, isHidden: boolean}) => {
        try {
            const res = await fetch('/api/db', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ collection: 'stories', id: story.id, updates: { isHidden: !story.isHidden } })
            });
            if (res.ok) fetchStories();
        } catch {
            toast.error("Gagal mengubah status hide");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-card p-6 rounded-3xl border border-border">
                <div>
                    <h3 className="text-xl font-serif">Stories Management</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manage journey cards, set blur mode, edit contents.</p>
                </div>
                <button
                    onClick={() => { setFormData({ id: '', title: '', date: '', image: '', description: '', isHidden: false }); setIsFormOpen(true); }}
                    className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Story
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-card p-6 rounded-3xl border border-border animate-in fade-in slide-in-from-top-4">
                    <h4 className="font-semibold mb-4 text-lg">{formData.id ? 'Edit Story' : 'New Story'}</h4>
                    <div className="space-y-4">
                        <input
                            placeholder="Title (e.g. FIRST MEET)"
                            value={formData.title} onChange={e => setFormData(p => ({...p, title: e.target.value}))}
                            className="w-full p-3 rounded-xl bg-foreground/5 border-transparent focus:border-violet-400 focus:bg-foreground/10 outline-none text-sm"
                        />
                        <input
                            placeholder="Date (e.g. August 2024)"
                            value={formData.date} onChange={e => setFormData(p => ({...p, date: e.target.value}))}
                            className="w-full p-3 rounded-xl bg-foreground/5 border-transparent focus:border-violet-400 focus:bg-foreground/10 outline-none text-sm"
                        />
                        <textarea
                            placeholder="Story description..."
                            value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))}
                            className="w-full p-3 rounded-xl bg-foreground/5 border-transparent focus:border-violet-400 focus:bg-foreground/10 outline-none text-sm h-24 resize-none"
                        />

                        <div className="flex gap-4 items-center bg-foreground/5 p-4 rounded-xl border border-border/50">
                            {formData.image && (
                                <img src={formData.image} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-border" />
                            )}
                            <div className="flex-1 space-y-2">
                                <label className="text-sm text-muted-foreground block font-medium">Image Source (URL or Upload)</label>
                                <input
                                    placeholder="https://..."
                                    value={formData.image} onChange={e => setFormData(p => ({...p, image: e.target.value}))}
                                    className="w-full p-2.5 rounded-lg bg-background border border-border outline-none text-sm font-mono"
                                />
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground font-medium uppercase">Or</span>
                                    <label className="flex items-center gap-2 px-3 py-1.5 bg-foreground/10 hover:bg-foreground/20 rounded-lg text-xs font-medium cursor-pointer transition-colors">
                                        <ImageIcon className="w-3.5 h-3.5" />
                                        {isUploading ? 'Uploading...' : 'Upload File'}
                                        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <button onClick={handleSave} className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors">
                                Save Story
                            </button>
                            <button onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/5 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isLoading ? (
                <div className="text-center p-8 text-muted-foreground animate-pulse text-sm">Loading stories...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stories.map(story => (
                        <div key={story.id} className={`flex bg-card rounded-2xl border ${story.isHidden ? 'border-amber-500/30 bg-amber-500/5' : 'border-border'} overflow-hidden transition-all group`}>
                            <img src={story.image} alt={story.title} className={`w-32 object-cover ${story.isHidden ? 'opacity-50 grayscale' : ''}`} />
                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-xs text-muted-foreground font-mono">{story.date}</span>
                                        <h4 className="font-semibold text-sm line-clamp-1">{story.title}</h4>
                                    </div>
                                    {story.isHidden && <span className="text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">Blurred</span>}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4 flex-1">
                                    {story.description}
                                </p>
                                <div className="flex items-center gap-2 mt-auto border-t border-border/50 pt-3">
                                    <button
                                        onClick={() => toggleHide(story)}
                                        className={`flex items-center justify-center p-2 rounded-lg transition-colors flex-1 ${story.isHidden ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' : 'bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground'}`}
                                        title={story.isHidden ? "Unhide" : "Hide & Blur"}
                                    >
                                        {story.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => { setFormData(story); setIsFormOpen(true); }}
                                        className="flex items-center justify-center p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground flex-1"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(story.id)}
                                        className="flex items-center justify-center p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 transition-colors text-red-500/70 hover:text-red-600 flex-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
