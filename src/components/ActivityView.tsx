import React, { useState } from 'react';
import { Activity, Bookmark, Star, MessageSquare, ChefHat, Sparkles, FolderPlus, Trash2, ArrowLeft } from 'lucide-react';
import { ActivityItem } from '../types';
import { getActivity } from '../utils/storage';

interface ActivityViewProps {
  onNavigate: (tab: any) => void;
  onSelectRecipeById?: (recipeId: string) => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ onNavigate, onSelectRecipeById }) => {
  const [activities] = useState<ActivityItem[]>(getActivity());
  const [filter, setFilter] = useState<'all' | 'saved' | 'rated' | 'ai' | 'created'>('all');

  const filtered = activities.filter((act) => {
    if (filter === 'all') return true;
    if (filter === 'saved') return act.type === 'saved_recipe';
    if (filter === 'rated') return act.type === 'rated_recipe';
    if (filter === 'ai') return act.type === 'generated_ai';
    if (filter === 'created') return act.type === 'created_recipe';
    return true;
  });

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'saved_recipe':
        return <Bookmark className="w-4 h-4 text-rose-500" />;
      case 'rated_recipe':
        return <Star className="w-4 h-4 text-amber-500 fill-amber-500" />;
      case 'commented':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'created_recipe':
        return <ChefHat className="w-4 h-4 text-[#9f3d00]" />;
      case 'generated_ai':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'created_collection':
        return <FolderPlus className="w-4 h-4 text-emerald-500" />;
      case 'deleted_recipe':
        return <Trash2 className="w-4 h-4 text-gray-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const mins = Math.floor(diffMs / 60000);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);

      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => onNavigate('profile')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">Culinary Activity Log</h1>
              <p className="text-xs text-gray-500">Your recent cooking actions, bookmarks, ratings & AI interactions.</p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['all', 'saved', 'rated', 'ai', 'created'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === f
                  ? 'bg-[#9f3d00] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'ai' ? '✨ AI Gen' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 text-base">No activities recorded yet</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Save a recipe, submit a rating, or use the AI kitchen to start building your culinary activity timeline.
          </p>
          <button
            onClick={() => onNavigate('explore')}
            className="mt-4 px-5 py-2.5 bg-[#9f3d00] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            Explore Recipes
          </button>
        </div>
      ) : (
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all flex items-start gap-3.5 group"
            >
              {/* Timeline Marker Icon */}
              <div className="absolute -left-[30px] top-4 w-6 h-6 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center shadow-xs">
                {getIcon(item.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-900">{item.title}</span>
                  <span className="text-[11px] text-gray-400 font-medium">{formatTime(item.timestamp)}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>

                {item.recipeTitle && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fff8f5] text-[#9f3d00] text-xs font-semibold">
                    <span>🍳 {item.recipeTitle}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
