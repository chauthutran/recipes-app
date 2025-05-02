<template>
    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
            v-model="query"
            type="text"
            placeholder="Search e.g. Pasta, Chicken Curry..."
            class="flex-1 border border-gray-300 p-3 rounded-md shadow-sm focus:ring-green-500 focus:outline-none"
        />
        <button
            @click="$emit('search', query)"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow transition"
        >
            Search Recipes
        </button>
    </div>
</template>

<script setup lang="ts">
const query = defineModel<string>('query');
defineEmits(['search']);
</script>
