<template>
    <div className="flex flex-col">
        <main className="flex-grow">
            <div className="space-y-1 mb-6 text-leaf-green">
                <div className="text-xl font-semibold">
                    Welcome to FoodieHeaven!
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold">
                    Find Your Perfect Recipe
                </h2>
                <FindRecipes />
            </div>

            <div className="mb-8">
                <h2
                    className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
                >
                    Trending Recipes
                </h2>
                <TrendingRecipes />
            </div>

            <div className="mb-8" v-if="user">
                <h2
                    className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
                >
                    Recommended Recipes
                </h2>
                <RecommendedRecipes />
            </div>

            <div className="mb-8">
                <h2
                    className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
                >
                    Featured Recipes
                </h2>
                <FeaturedRecipeList />
            </div>

            <div className="mb-8">
                <h2
                    className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3"
                >
                    Categories Navigation
                </h2>
                <CategoriesNavigation @handleItemOnClick="handleOnClick" />
            </div>

            <!-- {user !== null && <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-3">Just for You</h2>
                A dedicated space for personalized meal suggestions powered by AI.
                
            
            </div>} -->
        </main>
    </div>
</template>

<script setup lang="ts">
import FindRecipes from './homePage/FindRecipes.vue';
import FeaturedRecipeList from './homePage/FeaturedRecipeList.vue';
import CategoriesNavigation from './homePage/CategoriesNavigation.vue';
import type { ICategory } from '../types/types';
import { useAuthContext } from '../composables/useAuthContext';
import type RecommendedRecipes from './homePage/RecommendedRecipes.vue';
import TrendingRecipes from './homePage/TrendingRecipes.vue';

const { user } = useAuthContext();

const handleOnClick = (category: ICategory) => {
    // show RecipesByCategoryPage
    console.log('Selected category: ', category);
};
</script>
