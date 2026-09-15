import React from 'react';
import { Star, UserPlus, UserCheck, X, Clock, Flame, ChefHat, Sparkles } from 'lucide-react';
import { Creator, Recipe } from '../types';

interface CreatorProfileModalProps {
  isOpen: boolean;
  creator: Creator | null;
  recipes: Recipe[];
  isFollowing: boolean;
  onToggleFollow: (creatorId: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onClose: () => void;
}

export const CreatorProfileModal: React.FC<CreatorProfileModalProps> = ({
  isOpen,
  creator,
  recipes,
  isFollowing,
  onToggleFollow,
  onSelectRecipe,
  onClose,
}) => {
  if (!isOpen || !creator) return null;

  // Filter recipes matching this creator
  const creatorRecipes = recipes.filter(
    (r) =>
      r.author?.name?.toLowerCase().includes(creator.name.toLowerCase()) ||
      r.author?.role?.toLowerCase().includes(creator.specialty.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        {/* Header Background */}
        <div className="relative h-36 bg-gradient-to-r from-[#9f3d00] via-[#c74e00] to-[#ffab69] p-6 text-white flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{creator.badge}</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full bg-black/20 hover:bg-black/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Overlay */}
        <div className="px-6 pb-6 pt-0 relative flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white shrink-0"
              />
              <div className="pt-2">
                <h3 className="text-2xl font-serif font-bold text-gray-900">{creator.name}</h3>
                <p className="text-xs text-gray-500 font-medium">@{creator.username} • {creator.role}</p>
              </div>
            </div>

            <button
              onClick={() => onToggleFollow(creator.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isFollowing
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-[#9f3d00] hover:bg-[#c74e00] text-white'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Follow Chef</span>
                </>
              )}
            </button>
          </div>

          {/* Bio & Specialty */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/80 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">{creator.bio}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600 font-medium pt-2 border-t border-amber-200/50">
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-[#9f3d00]" />
                <span>Specialty: <strong>{creator.specialty}</strong></span>
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{creator.rating} Chef Rating</span>
              </span>
              <span>👥 {(creator.followersCount + (isFollowing ? 1 : 0)).toLocaleString()} Followers</span>
            </div>
          </div>

          {/* Published Recipes Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif text-lg font-bold text-gray-900">
                Published Recipes ({creatorRecipes.length})
              </h4>
            </div>

            {creatorRecipes.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">More recipes from {creator.name} coming soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {creatorRecipes.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => {
                      onClose();
                      onSelectRecipe(rec);
                    }}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={rec.imageUrl}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{rec.cookTimeMinutes + rec.prepTimeMinutes}m</span>
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-gray-900 text-[11px] font-bold shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{rec.rating}</span>
                      </span>
                    </div>
                    <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-[#9f3d00] uppercase tracking-wider">
                          {rec.cuisine}
                        </span>
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-[#9f3d00] transition-colors line-clamp-1 mt-0.5">
                          {rec.title}
                        </h5>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                        <span>{rec.difficulty}</span>
                        <span className="text-[#9f3d00] font-semibold group-hover:underline">View Recipe →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
