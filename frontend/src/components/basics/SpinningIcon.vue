<template>
    <div class="spin w-6 h-6 text-gray-500">
        <ArrowPathIcon />
    </div>
</template>

<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid';
</script>

<style scoped>
.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
