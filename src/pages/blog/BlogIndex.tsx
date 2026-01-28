import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const BlogIndex = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const isFromInsights = location.state?.from === 'insights';
    // backLink logic moved to handleBackClick
    const backText = isFromInsights ? 'Back to Insights' : 'Back to Home';


    const handleBackClick = () => {
        if (isFromInsights) {
            navigate('/', { state: { scrollTo: 'blog-preview' } });
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        // Always scroll to top first unless there's a specific hash to a section
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
        
        fetchPosts();
    }, []);

    useEffect(() => {
        if (window.location.hash) {
            // Use a slight delay to allow layout to settle, but keep it minimal
            const scrollToElement = () => {
                const elm = document.getElementById(window.location.hash.substring(1));
                if (elm) {
                    elm.scrollIntoView({ behavior: 'smooth' });
                }
            };
            
            // Try immediately, then with a small delay if needed
            scrollToElement();
            setTimeout(scrollToElement, 100);
        }
    }, [window.location.hash, posts]);

    useEffect(() => {
        // Always scroll to top first unless there's a specific hash to a section
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Error loading posts');
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    return (
        <section className="min-h-screen bg-black relative overflow-hidden">
             <Helmet>
                <title>Blog - Lumoscale | AI & Automation Insights</title>
                <meta name="description" content="Explore the latest insights on AI automation, digital transformation, and business scalability strategies." />
            </Helmet>

            {/* Back Button */}
            <div
                className="fixed top-8 left-6 z-50 hidden lg:block"
            >
                <Button
                    variant="ghost"
                    onClick={handleBackClick}
                    className="group text-zinc-400 hover:text-white hover:bg-white/5 rounded-full px-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {backText}
                </Button>
            </div>

            {/* Mobile Back Button */}
            <div className="lg:hidden absolute top-6 left-4 z-50">
                <button
                    onClick={handleBackClick}
                    className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white flex items-center gap-2 text-sm font-medium"
                >
                    <ArrowLeft className="h-4 w-4" /> {backText}
                </button>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 py-24 relative z-10 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-20 space-y-6">
                    <div
                        className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-zinc-300"
                    >
                        Lumoscale Insights
                    </div>

                    <h1
                        className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-500 pb-2"
                    >
                        Latest Insights.
                    </h1>

                    <p
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Strategies and technical deep-dives on how we help agencies scale with AI.
                    </p>
                </div>

                {loading ? null : posts.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500 border border-white/5 rounded-3xl bg-white/[0.02]">
                        <p>No articles published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <article
                                key={post.id}
                                className="group relative flex flex-col h-full"
                            >
                                <Link
                                    to={`/blog/${post.slug}`} 
                                    className="absolute inset-0 z-20"
                                    state={{ from: isFromInsights ? 'insights' : undefined }}
                                />

                                <div className="relative h-full flex flex-col bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-green-500/50 group-hover:shadow-[0_0_50px_-15px_rgba(34,197,94,0.2)]">
                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 opacity-60" />
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                <span className="text-zinc-700 text-4xl font-bold">Ls.</span>
                                            </div>
                                        )}

                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white group-hover:bg-green-500/10 group-hover:border-green-500/30 group-hover:text-green-400 transition-colors">
                                                {post.tags?.[0] || 'Article'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-6">
                                        <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4 group-hover:text-zinc-300 transition-colors">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                5 min read
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-white group-hover:text-green-400 transition-colors mt-auto">
                                            Read Article
                                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogIndex;
