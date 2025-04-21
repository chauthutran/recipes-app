<template>
    <!-- Render icon if it exists -->
    <div
        :class="[
            'p-4 w-full h-full flex flex-col justify-between space-y-3 cursor-pointer',
            selected
                ? 'text-leaf-green font-semibold bg-green-200 bg-opacity-50 border-green-300'
                : '',
        ]"
        @click="handleOnClick"
    >
        <div
            v-if="category.icon"
            v-html="
                category.icon.replace('<svg', `<svg width='32' height='32'`)
            "
        />
        <span className="whitespace-nowrap text-left">{{ category.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ICategory } from '../../types/types';

const selected = ref(false);

const props = defineProps<{
    category: ICategory;
}>();

const emit = defineEmits<{
    (e: 'click', category: ICategory, selected: boolean): void;
}>();

const handleOnClick = () => {
    selected.value = !selected.value;
    emit('click', props.category, selected.value);
};
</script>
