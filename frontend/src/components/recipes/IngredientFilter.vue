<template>
    <div>
        <h3>Filter by Ingredients</h3>
        <ul className="flex flex-wrap gap-2">
            <li 
                v-for="ingredient in ingredients"
                key={ingredient}>
                <label>
                    <input
                        type="checkbox"
                    />
                    {{ ingredient }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ingredients = ref<string[]>([]);

</script>