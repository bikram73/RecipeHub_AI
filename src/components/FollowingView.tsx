import React, { useState } from 'react';
import { Recipe, Creator } from '../types';
import { ChefHat, Star, Users, Check, Plus, Flame, Clock, Play, UserCheck, UserPlus, Sparkles } from 'lucide-react';
import { CREATOR_PROFILES } from '../data/creators';
import { getProfile, saveProfile, logActivity } from '../utils/storage';

interface FollowingViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe, e?: React.MouseEvent) => void;
  onViewCreatorProfile?: (creator: Creator) => void;
}

export const FollowingView: React.FC<FollowingViewProps> = ({
  recipes,
  onSelectRecipe,
  onStartCooking,
  onViewCreatorProfile,
}) => {
  const profile = getProfile();
  const [followingList, setFollowingList] = useState<string[]>(profile.following || ['creator-rahul', 'creator-maya']);

  const toggleFollow = (id: string, name: string) => {
    let updated: string[];
    if (followingList.includes(id)) {
      updated = followingList.filter((item) => item !== id);
    } else {
      updated = [...followingList, id];
    }
    setFollowingList(updated);
    const updatedProfile = { ...profile, following: updated };
    saveProfile(updatedProfile);
    logActivity({
      type: 'saved_recipe',
      title: followingList.includes(id) ? 'Unfollowed Chef' : 'Followed Chef',
      description: `${followingList.includes(id) ? 'Unfollowed' : 'Started following'} ${name}`,
    });
  };

  // Recipes from chefs user follows
  const followingChefs = CREATOR_PROFILES.filter((c) => followingList.includes(c.id));
  const followedChefNames = followingChefs.map((c) => c.name.toLowerCase());
  const feedRecipes = recipes.filter((r) =>
    followedChefNames.some((n) => r.author?.name?.toLowerCase().includes(n))
  );

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef1ea] text-[#9f3d00] text-xs font-bold mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Community Creators</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Master Chefs & Culinary Creators
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Stay inspired by world-class culinary instructors, artisan bakers, and Michelin-trained home chefs.
        </p>
      </div>

      {/* Chefs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {CREATOR_PROFILES.map((chef) => {
          const isFollowing = followingList.includes(chef.id);
          return (
            <div
              key={chef.id}
              className="bg-white rounded-3xl border border-amber-100/80 p-4 shadow-xs flex flex-col items-center text-center gap-3 relative overflow-hidden group hover:shadow-md transition-all"
            >
              <span className="absolute top-2.5 right-2.5 bg-[#fff8f5] text-[#9f3d00] text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200/60">
                {chef.badge}
              </span>

              <div 
                onClick={() => onViewCreatorProfile?.(chef)}
                className="relative cursor-pointer mt-2"
              >
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-100 group-hover:scale-105 transition-transform"
                />
              </div>

              <div 
                onClick={() => onViewCreatorProfile?.(chef)}
                className="cursor-pointer"
              >
                <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-[#9f3d00] transition-colors">
                  {chef.name}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-1">{chef.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-600 font-bold mt-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{chef.rating}</span>
                  <span className="text-gray-400 font-normal">• {chef.recipesCount} dishes</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFollow(chef.id, chef.name)}
                className={`w-full py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  isFollowing
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                    : 'bg-[#9f3d00] hover:bg-[#c74e00] text-white shadow-2xs'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Latest Feed from Followed Chefs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
              Fresh from Followed Chefs
            </h2>
            <p className="text-xs text-gray-500">New creations and seasonal updates from your culinary circle.</p>
          </div>
          <span className="text-xs font-semibold text-[#9f3d00]">
            {feedRecipes.length} dishes in feed
          </span>
        </div>

        {feedRecipes.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-gray-100">
            <ChefHat className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Follow more chefs above to see their recipes populated in your home feed!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {feedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                    {recipe.cuisine}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => onStartCooking(recipe, e)}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-[#9f3d00] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Cook</span>
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={recipe.author?.avatar}
                        alt={recipe.author?.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-medium text-gray-600">{recipe.author?.name}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#9f3d00] transition-colors line-clamp-1">
                      {recipe.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9f3d00]" />
                      <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{recipe.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
