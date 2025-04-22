<template>
    <!-- Render icon if it exists -->
    <div
        :class="[
            'p-3 flex flex-col justify-between space-y-3 cursor-pointer items-center',
            selected
                ? 'font-semibold bg-green-200'
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
        <span className="text-left">{{ category.name }}</span>
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
