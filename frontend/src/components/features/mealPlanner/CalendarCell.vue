<template>
    <div class="grid grid-cols-7 gap-4">
        <div
            v-for="day in daysOfWeek"
            :key="day"
            class="border p-4 min-h-[150px]"
        >
            <h3 class="font-bold mb-2">{{ day }}</h3>
            <draggable
                :list="mealPlan[day]"
                :group="groupName"
                @change="updateMealPlan"
                class="space-y-2"
            >
                <template #item="{ element }">
                    <div class="p-2 bg-green-100 rounded">
                        {{ element.name }}
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';

defineProps<{
    groupName: string;
}>();

// defineEmits<{
//     (e: 'updatePlan', )
// }>()
const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const mealPlan = ref<Record<string, { name: string; ingredients: string[] }[]>>(
    {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    },
);

function updateMealPlan() {
    // Whenever user drops a recipe
}
</script>
