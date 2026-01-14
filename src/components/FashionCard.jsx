import React from 'react';
import { Plus } from 'lucide-react';

export default function FashionCard({ item, onSave }) {
    return (
        <div className="group fashion-card relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            {/* Confidence Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                ★ {item.match}
            </div>

            {/* Image */}
            <div className="relative h-[350px] overflow-hidden">
                <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-serif text-lg font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                    <button
                        onClick={() => onSave(item)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {/* AI Insight */}
                <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs leading-relaxed border-l-2 border-black">
                    <span className="font-semibold block mb-1">💡 AI Insight:</span>
                    {item.reason}
                </div>
            </div>
        </div>
    );
}
