<template>
    <div class="space-y-6 w-full">
        <CategorySelector @itemsOnClick="handleCategoryOnClick" />

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
import { useAuthContext } from '../hooks/useAuthContext';
import type { ICategory, IRecipe } from '../types/types';
import RecipesPaging from './features/recipes/RecipesPaging.vue';
import { retrieveFavoritesByUser } from '../utils/request/userRequest';
import CategorySelector from './features/categories/CategorySelector.vue';

const { user } = useAuthContext();
const page = ref(1);
const errMsg = ref('');

const recipes = ref<IRecipe[] | null>([]);
const selectedCategoryIds = ref<ICategory[]>([]);

const handleCategoryOnClick = async (selectedIds: ICategory[]) => {
    selectedCategoryIds.value = selectedIds;
    page.value = 1; // Reset to first page when filters change
    await fetchRecipes();
};

const fetchRecipes = async () => {
    const repsonseData = await retrieveFavoritesByUser(
        user.value!._id,
        selectedCategoryIds.value,
        page.value,
    );
    if (repsonseData.success) {
        recipes.value = repsonseData.data!;
    } else {
        errMsg.value = repsonseData.errMsg!;
    }
};

watch(selectedCategoryIds, fetchRecipes);

// onMounted(fetchRecipes)
</script>
