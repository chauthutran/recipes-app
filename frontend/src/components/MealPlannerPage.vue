<template>
    <div class="p-6 space-y-8 text-left w-full">
        <div v-if="!user" class="text-red-500 italic text-lg">
            Please login to see the meal plans
        </div>
        <div v-else>
            <button
                @click="addNew"
                class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow transition"
            >
                Add new
            </button>
            <hr class="my-4 text-gray-300" />
            <div v-for="mealPlan in mealPlans">
                <p class="font-semibold text-2xl py-5">
                    Meal plan from {{ formatDate(mealPlan.weekStartDate) }} to
                    {{ formatDate(mealPlan.weekEndDate) }}
                    
                    <button
                        @click="handleOnEdit(mealPlan._id!)"
                        class="text-gray-400 font-semibold px-3 py-1 rounded hover:text-blue-500"
                    >
                        <PencilSquareIcon class="w-5 h-5" />
                    </button>
                    <button
                        @click="handleOnDelete(mealPlan._id!)"
                        class="text-gray-400 font-semibold py-1 rounded hover:text-red-500"
                    >
                        <TrashIcon class="w-5 h-5" />
                    </button>
                </p>

                <MealPlanDetails :mealPlan="mealPlan" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useAuthContext } from '../hooks/useAuthContext';
import type { IMealPlan } from '../types/types';
import { retrieveMealPlanByUser } from '../utils/request/mealPlanRequest';
import { formatDate } from '../utils/dateUtils';
import { useRouter } from 'vue-router';
import MealPlanDetails from './mealPlan/list/MealPlanDetails.vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const { user } = useAuthContext();
const mealPlans = ref<IMealPlan[]>([]);
const errMsg = ref('');

const fetchMealPlans = async () => {
    const responseData = await retrieveMealPlanByUser(user.value!._id);

    if (responseData.success) {
        mealPlans.value = responseData.data!;
    } else {
        errMsg.value = responseData.errMsg!;
    }
};

const addNew = () => {
    router.push(`/meal-plan/add`);
};

const handleOnEdit = (id: string) => {
    
    router.push(`/meal-plan/form/${id}`);
}

const handleOnDelete = (id: string) => {
    console.log("Not implement yet " + id);
}
onMounted(fetchMealPlans);
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
