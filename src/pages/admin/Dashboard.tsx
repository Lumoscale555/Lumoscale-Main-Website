import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2, LayoutDashboard, LogOut, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        // Prevent accidental back navigation
        window.history.pushState(null, '', window.location.href);
        const handlePopState = (e: PopStateEvent) => {
            window.history.pushState(null, '', window.location.href);
            setShowLogoutDialog(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Error fetching posts');
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        const { error } = await supabase.from('posts').delete().eq('id', deleteId);

        if (error) {
            toast.error('Error deleting post');
        } else {
            toast.success('Post deleted');
            setPosts(posts.filter((post) => post.id !== deleteId));
        }
        setDeleteId(null);
    };

    const handleLogout = async () => {
        setShowLogoutDialog(false);
        setIsLoggingOut(true);

        // Premium delay for animation
        await new Promise(resolve => setTimeout(resolve, 1500));

        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <AnimatePresence mode="wait">
            {!isLoggingOut ? (
                <motion.div
                    key="dashboard-content"
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                    className="min-h-screen bg-black text-white p-8"
                >
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/20">
                                    <LayoutDashboard className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                                    <p className="text-zinc-400 text-sm">Manage your blog content</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10">
                                            <LogOut className="mr-2 h-4 w-4" /> Logout
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-zinc-400">
                                                You will be signed out of your admin session.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 border-none">No</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700 border-none">Yes</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Button asChild className="!bg-white !text-black hover:!bg-zinc-100 hover:!text-black border-none rounded-full px-6 font-bold transition-all shadow-lg hover:scale-105 active:scale-95">
                                    <Link to="/admin/editor">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Create New Post
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <Card className="bg-white/5 border-white/10 overflow-hidden">
                            <CardHeader className="border-b border-white/10">
                                <CardTitle className="text-white">All Posts</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {loading ? (
                                    <div className="p-10 text-center text-zinc-500">Loading posts...</div>
                                ) : posts.length === 0 ? (
                                    <div className="p-20 text-center text-zinc-500 space-y-4">
                                        <p>No posts found.</p>
                                        <Button variant="outline" asChild className="border-white/10 text-black !bg-white hover:!bg-zinc-100 font-bold transition-all hover:scale-105 active:scale-95">
                                            <Link to="/admin/editor">Create your first post</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader className="bg-white/5 hover:bg-white/5">
                                            <TableRow className="border-white/10 hover:bg-transparent">
                                                <TableHead className="text-zinc-400">Title</TableHead>
                                                <TableHead className="text-zinc-400">Status</TableHead>
                                                <TableHead className="text-zinc-400">Date</TableHead>
                                                <TableHead className="text-right text-zinc-400">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {posts.map((post, i) => (
                                                <motion.tr
                                                    key={post.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="border-white/5 hover:bg-white/5 transition-colors group"
                                                >
                                                    <TableCell className="font-bold text-white text-base py-6">{post.title}</TableCell>
                                                    <TableCell>
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${post.published
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_-4px_rgba(16,185,129,0.3)]'
                                                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20 shadow-none'
                                                            }`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                                                            {post.published ? 'Live on Website' : 'Draft (Hidden)'}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-zinc-400">{new Date(post.created_at).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                            <Button variant="ghost" size="icon" asChild className="hover:bg-blue-500/20 hover:text-blue-400 text-zinc-400">
                                                                <Link to={`/admin/editor/${post.id}`}>
                                                                    <Pencil className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(post.id)} className="hover:bg-red-500/20 hover:text-red-400 text-zinc-400">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>

                        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                            <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-zinc-400">
                                        This action cannot be undone. This will permanently delete the article.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 border-none">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700 border-none">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="logout-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-4 space-y-6"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                        <div className="relative w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-2xl">
                            <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Signing Out...</h2>
                        <p className="text-zinc-500">Securely ending your session</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dashboard;
