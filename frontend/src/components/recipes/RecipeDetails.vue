<template>
    <LoadingCircle v-if="!recipe" />

    <div v-else class="p-4 w-full space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <!-- Small screen: title above image -->
            <h2 class="text-xl font-semibold sm:hidden text-left">
                {{ recipe.name }}
            </h2>

            <!-- Recipe Image -->
            <RecipeImage :recipe="recipe" />

            <!-- Right side on large, below on small -->
            <div class="flex flex-col justify-between text-left space-y-2">
                <!-- Large screen: title -->
                <h2 class="text-xl font-semibold hidden sm:block">
                    {{ recipe.name }}
                </h2>

                <p class="text-gray-500 text-sm">
                    Created at: {{ formatDate(recipe.createdAt!) }}
                </p>

                <RecipeActionBar :data="recipe" />
            </div>
        </div>

        <div className="mt-2 text-left">
            <div class="text-lg font-semibold">
                {{ recipe.ingredients.length }} ingredients used to make the
                {{ recipe.name }} are:
            </div>
            <ul className="list-disc pl-7 space-y-2">
                <li
                    v-for="(ingredient, index) in recipe.ingredients"
                    :key="'igd_' + index"
                >
                    {{ ingredient }}
                </li>
            </ul>
        </div>

        <div className="mt-5 text-left space-y-2">
            <div class="text-lg font-semibold">
                {{ recipe.method.length }} steps to make {{ recipe.name }} are:
            </div>
            <ol className="list-decimal pl-6 space-y-2">
                <li
                    v-for="(step, index) in recipe.method"
                    :key="'mtd_' + index"
                >
                    {{ step }}
                </li>
            </ol>
        </div>
    </div>

    <div>
        <h2
            className="text-2xl font-semibold my-4 border-b border-leaf-green w-fit pr-5"
        >
            Recommended Recipes
        </h2>
        <div v-if="recommendedRecipes === null" class="italic p-4">
            Loading ...
        </div>
        <div v-else-if="recommendedRecipes.length === 0" class="italic p-4">
            No recommended recipes found.
        </div>

        <RowGridLayout v-else>
            <RecipeCard
                v-for="rep in recommendedRecipes"
                :key="'rcm_' + rep._id"
                :recipe="rep"
            />
        </RowGridLayout>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ICategory, IRecipe } from '../../types/types';
import { useRoute } from 'vue-router';
import LoadingCircle from '../basics/LoadingCircle.vue';
import RecipeImage from '../basics/RecipeImage.vue';
import { formatDate } from '../../utils/dateUtils';
import RecipeActionBar from './RecipeActionBar.vue';
import axios from 'axios';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import qs from 'qs';
import RecipeCard from './RecipeCard.vue';
import RowGridLayout from '../layout/RowGridLayout.vue';

const route = useRoute();
const recipeId = route.params.id;

const recipe = ref<IRecipe | null>(null);
const recommendedRecipes = ref<IRecipe[] | null>(null);

onMounted(async () => {
    const data = await getDetails();
    recipe.value = data;

    await getSuggestionRecipes(data.categories);
});

const getDetails = async () => {
    const res = await fetch(`http://localhost:3000/recipes/view/${recipeId}`);
    return await res.json();
};

const getSuggestionRecipes = async (categories: ICategory[]) => {
    const categoryIds = categories.map((item) => item._id);
    const res = await axios.get('http://localhost:3000/recipes/query', {
        params: {
            categories: categoryIds,
            limit: HOME_PAGE_RECIPE_LIMIT,
        },
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'comma' }),
    });

    recommendedRecipes.value = res.data;
};
</script>
