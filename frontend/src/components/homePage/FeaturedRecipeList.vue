<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <p v-if="errMsg !== ''">{errMsg}</p>
        <div 
            v-for="recipe in featuredRecipes"
            key={recipe._id} class="bg-white p-4 rounded shadow">
            <Image
                v-if="recipe.imageUrl"
                :src="recipe.imageUrl"
                :alt="recipe.name"
                width="300"
                height="200"
                class="rounded mb-4"
            />
            <Image
                v-else
                src="/images/default-recipe-image.png"
                alt="default-recipe-image"
                width="300"
                height="200"
            />

            <h3 class="text-xl font-bold">{{ recipe.name }}</h3>
            <RecipeActionBar data={recipe} />
            <p class="text-gray-500 text-sm mt-2">Created at: {{ new Date(recipe.
                createdAt!).toLocaleString() }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IRecipe } from '../../types/types';
import axios from 'axios';

const featuredRecipes = ref<IRecipe[] | null>(null);
const errMsg = ref("");

onMounted(async () => {
    const res = await axios.get("http://localhost:3000/recipes/top-pick?top=3");
    featuredRecipes.value = res.data;
})

</script>