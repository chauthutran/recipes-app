<template>
    <div class="mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-1 capitalize">
            {{ mealType }}
        </h4>
        <Draggable
            v-model="internalMeals"
            group="recipes"
            class="min-h-[48px] p-2 bg-gray-50 border border-dashed border-gray-300 rounded-md"
            item-key="_id"
        >
            <template #item="{ element }">
                <div
                    class="p-2 bg-green-100 border border-green-200 rounded text-sm shadow-sm my-3"
                >
                    {{ element.name }}
                </div>
            </template>
        </Draggable>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VueDraggableNext from 'vuedraggable';
import type { IRecipe, IMealType } from '../../../types/types';

const Draggable = VueDraggableNext;

const props = defineProps<{
    mealType: IMealType;
    recipes: Partial<IRecipe>[];
}>();

const emit = defineEmits(['update']);
const internalMeals = ref<Partial<IRecipe>[]>([...props.recipes]);

watch(internalMeals, (newVal) => {
    emit('update', newVal);
});
</script>
