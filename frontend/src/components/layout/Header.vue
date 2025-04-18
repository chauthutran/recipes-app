<template>
    <header
        class="font-montserrat px-10 flex items-center space-x-10 py-3 text-black"
    >
        <div
            class="flex flex-col items-center justify-center text-leaf-green font-extrabold"
        >
            <div class="text-2xl">
                <img
                    src="../../assets/food-svgrepo-com.svg"
                    alt="recipe"
                    class="w-14 h-14"
                />
            </div>
            <div>AI Recipes</div>
        </div>

        <button
            :class="
                'border_b border-leaf-green hover:border_b hover:border-leaf-green' +
                    appPage.name ===
                PAGE_HOME
                    ? 'border_b border-leaf-green'
                    : ''
            "
            @click="appPage.name === PAGE_HOME"
        >
            Home
        </button>
        <button
            :class="[
            'border_b hover:border_b',
            appPage.name === PAGE_RECIPES ? 'border-leaf-green' : 'border-transparent',
            'hover:border-leaf-green'
            ]"
            @click="appPage.name === PAGE_RECIPES_BY_CATEGORY"
        >
            Recipes
        </button>
        <button
            :class="[
                'border_b border-leaf-green hover:border_b hover:border-leaf-green' +
                    appPage.name ===
                PAGE_RECIPES_BY_CATEGORY
                    ? 'border_b border-leaf-green'
                    : ''
            ]"
            @click="appPage.name === PAGE_RECIPES_BY_CATEGORY"
        >
            Categories
        </button>
        <button
            :class="
                'border_b border-leaf-green hover:border_b hover:border-leaf-green' +
                    appPage.name ===
                PAGE_DIETARY_RESTRICTION
                    ? 'border_b border-leaf-green'
                    : ''
            "
            @click="appPage.name === PAGE_DIETARY_RESTRICTION"
        >
            Dietary Preferences
        </button>
        <button
            :class="
                'border_b border-leaf-green hover:border_b hover:border-leaf-green' +
                    appPage.name ===
                PAGE_MEAL_TYPE
                    ? 'border_b border-leaf-green'
                    : ''
            "
            @click="appPage.name === PAGE_MEAL_TYPE"
        >
            Meal Types
        </button>
        <button
            :class="
                'border_b border-leaf-green hover:border_b hover:border-leaf-green' +
                    appPage.name ===
                PAGE_FAVORITES
                    ? 'border_b border-leaf-green'
                    : ''
            "
            @click="appPage.name === PAGE_FAVORITES"
        >
            Favorite
        </button>
        <button
            :class="
                'border_b border-leaf-green hover:border_b hover:border-leaf-green' +
                    appPage.name ===
                PAGE_MEAL_PLANNER
                    ? 'border_b border-leaf-green'
                    : ''
            "
            @click="appPage.name === PAGE_MEAL_PLANNER"
        >
            Meal Planner
        </button>

        <!-- <button>Favorites</button>
        <button>Recipe Upload</button>
        <button>Profile</button>
        <button>Notifications</button> -->
        <!-- <button class="bg-leaf-green px-3 py-1 text-white rounded">Log-out</button> -->

        <button v-if="!user" class="bg-leaf-green px-3 py-1 text-white rounded">
            Login
        </button>

        <button v-else class="bg-leaf-green px-3 py-1 text-white rounded">
            Log-out
        </button>
    </header>
</template>

<script setup lang="ts">
import { useAppContext } from '../../composables/useAppContext';
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

const { appPage } = useAppContext();
const { user } = useAuthContext();
</script>
