import { Recipe } from '../types';

export interface ShareResult {
  success: boolean;
  message: string;
  copied?: boolean;
  url?: string;
}

/**
 * Generates a unique, persistent share URL for any recipe.
 * For custom or AI-generated recipes, serializes the recipe payload into the URL
 * so any recipient can open and view it instantly.
 */
export function generateRecipeShareUrl(recipe: Recipe): string {
  try {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const url = new URL(origin + pathname);

    url.searchParams.set('recipe', recipe.id);

    // If it's an AI-generated or custom-created user recipe, encode full recipe data
    if (recipe.isAiGenerated || recipe.id.startsWith('user-rec-') || recipe.id.startsWith('rec-ai-')) {
      const compactPayload = {
        id: recipe.id,
        title: recipe.title,
        subtitle: recipe.subtitle || '',
        description: recipe.description || '',
        imageUrl: recipe.imageUrl,
        cuisine: recipe.cuisine,
        category: recipe.category,
        difficulty: recipe.difficulty,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        servings: recipe.servings,
        tags: recipe.tags || [],
        dietary: recipe.dietary || [],
        nutrition: recipe.nutrition,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        chefTips: recipe.chefTips || [],
        winePairing: recipe.winePairing || '',
        author: recipe.author,
        isAiGenerated: recipe.isAiGenerated,
        rating: recipe.rating || 5,
        reviewCount: recipe.reviewCount || 1,
        createdAt: recipe.createdAt,
      };

      const jsonStr = JSON.stringify(compactPayload);
      // Safe UTF-8 Base64 encoding
      const encoded = btoa(encodeURIComponent(jsonStr));
      url.searchParams.set('data', encoded);
    }

    return url.toString();
  } catch (err) {
    console.error('Error generating share URL:', err);
    return window.location.href;
  }
}

/**
 * Parses URL search parameters for shared recipe data or recipe ID on app load.
 */
export function getSharedRecipeFromUrl(): { recipeId: string | null; sharedRecipe: Recipe | null } {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const recipeId = searchParams.get('recipe');
    const dataParam = searchParams.get('data') || searchParams.get('sharedRecipe');

    if (dataParam) {
      try {
        const jsonStr = decodeURIComponent(atob(dataParam));
        const parsed = JSON.parse(jsonStr);
        if (parsed && parsed.title && parsed.ingredients) {
          const recipe: Recipe = {
            id: parsed.id || `shared-${Date.now()}`,
            title: parsed.title,
            subtitle: parsed.subtitle || '',
            description: parsed.description || '',
            imageUrl: parsed.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
            cuisine: parsed.cuisine || 'Fusion',
            category: parsed.category || 'dinner',
            difficulty: parsed.difficulty || 'Medium',
            prepTimeMinutes: Number(parsed.prepTimeMinutes) || 15,
            cookTimeMinutes: Number(parsed.cookTimeMinutes) || 20,
            servings: Number(parsed.servings) || 4,
            tags: Array.isArray(parsed.tags) ? parsed.tags : ['Shared Recipe'],
            dietary: Array.isArray(parsed.dietary) ? parsed.dietary : [],
            nutrition: parsed.nutrition || { calories: 450, protein: 25, carbs: 40, fat: 18, fiber: 4, sugar: 3 },
            ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients : [],
            steps: Array.isArray(parsed.steps) ? parsed.steps : [],
            chefTips: Array.isArray(parsed.chefTips) ? parsed.chefTips : [],
            winePairing: parsed.winePairing,
            author: parsed.author || { name: 'Community Chef', avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80' },
            isAiGenerated: Boolean(parsed.isAiGenerated),
            isSaved: true,
            rating: Number(parsed.rating) || 5,
            reviewCount: Number(parsed.reviewCount) || 1,
            createdAt: parsed.createdAt || new Date().toISOString(),
          };
          return { recipeId: recipe.id, sharedRecipe: recipe };
        }
      } catch (decodeErr) {
        console.warn('Could not decode shared recipe data from URL:', decodeErr);
      }
    }

    return { recipeId, sharedRecipe: null };
  } catch (e) {
    return { recipeId: null, sharedRecipe: null };
  }
}

/**
 * Triggers native share sheet or copies unique URL to clipboard
 */
