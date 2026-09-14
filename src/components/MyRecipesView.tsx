import React from 'react';
import { Recipe } from '../types';
import { ChefHat, Plus, Flame, Clock, Star, Play, Sparkles } from 'lucide-react';
import { CHEF_GIRL_AVATAR } from './HomeLandingView';

interface MyRecipesViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe, e?: React.MouseEvent) => void;
  onOpenCreateRecipe: () => void;
}

export const MyRecipesView: React.FC<MyRecipesViewProps> = ({
  recipes,
  onSelectRecipe,
  onStartCooking,
  onOpenCreateRecipe,
}) => {
  const userRecipes = recipes.filter(r => r.author.name.toLowerCase().includes('you') || r.isAiGenerated);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Profile Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#fef1ea] via-white to-[#f8ece5] border border-[#e1bfb2]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <img
              src={CHEF_GIRL_AVATAR}
              alt="Chef Clara"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white shadow-md"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-[#00685d] text-white rounded-full flex items-center justify-center text-xs ring-2 ring-white">
              ✓
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ffdbcd] text-[#9f3d00] text-xs font-bold mb-1.5">
              <span>🌟 Master Home Gastronomist</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#201a17]">Chef Clara Laurent</h1>
            <p className="text-xs sm:text-sm text-[#594137] max-w-md mt-0.5">
              Culinary creator experimenting with rustic sourdoughs, French-Nordic seafoods, and Gemini AI flavor combinations.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-[#594137]">
              <span><strong className="text-[#201a17]">{userRecipes.length}</strong> Recipes Created</span>
              <span>•</span>
              <span><strong className="text-[#201a17]">1,420</strong> Followers</span>
              <span>•</span>
              <span><strong className="text-[#201a17]">4.9</strong> Chef Rating</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenCreateRecipe}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Recipe</span>
        </button>
      </div>

      {/* Recipe Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#201a17]">Your Kitchen Creations</h2>
          <span className="text-xs text-[#594137] font-semibold">{userRecipes.length} published dishes</span>
        </div>

        {userRecipes.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-[#e1bfb2] space-y-3">
            <ChefHat className="w-12 h-12 text-[#9f3d00]/40 mx-auto" />
            <h3 className="font-serif font-bold text-[#201a17] text-lg">No custom recipes created yet</h3>
            <p className="text-xs text-[#594137] max-w-sm mx-auto">
              Click the button above to publish your first signature dish or generate one with our AI Sommelier!
            </p>
            <button
              onClick={onOpenCreateRecipe}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9f3d00] text-white text-xs font-semibold hover:bg-[#c74e00] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Recipe Now</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="group bg-white rounded-2xl border border-[#e1bfb2]/40 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#f8ece5]">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-900/80 text-white backdrop-blur-xs">
                      {recipe.cuisine}
                    </span>
                  </div>

                  {recipe.isAiGenerated && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ffab69] text-[#2f1400]">
                      <Sparkles className="w-3 h-3" /> AI Crafted
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-[#201a17] text-base group-hover:text-[#9f3d00] transition-colors line-clamp-1 mb-1">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-[#594137] line-clamp-2 mb-3">
                      {recipe.subtitle || recipe.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f8ece5] flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 font-semibold text-[#201a17]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{recipe.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#594137]">
                        <Flame className="w-3.5 h-3.5 text-[#9f3d00]" />
                        <span>{recipe.nutrition.calories} kcal</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => onStartCooking(recipe, e)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#fef1ea] hover:bg-[#ffdbcd] text-[#9f3d00] font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-[#9f3d00]" />
                      <span>Cook</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
