<template>
    <div class="flex flex-wrap gap-2">
        <DietaryRestrictionCard
            v-for="option in dietaryOptions"
            :key="option.name"
            :label="option.name"
            :hasCheckBox="hasCheckBox"
            :iconURL="option.iconURL!"
            :item-size="itemSize"
            :selected="selected.includes(option.name)"
            @click="handleItemsOnClick"
            class="inline-flex items-center space-x-3 bg-gray-100 px-3 py-3 rounded-xl shadow-sm cursor-pointer hover:bg-gray-200 transition m-2"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DietaryRestrictionCard from './DietaryRestrictionCard.vue';

const props = withDefaults(
    defineProps<{
        hasCheckBox?: boolean;
        itemSize?: number;
        selected?: string[];
    }>(),
    {
        selected: () => [],
    }
)

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

const selected = ref(props.selected);

const handleItemsOnClick = (label: string, isSelected: boolean) => {
    if( isSelected ) {
        selected.value.push(label);
    }
    else {
        selected.value = selected.value.filter((item) => item != label);
    }
    
    emit('itemsOnClick', selected.value);
};

</script>
