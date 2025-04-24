<template>
    <div class="w-full">
        <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-left">Find My Recipes</h2>

            <!-- Add New Link -->
            <router-link
                to="/recipes/add"
                class="bg-leaf-green text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
            >
                + Add New
            </router-link>
        </div>

        <FindRecipes @on-search="handleOnSearch" />

        <div v-if="errMsg !== ''" class="error">{{ errMsg }}</div>

        <RecipesPaging
            v-else
            :recipes="recipes"
            :page="page"
            @update:page="(newPage: number) => { page = newPage }"
        />
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { IRecipe } from '../types/types';
import { useAuthContext } from '../hooks/useAuthContext';
import RecipesPaging from './features/recipes/RecipesPaging.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
import FindRecipes from './homePage/FindRecipes.vue';
import { searchRecipes } from '../utils/request/recipeRequest';

const { user } = useAuthContext();
const page = ref(1);
const searchQuery = ref('');
const errMsg = ref('');
const recipes = ref<IRecipe[]>([]);

const fetchUserRecipes = async () => {
    const params = {
        userId: user.value!._id,
        search: searchQuery.value,
        limit: HOME_PAGE_RECIPE_LIMIT,
        page: page.value,
    };

    const repsonseData = await searchRecipes(params);
    if (repsonseData.success) {
        recipes.value = repsonseData.data!;
    } else {
        errMsg.value = repsonseData.errMsg!;
    }
};

const handleOnSearch = async (searchValue: string) => {
    searchQuery.value = searchValue;
    await fetchUserRecipes();
};

/** const deleteRecipe = async (id: string) => {
    await axios.delete(`/recipes/${id}`)
    recipes.value = recipes.value.filter(r => r._id !== id)
  }
  
  const editRecipe = (recipe: IRecipe) => {
    // You can emit, route to edit page, or open a modal
    console.log('Edit', recipe)
  } */

onMounted(fetchUserRecipes);
// Whenever page changes (e.g., user clicks 'Next' or 'Prev'), call the fetchRecipes() function
watch(page, fetchUserRecipes);
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
