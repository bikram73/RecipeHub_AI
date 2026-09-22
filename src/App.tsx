import React, { useState, useEffect } from 'react';
import { 
  Recipe, 
  PantryItem, 
  MealPlanDay, 
  GroceryItem, 
  ActiveTab, 
  Ingredient,
  Creator,
  LocalProfile
} from './types';
import { INITIAL_RECIPES, INITIAL_PANTRY_ITEMS } from './data/mockRecipes';
import { Header } from './components/Header';
import { HomeLandingView } from './components/HomeLandingView';
import { ExploreView } from './components/ExploreView';
import { AiKitchenView } from './components/AiKitchenView';
import { PantryView } from './components/PantryView';
import { MealPlannerView } from './components/MealPlannerView';
import { GroceryListView } from './components/GroceryListView';
import { SavedCollectionsView } from './components/SavedCollectionsView';
import { MyRecipesView } from './components/MyRecipesView';
import { FollowingView } from './components/FollowingView';
import { ProfileView } from './components/ProfileView';
import { ActivityView } from './components/ActivityView';
import { SettingsView } from './components/SettingsView';
import { CreateEditRecipeModal } from './components/CreateEditRecipeModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingModeModal } from './components/CookingModeModal';
import { AddToCollectionModal } from './components/AddToCollectionModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { CreatorProfileModal } from './components/CreatorProfileModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ShareRecipeModal } from './components/ShareRecipeModal';
import { getStoredRecipes, saveStoredRecipes, logActivity, getProfile, isOnboarded } from './utils/storage';
import { getSharedRecipeFromUrl } from './services/share';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Profile & First-Time Onboarding State (triggered on clicking My Recipes if not onboarded)
  const [profile, setProfile] = useState<LocalProfile>(() => getProfile());
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === 'my-recipes') {
      const isConfigured = isOnboarded() && profile.name && profile.name.trim() !== '' && profile.name !== 'Home Chef';
      if (!isConfigured) {
        setIsOnboardingOpen(true);
      }
    }
    setActiveTab(tab);
  };

  // Modals & Navigation
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState<boolean>(false);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);
  const [selectedRecipeForDetail, setSelectedRecipeForDetail] = useState<Recipe | null>(null);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<Recipe | null>(null);
  const [recipeForCollection, setRecipeForCollection] = useState<Recipe | null>(null);
  const [shareRecipeTarget, setShareRecipeTarget] = useState<Recipe | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [aiInitialSubTab, setAiInitialSubTab] = useState<'generator' | 'assistant' | 'substitute' | 'improve'>('generator');
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');

  const handleOpenAskAi = (prompt?: string) => {
    setAiInitialSubTab('assistant');
    setAiInitialQuery(prompt || '');
    setActiveTab('ai-kitchen');
  };

  const handleOpenShare = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShareRecipeTarget(recipe);
  };

  // Core Data States
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    return getStoredRecipes(INITIAL_RECIPES);
  });

  // Handle shared recipe links on initial application mount
  useEffect(() => {
    const { recipeId, sharedRecipe } = getSharedRecipeFromUrl();
    if (sharedRecipe) {
      setRecipes((prev) => {
        const exists = prev.some((r) => r.id === sharedRecipe.id);
        if (!exists) {
          return [sharedRecipe, ...prev];
        }
        return prev;
      });
      setSelectedRecipeForDetail(sharedRecipe);
      logActivity({
        type: 'saved_recipe',
        title: 'Opened Shared Recipe',
        description: `Viewed "${sharedRecipe.title}"`,
        recipeId: sharedRecipe.id,
        recipeTitle: sharedRecipe.title,
      });
    } else if (recipeId) {
      const found = recipes.find((r) => r.id === recipeId);
      if (found) {
        setSelectedRecipeForDetail(found);
      }
    }
  }, []);

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

  // Sync to local storage
  useEffect(() => {
    saveStoredRecipes(recipes);
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
    setRecipes((prev) => {
      const target = prev.find((r) => r.id === recipeId);
      if (target) {
        logActivity({
          type: 'saved_recipe',
          title: target.isSaved ? 'Removed from Bookmarks' : 'Saved Recipe',
          description: `"${target.title}"`,
          recipeId: target.id,
          recipeTitle: target.title,
        });
      }
      return prev.map((r) => {
        if (r.id === recipeId) {
          const updated = { ...r, isSaved: !r.isSaved };
          if (selectedRecipeForDetail?.id === recipeId) {
            setSelectedRecipeForDetail(updated);
          }
          return updated;
        }
        return r;
      });
    });
  };

  const handleStartCooking = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedRecipeForDetail(null);
    setActiveCookingRecipe(recipe);
  };

  const handleSaveRecipe = (recipeData: Recipe) => {
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipeData.id);
      if (exists) {
        logActivity({
          type: 'created_recipe',
          title: 'Updated Recipe',
          description: `Edited "${recipeData.title}"`,
          recipeId: recipeData.id,
          recipeTitle: recipeData.title,
        });
        return prev.map((r) => (r.id === recipeData.id ? recipeData : r));
      } else {
        logActivity({
          type: 'created_recipe',
          title: 'Created New Recipe',
          description: `Published "${recipeData.title}"`,
          recipeId: recipeData.id,
          recipeTitle: recipeData.title,
        });
        return [recipeData, ...prev];
      }
    });

    setIsCreateEditModalOpen(false);
    setRecipeToEdit(null);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    const target = recipes.find((r) => r.id === recipeId);
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    if (target) {
      logActivity({
        type: 'deleted_recipe',
        title: 'Deleted Recipe',
        description: `Removed "${target.title}"`,
        recipeId: target.id,
        recipeTitle: target.title,
      });
    }
    setDeleteTarget(null);
    if (selectedRecipeForDetail?.id === recipeId) {
      setSelectedRecipeForDetail(null);
    }
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

    setGroceryItems((prev) => [...newItems, ...prev]);
    logActivity({
      type: 'grocery_updated',
      title: 'Added to Grocery Bag',
      description: `Added ${ingredients.length} items from ${recipeTitle || 'recipe'}`,
    });
  };

  const handleToggleGroceryItem = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddGroceryItem = (name: string, amount: string, category: GroceryItem['category']) => {
    const newItem: GroceryItem = {
      id: `g-${Date.now()}`,
      name,
      amount,
      category,
      completed: false,
    };
    setGroceryItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteGroceryItem = (id: string) => {
    setGroceryItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCompletedGrocery = () => {
    setGroceryItems((prev) => prev.filter((i) => !i.completed));
  };

  // Pantry actions
  const handleTogglePantryItem = (id: string) => {
    setPantryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const handleAddPantryItem = (name: string, category: PantryItem['category']) => {
    const newItem: PantryItem = {
      id: `p-${Date.now()}`,
      name,
      category,
      inStock: true,
    };
    setPantryItems((prev) => [newItem, ...prev]);
  };

  const handleDeletePantryItem = (id: string) => {
    setPantryItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Meal Plan actions
  const handleUpdateMeal = (
    dayIndex: number, 
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', 
    recipe?: Recipe
  ) => {
    setMealPlan((prev) => {
      const copy = [...prev];
      copy[dayIndex] = {
        ...copy[dayIndex],
        meals: {
          ...copy[dayIndex].meals,
          [mealType]: recipe,
        },
      };
      return copy;
    });
    if (recipe) {
      logActivity({
        type: 'meal_planned',
        title: 'Meal Scheduled',
        description: `Scheduled "${recipe.title}" for ${mealPlan[dayIndex]?.day || 'week'}`,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
      });
    }
  };

  const handleAutoPlanWeek = () => {
    setMealPlan((prev) =>
      prev.map((day, idx) => ({
        ...day,
        meals: {
          breakfast: recipes.find((r) => r.category === 'breakfast') || recipes[1],
          lunch: recipes.find((r) => r.category === 'lunch') || recipes[3],
          dinner: recipes[(idx * 2) % recipes.length],
          snack: idx % 2 === 0 ? recipes.find((r) => r.category === 'dessert') : undefined,
        },
      }))
    );
  };

  const savedCount = recipes.filter((r) => r.isSaved).length;
  const myRecipesCount = recipes.filter(
    (r) => r.isAiGenerated || r.id.startsWith('user-rec-')
  ).length;

  return (
    <div className="min-h-screen bg-[#faf6f3] text-[#201a17] font-sans flex flex-col selection:bg-[#ffdbcd] selection:text-[#9f3d00]">
      {/* First-time Onboarding & Profile Customization Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        initialProfile={profile}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(newProfile) => {
          setProfile(newProfile);
          setIsOnboardingOpen(false);
          setActiveTab('my-recipes');
        }}
      />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={savedCount}
        myRecipesCount={myRecipesCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreateRecipe={() => {
          setRecipeToEdit(null);
          setIsCreateEditModalOpen(true);
        }}
        profile={profile}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full pt-20">
        {activeTab === 'home' && (
          <HomeLandingView
            recipes={recipes}
            savedRecipeIds={new Set(recipes.filter((r) => r.isSaved).map((r) => r.id))}
            onSearch={(query) => setSearchQuery(query)}
            onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
            onToggleSave={handleToggleSave}
            onStartCooking={handleStartCooking}
            onOpenCreateRecipe={() => {
              setRecipeToEdit(null);
              setIsCreateEditModalOpen(true);
            }}
            onOpenAskAi={handleOpenAskAi}
            onNavigate={(tab) => {
              if (tab === 'create-recipe') {
                setRecipeToEdit(null);
                setIsCreateEditModalOpen(true);
              } else {
                handleTabChange(tab as ActiveTab);
              }
            }}
          />
        )}

        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ExploreView
              recipes={recipes}
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
              onToggleSave={handleToggleSave}
              onStartCooking={handleStartCooking}
              onNavigateToGenerator={() => setActiveTab('ai-kitchen')}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {(activeTab === 'generator' || activeTab === 'ai-kitchen') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AiKitchenView
              key={`${aiInitialSubTab}-${aiInitialQuery}`}
              recipes={recipes}
              pantryItems={pantryItems}
              initialSubTab={activeTab === 'generator' ? 'generator' : aiInitialSubTab}
              initialQuery={aiInitialQuery}
              onRecipeGenerated={(newRec) => {
                handleSaveRecipe(newRec);
                setSelectedRecipeForDetail(newRec);
              }}
              onSaveRecipe={handleSaveRecipe}
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
              onStartCooking={handleStartCooking}
              onToggleSave={handleToggleSave}
            />
          </div>
        )}

        {activeTab === 'pantry' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <MealPlannerView
              recipes={recipes}
              mealPlan={mealPlan}
              onUpdateMeal={handleUpdateMeal}
              onAutoPlanWeek={handleAutoPlanWeek}
              onGenerateGroceriesFromPlan={(ings) =>
                handleAddIngredientsToGrocery(ings, 'Weekly Meal Plan')
              }
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
            />
          </div>
        )}

        {activeTab === 'groceries' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <GroceryListView
              groceryItems={groceryItems}
              onToggleGroceryItem={handleToggleGroceryItem}
              onAddGroceryItem={handleAddGroceryItem}
              onDeleteGroceryItem={handleDeleteGroceryItem}
              onClearCompleted={handleClearCompletedGrocery}
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SavedCollectionsView
              recipes={recipes}
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
              onToggleSave={handleToggleSave}
              onStartCooking={handleStartCooking}
              onNavigateToExplore={() => setActiveTab('explore')}
            />
          </div>
        )}

        {activeTab === 'my-recipes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <MyRecipesView
              profile={profile}
              recipes={recipes}
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
              onStartCooking={handleStartCooking}
              onEditProfile={() => setIsOnboardingOpen(true)}
              onOpenCreateRecipe={() => {
                setRecipeToEdit(null);
                setIsCreateEditModalOpen(true);
              }}
              onEditRecipe={(rec) => {
                setRecipeToEdit(rec);
                setIsCreateEditModalOpen(true);
              }}
              onDeleteRecipe={(id, title) => {
                setDeleteTarget({ id, title });
              }}
            />
          </div>
        )}

        {activeTab === 'following' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <FollowingView
              recipes={recipes}
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
              onStartCooking={handleStartCooking}
              onViewCreatorProfile={(c) => setSelectedCreator(c)}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ProfileView
              profile={profile}
              recipes={recipes}
              onUpdateProfile={(updated) => setProfile(updated)}
              onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
              onStartCooking={handleStartCooking}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onOpenCreateRecipe={() => {
                setRecipeToEdit(null);
                setIsCreateEditModalOpen(true);
              }}
            />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ActivityView
              onSelectRecipe={(recId) => {
                const found = recipes.find((r) => r.id === recId);
                if (found) setSelectedRecipeForDetail(found);
              }}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SettingsView
              onNavigate={(tab) => setActiveTab(tab)}
              onRefreshAppState={() => {
                setRecipes(getStoredRecipes(INITIAL_RECIPES));
                setProfile(getProfile());
                setActiveTab('home');
              }}
              onClearAllData={() => {
                setRecipes(INITIAL_RECIPES);
                setPantryItems(INITIAL_PANTRY_ITEMS);
                setProfile(getProfile());
                setIsOnboardingOpen(true);
                setActiveTab('home');
              }}
            />
          </div>
        )}
      </main>

      {/* Unified Create & Edit Recipe Modal */}
      {isCreateEditModalOpen && (
        <CreateEditRecipeModal
          isOpen={isCreateEditModalOpen}
          recipeToEdit={recipeToEdit}
          onClose={() => {
            setIsCreateEditModalOpen(false);
            setRecipeToEdit(null);
          }}
          onSave={handleSaveRecipe}
        />
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipeForDetail && (
        <RecipeDetailModal
          recipe={selectedRecipeForDetail}
          onClose={() => setSelectedRecipeForDetail(null)}
          onToggleSave={() => handleToggleSave(selectedRecipeForDetail.id)}
          onStartCooking={(r) => handleStartCooking(r)}
          onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
          onOpenAddToCollection={(r) => setRecipeForCollection(r)}
          onOpenShare={(r) => handleOpenShare(r)}
          onEditRecipe={(r) => {
            setRecipeToEdit(r);
            setIsCreateEditModalOpen(true);
          }}
          onDeleteRecipe={(id, title) => {
            setDeleteTarget({ id, title });
          }}
          onNavigateToAi={() => {
            setActiveTab('ai-kitchen');
          }}
        />
      )}

      {/* Share Recipe Modal */}
      {shareRecipeTarget && (
        <ShareRecipeModal
          recipe={shareRecipeTarget}
          isOpen={Boolean(shareRecipeTarget)}
          onClose={() => setShareRecipeTarget(null)}
        />
      )}

      {/* Add To Collection Modal */}
      {recipeForCollection && (
        <AddToCollectionModal
          recipe={recipeForCollection}
          onClose={() => setRecipeForCollection(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          title={`Delete "${deleteTarget.title}"?`}
          description="Are you sure you want to delete this recipe from your personal culinary book? This action cannot be undone."
          onConfirm={() => handleDeleteRecipe(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Creator Profile Modal */}
      {selectedCreator && (
        <CreatorProfileModal
          creator={selectedCreator}
          recipes={recipes}
          onClose={() => setSelectedCreator(null)}
          onSelectRecipe={(r) => setSelectedRecipeForDetail(r)}
          onStartCooking={handleStartCooking}
        />
      )}

      {/* Full-Screen Distraction-Free Interactive Cooking Mode */}
      {activeCookingRecipe && (
        <CookingModeModal
          recipe={activeCookingRecipe}
          onClose={() => setActiveCookingRecipe(null)}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e1bfb2]/40 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleTabChange('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
            activeTab === 'home' ? 'text-[#9f3d00]' : 'text-gray-500'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span>Home</span>
        </button>

        <button
          onClick={() => handleTabChange('explore')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
            activeTab === 'explore' ? 'text-[#9f3d00]' : 'text-gray-500'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">explore</span>
          <span>Explore</span>
        </button>

        <button
          onClick={() => handleTabChange('ai-kitchen')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
            activeTab === 'ai-kitchen' || activeTab === 'generator'
              ? 'text-[#9f3d00]'
              : 'text-gray-500'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          <span>AI Kitchen</span>
        </button>

        <button
          onClick={() => {
            setRecipeToEdit(null);
            setIsCreateEditModalOpen(true);
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#9f3d00] cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-[#9f3d00] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[16px]">add</span>
          </div>
          <span>Create</span>
        </button>

        <button
          onClick={() => handleTabChange('saved')}
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
            activeTab === 'saved' ? 'text-[#9f3d00]' : 'text-gray-500'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">bookmark</span>
          <span>Saved</span>
          {savedCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-[#9f3d00] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleTabChange('profile')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
            activeTab === 'profile' ? 'text-[#9f3d00]' : 'text-gray-500'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
