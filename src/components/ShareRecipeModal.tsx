import React, { useState } from 'react';
import { Recipe } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Send, 
  Mail, 
  FileText, 
  Printer, 
  Sparkles,
  ExternalLink,
  Clock,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { 
  generateRecipeShareUrl, 
  formatRecipeAsText, 
  getWhatsAppShareUrl, 
  getTwitterShareUrl, 
  getFacebookShareUrl, 
  getTelegramShareUrl, 
  getEmailShareUrl,
  shareRecipe
} from '../services/share';

interface ShareRecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareRecipeModal: React.FC<ShareRecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !recipe) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const shareUrl = generateRecipeShareUrl(recipe);
  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleCopyFormattedText = async () => {
    try {
      const fullText = formatRecipeAsText(recipe);
      await navigator.clipboard.writeText(fullText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleNativeShare = async () => {
    await shareRecipe(recipe);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="share-recipe-modal"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e1bfb2]/60 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e1bfb2]/30 flex items-center justify-between bg-[#faf6f3]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#9f3d00] text-white">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#201a17]">Share Recipe</h3>
              <p className="text-xs text-[#594137]">Generate a unique link to share with anyone</p>
            </div>
          </div>
          <button
            id="close-share-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Recipe Card Preview */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#fef1ea]/60 border border-[#9f3d00]/20">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs border border-white"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 bg-[#9f3d00] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                  {recipe.cuisine}
                </span>
                {recipe.isAiGenerated && (
                  <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-md flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                )}
              </div>
              <h4 className="font-bold text-sm text-[#201a17] truncate leading-tight">{recipe.title}</h4>
              <div className="flex items-center gap-3 text-xs text-[#594137] mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#9f3d00]" /> {totalTime}m
                </span>
                {recipe.nutrition?.calories && (
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#9f3d00]" /> {recipe.nutrition.calories} kcal
                  </span>
                )}
                <span>• {recipe.servings} servings</span>
              </div>
            </div>
          </div>

          {/* Unique Share Link Box */}
          <div>
            <label className="block text-xs font-bold text-[#201a17] uppercase tracking-wider mb-1.5">
              Unique Shareable Link
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="w-full bg-[#faf6f3] border border-[#e1bfb2] text-[#201a17] text-xs rounded-xl px-3.5 py-2.5 font-mono truncate focus:outline-none focus:ring-2 focus:ring-[#9f3d00]/30"
                />
              </div>
              <button
                id="copy-share-link-btn"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  copiedLink
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#9f3d00] hover:bg-[#c74e00] text-white shadow-xs'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            {copiedLink && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Link copied! Anyone who opens this link will view this exact recipe.
              </p>
            )}
          </div>

          {/* Social Share Grid */}
          <div>
            <label className="block text-xs font-bold text-[#201a17] uppercase tracking-wider mb-2">
              Share Directly to Platforms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* WhatsApp */}
              <a
                href={getWhatsAppShareUrl(recipe)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-800 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
              >
                <div className="p-2 rounded-full bg-emerald-600 text-white group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">WhatsApp</span>
              </a>

              {/* Twitter / X */}
              <a
                href={getTwitterShareUrl(recipe)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
              >
                <div className="p-2 rounded-full bg-stone-900 text-white group-hover:scale-110 transition-transform">
                  <Twitter className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">X (Twitter)</span>
              </a>

              {/* Telegram */}
              <a
                href={getTelegramShareUrl(recipe)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 text-sky-800 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
              >
                <div className="p-2 rounded-full bg-sky-500 text-white group-hover:scale-110 transition-transform">
                  <Send className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Telegram</span>
              </a>

              {/* Email */}
              <a
                href={getEmailShareUrl(recipe)}
                className="p-3 rounded-2xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/80 text-amber-900 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
              >
                <div className="p-2 rounded-full bg-[#9f3d00] text-white group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Email</span>
              </a>
            </div>
          </div>

          {/* Additional Quick Actions */}
          <div className="pt-3 border-t border-[#e1bfb2]/30 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleCopyFormattedText}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                copiedText
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-[#faf6f3] text-[#594137] border-[#e1bfb2]'
              }`}
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Full Recipe Copied!</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-[#9f3d00]" />
                  <span>Copy Recipe Text</span>
                </>
              )}
            </button>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="py-2.5 px-4 rounded-xl border border-[#e1bfb2] bg-white hover:bg-[#faf6f3] text-[#594137] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#9f3d00]" />
                <span>Device Share</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl border border-[#e1bfb2] bg-white hover:bg-[#faf6f3] text-[#594137] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#faf6f3] border-t border-[#e1bfb2]/30 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
