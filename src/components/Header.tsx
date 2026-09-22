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
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center shrink-0">
          <div 
            id="brand-logo"
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#9f3d00] to-[#c74e00] flex items-center justify-center text-white shadow-md shadow-[#9f3d00]/25 group-hover:scale-105 transition-all duration-200">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl sm:text-2xl text-[#201a17] tracking-tight font-bold flex items-center gap-1">
              <span>RecipeHub</span>
              <span className="text-[#9f3d00] italic font-serif">AI</span>
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 text-xs font-semibold shrink min-w-0">
          {navLinks.map(({ id, label, icon: Icon, badge, count }) => {
            const isActive = activeTab === id || (id === 'ai-kitchen' && activeTab === 'generator');
            return (
              <button
                key={id}
                id={`header-nav-${id}`}
                onClick={() => setActiveTab(id as any)}
                className={`transition-all px-2 xl:px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#9f3d00] font-bold bg-[#fef1ea] shadow-2xs'
                    : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{label}</span>
                {badge && <span className="text-[10px] leading-none">{badge}</span>}
                {count !== undefined && count > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold leading-none">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Search, Create Action, Activity, Settings, Profile */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          
          {/* Header Search Input */}
          <div className="relative hidden md:flex items-center">
            <button
              onClick={handleSearchSubmit}
              title="Search"
              className="absolute left-3 text-[#594137] hover:text-[#9f3d00] cursor-pointer flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <input
              id="header-search-input"
              type="text"
              placeholder="Search recipes, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              className="w-28 lg:w-36 xl:w-48 bg-[#fef1ea] pl-8 pr-6 py-1.5 rounded-xl text-xs text-[#201a17] placeholder:text-[#8d7165] outline-none focus:bg-white focus:ring-2 focus:ring-[#9f3d00] transition-all font-medium border border-transparent focus:border-[#9f3d00]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create</span>
            </button>
          )}

          {/* Activity Log Button */}
          <button
            id="header-activity-btn"
            onClick={() => setActiveTab('activity')}
            title="Activity Timeline"
            className={`w-8 h-8 rounded-xl border transition-colors cursor-pointer hidden 2xl:flex items-center justify-center ${
              activeTab === 'activity'
                ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                : 'border-transparent text-gray-600 hover:bg-[#f8ece5]'
            }`}
          >
            <Activity className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            id="header-settings-btn"
            onClick={() => setActiveTab('settings')}
            title="Settings"
            className={`w-8 h-8 rounded-xl border transition-colors cursor-pointer hidden 2xl:flex items-center justify-center ${
              activeTab === 'settings'
                ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                : 'border-transparent text-gray-600 hover:bg-[#f8ece5]'
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
              className={`flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#fef1ea] border-[#9f3d00] text-[#9f3d00]'
                  : 'bg-white border-[#e1bfb2]/60 hover:border-[#9f3d00] text-[#201a17]'
              }`}
            >
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'}
                alt={profile.name || 'Profile'}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover ring-1 ring-[#9f3d00]/30 shrink-0"
              />
              <span className="text-xs font-bold truncate max-w-[70px] xl:max-w-[90px] hidden sm:inline">
                {profile.name || 'Chef'}
              </span>
            </button>
          )}

          {/* Hub Menu Toggle Button (Available on Desktop and Mobile) */}
          <button
            id="header-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title={mobileMenuOpen ? 'Close Menu' : 'Open Navigation & Tools Menu'}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              mobileMenuOpen
                ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00] shadow-xs'
                : 'border-[#e1bfb2]/50 hover:border-[#9f3d00] text-[#594137] hover:text-[#9f3d00] hover:bg-[#fef1ea] bg-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Quick Hub Navigation & Tools Drawer (Desktop & Mobile) */}
      {mobileMenuOpen && (
        <div className="bg-white/98 backdrop-blur-md border-b border-[#e1bfb2]/60 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            
            {/* Quick Header Search on Mobile/Tablet */}
            <div className="relative md:hidden">
              <Search className="absolute left-3.5 top-3 text-[#594137] w-4 h-4" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, chefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                    setMobileMenuOpen(false);
                  }
                }}
                className="w-full bg-[#fef1ea] pl-10 pr-4 py-2.5 text-xs rounded-xl text-[#201a17] focus:outline-none focus:ring-2 focus:ring-[#9f3d00] border border-transparent focus:border-[#9f3d00]"
              />
            </div>

            {/* Quick Navigation Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-[#8d7165] uppercase tracking-wider">
                  Navigation & Kitchen Studios
                </span>
                <span className="text-[11px] text-[#9f3d00] font-medium hidden sm:inline">
                  Click any studio to jump directly
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {navLinks.map(({ id, label, icon: Icon, badge, count }) => {
                  const isActive = activeTab === id || (id === 'ai-kitchen' && activeTab === 'generator');
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveTab(id as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer text-center ${
                        isActive
                          ? 'bg-[#9f3d00] text-white shadow-md shadow-[#9f3d00]/20'
                          : 'bg-[#faf6f3] text-[#594137] hover:text-[#201a17] hover:bg-[#f3ece6] border border-transparent hover:border-[#e1bfb2]/60'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Icon className="w-4 h-4" />
                        {badge && <span className="text-[10px]">{badge}</span>}
                      </div>
                      <span className="truncate w-full">{label}</span>
                      {count !== undefined && count > 0 && (
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive ? 'bg-white/25 text-white' : 'bg-[#9f3d00] text-white'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Chef Tools Bar */}
            <div className="pt-3 border-t border-[#e1bfb2]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {onOpenCreateRecipe && (
                  <button
                    onClick={() => {
                      onOpenCreateRecipe();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2.5 bg-[#9f3d00] hover:bg-[#c74e00] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Recipe</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveTab('ai-kitchen');
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#9f3d00]/10 to-[#c74e00]/10 hover:from-[#9f3d00]/20 hover:to-[#c74e00]/20 text-[#9f3d00] border border-[#9f3d00]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Sommelier Assistant</span>
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => {
                    setActiveTab('activity');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    activeTab === 'activity'
                      ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                      : 'border-[#e1bfb2]/60 text-[#594137] hover:bg-[#faf6f3]'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Activity</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    activeTab === 'profile'
                      ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                      : 'border-[#e1bfb2]/60 text-[#594137] hover:bg-[#faf6f3]'
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
                  className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    activeTab === 'settings'
                      ? 'bg-[#fef1ea] text-[#9f3d00] border-[#9f3d00]'
                      : 'border-[#e1bfb2]/60 text-[#594137] hover:bg-[#faf6f3]'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
