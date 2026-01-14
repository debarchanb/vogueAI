import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Onboarding({ onComplete }) {
    const [formData, setFormData] = useState({
        openness: 'Contemporary',
        vibe: 'Approachable',
        body: 'Rectangular',
        height: 'Average',
        silhouette: 'Relaxed',
        fit: 'Balanced',
        base: [],
        icon: '',
        fabrics: [],
        climate: 'Warm/Tropical',
        eco: 'Medium'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleMultiSelect = (field, value) => {
        setFormData(prev => {
            const current = prev[field];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(item => item !== value) };
            } else {
                if (field === 'base' && current.length >= 3) return prev;
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif text-gray-900 mb-4">VogueAI</h1>
                    <p className="text-xl text-gray-500">Encoding your Style Genome through AI and Psychology.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-12"
                >
                    {/* Section 1 */}
                    <section>
                        <h3 className="text-2xl font-serif mb-6 border-b pb-2">1. Psychological & Social Identity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Style Curiousness</label>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Traditional</span><span>Avant-Garde</span>
                                </div>
                                <input
                                    type="range" min="0" max="2" step="1"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                    onChange={(e) => {
                                        const opts = ["Traditional", "Contemporary", "Avant-Garde"];
                                        handleChange('openness', opts[e.target.value]);
                                    }}
                                />
                                <div className="text-center mt-2 font-medium text-black">{formData.openness}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Social Energy</label>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Private</span><span>Iconic</span>
                                </div>
                                <input
                                    type="range" min="0" max="2" step="1"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                    onChange={(e) => {
                                        const opts = ["Private", "Approachable", "Iconic"];
                                        handleChange('vibe', opts[e.target.value]);
                                    }}
                                />
                                <div className="text-center mt-2 font-medium text-black">{formData.vibe}</div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h3 className="text-2xl font-serif mb-6 border-b pb-2">2. Body Geometry & Fit</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField label="Body Architecture" value={formData.body} onChange={(v) => handleChange('body', v)}
                                options={["Rectangular", "Inverted Triangle", "Pear", "Oval", "Trapezoid"]} />
                            <SelectField label="Height Profile" value={formData.height} onChange={(v) => handleChange('height', v)}
                                options={["Petite", "Average", "Tall"]} />
                            <SelectField label="Preferred Silhouette" value={formData.silhouette} onChange={(v) => handleChange('silhouette', v)}
                                options={["Slim", "Structured", "Relaxed", "Oversized"]} />
                            <SelectField label="Fit Comfort Level" value={formData.fit} onChange={(v) => handleChange('fit', v)}
                                options={["Tailored", "Balanced", "Comfort-First"]} />
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h3 className="text-2xl font-serif mb-6 border-b pb-2">3. Aesthetic Pillars</h3>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Select your 'Style DNA' (Max 3):</label>
                            <div className="flex flex-wrap gap-3">
                                {["Minimalist", "Dark Academia", "Gorpcore", "Quiet Luxury", "Vintage Revival"].map(style => (
                                    <button
                                        key={style}
                                        onClick={() => handleMultiSelect('base', style)}
                                        className={`px-4 py-2 rounded-full text-sm transition-all ${formData.base.includes(style)
                                                ? 'bg-black text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Style Icons</label>
                            <input
                                type="text"
                                placeholder="e.g. 90s Grunge, Minimalist Icons"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                                onChange={(e) => handleChange('icon', e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h3 className="text-2xl font-serif mb-6 border-b pb-2">4. Material & Sustainability</h3>
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <div className="flex flex-wrap gap-3 mb-6">
                                {["Cotton", "Linen", "Wool", "Silk", "Denim", "Leather"].map(fabric => (
                                    <button
                                        key={fabric}
                                        onClick={() => handleMultiSelect('fabrics', fabric)}
                                        className={`px-4 py-2 rounded-full text-sm border transition-all ${formData.fabrics.includes(fabric)
                                                ? 'border-black bg-white shadow-md'
                                                : 'border-transparent bg-white/50 hover:bg-white '
                                            }`}
                                    >
                                        {fabric}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority for Eco-Materials: {formData.eco}</label>
                                <input
                                    type="range" min="0" max="2" step="1"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-800"
                                    onChange={(e) => {
                                        const opts = ["Low", "Medium", "High"];
                                        handleChange('eco', opts[e.target.value]);
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h3 className="text-2xl font-serif mb-6 border-b pb-2">5. Global Context</h3>
                        <SelectField label="Primary Climate" value={formData.climate} onChange={(v) => handleChange('climate', v)}
                            options={["Warm/Tropical", "Continental", "Cold/Arctic"]} />
                    </section>

                    <div className="pt-8">
                        <button
                            onClick={() => onComplete(formData)}
                            className="w-full bg-black text-white py-4 rounded-full text-lg font-medium hover:bg-gray-900 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
                        >
                            <Sparkles size={20} />
                            Unveil My AI Dashboard
                            <ArrowRight size={20} />
                        </button>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

function SelectField({ label, value, onChange, options }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 bg-white appearance-none"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    )
}
