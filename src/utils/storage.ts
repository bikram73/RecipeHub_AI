import { Recipe, LocalProfile, Collection, ActivityItem, UserPreferences } from '../types';
import { INITIAL_RECIPES } from '../data/mockRecipes';
import { DEMO_CREATORS } from '../data/creators';

const STORAGE_KEYS = {
  PROFILE: 'recipehub_profile',
  RECIPES: 'recipehub_recipes',
  SAVED: 'recipehub_saved',
  COLLECTIONS: 'recipehub_collections',
  FOLLOWING: 'recipehub_following',
  ACTIVITY: 'recipehub_activity',
  PREFERENCES: 'recipehub_preferences',
  HISTORY: 'recipehub_history',
};

// Default initial profile
export const DEFAULT_PROFILE: LocalProfile = {
  id: 'user-local-1',
  name: 'Home Chef',
  username: 'chef',
  bio: 'Home cook & culinary explorer. Passionate about authentic spices, quick weeknight dinners, and AI-powered flavor pairing.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  favoriteCuisines: ['Indian', 'Italian', 'Mediterranean', 'French-Nordic'],
  diet: 'No Preference',
  cookingLevel: 'Intermediate',
  following: ['creator-rahul', 'creator-maya', 'creator-elena'],
  savedRecipes: ['rec-1', 'rec-3', 'rec-5'],
  collections: [
    {
      id: 'col-1',
      name: '🍝 Pasta Favorites',
      description: 'Velvety carbonaras, creamy pestos, and rustic slow-cooked sauces.',
      coverImage: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
      recipeIds: ['rec-1', 'rec-3'],
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: 'col-2',
      name: '🥗 Healthy Weekday Dinners',
      description: 'High-protein, low-prep nutritious meals for busy evenings.',
      coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      recipeIds: ['rec-5'],
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'col-3',
      name: '🌶️ Indian Heritage Curries',
      description: 'Aromatic butter chicken, fragrant biryanis, and rich gravies.',
      coverImage: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      recipeIds: ['rec-3'],
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
  ],
  createdAt: new Date().toISOString(),
};

export function isOnboarded(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem('recipehub_onboarded') === 'true';
}

export function setOnboarded(status: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('recipehub_onboarded', status ? 'true' : 'false');
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  favoriteCuisines: ['Indian', 'Italian', 'Mediterranean'],
  dietaryPreferences: ['High-Protein'],
  cookingLevel: 'Intermediate',
  defaultServings: 4,
  autoSaveHistory: true,
};

// Safe JSON parser
function safeParse<T>(jsonStr: string | null, fallback: T): T {
  if (!jsonStr) return fallback;
  try {
    return JSON.parse(jsonStr) as T;
  } catch (err) {
    console.warn('Storage parsing error for fallback:', err);
    return fallback;
  }
}

// PROFILE
export function getProfile(): LocalProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return safeParse<LocalProfile>(stored, DEFAULT_PROFILE);
}

export function saveProfile(profile: LocalProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

// RECIPES
export function getRecipes(): Recipe[] {
  if (typeof window === 'undefined') return INITIAL_RECIPES;
  const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
  if (!stored) {
    saveRecipes(INITIAL_RECIPES);
    return INITIAL_RECIPES;
  }
  const parsed = safeParse<Recipe[]>(stored, INITIAL_RECIPES);
  return parsed.length > 0 ? parsed : INITIAL_RECIPES;
}

export function saveRecipes(recipes: Recipe[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
}

export const getStoredRecipes = (fallback?: Recipe[]): Recipe[] => {
  if (typeof window === 'undefined') return fallback || INITIAL_RECIPES;
  const stored = localStorage.getItem(STORAGE_KEYS.RECIPES);
  if (!stored) return fallback || INITIAL_RECIPES;
  return safeParse<Recipe[]>(stored, fallback || INITIAL_RECIPES);
};

export const saveStoredRecipes = (recipes: Recipe[]): void => {
  saveRecipes(recipes);
};

// COMMENTS PER RECIPE
export function getComments(): Record<string, any[]> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('recipehub_comments');
  return safeParse<Record<string, any[]>>(stored, {});
}

export function saveComments(commentsMap: Record<string, any[]>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('recipehub_comments', JSON.stringify(commentsMap));
}

// RATINGS PER RECIPE
export function getRatings(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('recipehub_ratings');
  return safeParse<Record<string, number>>(stored, {});
}

export function saveRatings(ratingsMap: Record<string, number>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('recipehub_ratings', JSON.stringify(ratingsMap));
}

// SAVED RECIPES (IDs)
export function getSavedRecipes(): string[] {
  if (typeof window === 'undefined') return DEFAULT_PROFILE.savedRecipes;
  const stored = localStorage.getItem(STORAGE_KEYS.SAVED);
  return safeParse<string[]>(stored, DEFAULT_PROFILE.savedRecipes);
}

export function saveSavedRecipes(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(ids));
  
  // also sync in profile
  const prof = getProfile();
  prof.savedRecipes = ids;
  saveProfile(prof);
}

