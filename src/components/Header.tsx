import React from 'react';
import { ChefHat, Sparkles, Compass, Refrigerator, Calendar, ShoppingBag, Bookmark, Search } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  groceryCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  groceryCount,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform duration-200">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-stone-900">RecipeHub</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-amber-600" /> AI
                </span>
              </div>
              <p className="text-[10px] text-stone-500 tracking-wide font-medium hidden sm:block">Smart Culinary Studio</p>
            </div>
          </div>

          {/* Search bar in header for fast exploration */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="header-search-input"
                type="text"
                placeholder="Search 1,000+ recipes, ingredients, or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100/80 hover:bg-stone-100 focus:bg-white text-stone-900 placeholder-stone-400 rounded-full border border-transparent focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id="nav-explore-btn"
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'explore'
                  ? 'bg-amber-50 text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">Explore</span>
            </button>

            <button
              id="nav-generator-btn"
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'generator'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 font-semibold'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === 'generator' ? 'text-white animate-pulse' : 'text-amber-500'}`} />
              <span className="hidden sm:inline">AI Kitchen</span>
            </button>

            <button
              id="nav-pantry-btn"
              onClick={() => setActiveTab('pantry')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'pantry'
                  ? 'bg-amber-50 text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <Refrigerator className="w-4 h-4 text-emerald-600" />
              <span className="hidden lg:inline">Pantry Match</span>
            </button>

            <button
              id="nav-planner-btn"
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'planner'
                  ? 'bg-amber-50 text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="hidden xl:inline">Meal Plan</span>
            </button>

            <button
              id="nav-groceries-btn"
              onClick={() => setActiveTab('groceries')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'groceries'
                  ? 'bg-amber-50 text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span className="hidden xl:inline">Grocery</span>
              {groceryCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">
                  {groceryCount}
                </span>
              )}
            </button>

            <button
              id="nav-saved-btn"
              onClick={() => setActiveTab('saved')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'saved'
                  ? 'bg-amber-50 text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <Bookmark className="w-4 h-4 text-rose-500" />
              <span className="hidden xl:inline">Saved</span>
              {savedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
