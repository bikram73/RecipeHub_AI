import React, { useState, useRef, useEffect } from 'react';
import { 
  ChefHat, 
  Sparkles, 
  Plus, 
  Search, 
  Bookmark, 
  Users, 
  Activity, 
  Settings, 
  Menu, 
  X, 
  Compass, 
  Home, 
  Calendar, 
  Package, 
  ChevronDown, 
  Layers, 
  ShoppingBag, 
  FolderPlus, 
  User, 
  ArrowRight,
  CookingPot,
  SlidersHorizontal
} from 'lucide-react';
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
  groceryCount = 0,
  myRecipesCount = 0,
  searchQuery,
  setSearchQuery,
  onOpenCreateRecipe,
  profile,
  onOpenOnboarding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary desktop navbar items (essential core)
  const primaryNavLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'ai-kitchen', label: 'AI Kitchen', icon: Sparkles, badge: '✨' },
    { id: 'my-recipes', label: 'My Recipes', icon: ChefHat, count: myRecipesCount },
  ];

  // Secondary tools & utilities housed under the Tools Menu
  const toolsNavLinks = [
    { id: 'planner', label: 'Meal Planner', description: 'Weekly calendar & meal matrix', icon: Calendar },
    { id: 'groceries', label: 'Grocery List', description: 'Smart shopping & ingredients', icon: ShoppingBag, count: groceryCount },
    { id: 'pantry', label: 'Pantry & Fridge', description: 'Smart inventory & match rates', icon: Package },
    { id: 'collections', label: 'Collections', description: 'Custom folders & playlists', icon: FolderPlus },
    { id: 'saved', label: 'Saved Recipes', description: 'Bookmarks & favorite dishes', icon: Bookmark, count: savedCount },
    { id: 'following', label: 'Chefs Network', description: 'Followed culinary creators', icon: Users },
    { id: 'activity', label: 'Activity Timeline', description: 'Cooking logs & AI history', icon: Activity },
    { id: 'settings', label: 'Preferences & Data', description: 'Dietary, theme & backups', icon: Settings },
  ];

  const isToolActive = toolsNavLinks.some(
    (t) => activeTab === t.id
  );

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setActiveTab('explore');
      setMobileMenuOpen(false);
    }
  };

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(41,35,31,0.04)] border-b border-[#e1bfb2]/30">
      <div className="h-16 sm:h-20 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Brand Logo & Desktop Navigation */}
        <div className="flex items-center gap-3 sm:gap-4 xl:gap-6 min-w-0">
          <div 
            id="brand-logo"
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 select-none"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#9f3d00] to-[#c74e00] flex items-center justify-center text-white shadow-md shadow-[#9f3d00]/25 group-hover:scale-105 transition-all duration-200 shrink-0">
              <ChefHat className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="font-serif text-lg sm:text-2xl text-[#201a17] tracking-tight font-bold flex items-center gap-0.5 sm:gap-1 shrink-0">
              <span>RecipeHub</span>
              <span className="text-[#9f3d00] italic font-serif">AI</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs font-semibold shrink-0">
            {primaryNavLinks.map(({ id, label, icon: Icon, badge, count }) => {
              const isActive = activeTab === id || (id === 'ai-kitchen' && activeTab === 'generator');
              return (
                <button
                  key={id}
                  id={`header-nav-${id}`}
                  onClick={() => handleNavigate(id as any)}
                  className={`transition-all px-2.5 xl:px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 select-none ${
                    isActive
                      ? 'text-[#9f3d00] font-bold bg-[#fef1ea] shadow-2xs'
                      : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{label}</span>
                  {badge && <span className="text-[10px] leading-none">{badge}</span>}
                  {count !== undefined && count > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold leading-none">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Desktop Tools Dropdown Menu Component */}
            <div className="relative shrink-0" ref={toolsDropdownRef}>
              <button
                id="header-nav-tools-dropdown"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`transition-all px-2.5 xl:px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 select-none ${
                  isToolActive || toolsDropdownOpen
                    ? 'text-[#9f3d00] font-bold bg-[#fef1ea] shadow-2xs ring-1 ring-[#9f3d00]/30'
                    : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#9f3d00] shrink-0" />
                <span>Tools</span>
                {isToolActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9f3d00] shrink-0 animate-pulse" />
                )}
                {(savedCount > 0 || groceryCount > 0) && !isToolActive && (
                  <span className="px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold leading-none">
                    {savedCount + groceryCount}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${toolsDropdownOpen ? 'rotate-180 text-[#9f3d00]' : 'text-gray-400'}`} />
              </button>

              {/* Tools Dropdown Panel */}
              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-[#e1bfb2]/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8d7165]">Kitchen Utilities</span>
                    <span className="text-[10px] text-gray-400 font-medium">{toolsNavLinks.length} Utilities</span>
                  </div>
                  <div className="py-1 space-y-0.5 max-h-80 overflow-y-auto">
                    {toolsNavLinks.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = activeTab === tool.id;
                      return (
                        <button
                          key={tool.id}
                          id={`header-dropdown-${tool.id}`}
                          onClick={() => handleNavigate(tool.id as any)}
                          className={`w-full p-2.5 rounded-xl flex items-start gap-3 text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#fef1ea] text-[#9f3d00]'
                              : 'hover:bg-[#faf6f3] text-gray-700'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                            isActive ? 'bg-[#9f3d00] text-white' : 'bg-[#fff5f0] text-[#9f3d00]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold truncate">{tool.label}</span>
                              {tool.count !== undefined && tool.count > 0 && (
                                <span className="px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold">
                                  {tool.count}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 truncate mt-0.5">{tool.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Search, Create Action, Profile, Mobile Menu */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          
          {/* Header Search Input (Desktop/Tablet) */}
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
              className="w-24 lg:w-28 xl:w-44 bg-[#fef1ea] pl-8 pr-6 py-1.5 rounded-xl text-xs text-[#201a17] placeholder:text-[#8d7165] outline-none focus:bg-white focus:ring-2 focus:ring-[#9f3d00] transition-all font-medium border border-transparent focus:border-[#9f3d00]"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create</span>
            </button>
          )}

          {/* User Chef Profile Pill */}
          {profile && (
            <button
              id="header-profile-btn"
              onClick={() => handleNavigate('profile')}
              title={`Chef Profile: ${profile.name || 'Your Profile'}`}
              className={`flex items-center gap-1.5 p-1 sm:pl-1 sm:pr-2.5 sm:py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shrink-0 ${
                activeTab === 'profile'
                  ? 'bg-[#fef1ea] border-[#9f3d00] text-[#9f3d00]'
                  : 'bg-white border-[#e1bfb2]/60 hover:border-[#9f3d00] text-[#201a17]'
              }`}
            >
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'}
                alt={profile.name || 'Profile'}
                className="w-7 h-7 sm:w-7 sm:h-7 rounded-lg object-cover ring-1 ring-[#9f3d00]/30 shrink-0"
              />
              <span className="text-xs font-bold truncate max-w-[70px] xl:max-w-[90px] hidden sm:inline">
                {profile.name || 'Chef'}
              </span>
            </button>
          )}

          {/* Hub & Tools Menu Toggle Button */}
          <button
            id="header-mobile-menu-btn"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setToolsDropdownOpen(false);
            }}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open All Pages & Kitchen Menu'}
            title={mobileMenuOpen ? 'Close Menu' : 'Open All Pages & Kitchen Menu'}
            className={`h-9 px-2.5 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 active:scale-95 ${
              mobileMenuOpen
                ? 'bg-[#9f3d00] text-white border-[#9f3d00] shadow-md shadow-[#9f3d00]/20'
                : 'border-[#e1bfb2]/60 hover:border-[#9f3d00] text-[#594137] hover:text-[#9f3d00] hover:bg-[#fef1ea] bg-white shadow-2xs'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="text-xs font-bold">Menu</span>
          </button>
        </div>

      </div>

      {/* Comprehensive All-Pages & Kitchen Tools Drawer for Mobile & Tablet */}
      {mobileMenuOpen && (
        <div className="bg-white/98 backdrop-blur-md border-b border-[#e1bfb2]/60 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
            
            {/* Quick Header Search on Mobile/Tablet */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 text-[#594137] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                className="w-full bg-[#fef1ea] pl-10 pr-20 py-2.5 text-xs rounded-xl text-[#201a17] focus:outline-none focus:ring-2 focus:ring-[#9f3d00] border border-transparent focus:border-[#9f3d00]"
              />
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#9f3d00] text-white text-xs font-bold rounded-lg hover:bg-[#c74e00] transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              {onOpenCreateRecipe && (
                <button
                  onClick={() => {
                    onOpenCreateRecipe();
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Recipe</span>
                </button>
              )}

              <button
                onClick={() => handleNavigate('ai-kitchen')}
                className="p-3 bg-[#fef1ea] hover:bg-[#ffdbcd] text-[#9f3d00] border border-[#9f3d00]/30 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#9f3d00]" />
                <span>AI Kitchen Studio</span>
              </button>
            </div>

            {/* SECTION 1: Core Exploration Hub */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-[#8d7165] uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#9f3d00]" />
                  <span>Core Studios & Feed</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">4 Destinations</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { id: 'home', label: 'Home Feed', desc: 'Featured recipes & daily picks', icon: Home },
                  { id: 'explore', label: 'Explore Catalog', desc: '12,000+ curated recipes & filters', icon: Compass },
                  { id: 'ai-kitchen', label: 'AI Kitchen Forge', desc: 'Gemini recipe generator & sommelier', icon: Sparkles, badge: '✨ AI' },
                  { id: 'my-recipes', label: 'My Creations', desc: 'Your personal custom recipes', icon: ChefHat, count: myRecipesCount },
                ].map(({ id, label, desc, icon: Icon, badge, count }) => {
                  const isActive = activeTab === id || (id === 'ai-kitchen' && activeTab === 'generator');
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavigate(id as any)}
                      className={`p-3 rounded-2xl flex items-start gap-3 text-left transition-all cursor-pointer border active:scale-98 ${
                        isActive
                          ? 'bg-[#fef1ea] border-[#9f3d00] text-[#9f3d00] shadow-xs'
                          : 'bg-white border-[#e1bfb2]/40 hover:border-[#9f3d00]/60 hover:bg-[#faf6f3] text-[#201a17]'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isActive ? 'bg-[#9f3d00] text-white shadow-xs' : 'bg-[#fff5f0] text-[#9f3d00]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{label}</span>
                          {badge && (
                            <span className="text-[10px] font-bold text-[#9f3d00] bg-[#ffdbcd] px-1.5 py-0.2 rounded-full">
                              {badge}
                            </span>
                          )}
                          {count !== undefined && count > 0 && (
                            <span className="px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold">
                              {count}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">{desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: Kitchen Planner & Smart Shopping */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-[#8d7165] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9f3d00]" />
                  <span>Meal Prep & Smart Pantry</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">4 Utilities</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { id: 'planner', label: 'Meal Planner', desc: 'Weekly 7-day schedule & macros', icon: Calendar },
                  { id: 'groceries', label: 'Grocery Shopping List', desc: 'Smart checklist by grocery aisle', icon: ShoppingBag, count: groceryCount },
                  { id: 'pantry', label: 'Pantry & Fridge Tracker', desc: 'Leftover matcher & expiry dates', icon: Package },
                  { id: 'collections', label: 'Custom Collections', desc: 'Themed folders & recipe playlists', icon: FolderPlus },
                ].map(({ id, label, desc, icon: Icon, count }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavigate(id as any)}
                      className={`p-3 rounded-2xl flex items-start gap-3 text-left transition-all cursor-pointer border active:scale-98 ${
                        isActive
                          ? 'bg-[#fef1ea] border-[#9f3d00] text-[#9f3d00] shadow-xs'
                          : 'bg-white border-[#e1bfb2]/40 hover:border-[#9f3d00]/60 hover:bg-[#faf6f3] text-[#201a17]'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isActive ? 'bg-[#9f3d00] text-white shadow-xs' : 'bg-[#fff5f0] text-[#9f3d00]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{label}</span>
                          {count !== undefined && count > 0 && (
                            <span className="px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold">
                              {count}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">{desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: Personal Cookbook & Community */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-[#8d7165] uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#9f3d00]" />
                  <span>Cookbook, Community & Profile</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">5 Pages</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  { id: 'saved', label: 'Saved Recipes', desc: 'Your favorite bookmarked dishes', icon: Bookmark, count: savedCount },
                  { id: 'following', label: 'Chefs Network', desc: 'Followed creators & world chefs', icon: Users },
                  { id: 'activity', label: 'Cooking Timeline', desc: 'Past cooking logs & history', icon: Activity },
                  { id: 'profile', label: 'Chef Profile', desc: 'Culinary level, dietary & bio', icon: User },
                  { id: 'settings', label: 'Preferences & Backups', desc: 'Theme, allergens & export', icon: Settings },
                ].map(({ id, label, desc, icon: Icon, count }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavigate(id as any)}
                      className={`p-3 rounded-2xl flex items-start gap-3 text-left transition-all cursor-pointer border active:scale-98 ${
                        isActive
                          ? 'bg-[#fef1ea] border-[#9f3d00] text-[#9f3d00] shadow-xs'
                          : 'bg-white border-[#e1bfb2]/40 hover:border-[#9f3d00]/60 hover:bg-[#faf6f3] text-[#201a17]'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isActive ? 'bg-[#9f3d00] text-white shadow-xs' : 'bg-[#fff5f0] text-[#9f3d00]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold truncate">{label}</span>
                          {count !== undefined && count > 0 && (
                            <span className="px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold">
                              {count}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">{desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Summary Strip in Mobile Drawer */}
            <div className="pt-3 border-t border-[#e1bfb2]/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#594137]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>RecipeHub AI • 100% Local Browser Storage</span>
              </span>
              <button
                onClick={() => handleNavigate('settings')}
                className="text-[#9f3d00] font-bold hover:underline cursor-pointer"
              >
                Manage Preferences & Data →
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

