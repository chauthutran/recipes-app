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
    
    

    <div v-if="errMsg !== ''" class="error">{{ errMsg }}</div>
    <RecipesPaging
        v-else
        :recipes="recipes"
        :page="page"
        @update:page="
            (newPage) => {
                page = newPage;
            }
        "
    />
</template>

<script setup lang="ts">
import VueDraggableNext from 'vuedraggable';
import type { IRecipe } from '../../../../types/types';
import RecipesPaging from '../../recipes/RecipesPaging.vue';
import { ref } from 'vue';

const Draggable = VueDraggableNext;
const page = ref(1);
const errMsg = ref('');

defineProps<{
    recipes: IRecipe[];
}>();
</script>
