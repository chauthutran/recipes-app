<template>
    <div class="block lg:hidden mr-5">
        <!-- Dropdown Menu -->
        <div @click="toggleMenu" class="cursor-pointer">
            <EllipsisVerticalIcon class="w-6 h-6 text-gray-600 text-xl" />
        </div>

        <div
            v-if="menuOpen"
            ref="menuRef"
            class="fixed top-0 left-0 w-72 h-screen bg-white border-2 border-gray-200 shadow-lg shadow-leaf-green z-10"
        >
            <div class="flex space-x-4 mx-4 my-3">
                <img
                    src="../../assets/smile-bowl-icon.jpg"
                    alt="recipe"
                    class="w-8 h-8"
                />
                <span class="text-xl font-semibold text-leaf-green"
                    >YummiVerse</span
                >
                <button
                    @click="closeMenu"
                    class="text-2xl text-red-500 font-bold text-right ml-auto"
                >
                    x
                </button>
            </div>
            <hr class="mb-7 text-gray-300" />
            <Nagivation :vertical="true" @onclose="closeMenu" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import Nagivation from './Nagivation.vue';

const menuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

function closeMenu() {
    menuOpen.value = false;
}

// Close when clicking outside
function handleClickOutside(event: MouseEvent) {
    if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        closeMenu();
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});
</script>
