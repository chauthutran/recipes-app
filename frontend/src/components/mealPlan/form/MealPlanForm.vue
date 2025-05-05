<template>
    <div class="p-6 space-y-8 w-full">
        <!-- Week Selector -->
        <section class="flex flex-wrap gap-6 items-center">
            <WeekSelector
                :start="weekStartDate"
                :end="weekEndDate"
                @update:start="weekStartDate = $event"
                @update:end="weekEndDate = $event"
            />
        </section>
        
        <!-- v-for="(dayPlan, index) in dayPlans"
            :key="index" -->
        <DayCard
            :dayPlans="dayPlans"
            @update="(dayIdx, meal) => updateDayMeals(dayIdx, meal)"
        />
        
        <!-- Recipe Search -->
        <section>
            <h2 class="text-2xl font-bold mb-4">Available Recipes</h2>

            <RecipeSearch v-model:query="searchQuery" @search="fetchRecipes" />
            <DraggableRecipeList :recipes="recipes" />

            <SavePlanButton @click="submitPlan" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type {
    IRecipe,
    IDayPlan,
    IDayName,
    IMealsPerDay,
    IMeal,
} from '../../../types/types';
import { HOME_PAGE_RECIPE_LIMIT } from '../../../constants/constants';
import { searchRecipes } from '../../../utils/request/recipeRequest';
import {
    addMealPlan,
    generateEmptyMealPlan,
} from '../../../utils/request/mealPlanRequest';
import { useAuthContext } from '../../../hooks/useAuthContext';
import WeekSelector from './WeekSelector.vue';
import RecipeSearch from './RecipeSearch.vue';
import DraggableRecipeList from './DraggableRecipeList.vue';
import SavePlanButton from './SavePlanButton.vue';
import DayCard from './DayCard.vue';

const dayPlans = ref<IDayPlan[]>(generateEmptyMealPlan());

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

function updateDayMeals(index: number, updatedMeal: IMeal) {
    dayPlans.value[index].meals[updatedMeal.mealType] = updatedMeal.recipes;
}

async function submitPlan() {
    const plans = [];
    for (var i = 0; i < dayPlans.value.length; i++) {
        const item = dayPlans.value[i];
        const breakfast = (
            item.meals['breakfast'] as IRecipe[] | undefined
        )?.map((item: IRecipe) => {
            _id: item._id;
        });
        const lunch = (item.meals['lunch'] as IRecipe[] | undefined)?.map(
            (item) => item._id,
        );
        const snack = (item.meals['snack'] as IRecipe[] | undefined)?.map(
            (item) => item._id,
        );
        const dinner = (item.meals['dinner'] as IRecipe[] | undefined)?.map(
            (item) => item._id,
        );

        plans.push({
            day: item.day as IDayName,
            meals: {
                breakfast,
                lunch,
                snack,
                dinner,
            } as IMealsPerDay,
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
