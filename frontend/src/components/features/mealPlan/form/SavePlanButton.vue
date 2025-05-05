<template>
    <div class="text-right">
        <button
            @click="$emit('click')"
            class="mt-6 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow transition"
        >
            Save Meal Plan
        </button>
    </div>
</template>

<script setup lang="ts">
defineEmits<{
    (e: 'click'): void;
}>();
</script>
