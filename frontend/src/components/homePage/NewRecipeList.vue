<template>
    <h2
        class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
    >
        <img
            src="../../assets/recipe-book-svgrepo-com.svg"
            class="w-12"
            alt="new-recipes"
        />
        <div class="">New Recipes</div>
    </h2>

    <div v-if="recipes === null" class="italic p-4">Loading ...</div>
    <div v-else-if="recipes.length === 0" class="italic p-4">
        No new recipes found.
    </div>
    <RowGridLayout v-else>
        <RecipeCard
            v-for="recipe in recipes"
            :key="'new_' + recipe._id"
            :recipe="recipe"
        />
    </RowGridLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IRecipe } from '../../types/types';
import axios from 'axios';
import RecipeCard from '../recipes/RecipeCard.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import RowGridLayout from '../layout/RowGridLayout.vue';

const recipes = ref<IRecipe[] | null>(null);

onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes?page=1&limit=' + HOME_PAGE_RECIPE_LIMIT,
    );
    recipes.value = res.data;
});
</script>
