import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ChefHat, Sparkles, Image as ImageIcon, Clock, Users, Flame, Save, AlertCircle } from 'lucide-react';
import { Recipe, Ingredient, CookingStep, LocalProfile } from '../types';
import { getProfile, logActivity } from '../utils/storage';

interface CreateEditRecipeModalProps {
  isOpen: boolean;
  recipeToEdit?: Recipe | null;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}

const CUISINES = [
  'Indian',
  'Italian',
  'French-Nordic',
  'Mexican',
  'Japanese',
  'Mediterranean',
  'American',
  'Chinese',
  'Thai',
  'Middle Eastern',
];

const CATEGORIES: ('breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'baking')[] = [
  'breakfast',
  'lunch',
  'dinner',
  'dessert',
  'snack',
  'baking',
];

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
];

export const CreateEditRecipeModal: React.FC<CreateEditRecipeModalProps> = ({
  isOpen,
  recipeToEdit,
  onClose,
  onSave,
}) => {
  const profile = getProfile();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('Indian');
  const [category, setCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'baking'>('dinner');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(15);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(25);
  const [servings, setServings] = useState(4);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0]);
  const [dietary, setDietary] = useState<string[]>(['High-Protein']);
  const [tagsInput, setTagsInput] = useState('QuickDinner, ComfortFood');
  const [calories, setCalories] = useState(450);
  const [protein, setProtein] = useState(32);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 'ing-1', name: 'Fresh Chicken Breast or Paneer', amount: 400, unit: 'g', category: 'meat' },
    { id: 'ing-2', name: 'Garlic cloves, minced', amount: 4, unit: 'cloves', category: 'produce' },
    { id: 'ing-3', name: 'Extra virgin olive oil', amount: 2, unit: 'tbsp', category: 'pantry' },
  ]);

  const [steps, setSteps] = useState<CookingStep[]>([
    { stepNumber: 1, instruction: 'Pat the ingredients completely dry and season with salt, freshly ground pepper, and spices.', tip: 'Dry surface creates the crispiest golden crust.' },
    { stepNumber: 2, instruction: 'Heat olive oil in a large skillet over medium-high heat until shimmering. Sear ingredients for 5 minutes per side.', timerMinutes: 10 },
    { stepNumber: 3, instruction: 'Garnish with freshly chopped herbs and serve piping hot with crusty bread or steamed rice.' },
  ]);

  const [validationError, setValidationError] = useState<string | null>(null);

  // Populate when editing
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title);
      setSubtitle(recipeToEdit.subtitle || '');
      setDescription(recipeToEdit.description || '');
      setCuisine(recipeToEdit.cuisine || 'Indian');
      setCategory((recipeToEdit.category as any) || 'dinner');
      setDifficulty(recipeToEdit.difficulty || 'Medium');
      setPrepTimeMinutes(recipeToEdit.prepTimeMinutes || 15);
      setCookTimeMinutes(recipeToEdit.cookTimeMinutes || 25);
      setServings(recipeToEdit.servings || 4);
      setImageUrl(recipeToEdit.imageUrl || PRESET_IMAGES[0]);
      setDietary(recipeToEdit.dietary || []);
      setTagsInput((recipeToEdit.tags || []).join(', '));
      setCalories(recipeToEdit.nutrition?.calories || 450);
      setProtein(recipeToEdit.nutrition?.protein || 30);
      setIngredients(recipeToEdit.ingredients || []);
      setSteps(recipeToEdit.steps || []);
    } else {
      // Reset defaults
      setTitle('');
      setSubtitle('');
      setDescription('');
    }
    setValidationError(null);
  }, [recipeToEdit, isOpen]);

  if (!isOpen) return null;

  // INGREDIENT ACTIONS
  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: `ing-${Date.now()}`, name: '', amount: 1, unit: 'tbsp', category: 'pantry' },
    ]);
  };

  const handleUpdateIngredient = (index: number, field: keyof Ingredient, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // STEP ACTIONS
  const handleAddStep = () => {
    setSteps([
      ...steps,
      { stepNumber: steps.length + 1, instruction: '' },
    ]);
  };

  const handleUpdateStep = (index: number, field: keyof CookingStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps
      .filter((_, i) => i !== index)
      .map((st, i) => ({ ...st, stepNumber: i + 1 }));
    setSteps(updated);
  };

  // SUBMISSION VALIDATION
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError('Recipe title is required.');
      return;
    }
    if (!description.trim()) {
      setValidationError('Please provide a brief description for your recipe.');
      return;
    }
    if (ingredients.length === 0 || ingredients.some((ing) => !ing.name.trim())) {
      setValidationError('Please fill in all ingredient names (or remove empty rows).');
      return;
    }
    if (steps.length === 0 || steps.some((st) => !st.instruction.trim())) {
      setValidationError('Please fill in all cooking instructions (or remove empty steps).');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const recipePayload: Recipe = {
      id: recipeToEdit ? recipeToEdit.id : `user-rec-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${cuisine} style home meal`,
      description: description.trim(),
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0],
      cuisine,
      category,
      difficulty,
      prepTimeMinutes: Number(prepTimeMinutes) || 10,
      cookTimeMinutes: Number(cookTimeMinutes) || 20,
      servings: Number(servings) || 4,
      rating: recipeToEdit ? recipeToEdit.rating : 5.0,
      reviewCount: recipeToEdit ? recipeToEdit.reviewCount : 1,
      tags: tagsArray.length > 0 ? tagsArray : ['HomeMade', 'Fresh'],
      dietary: dietary as any,
      nutrition: {
        calories: Number(calories) || 400,
        protein: Number(protein) || 25,
        carbs: 35,
        fat: 18,
        fiber: 4,
        sugar: 3,
      },
      ingredients: ingredients.map((ing, i) => ({
        ...ing,
        id: ing.id || `ing-${i}`,
      })),
      steps: steps.map((st, i) => ({
        ...st,
        stepNumber: i + 1,
      })),
      author: recipeToEdit
        ? recipeToEdit.author
        : {
            name: profile.name || 'Bikram Manna',
            avatar: profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
            role: 'Home Sommelier',
          },
      isSaved: recipeToEdit ? recipeToEdit.isSaved : false,
      updatedAt: new Date().toISOString(),
      createdAt: recipeToEdit?.createdAt || new Date().toISOString(),
    };

    onSave(recipePayload);
    logActivity({
      type: recipeToEdit ? 'updated_recipe' : 'created_recipe',
      title: recipeToEdit ? 'Updated Recipe' : 'Created New Recipe',
      description: `Saved "${recipePayload.title}" to local recipes.`,
      recipeId: recipePayload.id,
      recipeTitle: recipePayload.title,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-amber-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#9f3d00] to-[#c74e00] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold">
                {recipeToEdit ? 'Edit Recipe' : 'Create New Recipe'}
              </h2>
              <p className="text-xs text-white/80">Publish directly to your local culinary collection.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full bg-black/10 hover:bg-black/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 text-xs sm:text-sm">
          {/* 1. Basic Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#9f3d00] border-b pb-1.5 border-amber-100">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Recipe Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Creamy Tuscan Garlic Butter Chicken"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Cuisine *</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  {CUISINES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white capitalize"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Short Description *</label>
              <textarea
                rows={2}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the flavors, texture, and aroma..."
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Prep Time (min)</label>
                <input
                  type="number"
                  min={1}
                  value={prepTimeMinutes}
                  onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Cook Time (min)</label>
                <input
                  type="number"
                  min={1}
                  value={cookTimeMinutes}
                  onChange={(e) => setCookTimeMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Servings</label>
                <input
                  type="number"
                  min={1}
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-2 py-2 rounded-xl border border-gray-200 bg-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Image Selector */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#9f3d00] border-b pb-1.5 border-amber-100">
              2. Recipe Cover Image
            </h3>
            <div className="flex gap-2 items-center">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            {/* Presets */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1">
              <span className="text-[11px] text-gray-500 font-semibold shrink-0">Presets:</span>
              {PRESET_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Preset"
                  onClick={() => setImageUrl(img)}
                  className={`w-12 h-10 rounded-lg object-cover cursor-pointer border-2 transition-all shrink-0 ${
                    imageUrl === img ? 'border-[#9f3d00] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 3. Dynamic Ingredients */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-amber-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#9f3d00]">
                3. Ingredients ({ingredients.length})
              </h3>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs font-bold text-[#9f3d00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Ingredient Row
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, i) => (
                <div key={ing.id || i} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(i, 'name', e.target.value)}
                    placeholder="Ingredient name (e.g. Minced garlic)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200"
                  />
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(i, 'amount', Number(e.target.value))}
                    className="w-20 px-2 py-2 text-xs rounded-xl border border-gray-200"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => handleUpdateIngredient(i, 'unit', e.target.value)}
                    placeholder="unit (cup, tbsp)"
                    className="w-20 px-2 py-2 text-xs rounded-xl border border-gray-200"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(i)}
                      className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Step-by-Step Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5 border-amber-100">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#9f3d00]">
                4. Cooking Steps ({steps.length})
              </h3>
              <button
                type="button"
                onClick={handleAddStep}
                className="text-xs font-bold text-[#9f3d00] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((st, i) => (
                <div key={st.stepNumber} className="p-3 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gray-700">Step {st.stepNumber}</span>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(i)}
                        className="text-gray-400 hover:text-rose-600 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Step
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={st.instruction}
                    onChange={(e) => handleUpdateStep(i, 'instruction', e.target.value)}
                    placeholder="Describe what to do in this step..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={st.tip || ''}
                      onChange={(e) => handleUpdateStep(i, 'tip', e.target.value)}
                      placeholder="Chef secret / Tip (optional)"
                      className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white"
                    />
                    <input
                      type="number"
                      min={1}
                      value={st.timerMinutes || ''}
                      onChange={(e) => handleUpdateStep(i, 'timerMinutes', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Timer in minutes (optional)"
                      className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Tags & Nutrition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="HighProtein, QuickDinner, Keto"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Approx Calories (kcal)</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>

          {/* Submit Footer */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{recipeToEdit ? 'Save Changes' : 'Publish Recipe'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
