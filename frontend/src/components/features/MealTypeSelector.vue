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
                v-model="selectedList"
                :checked="selectedIds && selectedIds.includes(type)"
            />
            <span class="text-gray-700 text-sm capitalize">{{ type }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const selectedList = ref<string[]>([]);

defineProps<{
    selectedIds?: string[];
}>()

const emit = defineEmits<{
    (e: 'itemsOnClick', data: string[]): void;
}>();

// Watch for changes and emit
watch(selectedList, (newVal) => {
    emit('itemsOnClick', newVal);
});
</script>
