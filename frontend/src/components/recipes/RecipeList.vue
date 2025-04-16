<template>
    <div v-if="recipes === null">Loading</div>
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <RecipeCard
            v-for="recipe in recipes"
            :key="recipe._id"
            :recipe="recipe"
            @edit="onEdit"
            @delete="onShowDetails"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RecipeCard from './RecipeCard.vue';
import type { IRecipe } from '../../types/types'; // adjust the path if types.ts is elsewhere
import { onMounted } from 'vue';
import axios from 'axios';

const recipes = ref<IRecipe[] | null>(null);
onMounted(async () => {
    const res = await axios.get('http://localhost:3000/recipes');
    recipes.value = res.data;
});

const onEdit = (recipe: IRecipe) => {
    console.log('edit: ', recipe);
};

const onShowDetails = (recipe: IRecipe) => {
    console.log('showDetails: ', recipe);
};
</script>
