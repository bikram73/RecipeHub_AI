import React, { useState, useMemo } from 'react';
import { PantryItem, Recipe, Ingredient } from '../types';
import { 
  Plus, 
  Refrigerator, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Play, 
  ShoppingBag, 
  Clock, 
  Flame, 
  Trash2, 
  Check 
} from 'lucide-react';

interface PantryViewProps {
  pantryItems: PantryItem[];
  recipes: Recipe[];
  onTogglePantryItem: (id: string) => void;
  onAddPantryItem: (name: string, category: PantryItem['category']) => void;
  onDeletePantryItem: (id: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onAddMissingToGrocery: (ingredients: Ingredient[], recipeTitle: string) => void;
}

export const PantryView: React.FC<PantryViewProps> = ({
  pantryItems,
  recipes,
  onTogglePantryItem,
  onAddPantryItem,
  onDeletePantryItem,
  onSelectRecipe,
  onStartCooking,
  onAddMissingToGrocery,
}) => {
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<PantryItem['category']>('produce');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddPantryItem(newItemName.trim(), newItemCategory);
      setNewItemName('');
    }
  };

  const inStockNames = useMemo<Set<string>>(() => {
    return new Set<string>(pantryItems.filter(p => p.inStock).map(p => p.name.toLowerCase()));
  }, [pantryItems]);

  // Calculate Match % for every recipe
  const recipeMatches = useMemo(() => {
    return recipes.map((recipe) => {
      const totalIngredients = recipe.ingredients.length;
      const matchedIngredients: Ingredient[] = [];
      const missingIngredients: Ingredient[] = [];

      recipe.ingredients.forEach((ing) => {
        const ingName = ing.name.toLowerCase();
        // Check if any in-stock pantry item contains or is contained in ingredient name
        const hasMatch = Array.from(inStockNames).some((pName: string) => 
          ingName.includes(pName) || pName.includes(ingName)
        );

        if (hasMatch) {
          matchedIngredients.push(ing);
        } else {
          missingIngredients.push(ing);
        }
      });

      const matchPercent = Math.round((matchedIngredients.length / totalIngredients) * 100);

      return {
        recipe,
        matchPercent,
        matchedIngredients,
        missingIngredients,
      };
    }).sort((a, b) => b.matchPercent - a.matchPercent);
  }, [recipes, inStockNames]);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'produce', label: '🥬 Produce' },
    { id: 'dairy', label: '🧀 Dairy' },
    { id: 'meat', label: '🥩 Proteins' },
    { id: 'pantry', label: '🥫 Pantry' },
    { id: 'spices', label: '🧂 Spices' },
    { id: 'bakery', label: '🍞 Bakery' },
  ];

  const filteredPantry = pantryItems.filter(p => 
    activeCategoryFilter === 'all' ? true : p.category === activeCategoryFilter
  );

  const handleAddMissing = (missing: Ingredient[], title: string) => {
    onAddMissingToGrocery(missing, title);
    setToastMessage(`Added ${missing.length} missing ingredients to your grocery list!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <Refrigerator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smart Inventory Matching</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Pantry & Fridge Matcher
          </h1>
          <p className="text-sm text-stone-600">
            Keep track of what's in your kitchen and see instantly what delicious meals you can cook right now.
          </p>
        </div>

        {/* Total In-Stock Counter */}
        <div className="flex items-center gap-3 bg-white p-3 px-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            {pantryItems.filter(p => p.inStock).length}
          </div>
          <div>
            <span className="text-xs font-bold text-stone-900 block">Items In Stock</span>
            <span className="text-[11px] text-stone-500">out of {pantryItems.length} tracked</span>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-purple-600" />
          {toastMessage}
        </div>
      )}

      {/* Main Grid: Left is Pantry Inventory, Right is Recipe Match Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Inventory Manager (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-stone-900">Your Kitchen Inventory</h2>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="space-y-2">
              <div className="flex gap-2">
                <input
                  id="pantry-item-input"
                  type="text"
                  placeholder="e.g. Greek yogurt, Scallions..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="px-2.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none cursor-pointer"
                >
                  <option value="produce">Produce</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Protein</option>
                  <option value="pantry">Pantry</option>
                  <option value="spices">Spices</option>
                  <option value="bakery">Bakery</option>
                </select>
                <button
                  type="submit"
                  id="add-pantry-item-btn"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center"
                  title="Add to pantry"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Item List */}
            <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
              {filteredPantry.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    item.inStock
                      ? 'bg-white border-stone-200 hover:border-emerald-400'
                      : 'bg-stone-50 border-dashed border-stone-200 opacity-60'
                  }`}
                >
                  <div 
                    onClick={() => onTogglePantryItem(item.id)}
                    className="flex items-center gap-2.5 cursor-pointer flex-1 select-none"
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      item.inStock
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}>
                      {item.inStock && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${item.inStock ? 'text-stone-800' : 'text-stone-400 line-through'}`}>
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-500 uppercase">
                      {item.category}
                    </span>
                    <button
                      onClick={() => onDeletePantryItem(item.id)}
                      className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recipe Matches Ranked by Match % (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              Matched Recipes You Can Make
            </h2>
            <span className="text-xs text-stone-500 font-medium">Ranked by ingredient availability</span>
          </div>

          <div className="space-y-4">
            {recipeMatches.map(({ recipe, matchPercent, missingIngredients }) => {
              const isFullMatch = matchPercent >= 85;
              return (
                <div
                  key={recipe.id}
                  id={`match-card-${recipe.id}`}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all bg-white shadow-xs ${
                    isFullMatch ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-16 h-16 rounded-2xl object-cover border border-stone-200 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isFullMatch
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {matchPercent}% Match
                          </span>
                          <span className="text-xs text-stone-400 font-medium">
                            {recipe.cuisine} • {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                          </span>
                        </div>
                        <h3 
                          onClick={() => onSelectRecipe(recipe)}
                          className="font-bold text-stone-900 text-sm sm:text-base hover:text-amber-600 transition-colors cursor-pointer"
                        >
                          {recipe.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => onStartCooking(recipe)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                          isFullMatch
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-stone-900 hover:bg-stone-800 text-white'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Cook Now</span>
                      </button>
                    </div>
                  </div>

                  {/* Missing or Matched Breakdown */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    {missingIngredients.length === 0 ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>You have 100% of the required ingredients!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>
                          Missing <strong className="text-stone-800">{missingIngredients.length} item{missingIngredients.length > 1 ? 's' : ''}:</strong>{' '}
                          {missingIngredients.map(m => m.name).join(', ')}
                        </span>
                      </div>
                    )}

                    {missingIngredients.length > 0 && (
                      <button
                        onClick={() => handleAddMissing(missingIngredients, recipe.title)}
                        className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 font-semibold self-start sm:self-auto hover:underline"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>+ Add missing to Groceries</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
