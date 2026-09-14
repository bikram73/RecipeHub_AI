import React, { useState } from 'react';
import { Recipe, Ingredient, CookingStep } from '../types';
import { ChefHat, X, Plus, Trash2, Sparkles, Image as ImageIcon, Clock, Flame, Users } from 'lucide-react';
import { CHEF_GIRL_AVATAR } from './HomeLandingView';

interface CreateRecipeModalProps {
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
}

export const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  onClose,
  onSaveRecipe,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80');
  const [cuisine, setCuisine] = useState('Italian');
  const [category, setCategory] = useState<Recipe['category']>('dinner');
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>('Easy');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(25);
  const [servings, setServings] = useState(4);
  const [calories, setCalories] = useState(420);
  const [protein, setProtein] = useState(30);
  const [carbs, setCarbs] = useState(35);
  const [fat, setFat] = useState(18);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Fresh garlic cloves', amount: 3, unit: 'cloves', category: 'produce' },
    { id: '2', name: 'Extra virgin olive oil', amount: 2, unit: 'tbsp', category: 'pantry' },
    { id: '3', name: 'Kosher salt & black pepper', amount: 1, unit: 'tsp', category: 'spices' },
  ]);

  const [steps, setSteps] = useState<CookingStep[]>([
    { stepNumber: 1, instruction: 'Prepare and mise en place all fresh ingredients and preheat your cookware.' },
    { stepNumber: 2, instruction: 'Sauté aromatics over medium heat until fragrant and golden.', timerMinutes: 5 },
    { stepNumber: 3, instruction: 'Combine main elements, simmer gently, and season to perfection.', timerMinutes: 15 },
  ]);

  const handleAddIngredient = () => {
    setIngredients(prev => [
      ...prev,
      { id: Date.now().toString(), name: '', amount: 1, unit: 'piece', category: 'produce' }
    ]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleAddStep = () => {
    setSteps(prev => [
      ...prev,
      { stepNumber: prev.length + 1, instruction: '', timerMinutes: 5 }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(prev => prev.filter((_, idx) => idx !== index).map((s, idx) => ({ ...s, stepNumber: idx + 1 })));
  };

  const handleUpdateStep = (index: number, field: keyof CookingStep, value: any) => {
    setSteps(prev => prev.map((s, idx) => idx === index ? { ...s, [field]: value } : s));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe: Recipe = {
      id: `rec-user-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Custom Home Chef Recipe',
      description: description.trim() || 'A delicious home-crafted recipe.',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      cuisine,
      category,
      difficulty,
      prepTimeMinutes: Number(prepTime) || 10,
      cookTimeMinutes: Number(cookTime) || 20,
      servings: Number(servings) || 2,
      rating: 5.0,
      reviewCount: 1,
      tags: ['Home Chef', cuisine, difficulty],
      dietary: ['Gluten-Free'],
      nutrition: {
        calories: Number(calories) || 400,
        protein: Number(protein) || 25,
        carbs: Number(carbs) || 30,
        fat: Number(fat) || 15,
      },
      ingredients: ingredients.filter(i => i.name.trim() !== ''),
      steps: steps.filter(s => s.instruction.trim() !== ''),
      author: {
        name: 'You (Chef Clara Community)',
        avatar: CHEF_GIRL_AVATAR,
        role: 'Home Gastronomist',
      },
      isSaved: true,
    };

    onSaveRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#e1bfb2]/40 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#fef1ea] via-white to-[#f8ece5] border-b border-[#e1bfb2]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#9f3d00] text-white flex items-center justify-center shadow-xs">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#201a17] font-bold">Create Your Own Recipe</h2>
              <p className="text-xs text-[#594137]">Publish to your personal collection and community feed</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-900 border border-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#201a17] mb-1">Recipe Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Crispy Lemon Rosemary Roast Chicken"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fef1ea] border border-[#e1bfb2]/60 rounded-xl text-sm text-[#201a17] focus:bg-white focus:ring-2 focus:ring-[#9f3d00]/25 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#201a17] mb-1">Subtitle / Quick Hook</label>
              <input
                type="text"
                placeholder="e.g., Golden crispy skin with garlic herb butter pan jus"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fef1ea] border border-[#e1bfb2]/60 rounded-xl text-sm text-[#201a17] focus:bg-white focus:ring-2 focus:ring-[#9f3d00]/25 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#201a17] mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Describe why this recipe is special, texture, flavor notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fef1ea] border border-[#e1bfb2]/60 rounded-xl text-sm text-[#201a17] focus:bg-white focus:ring-2 focus:ring-[#9f3d00]/25 outline-none resize-none"
              />
            </div>
          </div>

          {/* Image & Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#201a17] mb-1">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#fef1ea] border border-[#e1bfb2]/60 rounded-xl text-xs text-[#201a17] focus:bg-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-[#201a17] mb-1">Cuisine</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fef1ea] border border-[#e1bfb2]/60 rounded-xl text-xs text-[#201a17] font-medium outline-none"
                >
                  <option value="Italian">Italian</option>
                  <option value="French">French</option>
                  <option value="Indian">Indian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Japanese">Japanese</option>
                  <option value="American">American</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Asian Fusion">Asian Fusion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#201a17] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#fef1ea] border border-[#e1bfb2]/60 rounded-xl text-xs text-[#201a17] font-medium outline-none"
                >
                  <option value="dinner">Dinner</option>
                  <option value="lunch">Lunch</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                  <option value="baking">Baking</option>
                </select>
              </div>
            </div>
          </div>

          {/* Time, Servings & Macros */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#fef1ea] rounded-2xl border border-[#e1bfb2]/40">
            <div>
              <span className="text-[11px] text-[#594137] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#9f3d00]" /> Prep (min)
              </span>
              <input
                type="number"
                min={1}
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#201a17]"
              />
            </div>

            <div>
              <span className="text-[11px] text-[#594137] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8e4e14]" /> Cook (min)
              </span>
              <input
                type="number"
                min={1}
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#201a17]"
              />
            </div>

            <div>
              <span className="text-[11px] text-[#594137] font-semibold flex items-center gap-1">
                <Users className="w-3 h-3 text-[#00685d]" /> Servings
              </span>
              <input
                type="number"
                min={1}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#201a17]"
              />
            </div>

            <div>
              <span className="text-[11px] text-[#594137] font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-500" /> Calories
              </span>
              <input
                type="number"
                min={50}
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#201a17]"
              />
            </div>
          </div>

          {/* Ingredients List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#201a17] uppercase tracking-wider">
                Ingredients ({ingredients.length})
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="inline-flex items-center gap-1 text-xs text-[#9f3d00] font-bold hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Ingredient
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing) => (
                <div key={ing.id} className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0.1}
                    step="any"
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(ing.id, 'amount', Number(e.target.value))}
                    className="w-16 px-2.5 py-1.5 bg-[#fef1ea] border border-[#e1bfb2]/50 rounded-lg text-xs font-medium text-[#201a17]"
                    placeholder="Qty"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => handleUpdateIngredient(ing.id, 'unit', e.target.value)}
                    className="w-20 px-2.5 py-1.5 bg-[#fef1ea] border border-[#e1bfb2]/50 rounded-lg text-xs text-[#201a17]"
                    placeholder="Unit"
                  />
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(ing.id, 'name', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-[#fef1ea] border border-[#e1bfb2]/50 rounded-lg text-xs font-medium text-[#201a17]"
                    placeholder="Ingredient name (e.g. San Marzano tomatoes)"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(ing.id)}
                      className="text-stone-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#201a17] uppercase tracking-wider">
                Cooking Steps ({steps.length})
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1 text-xs text-[#9f3d00] font-bold hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-[#f8ece5] rounded-xl flex items-start gap-2.5 border border-[#e1bfb2]/30">
                  <span className="w-6 h-6 rounded-full bg-[#9f3d00] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <textarea
                      rows={2}
                      value={step.instruction}
                      onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                      placeholder={`Step ${idx + 1} instructions...`}
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-[#201a17] focus:ring-1 focus:ring-[#9f3d00] outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-stone-500 font-semibold">Timer (min):</span>
                      <input
                        type="number"
                        min={0}
                        value={step.timerMinutes || 0}
                        onChange={(e) => handleUpdateStep(idx, 'timerMinutes', Number(e.target.value))}
                        className="w-16 px-2 py-0.5 bg-white border border-stone-200 rounded text-xs font-medium"
                      />
                    </div>
                  </div>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-stone-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#9f3d00] hover:bg-[#c74e00] text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Save & Publish Recipe
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
