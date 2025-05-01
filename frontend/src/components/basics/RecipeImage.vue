<template>
    <img
        v-if="recipe.imageUrl"
        :src="recipe.imageUrl"
        alt="Recipe Image"
        :class="['w-full object-cover', size]"
    />

    <img
        v-else
        src="../../assets/default-recipe-image.png"
        alt="Recipe Image"
        :class="['w-full object-cover', size]"
    />
</template>

<script setup lang="ts">
import type { IRecipe } from '../../types/types';

withDefaults(
    defineProps<{
        recipe: IRecipe;
        size?: string;
    }>(),
    {
        size: 'h-48',
    },
);
</script>
