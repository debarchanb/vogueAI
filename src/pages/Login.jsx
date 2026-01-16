import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Database, Cpu, ScanEye, Zap, Layers, Wand2, Shirt, CloudSun, TrendingUp, Globe, Scissors, Gem, Watch, Glasses, PenTool } from 'lucide-react';
import { useUser } from '../context/UserContext';

const HERO_IMAGE = "/hero.png";

const TECH_STACK = ["CLIP Vision", "FAISS Vector", "RAG Context", "Hybrid Filtering"];
const RUNWAY_IMAGES = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000",
    "https://images.unsplash.com/photo-1529139574466-a302d27f60d0?q=80&w=1000",
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000"
];

// Floating Fashion Icon Component
const FloatingIcon = ({ icon: Icon, delay, x, y }) => (
    <motion.div
        animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
            duration: 6,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className="absolute text-[#D96C4E]/20 pointer-events-none z-0"
        style={{ left: x, top: y }}
    >
        <Icon size={48} />
    </motion.div>
);

// Stitching Logo Component
const StitchedBrand = () => (
    <div className="relative inline-block mb-4 p-6">
        {/* Animated Dashed Border (Stitch Effect) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.rect
                x="2" y="2" width="96%" height="96%" rx="15"
                fill="none"
                stroke="#D96C4E"
                strokeWidth="2"
                strokeDasharray="8 6"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </svg>
        <Zap size={32} className="text-[#D96C4E] fill-current relative z-10" />
    </div>
);

export default function Login() {
    const { login } = useUser();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('SPV');
    const [password, setPassword] = useState('SPV');
    const [techIndex, setTechIndex] = useState(0);
    const [runwayIndex, setRunwayIndex] = useState(0);

    // Cycle tech terms & Runway Images
    useEffect(() => {
        const techInterval = setInterval(() => {
            setTechIndex(prev => (prev + 1) % TECH_STACK.length);
        }, 3000);

        const runwayInterval = setInterval(() => {
            setRunwayIndex(prev => (prev + 1) % RUNWAY_IMAGES.length);
        }, 4000); // Slower cycle for images

        return () => {
            clearInterval(techInterval);
            clearInterval(runwayInterval);
        };
    }, []);

    const handleEnter = async () => {
        setLoading(true);
        const res = await login(username, password);
        if (!res.success) {
            alert(res.message);
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex bg-[#F9F8F4] font-sans text-[#1A1A1A] overflow-hidden">

            {/* LEFT SPLIT - SCROLLABLE CONTENT */}
            <div className="hidden lg:block w-3/5 h-full overflow-y-auto no-scrollbar scroll-smooth">
                <div className="p-6 space-y-4">

                    {/* 1. HERO SECTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="h-[85vh] w-full relative rounded-[2.5rem] overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-105"
                            style={{ backgroundImage: `url(${HERO_IMAGE})` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-12 text-white z-10 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg"
                            >
                                <Sparkles size={12} className="text-[#D96C4E]" />
                                <span>Neural Couture Interface</span>
                            </motion.div>
                            <h1 className="text-8xl font-serif leading-[0.9] mb-6 tracking-tight drop-shadow-2xl">
                                Style, <br />
                                <span className="italic font-light text-[#D96C4E]">Decoded.</span>
                            </h1>
                            <p className="opacity-90 text-xl font-light leading-relaxed drop-shadow-md">
                                Experience the first wardrobe operating system that thinks, plans, and curates for you.
                            </p>
                        </div>
                    </motion.div>

                    {/* 2. FEATURE BENTO GRID */}
                    <div className="grid grid-cols-2 gap-4 h-auto min-h-[50vh]">

                        {/* Box A: Neural Core */}
                        <motion.div
                            whileHover={{ scale: 0.98, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
                            className="bg-[#111] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden text-white min-h-[300px]"
                        >
                            <div className="z-10">
                                <div className="p-3 bg-white/5 rounded-xl w-fit mb-4"><Cpu className="text-[#D96C4E]" /></div>
                                <h3 className="text-2xl font-bold mb-2">Neural Core</h3>
                                <div className="text-gray-400 font-mono text-sm">
                                    Process: <br />
                                    <span className="text-[#D96C4E]">{TECH_STACK[techIndex]}</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>

                            {/* Animated Grid Lines */}
                            <div className="absolute inset-0 overflow-hidden opacity-20">
                                <motion.div
                                    animate={{ y: ["0%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-[2px] bg-[#D96C4E]"
                                />
                            </div>
                        </motion.div>

                        {/* Box B: Stats */}
                        <motion.div
                            whileHover={{ scale: 0.98, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" }}
                            className="bg-white rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden border border-gray-100 shadow-sm min-h-[300px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-[#f0f0f0] rounded-xl w-fit"><Database className="text-[#1a1a1a]" /></div>
                                <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    ONLINE
                                </span>
                            </div>

                            <div>
                                <div className="text-5xl font-serif font-bold text-[#1a1a1a] mb-1">2.4M+</div>
                                <div className="text-gray-500 font-medium tracking-wide">Vectors Indexed</div>
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">
                                    <ScanEye size={14} />
                                    <span>Visual Embedding Match</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: ["0%", "100%"] }}
                                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                        className="h-full bg-[#1a1a1a]"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Box C: Global Trend Pulse (Dynamic Runway) */}
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="col-span-2 bg-[#D96C4E] rounded-[2rem] p-8 text-white relative overflow-hidden min-h-[250px] flex items-center"
                        >
                            <div className="z-10 w-1/2 relative">
                                <div className="p-3 bg-white/10 rounded-xl w-fit mb-4"><Globe className="text-white" /></div>
                                <h3 className="text-3xl font-serif mb-2">Global Trend Pulse</h3>
                                <p className="opacity-90">Real-time analysis of 500+ runway shows and street style feeds.</p>
                            </div>

                            {/* Image Cycler */}
                            <div className="absolute inset-0 mix-blend-overlay opacity-50">
                                <AnimatePresence mode='wait'>
                                    <motion.img
                                        key={runwayIndex}
                                        src={RUNWAY_IMAGES[runwayIndex]}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="w-full h-full object-cover"
                                        alt="Runway Feed"
                                    />
                                </AnimatePresence>
                            </div>

                            <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                    <TrendingUp size={64} className="opacity-50" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3. HOW IT WORKS */}
                    <div className="bg-white rounded-[2.5rem] p-12 relative overflow-hidden border border-gray-100 shadow-sm">
                        <div className="text-center max-w-lg mx-auto mb-16">
                            <div className="inline-block p-3 rounded-full bg-gray-50 mb-4"><Layers size={24} className="text-gray-400" /></div>
                            <h2 className="text-4xl font-serif">The Process</h2>
                            <p className="text-gray-500 mt-4">Automating style from chaos to clarity.</p>
                        </div>

                        <div className="space-y-12 relative">
                            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gray-100 to-transparent hidden md:block"></div>

                            {[
                                { icon: Shirt, title: "1. Connect Wardrobe", desc: "Sync your digital closet. Vision models identify attributes instantly." },
                                { icon: Wand2, title: "2. AI Synthesis", desc: "Profile matching against local weather and social contexts." },
                                { icon: Sparkles, title: "3. Daily Curation", desc: "Wake up to 3 perfect outfit options. Select & Go." }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex gap-8 relative group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white border-4 border-[#F9F8F4] group-hover:border-[#D96C4E] transition-colors shadow-sm flex items-center justify-center z-10 shrink-0">
                                        <step.icon className="text-[#1a1a1a] group-hover:text-[#D96C4E] transition-colors" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#D96C4E] transition-colors">{step.title}</h3>
                                        <p className="text-gray-500 leading-relaxed max-w-md">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="h-24"></div>
                </div>
            </div>

            {/* RIGHT SPLIT - STICKY LOGIN */}
            <div className="w-full lg:w-2/5 h-full flex items-center justify-center p-8 bg-[#F9F8F4] lg:border-l border-gray-100 relative shadow-2xl lg:shadow-none z-20">

                {/* FLOATING ICONS BACKGROUND */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <FloatingIcon icon={Scissors} delay={0} x="10%" y="20%" />
                    <FloatingIcon icon={Gem} delay={2} x="80%" y="15%" />
                    <FloatingIcon icon={Watch} delay={1} x="15%" y="80%" />
                    <FloatingIcon icon={Glasses} delay={3} x="85%" y="70%" />
                    <FloatingIcon icon={PenTool} delay={4} x="70%" y="40%" />
                </div>

                <div className="max-w-md w-full relative z-10">
                    <div className="text-center mb-10 mt-16">
                        <StitchedBrand />
                        <h2 className="text-4xl font-serif text-[#1a1a1a] mb-3">VogueAI</h2>
                        <p className="text-gray-500 text-lg">Sign in to initialize session.</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl shadow-[#D96C4E]/5 space-y-8 relative overflow-hidden border border-white group">

                        {/* Glow Effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D96C4E] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-500"></div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#F9F9F9] border-none rounded-2xl px-5 py-5 text-gray-900 focus:ring-2 focus:ring-[#D96C4E]/20 transition-all outline-none font-medium text-lg placeholder-gray-300 hover:bg-[#f5f5f5]"
                                placeholder="cher"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#F9F9F9] border-none rounded-2xl px-5 py-5 text-gray-900 focus:ring-2 focus:ring-[#D96C4E]/20 transition-all outline-none font-medium text-lg placeholder-gray-300 hover:bg-[#f5f5f5]"
                                    placeholder="••••••••"
                                />
                                <Lock size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleEnter}
                            disabled={loading}
                            className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all flex items-center justify-center gap-3 mt-6 group/btn relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles size={24} />
                                </motion.div>
                            ) : (
                                <>
                                    <span>Enter Wardrobe</span>
                                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>

                        <div className="text-center pt-2">
                            <a href="#" className="text-sm font-medium text-gray-400 hover:text-[#D96C4E] transition-colors">Forgot Access Key?</a>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos */}
                        <div className="font-serif font-bold text-xl hover:text-[#D96C4E] transition-colors cursor-pointer">VOGUE</div>
                        <div className="font-serif font-bold text-xl italic hover:text-[#D96C4E] transition-colors cursor-pointer">ELLE</div>
                        <div className="font-serif font-bold text-xl hover:text-[#D96C4E] transition-colors cursor-pointer">Harpers</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
