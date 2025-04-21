<!-- Recipes that are saved/bookmarked the most. -->
<template>
    <h2
        class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
    >
        <img src="../../assets/heart-love-marriage-29-svgrepo-com.svg" class="w-12" alt="new-recipes" /> 
        <div class="">User Favorites</div>
    </h2>
    
    <div v-if="recipes === null" class="italic p-4">
        Loading ...
    </div>
    <div v-else-if="recipes.length === 0" class="italic p-4">
        No new recipes found.
    </div>
    <RowGridLayout v-else>
        <RecipeCard
            v-for="recipe in recipes"
            :key="'new_' + recipe._id"
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
import RecipeCard from '../recipes/RecipeCard.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import RowGridLayout from '../layout/RowGridLayout.vue';

const recipes = ref<IRecipe[] | null>(null);

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};

onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes/favorites?limit=' + HOME_PAGE_RECIPE_LIMIT,
    );
    recipes.value = res.data;
});
</script>
