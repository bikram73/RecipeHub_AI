import { Recipe, PantryItem } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Tuscan Sun-Dried Tomato & Basil Chicken',
    subtitle: 'Creamy garlic parmesan sauce with seared chicken breast',
    description: 'Tender pan-seared chicken breasts simmered in a luscious garlic, sun-dried tomato, spinach, and parmesan cream sauce. A restaurant-quality dinner in under 30 minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    rating: 4.9,
    reviewCount: 342,
    tags: ['Quick & Easy', 'High Protein', 'Keto Friendly', 'Weeknight Favorite'],
    dietary: ['Gluten-Free', 'Keto', 'High-Protein'],
    featured: true,
    nutrition: {
      calories: 485,
      protein: 42,
      carbs: 8,
      fat: 31,
      fiber: 2,
      sugar: 4,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef, Florence',
    },
    winePairing: 'Crisp Pinot Grigio or Light Chianti Classico',
    ingredients: [
      { id: 'i1', name: 'Boneless chicken breasts', amount: 4, unit: 'cutlets', category: 'meat' },
      { id: 'i2', name: 'Olive oil', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i3', name: 'Garlic cloves, minced', amount: 4, unit: 'cloves', category: 'produce' },
      { id: 'i4', name: 'Sun-dried tomatoes in oil, sliced', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i5', name: 'Heavy cream', amount: 1, unit: 'cup', category: 'dairy' },
      { id: 'i6', name: 'Fresh baby spinach', amount: 3, unit: 'cups', category: 'produce' },
      { id: 'i7', name: 'Grated Parmesan cheese', amount: 0.75, unit: 'cup', category: 'dairy' },
      { id: 'i8', name: 'Italian seasoning & paprika', amount: 1, unit: 'tsp', category: 'spices' },
      { id: 'i9', name: 'Fresh basil leaves', amount: 0.25, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Season chicken cutlets generously with salt, black pepper, paprika, and Italian herb blend on both sides.',
        tip: 'Pat chicken completely dry with paper towels beforehand for the crispiest golden sear.'
      },
      {
        stepNumber: 2,
        instruction: 'Heat olive oil in a large skillet over medium-high heat. Sear chicken cutlets for 5-6 minutes per side until golden brown and cooked through (165°F/74°C). Transfer to a plate.',
        timerMinutes: 12,
        tip: 'Do not crowd the pan; sear in batches if needed.'
      },
      {
        stepNumber: 3,
        instruction: 'In the same skillet, reduce heat to medium. Add minced garlic and sliced sun-dried tomatoes; sauté for 1 minute until fragrant.',
        timerMinutes: 1
      },
      {
        stepNumber: 4,
        instruction: 'Pour in heavy cream. Bring to a gentle simmer for 3 minutes, then stir in grated parmesan until velvety smooth.',
        timerMinutes: 3
      },
      {
        stepNumber: 5,
        instruction: 'Add fresh baby spinach and stir until wilted (about 2 minutes). Return the chicken and juices back into the skillet.',
        timerMinutes: 2
      },
      {
        stepNumber: 6,
        instruction: 'Spoon warm creamy sauce over chicken, garnish with fresh basil, and serve with crusty bread.',
      }
    ]
  },
  {
    id: 'rec-2',
    title: 'Artisan Sourdough Avocado Tartine with Poached Egg',
    subtitle: 'Meyer lemon zest, heirloom radish, chili crisp, and microgreens',
    description: 'Elevated cafe-style brunch featuring crisp toasted sourdough topped with creamy hass avocado mash, pickled shallots, runny poached farm eggs, and hot honey chili crisp.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Modern Californian',
    category: 'breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: 2,
    rating: 4.8,
    reviewCount: 198,
    tags: ['Brunch Classic', 'Quick & Easy', 'Vegetarian', 'Nutrient Dense'],
    dietary: ['Vegetarian', 'High-Protein'],
    featured: true,
    nutrition: {
      calories: 390,
      protein: 16,
      carbs: 34,
      fat: 22,
      fiber: 9,
      sugar: 3,
    },
    author: {
      id: 'creator-maya',
      name: 'Chef Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Brunch & Plant-Forward Specialist',
    },
    ingredients: [
      { id: 'i10', name: 'Rustic thick-cut sourdough slices', amount: 2, unit: 'slices', category: 'bakery' },
      { id: 'i11', name: 'Ripe Hass avocados', amount: 2, unit: 'whole', category: 'produce' },
      { id: 'i12', name: 'Pasture-raised eggs', amount: 2, unit: 'large', category: 'dairy' },
      { id: 'i13', name: 'Fresh Meyer lemon juice', amount: 1, unit: 'tbsp', category: 'produce' },
      { id: 'i14', name: 'Flaky Maldon sea salt & red chili flakes', amount: 0.5, unit: 'tsp', category: 'spices' },
      { id: 'i15', name: 'Chili crunch crisp with shallots', amount: 1, unit: 'tsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cut avocados in half, remove pits, and scoop flesh into a bowl. Mash roughly with lemon juice, sea salt, and a dash of olive oil.',
      },
      {
        stepNumber: 2,
        instruction: 'Bring a shallow pot of water with 1 tbsp vinegar to a gentle simmer. Swirl water into a vortex and gently drop in cracked eggs. Poach for exactly 3 minutes.',
        timerMinutes: 3,
        tip: 'Very fresh eggs keep their tight white shape in the water without stringing.'
      },
      {
        stepNumber: 3,
        instruction: 'Toast sourdough slices until deeply golden and crunchy. Spread generous layers of avocado mash over both slices.',
      },
      {
        stepNumber: 4,
        instruction: 'Top each tartine with a warm poached egg. Drizzle with chili crunch crisp, microgreens, and flaky sea salt.',
      }
    ]
  },
  {
    id: 'rec-3',
    title: 'Authentic Delhi Murgh Butter Chicken (Chicken Makhani)',
    subtitle: 'Smoky charcoal-infused roasted chicken in a velvety cashew-tomato gravy',
    description: 'An iconic North Indian culinary gem. Char-grilled marinated chicken simmered in a silky, rich gravy of ripe tomatoes, pure butter, aromatic kasuri methi, and whole ground spices.',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    rating: 5.0,
    reviewCount: 512,
    tags: ['Heritage Classic', 'Rich & Comforting', 'Gluten-Free', 'Crowd Pleaser'],
    dietary: ['Gluten-Free', 'High-Protein'],
    featured: true,
    nutrition: {
      calories: 560,
      protein: 38,
      carbs: 14,
      fat: 39,
      fiber: 3,
      sugar: 6,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i16', name: 'Boneless chicken thighs, cubed', amount: 600, unit: 'g', category: 'meat' },
      { id: 'i17', name: 'Greek yogurt', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i18', name: 'Kashmiri red chili powder & garam masala', amount: 2, unit: 'tbsp', category: 'spices' },
      { id: 'i19', name: 'Ginger-garlic paste', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: 'i20', name: 'Pure tomato puree', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i21', name: 'Butter', amount: 4, unit: 'tbsp', category: 'dairy' },
      { id: 'i22', name: 'Heavy cream', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i23', name: 'Kasuri methi (crushed fenugreek leaves)', amount: 1, unit: 'tbsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Marinate chicken with yogurt, ginger-garlic paste, Kashmiri chili, turmeric, and salt for at least 30 minutes.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Sear chicken on high heat in 1 tbsp butter for 8-10 minutes until charred edges appear. Set aside.',
        timerMinutes: 10,
      },
      {
        stepNumber: 3,
        instruction: 'In a saucepot, melt 3 tbsp butter. Add tomato puree, cashews, cardamom, and simmer for 15 minutes until oil separates.',
        timerMinutes: 15
      },
      {
        stepNumber: 4,
        instruction: 'Blend sauce until silky smooth. Return to pot, add chicken pieces, heavy cream, and crushed kasuri methi. Simmer 5 minutes.',
        timerMinutes: 5
      }
    ]
  },
  {
    id: 'rec-4',
    title: 'Crispy Baja Beer-Battered Fish Tacos',
    subtitle: 'Pacific wild cod, chipotle lime crema, and pickled cabbage slaw',
    description: 'Crispy, airy golden beer-battered wild cod tucked inside warm corn tortillas, dressed with tangy chipotle crema, shredded cilantro slaw, and fresh pico de gallo.',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mexican',
    category: 'lunch',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.9,
    reviewCount: 267,
    tags: ['Street Food', 'Seafood', 'Crispy & Tangy', 'Party Favorite'],
    dietary: ['High-Protein'],
    featured: false,
    nutrition: {
      calories: 420,
      protein: 26,
      carbs: 45,
      fat: 16,
      fiber: 5,
      sugar: 3,
    },
    author: {
      id: 'creator-marcus',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Braised & Grill Technologist',
    },
    ingredients: [
      { id: 'i24', name: 'Fresh Pacific cod or halibut fillets', amount: 500, unit: 'g', category: 'meat' },
      { id: 'i25', name: 'Cold Mexican lager beer', amount: 1, unit: 'cup', category: 'drinks' },
      { id: 'i26', name: 'All-purpose flour & cornstarch', amount: 1, unit: 'cup', category: 'pantry' },
      { id: 'i27', name: 'Corn tortillas', amount: 8, unit: 'tortillas', category: 'bakery' },
      { id: 'i28', name: 'Sour cream & chipotle in adobo', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i29', name: 'Purple cabbage & cilantro, shredded', amount: 2, unit: 'cups', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk together flour, cornstarch, baking powder, salt, and cold beer until a smooth batter forms.',
      },
      {
        stepNumber: 2,
        instruction: 'Heat frying oil to 375°F (190°C). Dip seasoned cod strips into batter and gently lay into hot oil. Fry for 4-5 minutes until deep golden and crunchy.',
        timerMinutes: 5,
      },
      {
        stepNumber: 3,
        instruction: 'Warm corn tortillas on dry skillet. Layer with crisp cabbage, hot fried fish, spoonfuls of chipotle crema, and fresh lime juice.',
      }
    ]
  },
  {
    id: 'rec-5',
    title: 'Roasted Sweet Potato & Chickpea Coconut Curry',
    subtitle: 'Creamy golden turmeric broth, coconut milk, and baby spinach',
    description: 'Warm, deeply aromatic plant-based curry packed with caramelised sweet potato cubes, nutty chickpeas, baby spinach, and coconut milk infused with fresh ginger and lemongrass.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Thai-Indian Fusion',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    rating: 4.8,
    reviewCount: 220,
    tags: ['Vegan', 'Gluten-Free', 'High Fiber', 'One-Pot Meal'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 52,
      fat: 14,
      fiber: 11,
      sugar: 8,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    ingredients: [
      { id: 'i30', name: 'Sweet potatoes, cubed', amount: 2, unit: 'medium', category: 'produce' },
      { id: 'i31', name: 'Canned organic chickpeas, rinsed', amount: 1, unit: 'can', category: 'pantry' },
      { id: 'i32', name: 'Full-fat coconut milk', amount: 1, unit: 'can', category: 'pantry' },
      { id: 'i33', name: 'Yellow Thai curry paste', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i34', name: 'Fresh ginger & garlic', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: 'i35', name: 'Fresh baby spinach', amount: 3, unit: 'cups', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sauté curry paste, ginger, and garlic in 1 tbsp coconut oil for 2 minutes until fragrant.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        instruction: 'Add cubed sweet potatoes, drained chickpeas, and pour in coconut milk and 1/2 cup vegetable broth. Bring to a simmer.',
      },
      {
        stepNumber: 3,
        instruction: 'Cover and simmer on medium-low for 15-18 minutes until sweet potatoes are fork-tender.',
        timerMinutes: 18
      },
      {
        stepNumber: 4,
        instruction: 'Stir in fresh baby spinach and lime juice until spinach wilts. Serve over jasmine rice with fresh cilantro.',
      }
    ]
  },
  {
    id: 'rec-6',
    title: 'Artisanal Sourdough Focaccia with Rosemary & Garlic',
    subtitle: 'Extra virgin olive oil dimpled crust with flaky sea salt',
    description: 'Golden-crusted, airy, pillow-soft Italian focaccia with deep finger dimples holding puddles of fragrant rosemary olive oil and sweet roasted whole garlic cloves.',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'baking',
    difficulty: 'Medium',
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    servings: 8,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Artisan Baking', 'Vegan', 'Comfort Food', 'Weekend Project'],
    dietary: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 220,
      protein: 6,
      carbs: 32,
      fat: 8,
      fiber: 2,
      sugar: 1,
    },
    author: {
      id: 'creator-paolo',
      name: 'Paolo Romano',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      role: 'Master Baker & Fermentation Guide',
    },
    ingredients: [
      { id: 'i36', name: 'High-protein bread flour', amount: 500, unit: 'g', category: 'pantry' },
      { id: 'i37', name: 'Warm water (80% hydration)', amount: 400, unit: 'ml', category: 'pantry' },
      { id: 'i38', name: 'Active dry yeast or sourdough starter', amount: 7, unit: 'g', category: 'pantry' },
      { id: 'i39', name: 'Extra virgin Italian olive oil', amount: 0.33, unit: 'cup', category: 'pantry' },
      { id: 'i40', name: 'Fresh rosemary sprigs & flaky salt', amount: 2, unit: 'tbsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Mix flour, water, yeast, and salt into a wet, sticky dough. Perform 4 stretch-and-folds over 2 hours.',
        timerMinutes: 120
      },
      {
        stepNumber: 2,
        instruction: 'Transfer dough to an oiled baking pan. Let proof in warm spot until bubbly and doubled.',
        timerMinutes: 60
      },
      {
        stepNumber: 3,
        instruction: 'Drizzle top with olive oil. Use oiled fingertips to press deep dimples all the way to the pan bottom.',
      },
      {
        stepNumber: 4,
        instruction: 'Bake at 425°F (220°C) for 22-25 minutes until crust is blistered and golden brown.',
        timerMinutes: 25
      }
    ]
  },
  {
    id: 'rec-7',
    title: 'Rich Tokyo Shoyu Ramen with Chashu Pork Belly',
    subtitle: '12-hour aromatic dashi chicken broth, springy noodles, and ajitsuke tamago',
    description: 'Master-level Japanese ramen soup. Crystal-clear shoyu broth layered with chicken and kombu dashi, tender melt-in-your-mouth braised chashu pork, and jammy ramen eggs.',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    category: 'soup',
    difficulty: 'Hard',
    prepTimeMinutes: 40,
    cookTimeMinutes: 120,
    servings: 4,
    rating: 5.0,
    reviewCount: 440,
    tags: ['Masterclass', 'Comfort Food', 'Iconic', 'Rich Umami'],
    dietary: ['High-Protein'],
    featured: true,
    nutrition: {
      calories: 620,
      protein: 34,
      carbs: 68,
      fat: 24,
      fiber: 4,
      sugar: 5,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef & Author',
    },
    ingredients: [
      { id: 'i41', name: 'Fresh ramen noodles', amount: 4, unit: 'portions', category: 'pantry' },
      { id: 'i42', name: 'Rolled pork belly (chashu)', amount: 500, unit: 'g', category: 'meat' },
      { id: 'i43', name: 'Shoyu tare (aged soy, mirin, sake)', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i44', name: 'Chicken & kombu dashi stock', amount: 6, unit: 'cups', category: 'pantry' },
      { id: 'i45', name: 'Marinated ramen eggs (ajitsuke tamago)', amount: 4, unit: 'eggs', category: 'dairy' },
      { id: 'i46', name: 'Nori sheets & scallions', amount: 4, unit: 'sheets', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Braise seasoned pork belly in mirin, sake, soy sauce, and ginger for 90 minutes until meltingly tender.',
        timerMinutes: 90
      },
      {
        stepNumber: 2,
        instruction: 'Warm dashi broth to a rolling simmer. In individual serving bowls, add 2 tbsp of shoyu tare and aroma oil.',
      },
      {
        stepNumber: 3,
        instruction: 'Boil fresh ramen noodles for 90 seconds. Shake water off vigorously and drop into broth bowls.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        instruction: 'Top with sliced chashu pork, halved soft-boiled ramen egg, nori, bamboo shoots, and finely chopped scallions.',
      }
    ]
  },
  {
    id: 'rec-8',
    title: 'Coconut Matcha Chia Seed Power Bowl',
    subtitle: 'Ceremonial Uji matcha, blueberries, hemp seeds, and toasted coconut chips',
    description: 'An energizing, antioxidant-rich breakfast bowl made by steeping chia seeds overnight in coconut milk and pure ceremonial Japanese matcha, topped with fresh berries and maple glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Modern Plant-Based',
    category: 'breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    servings: 2,
    rating: 4.8,
    reviewCount: 165,
    tags: ['Superfood', 'Quick & Easy', 'Zero Cooking', 'Meal Prep'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 310,
      protein: 10,
      carbs: 28,
      fat: 18,
      fiber: 14,
      sugar: 6,
    },
    author: {
      id: 'creator-maya',
      name: 'Chef Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Brunch & Plant-Forward Specialist',
    },
    ingredients: [
      { id: 'i47', name: 'Black chia seeds', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i48', name: 'Unsweetened coconut milk', amount: 1.5, unit: 'cups', category: 'dairy' },
      { id: 'i49', name: 'Ceremonial grade matcha powder', amount: 1.5, unit: 'tsp', category: 'pantry' },
      { id: 'i50', name: 'Pure maple syrup', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i51', name: 'Fresh organic blueberries & kiwi', amount: 1, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk matcha powder with 2 tbsp warm water until frothy and lump-free.',
      },
      {
        stepNumber: 2,
        instruction: 'Stir coconut milk, whisked matcha, maple syrup, and vanilla into chia seeds. Let sit 10 minutes, stir again, then refrigerate for at least 4 hours.',
        timerMinutes: 240
      },
      {
        stepNumber: 3,
        instruction: 'Spoon thick matcha chia pudding into bowls. Garnish with blueberries, kiwi, toasted coconut flakes, and hemp hearts.',
      }
    ]
  },
  {
    id: 'rec-9',
    title: 'Herb-Crusted Frenched Rack of Lamb with Mint Chimichurri',
    subtitle: 'Dijon-rosemary crust, garlic confit, and zesty Argentine chimichurri',
    description: 'Tender, juicy, blushing pink rack of lamb coated in an herb-dijon crust, seared to perfection, and served alongside a piquant fresh mint and parsley chimichurri sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Modern European',
    category: 'dinner',
    difficulty: 'Hard',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    rating: 4.9,
    reviewCount: 289,
    tags: ['Dinner Party', 'Special Occasion', 'High Protein', 'Keto'],
    dietary: ['Keto', 'High-Protein', 'Gluten-Free'],
    featured: true,
    nutrition: {
      calories: 540,
      protein: 44,
      carbs: 4,
      fat: 38,
      fiber: 1,
      sugar: 1,
    },
    author: {
      id: 'creator-marcus',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Braised & Grill Technologist',
    },
    ingredients: [
      { id: 'i55', name: 'Frenched rack of lamb (8 bones)', amount: 2, unit: 'racks', category: 'meat' },
      { id: 'i56', name: 'Dijon mustard', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: 'i57', name: 'Fresh rosemary & thyme, minced', amount: 3, unit: 'tbsp', category: 'produce' },
      { id: 'i58', name: 'Panko breadcrumbs or almond meal', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i59', name: 'Garlic cloves, crushed', amount: 4, unit: 'cloves', category: 'produce' },
      { id: 'i60', name: 'Fresh mint & flat-leaf parsley', amount: 1, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat oven to 400°F (200°C). Season racks of lamb all over with coarse kosher salt and freshly ground black pepper.',
      },
      {
        stepNumber: 2,
        instruction: 'Sear lamb in cast iron skillet with olive oil for 2-3 minutes per side until deeply browned. Remove and let cool slightly.',
        timerMinutes: 6
      },
      {
        stepNumber: 3,
        instruction: 'Brush seared meat with Dijon mustard. Press herb-breadcrumb mixture firmly over top to create an even crust.',
      },
      {
        stepNumber: 4,
        instruction: 'Roast in oven for 18-22 minutes until internal thermometer reads 130°F (54°C) for ideal medium-rare. Rest for 8 minutes before slicing.',
        timerMinutes: 20
      }
    ]
  },
  {
    id: 'rec-10',
    title: 'Smoky Tandoori Paneer Tikka Masala',
    subtitle: 'Charred paneer cubes in an aromatic spiced onion-tomato gravy',
    description: 'Golden, smoky tandoor-roasted cottage cheese cubes simmered in a luscious masala gravy with bell peppers, toasted cumin, and fenugreek leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 4,
    rating: 4.9,
    reviewCount: 375,
    tags: ['Vegetarian', 'High-Protein', 'North Indian', 'Curry Favorite'],
    dietary: ['Vegetarian', 'Gluten-Free', 'High-Protein'],
    featured: true,
    nutrition: {
      calories: 440,
      protein: 22,
      carbs: 18,
      fat: 32,
      fiber: 4,
      sugar: 5,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i61', name: 'Fresh paneer, cut into 1-inch cubes', amount: 400, unit: 'g', category: 'dairy' },
      { id: 'i62', name: 'Thick hung curd / Greek yogurt', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i63', name: 'Bell peppers & red onions, cubed', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i64', name: 'Garam masala & Kashmiri chili', amount: 2, unit: 'tbsp', category: 'spices' },
      { id: 'i65', name: 'Tomato puree & cream', amount: 1.5, unit: 'cups', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Marinate paneer cubes and bell peppers in spiced yogurt marinade for 20 minutes.',
        timerMinutes: 20
      },
      {
        stepNumber: 2,
        instruction: 'Pan-sear or grill paneer skewers on high heat until charred spots develop on all sides.',
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        instruction: 'Prepare tomato gravy with butter, whole spices, and cream. Gently fold in roasted paneer and simmer for 4 minutes.',
        timerMinutes: 4
      }
    ]
  },
  {
    id: 'rec-11',
    title: 'Royal Hyderabadi Dum Chicken Biryani',
    subtitle: 'Layered saffron basmati rice, tender spiced chicken, and caramelized onions',
    description: 'Fragrant aged long-grain basmati rice layered with marinated chicken, saffron milk, fresh mint, coriander, and crispy brown onions, sealed and slow-cooked in traditional dum style.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'dinner',
    difficulty: 'Hard',
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    servings: 6,
    rating: 5.0,
    reviewCount: 680,
    tags: ['Royal Feast', 'Biryani Special', 'Celebration Meal', 'Authentic'],
    dietary: ['High-Protein', 'Gluten-Free'],
    featured: true,
    nutrition: {
      calories: 610,
      protein: 36,
      carbs: 72,
      fat: 20,
      fiber: 4,
      sugar: 3,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i66', name: 'Aged Long-grain Basmati Rice', amount: 500, unit: 'g', category: 'pantry' },
      { id: 'i67', name: 'Bone-in Chicken pieces', amount: 800, unit: 'g', category: 'meat' },
      { id: 'i68', name: 'Biryani Whole Spices & Saffron', amount: 2, unit: 'tbsp', category: 'spices' },
      { id: 'i69', name: 'Fried onions (Birista)', amount: 1.5, unit: 'cups', category: 'produce' },
      { id: 'i70', name: 'Pure Desi Ghee & Fresh Mint', amount: 4, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Marinate chicken with yogurt, ginger-garlic, mint, coriander, fried onions, and biryani spices for 1 hour.',
        timerMinutes: 60
      },
      {
        stepNumber: 2,
        instruction: 'Boil basmati rice with whole spices until 70% cooked. Drain immediately.',
        timerMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'Layer marinated chicken in a heavy handi, top with parboiled rice, saffron-infused milk, ghee, and fried onions.',
      },
      {
        stepNumber: 4,
        instruction: 'Seal lid with dough and cook on low dum heat for 25 minutes. Rest 10 minutes before serving.',
        timerMinutes: 25
      }
    ]
  },
  {
    id: 'rec-12',
    title: 'Classic Neapolitan Margherita Pizza',
    subtitle: 'San Marzano tomatoes, fresh buffalo mozzarella, and aromatic basil',
    description: 'Hand-stretched wood-fired style pizza crust with sweet San Marzano tomato sauce, milky buffalo mozzarella, a drizzle of extra virgin olive oil, and fresh garden basil.',
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    servings: 3,
    rating: 4.9,
    reviewCount: 410,
    tags: ['Pizza Master', 'Vegetarian', 'Classic Italian', 'Crispy Crust'],
    dietary: ['Vegetarian'],
    featured: true,
    nutrition: {
      calories: 520,
      protein: 20,
      carbs: 64,
      fat: 20,
      fiber: 3,
      sugar: 4,
    },
    author: {
      id: 'creator-paolo',
      name: 'Paolo Romano',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      role: 'Master Baker & Fermentation Guide',
    },
    ingredients: [
      { id: 'i71', name: 'Pizza dough ball (Tipo 00 flour)', amount: 2, unit: 'balls', category: 'bakery' },
      { id: 'i72', name: 'San Marzano canned crushed tomatoes', amount: 1, unit: 'cup', category: 'pantry' },
      { id: 'i73', name: 'Fresh buffalo mozzarella', amount: 250, unit: 'g', category: 'dairy' },
      { id: 'i74', name: 'Fresh sweet basil leaves', amount: 12, unit: 'leaves', category: 'produce' },
      { id: 'i75', name: 'Extra virgin olive oil', amount: 2, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat oven with pizza stone to highest temperature (500°F / 260°C) for 45 minutes.',
        timerMinutes: 45
      },
      {
        stepNumber: 2,
        instruction: 'Gently stretch dough from center outward on floured surface, leaving a raised edge (cornicione).',
      },
      {
        stepNumber: 3,
        instruction: 'Spread tomato sauce, distribute torn mozzarella, and bake on hot stone for 8-10 minutes until blistered.',
        timerMinutes: 9
      },
      {
        stepNumber: 4,
        instruction: 'Top immediately with fresh basil and a drizzle of olive oil before slicing.',
      }
    ]
  },
  {
    id: 'rec-13',
    title: 'Creamy Fettuccine Alfredo with Roasted Garlic',
    subtitle: 'Silky butter, heavy cream, Parmigiano-Reggiano, and fresh parsley',
    description: 'The ultimate comforting Roman classic. Al dente fettuccine pasta ribbons tossed in a rich, velvety emulsion of butter, slow-roasted garlic, heavy cream, and freshly grated Parmigiano-Reggiano.',
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.8,
    reviewCount: 290,
    tags: ['Pasta Classic', 'Vegetarian', 'Comfort Food', '20-Min Meal'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 590,
      protein: 18,
      carbs: 58,
      fat: 32,
      fiber: 3,
      sugar: 3,
    },
    author: {
      id: 'creator-sophia',
      name: 'Sophia Lin',
      avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80',
      role: 'Pastry & Fresh Pasta Prodigy',
    },
    ingredients: [
      { id: 'i76', name: 'Fresh or dry Fettuccine pasta', amount: 400, unit: 'g', category: 'pantry' },
      { id: 'i77', name: 'Unsalted butter', amount: 4, unit: 'tbsp', category: 'dairy' },
      { id: 'i78', name: 'Heavy whipping cream', amount: 1, unit: 'cup', category: 'dairy' },
      { id: 'i79', name: 'Fresh Parmigiano-Reggiano, grated', amount: 1.25, unit: 'cups', category: 'dairy' },
      { id: 'i80', name: 'Roasted garlic & freshly ground nutmeg', amount: 1, unit: 'tsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Boil fettuccine in heavily salted water until al dente. Reserve 1/2 cup starchy pasta water.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Melt butter in a wide skillet over medium heat. Stir in heavy cream and roasted garlic; simmer for 3 minutes.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Remove skillet from heat, whisk in parmesan cheese until silky. Toss pasta through the sauce, adding pasta water as needed.',
      }
    ]
  },
  {
    id: 'rec-14',
    title: 'Street-Style Crispy Mysore Masala Dosa',
    subtitle: 'Fermented rice-lentil crepe, spicy red chutney, and potato bhaji',
    description: 'Paper-thin, golden crispy South Indian crepe smeared with fiery garlic-red chili chutney, stuffed with spiced mustard potato filling, served with coconut chutney and piping hot sambar.',
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'breakfast',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 5.0,
    reviewCount: 490,
    tags: ['South Indian', 'Gluten-Free', 'Vegan', 'Breakfast Favorite'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: true,
    nutrition: {
      calories: 340,
      protein: 8,
      carbs: 56,
      fat: 9,
      fiber: 6,
      sugar: 2,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    ingredients: [
      { id: 'i81', name: 'Fermented Dosa Batter', amount: 3, unit: 'cups', category: 'pantry' },
      { id: 'i82', name: 'Boiled potatoes, mashed', amount: 3, unit: 'medium', category: 'produce' },
      { id: 'i83', name: 'Mysore red chili garlic paste', amount: 3, unit: 'tbsp', category: 'spices' },
      { id: 'i84', name: 'Mustard seeds, curry leaves, turmeric', amount: 1, unit: 'tbsp', category: 'spices' },
      { id: 'i85', name: 'Ghee or coconut oil for roasting', amount: 3, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Temper mustard seeds, curry leaves, onions, and turmeric in oil. Add mashed potatoes and cook for 5 minutes.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Heat a cast iron tawa until hot. Pour a ladle of dosa batter and swirl outward into a thin circle.',
      },
      {
        stepNumber: 3,
        instruction: 'Drizzle ghee around edges, spread spicy red chutney over surface, place potato filling in center, and roast until crispy golden.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: 'Fold and serve immediately with fresh coconut chutney and hot sambar.',
      }
    ]
  },
  {
    id: 'rec-15',
    title: 'Tandoor Garlic Butter Naan with Fresh Cilantro',
    subtitle: 'Blistered, fluffy Indian flatbread brushed with garlic-ghee glaze',
    description: 'Soft, pillowy Indian flatbread cooked on cast-iron to achieve authentic smoky charred blisters, generously brushed with melted garlic butter and chopped fresh cilantro.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'baking',
    difficulty: 'Easy',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    servings: 6,
    rating: 4.9,
    reviewCount: 320,
    tags: ['Bread', 'Vegetarian', 'Curry Side', 'Crowd Pleaser'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 210,
      protein: 6,
      carbs: 34,
      fat: 6,
      fiber: 2,
      sugar: 2,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i86', name: 'All-purpose flour', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i87', name: 'Yogurt & warm milk', amount: 0.75, unit: 'cup', category: 'dairy' },
      { id: 'i88', name: 'Baking powder & yeast', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: 'i89', name: 'Garlic cloves, finely minced', amount: 5, unit: 'cloves', category: 'produce' },
      { id: 'i90', name: 'Butter/Ghee & fresh cilantro', amount: 3, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Knead flour, yogurt, warm milk, sugar, and yeast into a soft dough. Let rest in a warm bowl for 1 hour.',
        timerMinutes: 60
      },
      {
        stepNumber: 2,
        instruction: 'Roll dough into teardrop shapes. Press minced garlic and cilantro firmly onto one side, brush other side with water.',
      },
      {
        stepNumber: 3,
        instruction: 'Place water side down on hot cast iron skillet. When bubbles form, flip pan upside down over flame to char top.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        instruction: 'Brush generously with melted butter and serve piping hot.',
      }
    ]
  },
  {
    id: 'rec-16',
    title: 'Sichuan Wok-Seared Dan Dan Fried Rice',
    subtitle: 'Crispy chili crisp, scallions, sweet soy, and wok-hei smokiness',
    description: 'A 15-minute fiery fried rice loaded with crisp minced meat or mushrooms, bok choy, Sichuan peppercorn chili crisp, toasted sesame seeds, and golden wok aromatics.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Chinese',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 3,
    rating: 4.8,
    reviewCount: 215,
    tags: ['15-Minute Meal', 'Spicy', 'Wok Cooking', 'Pantry Friendly'],
    dietary: ['High-Protein'],
    featured: false,
    nutrition: {
      calories: 430,
      protein: 16,
      carbs: 58,
      fat: 14,
      fiber: 3,
      sugar: 2,
    },
    author: {
      id: 'creator-maya',
      name: 'Chef Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Brunch & Plant-Forward Specialist',
    },
    ingredients: [
      { id: 'i91', name: 'Cold leftover Jasmine rice', amount: 3, unit: 'cups', category: 'pantry' },
      { id: 'i92', name: 'Sichuan chili crisp oil', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i93', name: 'Soy sauce & dark soy sauce', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i94', name: 'Eggs, whisked', amount: 2, unit: 'large', category: 'dairy' },
      { id: 'i95', name: 'Scallions & bok choy, chopped', amount: 2, unit: 'cups', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Heat wok on high until smoking. Add 1 tbsp oil and scramble eggs quickly. Remove eggs.',
        timerMinutes: 1
      },
      {
        stepNumber: 2,
        instruction: 'Add remaining oil, chili crisp, white scallion parts, and cold rice. Toss continuously over high heat for 4 minutes to achieve wok-hei.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        instruction: 'Pour soy sauce around edges of wok, add eggs and bok choy, toss for 1 minute and serve.',
        timerMinutes: 1
      }
    ]
  },
  {
    id: 'rec-17',
    title: 'Decadent Molten Dark Chocolate Lava Cake',
    subtitle: '70% Valrhona cocoa, gooey molten center, and vanilla bean gelato',
    description: 'An irresistible French dessert featuring rich dark chocolate sponge with a warm, liquid molten chocolate center that flows luxuriously with the first fork stroke.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French',
    category: 'dessert',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    servings: 4,
    rating: 5.0,
    reviewCount: 460,
    tags: ['Chocolate Lovers', 'Decadent Dessert', 'Date Night', 'Baking Master'],
    dietary: ['Vegetarian'],
    featured: true,
    nutrition: {
      calories: 460,
      protein: 8,
      carbs: 42,
      fat: 30,
      fiber: 4,
      sugar: 28,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef & Author',
    },
    ingredients: [
      { id: 'i96', name: '70% Dark chocolate, chopped', amount: 150, unit: 'g', category: 'pantry' },
      { id: 'i97', name: 'Unsalted butter', amount: 100, unit: 'g', category: 'dairy' },
      { id: 'i98', name: 'Eggs + egg yolks', amount: 4, unit: 'eggs', category: 'dairy' },
      { id: 'i99', name: 'Granulated sugar', amount: 0.33, unit: 'cup', category: 'pantry' },
      { id: 'i100', name: 'All-purpose flour', amount: 2, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Melt dark chocolate and butter together in a heatproof bowl set over simmering water. Stir until glossy.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Whisk eggs, yolks, sugar, and pinch of salt until pale and frothy. Fold into chocolate mixture, then gently sift in flour.',
      },
      {
        stepNumber: 3,
        instruction: 'Butter ramekins and dust with cocoa powder. Pour batter evenly and bake at 425°F (220°C) for exactly 12 minutes.',
        timerMinutes: 12,
        tip: 'Edges should be firm but center should remain softly jiggly.'
      },
      {
        stepNumber: 4,
        instruction: 'Invert onto plates and serve immediately with vanilla bean gelato or fresh raspberries.',
      }
    ]
  },
  {
    id: 'rec-18',
    title: 'Fluffy Golden Buttermilk Pancakes with Maple Glaze',
    subtitle: 'Vanilla bean whipped butter, pure Vermont maple syrup, and fresh berries',
    description: 'Extra tall, light-as-air golden pancakes with delicate crisp edges, soaked in pure warm maple syrup and topped with whipped honey butter and fresh blackberries.',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    category: 'breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 4,
    rating: 4.9,
    reviewCount: 380,
    tags: ['Weekend Breakfast', 'Kid Friendly', 'Pancake Stack', 'Comfort Food'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 380,
      protein: 10,
      carbs: 58,
      fat: 12,
      fiber: 2,
      sugar: 14,
    },
    author: {
      id: 'creator-maya',
      name: 'Chef Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Brunch & Plant-Forward Specialist',
    },
    ingredients: [
      { id: 'i101', name: 'All-purpose flour', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i102', name: 'Cultured buttermilk', amount: 1.75, unit: 'cups', category: 'dairy' },
      { id: 'i103', name: 'Melted butter & vanilla extract', amount: 3, unit: 'tbsp', category: 'dairy' },
      { id: 'i104', name: 'Eggs', amount: 2, unit: 'large', category: 'dairy' },
      { id: 'i105', name: 'Baking powder & baking soda', amount: 2, unit: 'tsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk dry ingredients in a bowl. Whisk buttermilk, eggs, and melted butter in another bowl. Fold together gently (do not overmix lumps).',
      },
      {
        stepNumber: 2,
        instruction: 'Heat a buttered griddle to medium heat. Pour 1/3 cup batter per pancake.',
      },
      {
        stepNumber: 3,
        instruction: 'Flip when bubbles pop on the surface (about 2-3 minutes). Cook other side for 1-2 minutes until golden.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: 'Stack tall, crown with whipped butter, and pour warm maple syrup over top.',
      }
    ]
  },
  {
    id: 'rec-19',
    title: 'Classic Crisp Caesar Salad with Herb Brioche Croutons',
    subtitle: 'Crisp romaine hearts, creamy anchovy-parmesan dressing, and shaved Pecorino',
    description: 'Chilled crisp romaine lettuce hearts tossed in house-made creamy garlic parmesan dressing, crowned with buttery brioche croutons, cracked pepper, and shaved aged cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American-Italian',
    category: 'salad',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 5,
    servings: 4,
    rating: 4.7,
    reviewCount: 180,
    tags: ['Fresh Salad', 'Appetizer', 'Crispy', 'Classic'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    featured: false,
    nutrition: {
      calories: 280,
      protein: 9,
      carbs: 14,
      fat: 22,
      fiber: 4,
      sugar: 2,
    },
    author: {
      id: 'creator-sophia',
      name: 'Sophia Lin',
      avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80',
      role: 'Pastry & Fresh Pasta Prodigy',
    },
    ingredients: [
      { id: 'i106', name: 'Fresh romaine lettuce hearts, chopped', amount: 2, unit: 'heads', category: 'produce' },
      { id: 'i107', name: 'Parmesan cheese, grated & shaved', amount: 0.75, unit: 'cup', category: 'dairy' },
      { id: 'i108', name: 'Garlic mayo dressing with lemon & Dijon', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i109', name: 'Brioche bread cubes, toasted with olive oil', amount: 1.5, unit: 'cups', category: 'bakery' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Toss brioche cubes in olive oil, garlic powder, and herbs. Toast in oven at 375°F (190°C) for 8 minutes until golden.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'Wash and spin romaine hearts completely dry. Toss in large chilled bowl with creamy Caesar dressing.',
      },
      {
        stepNumber: 3,
        instruction: 'Top with warm crunchy croutons, shaved parmesan flakes, and freshly ground black pepper.',
      }
    ]
  },
  {
    id: 'rec-20',
    title: 'Tropical Alphonso Mango Lassi Smoothie',
    subtitle: 'Sweet Alphonso mango pulp, creamy yogurt, cardamom, and saffron pistachios',
    description: 'Refreshing, creamy Indian yogurt smoothie made with sweet fragrant Alphonso mangoes, fresh Greek yogurt, fragrant green cardamom, and garnished with crushed pistachios.',
    imageUrl: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'drinks',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: 2,
    rating: 5.0,
    reviewCount: 310,
    tags: ['Cooling Drink', 'Vegetarian', 'Quick & Easy', 'Gluten-Free'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    featured: false,
    nutrition: {
      calories: 240,
      protein: 8,
      carbs: 42,
      fat: 5,
      fiber: 3,
      sugar: 36,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    ingredients: [
      { id: 'i110', name: 'Alphonso Mango pulp or fresh ripe mangoes', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i111', name: 'Plain Greek yogurt', amount: 1.5, unit: 'cups', category: 'dairy' },
      { id: 'i112', name: 'Cold milk or almond milk', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i113', name: 'Honey or sugar', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i114', name: 'Cardamom powder & chopped pistachios', amount: 0.5, unit: 'tsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Add mango pulp, cold yogurt, milk, honey, and cardamom powder into a high-speed blender.',
      },
      {
        stepNumber: 2,
        instruction: 'Blend on high speed for 60 seconds until thick, frothy, and completely creamy.',
        timerMinutes: 1
      },
      {
        stepNumber: 3,
        instruction: 'Pour into tall chilled glasses and garnish with slivered pistachios and saffron strands.',
      }
    ]
  },
  {
    id: 'rec-21',
    title: 'Street-Style Desi Masala Macaroni Pasta',
    subtitle: 'Indian spices, sautéed vegetables, tangy tomato sauce, and green chilies',
    description: 'A nostalgic Indian street-food delight. Elbow macaroni tossed with crunchy onions, capsicum, sweet corn, tangy tomato puree, pav bhaji masala, and fresh coriander.',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian Fusion',
    category: 'lunch',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.8,
    reviewCount: 230,
    tags: ['Street Food', 'Quick Snack', 'Vegetarian', 'Kids Favorite'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 360,
      protein: 11,
      carbs: 62,
      fat: 8,
      fiber: 4,
      sugar: 5,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i115', name: 'Elbow Macaroni pasta', amount: 300, unit: 'g', category: 'pantry' },
      { id: 'i116', name: 'Onion, capsicum & sweet corn', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i117', name: 'Tomato puree & tomato ketchup', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i118', name: 'Pav bhaji masala & red chili powder', amount: 1.5, unit: 'tbsp', category: 'spices' },
      { id: 'i119', name: 'Butter & grated cheese', amount: 2, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Boil macaroni in salted water until al dente. Drain and toss with 1 tsp oil.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'Sauté onions, ginger-garlic, capsicum, and corn in 2 tbsp butter until crisp-tender.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        instruction: 'Add tomato puree, spices, and ketchup. Cook for 3 minutes until masala thickens.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: 'Toss in boiled pasta and garnish with fresh coriander and grated cheese.',
      }
    ]
  },
  {
    id: 'rec-22',
    title: 'Delhi Street Chole Bhature with Pickled Onions',
    subtitle: 'Spiced slow-cooked dark chickpeas with fluffy golden puffed bhature',
    description: 'Iconic North Indian street banquet. Piquant, dark, tea-infused chickpea curry spiced with anardana, paired with giant golden deep-fried puffed bread and pickled onions.',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'lunch',
    difficulty: 'Medium',
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    servings: 4,
    rating: 5.0,
    reviewCount: 540,
    tags: ['Street Food Royalty', 'North Indian', 'Weekend Feast', 'Comfort Food'],
    dietary: ['Vegetarian'],
    featured: true,
    nutrition: {
      calories: 590,
      protein: 19,
      carbs: 78,
      fat: 24,
      fiber: 12,
      sugar: 6,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i120', name: 'Kabuli Chana (Chickpeas), soaked', amount: 300, unit: 'g', category: 'pantry' },
      { id: 'i121', name: 'All-purpose flour & semolina (for Bhature)', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i122', name: 'Chole Masala & Anardana (pomegranate powder)', amount: 2, unit: 'tbsp', category: 'spices' },
      { id: 'i123', name: 'Yogurt & baking soda', amount: 0.33, unit: 'cup', category: 'dairy' },
      { id: 'i124', name: 'Ghee, ginger juliennes & green chilies', amount: 2, unit: 'tbsp', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Pressure cook soaked chickpeas with tea bag and whole spices until tender.',
        timerMinutes: 20
      },
      {
        stepNumber: 2,
        instruction: 'Knead flour, yogurt, semolina, and pinch of soda into a smooth dough. Rest for 2 hours.',
        timerMinutes: 120
      },
      {
        stepNumber: 3,
        instruction: 'Simmer chickpeas with onion-tomato masala, anardana, and chole spices. Mash some chickpeas to thicken gravy.',
        timerMinutes: 15
      },
      {
        stepNumber: 4,
        instruction: 'Roll bhature and deep fry in hot oil until puffed like balloons. Serve hot with chole.',
        timerMinutes: 2
      }
    ]
  },
  {
    id: 'rec-23',
    title: 'Dhaba Style Creamy Palak Paneer',
    subtitle: 'Blanched velvety spinach gravy, pan-seared paneer, and garlic tadka',
    description: 'Vibrant green, silky spinach curry infused with garlic, cumin, and garam masala, simmered with golden pan-seared paneer cubes and finished with a swirl of fresh cream.',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.9,
    reviewCount: 390,
    tags: ['Healthy', 'High Iron', 'Vegetarian', 'Gluten-Free'],
    dietary: ['Vegetarian', 'Gluten-Free', 'High-Protein'],
    featured: false,
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 12,
      fat: 28,
      fiber: 6,
      sugar: 3,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    ingredients: [
      { id: 'i125', name: 'Fresh baby spinach leaves', amount: 500, unit: 'g', category: 'produce' },
      { id: 'i126', name: 'Paneer, cut into cubes', amount: 300, unit: 'g', category: 'dairy' },
      { id: 'i127', name: 'Garlic cloves, finely chopped', amount: 6, unit: 'cloves', category: 'produce' },
      { id: 'i128', name: 'Garam masala, cumin & kasuri methi', amount: 1.5, unit: 'tbsp', category: 'spices' },
      { id: 'i129', name: 'Fresh cream & butter', amount: 3, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Blanch spinach in boiling water for 2 minutes, plunge into ice water, and blend into a smooth vibrant green puree.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        instruction: 'Sauté chopped garlic, onions, and spices in butter until aromatic.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Add spinach puree, cream, and paneer cubes. Simmer on low heat for 5 minutes without covering.',
        timerMinutes: 5
      }
    ]
  },
  {
    id: 'rec-24',
    title: 'Royal Shahi Rosewater Gulab Jamun',
    subtitle: 'Golden milk-solid dumplings steeped in cardamom-saffron sugar syrup',
    description: 'Melt-in-your-mouth khoya and chenna dumplings deep-fried to deep golden-brown perfection, soaked in warm fragrant sugar syrup infused with green cardamom, saffron, and pure rosewater.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'dessert',
    difficulty: 'Medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    servings: 6,
    rating: 5.0,
    reviewCount: 470,
    tags: ['Royal Dessert', 'Celebration', 'Festive Sweet', 'Traditional'],
    dietary: ['Vegetarian'],
    featured: true,
    nutrition: {
      calories: 320,
      protein: 6,
      carbs: 54,
      fat: 10,
      fiber: 1,
      sugar: 44,
    },
    author: {
      id: 'creator-rahul',
      name: 'Rahul Sen',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Heritage Spice Alchemist',
    },
    ingredients: [
      { id: 'i130', name: 'Fresh Mawa / Khoya', amount: 250, unit: 'g', category: 'dairy' },
      { id: 'i131', name: 'Fine flour (Maida) & cardamom powder', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: 'i132', name: 'Sugar for syrup', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i133', name: 'Pure Rosewater & Saffron strands', amount: 1, unit: 'tsp', category: 'spices' },
      { id: 'i134', name: 'Ghee or oil for slow deep frying', amount: 2, unit: 'cups', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Boil sugar and water for 6-8 minutes until slightly sticky. Add cardamom, saffron, and rosewater. Keep warm.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'Knead khoya and flour into a soft, crack-free dough. Roll into smooth miniature balls.',
      },
      {
        stepNumber: 3,
        instruction: 'Deep fry balls in medium-low ghee for 8-10 minutes, swirling oil constantly until uniform dark golden brown.',
        timerMinutes: 10
      },
      {
        stepNumber: 4,
        instruction: 'Transfer hot fried jamuns directly into warm sugar syrup. Let soak for at least 1 hour before serving.',
        timerMinutes: 60
      }
    ]
  },
  {
    id: 'rec-25',
    title: 'Fragrant Lucknowi Vegetable Dum Biryani',
    subtitle: 'Saffron basmati rice, seasonal garden vegetables, and rose essence',
    description: 'Awadhi royal vegetarian biryani slow-cooked on dum. Layered with spiced vegetables, caramelized onions, kewra water, saffron milk, and fresh mint leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Indian',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    servings: 4,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Vegetarian Feast', 'Royal Awadhi', 'Dum Cooking', 'Aromatic'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    featured: false,
    nutrition: {
      calories: 470,
      protein: 12,
      carbs: 76,
      fat: 14,
      fiber: 8,
      sugar: 5,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    ingredients: [
      { id: 'i135', name: 'Basmati rice, aged', amount: 400, unit: 'g', category: 'pantry' },
      { id: 'i136', name: 'Cauliflower, carrots, beans, peas', amount: 3, unit: 'cups', category: 'produce' },
      { id: 'i137', name: 'Yogurt, biryani spices, saffron', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i138', name: 'Desi Ghee & Fried Onions', amount: 3, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Marinate vegetables in yogurt, ginger-garlic, mint, and whole biryani spices for 30 minutes.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Cook vegetables in ghee until 70% tender. Parboil basmati rice with whole spices.',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Layer vegetables and rice, drizzle saffron-infused milk and ghee, seal pot, and cook on low heat for 20 minutes.',
        timerMinutes: 20
      }
    ]
  }
];

export const INITIAL_PANTRY_ITEMS: PantryItem[] = [
  { id: 'p1', name: 'Olive oil', category: 'pantry', inStock: true },
  { id: 'p2', name: 'Garlic cloves', category: 'produce', inStock: true },
  { id: 'p3', name: 'Boneless chicken breasts', category: 'meat', inStock: true },
  { id: 'p4', name: 'Heavy cream', category: 'dairy', inStock: true },
  { id: 'p5', name: 'Parmesan cheese', category: 'dairy', inStock: true },
  { id: 'p6', name: 'Fresh baby spinach', category: 'produce', inStock: true },
  { id: 'p7', name: 'Sun-dried tomatoes', category: 'pantry', inStock: true },
  { id: 'p8', name: 'Eggs', category: 'dairy', inStock: true },
  { id: 'p9', name: 'Sourdough bread', category: 'bakery', inStock: true },
  { id: 'p10', name: 'Avocados', category: 'produce', inStock: true },
  { id: 'p11', name: 'Sweet potatoes', category: 'produce', inStock: true },
  { id: 'p12', name: 'Canned chickpeas', category: 'pantry', inStock: true },
  { id: 'p13', name: 'Coconut milk', category: 'pantry', inStock: true },
  { id: 'p14', name: 'Soy sauce', category: 'pantry', inStock: true },
  { id: 'p15', name: 'Ramen noodles', category: 'pantry', inStock: false },
  { id: 'p16', name: 'Dark chocolate 70%', category: 'pantry', inStock: true },
  { id: 'p17', name: 'Fresh cod fillets', category: 'meat', inStock: false },
  { id: 'p18', name: 'Rack of lamb', category: 'meat', inStock: false },
  { id: 'p19', name: 'Chia seeds', category: 'pantry', inStock: true },
  { id: 'p20', name: 'Matcha powder', category: 'pantry', inStock: true },
  { id: 'p21', name: 'Almond milk', category: 'dairy', inStock: true },
  { id: 'p22', name: 'Lemons & Limes', category: 'produce', inStock: true },
  { id: 'p23', name: 'Butter & Ghee', category: 'dairy', inStock: true },
  { id: 'p24', name: 'Basmati Rice & Flour', category: 'pantry', inStock: true },
  { id: 'p25', name: 'Paneer / Cottage Cheese', category: 'dairy', inStock: true },
];
