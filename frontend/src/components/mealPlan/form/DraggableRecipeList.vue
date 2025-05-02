<template>
    <Draggable
        :list="recipes"
        :group="{ name: 'recipes', pull: 'clone', put: false }"
        item-key="_id"
        class="flex flex-wrap gap-4"
    >
        <template #item="{ element }">
            <div
                class="p-3 bg-white border border-gray-300 rounded-md shadow text-center w-40 cursor-grab hover:shadow-md transition"
            >
                {{ element.name }}
            </div>
        </template>
    </Draggable>
</template>

<script setup lang="ts">
import VueDraggableNext from 'vuedraggable';
import type { IRecipe } from '../../../types/types';

const Draggable = VueDraggableNext;

defineProps<{
    recipes: IRecipe[];
}>();
</script>
