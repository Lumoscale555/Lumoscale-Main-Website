import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2, LayoutDashboard, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        const { error } = await supabase.from('posts').delete().eq('id', id);

        if (error) {
            toast.error('Error deleting post');
        } else {
            toast.success('Post deleted');
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
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
                        <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                        <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-none rounded-full px-6">
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
                                <Button variant="outline" asChild className="border-white/10 text-white hover:bg-white/5">
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
                                            <TableCell className="font-medium text-white">{post.title}</TableCell>
                                            <TableCell>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${post.published
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                    }`}>
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-zinc-400">{new Date(post.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" asChild className="hover:bg-blue-500/20 hover:text-blue-400 text-zinc-400">
                                                        <Link to={`/admin/editor/${post.id}`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="hover:bg-red-500/20 hover:text-red-400 text-zinc-400">
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
            </div>
        </div>
    );
};

export default Dashboard;
