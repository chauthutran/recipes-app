<template>
    <div className="flex flex-col flex-1">
        <!-- Filters Section -->
        <section class="mb-10 grid gap-3 grid-cols-2 items-stretch">
            <!-- Search -->
            <div>
                <label
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                >
                    Search Recipes
                </label>
                <input
                    v-model="filters.search"
                    type="text"
                    placeholder="e.g. Pasta, Chicken Curry..."
                    class="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <!-- Ingredients -->
            <div>
                <label
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                >
                    Ingredients
                </label>
                <input
                    v-model="filters.ingredients"
                    type="text"
                    placeholder="e.g. tomato, garlic"
                    class="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
            </div>

            <!-- Categories Filters -->
            <div class="flex flex-col h-full">
                <label
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                    >Categories</label
                >
                <div
                    class="flex flex-wrap gap-3 border border-gray-200 p-3 rounded-md bg-gray-50 space-x-5 whitespace-nowrap flex-1"
                >
                    <label
                        v-for="category in categories"
                        :key="category._id"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <input
                            type="checkbox"
                            v-model="filters.category"
                            :value="category._id"
                            class="form-checkbox text-green-600"
                        />
                        {{ category.name }}
                    </label>
                </div>
            </div>

            <!-- Dietary Filters -->
            <div class="flex flex-col h-full">
                <label
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                    >Dietary Preferences</label
                >
                <div
                    class="flex flex-wrap gap-3 border border-gray-200 p-3 rounded-md bg-gray-50 space-x-5 whitespace-nowrap flex-1"
                >
                    <label
                        v-for="option in dietaryOptions"
                        :key="option"
                        class="flex items-center gap-2 text-sm text-gray-800"
                    >
                        <input
                            type="checkbox"
                            v-model="filters.dietary"
                            :value="option"
                            class="form-checkbox text-green-600"
                        />
                        {{ option }}
                    </label>
                </div>
            </div>

            <!-- Search Button -->
            <div class="text-left">
                <button
                    @click="fetchRecipes"
                    class="mt-2 bg-leaf-green hover:bg-green-700 text-white px-6 py-2 rounded shadow-sm transition"
                >
                    Search Recipes
                </button>
            </div>
        </section>

        <!-- Results -->
        <div className="mb-8">
            <h2
                className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit flex space-x-4 whitespace-nowrap items-center pr-8"
            >
                <img
                    src="../assets/recipe-book-svgrepo-com.svg"
                    alt="search_result"
                    class="w-10"
                />
                <div>Search Result</div>
            </h2>
            <RecipesGridLayout v-if="recipes.length">
                <RecipeCard
                    v-for="recipe in recipes"
                    :key="recipe._id"
                    :recipe="recipe"
                />
            </RecipesGridLayout>
            <div v-else class="italic text-gray-500">
                No recipes found. Try adjusting your filters.
            </div>
        </div>

        <!-- Pagination -->
        <section class="flex justify-center items-center space-x-4 mt-6">
            <button
                @click="page--"
                :disabled="page <= 1"
                class="px-4 py-2 border rounded disabled:opacity-50"
            >
                Prev
            </button>
            <span class="font-medium text-gray-700">Page {{ page }}</span>
            <button @click="page++" class="px-4 py-2 border rounded">
                Next
            </button>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import RecipeCard from './recipes/RecipeCard.vue';
import RecipesGridLayout from './layout/RecipesGridLayout.vue';
import type { IRecipe } from '../types/types';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import { useAppContext } from '../hooks/useAppContext';
import qs from 'qs';

const { categories } = useAppContext();
const recipes = ref<IRecipe[]>([]);
const page = ref(1);

const filters = ref({
    search: '',
    ingredients: '',
    category: [] as string[],
    dietary: [] as string[],
});

const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
];

const fetchRecipes = async () => {
    const res = await axios.get('http://localhost:3000/recipes/query', {
        params: {
            search: filters.value.search,
            ingredients: filters.value.ingredients
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean),
            categories: filters.value.category,
            dietary: filters.value.dietary,
            limit: HOME_PAGE_RECIPE_LIMIT,
            page: page.value,
        },
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'comma' }),
    });

    recipes.value = res.data;
};

// Whenever page changes (e.g., user clicks 'Next' or 'Prev'), call the fetchRecipes() function
watch(page, fetchRecipes);
</script>

<style scoped>
input,
select {
    width: 100%;
}
</style>
