import React from 'react';
import { CreateEditRecipeModal } from './CreateEditRecipeModal';
import { Recipe } from '../types';

interface CreateRecipeModalProps {
  isOpen?: boolean;
  recipeToEdit?: Recipe | null;
  onClose: () => void;
  onSaveRecipe: (recipe: Recipe) => void;
}

export const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  isOpen = true,
  recipeToEdit,
  onClose,
  onSaveRecipe,
}) => {
  return (
    <CreateEditRecipeModal
      isOpen={isOpen}
      recipeToEdit={recipeToEdit}
      onClose={onClose}
      onSave={onSaveRecipe}
    />
  );
};
