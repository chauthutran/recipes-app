<template>
    <div
        :class="['grid', `grid-cols-[repeat(auto-fit,_minmax(${min}px,_1fr))]`, gap]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        gap?: string;
        min?: string;
    }>(),
    {
        gap: 'gap-6',
        min: "200"
    },
);
</script>
