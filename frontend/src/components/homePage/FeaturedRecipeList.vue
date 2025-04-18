<template>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <RecipeCard
            v-for="recipe in featuredRecipes"
            :key="'feature_' + recipe._id"
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

const featuredRecipes = ref<IRecipe[] | null>(null);

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};

onMounted(async () => {
    const res = await axios.get(
        'http://localhost:3000/recipes/top-pick?top=10',
    );
    featuredRecipes.value = res.data;
});
</script>
