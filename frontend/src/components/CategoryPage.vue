<template>
    <div className="mb-8 w-full">
        <!-- Categories -->

        <CategoryNav @itemsOnClick="handleCategoryOnClick" />

        <!-- Search -->
        <div class="mt-5">
            <label
                class="block text-sm font-medium mb-1 text-left whitespace-nowrap text-leaf-green"
            >
                Search by name
            </label>
            <div class="flex justify-between space-x-3">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="e.g. Pasta, Chicken Curry..."
                    class="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />

                <button
                    @click="fetchRecipes"
                    class="bg-leaf-green hover:bg-green-700 text-white px-6 rounded shadow-sm transition"
                >
                    Search
                </button>
            </div>
        </div>

        <!-- Search Result -->
        <h2
            className="text-2xl font-semibold my-4 border-b border-leaf-green w-fit flex space-x-4 whitespace-nowrap items-center pr-8"
        >
            <img
                src="../assets/recipe-book-svgrepo-com.svg"
                alt="search_result"
                class="w-10"
            />
            <div>Search Result</div>
        </h2>
        <RecipesPaging
            :recipes="recipes"
            :page="page"
            @update:page="
                (newPage) => {
                    page = newPage;
                }
            "
        />
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { IRecipe } from '../types/types';
import CategoryNav from './categories/CategoryNav.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import { ref, watch } from 'vue';
import qs from 'qs';
import RecipesPaging from './basics/RecipesPaging.vue';

const recipes = ref<IRecipe[]>([]);
const page = ref(1);
const searchQuery = ref('');
const selectedCategories = ref<string[]>([]);

const handleCategoryOnClick = async (selectedIds: string[]) => {
    selectedCategories.value = selectedIds;
    page.value = 1; // Reset to first page when filters change
    await fetchRecipes();
};

const fetchRecipes = async () => {
    const res = await axios.get('http://localhost:3000/recipes/query', {
        params: {
            search: searchQuery.value,
            ingredients: '',
            categories: selectedCategories.value,
            dietary: [],
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
