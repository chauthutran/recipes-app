<template>
    <div class="flex flex-wrap gap-4 mt-6">
        <div
            v-for="recipe in recipes"
            :key="recipe.id"
            class="p-3 bg-gray-100 rounded shadow-md cursor-grab"
        >
            {{ recipe.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
const recipes = [
    { id: 1, name: 'Spaghetti', ingredients: ['pasta', 'tomato', 'cheese'] },
    {
        id: 2,
        name: 'Grilled Chicken',
        ingredients: ['chicken', 'lemon', 'pepper'],
    },
    // Add more!
];
</script>
