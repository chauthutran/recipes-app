<template>
    <header
        class="font-montserrat px-6 md:px-12 py-2 bg-white shadow flex items-center justify-between text-black"
    >
        <!-- Left: Logo -->
        <div class="flex flex-col items-center space-x-4 justify-center">
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
        <nav
            class="absolute left-1/2 transform -translate-x-1/2 flex space-x-7"
        >
            <router-link
                to="/"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Home
            </router-link>
            <router-link
                to="/discovery"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Discovery
            </router-link>
            <router-link
                to="/categories"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Categories
            </router-link>
            <router-link
                v-if="user"
                to="/my-recipes"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                My Recipes
            </router-link>
            <router-link
                v-if="user"
                to="/favorites"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Favorites
            </router-link>
        </nav>

        <!-- Right: Auth -->
        <div class="flex items-center space-x-3">
            <router-link
                v-if="!user"
                to="/login"
                class="ml-4 bg-leaf-green text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
                exact
            >
                Login
            </router-link>

            <button
                v-else
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

const { user, logout } = useAuthContext();

const handleLogout = () => {
    const ok = confirm('Are you sure you want to log-out ?');
    if (ok) {
        logout();
    }
};
</script>
