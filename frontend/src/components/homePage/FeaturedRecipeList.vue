<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <p v-if="errMsg !== ''">{errMsg}</p>
        
        <RecipeCard
            v-for="recipe in featuredRecipes"
            :key="recipe._id"
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
const errMsg = ref('');

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};

onMounted(async () => {
    const res = await axios.get('http://localhost:3000/recipes/top-pick?top=3');
    featuredRecipes.value = res.data;
});
</script>
