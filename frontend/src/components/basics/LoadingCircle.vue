<template>
    <div class="flex justify-center items-center">
        <div class="loader" :style="circleStyles"></div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  size: {
    type: [Number, String] as const,  // `as const` is important for preserving the exact types
    default: 50,  // Default value
  },
});

// Calculate styles based on size prop
const circleStyles = {
    width: `${props.size}px`,
    height: `${props.size}px`,
};

</script>

<style scoped>
.loader {
    border: 4px solid #f3f3f3; /* Light grey color for the background */
    border-top: 4px solid #3498db; /* Blue color for the spinning part */
    border-radius: 50%;
    width: 50px; /* Size of the circle */
    height: 50px;
    animation: spin 2s linear infinite; /* Spin animation */
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
