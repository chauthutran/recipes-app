<template>
    <div class="flex mt-4">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for recipes..."
            class="p-2 w-full border border-gray-300 rounded"
        />
        <button
            type="submit"
            @click="$emit('onSearch', searchQuery)"
            class="ml-2 bg-blue-600 text-white px-4 rounded"
        >
            Search
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
defineEmits<{
    (e: 'onSearch', searchQuery: string): void;
}>();
</script>
