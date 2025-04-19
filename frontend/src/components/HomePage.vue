<template>
    <div className="flex flex-col flex-1">
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
                <TrendingRecipes />
            </div>

            <div className="mb-8" v-if="user">
                <RecommendedRecipes />
            </div>

            <div className="mb-8">
                <NewRecipeList />
            </div>

            <div className="mb-8">
                <PopularCategories />
            </div>
            
            <div className="mb-8">
                <UserFavorites />
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
import { useAuthContext } from '../composables/useAuthContext';
import RecommendedRecipes from './homePage/RecommendedRecipes.vue';
import TrendingRecipes from './homePage/TrendingRecipes.vue';
import NewRecipeList from './homePage/NewRecipeList.vue';
import PopularCategories from './homePage/PopularCategories.vue';
import UserFavorites from './homePage/UserFavorites.vue';

const { user } = useAuthContext();

</script>
