<template>
    <Draggable
        v-model="internalMeals"
        group="recipes"
        class="min-h-[48px] p-2 bg-gray-50 border border-dashed border-gray-300 rounded-md"
        item-key="_id"
    >
        <template #item="{ element, index }">
            <div
                class="p-2 bg-green-100 border border-green-200 rounded text-sm shadow-sm my-3 flex justify-center items-center"
            >
                {{ element.name }}
                <button 
                    class="bg-red-500 text-white py-1 px-2 ml-auto rounded-full"
                    @click="removeItem(index)"
                >
                    x
                </button>
            </div>
        </template>
    </Draggable>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VueDraggableNext from 'vuedraggable';
import type { IRecipe, IMealType } from '../../../../types/types';

const Draggable = VueDraggableNext;

const props = defineProps<{
    mealType: IMealType;
    recipes: Partial<IRecipe>[];
}>();

const emit = defineEmits(['update']);
const internalMeals = ref<Partial<IRecipe>[]>([...props.recipes]);

function removeItem(index: number) {
    internalMeals.value.splice(index, 1);
}

watch(internalMeals, (newVal) => {
    emit('update', newVal);
});
</script>
