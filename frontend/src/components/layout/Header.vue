<template>
    <header
        class="font-montserrat px-6 py-2 bg-white shadow flex items-center text-black"
    >
        <!-- Dropdown Menu -->
        <SlideBar />

        <!-- Left: Logo -->
        <div
            class="flex flex-col items-center space-x-4 justify-center md:px-12"
        >
            <img
                src="../../assets/smile-bowl-icon.jpg"
                alt="recipe"
                class="w-12 h-12"
            />
            <span class="text-xl font-semibold text-leaf-green"
                >YummiVerse</span
            >
        </div>

        <!-- Center: Navigation Menus -->
        <ul class="hidden space-x-7 lg:flex">
            <Nagivation />
        </ul>

        <!-- Right: Auth -->
        <div class="flex items-center space-x-3 ml-auto">
            <router-link
                v-if="!user && route.path !== '/login'"
                to="/login"
                class="ml-4 bg-leaf-green text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                exact
            >
                Login
            </router-link>

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
import { useAuthContext } from '../../hooks/useAuthContext';
import { useRoute } from 'vue-router';
import Nagivation from './Nagivation.vue';
import SlideBar from './SlideBar.vue';

const route = useRoute();
const { user, logout } = useAuthContext();

const handleLogout = () => {
    const ok = confirm('Are you sure you want to log-out ?');
    if (ok) {
        logout();
    }
};
</script>
