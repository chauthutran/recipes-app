<!-- 
These are personalized for the logged-in user (if applicable), based on:
    Ingredients they like
    Previously viewed/cooked recipes
    Categories they follow
    ==> Purpose: Feels more tailored and keeps users engaged.
-->

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-if="recommendedRecipes === null" class="italic p-4">
            Loading ...
        </div>
        <div v-else-if="recommendedRecipes.length === 0" class="italic p-4">
            No recommended recipes found.
        </div>

        <RecipeCard
            v-else
            v-for="recipe in recommendedRecipes"
            :key="'trending_' + recipe._id"
            :recipe="recipe"
            @edit="onEdit"
            @delete="onShowDetails"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IRecipe } from '../../types/types';
import axios from 'axios';
import { useAuthContext } from '../../composables/useAuthContext';
import RecipeCard from '../recipes/RecipeCard.vue';

const { user } = useAuthContext();

const recommendedRecipes = ref<IRecipe[] | null>(null);
onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes/recommended/' + user.value?._id,
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