// COLLECTIONS
export function getCollections(): Collection[] {
  if (typeof window === 'undefined') return DEFAULT_PROFILE.collections;
  const stored = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
  return safeParse<Collection[]>(stored, DEFAULT_PROFILE.collections);
}

export function saveCollections(collections: Collection[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  
  // also sync in profile
  const prof = getProfile();
  prof.collections = collections;
  saveProfile(prof);
}

// FOLLOWING CREATORS
export function getFollowing(): string[] {
  if (typeof window === 'undefined') return DEFAULT_PROFILE.following;
  const stored = localStorage.getItem(STORAGE_KEYS.FOLLOWING);
  return safeParse<string[]>(stored, DEFAULT_PROFILE.following);
}

export function saveFollowing(followingIds: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.FOLLOWING, JSON.stringify(followingIds));
  
  const prof = getProfile();
  prof.following = followingIds;
  saveProfile(prof);
}

// ACTIVITY LOG
export function getActivity(): ActivityItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
  const fallback: ActivityItem[] = [
    {
      id: 'act-1',
      type: 'saved_recipe',
      title: 'Saved Recipe',
      description: 'Added Tuscan Sun-Dried Tomato & Basil Chicken to favorites',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      recipeId: 'rec-1',
      recipeTitle: 'Tuscan Sun-Dried Tomato Chicken',
    },
    {
      id: 'act-2',
      type: 'rated_recipe',
      title: 'Rated Recipe',
      description: 'Gave 5 stars to Artisanal Sourdough Focaccia with Rosemary',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      rating: 5,
      recipeId: 'rec-6',
      recipeTitle: 'Artisanal Sourdough Focaccia',
    },
    {
      id: 'act-3',
      type: 'followed_creator',
      title: 'Followed Creator',
      description: 'Started following Rahul Sen (Heritage Spice Alchemist)',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      creatorName: 'Rahul Sen',
    },
    {
      id: 'act-4',
      type: 'generated_ai',
      title: 'AI Recipe Generated',
      description: 'Invented 15-Min Skillet Caprese Chicken using Culinary AI',
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      recipeTitle: '15-Min Skillet Caprese Chicken',
    },
  ];
  return safeParse<ActivityItem[]>(stored, fallback);
}

export function logActivity(item: Omit<ActivityItem, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  const list = getActivity();
  const newItem: ActivityItem = {
    ...item,
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
  };
  const updated = [newItem, ...list.slice(0, 49)]; // keep latest 50
  localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updated));
}

// PREFERENCES
export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return safeParse<UserPreferences>(stored, DEFAULT_PREFERENCES);
}

export function savePreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
}

// VIEW HISTORY (Recipe IDs)
export function getHistory(): string[] {
  if (typeof window === 'undefined') return ['rec-1', 'rec-2', 'rec-3'];
  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return safeParse<string[]>(stored, ['rec-1', 'rec-2', 'rec-3']);
}

export function recordViewHistory(recipeId: string): void {
  if (typeof window === 'undefined') return;
  const history = getHistory().filter(id => id !== recipeId);
  const updated = [recipeId, ...history.slice(0, 19)]; // top 20
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
}

// EXPORT ALL DATA
export function exportAllData(): string {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    profile: getProfile(),
    recipes: getRecipes(),
    savedRecipes: getSavedRecipes(),
    collections: getCollections(),
    following: getFollowing(),
    activity: getActivity(),
    preferences: getPreferences(),
    history: getHistory(),
  };
  return JSON.stringify(data, null, 2);
}

// CLEAR ALL LOCAL DATA
export function clearAllLocalData(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// RESET TO DEMO DATA
export function resetDemoData(): void {
  if (typeof window === 'undefined') return;
  clearAllLocalData();
  saveProfile(DEFAULT_PROFILE);
  saveRecipes(INITIAL_RECIPES);
  saveSavedRecipes(DEFAULT_PROFILE.savedRecipes);
  saveCollections(DEFAULT_PROFILE.collections);
  saveFollowing(DEFAULT_PROFILE.following);
  savePreferences(DEFAULT_PREFERENCES);
}
