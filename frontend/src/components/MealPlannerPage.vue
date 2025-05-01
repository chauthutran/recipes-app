<template>
    <div class="p-4 space-y-4">
        <div class="flex gap-4 items-center">
            <label>Week Start:</label>
            <input
                type="date"
                v-model="weekStartDate"
                class="border p-1 rounded"
            />

            <label>Week End:</label>
            <input
                type="date"
                v-model="weekEndDate"
                class="border p-1 rounded"
            />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
                v-for="(day, dayIndex) in dayPlans"
                :key="dayIndex"
                class="border p-2 rounded shadow"
            >
                <h3 class="text-lg font-semibold mb-2">{{ day.day }}</h3>
                <div v-for="mealType in mealTypes" :key="mealType" class="mb-2">
                    <h4 class="font-medium">{{ mealType }}</h4>

                    <Draggable
                        v-model="dayPlans[dayIndex].meals[mealType]"
                        group="recipes"
                        class="min-h-[40px] p-2 bg-gray-50 border rounded"
                        item-key="id"
                    >
                        <template #item="{ element }">
                            <div class="p-1 bg-green-100 border rounded">
                                {{ element.name }}
                            </div>
                        </template>
                    </Draggable>
                </div>
            </div>
        </div>

        <div>
            <h2 class="text-xl font-bold mb-2">Available Recipes</h2>
            <div>
                <div class="flex space-x-3">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="e.g. Pasta, Chicken Curry..."
                        class="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <!-- Search Button -->
                    <div class="text-left">
                        <button
                            @click="fetchRecipes"
                            class="bg-leaf-green hover:bg-green-700 text-white px-6 py-2 rounded shadow-sm transition whitespace-nowrap"
                        >
                            Search Recipes
                        </button>
                    </div>
                </div>
            </div>
            <!-- <Draggable
          v-model="availableRecipes"
          group="{ name: 'recipes', pull: 'clone', put: false }"
          item-key="id"
          class="flex flex-wrap gap-2 border p-2 rounded"
        >
          <template #item="{ element }">
            <div class="p-2 bg-white border rounded shadow cursor-grab">{{ element.name }}</div>
          </template>
        </Draggable> -->

            <!-- :clone="cloneRecipe" -->
            <Draggable
                :list="recipes"
                :group="{ name: 'recipes', pull: 'clone', put: false }"
                item-key="id"
                class="flex flex-wrap gap-4"
            >
                <template #item="{ element }">
                    <div
                        class="p-3 bg-gray-100 rounded shadow-md w-40 text-center cursor-grab"
                    >
                        {{ element.name }}
                    </div>
                </template>
            </Draggable>
        </div>

        <button
            @click="submitPlan"
            class="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
            Save Meal Plan
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueDraggableNext from 'vuedraggable';
import type { IRecipe, IDayPlan, IDayName, IMealsPerDay } from '../types/types';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import { searchRecipes } from '../utils/request/recipeRequest';
import { addMealPlan, generateEmptyMealPlan } from '../utils/request/mealPlanRequest';
import { useAuthContext } from '../hooks/useAuthContext';


const Draggable = VueDraggableNext;

const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];

const dayPlans = ref<IDayPlan[]>(generateEmptyMealPlan())
  

const weekStartDate = ref('');
const weekEndDate = ref('');
const { user } = useAuthContext();

// Recipes available
const recipes = ref<IRecipe[]>([]);
const page = ref(1);
const errMsg = ref('');
const searchQuery = ref('');

const fetchRecipes = async () => {
    const params = {
        search: searchQuery.value,
        limit: HOME_PAGE_RECIPE_LIMIT,
        page: page.value,
    };
    const responseData = await searchRecipes(params);

    if (responseData.success) {
        recipes.value = responseData.data!;
    } else {
        errMsg.value = responseData.errMsg!;
    }
};

async function submitPlan() {
    const plans = [];
    for( var i=0; i<dayPlans.value.length; i++ ) {
        const item = dayPlans.value[i];
        const breakfast = (item.meals['breakfast'] as IRecipe[] | undefined)?.map((item: IRecipe) => { _id: item._id });
        const lunch =(item.meals['lunch'] as IRecipe[] | undefined)?.map((item) => item._id);
        const snack =(item.meals['snack'] as IRecipe[] | undefined)?.map((item) => item._id);
        const dinner = (item.meals['dinner'] as IRecipe[] | undefined)?.map((item) => item._id);
        
        plans.push({
            day: item.day as IDayName,
            meals: {
                breakfast,
                lunch,
                snack,
                dinner,
            } as IMealsPerDay
        });
    }
    
    const payload = {
        weekStartDate: weekStartDate.value,
        weekEndDate: weekEndDate.value,
        plan: plans,
        user: user.value!,
    };
    
    
    const responseData = await addMealPlan(payload);

    if (responseData.success) {
        alert(responseData.data);
    } else {
        errMsg.value = responseData.errMsg!;
    }
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
