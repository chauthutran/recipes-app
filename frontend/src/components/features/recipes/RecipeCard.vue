<template>
    <div
        class="p-4 border-2 border-leaf-green rounded-md shadow-sm w-full h-full flex flex-col justify-between space-y-3 max-w-md"
    >
        <RecipeImage :recipe="recipe" />

        <div class="">
            <RecipeRating
                :rating="calculateAverageRating(recipe)"
                :ratingUserNo="recipe.ratings?.length"
            />

            <h3 class="mt-4 text-lg font-semibold text-gray-800">
                {{ recipe.name }}
            </h3>
            <p
                v-if="recipe.categories"
                class="text-sm text-gray-600 mt-1 line-clamp-2"
            >
                {{
                    recipe.categories
                        .map((item: ICategory) => item.name)
                        .join(', ')
                }}
            </p>
            <p class="text-gray-500 text-sm mt-2">
                Created at: {{ formatDate(recipe.createdAt!) }}
            </p>

            <div class="mt-2 flex justify-between items-center gap-x-2">
                <button
                    @click="showDetailsForm()"
                    :class="[
                        'bg-green-100 text-green-700 hover:bg-green-200 py-1 rounded text-center',
                        allowToEdit() ? 'w-1/2' : 'w-full',
                    ]"
                >
                    Details
                </button>
                <button
                    v-if="allowToEdit()"
                    @click="showEditForm()"
                    class="w-1/2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-center hover:underline"
                >
                    Edit
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import RecipeRating from './RecipeRating.vue';
import { useAuthContext } from '../../../hooks/useAuthContext';
import type { ICategory, IRecipe } from '../../../types/types';
import { calculateAverageRating } from '../../../utils/recipeUtils';
import { formatDate } from '../../../utils/dateUtils';
import RecipeImage from '../../basics/RecipeImage.vue';

const router = useRouter();
const { user } = useAuthContext();

const props = defineProps<{
    recipe: IRecipe;
}>();

const allowToEdit = () => {
    return props.recipe.user._id === user.value?._id;
};

const showDetailsForm = () => {
    router.push(`/recipes/${props.recipe._id}`);
};

const showEditForm = () => {
    router.push(`/recipes/form/${props.recipe._id}`);
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
