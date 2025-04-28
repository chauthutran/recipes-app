<template>
    <LoadingCircle v-if="!recipe" />

    <div v-else class="flex flex-col">
        <div class="p-4 w-full space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <!-- Small screen: title above image -->
                <h2 class="text-xl font-semibold sm:hidden text-left">
                    {{ recipe.name }}
                    <div class="flex gap-2">
                        <button
                            class="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            class="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </h2>

                <!-- Recipe Image -->
                <RecipeImage :recipe="recipe" />

                <!-- Right side on large, below on small -->
                <div class="flex flex-col justify-between text-left space-y-2">
                    <!-- Large screen: title -->
                    <h2 class="hidden sm:flex flex-row">
                        <div class="text-xl font-semibold">
                            {{ recipe.name }}
                        </div>
                        <div class="">
                            <button
                                @click="handleOnEdit"
                                class="text-gray-400 font-semibold px-3 py-1 rounded hover:text-blue-500"
                            >
                                <PencilSquareIcon class="w-5 h-5" />
                            </button>
                            <button
                                @click="handleOnDelete"
                                class="text-gray-400 font-semibold py-1 rounded hover:text-red-500"
                            >
                                <TrashIcon class="w-5 h-5" />
                            </button>
                        </div>
                    </h2>

                    <p class="text-gray-500 text-sm">
                        Created at: {{ formatDate(recipe.createdAt!) }}
                    </p>

                    <RecipeRating
                        :rating="calculateAverageRating(recipe)"
                        :ratingUserNo="recipe.ratings?.length"
                    />
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
                    {{ recipe.method.length }} steps to make
                    {{ recipe.name }} are:
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
            <RecipeFetcher
                v-if="recipe"
                :fetch-method="getSuggestionRecipes"
                :fetch-args="[recipe!.categories]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ICategory, IRecipe } from '../types/types';
import { formatDate } from '../utils/dateUtils';
import { calculateAverageRating } from '../utils/recipeUtils';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import LoadingCircle from './basics/LoadingCircle.vue';
import RecipeImage from './basics/RecipeImage.vue';
import RecipeRating from './features/recipes/RecipeRating.vue';
import {
    retrieveRecipeDetails,
    searchRecipes,
    deleteRecipe,
} from '../utils/request/recipeRequest';
import RecipeFetcher from './features/recipes/RecipeFetcher.vue';
import { deleteImageFromCloud } from '../utils/request/cloudinaryRequest';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';

const route = useRoute();
const router = useRouter();

const recipeId = route.params.id as string;

const recipe = ref<IRecipe | null>(null);
const errMsg = ref('');

onMounted(async () => {
    const repsonseData = await retrieveRecipeDetails(recipeId);
    if (repsonseData.success) {
        recipe.value = repsonseData.data!;
    } else {
        errMsg.value = repsonseData.errMsg!;
    }
});

const getSuggestionRecipes = async (categories: ICategory[]) => {
    const categoryIds = categories.map((item) => item._id);
    const params = {
        categories: categoryIds,
        limit: HOME_PAGE_RECIPE_LIMIT,
    };
    return await searchRecipes(params);
};

const handleOnEdit = () => {
    router.push(`/recipes/form/${recipeId}`);
};

const handleOnDelete = async () => {
    const ok = confirm('Are you sure you want to delete this recipe ?');
    if (ok) {
        errMsg.value = '';
        if (recipe.value?.imageUrl) {
            const responseData = await deleteImageFromCloud(
                recipe.value.imageUrl,
            );
            if (!responseData.success) {
                errMsg.value += responseData.errMsg!;
            }
        }

        const responseData = await deleteRecipe(recipe.value?._id!);
        if (responseData.success) {
            alert(`The recipe ${recipe.value?.name} is deleted.`);
            router.back();
        } else {
            errMsg.value += responseData.errMsg!;
        }
    }
};
</script>
