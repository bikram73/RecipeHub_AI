import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types';
import { 
  X, 
  Clock, 
  Flame, 
  Star, 
  Bookmark, 
  Play, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Check, 
  Wine, 
  Sparkles, 
  Share2,
  ChefHat,
  Timer
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onToggleSave: (recipeId: string) => void;
  onStartCooking: (recipe: Recipe) => void;
  onAddIngredientsToGrocery: (ingredients: Ingredient[], recipeTitle: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onToggleSave,
  onStartCooking,
  onAddIngredientsToGrocery,
}) => {
  if (!recipe) return null;

  const [servings, setServings] = useState<number>(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [addedGroceryToast, setAddedGroceryToast] = useState<boolean>(false);
  const [copiedShareToast, setCopiedShareToast] = useState<boolean>(false);

  const scaleFactor = servings / recipe.servings;

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddAllToGroceries = () => {
    const unChecked = recipe.ingredients.map(ing => ({
      ...ing,
      amount: Number((ing.amount * scaleFactor).toFixed(2))
    }));
    onAddIngredientsToGrocery(unChecked, recipe.title);
    setAddedGroceryToast(true);
    setTimeout(() => setAddedGroceryToast(false), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}#recipe-${recipe.id}`);
    setCopiedShareToast(true);
    setTimeout(() => setCopiedShareToast(false), 2500);
  };

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        id="recipe-detail-modal-container"
        className="relative w-full max-w-4xl bg-white sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[100vh] sm:max-h-[92vh] flex flex-col"
      >
        {/* Header & Hero Image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full flex-shrink-0 bg-stone-900">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              id="close-recipe-detail-btn"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                id="share-recipe-btn"
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all"
                title="Share recipe"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                id="detail-save-btn"
                onClick={() => onToggleSave(recipe.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                  recipe.isSaved
                    ? 'bg-rose-500 text-white'
                    : 'bg-black/50 hover:bg-black/80 text-white'
                }`}
                title={recipe.isSaved ? 'Saved' : 'Save'}
              >
                <Bookmark className={`w-4 h-4 ${recipe.isSaved ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Recipe Title & Overview overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wide">
                {recipe.cuisine}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                {recipe.difficulty}
              </span>
              {recipe.isAiGenerated && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/90 text-stone-950 text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Created
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-1">
              {recipe.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 line-clamp-1 mb-3">
              {recipe.subtitle || recipe.description}
            </p>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-stone-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Prep: {recipe.prepTimeMinutes}m • Cook: {recipe.cookTimeMinutes}m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>{recipe.nutrition.calories} kcal / serving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{recipe.rating}</span>
                <span className="text-stone-300">({recipe.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          {/* Toast Notification */}
          {addedGroceryToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              Ingredients successfully added to your Grocery Bag!
            </div>
          )}
          {copiedShareToast && (
            <div className="p-3 bg-stone-900 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-amber-400" />
              Recipe link copied to your clipboard!
            </div>
          )}

          {/* Description & Dietary tags */}
          <div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
              {recipe.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recipe.dietary.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200"
                >
                  {d}
                </span>
              ))}
              {recipe.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Nutritional Breakdown Bar */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Nutritional Profile (Per Serving)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-center">
                <span className="text-[11px] font-semibold text-stone-500 block">Calories</span>
                <span className="text-lg font-bold text-stone-900">{recipe.nutrition.calories}</span>
                <span className="text-[10px] text-stone-400 block">kcal</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-center">
                <span className="text-[11px] font-semibold text-stone-500 block">Protein</span>
                <span className="text-lg font-bold text-emerald-600">{recipe.nutrition.protein}g</span>
                <span className="text-[10px] text-stone-400 block">per serving</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-center">
                <span className="text-[11px] font-semibold text-stone-500 block">Carbohydrates</span>
                <span className="text-lg font-bold text-amber-600">{recipe.nutrition.carbs}g</span>
                <span className="text-[10px] text-stone-400 block">net carbs</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-center">
                <span className="text-[11px] font-semibold text-stone-500 block">Healthy Fats</span>
                <span className="text-lg font-bold text-rose-500">{recipe.nutrition.fat}g</span>
                <span className="text-[10px] text-stone-400 block">total fat</span>
              </div>
            </div>
          </div>

          {/* Ingredients Section with Dynamic Servings Stepper */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Ingredients</h3>
                <p className="text-xs text-stone-500">Check off items as you prepare your mise-en-place</p>
              </div>

              {/* Servings Adjuster */}
              <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-xl self-start sm:self-auto">
                <span className="text-xs font-semibold text-stone-600 pl-2">Servings:</span>
                <button
                  id="decrement-servings-btn"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
                  disabled={servings <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-stone-900">{servings}</span>
                <button
                  id="increment-servings-btn"
                  onClick={() => setServings(servings + 1)}
                  className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Ingredients Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.ingredients.map((ing) => {
                const scaledAmount = Number((ing.amount * scaleFactor).toFixed(2));
                const isChecked = checkedIngredients[ing.id];
                return (
                  <div
                    key={ing.id}
                    id={`ingredient-row-${ing.id}`}
                    onClick={() => toggleIngredientCheck(ing.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-stone-50/80 border-stone-200 text-stone-400 line-through'
                        : 'bg-white border-stone-200 text-stone-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-amber-500 border-amber-500 text-white'
                          : 'border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-medium">{ing.name}</span>
                    </div>

                    <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded-md">
                      {scaledAmount} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Add to Grocery List Action */}
            <button
              id="add-all-ingredients-grocery-btn"
              onClick={handleAddAllToGroceries}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              Add All Ingredients to Grocery List
            </button>
          </div>

          {/* Step by Step Cooking Instructions */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900">Step-by-Step Method</h3>
              <p className="text-xs text-stone-500">{recipe.steps.length} sequential steps for perfection</p>
            </div>

            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="text-stone-800 text-sm leading-relaxed font-medium">
                      {step.instruction}
                    </p>

                    {step.tip && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Chef Tip:</strong> {step.tip}</span>
                      </div>
                    )}

                    {step.timerMinutes && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold">
                        <Timer className="w-3.5 h-3.5 text-amber-600" />
                        <span>Timer: {step.timerMinutes} minutes</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sommelier / Wine Pairing */}
          {recipe.winePairing && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50/40 to-stone-50 border border-rose-200/60 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-0.5">Sommelier Beverage Pairing</h4>
                <p className="text-xs text-stone-700 leading-relaxed">{recipe.winePairing}</p>
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="w-12 h-12 rounded-full object-cover border border-stone-200"
              />
              <div>
                <h4 className="font-bold text-stone-900 text-sm">{recipe.author.name}</h4>
                <p className="text-xs text-stone-500">{recipe.author.role}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-600">
              Verified Creator
            </span>
          </div>
        </div>

        {/* Fixed Sticky Footer with Primary Action */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-xs text-stone-500 font-medium block">Ready to cook?</span>
            <span className="text-sm font-bold text-stone-900">Total time ~{totalTime} minutes</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="footer-start-cooking-btn"
              onClick={() => onStartCooking(recipe)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-stone-950" />
              <span>Start Interactive Cooking Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
