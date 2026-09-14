import React, { useState, useMemo } from 'react';
import { GroceryItem } from '../types';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  Share2, 
  CheckCheck,
  Sparkles 
} from 'lucide-react';

interface GroceryListViewProps {
  groceryItems: GroceryItem[];
  onToggleGroceryItem: (id: string) => void;
  onAddGroceryItem: (name: string, amount: string, category: GroceryItem['category']) => void;
  onDeleteGroceryItem: (id: string) => void;
  onClearCompleted: () => void;
}

export const GroceryListView: React.FC<GroceryListViewProps> = ({
  groceryItems,
  onToggleGroceryItem,
  onAddGroceryItem,
  onDeleteGroceryItem,
  onClearCompleted,
}) => {
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemAmount, setNewItemAmount] = useState<string>('1');
  const [newItemCategory, setNewItemCategory] = useState<GroceryItem['category']>('Produce');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  const categories: GroceryItem['category'][] = [
    'Produce',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Pantry & Grains',
    'Spices & Condiments',
    'Bakery',
    'Other',
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddGroceryItem(newItemName.trim(), newItemAmount.trim() || '1 item', newItemCategory);
      setNewItemName('');
      setNewItemAmount('1');
    }
  };

  const handleCopyList = () => {
    const lines = groceryItems.map(
      (item) => `${item.completed ? '[x]' : '[ ]'} ${item.name} (${item.amount}) - ${item.category}`
    );
    navigator.clipboard.writeText(`🛒 RecipeHub AI Shopping List:\n\n${lines.join('\n')}`);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const completedCount = groceryItems.filter(i => i.completed).length;
  const totalCount = groceryItems.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, GroceryItem[]> = {};
    categories.forEach(cat => { groups[cat] = []; });
    groceryItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [groceryItems]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-purple-600" />
            <span>Smart Supermarket Bag</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Grocery & Shopping List
          </h1>
          <p className="text-sm text-stone-600">
            Aisle-organized shopping checklist populated from your planned recipes and pantry gaps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {totalCount > 0 && (
            <>
              <button
                id="copy-grocery-list-btn"
                onClick={handleCopyList}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                title="Copy formatted list"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy List</span>
              </button>

              {completedCount > 0 && (
                <button
                  id="clear-completed-grocery-btn"
                  onClick={onClearCompleted}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Checked ({completedCount})</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {copiedToast && (
        <div className="p-3.5 bg-stone-900 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-amber-400" />
          Full grocery checklist copied to your clipboard!
        </div>
      )}

      {/* Progress & Quick Stats Card */}
      {totalCount > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-stone-800">
              {completedCount} of {totalCount} items purchased ({Math.round(progressPercent)}%)
            </span>
            <span className="text-stone-400 font-medium">
              {totalCount - completedCount} items remaining
            </span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Add Custom Item Form */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl border border-stone-200 shadow-xs">
        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2.5">
          <input
            id="new-grocery-item-input"
            type="text"
            placeholder="Add custom item (e.g. Organic oat milk)..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />

          <input
            type="text"
            placeholder="Qty (e.g. 2 cartons)"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="w-full sm:w-32 px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as any)}
            className="px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            type="submit"
            id="add-custom-grocery-btn"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </form>
      </div>

      {/* Aisle Categorized Grocery List */}
      {totalCount === 0 ? (
        <div className="text-center py-16 px-4 bg-stone-50 rounded-3xl border border-dashed border-stone-300 space-y-3">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-800 text-base">Your Grocery Bag is Empty</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Add ingredients from any recipe modal, missing items from your pantry, or type custom items above.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => {
            const items = groupedItems[category];
            if (!items || items.length === 0) return null;

            return (
              <div key={category} className="p-5 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span>{category}</span>
                  </h3>
                  <span className="text-xs text-stone-400 font-medium">
                    {items.filter(i => i.completed).length} / {items.length} done
                  </span>
                </div>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                        item.completed
                          ? 'bg-stone-50/70 border-stone-200 text-stone-400'
                          : 'bg-white border-stone-200/80 hover:border-purple-300'
                      }`}
                    >
                      <div
                        onClick={() => onToggleGroceryItem(item.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1 select-none"
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'border-stone-300 bg-white'
                        }`}>
                          {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div>
                          <span className={`text-sm font-medium block ${item.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                            {item.name}
                          </span>
                          {item.recipeSource && (
                            <span className="text-[10px] text-stone-400 block">
                              From: {item.recipeSource}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600">
                          {item.amount}
                        </span>
                        <button
                          onClick={() => onDeleteGroceryItem(item.id)}
                          className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
