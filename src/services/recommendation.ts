import { Recipe, LocalProfile } from '../types';
import { getProfile, getHistory, getSavedRecipes } from '../utils/storage';

export interface ScoredRecipe {
  recipe: Recipe;
  score: number;
  matchReasons: string[];
}

/**
 * Calculates a local personalized recommendation score based on:
 * - Cuisine match (+5)
 * - Dietary preference match (+5)
 * - Saved recipe cuisine/tag similarity (+4)
 * - Recently viewed recipes similarity (+3)
 * - High rating > 4.7 (+2)
 * - Popularity / review count (+1 to +3)
 */
export function getPersonalizedRecommendations(
  allRecipes: Recipe[],
  limit: number = 8
): ScoredRecipe[] {
  const profile: LocalProfile = getProfile();
  const historyIds: string[] = getHistory();
  const savedIds: string[] = getSavedRecipes();

  // Find saved recipes to extract preferred tags and cuisines
  const savedRecipes = (allRecipes || []).filter((r) => r && savedIds.includes(r.id));
  const savedCuisines = new Set(savedRecipes.map((r) => (r.cuisine || '').toLowerCase()).filter(Boolean));
  const savedTags = new Set(savedRecipes.flatMap((r) => (r.tags || []).map((t) => t.toLowerCase())));

  // Find recently viewed recipes
  const viewedRecipes = (allRecipes || []).filter((r) => r && historyIds.includes(r.id));
  const viewedCuisines = new Set(viewedRecipes.map((r) => (r.cuisine || '').toLowerCase()).filter(Boolean));

  const scored: ScoredRecipe[] = (allRecipes || []).map((recipe) => {
    let score = 0;
    const matchReasons: string[] = [];
    const recipeCuisine = (recipe?.cuisine || '').toLowerCase();

    // 1. Favorite Cuisine Match (+5)
    const matchesFavCuisine = profile?.favoriteCuisines?.some(
      (c) => (c || '').toLowerCase() === recipeCuisine
    );
    if (matchesFavCuisine && recipe.cuisine) {
      score += 5;
      matchReasons.push(`Matches your favorite cuisine (${recipe.cuisine})`);
    }

    // 2. Dietary Preference Match (+5)
    if (profile?.diet && profile.diet !== 'No Preference') {
      const matchesDiet = recipe.dietary?.some(
        (d) => (d || '').toLowerCase() === (profile.diet || '').toLowerCase()
      );
      if (matchesDiet) {
        score += 5;
        matchReasons.push(`Fits your ${profile.diet} diet`);
      }
    }

    // 3. Saved Recipe Similarity (+4)
    if (recipeCuisine && savedCuisines.has(recipeCuisine) && !savedIds.includes(recipe.id)) {
      score += 4;
      if (!matchReasons.some((r) => r.includes('cuisine'))) {
        matchReasons.push(`Similar to recipes you saved in ${recipe.cuisine}`);
      }
    }

    const tagOverlap = recipe.tags?.filter((t) => savedTags.has((t || '').toLowerCase())).length || 0;
    if (tagOverlap > 0) {
      score += Math.min(tagOverlap * 1.5, 4);
    }

    // 4. Recently Viewed Cuisine Match (+3)
    if (recipeCuisine && viewedCuisines.has(recipeCuisine) && !historyIds.includes(recipe.id)) {
      score += 3;
      if (matchReasons.length < 2) {
        matchReasons.push(`Based on your recent browsing`);
      }
    }

    // 5. Rating Score (+2 for high ratings)
    const rRating = recipe.rating || 0;
    if (rRating >= 4.8) {
      score += 3;
    } else if (rRating >= 4.5) {
      score += 1.5;
    }

    // 6. Popularity Boost (+1 to +2)
    const rReviews = recipe.reviewCount || 0;
    if (rReviews > 200) {
      score += 2;
    } else if (rReviews > 80) {
      score += 1;
    }

    // 7. Cooking level alignment
    if (profile?.cookingLevel === 'Beginner' && recipe.difficulty === 'Easy') {
      score += 2;
      if (matchReasons.length < 2) {
        matchReasons.push(`Beginner-friendly step-by-step`);
      }
    }

    // Fallback reason if none matched
    if (matchReasons.length === 0) {
      matchReasons.push(`Trending in ${recipe.cuisine || 'World Cuisine'}`);
    }

    return {
      recipe,
      score,
      matchReasons,
    };
  });

  // Sort descending by calculated score
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
