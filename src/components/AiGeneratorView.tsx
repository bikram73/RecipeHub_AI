import React, { useState } from 'react';
import { Recipe, PantryItem } from '../types';
import { 
  Sparkles, 
  ChefHat, 
  Clock, 
  Flame, 
  Utensils, 
  Plus, 
  X, 
  Play, 
  Bookmark, 
  Check, 
  Calendar,
  Layers
} from 'lucide-react';

interface AiGeneratorViewProps {
  pantryItems: PantryItem[];
  onRecipeGenerated: (recipe: Recipe) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onToggleSave: (recipeId: string) => void;
}

export const AiGeneratorView: React.FC<AiGeneratorViewProps> = ({
  pantryItems,
  onRecipeGenerated,
  onSelectRecipe,
  onStartCooking,
  onToggleSave,
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    pantryItems.filter(p => p.inStock).slice(0, 4).map(p => p.name)
  );
  const [customIngredient, setCustomIngredient] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('Any Cuisine');
  const [mealType, setMealType] = useState<string>('dinner');
  const [timeBudget, setTimeBudget] = useState<number>(30);
  const [dietary, setDietary] = useState<string[]>(['High-Protein']);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Spicy'>('Medium');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStage, setGenerationStage] = useState<string>('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const quickPrompts = [
    'Quick 25-minute creamy Tuscan skillet with chicken and spinach',
    'Crispy sesame ginger salmon bowl with avocado & spicy mayo',
    'Hearty Mediterranean chickpea bowl with lemon-tahini dressing',
    'Silky Japanese garlic butter noodles with poached egg',
  ];

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  const handleRemoveIngredient = (name: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== name));
  };

  const toggleDietary = (diet: string) => {
    if (dietary.includes(diet)) {
      setDietary(dietary.filter(d => d !== diet));
    } else {
      setDietary([...dietary, diet]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedRecipe(null);

    // AI Generation Stages Simulation
    setGenerationStage('Analyzing available ingredients & flavor affinities...');

    setTimeout(() => {
      setGenerationStage('Formulating culinary flavor profile & nutrition balance...');
    }, 1200);

    setTimeout(() => {
      setGenerationStage('Drafting precision chef instructions & timing steps...');
    }, 2400);

    setTimeout(() => {
      // Create dynamically tailored recipe
      const mainIngredient = selectedIngredients[0] || 'Artisan Produce';
      const secondaryIngredient = selectedIngredients[1] || 'Fresh Herbs';
      const promptTitle = prompt.trim()
        ? prompt.split(' ').slice(0, 6).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : `${cuisine !== 'Any Cuisine' ? cuisine : 'Gourmet'} ${mainIngredient} & ${secondaryIngredient} Skillet`;

      const newAiRecipe: Recipe = {
        id: `ai-${Date.now()}`,
        title: promptTitle,
        subtitle: `Custom chef creation tailored with ${selectedIngredients.slice(0, 3).join(', ')}`,
        description: `A custom-engineered ${cuisine.toLowerCase()} masterpiece balancing savory aromas with ${spiceLevel.toLowerCase()} notes, prepared in under ${timeBudget} minutes.`,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
        cuisine: cuisine === 'Any Cuisine' ? 'Modern Fusion' : cuisine,
        category: mealType as any,
        difficulty: timeBudget <= 20 ? 'Easy' : 'Medium',
        prepTimeMinutes: Math.floor(timeBudget * 0.35),
        cookTimeMinutes: Math.floor(timeBudget * 0.65),
        servings: 2,
        rating: 4.95,
        reviewCount: 1,
        tags: ['AI Invented', `${timeBudget} Min`, ...dietary],
        dietary: dietary as any,
        isAiGenerated: true,
        isSaved: true,
        nutrition: {
          calories: 460 + Math.floor(Math.random() * 80),
          protein: 36 + Math.floor(Math.random() * 10),
          carbs: 28 + Math.floor(Math.random() * 15),
          fat: 18 + Math.floor(Math.random() * 6),
          fiber: 6,
          sugar: 3,
        },
        author: {
          name: 'RecipeHub AI Chef',
          avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
          role: 'Culinary Intelligence v3',
        },
        winePairing: 'Light chilled Pinot Grigio or Sparkling Yuzu Water',
        ingredients: [
          ...selectedIngredients.map((name, idx) => ({
            id: `gen-i-${idx}`,
            name,
            amount: idx === 0 ? 2 : 1,
            unit: idx === 0 ? 'portions' : 'cup',
            category: 'pantry' as any
          })),
          { id: 'gen-i-extra1', name: 'Extra virgin olive oil', amount: 2, unit: 'tbsp', category: 'pantry' },
          { id: 'gen-i-extra2', name: 'Garlic cloves, crushed', amount: 3, unit: 'cloves', category: 'produce' },
          { id: 'gen-i-extra3', name: 'Sea salt & cracked black pepper', amount: 1, unit: 'pinch', category: 'spices' },
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: `Prep mise-en-place: Clean and chop ${selectedIngredients.slice(0, 2).join(' and ')} into bite-sized uniform portions for even heat distribution.`,
            tip: 'Uniform cutting ensures synchronized cooking without overcooking delicate pieces.'
          },
          {
            stepNumber: 2,
            instruction: 'Heat olive oil in a heavy-bottomed skillet over medium-high heat. Add aromatics and sauté for 90 seconds until fragrant.',
            timerMinutes: 2
          },
          {
            stepNumber: 3,
            instruction: `Incorporate ${selectedIngredients[0] || 'primary protein/vegetable'} into the skillet. Sear undisturbed for 4-5 minutes until golden caramelization develops.`,
            timerMinutes: 5
          },
          {
            stepNumber: 4,
            instruction: `Toss in remaining ingredients, deglaze pan with a splash of water or broth, and simmer gently for ${Math.max(4, Math.floor(timeBudget * 0.3))} minutes.`,
            timerMinutes: Math.max(4, Math.floor(timeBudget * 0.3))
          },
          {
            stepNumber: 5,
            instruction: 'Adjust seasoning with sea salt, pepper, and fresh squeeze of lemon juice. Plate warmly and serve immediately.',
            tip: 'Rest for 2 minutes before serving to allow delicate pan juices to settle.'
          }
        ]
      };

      setGeneratedRecipe(newAiRecipe);
      onRecipeGenerated(newAiRecipe);
      setIsGenerating(false);
    }, 3600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Generative AI Chef Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Create Custom Recipes in Seconds
        </h1>
        <p className="text-sm text-stone-600">
          Tell Chef AI what you are craving, specify ingredients in your fridge, and let intelligence curate the exact recipe with timings, macros, and step-by-step guidance.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
          
          {/* Prompt input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              What do you want to eat? (Prompt or Inspiration)
            </label>
            <div className="relative">
              <input
                id="ai-prompt-input"
                type="text"
                placeholder="e.g. Creamy Tuscan skillet with spinach and parmesan under 20 mins..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-900 placeholder-stone-400 rounded-2xl border border-stone-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickPrompts.map((q, i) => (
                <button
                  key={i}
                  id={`quick-prompt-${i}`}
                  onClick={() => setPrompt(q)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-50 hover:text-amber-900 text-stone-600 border border-stone-200 transition-all text-left"
                >
                  ✨ {q}
                </button>
              ))}
            </div>
          </div>

          {/* Fridge / Pantry Ingredients Available */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Ingredients on hand (From Your Pantry)
              </label>
              <span className="text-xs text-stone-400">{selectedIngredients.length} selected</span>
            </div>

            {/* Selected Ingredient Chips */}
            <div className="flex flex-wrap gap-2 min-h-[38px] p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
              {selectedIngredients.map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-medium shadow-xs"
                >
                  <span>{ing}</span>
                  <button
                    onClick={() => handleRemoveIngredient(ing)}
                    className="text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Add Custom Ingredient Input */}
              <div className="flex items-center gap-1 flex-1 min-w-[140px]">
                <input
                  type="text"
                  placeholder="+ Add ingredient..."
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomIngredient()}
                  className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-none px-2 py-1"
                />
                {customIngredient && (
                  <button
                    onClick={handleAddCustomIngredient}
                    className="p-1 text-amber-600 hover:text-amber-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cuisine & Meal Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Cuisine Style
              </label>
              <select
                id="ai-cuisine-select"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
              >
                <option>Any Cuisine</option>
                <option>Italian</option>
                <option>Japanese</option>
                <option>Mexican</option>
                <option>Mediterranean</option>
                <option>French</option>
                <option>Thai</option>
                <option>Indian</option>
                <option>American Modern</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Meal Category
              </label>
              <select
                id="ai-meal-type-select"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
              >
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
                <option value="breakfast">Breakfast</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>

          {/* Time Budget Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 uppercase tracking-wider">Max Total Time</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {timeBudget} Minutes
              </span>
            </div>
            <input
              id="ai-time-slider"
              type="range"
              min="10"
              max="60"
              step="5"
              value={timeBudget}
              onChange={(e) => setTimeBudget(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium">
              <span>10m (Ultra Quick)</span>
              <span>30m (Standard)</span>
              <span>60m (Gourmet)</span>
            </div>
          </div>

          {/* Dietary Restrictions Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Dietary Goals
            </label>
            <div className="flex flex-wrap gap-2">
              {['High-Protein', 'Keto', 'Low-Carb', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((diet) => (
                <button
                  key={diet}
                  id={`ai-diet-${diet}`}
                  onClick={() => toggleDietary(diet)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    dietary.includes(diet)
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {dietary.includes(diet) && <Check className="w-3 h-3 inline mr-1 stroke-[3]" />}
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Mild', 'Medium', 'Spicy'] as const).map((lvl) => (
                <button
                  key={lvl}
                  id={`ai-spice-${lvl}`}
                  onClick={() => setSpiceLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    spiceLevel === lvl
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {lvl === 'Mild' ? '🌿 Mild' : lvl === 'Medium' ? '🌶️ Medium' : '🔥 Fiery'}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Trigger Button */}
          <button
            id="generate-recipe-submit-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isGenerating
                ? 'bg-stone-800 text-stone-400 cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Chef AI is Cooking...' : 'Generate AI Recipe Now'}</span>
          </button>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-5 flex flex-col">
          {isGenerating ? (
            /* Loading Thinking Animation */
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-stone-900 rounded-3xl text-white text-center space-y-6 animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <ChefHat className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Crafting Your Masterpiece</h3>
                <p className="text-xs text-amber-400 font-mono tracking-wide">{generationStage}</p>
              </div>
              <div className="w-48 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 animate-pulse rounded-full w-3/4" />
              </div>
            </div>
          ) : generatedRecipe ? (
            /* Generated Recipe Outcome Card */
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between animate-fade-in h-full">
              <div>
                {/* Image Header */}
                <div className="relative h-48 bg-stone-900">
                  <img
                    src={generatedRecipe.imageUrl}
                    alt={generatedRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500 text-stone-950 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" /> AI Generated
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-extrabold text-lg text-white leading-snug line-clamp-1">
                      {generatedRecipe.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {generatedRecipe.prepTimeMinutes + generatedRecipe.cookTimeMinutes}m</span>
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-rose-400" /> {generatedRecipe.nutrition.calories} kcal</span>
                      <span className="text-emerald-400 font-semibold">{generatedRecipe.nutrition.protein}g Protein</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {generatedRecipe.description}
                  </p>

                  {/* Ingredients Preview */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Key Ingredients</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {generatedRecipe.ingredients.slice(0, 4).map((ing) => (
                        <div key={ing.id} className="text-[11px] p-1.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-700 font-medium">
                          • {ing.amount} {ing.unit} {ing.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps Preview */}
                  {generatedRecipe.steps && generatedRecipe.steps.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Method Highlights ({generatedRecipe.steps.length} Steps)
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 italic bg-amber-50/60 p-2 rounded-xl border border-amber-200/50">
                        "Step 1: {generatedRecipe.steps[0]?.instruction || 'Get ingredients ready.'}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2">
                <button
                  id="ai-recipe-start-cooking-btn"
                  onClick={() => onStartCooking(generatedRecipe)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Start Cooking This Now</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="ai-recipe-view-full-btn"
                    onClick={() => onSelectRecipe(generatedRecipe)}
                    className="py-2 px-3 rounded-xl bg-white border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold text-xs transition-all"
                  >
                    View Full Details
                  </button>

                  <button
                    id="ai-recipe-save-btn"
                    onClick={() => onToggleSave(generatedRecipe.id)}
                    className={`py-2 px-3 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      generatedRecipe.isSaved
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-white border-stone-200 text-stone-700'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${generatedRecipe.isSaved ? 'fill-rose-600' : ''}`} />
                    <span>{generatedRecipe.isSaved ? 'Saved to Book' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Idle Placeholder */
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-stone-50 rounded-3xl border border-dashed border-stone-300 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
                <ChefHat className="w-7 h-7" />
              </div>
              <div className="max-w-xs">
                <h3 className="font-bold text-stone-800 text-sm mb-1">Your AI Kitchen Canvas</h3>
                <p className="text-xs text-stone-500">
                  Select your ingredients and prompt on the left, then click generate to create a custom recipe.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
