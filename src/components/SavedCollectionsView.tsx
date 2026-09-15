import React, { useState } from 'react';
import { Recipe, Collection } from '../types';
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
  Compass,
  Trash2,
  Share2,
  Check,
  Plus
} from 'lucide-react';
import { getCollections, saveCollections, logActivity } from '../utils/storage';
import { shareRecipe } from '../services/share';

interface SavedCollectionsViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleSave: (recipeId: string, e: React.MouseEvent) => void;
  onStartCooking: (recipe: Recipe, e: React.MouseEvent) => void;
  onNavigateToExplore: () => void;
  onOpenAddToCollection?: (recipe: Recipe) => void;
}

export const SavedCollectionsView: React.FC<SavedCollectionsViewProps> = ({
  recipes,
  onSelectRecipe,
  onToggleSave,
  onStartCooking,
  onNavigateToExplore,
  onOpenAddToCollection,
}) => {
  const [collections, setCollections] = useState<Collection[]>(getCollections());
  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const savedRecipes = recipes.filter((r) => r.isSaved);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newCol: Collection = {
      id: `col-${Date.now()}`,
      name: newFolderName.trim(),
      description: 'Personal curated recipe collection',
      recipeIds: [],
      createdAt: new Date().toISOString(),
    };

    const updated = [...collections, newCol];
    setCollections(updated);
    saveCollections(updated);
    setActiveCollectionId(newCol.id);
    setNewFolderName('');
    setShowCreateFolder(false);
  };

  const handleDeleteCollection = (colId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = collections.filter((c) => c.id !== colId);
    setCollections(updated);
    saveCollections(updated);
    if (activeCollectionId === colId) {
      setActiveCollectionId('all');
    }
  };

  const handleShare = async (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    const res = await shareRecipe(recipe);
    if (res.copied) {
      setCopiedId(recipe.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Determine recipes to display based on tab
  const getDisplayedRecipes = () => {
    let list: Recipe[] = [];
    if (activeCollectionId === 'all') {
      list = savedRecipes;
    } else if (activeCollectionId === 'ai') {
      list = savedRecipes.filter((r) => r.isAiGenerated);
    } else if (activeCollectionId === 'quick') {
      list = savedRecipes.filter((r) => (r.prepTimeMinutes + r.cookTimeMinutes) <= 30);
    } else {
      const col = collections.find((c) => c.id === activeCollectionId);
      if (col) {
        list = recipes.filter((r) => col.recipeIds.includes(r.id));
      }
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const displayedRecipes = getDisplayedRecipes();

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Personal Cookbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
            Saved Recipes & Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Your personalized culinary library with favorited dishes, custom boards, and AI experiments.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter saved recipes..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9f3d00]"
          />
        </div>
      </div>

      {/* Collection Tab Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveCollectionId('all')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCollectionId === 'all'
              ? 'bg-[#9f3d00] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>All Saved ({savedRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveCollectionId('ai')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCollectionId === 'ai'
              ? 'bg-[#9f3d00] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Creations ({savedRecipes.filter((r) => r.isAiGenerated).length})</span>
        </button>

        <button
          onClick={() => setActiveCollectionId('quick')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeCollectionId === 'quick'
              ? 'bg-[#9f3d00] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Under 30 Mins ({savedRecipes.filter((r) => (r.prepTimeMinutes + r.cookTimeMinutes) <= 30).length})</span>
        </button>

        {/* Custom User Folders */}
        {collections.map((col) => (
          <div
            key={col.id}
            onClick={() => setActiveCollectionId(col.id)}
            className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCollectionId === col.id
                ? 'bg-[#9f3d00] text-white border-[#9f3d00] shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span>📁 {col.name} ({col.recipeIds.length})</span>
            <button
              type="button"
              onClick={(e) => handleDeleteCollection(col.id, e)}
              className={`p-0.5 rounded-full transition-colors ${
                activeCollectionId === col.id ? 'hover:bg-white/20 text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-rose-600'
              }`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Create Folder Button */}
        {!showCreateFolder ? (
          <button
            onClick={() => setShowCreateFolder(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-gray-600 border border-dashed border-gray-300 hover:border-[#9f3d00] hover:text-[#9f3d00] bg-gray-50 whitespace-nowrap transition-all cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>New Collection</span>
          </button>
        ) : (
          <form onSubmit={handleCreateCollection} className="flex items-center gap-1.5">
            <input
              type="text"
              required
              autoFocus
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Collection name..."
              className="px-3 py-1.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] bg-white"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#9f3d00] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowCreateFolder(false)}
              className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </form>
        )}
      </div>

      {/* Grid or Empty state */}
      {displayedRecipes.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">No saved recipes here</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Browse our chef creations and tap the bookmark ribbon to add your favorite dishes to this collection.
            </p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9f3d00] text-white text-xs font-bold hover:bg-[#c74e00] transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Recipe Library</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Image & Actions */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Tags */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  {recipe.isAiGenerated && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3" /> AI
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                    {recipe.cuisine}
                  </span>
                </div>

                {/* Right Action Icons */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                  <button
                    type="button"
                    title="Share Recipe"
                    onClick={(e) => handleShare(e, recipe)}
                    className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#9f3d00] shadow-sm transition-transform cursor-pointer"
                  >
                    {copiedId === recipe.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    title="Bookmark"
                    onClick={(e) => onToggleSave(recipe.id, e)}
                    className="p-1.5 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-sm transition-transform cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-rose-600" />
                  </button>
                </div>

                {/* Cook button */}
                <button
                  type="button"
                  onClick={(e) => onStartCooking(recipe, e)}
                  className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Cook</span>
                </button>
              </div>

              {/* Text info */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#9f3d00] transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {recipe.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#9f3d00]" />
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>{recipe.nutrition?.calories || 400} kcal</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{recipe.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
