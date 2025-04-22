<template>
    <div
        class="p-4 border-2 border-leaf-green rounded-md shadow-sm w-full h-full flex flex-col justify-between space-y-3 max-w-md"
    >
        <img
            v-if="recipe.imageUrl"
            :src="recipe.imageUrl"
            alt="Recipe Image"
            class="w-full h-48 object-cover"
        />

        <img
            v-else
            src="../../assets/default-recipe-image.png"
            alt="Recipe Image"
            class="w-full h-48 object-cover"
        />

        <div class="">
            <RecipeActionBar :data="recipe" />

            <h3 class="mt-4 text-lg font-semibold text-gray-800">
                {{ recipe.name }}
            </h3>
            <!-- <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                {{ recipe._id }}
            </p> -->
            <p class="text-gray-500 text-sm mt-2">
                Created at: {{ formatDate(recipe.createdAt) }}
            </p>

            <div class="mt-2 flex justify-between items-center">
                <button class="text-blue-500 hover:underline">Details</button>
                <button
                    @click="$emit('edit', recipe)"
                    class="text-blue-500 hover:underline"
                >
                    Edit
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IRecipe } from '../../types/types';
import { formatDate } from '../../utils/dateUtils';
import RecipeActionBar from './RecipeActionBar.vue';

defineProps<{
    recipe: IRecipe;
}>();

defineEmits<{
    (e: 'edit', recipe: IRecipe): void;
    (e: 'showDetails', recipe: IRecipe): void;
}>();
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
