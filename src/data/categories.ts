export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export const POPULAR_CATEGORIES: CategoryItem[] = [
  { id: 'breakfast', name: 'Breakfast', description: 'Morning fuel & brunch favorites', icon: 'bakery_dining', color: 'from-amber-500/20 to-orange-500/20', count: 18 },
  { id: 'lunch', name: 'Lunch', description: 'Quick, nourishing daytime plates', icon: 'lunch_dining', color: 'from-emerald-500/20 to-teal-500/20', count: 24 },
  { id: 'dinner', name: 'Dinner', description: 'Comforting & celebratory entrees', icon: 'dinner_dining', color: 'from-rose-500/20 to-orange-500/20', count: 32 },
  { id: 'dessert', name: 'Desserts', description: 'Sweet indulgences & pastries', icon: 'icecream', color: 'from-pink-500/20 to-purple-500/20', count: 15 },
  { id: 'snack', name: 'Snacks', description: 'Bite-sized appetizers & dips', icon: 'cookie', color: 'from-yellow-500/20 to-amber-500/20', count: 12 },
  { id: 'baking', name: 'Artisan Baking', description: 'Sourdoughs, crusts & tarts', icon: 'cake', color: 'from-amber-600/20 to-amber-700/20', count: 16 },
  { id: 'vegetarian', name: 'Vegetarian', description: 'Plant-forward vibrant recipes', icon: 'spa', color: 'from-green-500/20 to-emerald-500/20', count: 28 },
  { id: 'healthy', name: 'Healthy & Light', description: 'Low-calorie & macro balanced', icon: 'nutrition', color: 'from-teal-500/20 to-cyan-500/20', count: 22 },
  { id: 'quick', name: 'Quick Under 20m', description: 'Speedy weeknight solutions', icon: 'bolt', color: 'from-orange-500/20 to-red-500/20', count: 19 },
  { id: 'indian', name: 'Indian Heritage', description: 'Rich aromatic curries & spices', icon: 'ramen_dining', color: 'from-amber-500/20 to-red-500/20', count: 20 },
  { id: 'italian', name: 'Italian Rustic', description: 'Fresh pasta, risottos & pizza', icon: 'local_pizza', color: 'from-red-500/20 to-green-500/20', count: 18 },
  { id: 'asian', name: 'Asian & Fusion', description: 'Wok tossed stir-fries & noodles', icon: 'public', color: 'from-indigo-500/20 to-purple-500/20', count: 17 },
];

export const CUISINES_LIST = [
  'All Cuisines',
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

export const DIETARY_LIST = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'High-Protein',
  'Keto',
  'Low-Carb',
];
