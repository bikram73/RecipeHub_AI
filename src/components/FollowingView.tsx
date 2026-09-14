import React, { useState } from 'react';
import { Recipe } from '../types';
import { ChefHat, Star, Users, Check, Plus, Flame, Clock } from 'lucide-react';
import { CHEF_GIRL_AVATAR } from './HomeLandingView';

interface FollowingViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe, e?: React.MouseEvent) => void;
}

export const FollowingView: React.FC<FollowingViewProps> = ({
  onSelectRecipe,
  onStartCooking,
}) => {
  const [followedChefs, setFollowedChefs] = useState<Record<string, boolean>>({
    'chef-elena': true,
    'chef-vikram': true,
    'chef-sophia': false,
    'chef-paolo': true,
    'chef-marcus': false,
  });

  const chefs = [
    {
      id: 'chef-elena',
      name: 'Chef Elena Rostova',
      role: 'French-Nordic Gastronomy',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
      recipesCount: 38,
      followers: '14.2k',
      badge: 'Michelin Alum'
    },
    {
      id: 'chef-vikram',
      name: 'Vikram Sen',
      role: 'Heritage Indian Spices & Curries',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80',
      recipesCount: 45,
      followers: '28.6k',
      badge: 'Spicemaster'
    },
    {
      id: 'chef-sophia',
      name: 'Sophia Lin',
      role: 'Artisanal Italian & Pastry',
      avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=300&q=80',
      recipesCount: 29,
      followers: '9.8k',
      badge: 'Pastry Prodigy'
    },
    {
      id: 'chef-paolo',
      name: 'Paolo Romano',
      role: 'Sourdough & Ancient Grains',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      recipesCount: 52,
      followers: '31.1k',
      badge: 'Master Baker'
    }
  ];

  const toggleFollow = (id: string) => {
    setFollowedChefs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef1ea] text-[#9f3d00] text-xs font-bold mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Community Creators</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#201a17] tracking-tight">
          Master Chefs You Follow
        </h1>
        <p className="text-xs sm:text-sm text-[#594137]">
          Stay inspired by world-class culinary instructors, artisan bakers, and home chefs.
        </p>
      </div>

      {/* Chefs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {chefs.map((chef) => {
          const isFollowing = followedChefs[chef.id];
          return (
            <div
              key={chef.id}
              className="bg-white rounded-3xl border border-[#e1bfb2]/40 p-5 shadow-xs flex flex-col items-center text-center gap-4 relative overflow-hidden"
            >
              <div className="relative">
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-[#fef1ea] shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -top-1 -right-1 bg-[#9f3d00] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {chef.badge}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-[#201a17]">{chef.name}</h3>
                <p className="text-xs text-[#594137] mt-0.5">{chef.role}</p>

                <div className="flex items-center justify-center gap-3 mt-3 text-xs text-[#594137]">
                  <span><strong>{chef.recipesCount}</strong> Dishes</span>
                  <span>•</span>
                  <span><strong>{chef.followers}</strong> Cooks</span>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(chef.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isFollowing
                    ? 'bg-[#fef1ea] text-[#9f3d00] border border-[#e1bfb2]'
                    : 'bg-[#9f3d00] hover:bg-[#c74e00] text-white shadow-xs'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Follow Chef</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
