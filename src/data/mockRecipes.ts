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
  },
  // --- BREAKFAST CATEGORY RECIPES ---
  {
    id: 'rec-26',
    title: 'Fluffy Japanese Soufflé Pancakes',
    subtitle: 'Whip-folded meringue pancakes with matcha butter & organic maple syrup',
    description: 'Cloud-like, ultra-tall Japanese soufflé pancakes that jiggle on the plate. Made with whipped meringue, served with whipped matcha butter, fresh berries, and warm amber maple syrup.',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    category: 'breakfast',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 2,
    rating: 4.9,
    reviewCount: 284,
    tags: ['Fluffy Pancakes', 'Weekend Brunch', 'Japanese Cafe', 'Sweet Breakfast'],
    dietary: ['Vegetarian'],
    featured: true,
    nutrition: {
      calories: 340,
      protein: 12,
      carbs: 42,
      fat: 14,
      fiber: 2,
      sugar: 18,
    },
    author: {
      id: 'creator-kenji',
      name: 'Kenji Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Pastry & Cafe Chef, Tokyo',
    },
    winePairing: 'Sparkling Prosecco or Peach Bellini',
    ingredients: [
      { id: 'i139', name: 'Fresh large egg whites', amount: 3, unit: 'whites', category: 'dairy' },
      { id: 'i140', name: 'Egg yolks', amount: 2, unit: 'yolks', category: 'dairy' },
      { id: 'i141', name: 'Cake flour or all-purpose flour', amount: 35, unit: 'g', category: 'pantry' },
      { id: 'i142', name: 'Whole milk', amount: 2, unit: 'tbsp', category: 'dairy' },
      { id: 'i143', name: 'Fine granulated sugar', amount: 2.5, unit: 'tbsp', category: 'pantry' },
      { id: 'i144', name: 'Ceremonial matcha butter & berries', amount: 2, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk egg yolks, milk, and vanilla until pale. Sift in cake flour and gently mix into a smooth batter.',
      },
      {
        stepNumber: 2,
        instruction: 'Whip egg whites with cream of tartar, gradually adding sugar until glossy, stiff peaks form (meringue).',
        timerMinutes: 5,
        tip: 'Ensure bowl and beaters are completely grease-free for maximum volume.'
      },
      {
        stepNumber: 3,
        instruction: 'Fold 1/3 of the meringue into the yolk batter, then gently fold in the remaining meringue without deflating.',
      },
      {
        stepNumber: 4,
        instruction: 'Heat a non-stick skillet over lowest heat. Scoop tall dollops of batter, add 1 tsp water to pan, cover tightly, and steam-cook for 5-6 minutes per side.',
        timerMinutes: 12,
      },
      {
        stepNumber: 5,
        instruction: 'Stack gently on warm plates, top with matcha whipped butter, fresh raspberries, and maple drizzle.',
      }
    ]
  },
  {
    id: 'rec-27',
    title: 'Sun-Drenched Mediterranean Shakshuka',
    subtitle: 'Simmered tomato, bell pepper & harissa sauce with poached eggs and sheep feta',
    description: 'A vibrant North African & Mediterranean breakfast classic featuring gently poached runny eggs in a spiced cumin-paprika tomato ragù with crumbles of tangy feta and warm pita bread.',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean',
    category: 'breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 3,
    rating: 4.8,
    reviewCount: 312,
    tags: ['Cast Iron', 'High Protein', 'Vegetarian', 'Quick Breakfast', 'One Pan'],
    dietary: ['Vegetarian', 'Gluten-Free', 'High-Protein'],
    featured: false,
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 16,
      fat: 20,
      fiber: 4,
      sugar: 8,
    },
    author: {
      id: 'creator-tariq',
      name: 'Tariq Mansour',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      role: 'Mediterranean Flavor Specialist',
    },
    winePairing: 'Crisp Sauvignon Blanc or Dry Rosé',
    ingredients: [
      { id: 'i145', name: 'Fresh large pasture eggs', amount: 5, unit: 'eggs', category: 'dairy' },
      { id: 'i146', name: 'Crushed San Marzano tomatoes', amount: 1, unit: 'can (400g)', category: 'pantry' },
      { id: 'i147', name: 'Red bell peppers, sliced thin', amount: 2, unit: 'peppers', category: 'produce' },
      { id: 'i148', name: 'Harissa paste & ground cumin', amount: 1.5, unit: 'tbsp', category: 'spices' },
      { id: 'i149', name: 'Crumbled Greek feta cheese', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i150', name: 'Fresh cilantro and mint', amount: 0.25, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sauté sliced onions, bell peppers, and garlic in extra virgin olive oil until softened and slightly caramelized (8 mins).',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'Stir in harissa paste, cumin, smoked paprika, and crushed tomatoes. Simmer gently for 10 minutes until thick and rich.',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: 'Make 5 small wells in the sauce with a spoon. Crack an egg into each well. Cover skillet and cook on low for 5-7 minutes until whites are set and yolks remain runny.',
        timerMinutes: 6
      },
      {
        stepNumber: 4,
        instruction: 'Remove from heat, sprinkle with feta crumbles, fresh mint, and red pepper flakes. Serve immediately with warm crusty bread.',
      }
    ]
  },
  {
    id: 'rec-28',
    title: 'Smoked Salmon Eggs Benedict on Brioche',
    subtitle: 'Cold-smoked Norwegian salmon, poached eggs & velvety lemon hollandaise',
    description: 'An iconic upscale brunch favorite: toasted golden brioche bun topped with velvety avocado puree, delicate Norwegian smoked salmon, soft-poached farm eggs, and warm citrus hollandaise.',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French-Nordic',
    category: 'breakfast',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    servings: 2,
    rating: 4.9,
    reviewCount: 220,
    tags: ['Brunch Luxury', 'Seafood', 'High Protein', 'Egg Benedict'],
    dietary: ['High-Protein'],
    featured: false,
    nutrition: {
      calories: 520,
      protein: 28,
      carbs: 26,
      fat: 36,
      fiber: 3,
      sugar: 4,
    },
    author: {
      id: 'creator-clara',
      name: 'Chef Clara Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Lead Culinary Sommelier',
    },
    winePairing: 'Brut Champagne or Mimosa',
    ingredients: [
      { id: 'i151', name: 'Brioche buns or english muffins', amount: 2, unit: 'halved', category: 'bakery' },
      { id: 'i152', name: 'Norwegian cold-smoked salmon', amount: 150, unit: 'g', category: 'meat' },
      { id: 'i153', name: 'Fresh farm eggs', amount: 4, unit: 'eggs', category: 'dairy' },
      { id: 'i154', name: 'Egg yolks & clarified butter for hollandaise', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i155', name: 'Fresh lemon juice & chopped dill', amount: 2, unit: 'tbsp', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk egg yolks and lemon juice over a double boiler until thickened. Slowly stream in melted warm butter until glossy and emulsified into hollandaise.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Bring a pot of water with 1 tbsp vinegar to a gentle simmer. Create a gentle whirlpool and poach eggs for 3 minutes.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Toast brioche slices with a smear of butter until crisp and golden.',
      },
      {
        stepNumber: 4,
        instruction: 'Layer brioche with smoked salmon ribbons, top with drained poached egg, spoon warm hollandaise generously, and garnish with fresh dill and capers.',
      }
    ]
  },

  // --- LUNCH CATEGORY RECIPES ---
  {
    id: 'rec-29',
    title: 'Mediterranean Quinoa Power Bowl',
    subtitle: 'Crisp za’atar chickpeas, avocado, cucumber ribbons, and lemon tahini drizzle',
    description: 'A nutrient-packed lunch bowl layered with fluffy tri-color quinoa, roasted za’atar chickpeas, Kalamata olives, cherry tomatoes, pickled onions, and creamy whipped garlic tahini dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean',
    category: 'lunch',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 2,
    rating: 4.8,
    reviewCount: 195,
    tags: ['Meal Prep', 'Plant Based', 'Healthy Lunch', 'Gluten-Free', 'High Fiber'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 440,
      protein: 16,
      carbs: 58,
      fat: 18,
      fiber: 12,
      sugar: 5,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    winePairing: 'Iced Green Tea or Lemonade',
    ingredients: [
      { id: 'i156', name: 'Tri-color quinoa, cooked', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i157', name: 'Canned chickpeas roasted with zaatar & olive oil', amount: 1, unit: 'can (400g)', category: 'pantry' },
      { id: 'i158', name: 'Ripe avocado sliced', amount: 1, unit: 'avocado', category: 'produce' },
      { id: 'i159', name: 'Cucumber, cherry tomatoes, Kalamata olives', amount: 1.5, unit: 'cups', category: 'produce' },
      { id: 'i160', name: 'Creamy lemon tahini dressing', amount: 4, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Toss rinsed chickpeas with olive oil, za’atar, smoked paprika, and salt. Roast at 400°F (200°C) for 20 minutes until ultra crispy.',
        timerMinutes: 20
      },
      {
        stepNumber: 2,
        instruction: 'Whisk tahini, lemon juice, garlic paste, salt, and 3 tbsp ice-cold water until light and creamy.',
      },
      {
        stepNumber: 3,
        instruction: 'Assemble bowls: base of fluffy quinoa, topped with crisp chickpeas, avocado fan, diced veggies, olives, and generous tahini drizzle.',
      }
    ]
  },
  {
    id: 'rec-30',
    title: 'Authentic Vietnamese Beef Pho',
    subtitle: '12-hour star anise bone broth, tender flank steak, rice noodles & Thai basil',
    description: 'Comforting, deeply aromatic Vietnamese noodle soup. Delicate rice noodles in a clear, spice-infused beef bone broth topped with thinly sliced rare beef, scallions, cilantro, lime, and bean sprouts.',
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Asian Fusion',
    category: 'lunch',
    difficulty: 'Medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    servings: 4,
    rating: 4.9,
    reviewCount: 340,
    tags: ['Aromatic Broth', 'Vietnamese Classic', 'Soul Food', 'Comfort Soup'],
    dietary: ['Gluten-Free', 'High-Protein', 'Dairy-Free'],
    featured: true,
    nutrition: {
      calories: 460,
      protein: 34,
      carbs: 52,
      fat: 12,
      fiber: 3,
      sugar: 4,
    },
    author: {
      id: 'creator-mai',
      name: 'Mai Nguyen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      role: 'Vietnamese Culinary Heritage',
    },
    winePairing: 'Crisp Dry Riesling or Jasmine Iced Tea',
    ingredients: [
      { id: 'i161', name: 'Rich beef bone broth with star anise & cinnamon', amount: 6, unit: 'cups', category: 'pantry' },
      { id: 'i162', name: 'Flat rice pho noodles', amount: 300, unit: 'g', category: 'pantry' },
      { id: 'i163', name: 'Prime beef tenderloin, paper thin', amount: 300, unit: 'g', category: 'meat' },
      { id: 'i164', name: 'Fresh bean sprouts, Thai basil, jalapeño slices', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i165', name: 'Lime wedges, hoisin sauce, Sriracha', amount: 4, unit: 'servings', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Char onions and ginger over open flame. Simmer with beef broth, toasted star anise, cinnamon stick, and fish sauce for 30 minutes.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Cook flat rice noodles in boiling water for 3 minutes; drain and divide into large soup bowls.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Arrange raw thin beef slices on top of noodles. Ladle boiling hot broth directly over the beef to gently cook it to tender perfection.',
      },
      {
        stepNumber: 4,
        instruction: 'Garnish with Thai basil, scallions, cilantro, fresh chili, and squeeze of lime.',
      }
    ]
  },
  {
    id: 'rec-31',
    title: 'Crispy Baja Fish Tacos with Mango Slaw',
    subtitle: 'Beer-battered cod, chipotle crema, pickled slaw & fresh cilantro',
    description: 'Golden crispy beer-battered wild cod tucked inside warm corn tortillas, dressed with a vibrant jalapeño mango cabbage slaw, velvety chipotle crema, and fresh lime squeeze.',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mexican',
    category: 'lunch',
    difficulty: 'Easy',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    servings: 3,
    rating: 4.9,
    reviewCount: 260,
    tags: ['Street Food', 'Mexican Classic', 'Crispy Fish', 'Quick Lunch'],
    dietary: ['High-Protein'],
    featured: false,
    nutrition: {
      calories: 490,
      protein: 28,
      carbs: 46,
      fat: 22,
      fiber: 5,
      sugar: 6,
    },
    author: {
      id: 'creator-carlos',
      name: 'Chef Carlos Mendez',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      role: 'Baja Coast Street Food Pioneer',
    },
    winePairing: 'Ice-Cold Mexican Lager or Paloma Cocktail',
    ingredients: [
      { id: 'i166', name: 'Fresh wild cod fillets cut into strips', amount: 450, unit: 'g', category: 'meat' },
      { id: 'i167', name: 'Light Mexican beer & flour batter', amount: 1, unit: 'cup', category: 'pantry' },
      { id: 'i168', name: 'Small street taco corn tortillas', amount: 6, unit: 'tortillas', category: 'bakery' },
      { id: 'i169', name: 'Shredded purple cabbage & diced mango', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i170', name: 'Chipotle Greek yogurt crema & cilantro', amount: 4, unit: 'tbsp', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk flour, cornstarch, Mexican spices, and cold beer into a smooth batter.',
      },
      {
        stepNumber: 2,
        instruction: 'Dip cod pieces into batter and fry in 375°F (190°C) oil for 4-5 minutes until golden brown and super crispy.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        instruction: 'Char corn tortillas on an open gas burner for 30 seconds per side.',
        timerMinutes: 1
      },
      {
        stepNumber: 4,
        instruction: 'Assemble tacos with crisp fish, crunchy mango cabbage slaw, drizzle of smoky chipotle crema, and cotija cheese.',
      }
    ]
  },

  // --- DINNER CATEGORY RECIPES ---
  {
    id: 'rec-32',
    title: 'Pan-Seared Prime Ribeye with Herb Butter',
    subtitle: 'Rosemary garlic butter-basted prime steak with truffle potato mash',
    description: 'Steakhouse perfection at home: thick-cut prime ribeye seared in cast iron with foaming brown butter, smashed garlic cloves, and fresh rosemary sprigs, served beside velvety black truffle mashed potatoes.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 2,
    rating: 5.0,
    reviewCount: 420,
    tags: ['Steakhouse', 'Keto', 'High Protein', 'Romantic Dinner', 'Cast Iron'],
    dietary: ['Gluten-Free', 'Keto', 'High-Protein', 'Low-Carb'],
    featured: true,
    nutrition: {
      calories: 680,
      protein: 52,
      carbs: 6,
      fat: 50,
      fiber: 1,
      sugar: 1,
    },
    author: {
      id: 'creator-marcus',
      name: 'Chef Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
      role: 'Master of Woodfire & Steaks',
    },
    winePairing: 'Full-Bodied Napa Cabernet Sauvignon or Malbec',
    ingredients: [
      { id: 'i171', name: 'Prime bone-in or boneless ribeye steak', amount: 2, unit: 'steaks (350g ea)', category: 'meat' },
      { id: 'i172', name: 'High-fat European butter', amount: 4, unit: 'tbsp', category: 'dairy' },
      { id: 'i173', name: 'Fresh rosemary and thyme sprigs', amount: 4, unit: 'sprigs', category: 'produce' },
      { id: 'i174', name: 'Whole garlic cloves smashed', amount: 6, unit: 'cloves', category: 'produce' },
      { id: 'i175', name: 'Flaky Maldon sea salt & cracked black pepper', amount: 1, unit: 'tbsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Bring steaks to room temperature for 30 minutes. Season aggressively on all sides with coarse sea salt and cracked pepper.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Heat a heavy cast iron skillet until smoking hot. Add 1 tbsp avocado oil, sear steak undisturbed for 3 minutes for a deep crust.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Flip steak. Add butter, crushed garlic cloves, rosemary, and thyme. Tilt skillet and continuously baste foaming butter over the steak for 3-4 minutes (medium-rare 130°F).',
        timerMinutes: 4
      },
      {
        stepNumber: 4,
        instruction: 'Rest steak on a warm cutting board for 8 minutes before slicing across the grain. Spoon pan juices over top.',
        timerMinutes: 8
      }
    ]
  },
  {
    id: 'rec-33',
    title: 'Creamy Truffle Wild Mushroom Risotto',
    subtitle: 'Carnaroli rice, sautéed chanterelles, white truffle oil & aged Parmigiano',
    description: 'An Italian culinary masterpiece: slow-stirred creamy Carnaroli rice enriched with sautéed wild chanterelles and porcini mushrooms, finished with sweet butter, 24-month Parmigiano-Reggiano, and white truffle oil.',
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    rating: 4.9,
    reviewCount: 290,
    tags: ['Italian Gourmet', 'Comfort Food', 'Vegetarian', 'Fine Dining'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    featured: false,
    nutrition: {
      calories: 480,
      protein: 14,
      carbs: 64,
      fat: 18,
      fiber: 4,
      sugar: 3,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef, Florence',
    },
    winePairing: 'Piedmont Nebbiolo or Oaked Chardonnay',
    ingredients: [
      { id: 'i176', name: 'Carnaroli or Arborio rice', amount: 350, unit: 'g', category: 'pantry' },
      { id: 'i177', name: 'Mixed wild mushrooms (porcini, chanterelles, cremini)', amount: 400, unit: 'g', category: 'produce' },
      { id: 'i178', name: 'Rich vegetable or chicken stock, warm', amount: 5, unit: 'cups', category: 'pantry' },
      { id: 'i179', name: 'Dry Italian white wine (Pinot Grigio)', amount: 0.5, unit: 'cup', category: 'drinks' },
      { id: 'i180', name: 'Parmigiano-Reggiano & white truffle oil', amount: 0.75, unit: 'cup', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sauté mushrooms in 2 tbsp butter until golden brown and caramelized; set half aside for garnish.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'In a heavy saucepan, toast rice in butter and shallots for 2 minutes. Deglaze with white wine and stir until absorbed.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Add warm broth one ladle at a time, stirring continuously until creamy and al dente (about 18-20 minutes).',
        timerMinutes: 20
      },
      {
        stepNumber: 4,
        instruction: 'Remove from heat (Mantecatura). Vigorously beat in cold butter cubes, grated parmesan, and a drizzle of white truffle oil until velvety.',
      }
    ]
  },
  {
    id: 'rec-34',
    title: 'Thai Green Coconut Curry with Tiger Prawns',
    subtitle: 'Lemongrass, kaffir lime, bamboo shoots, and Thai holy basil',
    description: 'Vibrant, aromatic Thai green curry loaded with jumbo succulent tiger prawns, crisp bamboo shoots, baby eggplant, and sweet bell peppers simmered in fragrant coconut milk with fresh lime juice.',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Thai',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Thai Curry', 'Seafood', 'Quick Dinner', 'Spicy & Sweet', 'Gluten-Free'],
    dietary: ['Gluten-Free', 'Dairy-Free', 'High-Protein'],
    featured: false,
    nutrition: {
      calories: 420,
      protein: 30,
      carbs: 14,
      fat: 28,
      fiber: 4,
      sugar: 5,
    },
    author: {
      id: 'creator-somchai',
      name: 'Somchai Prasert',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      role: 'Bangkok Spice Master',
    },
    winePairing: 'Off-Dry German Riesling or Singha Beer',
    ingredients: [
      { id: 'i181', name: 'Jumbo tiger prawns, peeled and deveined', amount: 500, unit: 'g', category: 'meat' },
      { id: 'i182', name: 'Authentic Thai green curry paste', amount: 3, unit: 'tbsp', category: 'spices' },
      { id: 'i183', name: 'Full-fat coconut cream & milk', amount: 1.5, unit: 'cans', category: 'pantry' },
      { id: 'i184', name: 'Bamboo shoots, baby eggplants, red chili', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i185', name: 'Kaffir lime leaves & Thai holy basil', amount: 0.5, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Heat 3 tbsp coconut cream in a wok until oil separates. Fry green curry paste for 2 minutes until intensely fragrant.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        instruction: 'Pour in remaining coconut milk, fish sauce, and palm sugar. Bring to a gentle boil.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        instruction: 'Add bamboo shoots, eggplants, and kaffir lime leaves. Simmer for 5 minutes, then add tiger prawns and cook for 3 minutes until pink and tender.',
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: 'Stir in holy basil leaves, remove from heat, and serve over steaming jasmine rice.',
      }
    ]
  },

  // --- DESSERT CATEGORY RECIPES ---
  {
    id: 'rec-35',
    title: 'Tahitian Vanilla Bean Crème Brûlée',
    subtitle: 'Silky rich egg custard topped with a shatter-crisp caramelized sugar crust',
    description: 'The pinnacle of French pastry elegance: ultra-smooth custard infused with real Tahitian vanilla bean caviar, baked gently in a water bath, and torched to order with a crunchy glassy sugar lid.',
    imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French-Nordic',
    category: 'dessert',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    servings: 4,
    rating: 5.0,
    reviewCount: 380,
    tags: ['French Classic', 'Caramel Crust', 'Vanilla Custard', 'Dinner Party'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    featured: true,
    nutrition: {
      calories: 360,
      protein: 5,
      carbs: 28,
      fat: 26,
      fiber: 0,
      sugar: 26,
    },
    author: {
      id: 'creator-clara',
      name: 'Chef Clara Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Lead Culinary Sommelier',
    },
    winePairing: 'Sauternes or Espresso',
    ingredients: [
      { id: 'i186', name: 'Heavy whipping cream (36%+ fat)', amount: 2, unit: 'cups', category: 'dairy' },
      { id: 'i187', name: 'Tahitian vanilla bean pod, split and scraped', amount: 1, unit: 'pod', category: 'spices' },
      { id: 'i188', name: 'Large egg yolks', amount: 5, unit: 'yolks', category: 'dairy' },
      { id: 'i189', name: 'Fine caster sugar (for custard & torching)', amount: 0.5, unit: 'cup', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Heat heavy cream with vanilla bean seeds and pod until steaming. Let steep for 15 minutes.',
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Whisk egg yolks and sugar gently without creating excess foam. Slowly temper with warm cream.',
      },
      {
        stepNumber: 3,
        instruction: 'Strain custard through fine mesh and pour into shallow ramekins. Bake in water bath at 300°F (150°C) for 35 minutes until just set with a slight center jiggle.',
        timerMinutes: 35
      },
      {
        stepNumber: 4,
        instruction: 'Chill in refrigerator for at least 3 hours. Before serving, sprinkle an even layer of sugar on top and caramelize with a kitchen torch until deep golden brown.',
      }
    ]
  },
  {
    id: 'rec-36',
    title: 'Molten Belgian Dark Chocolate Lava Cake',
    subtitle: 'Warm flowing bittersweet chocolate center with raspberry coulis',
    description: 'Individual decadent dark chocolate cakes with a crisp exterior and a warm, molten liquid center made with 72% Belgian cacao. Served with vanilla bean gelato and tart raspberry coulis.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French-Nordic',
    category: 'dessert',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    servings: 4,
    rating: 4.9,
    reviewCount: 450,
    tags: ['Chocolate Lover', 'Molten Center', 'Baking', 'Indulgent'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 430,
      protein: 7,
      carbs: 38,
      fat: 28,
      fiber: 4,
      sugar: 28,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef, Florence',
    },
    winePairing: 'Vintage Ruby Port or Double Espresso',
    ingredients: [
      { id: 'i190', name: '70%+ bittersweet Belgian dark chocolate', amount: 200, unit: 'g', category: 'pantry' },
      { id: 'i191', name: 'Unsalted European butter', amount: 100, unit: 'g', category: 'dairy' },
      { id: 'i192', name: 'Large eggs and yolks', amount: 4, unit: 'eggs', category: 'dairy' },
      { id: 'i193', name: 'Powdered sugar & all-purpose flour', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i194', name: 'Fresh raspberries & vanilla ice cream', amount: 1, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Melt dark chocolate and butter together in a heatproof bowl set over simmering water until velvety smooth.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: 'Whisk eggs, egg yolks, and powdered sugar until pale and frothy. Fold into chocolate mixture, then sift in flour.',
      },
      {
        stepNumber: 3,
        instruction: 'Butter and cocoa-powder 4 ramekins. Divide batter and bake at 425°F (220°C) for exactly 11-12 minutes until edges are firm and center is soft.',
        timerMinutes: 12
      },
      {
        stepNumber: 4,
        instruction: 'Invert onto dessert plates, dust with cocoa powder, and serve warm with vanilla ice cream and raspberry coulis.',
      }
    ]
  },
  {
    id: 'rec-37',
    title: 'Authentic Venetian Tiramisù Classico',
    subtitle: 'Espresso-soaked Savoiardi, creamy mascarpone sabayon & cocoa',
    description: 'Traditional Italian tiramisu crafted the classic way: delicate ladyfingers dipped in strong espresso and dark rum, layered with whipped egg yolk mascarpone cream and dusted with Dutch cocoa.',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'dessert',
    difficulty: 'Easy',
    prepTimeMinutes: 25,
    cookTimeMinutes: 0,
    servings: 8,
    rating: 5.0,
    reviewCount: 520,
    tags: ['No Bake', 'Italian Dessert', 'Coffee Flavor', 'Crowd Pleaser'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 380,
      protein: 8,
      carbs: 32,
      fat: 24,
      fiber: 1,
      sugar: 20,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef, Florence',
    },
    winePairing: 'Vin Santo or Sweet Marsala',
    ingredients: [
      { id: 'i195', name: 'Italian Savoiardi ladyfingers', amount: 30, unit: 'cookies', category: 'bakery' },
      { id: 'i196', name: 'Fresh Italian Mascarpone cheese', amount: 500, unit: 'g', category: 'dairy' },
      { id: 'i197', name: 'Fresh brewed strong espresso coffee', amount: 1.5, unit: 'cups', category: 'drinks' },
      { id: 'i198', name: 'Egg yolks & granulated sugar', amount: 4, unit: 'yolks', category: 'dairy' },
      { id: 'i199', name: 'Dutch processed dark cocoa powder', amount: 3, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk egg yolks and sugar over a double boiler for 6 minutes until thick and pale. Let cool slightly, then fold into softened mascarpone.',
        timerMinutes: 6
      },
      {
        stepNumber: 2,
        instruction: 'Quickly dip ladyfingers into cooled espresso (1 second per side) and arrange in an even layer in a baking dish.',
      },
      {
        stepNumber: 3,
        instruction: 'Spread half the mascarpone cream over cookies. Repeat with a second layer of soaked ladyfingers and top with remaining cream.',
      },
      {
        stepNumber: 4,
        instruction: 'Refrigerate for at least 6 hours or overnight. Dust heavily with cocoa powder right before slicing.',
      }
    ]
  },

  // --- SNACKS & BITES CATEGORY RECIPES ---
  {
    id: 'rec-38',
    title: 'Spanish Gambas al Ajillo (Sizzling Garlic Shrimp)',
    subtitle: 'Wild shrimp in sizzling olive oil, sliced garlic, chili flakes & crusty baguette',
    description: 'The legendary Spanish tapas bar staple: succulent shrimp flash-sautéed in smoking extra virgin olive oil with golden garlic slices, red bird’s eye chili, sweet paprika, and dry sherry.',
    imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean',
    category: 'snack',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: 4,
    rating: 4.9,
    reviewCount: 275,
    tags: ['Spanish Tapas', 'Quick Appetizer', 'Garlic Lovers', 'Seafood Bite', 'Keto'],
    dietary: ['Gluten-Free', 'Keto', 'High-Protein', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 260,
      protein: 24,
      carbs: 3,
      fat: 16,
      fiber: 0,
      sugar: 1,
    },
    author: {
      id: 'creator-carlos',
      name: 'Chef Carlos Mendez',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      role: 'Baja Coast Street Food Pioneer',
    },
    winePairing: 'Dry Spanish Albariño or Cava',
    ingredients: [
      { id: 'i200', name: 'Raw peeled wild shrimp', amount: 450, unit: 'g', category: 'meat' },
      { id: 'i201', name: 'Good Spanish extra virgin olive oil', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i202', name: 'Fresh garlic cloves sliced thin', amount: 8, unit: 'cloves', category: 'produce' },
      { id: 'i203', name: 'Dried red chili flakes & smoked paprika', amount: 1, unit: 'tsp', category: 'spices' },
      { id: 'i204', name: 'Dry sherry or white wine & flat parsley', amount: 2, unit: 'tbsp', category: 'drinks' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'In a shallow ceramic cazuela or skillet, gently warm olive oil with sliced garlic and chili flakes until garlic turns golden (do not burn).',
        timerMinutes: 3
      },
      {
        stepNumber: 2,
        instruction: 'Raise heat to medium-high. Add shrimp in a single layer and cook for 90 seconds per side until pink and curled.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Splash in sherry wine and sprinkle smoked paprika and parsley. Serve sizzling hot with crusty sourdough bread for dipping.',
      }
    ]
  },
  {
    id: 'rec-39',
    title: 'Crispy Air-Fried Buffalo Cauliflower Bites',
    subtitle: 'Panko-crusted cauliflower florets tossed in tangy buffalo glaze with blue cheese',
    description: 'Addictively crispy, plant-powered pub snack: bite-sized cauliflower florets coated in spiced panko, air-fried until crunchy, and tossed in spicy melted butter buffalo sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    category: 'snack',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.8,
    reviewCount: 230,
    tags: ['Air Fryer', 'Vegetarian Snack', 'Game Day', 'Spicy'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 190,
      protein: 6,
      carbs: 22,
      fat: 9,
      fiber: 5,
      sugar: 3,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    winePairing: 'Cold Craft IPA or Lime Seltzer',
    ingredients: [
      { id: 'i205', name: 'Fresh cauliflower cut into small florets', amount: 1, unit: 'head (600g)', category: 'produce' },
      { id: 'i206', name: 'Crispy Panko breadcrumbs & garlic powder', amount: 1, unit: 'cup', category: 'pantry' },
      { id: 'i207', name: 'Frank’s RedHot buffalo sauce & melted butter', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i208', name: 'Creamy ranch or blue cheese dip with celery', amount: 0.5, unit: 'cup', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk flour, water, garlic powder, and paprika into a batter. Toss cauliflower florets in batter, then roll in panko breadcrumbs.',
      },
      {
        stepNumber: 2,
        instruction: 'Place in air fryer basket at 390°F (200°C) and cook for 14-16 minutes, shaking halfway, until super crisp.',
        timerMinutes: 15
      },
      {
        stepNumber: 3,
        instruction: 'Toss hot florets in warm buffalo butter sauce and serve immediately with celery sticks and blue cheese dip.',
      }
    ]
  },

  // --- ARTISAN BAKING CATEGORY RECIPES ---
  {
    id: 'rec-40',
    title: 'Rustic Rosemary & Confit Garlic Focaccia',
    subtitle: 'High-hydration olive oil dough with bubbly crust, sea salt & blistered tomatoes',
    description: 'Golden, deeply dimpled Italian focaccia with a crisp olive oil fried crust and pillow-soft interior. Topped with sweet slow-confit garlic cloves, fresh garden rosemary, and flaky sea salt.',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'baking',
    difficulty: 'Medium',
    prepTimeMinutes: 25,
    cookTimeMinutes: 25,
    servings: 8,
    rating: 5.0,
    reviewCount: 390,
    tags: ['Artisan Bread', 'High Hydration', 'Baking', 'Vegan Bread'],
    dietary: ['Vegan', 'Vegetarian', 'Dairy-Free'],
    featured: true,
    nutrition: {
      calories: 240,
      protein: 6,
      carbs: 36,
      fat: 8,
      fiber: 2,
      sugar: 1,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef, Florence',
    },
    winePairing: 'Chianti Classico or Sparkling Water',
    ingredients: [
      { id: 'i209', name: 'High-protein bread flour (Tipo 00)', amount: 500, unit: 'g', category: 'pantry' },
      { id: 'i210', name: 'Warm water & instant active yeast', amount: 420, unit: 'ml', category: 'pantry' },
      { id: 'i211', name: 'Good extra virgin olive oil', amount: 0.33, unit: 'cup', category: 'pantry' },
      { id: 'i212', name: 'Confit whole garlic cloves & fresh rosemary', amount: 0.5, unit: 'cup', category: 'produce' },
      { id: 'i213', name: 'Flaky Maldon sea salt', amount: 1, unit: 'tbsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Mix flour, water, yeast, and salt into a wet dough. Perform 4 sets of coil folds every 30 minutes, then ferment overnight in the fridge.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Transfer dough to an oiled baking pan. Proof at warm room temperature for 3 hours until puffy and full of large bubbles.',
        timerMinutes: 180
      },
      {
        stepNumber: 3,
        instruction: 'Drizzle generously with olive oil. Use fingertips to dimple deep into the dough. Scatter confit garlic, rosemary, and sea salt.',
      },
      {
        stepNumber: 4,
        instruction: 'Bake at 425°F (220°C) for 22-25 minutes until the crust is deeply golden and bottom is crispy.',
        timerMinutes: 24
      }
    ]
  },
  {
    id: 'rec-41',
    title: 'Swedish Cardamom & Cinnamon Brioche Buns (Kardemummabullar)',
    subtitle: 'Twisted enriched dough with freshly crushed green cardamom and pearl sugar',
    description: 'Iconic Scandinavian bakery buns made from an aromatic buttery dough laced with freshly ground green cardamom pods, twisted around a cinnamon-brown sugar butter filling and glazed with vanilla syrup.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French-Nordic',
    category: 'baking',
    difficulty: 'Medium',
    prepTimeMinutes: 40,
    cookTimeMinutes: 15,
    servings: 12,
    rating: 4.9,
    reviewCount: 260,
    tags: ['Fika Classic', 'Swedish Baking', 'Spiced Pastry', 'Cardamom'],
    dietary: ['Vegetarian'],
    featured: false,
    nutrition: {
      calories: 280,
      protein: 5,
      carbs: 38,
      fat: 12,
      fiber: 2,
      sugar: 16,
    },
    author: {
      id: 'creator-clara',
      name: 'Chef Clara Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Lead Culinary Sommelier',
    },
    winePairing: 'Fresh Filter Coffee or Earl Grey Tea',
    ingredients: [
      { id: 'i214', name: 'Bread flour & whole milk', amount: 500, unit: 'g', category: 'pantry' },
      { id: 'i215', name: 'Freshly ground green cardamom seeds', amount: 2, unit: 'tbsp', category: 'spices' },
      { id: 'i216', name: 'Unsalted European butter at room temp', amount: 150, unit: 'g', category: 'dairy' },
      { id: 'i217', name: 'Dark brown sugar & cinnamon for filling', amount: 0.75, unit: 'cup', category: 'pantry' },
      { id: 'i218', name: 'Swedish pearl sugar & simple syrup glaze', amount: 3, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Knead flour, milk, yeast, sugar, cardamom, and soft butter into a smooth, elastic dough (12 mins in mixer). Proof for 1 hour.',
        timerMinutes: 60
      },
      {
        stepNumber: 2,
        instruction: 'Roll dough into a large rectangle. Spread cardamom-cinnamon butter evenly, fold into thirds, slice into strips, and twist into knot shapes.',
      },
      {
        stepNumber: 3,
        instruction: 'Proof buns on baking sheets for 45 minutes until doubled.',
        timerMinutes: 45
      },
      {
        stepNumber: 4,
        instruction: 'Bake at 425°F (220°C) for 10-12 minutes. Brush immediately with vanilla sugar syrup and sprinkle with pearl sugar.',
        timerMinutes: 11
      }
    ]
  },

  // --- SOUPS & STEWS CATEGORY RECIPES ---
  {
    id: 'rec-42',
    title: 'French Onion Soup Gratinée',
    subtitle: 'Slow-caramelized sweet onions, rich beef broth, sourdough crouton & melted Gruyère',
    description: 'The ultimate bistro comfort food: sweet onions caramelized slowly for 45 minutes until jammy and mahogany, simmered with beef bone stock and cognac, crowned with toasted sourdough and bubbling Gruyère cheese.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French-Nordic',
    category: 'soup',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 50,
    servings: 4,
    rating: 4.9,
    reviewCount: 310,
    tags: ['French Bistro', 'Comfort Food', 'Caramelized Onion', 'Cheese Crust'],
    dietary: ['High-Protein'],
    featured: false,
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 26,
      fat: 22,
      fiber: 4,
      sugar: 10,
    },
    author: {
      id: 'creator-clara',
      name: 'Chef Clara Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'Lead Culinary Sommelier',
    },
    winePairing: 'Medium-bodied Red Bordeaux or Dry Sherry',
    ingredients: [
      { id: 'i219', name: 'Yellow sweet onions sliced thin', amount: 5, unit: 'large onions', category: 'produce' },
      { id: 'i220', name: 'Rich beef bone broth & dry white wine', amount: 6, unit: 'cups', category: 'pantry' },
      { id: 'i221', name: 'Butter and fresh thyme sprigs', amount: 3, unit: 'tbsp', category: 'dairy' },
      { id: 'i222', name: 'Thick sourdough baguette slices toasted', amount: 4, unit: 'slices', category: 'bakery' },
      { id: 'i223', name: 'Shredded aged Gruyère & Comté cheese', amount: 2, unit: 'cups', category: 'dairy' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Melt butter in a heavy Dutch oven. Add onions with a pinch of salt and cook over low heat for 45 minutes, stirring occasionally, until deeply caramelized and jammy.',
        timerMinutes: 45
      },
      {
        stepNumber: 2,
        instruction: 'Deglaze pot with white wine and a splash of Cognac. Add beef broth and fresh thyme; simmer gently for 20 minutes.',
        timerMinutes: 20
      },
      {
        stepNumber: 3,
        instruction: 'Ladle soup into oven-safe bowls. Place toasted sourdough slice on top, cover generously with grated Gruyère cheese.',
      },
      {
        stepNumber: 4,
        instruction: 'Broil on high for 3-4 minutes until cheese is bubbling and spotted with golden brown blisters.',
        timerMinutes: 4
      }
    ]
  },
  {
    id: 'rec-43',
    title: 'Velvety Roasted Butternut Squash & Ginger Soup',
    subtitle: 'Caramelized squash, coconut cream, fresh ginger & toasted pepitas',
    description: 'Silky smooth, naturally sweet autumnal soup made from oven-roasted butternut squash, crisp Honeycrisp apples, aromatic ginger, and velvety coconut milk. Garnished with roasted pumpkin seeds and chili oil.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'American',
    category: 'soup',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    rating: 4.8,
    reviewCount: 225,
    tags: ['Autumn Soup', 'Velvety Puree', 'Vegan Comfort', 'Gluten Free'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 220,
      protein: 4,
      carbs: 32,
      fat: 10,
      fiber: 6,
      sugar: 12,
    },
    author: {
      id: 'creator-priya',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'Healthy Home Cook',
    },
    winePairing: 'Chilled Viognier or Hot Spiced Cider',
    ingredients: [
      { id: 'i224', name: 'Butternut squash peeled and cubed', amount: 1, unit: 'large (1kg)', category: 'produce' },
      { id: 'i225', name: 'Fresh ginger root minced & 1 apple', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: 'i226', name: 'Vegetable broth & coconut milk', amount: 4, unit: 'cups', category: 'pantry' },
      { id: 'i227', name: 'Toasted pumpkin seeds & chili oil drizzle', amount: 3, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Toss squash cubes and apple slices in olive oil, nutmeg, and salt. Roast at 400°F (200°C) for 30 minutes until fork-tender and caramelized.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        instruction: 'Sauté ginger and shallots in olive oil for 2 minutes in a soup pot.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'Add roasted squash, apple, and warm vegetable broth. Blend in a high-speed blender until silky and velvety.',
      },
      {
        stepNumber: 4,
        instruction: 'Stir in coconut milk, adjust seasoning, and garnish with toasted pepitas, a swirl of coconut cream, and chili oil.',
      }
    ]
  },

  // --- DRINKS & BEVERAGES CATEGORY RECIPES ---
  {
    id: 'rec-44',
    title: 'Iced Ceremonial Matcha Vanilla Cloud Latte',
    subtitle: 'Uji stone-ground green tea, cold-frothed oat milk & Madagascar vanilla',
    description: 'Vibrant emerald Japanese ceremonial matcha whisked to a frothy perfection with warm water, layered over ice and cold-frothed creamy vanilla oat milk. Refreshing, clean, and antioxidant-rich.',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    category: 'drinks',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: 1,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Matcha Latte', 'Antioxidant', 'Cafe Drink', 'Iced Beverage'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 120,
      protein: 3,
      carbs: 18,
      fat: 4,
      fiber: 2,
      sugar: 8,
    },
    author: {
      id: 'creator-kenji',
      name: 'Kenji Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Pastry & Cafe Chef, Tokyo',
    },
    ingredients: [
      { id: 'i228', name: 'Ceremonial grade Uji matcha powder', amount: 2, unit: 'tsp (3g)', category: 'drinks' },
      { id: 'i229', name: 'Filtered warm water (175°F/80°C)', amount: 60, unit: 'ml', category: 'pantry' },
      { id: 'i230', name: 'Barista blend creamy oat milk', amount: 1, unit: 'cup', category: 'dairy' },
      { id: 'i231', name: 'Pure vanilla bean paste & maple syrup', amount: 1, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sift ceremonial matcha powder through a fine sieve into a chawan bowl to remove clumps.',
      },
      {
        stepNumber: 2,
        instruction: 'Add 60ml warm water (not boiling) and vigorously whisk with a bamboo chasen in a "W" motion until thick microfoam forms.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'Fill a tall glass with clear ice cubes, pour in vanilla-infused oat milk, and gently float the emerald matcha froth on top for beautiful distinct layers.',
      }
    ]
  },
  {
    id: 'rec-45',
    title: 'Sparkling Mango Passionfruit Spritz',
    subtitle: 'Ripe Alphonso mango puree, tart passionfruit pulp, fresh mint & soda',
    description: 'An effervescent tropical refresher: velvety Alphonso mango puree shaken with tart passionfruit seeds, fresh lime juice, and slapped mint leaves, topped with bubbly sparkling mineral water.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'World Cuisines',
    category: 'drinks',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: 2,
    rating: 4.8,
    reviewCount: 180,
    tags: ['Mocktail', 'Tropical Refreshment', 'Summer Drink', 'Fizzy'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 95,
      protein: 1,
      carbs: 23,
      fat: 0,
      fiber: 2,
      sugar: 19,
    },
    author: {
      id: 'creator-mai',
      name: 'Mai Nguyen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      role: 'Vietnamese Culinary Heritage',
    },
    ingredients: [
      { id: 'i232', name: 'Fresh mango puree & passionfruit pulp', amount: 0.75, unit: 'cup', category: 'produce' },
      { id: 'i233', name: 'Fresh lime juice', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: 'i234', name: 'Chilled sparkling mineral water', amount: 2, unit: 'cups', category: 'drinks' },
      { id: 'i235', name: 'Fresh mint sprigs and lime slices for garnish', amount: 4, unit: 'sprigs', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Muddle fresh mint leaves with lime juice in a cocktail shaker to release fragrant essential oils.',
      },
      {
        stepNumber: 2,
        instruction: 'Add mango puree, passionfruit pulp, and ice; shake vigorously for 10 seconds.',
      },
      {
        stepNumber: 3,
        instruction: 'Strain into glasses over crushed ice, top with sparkling mineral water, and garnish with fresh passionfruit seeds and mint.',
      }
    ]
  },

  // --- BOWLS & SALADS CATEGORY RECIPES ---
  {
    id: 'rec-46',
    title: 'Burrata, Grilled Peach & Prosciutto Salad',
    subtitle: 'Creamy Pugliese burrata, caramelized stone peaches, aged balsamic glaze & baby arugula',
    description: 'A celebration of Italian summer: sweet caramelized grilled peaches paired with creamy Pugliese burrata, delicate ribbons of Prosciutto di Parma, wild peppery arugula, and a drizzle of 12-year aged Modena balsamic glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Italian',
    category: 'salad',
    difficulty: 'Easy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: 2,
    rating: 4.9,
    reviewCount: 295,
    tags: ['Summer Salad', 'Italian Burrata', 'Grilled Peaches', 'No Cook Favorite'],
    dietary: ['Gluten-Free', 'High-Protein'],
    featured: true,
    nutrition: {
      calories: 380,
      protein: 20,
      carbs: 18,
      fat: 26,
      fiber: 3,
      sugar: 14,
    },
    author: {
      id: 'creator-elena',
      name: 'Chef Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      role: 'Executive Chef, Florence',
    },
    winePairing: 'Prosecco Superiore or Crisp Pinot Grigio',
    ingredients: [
      { id: 'i236', name: 'Fresh Italian Burrata cheese ball', amount: 1, unit: 'ball (200g)', category: 'dairy' },
      { id: 'i237', name: 'Ripe yellow peaches sliced', amount: 2, unit: 'peaches', category: 'produce' },
      { id: 'i238', name: 'Prosciutto di Parma slices', amount: 6, unit: 'slices', category: 'meat' },
      { id: 'i239', name: 'Baby wild arugula leaves', amount: 3, unit: 'cups', category: 'produce' },
      { id: 'i240', name: 'Aged balsamic glaze & toasted pine nuts', amount: 2, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Brush peach slices lightly with olive oil. Grill on high heat for 2 minutes per side until distinct grill marks form.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Toss wild arugula with extra virgin olive oil, sea salt, and lemon juice; arrange on a serving platter.',
      },
      {
        stepNumber: 3,
        instruction: 'Tear creamy burrata in half and place in center. Arrange grilled peaches and prosciutto ribbons around the cheese.',
      },
      {
        stepNumber: 4,
        instruction: 'Drizzle with aged balsamic reduction, scatter toasted pine nuts, and season with cracked black pepper.',
      }
    ]
  },
  {
    id: 'rec-47',
    title: 'Sesame Seared Ahi Tuna Poke Bowl',
    subtitle: 'Sashimi-grade yellowfin tuna, sushi rice, avocado, edamame & spicy sriracha ponzu',
    description: 'Hawaiian-inspired seafood bowl: fresh sashimi tuna tossed in toasted sesame oil, ginger, and tamari, served over seasoned sushi rice with ripe avocado slices, shelled edamame, seaweed salad, and crunchy furikake.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    category: 'salad',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    servings: 2,
    rating: 4.9,
    reviewCount: 360,
    tags: ['Poke Bowl', 'High Protein', 'Sashimi Grade', 'Healthy Bowl', 'Gluten Free'],
    dietary: ['Gluten-Free', 'High-Protein', 'Dairy-Free'],
    featured: false,
    nutrition: {
      calories: 490,
      protein: 38,
      carbs: 52,
      fat: 14,
      fiber: 6,
      sugar: 4,
    },
    author: {
      id: 'creator-kenji',
      name: 'Kenji Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      role: 'Pastry & Cafe Chef, Tokyo',
    },
    winePairing: 'Dry Junmai Ginjo Sake or Crisp Rosé',
    ingredients: [
      { id: 'i241', name: 'Sashimi-grade yellowfin tuna cubed', amount: 350, unit: 'g', category: 'meat' },
      { id: 'i242', name: 'Cooked short-grain sushi rice with rice vinegar', amount: 2, unit: 'cups', category: 'pantry' },
      { id: 'i243', name: 'Hass avocado, steamed edamame, cucumber', amount: 1.5, unit: 'cups', category: 'produce' },
      { id: 'i244', name: 'Tamari soy, toasted sesame oil, scallions', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: 'i245', name: 'Japanese furikake seasoning & spicy mayo', amount: 2, unit: 'tbsp', category: 'spices' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cut tuna into 1/2-inch cubes. Toss gently with tamari, sesame oil, scallions, and grated ginger; chill for 10 minutes.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Scoop warm seasoned sushi rice into two wide bowls.',
      },
      {
        stepNumber: 3,
        instruction: 'Arrange marinated tuna, sliced avocado, edamame, and cucumber ribbons over rice.',
      },
      {
        stepNumber: 4,
        instruction: 'Sprinkle generously with furikake, toasted sesame seeds, and drizzle with spicy sriracha mayo.',
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
