<template>
    <div
        :class="[
            'flex flex-col items-center justify-center py-2 px-2 transition-all transform cursor-pointer',
            appPage === name
                ? 'border-leaf-green border-b-2 text-leaf-green'
                : '',
        ]"
        @click="appPage = name"
    >
        {{ text }}
    </div>
</template>

<script setup lang="ts">
import { useAppContext } from '../../hooks/useAppContext';

defineProps<{
    text: string;
    name: string;
}>();

const { appPage } = useAppContext();
</script>
