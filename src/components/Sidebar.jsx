import React from 'react';
import { Sliders, RefreshCw, Upload, Camera } from 'lucide-react';

export default function Sidebar({ filters, setFilters, onReset }) {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-80 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 p-6 flex flex-col overflow-y-auto z-20">
            <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold">VogueAI</h2>

            </div>

            <div className="space-y-8 flex-1">

                {/* Active Filters */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 pointer-events-none">
                        <Sliders size={16} />
                        <h3>Active Filters</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-2 block">Current Mood</label>
                            <input
                                type="range" min="0" max="3" step="1"
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                onChange={(e) => {
                                    const opts = ["Mellow", "Focused", "Electric", "Regal"];
                                    handleChange('mood', opts[e.target.value]);
                                }}
                            />
                            <div className="text-right text-xs mt-1 font-medium">{filters.mood}</div>
                        </div>

                        <SelectFilter label="Mission" value={filters.occasion}
                            options={["Business Brunch", "Midnight Social", "Art Gallery", "Outdoor Adventure"]}
                            onChange={(v) => handleChange('occasion', v)} />

                        <SelectFilter label="Color Theory" value={filters.palette}
                            options={["High Contrast", "Monochromatic", "Analogous", "Earth Tones"]}
                            onChange={(v) => handleChange('palette', v)} />

                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-2 block">Fabric Weight</label>
                            <input
                                type="range" min="0" max="2" step="1"
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                onChange={(e) => {
                                    const opts = ["Ultra-light", "Breathable", "Heavy/Structured"];
                                    handleChange('fabricWeight', opts[e.target.value]);
                                }}
                            />
                            <div className="text-right text-xs mt-1 font-medium">{filters.fabricWeight}</div>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* Vision Synthesis */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900">
                        <Camera size={16} />
                        <h3>Vision Synthesis</h3>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-black transition-colors cursor-pointer group">
                        <Upload className="mx-auto text-gray-300 group-hover:text-black mb-2 transition-colors" size={24} />
                        <p className="text-xs text-gray-400">Upload inspiration...</p>
                    </div>
                </section>

            </div>

            <div className="pt-6 border-t border-gray-100">
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <RefreshCw size={16} />
                    Reset DNA Profile
                </button>
            </div>
        </div>
    );
}

function SelectFilter({ label, value, options, onChange }) {
    return (
        <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm py-2 border-b border-gray-200 focus:border-black focus:outline-none bg-transparent"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    )
}
