<template>
    <ul
        :class="[
            'flex space-x-5 space-y-5 text-left mx-5',
            vertical ? 'flex-col' : '',
        ]"
    >
        <li>
            <router-link
                to="/"
                @click="$emit('onclose')"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Home
            </router-link>
        </li>
        <li>
            <router-link
                to="/discovery"
                @click="$emit('onclose')"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Discovery
            </router-link>
        </li>
        <li>
            <router-link
                to="/categories"
                @click="$emit('onclose')"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Categories
            </router-link>
        </li>
        <li>
            <router-link
                v-if="user"
                to="/my-recipes"
                @click="$emit('onclose')"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                My Recipes
            </router-link>
        </li>
        <li>
            <router-link
                v-if="user"
                to="/favorites"
                @click="$emit('onclose')"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Favorites
            </router-link>
        </li>
        <li>
            <router-link
                v-if="user"
                to="/mealPlanner"
                @click="$emit('onclose')"
                class="hover:border-b hover:border-leaf-green hover:text-leaf-green"
                active-class="text-leaf-green font-semibold border-leaf-green border-b"
                exact
            >
                Meal Planner
            </router-link>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useAuthContext } from '../../hooks/useAuthContext';

const { user } = useAuthContext();

withDefaults(
    defineProps<{
        vertical?: boolean;
    }>(),
    {
        vertical: false,
    },
);

defineEmits<{
    (e: 'onclose'): void;
}>();
</script>
