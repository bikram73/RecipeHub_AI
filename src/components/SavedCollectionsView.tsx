import React, { useState } from 'react';
import { Recipe } from '../types';
import { 
  Bookmark, 
  Clock, 
  Flame, 
  Star, 
  Sparkles, 
  Play, 
  ChefHat, 
  Search, 
  FolderPlus,
  Compass
} from 'lucide-react';

interface SavedCollectionsViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleSave: (recipeId: string, e: React.MouseEvent) => void;
  onStartCooking: (recipe: Recipe, e: React.MouseEvent) => void;
  onNavigateToExplore: () => void;
}

export const SavedCollectionsView: React.FC<SavedCollectionsViewProps> = ({
  recipes,
  onSelectRecipe,
  onToggleSave,
  onStartCooking,
  onNavigateToExplore,
}) => {
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const savedRecipes = recipes.filter(r => r.isSaved);

  const collections = [
    { id: 'all', label: 'All Saved Dishes', count: savedRecipes.length },
    { id: 'ai', label: '✨ AI Chef Creations', count: savedRecipes.filter(r => r.isAiGenerated).length },
    { id: 'dinner', label: '🍝 Weeknight Dinners', count: savedRecipes.filter(r => r.category === 'dinner').length },
    { id: 'quick', label: '⚡ Under 30 Mins', count: savedRecipes.filter(r => (r.prepTimeMinutes + r.cookTimeMinutes) <= 30).length },
  ];

  const filteredRecipes = savedRecipes.filter((r) => {
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      if (!r.title.toLowerCase().includes(q) && !r.cuisine.toLowerCase().includes(q)) {
        return false;
      }
    }

    if (activeCollection === 'ai') return r.isAiGenerated;
    if (activeCollection === 'dinner') return r.category === 'dinner';
    if (activeCollection === 'quick') return (r.prepTimeMinutes + r.cookTimeMinutes) <= 30;

    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Personal Cookbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Saved Recipes & Collections
          </h1>
          <p className="text-sm text-stone-600">
            Your personalized culinary library with favorited dishes and AI experiments.
          </p>
        </div>

        {/* Search bar for saved collection */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search saved recipes..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
      </div>

      {/* Collection Tab Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm">
        {collections.map((col) => (
          <button
            key={col.id}
            id={`collection-tab-${col.id}`}
            onClick={() => setActiveCollection(col.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold whitespace-nowrap transition-all ${
              activeCollection === col.id
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
            }`}
          >
            <span>{col.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCollection === col.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>
              {col.count}
            </span>
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-stone-50 rounded-3xl border border-dashed border-stone-300 space-y-3">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-800 text-base">No saved recipes in this collection</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Browse our curated masterclasses or generate custom creations in the AI Kitchen and bookmark your favorites.
          </p>
          <button
            id="saved-explore-more-btn"
            onClick={onNavigateToExplore}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Discover Recipes</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => {
            const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
            return (
              <div
                key={recipe.id}
                id={`saved-card-${recipe.id}`}
                onClick={() => onSelectRecipe(recipe)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-900/80 text-white backdrop-blur-xs">
                      {recipe.cuisine}
                    </span>
                    <button
                      onClick={(e) => onToggleSave(recipe.id, e)}
                      className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center transition-all shadow-sm"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-4 h-4 fill-white" />
                    </button>
                  </div>

                  {recipe.isAiGenerated && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 shadow-xs">
                      <Sparkles className="w-3 h-3" /> Chef AI
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{totalTime}m</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base group-hover:text-rose-600 transition-colors line-clamp-1 mb-1">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                      {recipe.subtitle || recipe.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 font-semibold text-stone-800">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{recipe.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone-500">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        <span>{recipe.nutrition.calories} kcal</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => onStartCooking(recipe, e)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs transition-colors"
                    >
                      <Play className="w-3 h-3 fill-amber-800" />
                      <span>Cook</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
