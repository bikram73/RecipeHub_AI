import React, { useState } from 'react';
import { Bookmark, Plus, Check, FolderPlus, X } from 'lucide-react';
import { Collection, Recipe } from '../types';
import { getCollections, saveCollections, logActivity } from '../utils/storage';

interface AddToCollectionModalProps {
  isOpen: boolean;
  recipe: Recipe | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({
  isOpen,
  recipe,
  onClose,
  onSuccess,
}) => {
  const [collections, setCollections] = useState<Collection[]>(getCollections());
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  if (!isOpen || !recipe) return null;

  const handleToggleRecipeInCollection = (colId: string) => {
    const updated = collections.map((col) => {
      if (col.id === colId) {
        const has = col.recipeIds.includes(recipe.id);
        const newIds = has
          ? col.recipeIds.filter((id) => id !== recipe.id)
          : [...col.recipeIds, recipe.id];
        return { ...col, recipeIds: newIds, updatedAt: new Date().toISOString() };
      }
      return col;
    });

    setCollections(updated);
    saveCollections(updated);
    logActivity({
      type: 'created_collection',
      title: 'Collection Updated',
      description: `Updated collection with "${recipe.title}"`,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
    });
    onSuccess?.();
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;

    const newCol: Collection = {
      id: `col-${Date.now()}`,
      name: newColName.trim(),
      description: newColDesc.trim() || 'Curated home collection',
      coverImage: recipe.imageUrl,
      recipeIds: [recipe.id],
      createdAt: new Date().toISOString(),
    };

    const updated = [newCol, ...collections];
    setCollections(updated);
    saveCollections(updated);
    setNewColName('');
    setNewColDesc('');
    setShowCreateNew(false);
    logActivity({
      type: 'created_collection',
      title: 'Created Collection',
      description: `Created "${newCol.name}" with "${recipe.title}"`,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
    });
    onSuccess?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#fff8f5] text-[#9f3d00] flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Save to Collection</h3>
              <p className="text-xs text-gray-500 truncate max-w-[240px]">{recipe.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collections List */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          {collections.map((col) => {
            const isInside = col.recipeIds.includes(recipe.id);
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => handleToggleRecipeInCollection(col.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isInside
                    ? 'border-[#9f3d00] bg-[#fff8f5] text-gray-900 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {col.coverImage ? (
                    <img
                      src={col.coverImage}
                      alt={col.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                      {col.name.slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-sm">{col.name}</h4>
                    <p className="text-xs text-gray-500">{col.recipeIds.length} recipes</p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isInside
                      ? 'bg-[#9f3d00] border-[#9f3d00] text-white'
                      : 'border-gray-300 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}

          {/* Create New Toggle */}
          {!showCreateNew ? (
            <button
              type="button"
              onClick={() => setShowCreateNew(true)}
              className="w-full py-3 px-4 border border-dashed border-gray-300 hover:border-[#9f3d00] text-gray-700 hover:text-[#9f3d00] rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer bg-gray-50/50 hover:bg-[#fff8f5]"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Collection</span>
            </button>
          ) : (
            <form onSubmit={handleCreateCollection} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">New Collection</span>
                <button
                  type="button"
                  onClick={() => setShowCreateNew(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
              <input
                type="text"
                required
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder="e.g. 🌶️ Weekend Spices"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] bg-white"
              />
              <input
                type="text"
                value={newColDesc}
                onChange={(e) => setNewColDesc(e.target.value)}
                placeholder="Short description (optional)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9f3d00] bg-white"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#9f3d00] hover:bg-[#c74e00] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Create & Add Recipe</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#9f3d00] hover:bg-[#c74e00] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
