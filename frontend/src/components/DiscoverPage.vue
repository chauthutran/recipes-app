<template>
    <div className="flex flex-col flex-1">
        <!-- 🔍 Search + Filters -->
        <div class="mb-8">
            <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <!-- Search -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Recipes</label
                    >
                    <input
                        v-model="filters.search"
                        type="text"
                        placeholder="Search recipes..."
                        class="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <!-- Ingredients -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Ingredients</label
                    >
                    <input
                        v-model="filters.ingredients"
                        type="text"
                        placeholder="Ingredients (comma-separated)"
                        class="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <!-- Dietary Options -->

                <div class="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 class="text-lg font-semibold mb-2">Dietary</h3>
                    <div
                        class="grid justify-start grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] gap-x-3 gap-y-2"
                    >
                        <label
                            class="flex flex-row items-start gap-2 text-left"
                            v-for="option in dietaryOptions"
                            :key="option"
                        >
                            <input
                                type="checkbox"
                                v-model="filters.dietary"
                                :value="option"
                                class="w-1 mt-0.5"
                            />
                            <span
                                class="text-sm text-gray-700 whitespace-nowrap"
                                >{{ option }}</span
                            >
                        </label>
                    </div>
                </div>

                <!-- Categories -->
                <div class="col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 class="text-lg font-semibold mb-2">Categories</h3>
                    <div
                        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                    >
                        <label
                            class="flex items-center space-x-2"
                            v-for="category in categories"
                            :key="category._id"
                        >
                            <input
                                type="checkbox"
                                v-model="filters.category"
                                :value="category._id"
                                class="form-checkbox text-green-600"
                            />
                            <span class="text-sm text-gray-700">{{
                                category.name
                            }}</span>
                        </label>
                    </div>
                </div>

                <!-- Action Button -->
                <div class="col-span-1 md:col-span-2 lg:col-span-3">
                    <button
                        @click="fetchRecipes"
                        class="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md transition w-full sm:w-auto"
                    >
                        Search
                    </button>
                </div>
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
            <div v-else class="italic text-gray-500">
                No recipes found. Try adjusting your filters.
            </div>
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
import { useAppContext } from '../composables/useAppContext';
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
