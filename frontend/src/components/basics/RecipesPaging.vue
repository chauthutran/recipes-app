<template>
    <div className="mb-8">
        <GridLayout v-if="recipes.length">
            <RecipeCard
                v-for="recipe in recipes"
                :key="'search_' + recipe._id"
                :recipe="recipe"
                @edit="console.log('edit')"
                @delete="console.log('details')"
            />
        </GridLayout>
        <div v-else class="italic text-gray-500">No recipes found.</div>
    </div>

    <!-- Pagination -->
    <section class="flex justify-center items-center space-x-4 mt-6">
        <button
            @click="$emit('update:page', page - 1)"
            :disabled="page <= 1"
            class="px-4 py-2 border rounded disabled:opacity-50"
        >
            Prev
        </button>
        <span class="font-medium text-gray-700">Page {{ page }}</span>
        <button
            @click="$emit('update:page', page + 1)"
            class="px-4 py-2 border rounded"
        >
            Next
        </button>
    </section>
</template>

<script setup lang="ts">
import type { IRecipe } from '../../types/types';
import GridLayout from '../layout/GridLayout.vue';
import RecipeCard from '../recipes/RecipeCard.vue';

defineProps<{
    recipes: IRecipe[];
    page: number;
}>();

defineEmits<{
    (e: 'update:page', value: number): void;
}>();
</script>
