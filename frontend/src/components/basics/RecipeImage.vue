<template>
    <img
            v-if="recipe.imageUrl"
            :src="recipe.imageUrl"
            alt="Recipe Image"
            class="w-full h-48 object-cover"
        />

        <img
            v-else
            src="../../assets/default-recipe-image.png"
            alt="Recipe Image"
            class="w-full h-48 object-cover"
        />
</template>

<script setup lang="ts">
import type { IRecipe } from '../../types/types';

defineProps<{
    recipe: IRecipe,
}>()
</script>