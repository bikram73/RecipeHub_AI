import React, { useState } from 'react';
import { ChefHat, Sparkles, Plus, Search, Bookmark, Users, Activity, Settings, Menu, X, Compass, Home, Calendar, Package } from 'lucide-react';
import { ActiveTab, LocalProfile } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  groceryCount?: number;
  myRecipesCount?: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreateRecipe?: () => void;
  profile?: LocalProfile;
  onOpenOnboarding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  myRecipesCount = 0,
  searchQuery,
  setSearchQuery,
  onOpenCreateRecipe,
  profile,
  onOpenOnboarding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'ai-kitchen', label: 'AI Kitchen', icon: Sparkles, badge: '✨' },
    { id: 'pantry', label: 'Pantry', icon: Package },
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'my-recipes', label: 'My Recipes', icon: ChefHat, count: myRecipesCount },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: savedCount },
    { id: 'following', label: 'Chefs', icon: Users },
  ];

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setActiveTab('explore');
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(41,35,31,0.04)] border-b border-[#e1bfb2]/30">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <div 
            id="brand-logo"
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#9f3d00] to-[#c74e00] flex items-center justify-center text-white shadow-md shadow-[#9f3d00]/25 group-hover:scale-105 transition-all duration-200">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-lg sm:text-2xl text-[#201a17] tracking-tight font-bold flex items-center gap-1">
              <span>RecipeHub</span>
              <span className="text-[#9f3d00] italic font-serif">AI</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium">
            {navLinks.map(({ id, label, icon: Icon, badge, count }) => {
              const isActive = activeTab === id || (id === 'ai-kitchen' && activeTab === 'generator');
              return (
                <button
                  key={id}
                  id={`header-nav-${id}`}
                  onClick={() => setActiveTab(id as any)}
                  className={`transition-all px-2.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer text-xs ${
                    isActive
                      ? 'text-[#9f3d00] font-bold bg-[#fef1ea] shadow-2xs'
                      : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                  {badge && <span className="text-[10px]">{badge}</span>}
                  {count !== undefined && count > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Create Recipe, Search, Profile, Activity, Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Header Search Input */}
          <div className="relative hidden md:flex items-center">
            <button
              onClick={handleSearchSubmit}
              title="Search"
              className="absolute left-3 text-[#594137] hover:text-[#9f3d00] cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              id="header-search-input"
              type="text"
              placeholder="Search dishes, ingredients, chefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              className="w-40 lg:w-56 bg-[#fef1ea] pl-9 pr-7 py-2 rounded-xl text-xs text-[#201a17] placeholder:text-[#8d7165] outline-none focus:bg-white focus:ring-2 focus:ring-[#9f3d00] transition-all font-medium border border-transparent focus:border-[#9f3d00]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-stone-400 hover:text-stone-700 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Create Recipe Action Button */}
          {onOpenCreateRecipe && (
            <button
              id="header-create-recipe-btn"
              onClick={onOpenCreateRecipe}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </button>
          )}

          {/* Activity Log Button */}
          <button
            id="header-activity-btn"
            onClick={() => setActiveTab('activity')}
            title="Activity Timeline"
            className={`p-2 rounded-xl border transition-colors cursor-pointer hidden md:flex items-center justify-center ${
              activeTab === 'activity'
                ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                : 'border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            id="header-settings-btn"
            onClick={() => setActiveTab('settings')}
            title="Settings"
            className={`p-2 rounded-xl border transition-colors cursor-pointer hidden sm:flex items-center justify-center ${
              activeTab === 'settings'
                ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                : 'border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Chef Profile Pill */}
          {profile && (
            <button
              id="header-profile-btn"
              onClick={() => setActiveTab('profile')}
              title={`Chef Profile: ${profile.name || 'Your Profile'}`}
              className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#fef1ea] border-[#9f3d00] text-[#9f3d00]'
                  : 'bg-white/80 border-[#e1bfb2]/60 hover:border-[#9f3d00] text-[#201a17]'
              }`}
            >
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'}
                alt={profile.name || 'Profile'}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#9f3d00]/30"
              />
              <span className="text-xs font-bold truncate max-w-[80px] lg:max-w-[110px] hidden sm:inline">
                {profile.name || 'Chef'}
              </span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            id="header-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 p-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl max-h-[80vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 text-[#594137] w-4 h-4" />
            <input
              type="text"
              placeholder="Search dishes, ingredients, chefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                  setMobileMenuOpen(false);
                }
              }}
              className="w-full bg-[#fef1ea] pl-10 pr-4 py-2 text-xs rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#9f3d00]"
            />
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id as any);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === id
                    ? 'bg-[#9f3d00] text-white'
                    : 'bg-[#faf6f3] text-gray-700 hover:bg-[#f3ece6]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {count !== undefined && count > 0 && (
                  <span className={`ml-auto px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === id ? 'bg-white/20 text-white' : 'bg-[#9f3d00] text-white'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Extra Actions Bar */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
            {onOpenCreateRecipe && (
              <button
                onClick={() => {
                  onOpenCreateRecipe();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-[#9f3d00] hover:bg-[#c74e00] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Recipe</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl border cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
