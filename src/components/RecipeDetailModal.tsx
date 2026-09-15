import React, { useState } from 'react';
import { Recipe, Ingredient, Comment, LocalProfile } from '../types';
import { 
  X, 
  Clock, 
  Flame, 
  Star, 
  Bookmark, 
  Play, 
  Minus, 
  Plus, 
  Check, 
  Wine, 
  Sparkles, 
  Share2,
  ChefHat,
  Timer,
  FolderPlus,
  Edit3,
  Trash2,
  MessageSquare,
  Send,
  Zap,
  RefreshCw
} from 'lucide-react';
import { shareRecipe } from '../services/share';
import { getProfile, logActivity, saveComments, getComments, saveRatings, getRatings } from '../utils/storage';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onToggleSave: (recipeId: string) => void;
  onStartCooking: (recipe: Recipe) => void;
  onAddIngredientsToGrocery?: (ingredients: Ingredient[], recipeTitle: string) => void;
  onOpenAddToCollection?: (recipe: Recipe) => void;
  onEditRecipe?: (recipe: Recipe) => void;
  onDeleteRecipe?: (recipeId: string, recipeTitle: string) => void;
  onNavigateToAi?: (mode: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onToggleSave,
  onStartCooking,
  onAddIngredientsToGrocery,
  onOpenAddToCollection,
  onEditRecipe,
  onDeleteRecipe,
  onNavigateToAi,
}) => {
  if (!recipe) return null;

  const profile: LocalProfile = getProfile();
  const isOwner = recipe.author?.name === profile.name || recipe.id.startsWith('user-rec-');

  const [servings, setServings] = useState<number>(recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [copiedShareToast, setCopiedShareToast] = useState<boolean>(false);

  // Ratings & Reviews
  const initialRatings = getRatings();
  const [userRating, setUserRating] = useState<number>(initialRatings[recipe.id] || 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(Boolean(initialRatings[recipe.id]));

  // Comments
  const [comments, setComments] = useState<Comment[]>(() => {
    const all = getComments();
    return (
      all[recipe.id] || [
        {
          id: 'comm-demo-1',
          authorName: 'Chef Priya',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          text: 'The aromatics and spice ratios in this dish are incredible! Definitely saving for weekly meal prep.',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          rating: 5,
        },
      ]
    );
  });
  const [commentInput, setCommentInput] = useState('');

  const scaleFactor = servings / (recipe.servings || 4);

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = async () => {
    const res = await shareRecipe(recipe);
    if (res.copied) {
      setCopiedShareToast(true);
      setTimeout(() => setCopiedShareToast(false), 2500);
    }
  };

  const handleRate = (star: number) => {
    setUserRating(star);
    setRatingSubmitted(true);
    const updated = { ...getRatings(), [recipe.id]: star };
    saveRatings(updated);
    logActivity({
      type: 'rated_recipe',
      title: `Rated Recipe (${star} Stars)`,
      description: `Gave ${star} stars to "${recipe.title}"`,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComm: Comment = {
      id: `comm-${Date.now()}`,
      authorName: profile.name || 'Culinary Explorer',
      authorAvatar: profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      text: commentInput.trim(),
      createdAt: new Date().toISOString(),
      rating: userRating || 5,
    };

    const updated = [newComm, ...comments];
    setComments(updated);
    const all = getComments();
    all[recipe.id] = updated;
    saveComments(all);
    setCommentInput('');

    logActivity({
      type: 'commented',
      title: 'Commented on Recipe',
      description: `Wrote note on "${recipe.title}"`,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
    });
  };

  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="recipe-detail-modal-container"
        className="relative w-full max-w-4xl bg-white sm:rounded-3xl shadow-2xl border border-amber-100 overflow-hidden my-auto max-h-[100vh] sm:max-h-[92vh] flex flex-col"
      >
        {/* Header & Hero Image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full shrink-0 bg-stone-900">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              id="close-recipe-detail-btn"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {onOpenAddToCollection && (
                <button
                  onClick={() => onOpenAddToCollection(recipe)}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title="Save to Collection"
                >
                  <FolderPlus className="w-4 h-4" />
                </button>
              )}

              {isOwner && onEditRecipe && (
                <button
                  onClick={() => {
                    onClose();
                    onEditRecipe(recipe);
                  }}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title="Edit Recipe"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}

              {isOwner && onDeleteRecipe && (
                <button
                  onClick={() => {
                    onClose();
                    onDeleteRecipe(recipe.id, recipe.title);
                  }}
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  title="Delete Recipe"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                id="share-recipe-btn"
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                title="Share recipe"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                id="detail-save-btn"
                onClick={() => onToggleSave(recipe.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                  recipe.isSaved
                    ? 'bg-rose-600 text-white'
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
              <span className="px-2.5 py-0.5 rounded-full bg-[#9f3d00] text-white font-bold text-xs uppercase tracking-wide">
                {recipe.cuisine}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                {recipe.difficulty}
              </span>
              {recipe.isAiGenerated && (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Created
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight leading-tight mb-1">
              {recipe.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-1 mb-3">
              {recipe.subtitle || recipe.description}
            </p>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-gray-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ffab69]" />
                <span>Prep: {recipe.prepTimeMinutes}m • Cook: {recipe.cookTimeMinutes}m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{recipe.nutrition?.calories || 400} kcal / serving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{recipe.rating}</span>
                <span className="text-gray-300">({recipe.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-8 text-gray-800">
          {copiedShareToast && (
            <div className="p-3 bg-gray-900 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-[#ffab69]" />
              Recipe link & cooking notes copied to clipboard!
            </div>
          )}

          {/* Description & Dietary tags */}
          <div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              {recipe.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {recipe.dietary?.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {d}
                </span>
              ))}
              {recipe.tags?.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[#fff8f5] text-[#9f3d00] border border-amber-200"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* AI Quick Actions Bar */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-950 block">AI Kitchen Assistant</span>
                <span className="text-[11px] text-purple-700">Need to modify ingredients or adapt this meal?</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToAi?.('improve');
                }}
                className="px-3 py-1.5 rounded-xl bg-white text-purple-800 text-xs font-bold border border-purple-200 shadow-2xs hover:bg-purple-50 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>Optimize Recipe</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToAi?.('substitute');
                }}
                className="px-3 py-1.5 rounded-xl bg-white text-purple-800 text-xs font-bold border border-purple-200 shadow-2xs hover:bg-purple-50 transition-colors cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
                <span>Substitutions</span>
              </button>
            </div>
          </div>

          {/* Nutritional Breakdown Bar */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Nutritional Profile (Per Serving)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-center">
                <span className="text-[11px] font-semibold text-gray-500 block">Calories</span>
                <span className="text-lg font-bold text-gray-900">{recipe.nutrition?.calories || 400}</span>
                <span className="text-[10px] text-gray-400 block">kcal</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-center">
                <span className="text-[11px] font-semibold text-gray-500 block">Protein</span>
                <span className="text-lg font-bold text-emerald-600">{recipe.nutrition?.protein || 25}g</span>
                <span className="text-[10px] text-gray-400 block">per serving</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-center">
                <span className="text-[11px] font-semibold text-gray-500 block">Carbohydrates</span>
                <span className="text-lg font-bold text-[#9f3d00]">{recipe.nutrition?.carbs || 30}g</span>
                <span className="text-[10px] text-gray-400 block">net carbs</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-gray-200/80 text-center">
                <span className="text-[11px] font-semibold text-gray-500 block">Healthy Fats</span>
                <span className="text-lg font-bold text-rose-500">{recipe.nutrition?.fat || 15}g</span>
                <span className="text-[10px] text-gray-400 block">total fat</span>
              </div>
            </div>
          </div>

          {/* Ingredients Section with Dynamic Servings Stepper */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Ingredients</h3>
                <p className="text-xs text-gray-500">Check off items as you prepare your mise-en-place</p>
              </div>

              {/* Servings Adjuster */}
              <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-xl self-start sm:self-auto">
                <span className="text-xs font-semibold text-gray-600 pl-2">Servings:</span>
                <button
                  id="decrement-servings-btn"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  disabled={servings <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-gray-900">{servings}</span>
                <button
                  id="increment-servings-btn"
                  onClick={() => setServings(servings + 1)}
                  className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
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
                        ? 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                        : 'bg-white border-gray-200 text-gray-800 hover:border-[#9f3d00]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[#9f3d00] border-[#9f3d00] text-white'
                          : 'border-gray-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-medium">{ing.name}</span>
                    </div>

                    <span className="text-xs font-bold text-[#9f3d00] bg-[#fff8f5] px-2 py-1 rounded-md border border-amber-100">
                      {scaledAmount} {ing.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step by Step Cooking Instructions */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Step-by-Step Instructions</h3>
              <p className="text-xs text-gray-500">{recipe.steps.length} sequential steps for perfection</p>
            </div>

            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex gap-4 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ffdbcd] text-[#9f3d00] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>

                  <div className="flex-1 space-y-2">
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">
                      {step.instruction}
                    </p>

                    {step.tip && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#9f3d00] shrink-0 mt-0.5" />
                        <span><strong>Chef Tip:</strong> {step.tip}</span>
                      </div>
                    )}

                    {step.timerMinutes && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                        <Timer className="w-3.5 h-3.5 text-[#9f3d00]" />
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
            <div className="p-4 rounded-2xl bg-[#fff8f5] border border-amber-200 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#9f3d00] flex items-center justify-center shrink-0">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">Sommelier Beverage Pairing</h4>
                <p className="text-xs text-gray-700 leading-relaxed">{recipe.winePairing}</p>
              </div>
            </div>
          )}

          {/* Rating & Review Interactive Card */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-gray-900">Rate this Culinary Creation</h4>
                <p className="text-xs text-gray-500">How did your dish turn out?</p>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || userRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRate(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          filled ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a review or cooking note..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#9f3d00]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Comment Stream */}
            <div className="space-y-2.5 pt-2">
              {comments.map((comm) => (
                <div key={comm.id} className="p-3 bg-white rounded-xl border border-gray-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={comm.authorAvatar}
                        alt={comm.authorName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-bold text-gray-900">{comm.authorName}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(comm.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{comm.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={recipe.author?.avatar}
                alt={recipe.author?.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{recipe.author?.name}</h4>
                <p className="text-xs text-gray-500">{recipe.author?.role}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
              Verified Creator
            </span>
          </div>
        </div>

        {/* Fixed Sticky Footer with Primary Action */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-xs text-gray-500 font-medium block">Ready to cook?</span>
            <span className="text-sm font-bold text-gray-900">Total time ~{totalTime} minutes</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="footer-start-cooking-btn"
              onClick={() => onStartCooking(recipe)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Interactive Cooking Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
