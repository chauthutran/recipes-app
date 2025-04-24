<template>
    <div class="w-full">
        <LoadingCircle v-if="loading" />
        <div v-else-if="errMsg !== ''" class="text-red-600 italic">
            {{ errMsg }}
        </div>
        <div class="grid grid-cols-[repeat(auto-fit,_minmax(120px,1fr))]">
            <CategoryCard
                v-for="category in categories"
                :key="category._id"
                :category="category"
                :item-size="itemSize"
                :hasCheckBox="hasCheckBox"
                :selected="selectedIds && selectedIds.includes(category._id)"
                @click="handleOnClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import CategoryCard from './CategoryCard.vue';
import type { ICategory } from '../../../types/types';
import { AppKey } from '../../../providers/useAppProvider';
import LoadingCircle from '../../basics/LoadingCircle.vue';

defineProps<{
    hasCheckBox?: boolean;
    itemSize?: number;
    selectedIds?: string[];
}>();

const emit = defineEmits<{
    (e: 'itemsOnClick', data: ICategory[]): void;
}>();

const appContext = inject(AppKey);
if (!appContext) {
    throw new Error('AppKey is not provided');
}

const { loading, categories, errMsg } = appContext;

const selectedCategories = ref<ICategory[]>([]);

const handleOnClick = (category: ICategory, selected: boolean) => {
    const exists = selectedCategories.value.some((c) => c._id === category._id);

    if (selected && !exists) {
        selectedCategories.value.push(category);
    } else if (!selected && exists) {
        selectedCategories.value = selectedCategories.value.filter(
            (c) => c._id !== category._id,
        );
    }

    emit('itemsOnClick', selectedCategories.value);
};
</script>
