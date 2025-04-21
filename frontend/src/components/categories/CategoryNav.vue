<template>
    <div class="w-full">
        <div v-if="loading" class="italic p-4">Loading ...</div>
        <div v-else-if="errMsg !== ''" class="text-red-600 italic">
            {{ errMsg }}
        </div>
        <GridLayout
            v-else
            gap="gap-0"
        >
            <CategoryCard 
                v-for="category in categories"
                key="category._id"
                :category="category"
                @click="handleOnClick" />
        </GridLayout>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import type { ICategory } from '../../types/types';
import { AppKey } from '../../providers/useAppProvider';
import GridLayout from '../layout/GridLayout.vue';
import CategoryCard from './CategoryCard.vue';

const emit = defineEmits<{
    (e: 'itemsOnClick', data: string[]): void;
}>();

const appContext = inject(AppKey);
if (!appContext) {
    throw new Error('AppKey is not provided');
}

const { loading, categories, errMsg } = appContext;

const selectedCategories = ref<string[]>([]);

const handleOnClick = (category: ICategory, selected: boolean) => {
    const { _id } = category;
    
    selectedCategories.value = selected 
        ? [...selectedCategories.value, _id]
        : selectedCategories.value.filter(id => id !== _id);
    
    emit('itemsOnClick', selectedCategories.value);
};
</script>
