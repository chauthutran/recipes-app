<template>
    <div class="flex flex-wrap gap-3">
        <label
            v-for="type in mealTypeOptions"
            :key="type"
            class="inline-flex items-center space-x-3 bg-gray-100 px-3 py-3 rounded-xl shadow-sm cursor-pointer hover:bg-gray-200 transition m-2"
        >
            <input
                type="checkbox"
                class="accent-pink-600 w-5 h-5"
                :value="type"
                v-model="selected"
                @click="handleItemsOnClick(type)"
            />
            <span class="text-gray-700 text-sm capitalize">{{ type }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const props = withDefaults(
    defineProps<{
        selected?: string[];
    }>(),
    {
        selected: () => [],
    },
);

const emit = defineEmits<{
    (e: 'itemsOnClick', data: string[]): void;
}>();

// Reactive selection
const selected = ref<string[]>(props.selected);

const handleItemsOnClick = (label: string) => {
    const existed = selected.value.some((item) => item === label);
    if (existed) {
        selected.value = selected.value.filter((item) => item != label); // remove from the list
    } else {
        selected.value.push(label); // Add to the list
    }

    emit('itemsOnClick', selected.value);
};
</script>
