<template>
    <h3 class="mt-4 text-lg font-semibold text-gray-800">
        {{ recipe.name }}
    </h3>
</template>

<script setup lang="ts">
import type { IRecipe } from '../../../types/types';

defineProps<{
    recipe: IRecipe;
}>();

</script>
