<template>
    <div class="w-full">
        <div v-if="!recipes" class="text-gray-500 italic">
            You haven't added any recipes yet.
        </div
        
        <div v-else-if="recipes.length == 0" class="text-gray-500 italic">
            You haven't added any recipes yet.
        </div>
      
        <RecipesPaging 
            v-else 
            :recipes="recipes"
            :page="page"
            @update:page="(newPage: number) => { page = newPage }" />
        </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import axios from 'axios'
import type { IRecipe } from '../types/types'
import { useAuthContext } from '../composables/useAuthContext'
import type RecipesPaging from './basics/RecipesPaging.vue';
import { HOME_PAGE_RECIPE_LIMIT } from '../constants/constants';
  
  const { user } = useAuthContext();
  const page = ref(1);
  const recipes = ref<IRecipe[]>([])
  
  const fetchUserRecipes = async () => {
    const res = await axios.get('/api/recipes/', {
        params: {
            userId: user.value!._id,
            limit: HOME_PAGE_RECIPE_LIMIT,
            page: page.value,
        }
    })
    recipes.value = res.data
  }
  
  const deleteRecipe = async (id: string) => {
    await axios.delete(`/api/recipes/${id}`)
    recipes.value = recipes.value.filter(r => r._id !== id)
  }
  
  const editRecipe = (recipe: IRecipe) => {
    // You can emit, route to edit page, or open a modal
    console.log('Edit', recipe)
  }
  
  onMounted(fetchUserRecipes);
// Whenever page changes (e.g., user clicks 'Next' or 'Prev'), call the fetchRecipes() function
watch(page, fetchUserRecipes);

  </script>
  
  <style scoped>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  