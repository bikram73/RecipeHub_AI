import React, { useState, useMemo } from 'react';
import { Recipe } from '../types';
import { 
  Sparkles, 
  Clock, 
  Flame, 
  Star, 
  Bookmark, 
  ChefHat, 
  ArrowRight, 
  Filter, 
  Utensils, 
  Play,
  Share2,
  Check,
  Search,
  RotateCcw
} from 'lucide-react';
import { shareRecipe } from '../services/share';

interface ExploreViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleSave: (recipeId: string, e: React.MouseEvent) => void;
  onStartCooking: (recipe: Recipe, e: React.MouseEvent) => void;
  onNavigateToGenerator: () => void;
  searchQuery: string;
}

const CUISINE_OPTIONS = [
  'All',
  'Indian',
  'Italian',
  'French-Nordic',
  'Mexican',
  'Japanese',
  'Mediterranean',
  'American',
  'Chinese',
  'Thai',
];

const CATEGORY_OPTIONS = [
  { id: 'all', label: 'All Categories' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'snack', label: 'Snacks & Bites' },
  { id: 'baking', label: 'Artisan Baking' },
];

const DIETARY_OPTIONS = [
  'All',
  'High-Protein',
  'Vegetarian',
  'Gluten-Free',
  'Vegan',
  'Keto',
  'Dairy-Free',
  'Low-Carb',
];

export const ExploreView: React.FC<ExploreViewProps> = ({
  recipes,
  onSelectRecipe,
  onToggleSave,
  onStartCooking,
  onNavigateToGenerator,
  searchQuery,
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [maxTime, setMaxTime] = useState<number>(120);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'calories' | 'reviews'>('rating');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    const res = await shareRecipe(recipe);
    if (res.copied) {
      setCopiedId(recipe.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleResetFilters = () => {
    setSelectedCuisine('All');
    setSelectedCategory('all');
    setSelectedDietary('All');
    setMaxTime(120);
    setSelectedDifficulty('All');
    setSortBy('rating');
  };

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Search query (matches title, description, cuisine, ingredients, tags, and creator name)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = recipe.title.toLowerCase().includes(q);
          const matchesDescription = recipe.description?.toLowerCase().includes(q) || false;
          const matchesCuisine = recipe.cuisine.toLowerCase().includes(q);
          const matchesTags = recipe.tags?.some((t) => t.toLowerCase().includes(q)) || false;
          const matchesIngredients = recipe.ingredients?.some((i) =>
            i.name.toLowerCase().includes(q)
          ) || false;
          const matchesCreator = recipe.author?.name?.toLowerCase().includes(q) || false;

          if (
            !matchesTitle && 
            !matchesDescription && 
            !matchesCuisine && 
            !matchesTags && 
            !matchesIngredients && 
            !matchesCreator
          ) {
            return false;
          }
        }

        // Cuisine filter
        if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && recipe.category !== selectedCategory) {
          return false;
        }

        // Dietary filter
        if (selectedDietary !== 'All') {
          if (!recipe.dietary?.includes(selectedDietary as any)) {
            return false;
          }
        }

        // Difficulty
        if (selectedDifficulty !== 'All' && recipe.difficulty !== selectedDifficulty) {
          return false;
        }

        // Max time
        const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
        if (totalTime > maxTime) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'time')
          return (
            (a.prepTimeMinutes + a.cookTimeMinutes) -
            (b.prepTimeMinutes + b.cookTimeMinutes)
          );
        if (sortBy === 'calories')
          return (a.nutrition?.calories || 0) - (b.nutrition?.calories || 0);
        if (sortBy === 'reviews')
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        return 0;
      });
  }, [
    recipes,
    searchQuery,
    selectedCuisine,
    selectedCategory,
    selectedDietary,
    selectedDifficulty,
    maxTime,
    sortBy,
  ]);

  const featuredRecipe = useMemo(() => {
    return recipes.find((r) => r.featured) || recipes[0];
  }, [recipes]);

  const hasActiveFilter =
    selectedCuisine !== 'All' ||
    selectedCategory !== 'all' ||
    selectedDietary !== 'All' ||
    selectedDifficulty !== 'All' ||
    maxTime < 120;

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      {/* Featured Recipe Hero Banner */}
      {!searchQuery && !hasActiveFilter && featuredRecipe && (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#201a17] to-[#3e2820] text-white shadow-xl">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={featuredRecipe.imageUrl}
              alt={featuredRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 md:max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbcd]/20 backdrop-blur-md border border-[#ffdbcd]/30 text-xs font-bold text-[#ffdbcd]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Featured Masterpiece</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {featuredRecipe.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-3">
              {featuredRecipe.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ffdbcd]" />
                <span>{featuredRecipe.prepTimeMinutes + featuredRecipe.cookTimeMinutes} Mins</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#ffdbcd]" />
                <span>{featuredRecipe.nutrition.calories} kcal</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{featuredRecipe.rating} ({featuredRecipe.reviewCount} reviews)</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onSelectRecipe(featuredRecipe)}
                className="px-6 py-3 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>View Full Recipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => onStartCooking(featuredRecipe, e)}
                className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Cook Mode</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Filter Matrix Controls */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-4">
        {/* Category Pills */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#9f3d00] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {hasActiveFilter && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-1 border-t border-gray-100">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Cuisine</label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 bg-white"
            >
              {CUISINE_OPTIONS.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Dietary Target</label>
            <select
              value={selectedDietary}
              onChange={(e) => setSelectedDietary(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 bg-white"
            >
              {DIETARY_OPTIONS.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Diets' : d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 bg-white"
            >
              <option value="All">Any Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard / Master</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-gray-200 bg-white font-semibold text-[#9f3d00]"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="time">Quickest Time</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              <span>Max Time</span>
              <span className="text-[#9f3d00]">{maxTime >= 120 ? 'Any' : `${maxTime}m`}</span>
            </div>
            <input
              type="range"
              min={15}
              max={120}
              step={15}
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="w-full accent-[#9f3d00]"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Culinary Catalog'}
          </h2>
          <p className="text-xs text-gray-500">Showing {filteredRecipes.length} recipes matching your criteria</p>
        </div>

        <button
          onClick={onNavigateToGenerator}
          className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-purple-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Need custom? AI Generator</span>
        </button>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-200 space-y-3">
          <ChefHat className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-lg font-bold text-gray-800">No matching recipes found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try resetting your filters or use our AI kitchen to create a custom recipe with your ingredients!
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-[#9f3d00] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Image & Quick Action Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badges */}
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

                {/* Right Top Action Bar */}
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
                    title="Bookmark Recipe"
                    onClick={(e) => onToggleSave(recipe.id, e)}
                    className={`p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-transform cursor-pointer ${
                      recipe.isSaved ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${recipe.isSaved ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Quick Cook Button */}
                <button
                  type="button"
                  onClick={(e) => onStartCooking(recipe, e)}
                  className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Cook</span>
                </button>
              </div>

              {/* Recipe Info */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={recipe.author?.avatar}
                      alt={recipe.author?.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-medium text-gray-500">{recipe.author?.name}</span>
                  </div>

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
