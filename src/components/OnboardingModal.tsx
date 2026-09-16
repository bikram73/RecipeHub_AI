import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, ArrowRight, Check, Utensils, User, AtSign, BookOpen, X } from 'lucide-react';
import { LocalProfile } from '../types';
import { saveProfile, setOnboarded, logActivity } from '../utils/storage';

interface OnboardingModalProps {
  isOpen?: boolean;
  initialProfile?: LocalProfile | null;
  onComplete: (profile: LocalProfile) => void;
  onClose?: () => void;
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
  'Middle Eastern',
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

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen = true,
  initialProfile,
  onComplete,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState(initialProfile?.name && initialProfile.name !== 'Home Chef' ? initialProfile.name : '');
  const [username, setUsername] = useState(initialProfile?.username && initialProfile.username !== 'chef' ? initialProfile.username : '');
  const [isUsernameCustom, setIsUsernameCustom] = useState(Boolean(initialProfile?.username && initialProfile.username !== 'chef'));
  const [bio, setBio] = useState(initialProfile?.bio || '');
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile?.avatar || AVATAR_OPTIONS[0]);
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>(
    initialProfile?.favoriteCuisines && initialProfile.favoriteCuisines.length > 0
      ? initialProfile.favoriteCuisines
      : ['Indian', 'Italian']
  );
  const [diet, setDiet] = useState(initialProfile?.diet || 'No Preference');
  const [cookingLevel, setCookingLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Master Home Chef'>(
    (initialProfile?.cookingLevel as any) || 'Intermediate'
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProfile) {
      if (initialProfile.name && initialProfile.name !== 'Home Chef') {
        setName(initialProfile.name);
      }
      if (initialProfile.username && initialProfile.username !== 'chef') {
        setUsername(initialProfile.username);
        setIsUsernameCustom(true);
      }
      if (initialProfile.bio) setBio(initialProfile.bio);
      if (initialProfile.avatar) setSelectedAvatar(initialProfile.avatar);
      if (initialProfile.favoriteCuisines && initialProfile.favoriteCuisines.length > 0) {
        setFavoriteCuisines(initialProfile.favoriteCuisines);
      }
      if (initialProfile.diet) setDiet(initialProfile.diet);
      if (initialProfile.cookingLevel) setCookingLevel(initialProfile.cookingLevel as any);
    }
  }, [initialProfile, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    setError(null);
    if (!isUsernameCustom) {
      const slug = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      setUsername(slug);
    }
  };

  const toggleCuisine = (cuisine: string) => {
    if (favoriteCuisines.includes(cuisine)) {
      if (favoriteCuisines.length > 1) {
        setFavoriteCuisines(favoriteCuisines.filter((c) => c !== cuisine));
      }
    } else {
      setFavoriteCuisines([...favoriteCuisines, cuisine]);
    }
  };

  const handleNextStep = () => {
    if (!name.trim()) {
      setError('Please enter your name to personalize your recipe experience.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Home Chef';
    const finalUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') || 'chef';
    const finalBio = bio.trim() || 'Home cook exploring flavorful recipes and AI kitchen ideas!';

    const finalProfile: LocalProfile = {
      id: `user-${Date.now()}`,
      name: finalName,
      username: finalUsername,
      bio: finalBio,
      avatar: selectedAvatar,
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
    setOnboarded(true);
    logActivity({
      type: 'created_recipe',
      title: 'Profile Initialized',
      description: `Welcome ${finalProfile.name} (@${finalProfile.username}) to RecipeHub AI!`,
    });
    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-100 flex flex-col max-h-[92vh]">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#9f3d00] to-[#c74e00] p-6 text-white relative flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-inner shrink-0">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Welcome to RecipeHub AI
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                {step === 1 ? "Let's Get Acquainted" : 'Personalize Your Kitchen'}
              </h2>
              <p className="text-xs text-white/80 mt-0.5">Step {step} of 2 • Stored 100% locally in your browser</p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-[#594137] leading-relaxed">
                Welcome to RecipeHub AI! Please enter your name and cooking persona to personalize your recipes, AI suggestions, and culinary notebook.
              </p>

              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Choose Your Avatar
                </label>
                <div className="flex items-center gap-3">
                  {AVATAR_OPTIONS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`relative rounded-full transition-all cursor-pointer p-0.5 ${
                        selectedAvatar === av
                          ? 'ring-3 ring-[#9f3d00] scale-105 shadow-md'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={av}
                        alt="Avatar Option"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {selectedAvatar === av && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#9f3d00] rounded-full flex items-center justify-center text-white text-[10px]">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Alex Morgan, Priya Sharma, Marco Rossi"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm text-gray-900 bg-[#fdfcfb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Chef Handle / Username
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setIsUsernameCustom(true);
                      setUsername(e.target.value);
                    }}
                    placeholder="chef_alex"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm text-gray-900 bg-[#fdfcfb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Culinary Bio
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="e.g. Passionate home cook exploring authentic spices, quick meals, and AI flavor pairings..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm text-gray-900 resize-none bg-[#fdfcfb]"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 font-medium">
                  {error}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleNextStep}
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
                  Favorite Cuisines (Select what you love)
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
                        <Utensils className="w-3.5 h-3.5 shrink-0 text-[#9f3d00]" />
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
                  <span>Start Cooking as {name || 'Home Chef'}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