export async function shareRecipe(recipe: Recipe): Promise<ShareResult> {
  const shareUrl = generateRecipeShareUrl(recipe);
  const shareData = {
    title: `${recipe.title} - RecipeHub AI`,
    text: `Check out this ${recipe.cuisine} recipe: "${recipe.title}" on RecipeHub AI! (${recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins • ${recipe.difficulty})`,
    url: shareUrl,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, message: 'Shared successfully!', url: shareUrl };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { success: false, message: 'Share cancelled', url: shareUrl };
      }
    }
  }

  // Fallback: Copy link to clipboard
  try {
    await navigator.clipboard.writeText(shareUrl);
    return { success: true, message: 'Unique recipe link copied to clipboard!', copied: true, url: shareUrl };
  } catch (err) {
    return { success: false, message: 'Could not copy link to clipboard.', url: shareUrl };
  }
}

export function formatRecipeAsText(recipe: Recipe): string {
  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const shareUrl = generateRecipeShareUrl(recipe);

  let text = `🍳 ${recipe.title.toUpperCase()}\n`;
  if (recipe.subtitle) text += `${recipe.subtitle}\n`;
  text += `\n${recipe.description}\n\n`;
  text += `⏱ Total Time: ${totalTime} mins (Prep: ${recipe.prepTimeMinutes}m | Cook: ${recipe.cookTimeMinutes}m)\n`;
  text += `🍽 Servings: ${recipe.servings} | 📊 Calories: ${recipe.nutrition?.calories || 'N/A'} kcal\n`;
  text += `🌍 Cuisine: ${recipe.cuisine} | 👨‍🍳 Difficulty: ${recipe.difficulty}\n\n`;

  text += `📝 INGREDIENTS:\n`;
  recipe.ingredients.forEach((ing) => {
    text += ` • ${ing.amount} ${ing.unit} ${ing.name}\n`;
  });

  text += `\n🔥 INSTRUCTIONS:\n`;
  recipe.steps.forEach((step, idx) => {
    text += ` ${idx + 1}. ${step.instruction}${step.timerMinutes ? ` (${step.timerMinutes} mins)` : ''}\n`;
  });

  if (recipe.chefTips && recipe.chefTips.length > 0) {
    text += `\n💡 CHEF'S SECRET:\n`;
    recipe.chefTips.forEach((tip) => {
      text += ` • ${tip}\n`;
    });
  }

  if (recipe.winePairing) {
    text += `\n🍷 WINE PAIRING:\n ${recipe.winePairing}\n`;
  }

  text += `\n🔗 View full interactive recipe on RecipeHub AI:\n${shareUrl}`;
  return text;
}

export function getWhatsAppShareUrl(recipe: Recipe): string {
  const shareUrl = generateRecipeShareUrl(recipe);
  const text = encodeURIComponent(
    `🍳 *${recipe.title}*\n${recipe.subtitle || recipe.description}\n\n⏱ ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins • ${recipe.cuisine}\n\n👉 Cook this recipe on RecipeHub AI: ${shareUrl}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}

export function getTwitterShareUrl(recipe: Recipe): string {
  const shareUrl = generateRecipeShareUrl(recipe);
  const hashtag = recipe.cuisine.replace(/[^a-zA-Z0-9]/g, '');
  const text = encodeURIComponent(
    `Cooking "${recipe.title}" today on RecipeHub AI! 🧑‍🍳✨ #${hashtag} #RecipeHubAI`
  );
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`;
}

export function getFacebookShareUrl(recipe: Recipe): string {
  const shareUrl = generateRecipeShareUrl(recipe);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
}

export function getTelegramShareUrl(recipe: Recipe): string {
  const shareUrl = generateRecipeShareUrl(recipe);
  const text = encodeURIComponent(`🍳 ${recipe.title} - ${recipe.cuisine} Recipe`);
  return `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`;
}

export function getPinterestShareUrl(recipe: Recipe): string {
  const shareUrl = generateRecipeShareUrl(recipe);
  return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(recipe.imageUrl)}&description=${encodeURIComponent(recipe.title)}`;
}

export function getEmailShareUrl(recipe: Recipe): string {
  const shareUrl = generateRecipeShareUrl(recipe);
  const subject = encodeURIComponent(`Recipe: ${recipe.title} on RecipeHub AI`);
  const body = encodeURIComponent(
    `Hi!\n\nI wanted to share this delicious recipe for "${recipe.title}" from RecipeHub AI.\n\n` +
    `• Cuisine: ${recipe.cuisine}\n` +
    `• Total Time: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins\n` +
    `• Servings: ${recipe.servings}\n\n` +
    `View full recipe, step-by-step timers, and ingredients here:\n${shareUrl}\n\nHappy cooking!`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}
