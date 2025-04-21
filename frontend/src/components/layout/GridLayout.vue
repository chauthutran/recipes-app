<template>
    <div :class="[
        'grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]',
        gap
        ]">
        <slot />
    </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: string
  }>(),
  {
    gap: 'gap-6',
  }
);
</script>