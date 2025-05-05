<template>
    <table class="table-auto border-collapse w-full" style="font-family: cursive;">
        <thead>
            <tr class="bg-light-green text-dark-green border-b border-gray-300">
                <!-- aria-hidden="true" tells screen readers to ignore this header cell, suppressing the warning ethically. -->
                <th class="p-4 text-center" aria-hidden="true"></th>
                <th
                    v-for="mealType in MEAL_TYPES"
                    :key="mealType"
                    class="border-l-2 border-gray-600 p-4 text-center uppercase"
                >
                    {{ mealType }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="day in mealPlan.plan" :key="day.day" class="even:bg-light-green border-b border-gray-300">
                <td class="p-4 font-semibold text-orange-600">
                    {{ day.day }}
                </td>

                <td
                    v-for="mealType in MEAL_TYPES"
                    :key="mealType"
                    class="border-l-2 border-gray-600 p-4"
                >
                   <div v-for="(recipe, idx) in getRecipes(day.meals[mealType])" :key="idx">
                        <span v-if="recipe.name == '_'">{{ recipe.name }}</span>
                        <span v-else 
                            class="cursor-pointer hover:border-b hover:border-dark-green"
                            @click="openRecipeDetails(recipe)"
                        >
                            {{ recipe.name }}<br/>
                        </span>
                   </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { MEAL_TYPES } from '../../../../constants/constants';
import type { IRecipe } from '../../../../types/types';

const router = useRouter();

// import { computed } from 'vue';

defineProps<{
    mealPlan: any; // replace with your actual MealPlan type
}>();

// Format helper: show comma-separated recipe names
const getRecipes = (recipes: any[] | undefined): Partial<IRecipe>[] => {
    if (!recipes || recipes.length === 0) return [{name: "_"}];
    return recipes;
};

const openRecipeDetails = (recipe: Partial<IRecipe>) => {
    router.push(`/recipes/${recipe._id}`);
}
</script>