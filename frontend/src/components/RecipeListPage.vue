<template>
    <div class="space-y-8">
        <!-- 🔍 Search + Filters -->
        <div className="mb-8">
            <h2
                className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
            >
            🧑‍🍳 Search Recipes
            </h2>
            <div class="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
                <input
                    v-model="filters.search"
                    type="text"
                    placeholder="Search recipes..."
                    class="border p-2 rounded w-full"
                />

                <input
                    v-model="filters.ingredients"
                    type="text"
                    placeholder="Ingredients (comma-separated)"
                    class="border p-2 rounded w-full"
                />

                <select v-model="filters.category" class="border p-2 rounded w-full">
                    <option value="">All Categories</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ cat }}
                    </option>
                </select>

                <select v-model="filters.dietary" class="border p-2 rounded w-full">
                    <option value="">All Diets</option>
                    <option v-for="option in dietaryOptions" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
                
                <!-- Action Button -->
                <button
                    @click="fetchRecipes"
                    class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-sm transition"
                >
                    Search
                </button>
            </div>
        </div>

        <!-- Results -->
        <div className="mb-8">
            <h2
                className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
            >
            🍛 Recipes
            </h2>
            <GridLayout v-if="recipes.length">
                <RecipeCard
                    v-for="recipe in recipes"
                    :key="recipe._id"
                    :recipe="recipe"
                />
            </GridLayout>
            <div v-else class="italic text-gray-500">No recipes found. Try adjusting your filters.</div>
        </div>

        <!-- 📄 Pagination -->
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
import GridLayout from './layout/GridLayout.vue';
import type { IRecipe } from '../types/types';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';

const recipes = ref<IRecipe[]>([]);
const page = ref(1);

const filters = ref({
    search: '',
    ingredients: '',
    category: '',
    dietary: '',
});

const categories = ['Italian', 'Asian', 'Mexican', 'Dessert'];
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
