import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        fetchPosts();
        if (window.location.hash) {
            const elm = document.getElementById(window.location.hash.substring(1));
            if (elm) elm.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

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
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <Helmet>
                <title>Insights | Lumoscale - AI Automation Agency</title>
                <meta name="description" content="Expert insights on AI automation, agency scaling, and operational efficiency." />
            </Helmet>

            {/* Back to Home Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-8 left-6 z-50 hidden lg:block"
            >
                <Button
                    variant="ghost"
                    asChild
                    className="group text-zinc-400 hover:text-white hover:bg-white/5 rounded-full px-4"
                >
                    <a href="/#blog-preview">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Blogs
                    </a>
                </Button>
            </motion.div>

            {/* Mobile Back Button */}
            <div className="lg:hidden absolute top-6 left-4 z-50">
                <a href="/#blog-preview" className="p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white flex items-center justify-center">
                    <ArrowLeft className="h-5 w-5" />
                </a>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 py-24 relative z-10 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-zinc-300"
                    >
                        Lumoscale Insights
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-500 pb-2"
                    >
                        Latest Insights.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Strategies and technical deep-dives on how we help agencies scale with AI.
                    </motion.p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[400px] bg-white/5 rounded-3xl animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500 border border-white/5 rounded-3xl bg-white/[0.02]">
                        <p>No articles published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative flex flex-col h-full"
                            >
                                <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-20" />

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
                                                Article
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
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogIndex;
