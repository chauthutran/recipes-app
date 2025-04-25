<template>
    <div class="flex flex-col flex-1">
        <main class="flex-grow">
            <div class="space-y-1 mb-6 text-leaf-green">
                <div class="text-xl font-semibold">
                    Welcome to YummiVerse! Tasty finds, all in one place.
                </div>
            </div>

            <div class="mb-8">
                <h2 class="text-2xl font-semibold">Find Your Perfect Recipe</h2>
                <FindRecipes />
            </div>

            <div class="mb-8">
                <h2
                    class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
                >
                    <img
                        src="../assets/tag-price-svgrepo-com.svg"
                        class="w-10"
                        alt="new-recipes"
                    />
                    <div class="">Trending Recipes</div>
                </h2>

                <RecipeFetcher :fetchMethod="trendingRecipes" :page="1" />
            </div>

            <div class="mb-8" v-if="user">
                <h2
                    class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
                >
                    <img
                        src="../assets/like-svgrepo-com.svg"
                        class="w-9"
                        alt="new-recipes"
                    />
                    <div class="">Recommended Recipes</div>
                </h2>

                <RecipeFetcher
                    :fetchMethod="retrieveRecommenedRecipes"
                    :fetchArgs="[user?._id]"
                />
            </div>

            <div class="mb-8">
                <h2
                    class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
                >
                    <img
                        src="../assets/recipe-book-svgrepo-com.svg"
                        class="w-12"
                        alt="new-recipes"
                    />
                    <div class="">New Recipes</div>
                </h2>

                <RecipeFetcher
                    :fetchMethod="retrieveRecipes"
                    :fetchArgs="[1]"
                />
            </div>

            <div class="mb-8">
                <h2
                    class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
                >
                    <img
                        src="../assets/stars-star-svgrepo-com.svg"
                        class="w-14"
                        alt="new-recipes"
                    />
                    <div class="">Popular Categories</div>
                </h2>

                <RecipeFetcher
                    :fetchMethod="retrievePopularRecipesByUserAmount"
                    :fetchArgs="[1]"
                />
            </div>

            <div class="mb-8">
                <h2
                    class="flex space-x-4 text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5 justify-center items-center whitespace-nowrap"
                >
                    <img
                        src="../assets/heart-love-marriage-29-svgrepo-com.svg"
                        class="w-12"
                        alt="new-recipes"
                    />
                    <div class="">User Favorites</div>
                </h2>

                <RecipeFetcher :fetchMethod="retrieveFavorites" />
            </div>

            <div class="mb-8">
                <h2
                    class="flex space-x-4 text-2xl font-semibold mb-4 pr-4 border-b border-leaf-green w-fit justify-center items-center whitespace-nowrap"
                >
                    <img
                        src="../assets/category-2-svgrepo-com.svg"
                        class="w-8"
                        alt="categories"
                    />
                    <div class="">Categories</div>
                </h2>
                <CategorySelector />
            </div>

            <!-- {user !== null && <div class="mb-8">
                <h2 class="text-2xl font-semibold mb-4 border-b border-leaf-green w-fit pr-5">Just for You</h2>
                A dedicated space for personalized meal suggestions powered by AI.
                
            
            </div>} -->
        </main>
    </div>
</template>

<script setup lang="ts">
import FindRecipes from './homePage/FindRecipes.vue';
import { useAuthContext } from '../hooks/useAuthContext';
import {
    trendingRecipes,
    retrieveRecommenedRecipes,
    retrieveRecipes,
    retrieveFavorites,
    retrievePopularRecipesByUserAmount,
} from '../utils/request/recipeRequest';
import RecipeFetcher from './features/recipes/RecipeFetcher.vue';

const { user } = useAuthContext();
</script>
