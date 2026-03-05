import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from "../hooks/use-mobile";

// Static fallback posts when Supabase table doesn't exist
const FALLBACK_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'How AI Text Agents Transform Lead Response Times',
        slug: 'ai-text-agents-lead-response',
        excerpt: 'Discover how businesses are using AI text agents to respond to leads in under 60 seconds and dramatically increase conversion rates.',
        content: '',
        published: true,
        created_at: new Date().toISOString(),
        image_url: null,
        author_id: 'system',
    },
    {
        id: '2',
        title: 'Voice AI: The Future of Customer Support',
        slug: 'voice-ai-customer-support',
        excerpt: 'Learn how AI voice agents are revolutionizing customer support with 24/7 availability and human-like conversations.',
        content: '',
        published: true,
        created_at: new Date().toISOString(),
        image_url: null,
        author_id: 'system',
    },
    {
        id: '3',
        title: '5 Ways to Qualify Leads Automatically with AI',
        slug: 'qualify-leads-with-ai',
        excerpt: 'Stop wasting time on unqualified leads. Here are 5 proven strategies for AI-powered lead qualification.',
        content: '',
        published: true,
        created_at: new Date().toISOString(),
        image_url: null,
        author_id: 'system',
    },
];

const BlogPreview = () => {
    const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS);
    const [loading, setLoading] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    // Mobile automation
    const isMobile = useIsMobile();
    const [activePostIndex, setActivePostIndex] = useState(0);

    useEffect(() => {
        if (!isMobile) return;
        const interval = setInterval(() => {
            setActivePostIndex(prev => (posts.length > 0 ? (prev + 1) % posts.length : (prev + 1) % FALLBACK_POSTS.length));
        }, 3000);
        return () => clearInterval(interval);
    }, [isMobile, posts.length]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (error) {
                    // Table doesn't exist or other error - use fallback
                    console.log('Using fallback posts:', error.message);
                    setUseFallback(true);
                    setPosts(FALLBACK_POSTS);
                } else if (data && data.length > 0) {
                    setPosts(data);
                } else {
                    // No posts in database - use fallback
                    setUseFallback(true);
                    setPosts(FALLBACK_POSTS);
                }
            } catch (err) {
                // Network or other error - use fallback
                console.log('Using fallback posts due to error');
                setUseFallback(true);
                setPosts(FALLBACK_POSTS);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // If we're using fallback, just show a nice section without database dependency
    if (useFallback) {
        return (
            <section id="blog-preview" className="py-16 mt-16 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    <div className="text-center mb-16 space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-white"
                        >
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">Insights</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-zinc-400 max-w-2xl mx-auto"
                        >
                            Strategies and guides on scaling your business with AI agents
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FALLBACK_POSTS.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                                data-active={isMobile && index === activePostIndex ? "true" : undefined}
                            >
                                <div className="h-full bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group-data-[active=true]:border-white/20">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4">
                                        <FileText className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 group-data-[active=true]:text-emerald-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-white/50 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="text-sm text-emerald-400 flex items-center gap-1">
                                        Coming Soon <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="blog-preview" className="py-16 mt-16 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-white"
                    >
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">Insights</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-zinc-400 max-w-2xl mx-auto"
                    >
                        Strategies, guides, and technical deep-dives on scaling your business with AI agents
                    </motion.p>
                </div>

                {loading ? null : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative flex flex-col h-full"
                                data-active={isMobile && index === activePostIndex ? "true" : undefined}
                            >
                                <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-20" state={{ from: 'insights' }} />

                                <div className="relative h-full flex flex-col bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-green-500/50 group-hover:shadow-[0_0_50px_-15px_rgba(34,197,94,0.2)] group-data-[active=true]:border-green-500/50 group-data-[active=true]:shadow-[0_0_50px_-15px_rgba(34,197,94,0.2)]">
                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 opacity-60" />
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 group-data-[active=true]:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                <span className="text-zinc-700 text-4xl font-bold">Ls.</span>
                                            </div>
                                        )}

                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white group-hover:bg-green-500/10 group-hover:border-green-500/30 group-hover:text-green-400 group-data-[active=true]:bg-green-500/10 group-data-[active=true]:border-green-500/30 group-data-[active=true]:text-green-400 transition-colors">
                                                {post.tags?.[0] || 'Article'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-6">
                                        <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4 group-hover:text-zinc-300 group-data-[active=true]:text-zinc-300 transition-colors">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                5 min read
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 group-data-[active=true]:text-green-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-white group-hover:text-green-400 group-data-[active=true]:text-green-400 transition-colors mt-auto">
                                            Read Article
                                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-data-[active=true]:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Button
                        asChild
                        className="bg-white text-black hover:bg-emerald-400 hover:text-black hover:border-emerald-500 rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105"
                    >
                        <Link to="/blog" state={{ from: 'insights' }}>
                            View All Articles <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
