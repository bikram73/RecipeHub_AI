export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category?: 'produce' | 'dairy' | 'meat' | 'pantry' | 'bakery' | 'spices' | 'drinks' | 'other';
  notes?: string;
  checked?: boolean;
}

export interface CookingStep {
  stepNumber: number;
  instruction: string;
  timerMinutes?: number;
  tip?: string;
  image?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number;
  sugar?: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'drinks' | 'baking';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  dietary: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Keto' | 'Low-Carb' | 'High-Protein')[];
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
  steps: CookingStep[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  winePairing?: string;
  isAiGenerated?: boolean;
  isSaved?: boolean;
  featured?: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'produce' | 'dairy' | 'meat' | 'pantry' | 'spices' | 'frozen' | 'bakery';
  quantity?: string;
  expiresInDays?: number;
  inStock: boolean;
}

export interface MealPlanDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  dateStr: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

export interface GroceryItem {
  id: string;
  name: string;
  amount: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Pantry & Grains' | 'Spices & Condiments' | 'Bakery' | 'Other';
  completed: boolean;
  recipeSource?: string;
}

export type ActiveTab = 'explore' | 'generator' | 'pantry' | 'planner' | 'groceries' | 'saved';
