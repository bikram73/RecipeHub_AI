import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  groceryCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreateRecipe?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  groceryCount,
  searchQuery,
  setSearchQuery,
  onOpenCreateRecipe,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(41,35,31,0.04)] border-b border-[#e1bfb2]/30">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Brand with Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          
          {/* Refined Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9f3d00] to-[#c74e00] flex items-center justify-center text-white shadow-md shadow-[#9f3d00]/25 group-hover:scale-105 transition-all duration-200">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl sm:text-2xl text-[#201a17] tracking-tight font-bold flex items-center gap-1">
              <span>RecipeHub</span>
              <span className="text-[#9f3d00] italic font-serif">AI</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-2 text-xs sm:text-[13px] font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className={`transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'explore'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              Explore
            </button>

            <button
              onClick={() => {
                if (onOpenCreateRecipe) onOpenCreateRecipe();
                else setActiveTab('create-recipe');
              }}
              className={`transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'create-recipe'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              Create Recipe
            </button>

            <button
              onClick={() => setActiveTab('my-recipes')}
              className={`transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'my-recipes'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              My Recipes
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'saved'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              Saved Collections
              {savedCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-[#9f3d00] text-white text-[10px] rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('following')}
              className={`transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'following'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              Following
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg cursor-pointer ${
                activeTab === 'generator' || activeTab === 'ai-kitchen'
                  ? 'text-[#9f3d00] font-bold bg-[#fef1ea]'
                  : 'text-[#594137] hover:text-[#201a17] hover:bg-[#f8ece5]'
              }`}
            >
              <span>AI Kitchen</span>
              <Sparkles className="w-3.5 h-3.5 text-[#9f3d00]" />
            </button>
          </nav>

        </div>

        {/* Right Side: Search, Theme Mode, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Header Search Input */}
          <div className="relative hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#594137] pointer-events-none text-[18px]">
              search
            </span>
            <input
              id="header-search-input"
              type="text"
              placeholder="Search dishes, spices, chefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  setActiveTab('explore');
                }
              }}
              className="w-52 lg:w-64 bg-[#fef1ea] pl-10 pr-4 py-2 rounded-xl text-xs text-[#201a17] placeholder:text-[#8d7165] outline-none focus:bg-white focus:ring-1 focus:ring-[#9f3d00] transition-all font-medium"
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

          {/* Quick Search Button on Mobile */}
          <button 
            onClick={() => setActiveTab('explore')}
            aria-label="Search Recipes" 
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#fef1ea] text-[#594137] hover:bg-[#f8ece5] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
          </button>

          {/* Light/Dark Mode Toggle Icon */}
          <button 
            aria-label="Toggle Dark/Light Mode" 
            onClick={() => alert("Light mode active with warm kitchen ambiance.")}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#fef1ea] text-[#594137] hover:bg-[#f8ece5] hover:text-[#201a17] transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">light_mode</span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center pl-1">
            <button 
              onClick={() => setActiveTab('my-recipes')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#ffdbcd] to-[#ffdcc4] text-[#9f3d00] font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs hover:ring-[#9f3d00]/40 transition-all cursor-pointer"
              title="Chef Profile & Studio"
            >
              <span>CL</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

