<template>
    <div
        className="grid grid-cols-3 gap-5 lg:grid-cols-8 md:grid-cols-6 items-center justify-center "
    >
        <div
            v-for="category in categories"
            key="category._id"
            :class="[
                'flex flex-col items-center justify-center py-2 px-2 transition-all transform cursor-pointer',
                selectedCategory?.name === category.name
                    ? 'border-leaf-green border-b-2'
                    : '',
            ]"
            @click="handleOnClick(category)"
        >
            <!-- Render icon if it exists -->
            <div
                v-if="category.icon"
                v-html="
                    category.icon.replace('<svg', `<svg width='32' height='32'`)
                "
            />
            <span className="whitespace-nowrap">{{ category.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { ICategory } from '../../types/types';

const emit = defineEmits<{
    (e: "handleItemOnClick", data: ICategory): void;
}>()

const categories = ref<ICategory[] | null>(null);
const selectedCategory = ref<ICategory | null>(null);

onMounted(async () => {
    const res = await axios.get('http://localhost:3000/categories');
    categories.value = res.data;
});

const handleOnClick = (category: ICategory) => {
    selectedCategory.value = category;
    emit("handleItemOnClick", category);
}
</script>
