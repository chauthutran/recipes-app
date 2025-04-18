<template>
    <div>
        <h2>Meal Preferences:</h2>
        <label>
            Meal Type:
            <select name="mealType" v-model="preferences.mealType">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
        </label>
        <label>
            Dietary Restrictions:
            <select
                name="dietaryRestrictions"
                v-model="preferences.dietaryRestrictions"
            >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="none">None</option>
            </select>
        </label>
        <button @click.prevent="$emit('submit', preferences)">
            Generate Meal Plan
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
    (e: 'submit', data: any): void;
}>();

const preferences = ref({
    mealType: 'lunch',
    dietaryRestrictions: 'vegan',
});
</script>
