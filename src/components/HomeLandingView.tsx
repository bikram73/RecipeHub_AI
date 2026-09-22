import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types';

export const CHEF_GIRL_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBqFsPqlgKaJLcJMJE0hI4VdayHVGCKYRRtApWeU_lblTpqGORD2CyDIQbyMEb25h_6eDMxwDT9MVTWjit3yrJiTAzopWdAMNAF5QgCw6oj-RiXH4VAKlrWvvqoJ-CgQqy5qQNPAdi5S6m7SoeHhBRl5G1OqpBCs4ksRJcmnaFwIdB4-o3jb37Jn_TxesjE4EBcz-uGo2LAC2koQfSPG0gV_VQGiKu8NGmq5PeDu8jY7vmizIqspmroxg";

interface HomeLandingViewProps {
  onNavigate: (tab: any) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe, e?: React.MouseEvent) => void;
  onToggleSave: (recipeId: string, e?: React.MouseEvent) => void;
  savedRecipeIds?: Set<string>;
  recipes: Recipe[];
  onSearch?: (query: string) => void;
  onOpenCreateRecipe?: () => void;
  onOpenAskAi?: (prompt?: string) => void;
}

export const HomeLandingView: React.FC<HomeLandingViewProps> = ({
  onNavigate,
  onSelectRecipe,
  onStartCooking,
  onToggleSave,
  savedRecipeIds = new Set<string>(),
  recipes,
  onSearch,
  onOpenCreateRecipe,
  onOpenAskAi,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);

  // Interactive AI fridge chips
  const [fridgeChips, setFridgeChips] = useState<string[]>([
    '🍗 Chicken Breast',
    '🍅 Cherry Tomatoes',
    '🌿 Fresh Basil',
    '🧄 Garlic'
  ]);
  const [newChipInput, setNewChipInput] = useState('');
  const [showAddChip, setShowAddChip] = useState(false);

  // Active filter state
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedCookTime, setSelectedCookTime] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState<'cuisine' | 'time' | 'dietary' | null>(null);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let query = searchInput.trim();
    if (selectedCuisine && selectedCuisine !== 'All Cuisines') {
      query = query ? `${query} ${selectedCuisine}` : selectedCuisine;
    }
    if (selectedDietary && selectedDietary !== 'All Diets') {
      query = query ? `${query} ${selectedDietary}` : selectedDietary;
    }
    if (selectedCookTime && selectedCookTime !== 'Any Time') {
      query = query ? `${query} ${selectedCookTime}` : selectedCookTime;
    }
    onSearch?.(query);
    onNavigate('explore');
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchInput(transcript);
          setIsListening(false);
          onSearch?.(transcript);
          onNavigate('explore');
        };
        recognition.onerror = () => {
          setSearchInput("Garlic butter shrimp with lemon pasta");
          setIsListening(false);
          setTimeout(() => {
            onSearch?.("Garlic butter shrimp with lemon pasta");
            onNavigate('explore');
          }, 300);
        };
        recognition.start();
      } catch (err) {
        setTimeout(() => {
          setSearchInput("Garlic butter shrimp with lemon pasta");
          setIsListening(false);
          onSearch?.("Garlic butter shrimp with lemon pasta");
          onNavigate('explore');
        }, 800);
      }
    } else {
      setTimeout(() => {
        setSearchInput("Garlic butter shrimp with lemon pasta");
        setIsListening(false);
        onSearch?.("Garlic butter shrimp with lemon pasta");
        onNavigate('explore');
      }, 800);
    }
  };

  const handleTagClick = (tag: string) => {
    const cleaned = tag.replace('#', '');
    onSearch?.(cleaned);
    onNavigate('explore');
  };

  const handleCategoryClick = (category: string) => {
    onSearch?.(category);
    onNavigate('explore');
  };

  const handleAddFridgeChip = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newChipInput.trim()) {
      setFridgeChips(prev => [...prev, `✨ ${newChipInput.trim()}`]);
      setNewChipInput('');
      setShowAddChip(false);
    }
  };

  const handleRemoveFridgeChip = (indexToRemove: number) => {
    setFridgeChips(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Pre-configured Picked For You dishes matching screenshot
  const pickedDishes = [
    {
      id: 'rec-p1',
      title: 'Pan-Seared Salmon with Lemon Dill Velouté',
      subtitle: 'Crispy skin salmon with a velvety French citrus herb reduction',
      description: 'Pan-seared Norwegian salmon with crisp golden skin bathed in a silky lemon dill velouté sauce, roasted asparagus, and micro herbs.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCnRf7nozkRC2TkhiRS7_VVWxG4c46NeirlyXMARIS1yHlI3z7ELOvniXBrQs_BKxQzk18eR8bHpB5wLMPxNRqznum0mQnIvyuYPOXN3n3N5NPsZTNRUsxi1E_81dquon6zIieTej7WiD-b0MxM6dYhjMl6VrRruAUsfNV0Tpc15BDOJoxIQOSrVS0bi4xskbiTSe03qN9-2ePq37rI73rfJYvUP9CRSVAW4JqNJgExNMOpGbJ8T-p4A',
      cuisine: 'French-Nordic',
      category: 'dinner' as const,
      difficulty: 'Intermediate' as const,
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      servings: 2,
      rating: 4.9,
      reviewCount: 248,
      badge: 'Fresh Basil',
      badgeColor: 'bg-[#00685d] text-white',
      author: { name: 'Chef Elena Rostova', initials: 'ER', avatarBg: 'bg-[#ffdbcd] text-[#360f00]' },
      tags: ['Salmon', 'High Protein', 'Gluten-Free', 'Fine Dining'],
      dietary: ['Gluten-Free' as const, 'High-Protein' as const],
      nutrition: { calories: 440, protein: 38, carbs: 6, fat: 28 },
      ingredients: [
        { id: 'ip1', name: 'Fresh Salmon fillet', amount: 2, unit: 'center cuts', category: 'meat' as const },
        { id: 'ip2', name: 'Fresh dill chopped', amount: 3, unit: 'tbsp', category: 'produce' as const },
        { id: 'ip3', name: 'Heavy cream', amount: 0.5, unit: 'cup', category: 'dairy' as const },
        { id: 'ip4', name: 'Meyer Lemon juice', amount: 2, unit: 'tbsp', category: 'produce' as const },
        { id: 'ip5', name: 'Butter', amount: 2, unit: 'tbsp', category: 'dairy' as const }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Pat salmon fillets dry and score skin lightly with a sharp knife.', tip: 'Dry skin ensures ultra crispiness.' },
        { stepNumber: 2, instruction: 'Sear in hot cast iron with olive oil for 4 minutes skin-side down until crispy.', timerMinutes: 4 },
        { stepNumber: 3, instruction: 'Flip and cook for 2 minutes. Prepare velouté sauce with lemon, butter, cream, and dill.', timerMinutes: 3 }
      ]
    },
    {
      id: 'rec-p2',
      title: 'Smoky Paprika Butter Chicken (Murgh Makhani)',
      subtitle: 'Velvety spiced tomato butter sauce with tender charred chicken',
      description: 'Authentic Delhi style butter chicken slow-simmered in a rich tomato, butter, and cashew gravy infused with smoked paprika and fenugreek.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgcH9X5uE-0bfpOkxACMgf87AIMKveJjfbdM3zI-YU-DL3h2ip04JkaLLxVj-4ESYpTw0T1HjdGBOQOVSjlw9TexUyRuNTaED9rs09p3dhtRysJMwWw-fgGhESyUFG_0e-REMjfKKkWg_DK-NJUuiuc24T4Pd5KO4NyAy3iC8I3oykFryk_8k6FZFkKbnObtgjaJN1MvhBUYobZnjXCfRCK1H1ryiaP7hhFFL4GZFq4DfsHC4rJkIlcQ',
      cuisine: 'Indian Heritage',
      category: 'dinner' as const,
      difficulty: 'Medium' as const,
      prepTimeMinutes: 15,
      cookTimeMinutes: 25,
      servings: 4,
      rating: 5.0,
      reviewCount: 612,
      badge: 'Golden Choice',
      badgeColor: 'bg-[#8e4e14] text-white',
      author: { name: 'Vikram Sen', initials: 'VS', avatarBg: 'bg-[#ffdcc4] text-[#2f1400]' },
      tags: ['Curry', 'Comfort Food', 'High Protein', 'Indian'],
      dietary: ['Gluten-Free' as const, 'High-Protein' as const],
      nutrition: { calories: 520, protein: 44, carbs: 12, fat: 32 },
      ingredients: [
        { id: 'ip6', name: 'Chicken thigh chunks', amount: 600, unit: 'g', category: 'meat' as const },
        { id: 'ip7', name: 'Crushed San Marzano tomatoes', amount: 1.5, unit: 'cups', category: 'pantry' as const },
        { id: 'ip8', name: 'Butter and heavy cream', amount: 0.5, unit: 'cup', category: 'dairy' as const },
        { id: 'ip9', name: 'Garam masala & smoked paprika', amount: 2, unit: 'tsp', category: 'spices' as const }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Marinate chicken in spiced yogurt and sear until charred in a wok.', timerMinutes: 8 },
        { stepNumber: 2, instruction: 'Simmer tomato puree with cashews, butter, and spices until glossy.', timerMinutes: 12 },
        { stepNumber: 3, instruction: 'Combine chicken and gravy, finish with cream and kasuri methi.', timerMinutes: 5 }
      ]
    },
    {
      id: 'rec-p3',
      title: 'Charred Heirloom Tomato & Burrata Tart',
      subtitle: 'Flaky puff pastry with creamy burrata, pesto, and balsamic glaze',
      description: 'Golden flaky puff pastry topped with charred multicolored heirloom tomatoes, luscious torn burrata, aged balsamic drizzle, and fresh basil.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOEXm550HVEsTGQsZEC3TRREZLd6jt0e410p8N7o_c21wIAXrFcOM4Z5nwetCUQTGT_rmdtbfVc8LY5fO0A70_S2a8CZyBOb8ubArVr7QU-T8J99BCaHZ4jxoVrzSJFaoy3ORDf4loJmAsZJxLtsrRKbSLMqxri8JpReseHf8dYJJif0c35ZfAr6zI_3swWY_UCh3ZervpP6Bj6EGrt-pde4MsU9_ts83sC3_ZmtVeKe6UouxanlDvIw',
      cuisine: 'Italian Rustic',
      category: 'lunch' as const,
      difficulty: 'Easy' as const,
      prepTimeMinutes: 10,
      cookTimeMinutes: 20,
      servings: 4,
      rating: 4.8,
      reviewCount: 189,
      badge: 'Summer Fresh',
      badgeColor: 'bg-[#00685d] text-white',
      author: { name: 'Sophia Lin', initials: 'SL', avatarBg: 'bg-[#8cf5e4] text-[#00201c]' },
      tags: ['Baking', 'Vegetarian', 'Appetizer', 'Italian'],
      dietary: ['Vegetarian' as const],
      nutrition: { calories: 360, protein: 12, carbs: 28, fat: 22 },
      ingredients: [
        { id: 'ip10', name: 'All-butter puff pastry sheet', amount: 1, unit: 'sheet', category: 'bakery' as const },
        { id: 'ip11', name: 'Heirloom cherry tomatoes', amount: 2, unit: 'cups', category: 'produce' as const },
        { id: 'ip12', name: 'Fresh Burrata ball', amount: 1, unit: 'ball (200g)', category: 'dairy' as const },
        { id: 'ip13', name: 'Aged balsamic glaze', amount: 2, unit: 'tbsp', category: 'spices' as const }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Score puff pastry border and bake at 400°F until golden.', timerMinutes: 15 },
        { stepNumber: 2, instruction: 'Roast cherry tomatoes with garlic and olive oil.', timerMinutes: 10 },
        { stepNumber: 3, instruction: 'Top pastry with torn burrata, roasted tomatoes, and balsamic reduction.', tip: 'Serve warm.' }
      ]
    },
    {
      id: 'rec-p4',
      title: 'Slow-Braised Golden Honey Garlic Short Ribs',
      subtitle: 'Fall-apart tender beef ribs over creamy parmesan polenta',
      description: 'Prime beef short ribs braised in red wine, garlic, and wild honey until meltingly tender, served over buttery mascarpone polenta.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiSe2FaIY0dj3gFDtnTfv2uYaZWMgmL1c9cjP6i02o8mhtMV2VKlfutunsJVoRfkQFARHkJTR4mwnqt-iDS9s9oiXIlN6ONvibLPmvR_a6PbHc_H1TPwPQV7ugcFGMYBes1eXvL-MKKcKYdkjScbSTREEOgK7KekHQbYtPaSQED_Ouf71EJMi-m29BPzKo74clb3IB6Nht9sywdOp8AXUN1dwWFr9peASr-HdboMSd7FGZiR7PFNP_BQ',
      cuisine: 'Modern Fusion',
      category: 'dinner' as const,
      difficulty: 'Hard' as const,
      prepTimeMinutes: 15,
      cookTimeMinutes: 60,
      servings: 4,
      rating: 4.9,
      reviewCount: 430,
      badge: 'Weekend Master',
      badgeColor: 'bg-[#9f3d00] text-white',
      author: { name: 'Marcus Vance', initials: 'MV', avatarBg: 'bg-[#ffb596] text-[#7c2e00]' },
      tags: ['Beef', 'Slow Cook', 'Comfort', 'Gourmet'],
      dietary: ['Gluten-Free' as const, 'High-Protein' as const],
      nutrition: { calories: 680, protein: 48, carbs: 18, fat: 46 },
      ingredients: [
        { id: 'ip14', name: 'Bone-in beef short ribs', amount: 4, unit: 'thick cut', category: 'meat' as const },
        { id: 'ip15', name: 'Wild honey & dark soy', amount: 3, unit: 'tbsp', category: 'pantry' as const },
        { id: 'ip16', name: 'Garlic whole bulb', amount: 1, unit: 'head', category: 'produce' as const },
        { id: 'ip17', name: 'Beef bone broth', amount: 2, unit: 'cups', category: 'pantry' as const }
      ],
      steps: [
        { stepNumber: 1, instruction: 'Hard sear short ribs on all sides in a dutch oven until deep brown crust forms.', timerMinutes: 10 },
        { stepNumber: 2, instruction: 'Add garlic, aromatics, honey, and stock. Cover and slow braise at 325°F for 2.5 hours.', timerMinutes: 60 },
        { stepNumber: 3, instruction: 'Reduce braising jus into a glossy glaze and spoon over polenta and ribs.', tip: 'Rest meat for 10 mins.' }
      ]
    }
  ];

  // Trending Dishes Data
  const trendingDishes = [
    {
      id: 'rec-t1',
      rank: '🔥 #1 Trending',
      title: 'Crispy Honey Chili Garlic Tofu Bowls',
      tag: 'Vegetarian Delight',
      tagColor: 'text-[#00685d]',
      time: '20 min',
      rating: 4.9,
      saves: '890 saves',
      desc: 'Wok-tossed golden tofu cubes with a sticky, zesty glaze served on jasmine rice with shredded purple cabbage.',
      chef: 'By Chef Maya Lin',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6NDkpQoOnfFhT2Z3XVvjDS-5a9PYIhvTmFQG65lwDqpSG0Y4kN7unkR6gmaTB6zUzZSk2MXHEYGbu25PcGxYkWsbxQzbzIyU-Z8nn0vvuuXpwGJIWmxwZV6SHbgho6q-RlbWoOdI19_FNREpKReAgVvTRaMa-MvNBkpGPUNcD5vVR_i1vnByjf7mccBElpwtlcYLXwUS2UmGI4w0dWkjo7j5w1KC7V-O2VYhrNTFAQMonlHTW86aPg',
      recipeObj: {
        id: 'rec-t1',
        title: 'Crispy Honey Chili Garlic Tofu Bowls',
        subtitle: 'Sticky, sweet, spicy wok-tossed crispy tofu',
        description: 'Golden crispy tofu cubes coated in a spicy sweet garlic chili glaze, served over fluffy rice.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6NDkpQoOnfFhT2Z3XVvjDS-5a9PYIhvTmFQG65lwDqpSG0Y4kN7unkR6gmaTB6zUzZSk2MXHEYGbu25PcGxYkWsbxQzbzIyU-Z8nn0vvuuXpwGJIWmxwZV6SHbgho6q-RlbWoOdI19_FNREpKReAgVvTRaMa-MvNBkpGPUNcD5vVR_i1vnByjf7mccBElpwtlcYLXwUS2UmGI4w0dWkjo7j5w1KC7V-O2VYhrNTFAQMonlHTW86aPg',
        cuisine: 'Asian Fusion',
        category: 'lunch' as const,
        difficulty: 'Easy' as const,
        prepTimeMinutes: 10,
        cookTimeMinutes: 10,
        servings: 2,
        rating: 4.9,
        reviewCount: 890,
        tags: ['Vegetarian', 'Quick', 'Spicy'],
        dietary: ['Vegetarian' as const],
        nutrition: { calories: 380, protein: 22, carbs: 46, fat: 12 },
        ingredients: [
          { id: 'it1', name: 'Extra firm tofu pressed', amount: 400, unit: 'g', category: 'produce' as const },
          { id: 'it2', name: 'Cornstarch for dusting', amount: 3, unit: 'tbsp', category: 'pantry' as const },
          { id: 'it3', name: 'Chili garlic sauce & honey', amount: 3, unit: 'tbsp', category: 'spices' as const }
        ],
        steps: [
          { stepNumber: 1, instruction: 'Cube tofu, toss with cornstarch, pan fry until crispy and golden.', timerMinutes: 8 },
          { stepNumber: 2, instruction: 'Pour sauce over tofu and toss vigorously for 1 minute until sticky.', timerMinutes: 2 }
        ],
        author: { name: 'Chef Maya Lin', avatar: CHEF_GIRL_AVATAR, role: 'Culinary Instructor' }
      }
    },
    {
      id: 'rec-t2',
      rank: '🔥 #2 Trending',
      title: 'Artisanal Sourdough Focaccia with Rosemary & Sea Salt',
      tag: 'Artisan Baking',
      tagColor: 'text-[#8e4e14]',
      time: '50 min',
      rating: 4.9,
      saves: '744 saves',
      desc: 'Crispy bottom, airy cloud interior with fragrant Mediterranean rosemary infusion and crunchy Maldon salt.',
      chef: 'By Paolo Romano',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOvbdB5bdcCNg96bzYzRkwrUEgqfukpyk7BA4dj4o441LBoCZVL-8Q_7Ryi5nCHh4a9FItK4TJtUzxGbYJ8Iwy8KSdxa6AYNvLlP3Ip7zHCBMdIN6u9ep0XTveZQ1xmCIzikvavu_llrXu453hvi4qTdYw0GmCJ1PwTvhexoXCeS4upNXN-Xn1IieGTfY-YFNLB5b4qfl4ebU3fwUyaoFHqSjeTZnG7QkIMUbOjv5fr0ay75BWxg9Ggw',
      recipeObj: {
        id: 'rec-t2',
        title: 'Artisanal Sourdough Focaccia with Rosemary & Sea Salt',
        subtitle: 'Traditional high-hydration Italian dimpled focaccia',
        description: 'Deeply dimpled airy sourdough focaccia drenched in cold pressed olive oil, rosemary needles, and flake salt.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOvbdB5bdcCNg96bzYzRkwrUEgqfukpyk7BA4dj4o441LBoCZVL-8Q_7Ryi5nCHh4a9FItK4TJtUzxGbYJ8Iwy8KSdxa6AYNvLlP3Ip7zHCBMdIN6u9ep0XTveZQ1xmCIzikvavu_llrXu453hvi4qTdYw0GmCJ1PwTvhexoXCeS4upNXN-Xn1IieGTfY-YFNLB5b4qfl4ebU3fwUyaoFHqSjeTZnG7QkIMUbOjv5fr0ay75BWxg9Ggw',
        cuisine: 'Italian',
        category: 'baking' as const,
        difficulty: 'Medium' as const,
        prepTimeMinutes: 20,
        cookTimeMinutes: 30,
        servings: 8,
        rating: 4.9,
        reviewCount: 744,
        tags: ['Bread', 'Baking', 'Artisan'],
        dietary: ['Vegetarian' as const],
        nutrition: { calories: 260, protein: 7, carbs: 36, fat: 10 },
        ingredients: [
          { id: 'it4', name: 'High protein bread flour', amount: 500, unit: 'g', category: 'bakery' as const },
          { id: 'it5', name: 'Active sourdough starter', amount: 100, unit: 'g', category: 'bakery' as const },
          { id: 'it6', name: 'Extra virgin olive oil', amount: 0.33, unit: 'cup', category: 'pantry' as const }
        ],
        steps: [
          { stepNumber: 1, instruction: 'Perform stretch and folds every 30 minutes for 2 hours.', timerMinutes: 30 },
          { stepNumber: 2, instruction: 'Dimple with olive oil and fresh rosemary, bake at 450°F until golden.', timerMinutes: 25 }
        ],
        author: { name: 'Paolo Romano', avatar: CHEF_GIRL_AVATAR, role: 'Master Baker' }
      }
    },
    {
      id: 'rec-t3',
      rank: '🔥 #3 Trending',
      title: 'Creamy Pistachio Pesto Rigatoni',
      tag: 'Sicilian Classic',
      tagColor: 'text-[#00685d]',
      time: '18 min',
      rating: 4.8,
      saves: '630 saves',
      desc: 'Velvety Sicilian ground pistachio paste, aged pecorino, and garlic finished with a dollop of fresh burrata cream.',
      chef: 'By Giulia Donati',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgGdEoB775AI6N_B0PhbbWXzgO-7orZpTKisWJ8Q4Fh_cWxP6MpF3OOoeCKGw4pFoaj8OZKGnRtsa8ncYSxO5_NMeQvNQI09Bt3FH7JSkpRcrFXPWGkyLoyEZrUZQDsrjyQAjRF1WJeU1hVu9u9zLNUeE-BB2qL4H75Ax8hvbD4s64Cv91HVY3DifCKhOrzZzyGr0G-hv32YX7S-FxDI2pwa0GnYIT43L-BwKfXuwc8oLnqvhsQEu0MQ',
      recipeObj: {
        id: 'rec-t3',
        title: 'Creamy Pistachio Pesto Rigatoni',
        subtitle: 'Authentic Sicilian pesto di pistacchio with burrata cream',
        description: 'Ground Bronte pistachios blended with extra virgin olive oil, pecorino cheese, tossed with al dente bronze-die rigatoni.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgGdEoB775AI6N_B0PhbbWXzgO-7orZpTKisWJ8Q4Fh_cWxP6MpF3OOoeCKGw4pFoaj8OZKGnRtsa8ncYSxO5_NMeQvNQI09Bt3FH7JSkpRcrFXPWGkyLoyEZrUZQDsrjyQAjRF1WJeU1hVu9u9zLNUeE-BB2qL4H75Ax8hvbD4s64Cv91HVY3DifCKhOrzZzyGr0G-hv32YX7S-FxDI2pwa0GnYIT43L-BwKfXuwc8oLnqvhsQEu0MQ',
        cuisine: 'Italian',
        category: 'dinner' as const,
        difficulty: 'Easy' as const,
        prepTimeMinutes: 8,
        cookTimeMinutes: 10,
        servings: 3,
        rating: 4.8,
        reviewCount: 630,
        tags: ['Pasta', 'Quick', 'Italian', 'Vegetarian'],
        dietary: ['Vegetarian' as const],
        nutrition: { calories: 510, protein: 18, carbs: 58, fat: 24 },
        ingredients: [
          { id: 'it7', name: 'Bronte shelled pistachios', amount: 150, unit: 'g', category: 'pantry' as const },
          { id: 'it8', name: 'Bronze-die Rigatoni pasta', amount: 350, unit: 'g', category: 'pantry' as const },
          { id: 'it9', name: 'Pecorino Romano & Burrata', amount: 100, unit: 'g', category: 'dairy' as const }
        ],
        steps: [
          { stepNumber: 1, instruction: 'Pulse pistachios with olive oil, pecorino, and pasta water until creamy.', timerMinutes: 3 },
          { stepNumber: 2, instruction: 'Toss hot rigatoni in sauce and top with burrata cream.', timerMinutes: 2 }
        ],
        author: { name: 'Giulia Donati', avatar: CHEF_GIRL_AVATAR, role: 'Chef de Cuisine' }
      }
    }
  ];

  // Hero Right Dish 1: Tuscan Salmon
  const heroTuscanSalmon: Recipe = {
    id: 'hero-tuscan-salmon',
    title: 'Creamy Tuscan Garlic Salmon',
    subtitle: 'Blistered cherry tomatoes, baby spinach, and parmesan cream',
    description: 'Crispy pan-seared salmon fillet simmered in a luscious garlic, sun-dried tomato, spinach, and parmesan cream sauce.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3luFncvJL-eDBgDCDCtKgu1CCz8sTuabikI76TSgqSWVaX2hbkT-4HhxKP-sKiKcDM-M7TA-hLJgTH_8UWMUKFiqqrhBHrRqU7dUa2wVjhOKDPkGufBruF1ukYiroLTyRojwrYfzqZQPhtj1NK-PN2Ey02MqOFYfY4sXlnqy8z99TmSdgQwXSxCs-plkE3SPqVsIp6EKdctlo0IrhVyHR2nGntAYjztY1MgE0kCdg5fvuMoMoui8jXQ',
    cuisine: 'Italian',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    servings: 2,
    rating: 4.9,
    reviewCount: 540,
    tags: ['Salmon', 'Creamy', 'Keto', 'Quick Dinner'],
    dietary: ['Gluten-Free', 'Keto', 'High-Protein'],
    nutrition: { calories: 490, protein: 40, carbs: 6, fat: 34 },
    ingredients: [
      { id: 'h1', name: 'Wild salmon fillets', amount: 2, unit: 'fillets', category: 'meat' },
      { id: 'h2', name: 'Cherry tomatoes halved', amount: 1, unit: 'cup', category: 'produce' },
      { id: 'h3', name: 'Heavy cream (or coconut cream)', amount: 0.75, unit: 'cup', category: 'dairy' },
      { id: 'h4', name: 'Fresh baby spinach', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'h5', name: 'Minced garlic cloves', amount: 4, unit: 'cloves', category: 'produce' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sear salmon in a skillet for 4 mins per side until crisp.', timerMinutes: 8 },
      { stepNumber: 2, instruction: 'Sauté garlic, tomatoes, and spinach. Pour in cream and parmesan.', timerMinutes: 4 },
      { stepNumber: 3, instruction: 'Simmer salmon in sauce for 3 minutes and serve hot.', timerMinutes: 3 }
    ],
    author: { name: 'Chef Clara Laurent', avatar: CHEF_GIRL_AVATAR, role: 'Lead Culinary Sommelier' }
  };

  // Sourdough Bread Recipe
  const heroSourdough: Recipe = {
    id: 'hero-sourdough',
    title: 'Artisanal Golden Sourdough Loaf',
    subtitle: 'Deeply blistered golden crust with open tender crumb',
    description: 'Slow-fermented artisan sourdough baked in a hot Dutch oven for maximum rise and blistering crust.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOBd4dYwSS6niyyJjoP4yRijDdjlsUmq-8Ubi_fG0ULUyBqSFEmPhO72Ltm3HCrJr2zTuEk2m9-byP0BVHkFZbhti5ID-iPlfjzjCM2QwGQhZuNTuW22ooW-Qi4oH6HgVVqN-_SQwgJoyfnfdUDfqi5CbkSM5P8FYwuu_Of4xH8PKUA1vzMevkZD8xJBJ10IOZGnGJYP9efeRsuee8eeGKgM3LhqZJCJWdNwAxJ80whqtXLwXge6hS1w',
    cuisine: 'French Baking',
    category: 'baking',
    difficulty: 'Medium',
    prepTimeMinutes: 30,
    cookTimeMinutes: 40,
    servings: 10,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Bread', 'Fermentation', 'Artisan'],
    dietary: ['Vegetarian'],
    nutrition: { calories: 180, protein: 6, carbs: 36, fat: 1 },
    ingredients: [
      { id: 'hs1', name: 'Bread flour', amount: 450, unit: 'g', category: 'bakery' },
      { id: 'hs2', name: 'Active sourdough starter', amount: 100, unit: 'g', category: 'bakery' },
      { id: 'hs3', name: 'Sea salt', amount: 10, unit: 'g', category: 'spices' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Mix flour, water, and starter. Autolyse for 45 minutes.' },
      { stepNumber: 2, instruction: 'Bulk ferment with coil folds every 45 mins. Cold ferment overnight.', timerMinutes: 45 },
      { stepNumber: 3, instruction: 'Bake inside Dutch oven at 450°F with lid on for 20m, then lid off for 20m.', timerMinutes: 40 }
    ],
    author: { name: 'Paolo Romano', avatar: CHEF_GIRL_AVATAR, role: 'Master Baker' }
  };

  // Basil Pesto Rigatoni
  const heroBasilPesto: Recipe = {
    id: 'hero-pesto-rigatoni',
    title: '15-Min Basil Pesto Rigatoni',
    subtitle: 'Toasted pine nuts, shaved parmesan, and fresh Genovese basil',
    description: 'Vibrant homemade fresh basil pesto tossed with bronze-cut rigatoni, toasted pine nuts, and aged Parmigiano Reggiano.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHxySW3gadGO_dLEHE01MVEb0S630QvNALGMwFu-MBH3Doz12__tvu1GDPM5fQh3MTH6r-7a3wj52ekfgp7DjcaVmyrr4SXc4YZ3spsCg3g-1Gl4mQMLl3ahLWitQjEXyuGNbH-7uemYvKXsI-zyerscLL9U_tVvhvfOnbJc0AIGEarjyh_hFdQQq6jdszVidL27wJthu6_IVYDGVlbrxJGbwuby56qAQwlDLNFuOO4OcXXjG-Dbd7Ig',
    cuisine: 'Italian',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 3,
    rating: 4.8,
    reviewCount: 420,
    tags: ['Pasta', 'Quick Meal', 'Italian', 'Vegetarian'],
    dietary: ['Vegetarian'],
    nutrition: { calories: 470, protein: 14, carbs: 54, fat: 22 },
    ingredients: [
      { id: 'hp1', name: 'Fresh Genovese basil leaves', amount: 2, unit: 'cups', category: 'produce' },
      { id: 'hp2', name: 'Pine nuts toasted', amount: 0.33, unit: 'cup', category: 'pantry' },
      { id: 'hp3', name: 'Parmigiano Reggiano grated', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: 'hp4', name: 'Bronze-die Rigatoni pasta', amount: 300, unit: 'g', category: 'pantry' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Boil rigatoni in salted water until al dente.', timerMinutes: 10 },
      { stepNumber: 2, instruction: 'Blend basil, pine nuts, garlic, parmesan, and olive oil into bright green pesto.', timerMinutes: 3 },
      { stepNumber: 3, instruction: 'Toss hot pasta with pesto and starchy pasta water for glossy coating.', timerMinutes: 2 }
    ],
    author: { name: 'Chef Clara Laurent', avatar: CHEF_GIRL_AVATAR, role: 'Lead Culinary Sommelier' }
  };

  // AI Assistant Caprese Chicken Recipe
  const aiCapreseChicken: Recipe = {
    id: 'ai-caprese-chicken',
    title: '15-Min Skillet Caprese Chicken',
    subtitle: 'Blistered tomatoes, garlic oil, and basil chiffonade',
    description: 'Using your chicken, cherry tomatoes, garlic, and basil. High in protein (42g) with balanced Mediterranean fats.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcAglBhLj5mrEokmwsVF7HIHUD4dzkdQ-PLz4Px3clndrOLEWdPPSW6xet8GJq9hyI1mUzcGwu1QJNgBwdbEk64s7Ez5TMvh3clAVuBQSuVpj-AC-weQ2s_b5Zyjf6UdPmxoHMOtWikCBeRjJeng8KOWLT7IhjMbsF5zirL9wzIPgwaceF1HemftXNm445PJ6oxk25C1Ee5LTC2EZLYdsoDkQFnEGMT3dCajqolaVZBWtxHuBuY6SdXg',
    cuisine: 'Mediterranean Fusion',
    category: 'dinner',
    difficulty: 'Easy',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 2,
    rating: 4.9,
    reviewCount: 156,
    tags: ['AI Generated', 'Quick', 'High Protein', 'Gluten-Free'],
    dietary: ['Gluten-Free', 'High-Protein'],
    nutrition: { calories: 390, protein: 42, carbs: 8, fat: 18 },
    ingredients: [
      { id: 'ac1', name: 'Chicken breast sliced', amount: 2, unit: 'breasts', category: 'meat' },
      { id: 'ac2', name: 'Cherry tomatoes halved', amount: 1, unit: 'cup', category: 'produce' },
      { id: 'ac3', name: 'Garlic cloves minced', amount: 3, unit: 'cloves', category: 'produce' },
      { id: 'ac4', name: 'Fresh basil chiffonade', amount: 0.5, unit: 'cup', category: 'produce' },
      { id: 'ac5', name: 'Extra virgin olive oil', amount: 2, unit: 'tbsp', category: 'pantry' }
    ],
    steps: [
      { stepNumber: 1, instruction: 'Sear chicken strips in olive oil for 5 minutes until browned.', timerMinutes: 5 },
      { stepNumber: 2, instruction: 'Add garlic and cherry tomatoes; cover pan for 3 minutes until tomatoes burst.', timerMinutes: 3 },
      { stepNumber: 3, instruction: 'Toss with fresh basil chiffonade and drizzle with balsamic glaze.', timerMinutes: 2 }
    ],
    author: { name: 'Chef Gemini Assistant', avatar: CHEF_GIRL_AVATAR, role: 'AI Culinary Intelligence' },
    isAiGenerated: true
  };

  const categories = [
    { name: 'Breakfast', count: '312 recipes', icon: 'bakery_dining', bg: 'bg-[#ffdcc4]', text: 'text-[#8e4e14]' },
    { name: 'Lunch', count: '285 recipes', icon: 'lunch_dining', bg: 'bg-[#ffdbcd]', text: 'text-[#9f3d00]' },
    { name: 'Dinner', count: '420 recipes', icon: 'dinner_dining', bg: 'bg-[#ffab69]/30', text: 'text-[#783d01]' },
    { name: 'Desserts', count: '198 recipes', icon: 'icecream', bg: 'bg-[#8cf5e4]', text: 'text-[#00685d]' },
    { name: 'Snacks', count: '142 recipes', icon: 'cookie', bg: 'bg-[#ece0da]', text: 'text-[#594137]' },
    { name: 'Beverages', count: '95 recipes', icon: 'local_cafe', bg: 'bg-[#ffb780]', text: 'text-[#8e4e14]' },
    { name: 'Vegetarian', count: '510 recipes', icon: 'spa', bg: 'bg-[#6fd8c8]', text: 'text-[#005048]' },
    { name: 'Healthy', count: '365 recipes', icon: 'nutrition', bg: 'bg-[#f2e6df]', text: 'text-[#00685d]' },
    { name: 'Quick Meals', count: '240 recipes', icon: 'bolt', bg: 'bg-[#ffdbcd]', text: 'text-[#9f3d00]' },
    { name: 'Indian', count: '330 recipes', icon: 'ramen_dining', bg: 'bg-[#ffdcc4]', text: 'text-[#8e4e14]' },
    { name: 'Italian', count: '290 recipes', icon: 'local_pizza', bg: 'bg-[#ffb596]', text: 'text-[#c74e00]' },
    { name: 'World Cuisines', count: 'Mexican, Asian +', icon: 'public', bg: 'bg-[#ece0da]', text: 'text-[#201a17]' },
  ];

  return (
    <div className="w-full flex flex-col antialiased text-[#201a17]">
      {/* Top Ambient Kitchen Glow Overlays */}
      <div className="relative w-full overflow-hidden pb-12 sm:pb-16">
        <div className="absolute -top-24 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#ffab69]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-10 -right-20 w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-[#ffdbcd]/35 blur-3xl pointer-events-none" />

        {/* Content Container with Responsive Side Margins */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          {/* 1. HERO SECTION */}
          <section className="relative pt-2 sm:pt-4 lg:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Hero Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef1ea] border border-[#9f3d00]/20 text-[#9f3d00] text-xs font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#9f3d00]">restaurant</span>
                <span>The Intelligent Recipe Platform</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] leading-[1.15] text-[#201a17] tracking-tight font-bold">
                Discover Your Next <span className="italic font-serif text-[#9f3d00] font-normal">Favorite</span> Recipe
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#594137] max-w-xl leading-relaxed">
                Explore delicious seasonal recipes, discover adventurous culinary pairings, and let personalized Gemini intelligence turn your pantry ingredients into restaurant-grade meals.
              </p>

              {/* Action Buttons - Stack on mobile, inline on tablet/desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full sm:w-auto relative z-30">
                <button
                  type="button"
                  id="hero-explore-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate('explore');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#9f3d00] hover:bg-[#c74e00] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md shadow-[#9f3d00]/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none"
                >
                  <span>Explore Recipes</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                <button
                  type="button"
                  id="hero-create-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onOpenCreateRecipe) {
                      onOpenCreateRecipe();
                    } else {
                      onNavigate('create-recipe');
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#f8ece5] hover:bg-[#f2e6df] text-[#9f3d00] font-semibold text-sm sm:text-base rounded-xl shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none border border-[#e1bfb2]/40 hover:border-[#9f3d00]/40"
                  title="Create and publish your custom recipe"
                >
                  <span className="material-symbols-outlined text-[20px]">post_add</span>
                  <span>Create Recipe</span>
                </button>

                <button
                  type="button"
                  id="hero-ask-ai-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onOpenAskAi) {
                      onOpenAskAi();
                    } else {
                      onNavigate('ai-kitchen');
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#783d01] font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg border border-[#e1bfb2]/50 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 select-none"
                  title="Open Gemini AI Culinary Sommelier"
                >
                  <span className="material-symbols-outlined text-[#8e4e14] text-[20px]">psychology</span>
                  <span>Ask AI</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffab69] text-[#2f1400] text-[11px] font-bold">✨ NEW</span>
                </button>
              </div>

              {/* Micro Proof Metric Row */}
              <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-3">
                <div className="flex items-center -space-x-2">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffb596] flex items-center justify-center text-[#7c2e00] font-bold text-xs shadow-xs border-2 border-white">CL</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffdbcd] flex items-center justify-center text-[#9f3d00] font-bold text-xs shadow-xs border-2 border-white">SR</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8cf5e4] flex items-center justify-center text-[#00685d] font-bold text-xs shadow-xs border-2 border-white">ER</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffdcc4] flex items-center justify-center text-[#8e4e14] font-bold text-xs shadow-xs border-2 border-white">ML</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ece0da] flex items-center justify-center text-[#594137] font-bold text-xs shadow-xs border-2 border-white">+9k</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs sm:text-sm text-[#201a17] font-bold">4.9 / 5</span>
                  </div>
                  <span className="text-[11px] sm:text-xs text-[#594137]">Over 12,000 tested home recipes</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Collage */}
            <div className="lg:col-span-6 relative mt-2 lg:mt-0">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 relative">
                
                {/* Dish 1: Tuscan Salmon */}
                <div 
                  onClick={() => onSelectRecipe(heroTuscanSalmon)}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3luFncvJL-eDBgDCDCtKgu1CCz8sTuabikI76TSgqSWVaX2hbkT-4HhxKP-sKiKcDM-M7TA-hLJgTH_8UWMUKFiqqrhBHrRqU7dUa2wVjhOKDPkGufBruF1ukYiroLTyRojwrYfzqZQPhtj1NK-PN2Ey02MqOFYfY4sXlnqy8z99TmSdgQwXSxCs-plkE3SPqVsIp6EKdctlo0IrhVyHR2nGntAYjztY1MgE0kCdg5fvuMoMoui8jXQ"
                      alt="Creamy Tuscan Garlic Salmon"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[#9f3d00] text-[10px] sm:text-xs font-semibold flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[13px] sm:text-[14px]">timer</span> 20 min
                    </span>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                      <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-[#ffdcc4] font-semibold">Chef Signature</span>
                      <h3 className="font-serif text-sm sm:text-xl text-white font-bold leading-tight drop-shadow-xs">Creamy Tuscan Salmon</h3>
                    </div>
                  </div>
                </div>

                {/* Vertical Stack on Right */}
                <div className="flex flex-col gap-2.5 sm:gap-3.5">
                  
                  {/* Dish 2: Sourdough Bread */}
                  <div 
                    onClick={() => onSelectRecipe(heroSourdough)}
                    className="group relative rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOBd4dYwSS6niyyJjoP4yRijDdjlsUmq-8Ubi_fG0ULUyBqSFEmPhO72Ltm3HCrJr2zTuEk2m9-byP0BVHkFZbhti5ID-iPlfjzjCM2QwGQhZuNTuW22ooW-Qi4oH6HgVVqN-_SQwgJoyfnfdUDfqi5CbkSM5P8FYwuu_Of4xH8PKUA1vzMevkZD8xJBJ10IOZGnGJYP9efeRsuee8eeGKgM3LhqZJCJWdNwAxJ80whqtXLwXge6hS1w"
                        alt="Golden Sourdough"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#00685d] text-white text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs">
                        Slow Ferment
                      </span>
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                        <p className="font-bold text-xs sm:text-base text-white drop-shadow-xs">Golden Sourdough</p>
                      </div>
                    </div>
                  </div>

                  {/* Dish 3: Pesto Pasta */}
                  <div 
                    onClick={() => onSelectRecipe(heroBasilPesto)}
                    className="group relative rounded-2xl overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxySW3gadGO_dLEHE01MVEb0S630QvNALGMwFu-MBH3Doz12__tvu1GDPM5fQh3MTH6r-7a3wj52ekfgp7DjcaVmyrr4SXc4YZ3spsCg3g-1Gl4mQMLl3ahLWitQjEXyuGNbH-7uemYvKXsI-zyerscLL9U_tVvhvfOnbJc0AIGEarjyh_hFdQQq6jdszVidL27wJthu6_IVYDGVlbrxJGbwuby56qAQwlDLNFuOO4OcXXjG-Dbd7Ig"
                        alt="Basil Pesto Rigatoni"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-md text-[#00685d] text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00685d]" /> 15m Quick
                      </span>
                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                        <p className="font-bold text-xs sm:text-base text-white drop-shadow-xs">Basil Pesto Rigatoni</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Overlapping Decorative AI Tip Floating Card */}
              <div 
                onClick={() => onSelectRecipe(heroTuscanSalmon)}
                className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-6 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-lg border border-[#e1bfb2]/40 max-w-full sm:max-w-xs cursor-pointer hover:scale-102 transition-transform"
                title="View Tuscan Salmon Recipe Tips"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ffdbcd] flex items-center justify-center shrink-0 text-[#9f3d00]">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">soup_kitchen</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#201a17] font-bold flex items-center gap-1">
                    <span>Gemini Kitchen Insight</span>
                    <span className="text-[10px] text-[#9f3d00] font-bold">✨ Tap to cook</span>
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#594137]">"Substitute coconut cream for lactose-free Tuscan salmon!"</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 2. SEARCH & DISCOVERY BAR */}
        <section className="mt-8 sm:mt-14 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg border border-[#e1bfb2]/30 p-3.5 sm:p-5 flex flex-col gap-3">
            
            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2.5">
              <div className="relative flex-1 flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#594137] text-[20px] pointer-events-none">search</span>
                <input
                  id="recipe-search-input"
                  type="text"
                  placeholder="Search recipes, ingredients, cuisines..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-[#fef1ea] pl-11 pr-20 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm text-[#201a17] placeholder:text-[#8d7165] outline-none focus:bg-white focus:ring-2 focus:ring-[#9f3d00]/30 transition-all font-medium"
                />
                
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    id="voice-search-btn"
                    onClick={handleVoiceSearch}
                    className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${isListening ? 'bg-[#9f3d00] text-white animate-pulse' : 'bg-white text-[#9f3d00] hover:bg-[#9f3d00] hover:text-white'} transition-colors shadow-2xs`}
                    title="Voice Search"
                  >
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">mic</span>
                  </button>

                  <button 
                    type="submit"
                    className="flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-[#9f3d00] text-white hover:bg-[#c74e00] transition-colors text-xs font-bold shadow-2xs cursor-pointer"
                  >
                    Go
                  </button>
                </div>
              </div>

              {/* Quick Filter Menus - Horizontally scrollable on mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
                
                {/* Cuisine Filter */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowFiltersDropdown(showFiltersDropdown === 'cuisine' ? null : 'cuisine')}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#f8ece5] text-[#201a17] text-xs font-semibold hover:bg-[#f2e6df] transition-colors whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#9f3d00]">restaurant_menu</span>
                    <span>{selectedCuisine || 'Cuisine'}</span>
                    <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </button>
                  {showFiltersDropdown === 'cuisine' && (
                    <div className="absolute top-full mt-2 left-0 w-44 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 flex flex-col gap-1">
                      {['All Cuisines', 'Italian', 'Indian', 'French', 'Mexican', 'Asian Fusion'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setSelectedCuisine(c === 'All Cuisines' ? null : c);
                            setShowFiltersDropdown(null);
                          }}
                          className="text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-[#fef1ea] hover:text-[#9f3d00] rounded-lg font-medium"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cook Time Filter */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowFiltersDropdown(showFiltersDropdown === 'time' ? null : 'time')}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#f8ece5] text-[#201a17] text-xs font-semibold hover:bg-[#f2e6df] transition-colors whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#8e4e14]">schedule</span>
                    <span>{selectedCookTime || 'Cook Time'}</span>
                    <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </button>
                  {showFiltersDropdown === 'time' && (
                    <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 flex flex-col gap-1">
                      {['Any Time', '< 15 mins', '< 30 mins', '< 45 mins', 'Slow Cook'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setSelectedCookTime(t === 'Any Time' ? null : t);
                            setShowFiltersDropdown(null);
                          }}
                          className="text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-[#fef1ea] hover:text-[#9f3d00] rounded-lg font-medium"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dietary Filter */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowFiltersDropdown(showFiltersDropdown === 'dietary' ? null : 'dietary')}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#f8ece5] text-[#201a17] text-xs font-semibold hover:bg-[#f2e6df] transition-colors whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#00685d]">eco</span>
                    <span>{selectedDietary || 'Dietary'}</span>
                    <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </button>
                  {showFiltersDropdown === 'dietary' && (
                    <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 flex flex-col gap-1">
                      {['All Diets', 'Gluten-Free', 'Vegetarian', 'High-Protein', 'Keto'].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setSelectedDietary(d === 'All Diets' ? null : d);
                            setShowFiltersDropdown(null);
                          }}
                          className="text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-[#fef1ea] hover:text-[#9f3d00] rounded-lg font-medium"
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#9f3d00] text-white hover:bg-[#c74e00] transition-colors text-xs font-bold shadow-xs cursor-pointer shrink-0 ml-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span className="hidden sm:inline">Apply</span>
                </button>
              </div>
            </form>

            {/* Trending Search Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
              <span className="text-xs text-[#594137] font-semibold shrink-0 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#9f3d00]">local_fire_department</span> Trending:
              </span>
              {['#QuickDinner', '#PastaNight', '#HighProtein', '#IndianCurry', '#AirFryer', '#GlutenFree'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-[#f8ece5] hover:bg-[#ffdbcd] hover:text-[#9f3d00] text-xs text-[#594137] font-medium transition-colors shrink-0 cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* 3. PICKED FOR YOU (Personalized) */}
        <section className="mt-10 sm:mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9f3d00] text-[22px] sm:text-[24px]">recommend</span>
                <h2 className="font-serif text-xl sm:text-3xl text-[#201a17] font-bold tracking-tight">Picked For You</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#594137] mt-0.5">Based on your cooking preferences, pantry frequency & local taste notes.</p>
            </div>
            
            <button
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#9f3d00] hover:underline group cursor-pointer self-start sm:self-auto"
            >
              <span>View all recommendations</span>
              <span className="material-symbols-outlined text-[16px] sm:text-[18px] transition-transform group-hover:translate-x-1">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pickedDishes.map((dish) => {
              const isSaved = savedRecipeIds.has(dish.id);
              return (
                <article
                  key={dish.id}
                  onClick={() => onSelectRecipe(dish as any)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 border border-[#e1bfb2]/30 cursor-pointer active:scale-98"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f8ece5]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={dish.imageUrl}
                      alt={dish.title}
                      referrerPolicy="no-referrer"
                    />

                    {/* Bookmark toggle */}
                    <button
                      onClick={(e) => onToggleSave(dish.id, e)}
                      className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center ${isSaved ? 'text-[#9f3d00]' : 'text-[#201a17] hover:text-[#9f3d00]'} shadow-xs transition-colors`}
                      title="Save Recipe"
                    >
                      <span 
                        className="material-symbols-outlined text-[18px] sm:text-[20px]" 
                        style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>

                    {/* Rating badge */}
                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs">
                      <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-xs font-bold text-[#201a17]">{dish.rating}</span>
                      <span className="text-[10px] text-[#594137]">({dish.reviewCount})</span>
                    </div>

                    {/* Top tag badge */}
                    <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 ${dish.badgeColor} text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-md shadow-xs`}>
                      {dish.badge}
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#594137] mb-1">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#8e4e14]">{dish.cuisine}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px]">
                          <span className="material-symbols-outlined text-[13px] sm:text-[14px]">schedule</span>
                          {dish.cookTimeMinutes + dish.prepTimeMinutes} min
                        </span>
                      </div>

                      <h3 className="font-serif text-sm sm:text-base font-bold text-[#201a17] group-hover:text-[#9f3d00] transition-colors line-clamp-2 leading-snug">
                        {dish.title}
                      </h3>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#f8ece5]">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${dish.author.avatarBg} flex items-center justify-center font-bold text-xs`}>
                          {dish.author.initials}
                        </div>
                        <span className="text-xs text-[#201a17] font-semibold truncate max-w-[90px] sm:max-w-[100px]">{dish.author.name}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#f8ece5] text-[#594137] text-[10px] font-semibold">
                        {dish.difficulty}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. "NOT SURE WHAT TO COOK? — AI KITCHEN" FEATURE SHOWCASE */}
        <section className="mt-10 sm:mt-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#9f3d00] via-[#c74e00] to-[#8e4e14] p-4 sm:p-8 lg:p-10 text-white shadow-xl">
            
            {/* Ambient Sparkle Pattern Visual */}
            <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-[#ffab69]/20 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#8cf5e4]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/15 backdrop-blur-md w-fit">
                  <span className="material-symbols-outlined text-[#ffdcc4] text-[16px] sm:text-[18px]">auto_awesome</span>
                  <span className="text-[10px] sm:text-[11px] text-white font-semibold uppercase tracking-wider">
                    Gemini 2.5 Flash Culinary Engine
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight font-bold leading-tight">
                  Not Sure What to Cook?
                </h2>

                <p className="text-xs sm:text-base text-white/90 max-w-xl leading-relaxed">
                  Tell AI what ingredients you have in your fridge and get a personalized gourmet recipe in seconds — tailored to your dietary goals and cooking time.
                </p>

                {/* Interactive Fridge Prompt Showcase */}
                <div className="mt-1 sm:mt-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-[#201a17] shadow-md border border-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#9f3d00]">
                      <span className="material-symbols-outlined text-[16px]">kitchen</span>
                      <span>Pantry Match Simulation</span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-medium">Tap to edit</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-[#fef1ea] rounded-xl">
                    {fridgeChips.map((chip, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold text-[#201a17] shadow-xs border border-stone-200">
                        {chip}
                        <button 
                          onClick={() => handleRemoveFridgeChip(idx)}
                          className="hover:text-red-600 text-stone-400 text-xs ml-0.5 cursor-pointer font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    
                    {showAddChip ? (
                      <input
                        type="text"
                        placeholder="Type ingredient + Enter"
                        value={newChipInput}
                        onChange={(e) => setNewChipInput(e.target.value)}
                        onKeyDown={handleAddFridgeChip}
                        onBlur={() => setShowAddChip(false)}
                        autoFocus
                        className="text-xs px-2 py-0.5 rounded-lg bg-white border border-[#9f3d00] outline-none text-stone-900"
                      />
                    ) : (
                      <button 
                        onClick={() => setShowAddChip(true)}
                        className="text-xs text-[#9f3d00] hover:text-[#783d01] italic pl-1 cursor-pointer font-medium"
                      >
                        + add item...
                      </button>
                    )}
                  </div>

                  {/* Quick prompt ideas */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1 sm:gap-1.5">
                    <span className="text-[10px] sm:text-[11px] text-[#594137] font-semibold mr-0.5">Ask AI:</span>
                    {[
                      "15-minute quick meal",
                      "Make it healthier",
                      "Heavy cream substitute",
                      "High-protein dinner"
                    ].map((promptText) => (
                      <button
                        key={promptText}
                        onClick={() => {
                          if (onOpenAskAi) {
                            onOpenAskAi(promptText);
                          } else {
                            if (onSearch) onSearch(promptText);
                            onNavigate('ai-kitchen');
                          }
                        }}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#f8ece5] text-[11px] sm:text-xs hover:bg-[#ffdbcd] hover:text-[#9f3d00] transition-colors text-[#201a17] font-medium cursor-pointer"
                      >
                        "{promptText}"
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <button
                    id="open-ai-kitchen-btn"
                    onClick={() => onNavigate('ai-kitchen')}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-white text-[#9f3d00] font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#9f3d00]">auto_awesome</span>
                    <span>Open AI Kitchen ✨</span>
                  </button>
                  <span className="text-[11px] sm:text-xs text-white/85 font-medium text-center sm:text-left">Zero tokens required • Unlimited creations</span>
                </div>

              </div>

              {/* Decorative AI Cooking Transformation Visual */}
              <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
                <div 
                  onClick={() => onSelectRecipe(aiCapreseChicken)}
                  className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white text-[#201a17] p-3.5 sm:p-4 flex flex-col gap-2.5 sm:gap-3 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffab69] flex items-center justify-center text-[#2f1400]">
                        <span className="material-symbols-outlined text-[16px] sm:text-[18px]">smart_toy</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#201a17]">Chef Gemini Assistant</p>
                        <p className="text-[10px] text-[#00685d] flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00685d] animate-pulse" /> Ready to invent recipes
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#ffdbcd] text-[#9f3d00] px-2 py-0.5 rounded-full font-bold">Instant</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-16/10 bg-[#f8ece5]">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcAglBhLj5mrEokmwsVF7HIHUD4dzkdQ-PLz4Px3clndrOLEWdPPSW6xet8GJq9hyI1mUzcGwu1QJNgBwdbEk64s7Ez5TMvh3clAVuBQSuVpj-AC-weQ2s_b5Zyjf6UdPmxoHMOtWikCBeRjJeng8KOWLT7IhjMbsF5zirL9wzIPgwaceF1HemftXNm445PJ6oxk25C1Ee5LTC2EZLYdsoDkQFnEGMT3dCajqolaVZBWtxHuBuY6SdXg"
                      alt="15-Min Skillet Caprese Chicken"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-[#9f3d00] shadow-xs">
                      Generated in 1.4s
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="font-serif text-sm font-bold text-[#201a17]">15-Min Skillet Caprese Chicken</span>
                    <p className="text-xs text-[#594137] line-clamp-2">
                      "Using your chicken, cherry tomatoes, garlic, and basil. High in protein (42g) with balanced Mediterranean fats."
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-[#594137] border-t border-[#f8ece5]">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium">
                      <span>⚡ 390 kcal</span>
                      <span>•</span>
                      <span>⏱ 15m</span>
                      <span>•</span>
                      <span className="text-[#00685d] font-semibold">🌱 GF</span>
                    </div>
                    <span className="material-symbols-outlined text-[#9f3d00] text-[18px] sm:text-[20px]">chevron_right</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. TRENDING RECIPES CAROUSEL / HIGHLIGHTS */}
        <section className="mt-10 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9f3d00] text-[22px] sm:text-[24px]">local_fire_department</span>
                <h2 className="font-serif text-xl sm:text-3xl text-[#201a17] font-bold tracking-tight">Trending Recipes</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#594137] mt-0.5">Updated hourly from the vibrant home cook community.</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                aria-label="Previous trending recipe"
                onClick={() => setActiveTrendingIndex(prev => (prev === 0 ? trendingDishes.length - 1 : prev - 1))}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f8ece5] hover:bg-[#f2e6df] flex items-center justify-center text-[#201a17] transition-colors cursor-pointer active:scale-95"
                id="trend-prev"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_back</span>
              </button>
              <button
                aria-label="Next trending recipe"
                onClick={() => setActiveTrendingIndex(prev => (prev === trendingDishes.length - 1 ? 0 : prev + 1))}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f8ece5] hover:bg-[#f2e6df] flex items-center justify-center text-[#201a17] transition-colors cursor-pointer active:scale-95"
                id="trend-next"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {trendingDishes.map((trend) => {
              const isSaved = savedRecipeIds.has(trend.id);
              return (
                <article
                  key={trend.id}
                  onClick={() => onSelectRecipe(trend.recipeObj as any)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 border border-[#e1bfb2]/30 cursor-pointer active:scale-98"
                >
                  <div className="relative aspect-16/11 w-full overflow-hidden bg-[#f8ece5]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={trend.image}
                      alt={trend.title}
                      referrerPolicy="no-referrer"
                    />
                    
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#9f3d00] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
                      <span>{trend.rank}</span>
                    </span>

                    <button
                      onClick={(e) => onToggleSave(trend.id, e)}
                      className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center ${isSaved ? 'text-[#9f3d00]' : 'text-[#201a17] hover:text-[#9f3d00]'} shadow-xs transition-colors`}
                      title="Save Recipe"
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                        bookmark
                      </span>
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs">
                      <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-xs font-bold text-[#201a17]">{trend.rating}</span>
                      <span className="text-[10px] text-[#594137]">({trend.saves})</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#594137] mb-1">
                        <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${trend.tagColor}`}>{trend.tag}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium">
                          <span className="material-symbols-outlined text-[13px] sm:text-[14px]">schedule</span> {trend.time}
                        </span>
                      </div>

                      <h3 className="font-serif text-sm sm:text-base font-bold text-[#201a17] group-hover:text-[#9f3d00] transition-colors leading-snug">
                        {trend.title}
                      </h3>

                      <p className="text-xs text-[#594137] line-clamp-2 mt-1 leading-relaxed">
                        {trend.desc}
                      </p>
                    </div>

                    <div className="pt-2.5 sm:pt-3 flex items-center justify-between text-xs text-[#594137] border-t border-[#f8ece5]">
                      <span className="font-semibold text-[#201a17] truncate max-w-[120px]">{trend.chef}</span>
                      <button
                        onClick={(e) => onStartCooking(trend.recipeObj as any, e)}
                        className="inline-flex items-center gap-1 text-[#9f3d00] font-bold hover:underline cursor-pointer"
                      >
                        Cook this <span className="material-symbols-outlined text-[15px] sm:text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 6. EXPLORE BY CATEGORY */}
        <section className="mt-10 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-2">
            <div>
              <h2 className="font-serif text-xl sm:text-3xl text-[#201a17] font-bold tracking-tight">
                Explore by Category & Cuisine
              </h2>
              <p className="text-xs sm:text-sm text-[#594137] mt-0.5">Find inspiration across curated meal types and world food cultures.</p>
            </div>
            <span className="text-xs text-[#594137] font-semibold">13 Curation Hubs</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group bg-white hover:bg-[#fef1ea] p-3 sm:p-4 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-1.5 sm:gap-2 hover:-translate-y-0.5 border border-[#e1bfb2]/30 cursor-pointer active:scale-95"
              >
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.text} group-hover:scale-110 transition-transform shadow-xs`}>
                  <span className="material-symbols-outlined text-[22px] sm:text-[28px]">{cat.icon}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#201a17] truncate max-w-full">{cat.name}</span>
                <span className="text-[10px] sm:text-[11px] text-[#594137] truncate max-w-full">{cat.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 7. COMMUNITY & LOCAL STATS STRIP */}
        <section className="mt-10 sm:mt-16">
          <div className="rounded-2xl bg-[#fef1ea] p-4 sm:p-6 lg:p-8 shadow-xs border border-[#e1bfb2]/40">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center text-center sm:text-left">
              
              {/* Stat 1 */}
              <div 
                onClick={() => onNavigate('explore')}
                className="flex items-center gap-3 justify-center sm:justify-start p-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer group active:scale-98"
                title="Explore 12,000+ Recipes"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#9f3d00] flex items-center justify-center shrink-0 shadow-xs border border-[#e1bfb2]/30 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px] sm:text-[26px]">groups</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-base sm:text-lg text-[#201a17] font-bold group-hover:text-[#9f3d00] transition-colors">12,000+ Recipes</span>
                  <span className="text-[11px] sm:text-xs text-[#594137]">Community tested & verified</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div 
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-3 justify-center sm:justify-start p-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer group active:scale-98"
                title="View Privacy & Local Storage Settings"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#00685d] flex items-center justify-center shrink-0 shadow-xs border border-[#e1bfb2]/30 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px] sm:text-[26px]">lock</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-base sm:text-lg text-[#201a17] font-bold group-hover:text-[#00685d] transition-colors">100% Private</span>
                  <span className="text-[11px] sm:text-xs text-[#594137]">Stored in local browser storage</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div 
                onClick={() => onNavigate('ai-kitchen')}
                className="flex items-center gap-3 justify-center sm:justify-start p-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer group active:scale-98"
                title="Launch Gemini AI Kitchen"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#8e4e14] flex items-center justify-center shrink-0 shadow-xs border border-[#e1bfb2]/30 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px] sm:text-[26px]">cognition</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-base sm:text-lg text-[#201a17] font-bold group-hover:text-[#8e4e14] transition-colors">Gemini AI Inside</span>
                  <span className="text-[11px] sm:text-xs text-[#594137]">Smart substitutions & scaling</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        </div>
      </div>
    </div>
  );
};
