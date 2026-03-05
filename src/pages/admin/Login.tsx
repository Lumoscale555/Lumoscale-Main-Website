import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('admin_email');
        if (savedEmail) setEmail(savedEmail);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulated delay for premium feel if response is too fast
        const minTimeArr = new Promise(resolve => setTimeout(resolve, 800));

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        await minTimeArr;

        if (error) {
            toast.error(error.message);
            setLoading(false);
        } else {
            localStorage.setItem('admin_email', email);
            setSuccess(true);
            // Wait for success animation
            setTimeout(() => {
                navigate('/admin');
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-4 text-center pb-8">
                        <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold text-white">Admin Access</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AnimatePresence mode="wait">
                            {!success ? (
                                <motion.form
                                    key="login-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleLogin}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                                            <Input
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="bg-black/50 border-white/10 pl-10 h-12 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                                            <Input
                                                type="password"
                                                name="password"
                                                autoComplete="current-password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="bg-black/50 border-white/10 pl-10 h-12 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/50"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 bg-white hover:bg-zinc-200 text-black font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Sign In <ArrowRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success-view"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-8 space-y-4"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-xl font-bold text-white">Access Granted</h3>
                                        <p className="text-zinc-400 text-sm">Redirecting to dashboard...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;