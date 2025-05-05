<template>
     <table class="table-auto border-collapse w-full" style="font-family: cursive;">
        <thead>
            <tr class="bg-light-green text-dark-green border-b border-gray-300">
                <!-- aria-hidden="true" tells screen readers to ignore this header cell, suppressing the warning ethically. -->
                <th class="p-4 text-center" aria-hidden="true"></th>
                <th
                    v-for="mealType in MEAL_TYPES"
                    :key="mealType"
                    class="border-l-2 border-gray-600 p-4 text-center uppercase"
                >
                    {{ mealType }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(day, dayIdx) in DAY_NAMES" :key="day" class="even:bg-light-green border-b border-gray-300">
                <td class="p-4 font-semibold text-orange-600">
                    {{ day }}
                </td>

                <td
                    v-for="mealType in MEAL_TYPES"
                    :key="mealType"
                    class="border-l-2 border-gray-600 p-4"
                >
                <DraggableMealType 
                    :mealType="mealType"
                    :recipes="[]"
                    @update="(recipes: Partial<IRecipe>[]) => updateMeals(dayIdx, mealType, recipes)"
                ></DraggableMealType>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { IDayPlan, IMeal, IRecipe } from '../../../types/types';
import { DAY_NAMES, MEAL_TYPES } from '../../../constants/constants';
import DraggableMealType from './DraggableMealType.vue';

defineProps<{
    dayPlans: IDayPlan[];
}>();

const emit = defineEmits<{
    (e: 'update', dayIdx: number, { mealType, recipes }: IMeal): void;
}>();

function updateMeals(dayIdx: number, mealType: string, updatedRecipes: Partial<IRecipe>[]) {
    emit('update', dayIdx, { mealType, recipes: updatedRecipes });
}
</script>
