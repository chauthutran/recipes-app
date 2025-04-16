<template>
    <RecipeRating
        :rating="calculateAverageRating(data)"
        :ratingUserNo="data.ratings?.length"
    />
</template>

<script setup lang="ts">
import RecipeRating from './RecipeRating.vue';
import { calculateAverageRating } from '../../utils/recipeUtils';
import type { IRecipe } from '../../types/types';

defineProps<{
    data: IRecipe;
}>();
</script>
