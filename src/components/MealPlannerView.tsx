import React, { useState } from 'react';
import { MealPlanDay, Recipe, Ingredient } from '../types';
import { 
  Calendar, 
  Sparkles, 
  Plus, 
  X, 
  ShoppingBag, 
  Flame, 
  Clock, 
  ChevronRight, 
  Check,
  Utensils
} from 'lucide-react';

interface MealPlannerViewProps {
  recipes: Recipe[];
  mealPlan: MealPlanDay[];
  onUpdateMeal: (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe?: Recipe) => void;
  onAutoPlanWeek: () => void;
  onGenerateGroceriesFromPlan: (ingredients: Ingredient[]) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({
  recipes,
  mealPlan,
  onUpdateMeal,
  onAutoPlanWeek,
  onGenerateGroceriesFromPlan,
  onSelectRecipe,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isPickingRecipeFor, setIsPickingRecipeFor] = useState<{
    dayIndex: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string>('');

  const currentDay = mealPlan[selectedDayIndex] || mealPlan[0];

  // Calculate daily totals for selected day
  const mealsList = Object.values(currentDay.meals) as (Recipe | undefined)[];
  const dailyNutrition = mealsList.reduce(
    (acc, meal) => {
      if (meal) {
        acc.calories += meal.nutrition.calories;
        acc.protein += meal.nutrition.protein;
        acc.carbs += meal.nutrition.carbs;
        acc.fat += meal.nutrition.fat;
      }
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const handleGenerateGroceries = () => {
    const allIngredients: Ingredient[] = [];
    mealPlan.forEach((day) => {
      (Object.values(day.meals) as (Recipe | undefined)[]).forEach((meal) => {
        if (meal) {
          allIngredients.push(...meal.ingredients);
        }
      });
    });

    onGenerateGroceriesFromPlan(allIngredients);
    setToastMessage(`Generated grocery list with ${allIngredients.length} ingredients from your weekly meal plan!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Smart Nutrition Calendar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Weekly Meal Planner
          </h1>
          <p className="text-sm text-stone-600">
            Structure your weekly nutrition, balance macros, and auto-export shopping lists.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="auto-plan-week-btn"
            onClick={onAutoPlanWeek}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Auto-Plan with AI</span>
          </button>

          <button
            id="generate-groceries-plan-btn"
            onClick={handleGenerateGroceries}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Export to Grocery List</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          {toastMessage}
        </div>
      )}

      {/* 7-Day Day Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {mealPlan.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const mealCount = Object.values(day.meals).filter(Boolean).length;
          return (
            <button
              key={day.day}
              id={`day-tab-${day.day.toLowerCase()}`}
              onClick={() => setSelectedDayIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md scale-[1.02]'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-stone-900' : 'text-stone-400'}`}>
                {day.dateStr}
              </span>
              <span className="text-sm sm:text-base font-extrabold block">{day.day}</span>
              <span className={`text-[11px] font-semibold mt-1 inline-block ${isSelected ? 'text-stone-900' : 'text-stone-500'}`}>
                {mealCount} {mealCount === 1 ? 'meal' : 'meals'} planned
              </span>
            </button>
          );
        })}
      </div>

      {/* Day Detail & Meal Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Meals Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((mType) => {
            const meal = currentDay.meals[mType];
            const typeLabels = {
              breakfast: { label: 'Breakfast', icon: '🥑', subtitle: 'Fuel up for the morning' },
              lunch: { label: 'Lunch', icon: '🌮', subtitle: 'Nutrient-dense midday power' },
              dinner: { label: 'Dinner', icon: '🍝', subtitle: 'Satisfying evening main course' },
              snack: { label: 'Snack / Dessert', icon: '🫐', subtitle: 'Healthy sweet or savory bite' },
            };

            const info = typeLabels[mType];

            return (
              <div
                key={mType}
                className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{info.icon}</span>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base">{info.label}</h3>
                      <p className="text-[11px] text-stone-400">{info.subtitle}</p>
                    </div>
                  </div>

                  {!meal && (
                    <button
                      id={`add-meal-${mType}-btn`}
                      onClick={() => setIsPickingRecipeFor({ dayIndex: selectedDayIndex, mealType: mType })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Assign Recipe</span>
                    </button>
                  )}
                </div>

                {meal ? (
                  <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                    <div 
                      onClick={() => onSelectRecipe(meal)}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <img
                        src={meal.imageUrl}
                        alt={meal.title}
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm hover:text-amber-600 transition-colors">
                          {meal.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
                          <span>{meal.cuisine}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> {meal.prepTimeMinutes + meal.cookTimeMinutes}m</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-rose-500" /> {meal.nutrition.calories} kcal</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setIsPickingRecipeFor({ dayIndex: selectedDayIndex, mealType: mType })}
                        className="text-xs text-stone-500 hover:text-stone-800 px-2 py-1 rounded-md hover:bg-stone-200"
                      >
                        Swap
                      </button>
                      <button
                        onClick={() => onUpdateMeal(selectedDayIndex, mType, undefined)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Remove meal"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIsPickingRecipeFor({ dayIndex: selectedDayIndex, mealType: mType })}
                    className="p-4 rounded-2xl border border-dashed border-stone-200 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all text-xs text-stone-400 font-medium"
                  >
                    + Tap to select recipe for {info.label.toLowerCase()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Daily Summary Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                {currentDay.day} Targets
              </span>
              <h3 className="text-lg font-bold text-stone-900">Nutritional Breakdown</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-900 block">Total Calories</span>
                  <span className="text-xs text-amber-700/80">Target: ~2000 kcal</span>
                </div>
                <span className="text-xl font-extrabold text-amber-950">{dailyNutrition.calories} kcal</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-900 block">Protein Intake</span>
                  <span className="text-xs text-emerald-700/80">Muscle recovery</span>
                </div>
                <span className="text-xl font-extrabold text-emerald-950">{dailyNutrition.protein}g</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-700 block">Carbohydrates</span>
                  <span className="text-xs text-stone-400">Energy fuel</span>
                </div>
                <span className="text-lg font-bold text-stone-900">{dailyNutrition.carbs}g</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-700 block">Healthy Fats</span>
                  <span className="text-xs text-stone-400">Lipid balance</span>
                </div>
                <span className="text-lg font-bold text-stone-900">{dailyNutrition.fat}g</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-100 text-stone-600 text-[11px] leading-relaxed">
              💡 <strong>AI Tip:</strong> Planning your meals beforehand saves up to 4 hours of cooking time each week and prevents ingredient waste.
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Picker Modal for assigning meal */}
      {isPickingRecipeFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-stone-200 shadow-2xl max-h-[85vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  Choose Recipe for {isPickingRecipeFor.mealType.toUpperCase()}
                </h3>
                <p className="text-xs text-stone-500">Pick from your available catalogue</p>
              </div>
              <button
                onClick={() => setIsPickingRecipeFor(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {recipes.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => {
                    onUpdateMeal(isPickingRecipeFor.dayIndex, isPickingRecipeFor.mealType, rec);
                    setIsPickingRecipeFor(null);
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rec.imageUrl}
                      alt={rec.title}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{rec.title}</h4>
                      <span className="text-xs text-stone-400">{rec.cuisine} • {rec.nutrition.calories} kcal</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-xl">
                    Select
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
