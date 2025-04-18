<!--
Showcase recipes that are currently popular — these could be:
    Most viewed
    Most liked
    Most commented
    Frequently cooked
    ==> Purpose: It gives users a sense of what others are enjoying and builds curiosity.
-->

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div v-if="trendingRecipes === null" class="italic p-4">
            Loading ...
        </div>
        <div v-else-if="trendingRecipes.length === 0" class="italic p-4">
            No trending recipes found.
        </div>

        <RecipeCard
            v-for="recipe in trendingRecipes"
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
import RecipeCard from '../recipes/RecipeCard.vue';

const trendingRecipes = ref<IRecipe[] | null>(null);
onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes/trending?limit=10',
    );
    trendingRecipes.value = res.data;
    console.log(res.data);
});

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};
</script>
