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

export interface Comment {
  id: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  authorName?: string;
  authorAvatar?: string;
  text: string;
  rating?: number;
  createdAt: string;
  likes?: number;
}

export interface RecipeAuthor {
  id?: string;
  name: string;
  avatar: string;
  role: string;
  bio?: string;
  followers?: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'drinks' | 'baking' | 'salad' | 'soup';
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
  author: RecipeAuthor;
  winePairing?: string;
  chefTips?: string[];
  isAiGenerated?: boolean;
  isSaved?: boolean;
  isDraft?: boolean;
  featured?: boolean;
  views?: number;
  saves?: number;
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  role: string;
  specialty: string;
  badge: string;
  recipesCount: number;
  followersCount: number;
  rating: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  recipeIds: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface LocalProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  favoriteCuisines: string[];
  diet: string;
  cookingLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master Home Chef';
  following: string[]; // creator IDs
  savedRecipes: string[]; // recipe IDs
  collections: Collection[];
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: 
    | 'saved_recipe' 
    | 'created_recipe' 
    | 'updated_recipe' 
    | 'deleted_recipe' 
    | 'rated_recipe' 
    | 'commented' 
    | 'followed_creator' 
    | 'unfollowed_creator' 
    | 'generated_ai' 
    | 'created_collection' 
    | 'completed_cooking'
    | 'cooked_recipe'
    | 'grocery_updated'
    | 'meal_planned';
  title: string;
  description: string;
  timestamp: string;
  recipeId?: string;
  recipeTitle?: string;
  creatorName?: string;
  rating?: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  favoriteCuisines: string[];
  dietaryPreferences: string[];
  cookingLevel: string;
  defaultServings: number;
  autoSaveHistory: boolean;
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

export type ActiveTab = 
  | 'home' 
  | 'explore' 
  | 'generator' 
  | 'ai-kitchen' 
  | 'pantry' 
  | 'planner' 
  | 'groceries' 
  | 'saved' 
  | 'collections'
  | 'create-recipe' 
  | 'my-recipes' 
  | 'following'
  | 'profile'
  | 'activity'
  | 'settings';
