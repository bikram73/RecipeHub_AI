import React, { useState, useEffect } from 'react';
import { 
  Recipe, 
  PantryItem, 
  MealPlanDay, 
  GroceryItem, 
  ActiveTab, 
  Ingredient 
} from './types';
import { INITIAL_RECIPES, INITIAL_PANTRY_ITEMS } from './data/mockRecipes';
import { Header } from './components/Header';
import { ExploreView } from './components/ExploreView';
import { AiGeneratorView } from './components/AiGeneratorView';
import { PantryView } from './components/PantryView';
import { MealPlannerView } from './components/MealPlannerView';
import { GroceryListView } from './components/GroceryListView';
import { SavedCollectionsView } from './components/SavedCollectionsView';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingModeModal } from './components/CookingModeModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core Data States
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipehub_recipes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_RECIPES;
      }
    }
    return INITIAL_RECIPES;
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    const saved = localStorage.getItem('recipehub_pantry');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PANTRY_ITEMS;
      }
    }
    return INITIAL_PANTRY_ITEMS;
  });

  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>(() => {
    const saved = localStorage.getItem('recipehub_mealplan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback default
      }
    }
    const days: MealPlanDay['day'][] = [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    return days.map((day, idx) => ({
      day,
      dateStr: `Oct ${14 + idx}`,
      meals: {
        breakfast: idx % 2 === 0 ? INITIAL_RECIPES[1] : INITIAL_RECIPES[6],
        lunch: idx % 2 === 1 ? INITIAL_RECIPES[3] : undefined,
        dinner: INITIAL_RECIPES[idx % INITIAL_RECIPES.length],
        snack: idx % 3 === 0 ? INITIAL_RECIPES[5] : undefined,
      }
    }));
  });

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('recipehub_groceries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: 'g1', name: 'Fresh ramen noodles', amount: '300g', category: 'Pantry & Grains', completed: false, recipeSource: 'Tokyo Shoyu Ramen' },
      { id: 'g2', name: 'Wild cod fillets', amount: '1 lb', category: 'Meat & Seafood', completed: false, recipeSource: 'Baja Fish Tacos' },
      { id: 'g3', name: 'Mexican beer (Pacifico)', amount: '6 pack', category: 'Other', completed: true, recipeSource: 'Baja Fish Tacos' },
      { id: 'g4', name: 'Fresh avocados', amount: '4 whole', category: 'Produce', completed: false, recipeSource: 'Avocado Tartine' },
      { id: 'g5', name: 'Frenched Rack of lamb', amount: '2 racks', category: 'Meat & Seafood', completed: false, recipeSource: 'Herb-Crusted Lamb' },
    ];
  });

  // Modals
  const [selectedRecipeForDetail, setSelectedRecipeForDetail] = useState<Recipe | null>(null);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<Recipe | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('recipehub_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('recipehub_pantry', JSON.stringify(pantryItems));
  }, [pantryItems]);

  useEffect(() => {
    localStorage.setItem('recipehub_mealplan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('recipehub_groceries', JSON.stringify(groceryItems));
  }, [groceryItems]);

  // Recipe actions
  const handleToggleSave = (recipeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRecipes(prev => prev.map(r => {
      if (r.id === recipeId) {
        const updated = { ...r, isSaved: !r.isSaved };
        if (selectedRecipeForDetail?.id === recipeId) {
          setSelectedRecipeForDetail(updated);
        }
        return updated;
      }
      return r;
    }));
  };

  const handleStartCooking = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedRecipeForDetail(null);
    setActiveCookingRecipe(recipe);
  };

  const handleRecipeGenerated = (newRecipe: Recipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
  };

  // Grocery actions
  const handleAddIngredientsToGrocery = (ingredients: Ingredient[], recipeTitle?: string) => {
    const newItems: GroceryItem[] = ingredients.map((ing, idx) => {
      let category: GroceryItem['category'] = 'Other';
      if (ing.category === 'produce') category = 'Produce';
      else if (ing.category === 'dairy') category = 'Dairy & Eggs';
      else if (ing.category === 'meat') category = 'Meat & Seafood';
      else if (ing.category === 'pantry') category = 'Pantry & Grains';
      else if (ing.category === 'spices') category = 'Spices & Condiments';
      else if (ing.category === 'bakery') category = 'Bakery';

      return {
        id: `g-${Date.now()}-${idx}`,
        name: ing.name,
        amount: `${ing.amount} ${ing.unit}`,
        category,
        completed: false,
        recipeSource: recipeTitle,
      };
    });

    setGroceryItems(prev => [...newItems, ...prev]);
  };

  const handleToggleGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleAddGroceryItem = (name: string, amount: string, category: GroceryItem['category']) => {
    const newItem: GroceryItem = {
      id: `g-${Date.now()}`,
      name,
      amount,
      category,
      completed: false,
    };
    setGroceryItems(prev => [newItem, ...prev]);
  };

  const handleDeleteGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCompletedGrocery = () => {
    setGroceryItems(prev => prev.filter(i => !i.completed));
  };

  // Pantry actions
  const handleTogglePantryItem = (id: string) => {
    setPantryItems(prev => prev.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  const handleAddPantryItem = (name: string, category: PantryItem['category']) => {
    const newItem: PantryItem = {
      id: `p-${Date.now()}`,
      name,
      category,
      inStock: true,
    };
    setPantryItems(prev => [newItem, ...prev]);
  };

  const handleDeletePantryItem = (id: string) => {
    setPantryItems(prev => prev.filter(i => i.id !== id));
  };

  // Meal Plan actions
  const handleUpdateMeal = (
    dayIndex: number, 
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', 
    recipe?: Recipe
  ) => {
    setMealPlan(prev => {
      const copy = [...prev];
      copy[dayIndex] = {
        ...copy[dayIndex],
        meals: {
          ...copy[dayIndex].meals,
          [mealType]: recipe,
        }
      };
      return copy;
    });
  };

  const handleAutoPlanWeek = () => {
    setMealPlan(prev => prev.map((day, idx) => ({
      ...day,
      meals: {
        breakfast: recipes.find(r => r.category === 'breakfast') || recipes[1],
        lunch: recipes.find(r => r.category === 'lunch') || recipes[3],
        dinner: recipes[(idx * 2) % recipes.length],
        snack: idx % 2 === 0 ? recipes.find(r => r.category === 'dessert') : undefined,
      }
    })));
  };

  const savedCount = recipes.filter(r => r.isSaved).length;
  const groceryCount = groceryItems.filter(i => !i.completed).length;

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 font-sans flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCount}
        groceryCount={groceryCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'explore' && (
          <ExploreView
            recipes={recipes}
            onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
            onToggleSave={handleToggleSave}
            onStartCooking={handleStartCooking}
            onNavigateToGenerator={() => setActiveTab('generator')}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'generator' && (
          <AiGeneratorView
            pantryItems={pantryItems}
            onRecipeGenerated={handleRecipeGenerated}
            onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
            onStartCooking={handleStartCooking}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'pantry' && (
          <PantryView
            pantryItems={pantryItems}
            recipes={recipes}
            onTogglePantryItem={handleTogglePantryItem}
            onAddPantryItem={handleAddPantryItem}
            onDeletePantryItem={handleDeletePantryItem}
            onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
            onStartCooking={handleStartCooking}
            onAddMissingToGrocery={handleAddIngredientsToGrocery}
          />
        )}

        {activeTab === 'planner' && (
          <MealPlannerView
            recipes={recipes}
            mealPlan={mealPlan}
            onUpdateMeal={handleUpdateMeal}
            onAutoPlanWeek={handleAutoPlanWeek}
            onGenerateGroceriesFromPlan={(ings) => handleAddIngredientsToGrocery(ings, 'Weekly Meal Plan')}
            onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
          />
        )}

        {activeTab === 'groceries' && (
          <GroceryListView
            groceryItems={groceryItems}
            onToggleGroceryItem={handleToggleGroceryItem}
            onAddGroceryItem={handleAddGroceryItem}
            onDeleteGroceryItem={handleDeleteGroceryItem}
            onClearCompleted={handleClearCompletedGrocery}
          />
        )}

        {activeTab === 'saved' && (
          <SavedCollectionsView
            recipes={recipes}
            onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
            onToggleSave={handleToggleSave}
            onStartCooking={handleStartCooking}
            onNavigateToExplore={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipeForDetail && (
        <RecipeDetailModal
          recipe={selectedRecipeForDetail}
          onClose={() => setSelectedRecipeForDetail(null)}
          onToggleSave={() => handleToggleSave(selectedRecipeForDetail.id)}
          onStartCooking={(r) => handleStartCooking(r)}
          onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
        />
      )}

      {/* Full-Screen Distraction-Free Cooking Mode */}
      {activeCookingRecipe && (
        <CookingModeModal
          recipe={activeCookingRecipe}
          onClose={() => setActiveCookingRecipe(null)}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            activeTab === 'explore' ? 'text-amber-600' : 'text-stone-500'
          }`}
        >
          <span>🍽️</span>
          <span>Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            activeTab === 'generator' ? 'text-amber-600' : 'text-stone-500'
          }`}
        >
          <span>✨</span>
          <span>AI Kitchen</span>
        </button>

        <button
          onClick={() => setActiveTab('pantry')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            activeTab === 'pantry' ? 'text-emerald-600' : 'text-stone-500'
          }`}
        >
          <span>🧊</span>
          <span>Pantry</span>
        </button>

        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            activeTab === 'planner' ? 'text-blue-600' : 'text-stone-500'
          }`}
        >
          <span>📅</span>
          <span>Planner</span>
        </button>

        <button
          onClick={() => setActiveTab('groceries')}
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            activeTab === 'groceries' ? 'text-purple-600' : 'text-stone-500'
          }`}
        >
          <span>🛍️</span>
          <span>Grocery</span>
          {groceryCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-purple-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {groceryCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            activeTab === 'saved' ? 'text-rose-600' : 'text-stone-500'
          }`}
        >
          <span>❤️</span>
          <span>Saved</span>
          {savedCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>
      </div>

    </div>
  );
}
