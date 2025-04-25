<template>
    <div class="flex flex-wrap gap-2">
        <DietaryRestrictionCard
            v-for="option in dietaryOptions"
            :key="option.name"
            :label="option.name"
            :hasCheckBox="hasCheckBox"
            :iconURL="option.iconURL!"
            :item-size="itemSize"
            :selected="internalSelectedList.includes(option.name)"
            @click="handleItemsOnClick"
            class="inline-flex items-center space-x-3 bg-gray-100 px-3 py-3 rounded-xl shadow-sm cursor-pointer hover:bg-gray-200 transition m-2"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DietaryRestrictionCard from './DietaryRestrictionCard.vue';

const props = defineProps<{
    hasCheckBox?: boolean;
    itemSize?: number;
    selectedList?: string[];
}>();

const emit = defineEmits<{
    (e: 'itemsOnClick', data: string[]): void;
}>();

const dietaryOptions = [
    { name: 'Vegetarian', iconURL: '/src/assets/broccoli-svgrepo-com.svg' },
    { name: 'Vegan', iconURL: '/src/assets/salad-svgrepo-com.svg' },
    {
        name: 'Gluten-Free',
        iconURL: '/src/assets/wheat-barley-svgrepo-com-free.svg',
    },
    { name: 'Dairy-Free', iconURL: '/src/assets/milk-svgrepo-com-free.svg' },
    {
        name: 'Nut-Free',
        iconURL: '/src/assets/nut-hazelnut-svgrepo-com-free.svg',
    },
];

// internal list that mirrors selectedList prop
const internalSelectedList = ref<string[]>([]);

watch(
    () => props.selectedList,
    (newVal) => {
        internalSelectedList.value = newVal ? [...newVal] : [];
    },
    { immediate: true },
);

const handleItemsOnClick = (label: string, selected: boolean) => {
  // e.g. toggle internalSelectedList
  if (selected) {
    internalSelectedList.value.push(label);
  } else {
    const index = internalSelectedList.value.indexOf(label);
    if (index !== -1) internalSelectedList.value.splice(index, 1);
  }
  
  emit('itemsOnClick', internalSelectedList.value);
};

// emit whenever selection changes
watch(internalSelectedList, (newVal) => {
    emit('itemsOnClick', newVal);
});
</script>
