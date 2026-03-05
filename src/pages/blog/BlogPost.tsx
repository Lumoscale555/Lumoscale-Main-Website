import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const BlogPostPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (slug) fetchPost(slug);
    }, [slug]);

    const fetchPost = async (slug: string) => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error) {
            toast.error('Article not found');
        } else {
            setPost(data);
        }
        setLoading(false);
    };

    if (loading) return (
        <div className="min-h-screen bg-black"></div>
    );

    if (!post) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-400 gap-4">
            <p>Article not found.</p>
            <Button variant="outline" asChild><Link to="/blog">Return to Blog</Link></Button>
        </div>
    );

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image_url,
        "datePublished": post.created_at,
        "description": post.excerpt,
        "author": {
            "@type": "Organization",
            "name": "Lumoscale"
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Helmet>
                <title>{post.title} | Lumoscale</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`https://www.lumoscale.com/blog/${post.slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image_url} />
                <meta property="og:type" content="article" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            {/* Floating Back Button */}
            <div
                className="fixed top-24 left-4 z-50 md:left-8 hidden lg:block"
            >
                <Button
                    variant="outline"
                    asChild
                    className="rounded-full bg-black/50 backdrop-blur-md border-white/10 text-white hover:bg-white/10 hover:text-emerald-400 group transition-all"
                >
                    <Link to="/blog" state={{ from: location.state?.from }}>
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                    </Link>
                </Button>
            </div>

            {/* Mobile Back Button (inline) */}
            <div className="lg:hidden container mx-auto px-4 pt-24 pb-4 relative z-10">
                <Link to="/blog" state={{ from: location.state?.from }} className="flex items-center text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
                </Link>
            </div>

            {/* Hero Header */}
            <div className="relative pt-10 pb-0 px-4">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div>
                        <div className="flex items-center gap-4 text-sm text-emerald-400 font-medium mb-4">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <span>5 min read</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mb-10">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {post.image_url && (
                <div
                    className="container mx-auto max-w-5xl px-4 mb-10"
                >
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <article className="container mx-auto max-w-3xl px-4 pb-32">
                <div
                    className="premium-blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Footer */}
            <div className="border-t border-white/10 py-12 bg-zinc-900/30">
                <div className="container mx-auto max-w-3xl px-4 flex justify-between items-center">
                    <p className="text-zinc-500">© 2026 Lumoscale Inc.</p>
                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => {
                            navigator.share({ title: post.title, url: window.location.href }).catch(() => { });
                        }}>
                            <Share2 className="h-4 w-4" /> Share Article
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;
