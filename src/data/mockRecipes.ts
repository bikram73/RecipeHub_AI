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
      name: 'Chef Alessandro Rossi',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
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
        instruction: 'Pour in heavy cream and chicken broth (optional 2 tbsp). Bring to a gentle simmer for 3 minutes, then stir in grated parmesan until velvety smooth.',
        timerMinutes: 3
      },
      {
        stepNumber: 5,
        instruction: 'Add fresh baby spinach and stir until wilted (about 2 minutes). Return the chicken and juices back into the skillet.',
        timerMinutes: 2
      },
      {
        stepNumber: 6,
        instruction: 'Spoon the warm creamy sauce over the chicken, garnish with fresh basil chiffonade, and serve immediately with crusty bread or over pasta.',
        tip: 'Pairs magnificently with roasted asparagus or cauliflower mash for low-carb diets.'
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
      name: 'Chef Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Brunch Specialist, SF',
    },
    winePairing: 'Mimosa with fresh blood orange or sparkling Prosecco',
    ingredients: [
      { id: 'i10', name: 'Thick sourdough bread slices', amount: 2, unit: 'slices', category: 'bakery' },
      { id: 'i11', name: 'Ripe Hass avocados', amount: 2, unit: 'whole', category: 'produce' },
      { id: 'i12', name: 'Fresh organic pasture-raised eggs', amount: 2, unit: 'large', category: 'dairy' },
      { id: 'i13', name: 'Meyer lemon (juiced & zested)', amount: 1, unit: 'whole', category: 'produce' },
      { id: 'i14', name: 'Extra virgin olive oil', amount: 1, unit: 'tbsp', category: 'pantry' },
      { id: 'i15', name: 'Chili crisp oil / red pepper flakes', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: 'i16', name: 'Maldon flaky sea salt', amount: 0.5, unit: 'tsp', category: 'spices' },
      { id: 'i17', name: 'Microgreens or fresh cilantro', amount: 0.25, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cut avocados in half, remove pit, and scoop into a bowl. Coarsely mash with fork, adding lemon juice, olive oil, salt, and black pepper.',
        tip: 'Keep it slightly chunky for the best mouthfeel texture.'
      },
      {
        stepNumber: 2,
        instruction: 'Bring a shallow pot of water with 1 tbsp white vinegar to a gentle simmer. Create a vortex with a spoon and crack eggs one by one into center.',
        timerMinutes: 3,
        tip: 'Poach for exactly 3 minutes for warm runny yolks and set whites.'
      },
      {
        stepNumber: 3,
        instruction: 'Toast sourdough slices in pan or toaster with a brush of olive oil until deep golden and crunchy.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        instruction: 'Spread thick layers of avocado mash over hot toast. Crown with poached egg, chili crisp drizzle, lemon zest, and microgreens.',
      }
    ]
  },
  {
    id: 'rec-3',
    title: 'Authentic Tokyo Shoyu Ramen with Chashu',
    subtitle: 'Rich dashi-chicken broth, soft ramen noodles & jammy marinated egg',
    description: 'A comforting, deeply aromatic Japanese bowl featuring 12-hour simmered chicken-dashi shoyu broth, tender braised pork chashu slices, menma, and a seasoned ajitsuke tamago egg.',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Japanese',
    category: 'dinner',
    difficulty: 'Medium',
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    servings: 2,
    rating: 5.0,
    reviewCount: 512,
    tags: ['Comfort Food', 'Chef Specialty', 'Iconic Asian', 'High Protein'],
    dietary: ['High-Protein'],
    nutrition: {
      calories: 620,
      protein: 38,
      carbs: 68,
      fat: 22,
      fiber: 4,
      sugar: 6,
    },
    author: {
      name: 'Chef Kenji Takahashi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Ramen Master, Tokyo',
    },
    winePairing: 'Dry Junmai Sake or Japanese Asahi Draft Beer',
    ingredients: [
      { id: 'i18', name: 'Fresh ramen noodles', amount: 300, unit: 'g', category: 'pantry' },
      { id: 'i19', name: 'Rich chicken bone broth', amount: 4, unit: 'cups', category: 'pantry' },
      { id: 'i20', name: 'Japanese soy sauce (Shoyu)', amount: 4, unit: 'tbsp', category: 'pantry' },
      { id: 'i21', name: 'Mirin & sake blend', amount: 2, unit: 'tbsp', category: 'pantry' },
      { id: 'i22', name: 'Braised pork belly (Chashu)', amount: 6, unit: 'slices', category: 'meat' },
      { id: 'i23', name: 'Marinated soft-boiled eggs (Ajitama)', amount: 2, unit: 'halved', category: 'dairy' },
      { id: 'i24', name: 'Scallions & nori sheets', amount: 2, unit: 'stalks', category: 'produce' },
      { id: 'i25', name: 'Toasted sesame oil & garlic oil', amount: 1, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Combine chicken broth, shoyu, mirin, sake, crushed ginger, and garlic in a saucepot. Bring to low simmer for 20 minutes to meld flavors.',
        timerMinutes: 20
      },
      {
        stepNumber: 2,
        instruction: 'Cook fresh ramen noodles in boiling unsalted water for 90 seconds (firm bite / al dente). Drain thoroughly.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'Warm serving bowls with hot water, discard water, then ladle piping hot tare-infused broth into each bowl.',
      },
      {
        stepNumber: 4,
        instruction: 'Fold noodles gently into broth. Arrange chashu pork slices, ramen egg halves, menma, chopped scallions, and nori sheet. Drizzle with roasted garlic oil.'
      }
    ]
  },
  {
    id: 'rec-4',
    title: 'Zesty Baja Crispy Fish Tacos with Lime Crema',
    subtitle: 'Beer-battered cod, chipotle slaw, avocado & pickled red onions',
    description: 'Crispy golden fried Pacific cod tucked inside warm corn tortillas, layered with crunchy cabbage slaw, cilantro lime crema, and fresh mango salsa.',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mexican',
    category: 'lunch',
    difficulty: 'Medium',
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    servings: 4,
    rating: 4.9,
    reviewCount: 284,
    tags: ['Street Food', 'Summer Vibe', 'Quick & Easy'],
    dietary: ['Dairy-Free'],
    nutrition: {
      calories: 440,
      protein: 28,
      carbs: 45,
      fat: 16,
      fiber: 5,
      sugar: 5,
    },
    author: {
      name: 'Chef Gabriela Ruiz',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Baja Culinary Explorer',
    },
    winePairing: 'Cold Pacifico Cerveza or Crisp Sauvignon Blanc',
    ingredients: [
      { id: 'i26', name: 'Fresh wild cod or halibut fillets', amount: 1, unit: 'lb', category: 'meat' },
      { id: 'i27', name: 'Small corn tortillas', amount: 8, unit: 'tortillas', category: 'bakery' },
      { id: 'i28', name: 'All-purpose flour & cornstarch', amount: 1, unit: 'cup', category: 'pantry' },
      { id: 'i29', name: 'Cold Mexican lager beer', amount: 0.75, unit: 'cup', category: 'drinks' },
      { id: 'i30', name: 'Shredded purple & green cabbage', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'i31', name: 'Sour cream or Greek yogurt', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i32', name: 'Fresh limes', amount: 3, unit: 'whole', category: 'produce' },
      { id: 'i33', name: 'Chipotle in adobo sauce', amount: 1, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk together flour, cornstarch, cumin, smoked paprika, salt, and cold beer until smooth batter forms.',
        tip: 'Keep batter ice-cold for the crispiest, light-as-air crust.'
      },
      {
        stepNumber: 2,
        instruction: 'Whisk sour cream, lime juice, minced chipotle, and pinch of salt for the Baja crema sauce. Toss half with shredded cabbage.',
      },
      {
        stepNumber: 3,
        instruction: 'Heat frying oil in heavy pot to 375°F. Dip fish strips in batter and fry for 4-5 minutes until deep golden brown and crunchy. Drain on wire rack.',
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: 'Char tortillas on open flame for 30 seconds. Assemble with crunchy slaw, crispy fish, avocado slices, lime crema, and fresh cilantro.',
      }
    ]
  },
  {
    id: 'rec-5',
    title: 'Velvety Moroccan Spiced Chickpea & Sweet Potato Stew',
    subtitle: 'Infused with turmeric, ginger, smoked paprika & coconut milk',
    description: 'A deeply aromatic plant-based stew simmered with tender roasted sweet potatoes, organic chickpeas, spinach, warming Moroccan ras el hanout, and toasted pine nuts over fluffy couscous.',
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Moroccan',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    servings: 4,
    rating: 4.85,
    reviewCount: 167,
    tags: ['100% Plant-Based', 'Gluten-Free', 'High Fiber', 'One-Pot Meal'],
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 58,
      fat: 12,
      fiber: 11,
      sugar: 8,
    },
    author: {
      name: 'Chef Tariq Mansour',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'North African Cuisine Specialist',
    },
    winePairing: 'Medium-bodied Syrah or Fresh Mint Green Tea',
    ingredients: [
      { id: 'i34', name: 'Sweet potatoes, diced into cubes', amount: 2, unit: 'large', category: 'produce' },
      { id: 'i35', name: 'Cooked chickpeas (garbanzo)', amount: 2, unit: 'cans', category: 'pantry' },
      { id: 'i36', name: 'Full-fat coconut milk', amount: 1, unit: 'can', category: 'pantry' },
      { id: 'i37', name: 'Crushed fire-roasted tomatoes', amount: 1, unit: 'can', category: 'pantry' },
      { id: 'i38', name: 'Fresh baby spinach', amount: 3, unit: 'cups', category: 'produce' },
      { id: 'i39', name: 'Ras el hanout spice blend', amount: 1.5, unit: 'tbsp', category: 'spices' },
      { id: 'i40', name: 'Fresh grated ginger & garlic', amount: 2, unit: 'tbsp', category: 'produce' },
      { id: 'i41', name: 'Toasted almonds & fresh cilantro', amount: 0.25, unit: 'cup', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Heat olive oil in Dutch oven over medium heat. Sauté diced yellow onion, garlic, and ginger until soft and fragrant.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Add ras el hanout, ground turmeric, and cinnamon. Toast spices for 45 seconds until intensely aromatic.',
        timerMinutes: 1
      },
      {
        stepNumber: 3,
        instruction: 'Add cubed sweet potatoes, rinsed chickpeas, crushed tomatoes, and coconut milk. Bring to boil, reduce heat and simmer covered for 20 minutes until potatoes are tender.',
        timerMinutes: 20
      },
      {
        stepNumber: 4,
        instruction: 'Stir in fresh baby spinach and squeeze fresh lemon juice. Simmer 2 more minutes until spinach wilts. Serve over couscous with toasted slivered almonds.'
      }
    ]
  },
  {
    id: 'rec-6',
    title: 'Molten Belgian Chocolate Lava Cake with Berry Coulis',
    subtitle: 'Rich 70% dark chocolate with a warm flowing center & vanilla bean gelato',
    description: 'Decadent individual chocolate cakes with delicate crisp edges and an irresistible warm, molten chocolate center. Served alongside tart raspberry coulis.',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'French Patisserie',
    category: 'dessert',
    difficulty: 'Medium',
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    servings: 2,
    rating: 4.95,
    reviewCount: 420,
    tags: ['Dessert Showstopper', 'Date Night', 'Baking Perfection'],
    dietary: ['Vegetarian'],
    nutrition: {
      calories: 450,
      protein: 7,
      carbs: 42,
      fat: 29,
      fiber: 4,
      sugar: 32,
    },
    author: {
      name: 'Pastry Chef Claire Dubois',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Master Chocolatier, Lyon',
    },
    winePairing: 'Vintage Ruby Port or Espresso Martini',
    ingredients: [
      { id: 'i42', name: '70% Bittersweet dark chocolate', amount: 100, unit: 'g', category: 'pantry' },
      { id: 'i43', name: 'Unsalted European butter', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'i44', name: 'Whole eggs + egg yolks', amount: 2, unit: 'each', category: 'dairy' },
      { id: 'i45', name: 'Powdered sugar', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i46', name: 'All-purpose flour', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: 'i47', name: 'Pure vanilla bean paste', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: 'i48', name: 'Fresh raspberries & mint leaves', amount: 0.5, unit: 'cup', category: 'produce' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Preheat oven to 425°F (220°C). Butter two 6-oz ramekins and dust with cocoa powder, tapping out excess.',
      },
      {
        stepNumber: 2,
        instruction: 'Melt dark chocolate and butter together in a heatproof bowl set over simmering water (bain-marie) until glossy and smooth.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        instruction: 'Whisk eggs, yolks, sugar, and vanilla until pale and thickened. Gently fold in melted chocolate and flour until just incorporated.',
      },
      {
        stepNumber: 4,
        instruction: 'Divide batter into ramekins. Bake for exactly 12 minutes until sides are set and center is soft to the touch.',
        timerMinutes: 12,
        tip: 'Do not overbake! The key to the molten center is pulling it out right when the edges are firm.'
      },
      {
        stepNumber: 5,
        instruction: 'Let rest for 1 minute, run a thin butter knife around edge, invert onto plates. Dust with powdered sugar and serve with fresh raspberries.'
      }
    ]
  },
  {
    id: 'rec-7',
    title: 'Matcha Green Tea Chia Seed Power Bowl',
    subtitle: 'Almond milk chia pudding, dragonfruit, coconut flakes & raw honeycomb',
    description: 'A glowing energizing superfood breakfast packed with ceremonial grade Japanese matcha, omega-3 rich chia seeds, kiwi, toasted pumpkin seeds, and wild raw honey.',
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Modern Wellness',
    category: 'breakfast',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    servings: 1,
    rating: 4.75,
    reviewCount: 95,
    tags: ['Superfood', 'No Cook', 'Antioxidant Rich'],
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
    nutrition: {
      calories: 310,
      protein: 11,
      carbs: 38,
      fat: 14,
      fiber: 12,
      sugar: 14,
    },
    author: {
      name: 'Chef Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Holistic Nutritionist',
    },
    ingredients: [
      { id: 'i49', name: 'Black chia seeds', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: 'i50', name: 'Unsweetened almond or oat milk', amount: 1, unit: 'cup', category: 'dairy' },
      { id: 'i51', name: 'Ceremonial Japanese matcha powder', amount: 1, unit: 'tsp', category: 'pantry' },
      { id: 'i52', name: 'Pure maple syrup or raw honey', amount: 1, unit: 'tbsp', category: 'pantry' },
      { id: 'i53', name: 'Fresh kiwi & blueberries', amount: 0.5, unit: 'cup', category: 'produce' },
      { id: 'i54', name: 'Toasted coconut flakes & chia seeds', amount: 2, unit: 'tbsp', category: 'pantry' },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk matcha powder with 2 tbsp warm water until lump-free and frothy.',
      },
      {
        stepNumber: 2,
        instruction: 'Combine matcha, almond milk, maple syrup, and chia seeds in a mason jar. Stir well, rest 5 mins, stir again to prevent settling.',
      },
      {
        stepNumber: 3,
        instruction: 'Refrigerate for at least 2 hours or overnight until thick and pudding-like.',
      },
      {
        stepNumber: 4,
        instruction: 'Pour into serving bowl and garnish with sliced kiwi, blueberries, coconut shavings, and toasted seeds.'
      }
    ]
  },
  {
    id: 'rec-8',
    title: 'Herb-Crusted Rack of Lamb with Mint Chimichurri',
    subtitle: 'Rosemary dijon crust with roasted baby potatoes & blistered vine tomatoes',
    description: 'Showstopper dinner featuring tender pink rack of lamb coated in garlic, rosemary, and panko herbs, roasted to medium-rare perfection and drizzled with tangy mint chimichurri.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mediterranean French',
    category: 'dinner',
    difficulty: 'Hard',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    rating: 4.98,
    reviewCount: 189,
    tags: ['Gourmet', 'Special Occasion', 'High Protein', 'Keto'],
    dietary: ['Keto', 'High-Protein'],
    nutrition: {
      calories: 590,
      protein: 48,
      carbs: 6,
      fat: 42,
      fiber: 2,
      sugar: 1,
    },
    author: {
      name: 'Chef Alessandro Rossi',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      role: 'Michelin Star Mentor',
    },
    winePairing: 'Cabernet Sauvignon or Bold Bordeaux Red',
    ingredients: [
      { id: 'i55', name: 'Frenched rack of lamb (8 bones)', amount: 2, unit: 'racks', category: 'meat' },
      { id: 'i56', name: 'Dijon mustard', amount: 3, unit: 'tbsp', category: 'pantry' },
      { id: 'i57', name: 'Fresh rosemary & thyme, minced', amount: 3, unit: 'tbsp', category: 'produce' },
      { id: 'i58', name: 'Panko breadcrumbs or almond meal', amount: 0.5, unit: 'cup', category: 'pantry' },
      { id: 'i59', name: 'Garlic cloves, crushed', amount: 4, unit: 'cloves', category: 'produce' },
      { id: 'i60', name: 'Fresh mint & flat-leaf parsley', amount: 1, unit: 'cup', category: 'produce' },
      { id: 'i61', name: 'Red wine vinegar & olive oil', amount: 3, unit: 'tbsp', category: 'pantry' },
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
        instruction: 'Roast in oven for 18-22 minutes until internal thermometer reads 130°F (54°C) for ideal medium-rare. Rest for 8 minutes before slicing into cutlets.',
        timerMinutes: 20,
        tip: 'Resting allows the juices to redistribute back into the meat.'
      },
      {
        stepNumber: 5,
        instruction: 'Finely chop mint, parsley, garlic, chili, and whisk with vinegar and olive oil. Spoon chimichurri over sliced lamb chops.'
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
  { id: 'p23', name: 'Butter', category: 'dairy', inStock: true },
  { id: 'p24', name: 'Flour & Sugar', category: 'pantry', inStock: true },
];
