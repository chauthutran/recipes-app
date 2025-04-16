<template>
    <div
        :style="{ display: visible ? '' : 'none' }"
        class="rounded-md shadow-sm fixed top-0 left-1/2 mt-2 mx-3 py-2 border-2 z-50 flex items-center"
    >
        <span class="flex-1">{{ message }}</span>
        <button
            class="ml-4 text-red-500 font-bold text-xl"
            @click="visible = false"
        >
            &times;
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    message: string;
    type: string;
}>();

const visible = ref(true);
</script>
