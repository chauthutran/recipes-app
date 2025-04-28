<template>
    <div class="p-6" id="meal-plan">
        <!-- Title -->
        <div class="flex justify-between items-center mb-6">
            <button
                @click="exportToPDF"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
            >
                Export to PDF
            </button>
        </div>

        <!-- Recipes to Drag -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Available Recipes</h2>
            <div>
                <label
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                >
                    Search Recipes
                </label>
                <div class="flex space-x-3">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="e.g. Pasta, Chicken Curry..."
                        class="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <!-- Search Button -->
                    <div class="text-left">
                        <button
                            @click="fetchRecipes"
                            class="bg-leaf-green hover:bg-green-700 text-white px-6 py-2 rounded shadow-sm transition whitespace-nowrap"
                        >
                            Search Recipes
                        </button>
                    </div>
                </div>
            </div>
            <Draggable
                :list="recipes"
                :group="{name: 'recipes', pull: 'clone', put: false}"
                :clone="cloneRecipe"
                item-key="id"
                class="flex flex-wrap gap-4"
            >
                <template #item="{ element }">
                    <div
                        class="p-3 bg-gray-100 rounded shadow-md w-40 text-center cursor-grab"
                    >
                        <!-- <RecipeImage :recipe="element" :size="'h-10'" /> -->
                        {{ element.name }}
                    </div>
                </template>
            </Draggable>
        </div>

        <!-- Weekly Calendar -->
        <div class="grid grid-cols-7 gap-4">
            <div
                v-for="day in daysOfWeek"
                :key="day"
                class="border p-4 min-h-[200px] bg-white rounded shadow"
            >
                <h3 class="font-bold mb-3">{{ day }}</h3>

                <Draggable
                    :list="mealPlan[day]"
                    group="recipes"
                    item-key="id"
                    class="space-y-2 min-h-[100px]"
                    @change="updateMealPlan"
                >
                    <template #item="{ element }">
                        <div class="p-2 bg-green-100 rounded">
                            {{ element.name }}
                        </div>
                    </template>
                </Draggable>
            </div>
        </div>

        <!-- Shopping List -->
        <div class="mt-10">
            <h2 class="text-xl font-semibold mb-2">Shopping List</h2>
            <ul class="list-disc list-inside">
                <li v-for="item in shoppingList" :key="item">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import VueDraggableNext from 'vuedraggable';
import html2pdf from 'html2pdf.js';
import type { IRecipe } from '../types/types';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import { searchRecipes } from '../utils/request/recipeRequest';
import RecipeImage from './basics/RecipeImage.vue';


const Draggable = VueDraggableNext;

// Days of the week
const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const searchQuery = ref("");
const page = ref(1);
const errMsg = ref('');

// Recipes available
const recipes = ref<IRecipe[]>([]);

const fetchRecipes = async () => {
    const params = {
        search: searchQuery.value,
        limit: HOME_PAGE_RECIPE_LIMIT,
        page: page.value,
    };
    const responseData = await searchRecipes(params);

    if (responseData.success) {
        recipes.value = responseData.data!;
    } else {
        errMsg.value = responseData.errMsg!;
    }
};

// Meal Plan structure
const mealPlan = ref<
    Record<string, { id: number; name: string; ingredients: string[] }[]>
>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
});

// Update meal plan (optional logic if needed)
function updateMealPlan() {
    // Meal plan updated
}

function cloneRecipe(recipe: IRecipe) {
    // return a fresh copy when dragging
  return { ...recipe };
}

// Computed Shopping List
const shoppingList = computed(() => {
    const allIngredients: string[] = [];
    for (const day in mealPlan.value) {
        for (const recipe of mealPlan.value[day]) {
            allIngredients.push(...recipe.ingredients);
        }
    }
    return [...new Set(allIngredients)]; // Remove duplicates
});

// Export to PDF
function exportToPDF() {
    const element = document.getElementById('meal-plan');
    if (element) {
        html2pdf().from(element).save('meal-plan.pdf');
    }
}

// Whenever page changes (e.g., user clicks 'Next' or 'Prev'), call the fetchRecipes() function
watch(page, fetchRecipes);

</script>

<style scoped>
/* Optional: better cursor on drag */
[v-cloak] {
    display: none;
}
</style>
