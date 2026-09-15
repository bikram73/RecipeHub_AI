import { Recipe } from '../types';

export interface ShareResult {
  success: boolean;
  message: string;
  copied?: boolean;
}

export async function shareRecipe(recipe: Recipe): Promise<ShareResult> {
  const shareData = {
    title: `${recipe.title} - RecipeHub AI`,
    text: `Check out this delicious ${recipe.cuisine} recipe: "${recipe.title}" on RecipeHub AI! (${recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins • ${recipe.difficulty})`,
    url: window.location.href,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, message: 'Shared successfully!' };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { success: false, message: 'Share cancelled' };
      }
    }
  }

  // Fallback: Copy summary link to clipboard
  try {
    const textToCopy = `${recipe.title}\n${recipe.description}\n\n⏱ Total Time: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins | 🍽 Servings: ${recipe.servings}\n\nShared from RecipeHub AI: ${window.location.origin}`;
    await navigator.clipboard.writeText(textToCopy);
    return { success: true, message: 'Recipe details & link copied to clipboard!', copied: true };
  } catch (err) {
    return { success: false, message: 'Could not copy to clipboard.' };
  }
}

export function getWhatsAppShareUrl(recipe: Recipe): string {
  const text = encodeURIComponent(`🍳 *${recipe.title}*\n${recipe.description}\n\nCheck out this recipe on RecipeHub AI: ${window.location.origin}`);
  return `https://api.whatsapp.com/send?text=${text}`;
}

export function getTwitterShareUrl(recipe: Recipe): string {
  const text = encodeURIComponent(`Cooking "${recipe.title}" today! Found on RecipeHub AI 🧑‍🍳✨ #RecipeHubAI #HomeCooking #${recipe.cuisine.replace(/\s+/g, '')}`);
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.origin)}`;
}

export function getEmailShareUrl(recipe: Recipe): string {
  const subject = encodeURIComponent(`Recipe: ${recipe.title}`);
  const body = encodeURIComponent(`Hi!\n\nI wanted to share this recipe for "${recipe.title}" with you from RecipeHub AI.\n\nDescription: ${recipe.description}\nCooking Time: ${recipe.cookTimeMinutes} mins\nDifficulty: ${recipe.difficulty}\n\nExplore more at: ${window.location.origin}`);
  return `mailto:?subject=${subject}&body=${body}`;
}
