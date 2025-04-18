<template>
    <form @submit.prevent="handleSearch" class="flex mt-4">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for recipes..."
            class="p-2 w-full border border-gray-300 rounded"
        />
        <button type="submit" class="ml-2 bg-blue-600 text-white px-4 rounded">
            Search
        </button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = () => {
    console.log('Searching for:', searchQuery.value);
};
</script>
