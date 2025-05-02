<template>
    <div class="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
        <h3 class="text-xl font-bold text-gray-800 mb-3">{{ dayPlan.day }}</h3>

        <MealTypeDraggable
            v-for="mealType in MEAL_TYPES"
            :key="mealType"
            :mealType="mealType"
            :recipes="dayPlan.meals[mealType] ?? []"
            @update="(updatedRecipes) => updateMeals(mealType, updatedRecipes)"
        />
    </div>
</template>

<script setup lang="ts">
import type { IDayPlan, IRecipe, IMeal } from '../../../types/types';
import MealTypeDraggable from './MealTypeDraggable.vue';
import { MEAL_TYPES } from '../../../constants/constants';

/** defineProps<{
  day: { day: string; meals: IMealsPerDay };
  mealTypes: string[];
}>(); */

defineProps<{
    dayPlan: IDayPlan;
}>();
const emit = defineEmits<{
    (e: 'update', { mealType, recipes }: IMeal): void;
}>();

function updateMeals(mealType: string, updatedRecipes: Partial<IRecipe>[]) {
    emit('update', { mealType, recipes: updatedRecipes });
}
</script>
