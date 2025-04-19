<template>
    <header
        class="font-montserrat px-6 md:px-12 py-4 bg-white shadow flex items-center justify-between text-black"
    >
        <!-- Logo and Title -->
        <div class="flex flex-col items-center space-x-4">
            <img
                src="../../assets/food-svgrepo-com.svg"
                alt="recipe"
                class="w-12 h-12"
            />
            <span class="text-xl font-bold text-leaf-green">FoodieHeaven</span>
        </div>

        <!-- Navigation Menus -->
        <nav class="hidden md:flex space-x-4">
            <MenuButton :text="'Home'" :name="PAGE_HOME" />
            <MenuButton :text="'Recipes'" :name="PAGE_RECIPES" />
            <MenuButton :text="'Categories'" :name="PAGE_RECIPES_BY_CATEGORY" />
            <MenuButton
                :text="'Dietary Preferences'"
                :name="PAGE_DIETARY_RESTRICTION"
            />
            <MenuButton :text="'Meal Types'" :name="PAGE_MEAL_TYPE" />
            <MenuButton :text="'Favorite'" :name="PAGE_FAVORITES" />
            <MenuButton :text="'Meal Planner'" :name="PAGE_MEAL_PLANNER" />
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-3">
            <button
                v-if="!user"
                class="bg-leaf-green hover:bg-leaf-green/90 text-white px-4 py-1.5 rounded transition"
            >
                Login
            </button>
            <button
                v-else
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition"
            >
                Logout
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useAuthContext } from '../../composables/useAuthContext';
import {
    PAGE_HOME,
    PAGE_RECIPES_BY_CATEGORY,
    PAGE_MEAL_TYPE,
    PAGE_RECIPES,
    PAGE_DIETARY_RESTRICTION,
    PAGE_FAVORITES,
    PAGE_MEAL_PLANNER,
} from '../../constants/constants';
import MenuButton from '../basics/MenuButton.vue';

const { user } = useAuthContext();
</script>
