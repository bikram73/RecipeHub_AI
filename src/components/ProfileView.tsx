import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Bookmark, Heart, Users, Sparkles, Edit3, Save, Check, Star, Activity, Settings, Plus, Camera, Upload, Image, X, Link as LinkIcon } from 'lucide-react';
import { LocalProfile, Recipe } from '../types';
import { saveProfile, getProfile, logActivity } from '../utils/storage';

interface ProfileViewProps {
  profile?: LocalProfile;
  recipes: Recipe[];
  onUpdateProfile?: (updated: LocalProfile) => void;
  onNavigate?: (tab: any) => void;
  onNavigateToTab?: (tab: any) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking?: (recipe: Recipe) => void;
  onOpenCreateRecipe: () => void;
}

const CUISINES = ['Indian', 'Italian', 'Mexican', 'French-Nordic', 'Japanese', 'Mediterranean', 'Chinese', 'Thai', 'American'];
const DIETS = ['No Preference', 'Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'Keto', 'Low-Carb'];
const LEVELS: ('Beginner' | 'Intermediate' | 'Advanced' | 'Master Home Chef')[] = ['Beginner', 'Intermediate', 'Advanced', 'Master Home Chef'];

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile: propProfile,
  recipes,
  onUpdateProfile,
  onNavigate,
  onNavigateToTab,
  onSelectRecipe,
  onStartCooking,
  onOpenCreateRecipe,
}) => {
  const currentProfile = propProfile || getProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentProfile?.name || 'Home Chef');
  const [username, setUsername] = useState(currentProfile?.username || 'chef');
  const [bio, setBio] = useState(currentProfile?.bio || '');
  const [avatar, setAvatar] = useState(currentProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80');
  const [diet, setDiet] = useState(currentProfile?.diet || 'No Preference');
  const [cookingLevel, setCookingLevel] = useState(currentProfile?.cookingLevel || 'Intermediate');
  const [favoriteCuisines, setFavoriteCuisines] = useState<string[]>(currentProfile?.favoriteCuisines || []);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigateHandler = onNavigate || onNavigateToTab || (() => {});

  useEffect(() => {
    if (propProfile) {
      setName(propProfile.name || 'Home Chef');
      setUsername(propProfile.username || 'chef');
      setBio(propProfile.bio || '');
      if (propProfile.avatar) setAvatar(propProfile.avatar);
      setDiet(propProfile.diet || 'No Preference');
      setCookingLevel(propProfile.cookingLevel || 'Intermediate');
      setFavoriteCuisines(propProfile.favoriteCuisines || []);
    }
  }, [propProfile]);

  // Stats calculation
  const myCreatedRecipes = recipes.filter(
    (r) => r.author?.name === currentProfile?.name || r.id.startsWith('user-rec-')
  );
  const savedCount = currentProfile?.savedRecipes?.length || 0;
  const collectionsCount = currentProfile?.collections?.length || 0;
  const followingCount = currentProfile?.following?.length || 0;
  const aiGeneratedCount = recipes.filter((r) => r.isAiGenerated).length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image file under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAvatar(result);
          const updated: LocalProfile = {
            ...currentProfile,
            avatar: result,
          };
          saveProfile(updated);
          if (onUpdateProfile) onUpdateProfile(updated);
          setUploadSuccessMessage('Profile photo updated successfully!');
          setTimeout(() => setUploadSuccessMessage(null), 3000);
          logActivity({
            type: 'created_recipe',
            title: 'Profile Photo Changed',
            description: 'Uploaded a custom photo for your chef profile.',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setAvatar(customUrlInput.trim());
      const updated: LocalProfile = {
        ...currentProfile,
        avatar: customUrlInput.trim(),
      };
      saveProfile(updated);
      if (onUpdateProfile) onUpdateProfile(updated);
      setCustomUrlInput('');
      setShowUrlField(false);
      setUploadSuccessMessage('Custom photo URL applied!');
      setTimeout(() => setUploadSuccessMessage(null), 3000);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: LocalProfile = {
      ...currentProfile,
      name: name.trim() || 'Home Chef',
      username: username.trim().toLowerCase() || 'chef',
      bio: bio.trim(),
      avatar: avatar || currentProfile.avatar,
      diet,
      cookingLevel,
      favoriteCuisines,
    };

    saveProfile(updated);
    if (onUpdateProfile) {
      onUpdateProfile(updated);
    }
    setIsEditing(false);
    setUploadSuccessMessage('Profile details saved!');
    setTimeout(() => setUploadSuccessMessage(null), 3000);
    logActivity({
      type: 'created_recipe',
      title: 'Profile Updated',
      description: 'Modified culinary profile and dietary goals.',
    });
  };

  const toggleCuisine = (c: string) => {
    if (favoriteCuisines.includes(c)) {
      setFavoriteCuisines(favoriteCuisines.filter((item) => item !== c));
    } else {
      setFavoriteCuisines([...favoriteCuisines, c]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Upload Notification Toast */}
      {uploadSuccessMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top duration-200 shadow-sm">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden mb-8">
        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-[#9f3d00] via-[#c74e00] to-[#ffab69] relative p-6 flex justify-between items-start text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Local Chef Studio</span>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Info & Stats */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 mb-6">
            <div className="flex items-end gap-5">
              
              {/* Custom Image / Profile Photo Avatar with Upload Overlay */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl bg-[#fef1ea] flex items-center justify-center">
                  <img
                    src={avatar || currentProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'}
                    alt={currentProfile?.name || 'Chef Profile'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Upload Action Trigger Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload Custom Photo"
                  className="absolute bottom-1 right-1 p-2 bg-[#9f3d00] hover:bg-[#c74e00] text-white rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center ring-2 ring-white"
                >
                  <Camera className="w-4 h-4" />
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">{currentProfile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">@{currentProfile.username} • {currentProfile.cookingLevel}</p>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-[#9f3d00] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>
                  <span className="text-gray-300">•</span>
                  <button
                    onClick={() => setShowUrlField(!showUrlField)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>Paste URL</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenCreateRecipe}
                className="px-4 py-2.5 bg-[#9f3d00] hover:bg-[#c74e00] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Recipe</span>
              </button>
              <button
                onClick={() => navigateHandler('settings')}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick URL Input Bar (Collapsible) */}
          {showUrlField && (
            <form onSubmit={handleApplyUrl} className="mb-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center gap-3 animate-in fade-in duration-200">
              <Image className="w-4 h-4 text-[#9f3d00] shrink-0" />
              <input
                type="url"
                placeholder="Paste custom photo URL (e.g. https://images.unsplash.com/...)"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="flex-1 bg-white px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-gray-900"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Apply Photo
              </button>
              <button
                type="button"
                onClick={() => setShowUrlField(false)}
                className="p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Bio & Details Display vs Edit Form */}
          {!isEditing ? (
            <div className="p-4 rounded-2xl bg-[#fff8f5] border border-amber-100 text-sm text-gray-700 leading-relaxed mb-8">
              <p>{currentProfile.bio || 'Home cook & culinary explorer.'}</p>
              <div className="mt-3 pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600">
                <span>🍽️ Diet: <strong className="text-gray-900">{currentProfile.diet}</strong></span>
                <span>🔥 Level: <strong className="text-gray-900">{currentProfile.cookingLevel}</strong></span>
                <span>❤️ Favorite Cuisines: <strong className="text-gray-900">{currentProfile.favoriteCuisines?.join(', ')}</strong></span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-5 mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Edit Profile & Preferences</h3>
              
              {/* Photo Upload Section Inside Edit Mode */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Custom Profile Photo
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-[#9f3d00]/30 shrink-0">
                    <img
                      src={avatar}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-[#fef1ea] hover:bg-[#f8ece5] text-[#9f3d00] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#e1bfb2]/60"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload From Device</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUrlField(!showUrlField)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-gray-200"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>Photo URL</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#9f3d00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#9f3d00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Bio</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#9f3d00] resize-none"
                />
              </div>

              {/* Diet Preference - Rich Pill Selector (Replaced Select Component) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Diet Preference</label>
                <div className="flex flex-wrap gap-2">
                  {DIETS.map((d) => {
                    const isSelected = diet === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDiet(d)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#9f3d00] text-white shadow-xs'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cooking Skill Level - Rich Pill Selector (Replaced Select Component) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Cooking Skill Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {LEVELS.map((lvl) => {
                    const isSelected = cookingLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setCookingLevel(lvl)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#9f3d00] text-white shadow-xs'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Favorite Cuisines</label>
                <div className="flex flex-wrap gap-2">
                  {CUISINES.map((c) => {
                    const sel = favoriteCuisines.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCuisine(c)}
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                          sel ? 'bg-[#9f3d00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Metric KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            <div 
              onClick={() => onNavigate('my-recipes')}
              className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 hover:bg-amber-100/70 transition-colors cursor-pointer text-center"
            >
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#9f3d00]">
                {myCreatedRecipes.length}
              </span>
              <p className="text-xs font-medium text-gray-600 mt-1">Recipes Created</p>
            </div>

            <div 
              onClick={() => onNavigate('saved')}
              className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 hover:bg-rose-100/70 transition-colors cursor-pointer text-center"
            >
              <span className="text-2xl sm:text-3xl font-serif font-bold text-rose-600">
                {savedCount}
              </span>
              <p className="text-xs font-medium text-gray-600 mt-1">Saved Recipes</p>
            </div>

            <div 
              onClick={() => onNavigate('collections')}
              className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/70 transition-colors cursor-pointer text-center"
            >
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700">
                {collectionsCount}
              </span>
              <p className="text-xs font-medium text-gray-600 mt-1">Collections</p>
            </div>

            <div 
              onClick={() => onNavigate('following')}
              className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 hover:bg-indigo-100/70 transition-colors cursor-pointer text-center"
            >
              <span className="text-2xl sm:text-3xl font-serif font-bold text-indigo-700">
                {followingCount}
              </span>
              <p className="text-xs font-medium text-gray-600 mt-1">Following Chefs</p>
            </div>

            <div 
              onClick={() => onNavigate('ai-kitchen')}
              className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 hover:bg-purple-100/70 transition-colors cursor-pointer text-center col-span-2 sm:col-span-1"
            >
              <span className="text-2xl sm:text-3xl font-serif font-bold text-purple-700 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5 text-purple-600" />
                {aiGeneratedCount}
              </span>
              <p className="text-xs font-medium text-gray-600 mt-1">AI Creations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigate('my-recipes')}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9f3d00] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">My Recipe Studio</h3>
            <p className="text-xs text-gray-500 mt-1">Manage published creations, drafts, edit instructions, and share.</p>
          </div>
          <span className="text-xs font-bold text-[#9f3d00] pt-4 group-hover:underline flex items-center gap-1">
            <span>View all recipes</span> →
          </span>
        </div>

        <div 
          onClick={() => onNavigate('activity')}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Culinary Activity Log</h3>
            <p className="text-xs text-gray-500 mt-1">Timeline of ratings, comments, saves, and AI recipe generations.</p>
          </div>
          <span className="text-xs font-bold text-blue-600 pt-4 group-hover:underline flex items-center gap-1">
            <span>View activity stream</span> →
          </span>
        </div>

        <div 
          onClick={() => onNavigate('settings')}
          className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Preferences & Data</h3>
            <p className="text-xs text-gray-500 mt-1">Theme, dietary rules, export JSON backup, or clear local storage.</p>
          </div>
          <span className="text-xs font-bold text-gray-700 pt-4 group-hover:underline flex items-center gap-1">
            <span>Open settings</span> →
          </span>
        </div>
      </div>
    </div>
  );
};
