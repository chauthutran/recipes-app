<template>
    <!-- Render icon if it exists -->
    <div
        :class="[
            'p-3 flex flex-col justify-between space-y-2 cursor-pointer items-center hover:bg-gray-200 bg-gray-100 transition rounded-xl shadow-sm m-2',
            selected ? 'font-semibold bg-gray-200' : '',
        ]"
        @click="handleOnClick"
    >
        <div class="flex items-center space-x-3">
            <input
                v-if="hasCheckBox"
                type="checkbox"
                class="form-checkbox accent-pink-600 w-5 h-5"
                :checked="selected"
            />

            <div
                v-if="category.icon"
                class="text-gray-700"
                v-html="
                    category.icon.replace(
                        '<svg',
                        `<svg width='${itemSize}' height='${itemSize}' class='inline-block'`,
                    )
                "
            />
        </div>

        <span className="text-left whitespace-nowrap">{{ category.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ICategory } from '../../../types/types';

const props = withDefaults(
    defineProps<{
        category: ICategory;
        itemSize?: number;
        hasCheckBox?: boolean;
        selected?: boolean;
    }>(),
    {
        itemSize: 32,
        hasCheckBox: false,
        selected: false,
    },
);

const selected = ref(props.selected);


const emit = defineEmits<{
    (e: 'click', category: ICategory, selected: boolean): void;
}>();

const handleOnClick = () => {
    selected.value = !selected.value;
    emit('click', props.category, selected.value);
};
</script>
