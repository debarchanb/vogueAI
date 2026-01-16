import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, Database, Layers, Sparkles, User, ShoppingBag, MessageSquare, GitBranch, Cpu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArchitectureNode = ({ icon: Icon, title, desc, delay, color = "bg-white", textColor = "text-gray-900" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay, duration: 0.5 }}
        className={`p-6 rounded-2xl ${color} shadow-sm border border-gray-100 flex flex-col gap-3 relative overflow-hidden group hover:shadow-md transition-shadow`}
    >
        <div className={`p-3 rounded-xl bg-black/5 w-fit ${textColor}`}>
            <Icon size={24} />
        </div>
        <h3 className={`text-lg font-bold ${textColor}`}>{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
            {desc}
        </p>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
    </motion.div>
);

const Connector = ({ vertical = false }) => (
    <div className={`flex items-center justify-center ${vertical ? 'h-8 w-full' : 'w-8 h-full'}`}>
        <div className={`bg-gray-200 ${vertical ? 'w-0.5 h-full' : 'h-0.5 w-full'}`}></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
    </div>
);

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#F9F8F4] text-[#1a1a1a] font-sans p-8 lg:p-12">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-16">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors font-medium">
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                </Link>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col md:flex-row justify-between items-end gap-6"
                >
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-[#D96C4E]">
                            System Architecture v2.0
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif leading-tight">
                            Under the Hood: <span className="italic">VogueAI Engine</span>
                        </h1>
                        <p className="text-xl text-gray-500 mt-4 font-light">
                            A multi-agent system orchestrating behavioral profiling, visual retrieval, and LLM-based re-ranking.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Architecture Diagram Canvas */}
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Layer 1: User Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-1">1. User Inputs</h2>
                        <div className="space-y-4">
                            <ArchitectureNode delay={0.1} icon={User} title="Personality & Mood" desc="Questionnaire inputs and daily mood selectors." />
                            <ArchitectureNode delay={0.2} icon={ShoppingBag} title="Purchase History" desc="Past transactions and brand preferences." />
                        </div>
                    </div>

                    {/* Arrow / Flow */}
                    <div className="hidden lg:flex flex-col justify-center items-center">
                        <ArrowRight className="text-gray-300" />
                    </div>

                    {/* Layer 2: Profiling & Memory */}
                    <div className="lg:col-span-2 space-y-4 bg-purple-50/50 p-6 rounded-[2rem] border border-purple-100">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4 px-1">2. Profiling & Memory Agent</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ArchitectureNode delay={0.3} icon={Brain} title="UserProfilingAgent" desc="Synthesizes inputs into a coherent style persona." />
                            <ArchitectureNode delay={0.4} icon={Database} title="Memory Agent" desc="Stores STM (Session) and LTM (Profile) context." />
                        </div>
                        <div className="mt-4 p-4 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg"><Cpu size={16} className="text-purple-600" /></div>
                            <div className="text-sm font-medium text-purple-900">User Conditioning Step <span className="opacity-50 mx-2">→</span> Vector Store</div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex justify-center py-4">
                    <div className="h-16 w-0.5 bg-gradient-to-b from-gray-200 to-gray-300"></div>
                </div>

                {/* Layer 3: AI Recommendation Engine */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-green-50/50 p-6 rounded-[2rem] border border-green-100">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-green-600 mb-4 px-1">3. AI Recommendation Engine</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <ArchitectureNode delay={0.5} icon={Search} title="QueryBuilderAgent" desc="Translates user intent into vector queries." />
                                <ArchitectureNode delay={0.6} icon={Layers} title="Hybrid Scoring" desc="Visual Similarity + Behavioral + Context Scoring." />
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="p-4 bg-white rounded-xl border border-green-100 shadow-sm">
                                    <h4 className="font-bold mb-2 text-sm">Product Image DB</h4>
                                    <div className="h-2 bg-gray-100 rounded-full mb-2 w-3/4"></div>
                                    <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-green-100 shadow-sm">
                                    <h4 className="font-bold mb-2 text-sm">US Vector Store</h4>
                                    <div className="h-2 bg-gray-100 rounded-full mb-2 w-full"></div>
                                    <div className="h-2 bg-gray-100 rounded-full w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layer 4: Re-Ranking */}
                    <div className="lg:col-span-1 bg-yellow-50/50 p-6 rounded-[2rem] border border-yellow-100">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-yellow-600 mb-4 px-1">4. Re-Ranking & Output</h2>
                        <div className="space-y-4">
                            <ArchitectureNode delay={0.7} icon={GitBranch} title="ReRank Agent" desc="LLM-based final filtering for relevance." />
                            <ArchitectureNode delay={0.8} icon={MessageSquare} title="Explainability" desc="Generates 'Why we picked this' text." />

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="mt-8 p-4 bg-[#1a1a1a] text-white rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={16} className="text-[#D96C4E]" />
                                    <span className="font-bold text-sm">Final Recommendation</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <div className="w-8 h-10 bg-gray-700 rounded-md"></div>
                                        <div className="w-8 h-10 bg-gray-700 rounded-md"></div>
                                        <div className="w-8 h-10 bg-gray-700 rounded-md"></div>
                                    </div>
                                    <div className="h-1.5 bg-gray-700 rounded-full w-3/4"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Original Architecture Reference */}
            <div className="max-w-4xl mx-auto mt-24">
                <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-gray-400">
                    Reference Diagram
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200"
                >
                    <img
                        src="/architecture-diagram.png"
                        alt="VogueAI System Architecture"
                        className="w-full h-auto"
                    />
                </motion.div>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
                VogueAI Architecture • Powered by Multi-Agent RAG System
            </div>
        </div>
    );
}
