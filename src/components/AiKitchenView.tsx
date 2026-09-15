import React, { useState } from 'react';
import { Sparkles, ChefHat, MessageSquare, RefreshCw, Bookmark, Plus, X, ArrowRight, Lightbulb, Zap, Heart, ShieldCheck, Check, Clock, Utensils } from 'lucide-react';
import { Recipe } from '../types';
import { generateRecipeWithAI, askCulinaryAssistant, getIngredientSubstitution, improveRecipeWithAI, SubstitutionResult, ImprovementResult } from '../services/gemini';
import { logActivity } from '../utils/storage';

interface AiKitchenViewProps {
  recipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
}

export const AiKitchenView: React.FC<AiKitchenViewProps> = ({
  recipes,
  onSaveRecipe,
  onSelectRecipe,
  onStartCooking,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'assistant' | 'substitute' | 'improve'>('generator');

  // 1. Generator State
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>(['Chicken breast', 'Cherry tomatoes', 'Fresh basil', 'Garlic']);
  const [selectedCuisine, setSelectedCuisine] = useState('Any');
  const [selectedDiet, setSelectedDiet] = useState('Any');
  const [selectedMealType, setSelectedMealType] = useState('dinner');
  const [targetTime, setTargetTime] = useState(25);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  // 2. Chat Assistant State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Hello Chef! I am your AI Culinary Sommelier powered by Gemini. Ask me about flavor pairings, baking troubleshooting, cooking times, or recipe modifications!',
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // 3. Substitution State
  const [subIngredientInput, setSubIngredientInput] = useState('Butter');
  const [substitutionResult, setSubstitutionResult] = useState<SubstitutionResult | null>(null);
  const [isSubLoading, setIsSubLoading] = useState(false);

  // 4. Improve Recipe State
  const [selectedRecipeForImprove, setSelectedRecipeForImprove] = useState<Recipe>(recipes[0] || null);
  const [improveGoal, setImproveGoal] = useState<'healthier' | 'vegan' | 'quicker' | 'high_protein'>('healthier');
  const [improveResult, setImproveResult] = useState<ImprovementResult | null>(null);
  const [isImproveLoading, setIsImproveLoading] = useState(false);

  // HANDLERS
  const handleAddIngredient = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (ingredientsInput.trim()) {
      if (!ingredientsList.includes(ingredientsInput.trim())) {
        setIngredientsList([...ingredientsList, ingredientsInput.trim()]);
      }
      setIngredientsInput('');
    }
  };

  const handleRemoveIngredient = (ing: string) => {
    setIngredientsList(ingredientsList.filter((item) => item !== ing));
  };

  const handleGenerateRecipe = async () => {
    if (ingredientsList.length === 0) return;
    setIsGenerating(true);
    setGeneratedRecipe(null);
    try {
      const result = await generateRecipeWithAI(ingredientsList, {
        cuisine: selectedCuisine,
        diet: selectedDiet,
        mealType: selectedMealType,
        maxTimeMinutes: targetTime,
      });
      setGeneratedRecipe(result);
      logActivity({
        type: 'generated_ai',
        title: 'Generated AI Recipe',
        description: `Created "${result.title}" using ${ingredientsList.join(', ')}`,
        recipeTitle: result.title,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user' as const, text: textToSend };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!presetText) setChatInput('');
    setIsChatLoading(true);

    try {
      const reply = await askCulinaryAssistant(textToSend);
      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I ran into an issue connecting. Please try asking again!' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleFindSubstitution = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!subIngredientInput.trim()) return;
    setIsSubLoading(true);
    try {
      const res = await getIngredientSubstitution(subIngredientInput.trim());
      setSubstitutionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubLoading(false);
    }
  };

  const handleImproveRecipe = async () => {
    if (!selectedRecipeForImprove) return;
    setIsImproveLoading(true);
    try {
      const res = await improveRecipeWithAI(selectedRecipeForImprove, improveGoal);
      setImproveResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsImproveLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#9f3d00] via-[#c74e00] to-[#ffab69] rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini 2.5 Flash Culinary Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">AI Kitchen Studio</h1>
            <p className="text-sm text-white/90 mt-2 leading-relaxed">
              Generate bespoke gourmet recipes from fridge leftovers, ask instant cooking troubleshooting questions, find ingredient swaps, and optimize meals for your diet.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-2xl">
            {[
              { id: 'generator', label: 'Recipe Generator', icon: ChefHat },
              { id: 'assistant', label: 'Cooking Chat', icon: MessageSquare },
              { id: 'substitute', label: 'Substitutions', icon: RefreshCw },
              { id: 'improve', label: 'Make Healthier', icon: Zap },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSubTab(id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSubTab === id
                    ? 'bg-white text-[#9f3d00] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. TAB: RECIPE GENERATOR */}
      {activeSubTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#9f3d00]" />
                <span>What's in your pantry/fridge?</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">Add available ingredients and seasonings.</p>
            </div>

            {/* Input + Chips */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  onKeyDown={handleAddIngredient}
                  placeholder="e.g. Salmon, spinach, heavy cream, garlic..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#9f3d00]"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Ingredient Badges */}
              <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                {ingredientsList.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">No ingredients added yet...</span>
                ) : (
                  ingredientsList.map((ing) => (
                    <span
                      key={ing}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-2xs"
                    >
                      <span>{ing}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(ing)}
                        className="text-gray-400 hover:text-rose-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Preferences Filter */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Cuisine Inspiration</label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white"
                >
                  <option value="Any">Any Inspired Cuisine</option>
                  <option value="Indian">Indian Heritage</option>
                  <option value="Italian">Italian Rustic</option>
                  <option value="Mexican">Mexican Vibrant</option>
                  <option value="French-Nordic">French-Nordic</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Japanese">Japanese Umami</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Dietary Target</label>
                <select
                  value={selectedDiet}
                  onChange={(e) => setSelectedDiet(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white"
                >
                  <option value="Any">No Preference</option>
                  <option value="High-Protein">High-Protein</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Keto">Keto Friendly</option>
                  <option value="Low-Carb">Low-Carb</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Maximum Cooking Time</span>
                <span className="text-[#9f3d00] font-bold">{targetTime} minutes</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={targetTime}
                onChange={(e) => setTargetTime(Number(e.target.value))}
                className="w-full accent-[#9f3d00]"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                Quick Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '🍗 Chicken + Rice + Veggies',
                  '🥚 Eggs + Potato + Onion',
                  '🍝 Pasta + Garlic + Olive oil',
                  '🌱 Tofu + Broccoli + Soy sauce',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      const parts = preset.slice(3).split(' + ');
                      setIngredientsList(parts);
                    }}
                    className="px-2 py-1 bg-gray-100 hover:bg-[#fff8f5] hover:text-[#9f3d00] rounded-lg text-[11px] font-medium transition-colors text-gray-700"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={isGenerating || ingredientsList.length === 0}
              onClick={handleGenerateRecipe}
              className="w-full py-3.5 bg-[#9f3d00] hover:bg-[#c74e00] disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Inventing Gourmet Recipe...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Recipe ✨</span>
                </>
              )}
            </button>
          </div>

          {/* Result Preview */}
          <div className="lg:col-span-7">
            {isGenerating && (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-[#9f3d00] flex items-center justify-center animate-bounce mb-4">
                  <ChefHat className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Crafting Culinary Masterpiece...</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-sm">
                  Gemini is pairing your ingredients, calibrating spices, calculating macros, and writing step-by-step instructions.
                </p>
              </div>
            )}

            {!isGenerating && !generatedRecipe && (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-[#fff8f5] text-[#9f3d00] flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Ready to Create Something Delicious</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-md">
                  Choose your ingredients on the left and tap Generate. Gemini will return a complete, structured recipe ready to cook or save.
                </p>
              </div>
            )}

            {!isGenerating && generatedRecipe && (
              <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden p-6 space-y-5 animate-in slide-in-from-bottom duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Invented
                      </span>
                      <span className="text-xs font-semibold text-[#9f3d00] uppercase tracking-wider">
                        {generatedRecipe.cuisine}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
                      {generatedRecipe.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{generatedRecipe.description}</p>
                  </div>
                </div>

                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-600 p-3 bg-[#fff8f5] rounded-2xl border border-amber-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#9f3d00]" />
                    <span>⏱ {generatedRecipe.prepTimeMinutes + generatedRecipe.cookTimeMinutes}m total</span>
                  </span>
                  <span>•</span>
                  <span>🍽 {generatedRecipe.servings} servings</span>
                  <span>•</span>
                  <span>🔥 {generatedRecipe.nutrition.calories} kcal</span>
                  <span>•</span>
                  <span>💪 {generatedRecipe.nutrition.protein}g protein</span>
                </div>

                {/* Ingredients List */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2">
                    Ingredients ({generatedRecipe.ingredients.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {generatedRecipe.ingredients.map((ing, i) => (
                      <div key={i} className="p-2 rounded-xl bg-gray-50 border border-gray-100 text-xs flex justify-between">
                        <span className="font-medium text-gray-800">{ing.name}</span>
                        <span className="font-bold text-[#9f3d00]">{ing.amount} {ing.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps Preview */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2">
                    Cooking Instructions
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {generatedRecipe.steps.map((st) => (
                      <div key={st.stepNumber} className="p-2.5 rounded-xl bg-gray-50 text-xs flex gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#ffdbcd] text-[#9f3d00] font-bold text-[11px] flex items-center justify-center shrink-0">
                          {st.stepNumber}
                        </span>
                        <p className="text-gray-700 flex-1">{st.instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      onSaveRecipe(generatedRecipe);
                    }}
                    className="flex-1 py-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save to My Recipes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartCooking(generatedRecipe)}
                    className="py-3 px-5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Start Cooking Mode</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. TAB: COOKING ASSISTANT CHAT */}
      {activeSubTab === 'assistant' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden flex flex-col h-[600px]">
          {/* Chat Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-2xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-[#9f3d00] text-white font-bold text-xs'
                      : 'bg-amber-100 text-[#9f3d00]'
                  }`}
                >
                  {msg.sender === 'user' ? 'ME' : <ChefHat className="w-4 h-4" />}
                </div>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#9f3d00] text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex gap-3 max-w-md mr-auto animate-pulse">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-[#9f3d00] flex items-center justify-center">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-2xl rounded-tl-none text-xs text-gray-500">
                  Chef Gemini is formulating culinary advice...
                </div>
              </div>
            )}
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-6 py-2 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-gray-400 shrink-0">Ask:</span>
            {[
              'How long to bake chicken at 400°F?',
              'Substitute for heavy cream in pasta?',
              'How to prevent sticky rice?',
              'Fix overly salted soup?',
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSendChatMessage(q)}
                className="px-3 py-1 bg-gray-100 hover:bg-[#fff8f5] hover:text-[#9f3d00] rounded-full text-xs font-medium text-gray-700 shrink-0 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
              placeholder="Ask anything about cooking techniques, ingredient substitutions, or recipes..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#9f3d00]"
            />
            <button
              type="button"
              disabled={isChatLoading || !chatInput.trim()}
              onClick={() => handleSendChatMessage()}
              className="px-6 py-3 bg-[#9f3d00] hover:bg-[#c74e00] disabled:bg-gray-300 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Ask Chef
            </button>
          </div>
        </div>
      )}

      {/* 3. TAB: INGREDIENT SUBSTITUTION */}
      {activeSubTab === 'substitute' && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 shadow-xs space-y-6">
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9f3d00] flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-900">Intelligent Ingredient Substitution</h2>
            <p className="text-xs text-gray-500 mt-1">
              Missing an ingredient? Discover optimal culinary alternatives with exact ratios and flavor impact.
            </p>
          </div>

          <form onSubmit={handleFindSubstitution} className="flex gap-2">
            <input
              type="text"
              required
              value={subIngredientInput}
              onChange={(e) => setSubIngredientInput(e.target.value)}
              placeholder="e.g. Buttermilk, Egg, Heavy cream, Cornstarch, Fish sauce..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#9f3d00]"
            />
            <button
              type="submit"
              disabled={isSubLoading}
              className="px-6 py-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
            >
              {isSubLoading ? 'Analyzing...' : 'Find Substitutes'}
            </button>
          </form>

          {substitutionResult && (
            <div className="p-6 rounded-2xl bg-[#fff8f5] border border-amber-200/80 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#9f3d00] uppercase tracking-wider">
                  Top Recommended Pick
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {substitutionResult.bestOption.ratio}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">{substitutionResult.bestOption.name}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Flavor Impact:</strong> {substitutionResult.bestOption.tasteImpact}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  <strong>Best Used In:</strong> {substitutionResult.bestOption.bestFor}
                </p>
              </div>

              {substitutionResult.alternatives.length > 0 && (
                <div className="pt-3 border-t border-amber-200/60 space-y-2">
                  <span className="text-xs font-bold text-gray-700">Other viable alternatives:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {substitutionResult.alternatives.map((alt, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-amber-100 text-xs">
                        <span className="font-bold text-gray-900 block">{alt.name}</span>
                        <span className="text-[#9f3d00] font-semibold">{alt.ratio}</span>
                        <p className="text-gray-500 mt-0.5">{alt.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB: IMPROVE / OPTIMIZE RECIPE */}
      {activeSubTab === 'improve' && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Recipe Optimization & Dietary Rewriter</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Select any existing recipe and let Gemini intelligently rewrite it to be healthier, vegan, faster, or higher in protein.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Select Recipe</label>
              <select
                value={selectedRecipeForImprove?.id}
                onChange={(e) => {
                  const found = recipes.find((r) => r.id === e.target.value);
                  if (found) setSelectedRecipeForImprove(found);
                }}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-200 bg-white"
              >
                {recipes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.cuisine} • {r.nutrition?.calories} kcal)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Optimization Goal</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'healthier', label: '🥗 Healthier / Low Fat' },
                  { id: 'vegan', label: '🌱 100% Plant-Based' },
                  { id: 'quicker', label: '⚡ 15-Min Quick' },
                  { id: 'high_protein', label: '💪 High Protein' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setImproveGoal(g.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      improveGoal === g.id
                        ? 'bg-[#9f3d00] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={isImproveLoading}
            onClick={handleImproveRecipe}
            className="w-full py-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
          >
            {isImproveLoading ? 'Optimizing Recipe with AI...' : 'Optimize Recipe Now ✨'}
          </button>

          {improveResult && (
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-gray-900 text-base">{improveResult.summary}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Ingredient Replacements
                  </span>
                  <div className="space-y-2">
                    {improveResult.modifiedIngredients.map((mod, i) => (
                      <div key={i} className="text-xs">
                        <span className="line-through text-rose-500">{mod.original}</span> →{' '}
                        <strong className="text-emerald-700">{mod.replacement}</strong>
                        <p className="text-[11px] text-gray-500">{mod.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-100">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Caloric & Macro Impact
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <p>
                      Original: <strong>{improveResult.macroComparison.originalCalories} kcal</strong> →
                      Optimized: <strong className="text-emerald-700">{improveResult.macroComparison.newCalories} kcal</strong>
                    </p>
                    <p className="text-[#9f3d00] font-semibold">
                      ✨ {improveResult.macroComparison.keyBenefit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
