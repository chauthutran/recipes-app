<template>
    <div class="space-y-6 w-full">
        <CategoryNav @itemsOnClick="handleCategoryOnClick" />

        <!-- Recipe List -->
        <RecipesPaging
            v-if="recipes"
            :recipes="recipes"
            :page="page"
            @update:page="
                (newPage: number) => {
                    page = newPage;
                }
            "
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import type { IRecipe } from '../types/types';
import RecipesPaging from './basics/RecipesPaging.vue';
import CategoryNav from './categories/CategoryNav.vue';
import qs from 'qs';

const { user } = useAuthContext();
const page = ref(1);

const recipes = ref<IRecipe[] | null>([]);
const selectedCategoryIds = ref<string[]>([]);

const handleCategoryOnClick = async (selectedIds: string[]) => {
    selectedCategoryIds.value = selectedIds;
    page.value = 1; // Reset to first page when filters change
    await fetchRecipes();
};

const fetchRecipes = async () => {
    const res = await axios.get(
        `http://localhost:3000/users/favorites/${user.value!._id}`,
        {
            params: {
                categories: selectedCategoryIds.value,
                limit: HOME_PAGE_RECIPE_LIMIT,
                page: page.value,
            },
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' }),
        },
    );

    recipes.value = res.data;
};

watch(selectedCategoryIds, fetchRecipes);

// onMounted(fetchRecipes)
</script>
