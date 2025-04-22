<template>
    <LoadingCircle v-if="!recipe" />
    
    <div
        v-else
        class="p-4 border-2 border-leaf-green rounded-md shadow-sm w-full space-y-3"
    >
        <h2 className="text-xl font-semibold">{{ recipe.name }}</h2>
        
        <RecipeImage :recipe="recipe" />

        <div className="mt-2">
            <strong>Ingredients:</strong>
            <ul className="list-disc pl-5">
                <li
                    v-for="(ingredient, index) in recipe.ingredients"
                    :key="'igd_' + index"
                >
                    {{ ingredient }}
                </li>
            </ul>
        </div>
        <div className="mt-2">
            <strong>Method:</strong>
            <ol className="list-decimal pl-5">
                <li v-for="(step, index) in recipe.method" :key="'mtd_' + index">
                    {{ step }}
                </li>
            </ol>
        </div>
        <p className="text-gray-500 text-sm mt-2">
            Created at: {{ formatDate(recipe.createdAt!) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IRecipe } from '../../types/types';
import { useRoute } from 'vue-router';
import LoadingCircle from '../basics/LoadingCircle.vue';
import RecipeImage from '../basics/RecipeImage.vue';
import { formatDate } from '../../utils/dateUtils';

const route = useRoute();
const recipeId = route.params.id;

const recipe = ref<IRecipe | null>(null);

onMounted(async () => {
    const res = await fetch(`http://localhost:3000/recipes/${recipeId}`);
    recipe.value = await res.json();
})
</script>
