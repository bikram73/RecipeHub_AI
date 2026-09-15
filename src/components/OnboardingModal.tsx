import React, { useState } from 'react';
import { ChefHat, Sparkles, ArrowRight, Check, Utensils } from 'lucide-react';
import { LocalProfile } from '../types';
import { saveProfile, logActivity } from '../utils/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: LocalProfile) => void;
}

const CUISINE_OPTIONS = [
  'Indian',
  'Italian',
  'Mexican',
  'Chinese',
  'Japanese',
  'French-Nordic',
  'Mediterranean',
  'Thai',
  'American',
];

const DIET_OPTIONS = [
  'No Preference',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'High-Protein',
  'Keto',
  'Dairy-Free',
];

const LEVEL_OPTIONS: ('Beginner' | 'Intermediate' | 'Advanced' | 'Master Home Chef')[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Master Home Chef',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('Bikram Manna');
  const [username, setUsername] = useState('bikram');
  const [bio, setBio] = useState('Home cook & culinary explorer. Exploring spices and AI recipes!');
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>(['Indian', 'Italian', 'Mediterranean']);
  const [diet, setDiet] = useState('No Preference');
  const [cookingLevel, setCookingLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Master Home Chef'>('Intermediate');

  if (!isOpen) return null;

  const toggleCuisine = (cuisine: string) => {
    if (favoriteCuisines.includes(cuisine)) {
      setFavoriteCuisines(favoriteCuisines.filter((c) => c !== cuisine));
    } else {
      setFavoriteCuisines([...favoriteCuisines, cuisine]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProfile: LocalProfile = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'Culinary Creator',
      username: username.trim().toLowerCase().replace(/\s+/g, '') || 'chef',
      bio: bio.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      favoriteCuisines: favoriteCuisines.length > 0 ? favoriteCuisines : ['Indian', 'Italian'],
      diet,
      cookingLevel,
      following: ['creator-rahul', 'creator-maya'],
      savedRecipes: ['rec-1', 'rec-3'],
      collections: [
        {
          id: 'col-default-1',
          name: '🍝 My Favorite Recipes',
          description: 'Personal collection of tried & loved meals.',
          recipeIds: ['rec-1', 'rec-3'],
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    };

    saveProfile(finalProfile);
    logActivity({
      type: 'created_recipe',
      title: 'Profile Initialized',
      description: `Welcome ${finalProfile.name} to RecipeHub AI!`,
    });
    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-100 flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#9f3d00] to-[#c74e00] p-6 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" /> Welcome to RecipeHub AI
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">Personalize Your Kitchen</h2>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Let's set up your local culinary profile. All preferences are stored 100% privately in your browser.
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bikram Manna"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Username (@handle)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm font-semibold">@</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="bikram"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Culinary Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a sentence about what you like to cook..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm text-gray-900 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Continue to Food Preferences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Favorite Cuisines (Select multiple)
                </label>
                <div className="flex flex-wrap gap-2">
                  {CUISINE_OPTIONS.map((c) => {
                    const isSelected = favoriteCuisines.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCuisine(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#9f3d00] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Dietary Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DIET_OPTIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDiet(d)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                        diet === d
                          ? 'border-[#9f3d00] bg-[#fff8f5] text-[#9f3d00] font-bold shadow-xs'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Cooking Experience Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LEVEL_OPTIONS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCookingLevel(lvl)}
                      className={`p-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer border ${
                        cookingLevel === lvl
                          ? 'border-[#9f3d00] bg-[#fff8f5] text-[#9f3d00] font-bold'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 shrink-0" />
                        <span>{lvl}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Cooking & Exploring</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
