<!-- 
These are personalized for the logged-in user (if applicable), based on:
    Ingredients they like
    Previously viewed/cooked recipes
    Categories they follow
    ==> Purpose: Feels more tailored and keeps users engaged.

**********************************
Common Strategies for Recommendation
    By user’s previous saves or ratings (collaborative filtering-like):
    If a user liked/saved recipes with certain categories, meal types, or dietary restrictions, suggest similar ones.
    By popular categories or trending ones (content-based):
    Recommend based on what’s hot in the same category.
    Cold start (no user activity yet)?
    Show popular or editor’s picks.
-->

<template>
     <h2
        className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
    >
        Recommended Recipes
    </h2>
    <div v-if="recommendedRecipes === null" class="italic p-4">
        Loading ...
    </div>
    <div v-else-if="recommendedRecipes.length === 0" class="italic p-4">
        No recommended recipes found.
    </div>

    <RowGridLayout v-else>
        <RecipeCard
            v-for="recipe in recommendedRecipes"
            :key="'trending_' + recipe._id"
            :recipe="recipe"
            @edit="onEdit"
            @delete="onShowDetails"
        />
    </RowGridLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IRecipe } from '../../types/types';
import axios from 'axios';
import { useAuthContext } from '../../composables/useAuthContext';
import RecipeCard from '../recipes/RecipeCard.vue';
import GridLayout from '../layout/GridLayout.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import RowGridLayout from '../layout/RowGridLayout.vue';

const { user } = useAuthContext();

const recommendedRecipes = ref<IRecipe[] | null>(null);
onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes/recommended/' + user.value?._id + "?limit=" + HOME_PAGE_RECIPE_LIMIT,
    );
    recommendedRecipes.value = res.data;
});

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};
</script>
