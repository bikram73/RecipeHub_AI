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
  Award,
  Play
} from 'lucide-react';

interface ExploreViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleSave: (recipeId: string, e: React.MouseEvent) => void;
  onStartCooking: (recipe: Recipe, e: React.MouseEvent) => void;
  onNavigateToGenerator: () => void;
  searchQuery: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  recipes,
  onSelectRecipe,
  onToggleSave,
  onStartCooking,
  onNavigateToGenerator,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'calories'>('rating');

  const categories = [
    { id: 'all', label: 'All Dishes', icon: '🍽️' },
    { id: 'dinner', label: 'Dinner', icon: '🍝' },
    { id: 'breakfast', label: 'Breakfast', icon: '🥑' },
    { id: 'lunch', label: 'Lunch', icon: '🌮' },
    { id: 'dessert', label: 'Dessert', icon: '🍰' },
  ];

  const dietaryOptions = [
    'all',
    'High-Protein',
    'Keto',
    'Vegetarian',
    'Gluten-Free',
    'Vegan',
  ];

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesCuisine = recipe.cuisine.toLowerCase().includes(q);
        const matchesTags = recipe.tags.some(t => t.toLowerCase().includes(q));
        const matchesIngredients = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCuisine && !matchesTags && !matchesIngredients) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && recipe.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (selectedDietary !== 'all') {
        if (!recipe.dietary.includes(selectedDietary as any)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes);
      if (sortBy === 'calories') return a.nutrition.calories - b.nutrition.calories;
      return 0;
    });
  }, [recipes, searchQuery, selectedCategory, selectedDietary, sortBy]);

  const featuredRecipe = useMemo(() => {
    return recipes.find(r => r.featured) || recipes[0];
  }, [recipes]);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner with Featured Recipe */}
      {!searchQuery && selectedCategory === 'all' && selectedDietary === 'all' && featuredRecipe && (
        <section className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={featuredRecipe.imageUrl}
              alt={featuredRecipe.title}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                <Award className="w-3.5 h-3.5" /> Featured Masterclass
              </span>
              <span className="text-xs text-stone-300 font-medium">
                {featuredRecipe.cuisine} • {featuredRecipe.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              {featuredRecipe.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-300 line-clamp-2 mb-6 font-normal leading-relaxed">
              {featuredRecipe.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300 mb-6">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{featuredRecipe.prepTimeMinutes + featuredRecipe.cookTimeMinutes} mins</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>{featuredRecipe.nutrition.calories} kcal</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-white">{featuredRecipe.rating}</span>
                <span className="text-stone-400">({featuredRecipe.reviewCount})</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-cook-btn"
                onClick={(e) => onStartCooking(featuredRecipe, e)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-stone-950" />
                Start Guided Cooking
              </button>
              <button
                id="hero-view-details-btn"
                onClick={() => onSelectRecipe(featuredRecipe)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all backdrop-blur-xs"
              >
                View Recipe & Ingredients
              </button>
            </div>
          </div>
        </section>
      )}

      {/* AI Kitchen Quick Trigger Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-orange-500/10 border border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/30 flex-shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-base">Have random ingredients in your fridge?</h3>
            <p className="text-xs sm:text-sm text-stone-600">Chef AI can invent a custom restaurant-grade recipe in 5 seconds.</p>
          </div>
        </div>
        <button
          id="trigger-ai-generator-btn"
          onClick={onNavigateToGenerator}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm hover:translate-x-0.5"
        >
          <span>Open AI Kitchen</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* Category Pills & Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-stone-500 ml-auto">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              id="recipe-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-100 hover:bg-stone-200/70 border-none rounded-lg px-2.5 py-1.5 text-stone-700 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="time">Quickest Cook Time</option>
              <option value="calories">Lowest Calories</option>
            </select>
          </div>
        </div>

        {/* Dietary Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium mr-1 flex items-center gap-1">
            <Utensils className="w-3 h-3" /> Diet:
          </span>
          {dietaryOptions.map((diet) => (
            <button
              key={diet}
              id={`dietary-filter-${diet}`}
              onClick={() => setSelectedDietary(diet)}
              className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedDietary === diet
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {diet === 'all' ? 'All Diets' : diet}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Curated Recipes'}
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} available
          </span>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-stone-200">
            <ChefHat className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-semibold text-stone-800 text-base mb-1">No recipes found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              We couldn't find matching recipes with your selected filters. Try searching different keywords or ask AI Kitchen to generate one.
            </p>
            <button
              id="generate-recipe-empty-btn"
              onClick={onNavigateToGenerator}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-semibold text-xs shadow-sm hover:bg-amber-400 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Generate This With AI
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => {
              const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
              return (
                <div
                  key={recipe.id}
                  id={`recipe-card-${recipe.id}`}
                  onClick={() => onSelectRecipe(recipe)}
                  className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-900/80 text-white backdrop-blur-xs">
                        {recipe.cuisine}
                      </span>
                      <button
                        id={`bookmark-btn-${recipe.id}`}
                        onClick={(e) => onToggleSave(recipe.id, e)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-xs ${
                          recipe.isSaved
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'bg-stone-900/60 text-white hover:bg-stone-900/90'
                        }`}
                        title={recipe.isSaved ? 'Remove from saved' : 'Save recipe'}
                      >
                        <Bookmark className={`w-4 h-4 ${recipe.isSaved ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* AI Generation badge if applicable */}
                    {recipe.isAiGenerated && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 shadow-xs">
                        <Sparkles className="w-3 h-3" /> Chef AI
                      </div>
                    )}

                    {/* Time pill bottom right */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{totalTime}m</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Dietary tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {recipe.dietary.slice(0, 2).map((d) => (
                          <span
                            key={d}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-stone-100 text-stone-600"
                          >
                            {d}
                          </span>
                        ))}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-stone-100 text-stone-600">
                          {recipe.difficulty}
                        </span>
                      </div>

                      <h3 className="font-bold text-stone-900 text-base group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
                        {recipe.title}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                        {recipe.subtitle || recipe.description}
                      </p>
                    </div>

                    {/* Bottom stats & action */}
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
                        id={`quick-cook-btn-${recipe.id}`}
                        onClick={(e) => onStartCooking(recipe, e)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs transition-colors"
                        title="Start cooking mode"
                      >
                        <Play className="w-3 h-3 fill-amber-800 text-amber-800" />
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
    </div>
  );
};
