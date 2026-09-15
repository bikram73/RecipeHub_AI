import { Recipe, LocalProfile } from '../types';
import { getHistory, getSavedRecipes } from '../utils/storage';

export interface ScoredRecipe {
  recipe: Recipe;
  score: number;
  matchReasons: string[];
}

/**
 * Calculates a local personalized recommendation score for each recipe based on:
 * - Profile favorite cuisines (+5 per match)
 * - Dietary preferences (+5 per match)
 * - Cooking level appropriateness (+2 per match)
 * - Similarity to saved recipes (+4)
 * - Similarity to recently viewed recipes (+3)
 * - Community Rating (>4.5 gives +2)
 */
export function getPersonalizedRecommendations(
  recipes: Recipe[],
  profile: LocalProfile,
  limit: number = 8
): ScoredRecipe[] {
  const historyIds = new Set(getHistory());
  const savedIds = new Set(getSavedRecipes());
  
  // Find cuisines from saved & viewed recipes
  const interactedCuisines = new Set<string>();
  recipes.forEach(r => {
    if (savedIds.has(r.id) || historyIds.has(r.id)) {
      interactedCuisines.add(r.cuisine.toLowerCase());
    }
  });

  const scored: ScoredRecipe[] = recipes.map(recipe => {
    let score = 0;
    const matchReasons: string[] = [];
    const recipeCuisine = recipe.cuisine.toLowerCase();

    // 1. Cuisine Match (+5)
    if (profile.favoriteCuisines.some(c => recipeCuisine.includes(c.toLowerCase()))) {
      score += 5;
      matchReasons.push(`Matches your love for ${recipe.cuisine}`);
    }

    // 2. Dietary Match (+5)
    if (profile.diet && profile.diet !== 'No Preference') {
      const matchesDiet = recipe.dietary?.some(d => d.toLowerCase().includes(profile.diet.toLowerCase()));
      if (matchesDiet) {
        score += 5;
        matchReasons.push(`Fits your ${profile.diet} diet`);
      }
    }

    // 3. Saved Recipe Similarity (+4)
    if (interactedCuisines.has(recipeCuisine) && !savedIds.has(recipe.id)) {
      score += 4;
      matchReasons.push(`Similar to your saved favorites`);
    }

    // 4. Viewed Recipe Similarity (+3)
    if (historyIds.has(recipe.id)) {
      score += 1; // minor recency boost
    } else if (interactedCuisines.has(recipeCuisine)) {
      score += 3;
    }

    // 5. Rating boost (+2 if >= 4.8, +1 if >= 4.5)
    if (recipe.rating >= 4.8) {
      score += 2;
      matchReasons.push(`Community top rated (${recipe.rating}★)`);
    } else if (recipe.rating >= 4.5) {
      score += 1;
    }

    // 6. Cooking Level match (+2)
    if (
      (profile.cookingLevel === 'Beginner' && recipe.difficulty === 'Easy') ||
      (profile.cookingLevel === 'Intermediate' && (recipe.difficulty === 'Easy' || recipe.difficulty === 'Medium')) ||
      (profile.cookingLevel === 'Advanced' && recipe.difficulty === 'Hard')
    ) {
      score += 2;
      matchReasons.push(`Tailored to ${profile.cookingLevel} level`);
    }

    // Baseline fallback reason if empty
    if (matchReasons.length === 0) {
      matchReasons.push(`Trending seasonal choice`);
      score += 1;
    }

    return {
      recipe,
      score,
      matchReasons,
    };
  });

  // Sort descending by score
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
