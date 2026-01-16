import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, TrendingUp, BarChart2, LogOut, ArrowDown } from 'lucide-react';
import Sidebar from './Sidebar';
import FashionCard from './FashionCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Dashboard({ wishlistCount, onAddToWishlist, onReset }) {
    const { logout, userProfile } = useUser();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        mood: 'Mellow',
        occasion: 'Business Brunch',
        palette: 'High Contrast',
        fabricWeight: 'Breathable'
    });

    const [recs, setRecs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const API_URL = 'https://api-fashion-ai.blacksky-cb6688f2.southindia.azurecontainerapps.io/fashion/recommend/text';

    // Reset pagination when search changes
    useEffect(() => {
        setPage(1);
        setRecs([]);
        setHasMore(true);
    }, [searchQuery]);

    useEffect(() => {
        const fetchRecs = async () => {
            // Only fetch if explicit search query is present
            if (!searchQuery) {
                // Fallback Mock Data if no search
                if (page === 1) {
                    setRecs([
                        {
                            name: "Silk-Blend Overcoat",
                            price: "₹12,500",
                            match: "98%",
                            img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400",
                            reason: `Matches your '${userProfile.climate || 'local'}' climate and ${filters.palette} palette.`
                        },
                        {
                            name: "Architectural Knit",
                            price: "₹4,200",
                            match: "94%",
                            img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400",
                            reason: `Aligned with your ${filters.fabricWeight} weight preference for ${filters.mood} states.`
                        },
                        {
                            name: "Monolith Derby Shoes",
                            price: "₹8,900",
                            match: "89%",
                            img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=400",
                            reason: `Reinforces your ${userProfile.base?.[0] || 'Selected'} aesthetic core.`
                        }
                    ]);
                }
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                // Incremental K strategy
                const limit = page * 6;
                const url = `${API_URL}?query=${encodeURIComponent(searchQuery)}&k=${limit}`;
                console.log('Fetching:', url);

                const response = await fetch(url);
                if (!response.ok) throw new Error('API Error');

                const data = await response.json();
                const items = Array.isArray(data) ? data : (data.results || []);

                const mappedItems = items.map(item => {
                    let displayName = null;

                    // STRATEGY 1: Extract from path (e.g. ".../Mosaic_Print_Pocket_Tee/img_0033.jpg")
                    // The folder name 'Mosaic_Print_Pocket_Tee' is usually the best product name.
                    if (item.image_path) {
                        try {
                            const parts = item.image_path.split('/');
                            if (parts.length >= 2) {
                                // Get the folder name (second to last item)
                                const folderName = parts[parts.length - 2];
                                // Check if it looks like a name (has underscores, not just "img")
                                if (folderName && folderName.includes('_')) {
                                    displayName = folderName.replace(/_/g, ' ');
                                }
                            }
                        } catch (e) {
                            console.warn('Path parse error', e);
                        }
                    }

                    // STRATEGY 2: Construct from attributes if Path strategy failed
                    if (!displayName) {
                        const parts = [
                            item.brand,
                            item.color_primary,
                            item.style,
                            item.primary_category || item.categories
                        ].filter(Boolean);

                        if (parts.length > 0) {
                            displayName = parts.join(' ');
                        }
                    }

                    // Final Cleanup: Capitalize
                    if (displayName) {
                        displayName = displayName.replace(/\b\w/g, l => l.toUpperCase());
                    }

                    return {
                        name: displayName || "Fashion Item",
                        price: item.price ? `₹${item.price.toLocaleString()}` : "₹4,500",
                        match: item.similarity ? `${Math.round(item.similarity * 100)}%` : "N/A",
                        // Note: item.image_path is local, so we MUST rely on item.image_url or fallback
                        img: item.image_url || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400",
                        reason: item.description || (item.style ? `${item.style} style` : "Matched via Text Search")
                    };
                });

                setRecs(mappedItems);
                setHasMore(items.length >= limit);
            } catch (error) {
                console.error('Fetch failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchRecs, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, page, userProfile, filters]);

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="flex bg-gray-50 min-h-screen font-sans">
            <Sidebar filters={filters} setFilters={setFilters} onReset={onReset} />

            <main className="flex-1 ml-80 p-12">
                {/* Header */}
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-serif text-gray-900 mb-2">Refining for {filters.occasion}</h1>
                        <p className="text-gray-500">Curating for {userProfile.vibe} Vibe • {userProfile.body} Architecture</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/about')}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            <span>System Architecture</span>
                        </button>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <ShoppingBag size={18} />
                            <span className="font-semibold text-sm">Wardrobe ({wishlistCount})</span>
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                window.location.href = '/login';
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                {/* Search */}
                <div className="relative mb-12">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={`Search for pieces matching your DNA...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-6 py-4 rounded-full border-none shadow-sm focus:ring-2 focus:ring-black/5 bg-white text-lg"
                    />
                </div>

                {/* Tabs */}
                <div className="mb-8 border-b border-gray-200">
                    <div className="flex gap-8">
                        <TabButton active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} icon={Sparkles} label="AI Personal Edit" />
                        <TabButton active={activeTab === 'trends'} onClick={() => setActiveTab('trends')} icon={TrendingUp} label="Global Trend Radar" />
                        <TabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={BarChart2} label="Style Analytics" />
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'personal' && (
                            <div>
                                <div className="bg-blue-50 border border-blue-100 text-blue-800 px-4 py-3 rounded-xl mb-8 text-sm flex items-center gap-2">
                                    <Sparkles size={16} />
                                    <span>Suggestions optimized for <b>{userProfile.body}</b> architecture and <b>{filters.palette}</b> logic.</span>
                                </div>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {recs.map((item, idx) => (
                                            <FashionCard key={`${item.name}-${idx}`} item={item} onSave={onAddToWishlist} />
                                        ))}
                                    </div>

                                    {/* Load More / Loading State */}
                                    {isLoading ? (
                                        <div className="col-span-full h-32 flex items-center justify-center text-gray-500">
                                            <Sparkles className="animate-spin mr-2" />
                                            {page === 1 ? 'Curating your feed...' : 'Loading more items...'}
                                        </div>
                                    ) : (
                                        searchQuery && hasMore && (
                                            <div className="flex justify-center pt-4">
                                                <button
                                                    onClick={handleLoadMore}
                                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
                                                >
                                                    View More Results <ArrowDown size={16} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'trends' && (
                            <div>
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <TrendMetric label="Gorpcore Aesthetic" value="+18%" status="Rising" color="text-green-600" />
                                    <TrendMetric label="Sustainable Linen" value="+24%" status="Seasonal" color="text-green-600" />
                                    <TrendMetric label="Monochrome Noir" value="-5%" status="Steady" color="text-orange-500" />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-96 relative group">
                                    <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000" className="w-full h-full object-cover" alt="Trend" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                                        <h3 className="text-2xl font-serif">Market Pulse 2026</h3>
                                        <p className="opacity-80">Emerging textures and biophilic designs taking center stage.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-2xl shadow-sm">
                                    <h3 className="font-serif text-xl mb-6">Hybrid Engine Weights</h3>
                                    <div className="space-y-4">
                                        <Bar label="Visual Similarity" value={45} />
                                        <Bar label="Personality Transformer" value={30} />
                                        <Bar label="Context Filter" value={25} />
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <h3 className="font-serif text-xl mb-4">Current Model Logic</h3>
                                    <ul className="space-y-4 text-sm text-gray-600 leading-relaxed">
                                        <li>1. <b>Personality Engine:</b> Prioritizing silhouettes for a <b>{userProfile.vibe}</b> vibe.</li>
                                        <li>2. <b>Visual Engine:</b> Heavily weighted toward <b>{filters.palette}</b> color harmony.</li>
                                        <li>3. <b>Context Engine:</b> Optimized for <b>{filters.occasion}</b> in a <b>{userProfile.climate}</b> environment.</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${active ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
        </button>
    );
}

function TrendMetric({ label, value, status, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-gray-500 text-sm mb-1">{label}</div>
            <div className={`text-3xl font-serif font-bold ${color} mb-1`}>{value}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">{status}</div>
        </div>
    )
}

function Bar({ label, value }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span className="font-semibold">{value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: `${value}%` }}></div>
            </div>
        </div>
    )
}
