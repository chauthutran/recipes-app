<!--
Showcase recipes that are currently popular — these could be:
    Most viewed
    Most liked
    Most commented
    Frequently cooked
    ==> Purpose: It gives users a sense of what others are enjoying and builds curiosity.
-->

<template>
    <h2
        class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
    >
        <img
            src="../../assets/tag-price-svgrepo-com.svg"
            class="w-10"
            alt="new-recipes"
        />
        <div class="">Trending Recipes</div>
    </h2>

    <div v-if="trendingRecipes === null" class="italic p-4">Loading ...</div>
    <div v-else-if="trendingRecipes.length === 0" class="italic p-4">
        No trending recipes found.
    </div>

    <RowGridLayout v-else>
        <RecipeCard
            v-for="recipe in trendingRecipes"
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
import RecipeCard from '../recipes/RecipeCard.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import RowGridLayout from '../layout/RowGridLayout.vue';

const trendingRecipes = ref<IRecipe[] | null>(null);
onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes/trending?limit=' +
            HOME_PAGE_RECIPE_LIMIT,
    );
    trendingRecipes.value = res.data;
});

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};
</script>
