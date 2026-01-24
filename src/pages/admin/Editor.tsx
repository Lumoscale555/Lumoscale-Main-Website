import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, X, Code } from 'lucide-react';

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!id);
    const [tagInput, setTagInput] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image_url: '',
        published: false,
        tags: [] as string[],
    });

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    const fetchPost = async (postId: string) => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (error) {
            toast.error('Error fetching post');
            navigate('/admin');
        } else if (data) {
            setFormData({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || '',
                content: data.content || '',
                image_url: data.image_url || '',
                published: data.published,
                tags: data.tags || [],
            });
        }
        setInitialLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        toast.info('Uploading image...');

        const { error } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file);

        if (error) {
            toast.error('Error uploading image: ' + error.message);
        } else {
            const { data } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: data.publicUrl });
            toast.success('Image uploaded successfully');
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            ...formData,
            slug: formData.slug || generateSlug(formData.title),
        };

        let error;

        if (id) {
            const { error: updateError } = await supabase
                .from('posts')
                .update(postData)
                .eq('id', id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('posts')
                .insert([postData]);
            error = insertError;
        }

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(id ? 'Post updated' : 'Post created');
            navigate('/admin');
        }
        setLoading(false);
    };

    if (initialLoading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading editor...</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <Button variant="ghost" asChild className="text-zinc-400 hover:text-white">
                    <Link to="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="published" className="text-sm font-medium text-zinc-400">
                            {formData.published ? 'Public' : 'Draft'}
                        </Label>
                        <Switch
                            id="published"
                            checked={formData.published}
                            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                        />
                    </div>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-500 rounded-full px-6">
                        {loading ? 'Saving...' : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Save Post
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl p-6 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <Input
                                placeholder="Post Title"
                                className="text-4xl font-bold bg-transparent border-none p-0 h-auto placeholder:text-zinc-700 focus-visible:ring-0 text-white"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                            />
                        </div>

                        <Card className="bg-white/5 border-white/10 overflow-hidden min-h-[600px] flex flex-col">
                            <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                                    <Code className="w-3 h-3" /> HTML Editor Mode
                                </span>
                                <span className="text-xs text-zinc-500">
                                    Paste raw HTML. Styles from index.css will apply automatically.
                                </span>
                            </div>

                            <CardContent className="p-0 flex-grow relative">
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full h-[600px] bg-black text-zinc-300 font-mono text-sm p-4 border-none focus-visible:ring-0 resize-none leading-relaxed"
                                    placeholder="Paste your raw HTML body content here... (<div>...</div>)"
                                    spellCheck={false}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="font-semibold text-lg text-white">Metadata</h3>

                            <div className="space-y-2">
                                <Label className="text-zinc-400">Excerpt (SEO Description)</Label>
                                <Textarea
                                    className="bg-black/50 border-white/10 text-white min-h-[100px]"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Short summary for SEO and blog preview cards..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-400">Tags (Press Enter)</Label>
                                <Input
                                    className="bg-black/50 border-white/10 text-white"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="e.g., AI, Growth"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full flex items-center gap-1">
                                            {tag}
                                            <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeTag(tag)} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="font-semibold text-lg text-white">Featured Image</h3>
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-blue-500/50 transition-colors bg-black/50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer block">
                                    {formData.image_url ? (
                                        <img
                                            src={formData.image_url}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg mb-2"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center py-8 text-zinc-500">
                                            <Upload className="w-8 h-8 mb-2" />
                                            <span>Click to upload</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
