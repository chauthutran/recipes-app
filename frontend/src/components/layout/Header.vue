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
        <nav class="flex space-x-4">
            <MenuButton :text="'Home'" :name="PAGE_HOME" />
            <MenuButton :text="'Discover'" :name="PAGE_DISCOVER" />
            <MenuButton :text="'Categories'" :name="PAGE_RECIPES_BY_CATEGORY" />
            <MenuButton
                :text="'My Recipes'"
                v-if="user"
                :name="PAGE_MY_RECIPES"
            />
            <MenuButton
                :text="'Favorites'"
                v-if="user"
                :name="PAGE_FAVORITES"
            />

            <!-- <MenuButton
                :text="'Dietary Preferences'"
                :name="PAGE_DIETARY_RESTRICTION"
            />
            <MenuButton :text="'Meal Types'" :name="PAGE_MEAL_TYPE" /> -->
            <!-- <MenuButton :text="'Meal Planner'" :name="PAGE_MEAL_PLANNER" /> -->
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-3">
            <button
                v-if="appPage !== PAGE_LOGIN"
                class="bg-leaf-green hover:bg-leaf-green/90 text-white px-4 py-1.5 rounded transition"
                @click="appPage = PAGE_LOGIN"
            >
                Login
            </button>

            <button
                v-if="user"
                class="relative text-green-500 px-4 py-1.5 rounded transition"
                @click="handleLogout"
            >
                <UserCircleIcon
                    class="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-10 w-10 peer-focus:text-leaf-green"
                />
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/solid';
import { useAppContext } from '../../composables/useAppContext';
import { useAuthContext } from '../../composables/useAuthContext';
import {
    PAGE_HOME,
    PAGE_RECIPES_BY_CATEGORY,
    PAGE_DISCOVER,
    PAGE_FAVORITES,
    PAGE_LOGIN,
    PAGE_MY_RECIPES,
} from '../../constants/constants';
import MenuButton from '../basics/MenuButton.vue';

const { user, logout } = useAuthContext();
const { appPage } = useAppContext();

const handleLogout = () => {
    const ok = confirm('Are you sure you want to log-out ?');
    if (ok) {
        logout();
    }
};
</script>
