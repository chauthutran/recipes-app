<template>
    <LoginForm v-if="appPage === PAGE_LOGIN" />
    <HomePage v-else-if="appPage === PAGE_HOME" />
    <RecipeList v-else-if="appPage === PAGE_DISCOVER" />
    <CategoryPage v-else-if="appPage === PAGE_RECIPES_BY_CATEGORY" />
    <MyRecipesPage v-else-if="appPage === PAGE_MY_RECIPES" />
    <FavoritesPage v-else-if="appPage === PAGE_FAVORITES" />
    
    
    <RecipeDetails v-else-if="appPage === PAGE_RECIPE_DETAILS" />
</template>

<script setup lang="ts">
import {
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_DISCOVER,
    PAGE_RECIPES_BY_CATEGORY,
    PAGE_MY_RECIPES,
    PAGE_FAVORITES,
    PAGE_RECIPE_DETAILS,
} from '../constants/constants';
import HomePage from './HomePage.vue';
import LoginForm from './user/LoginForm.vue';
import { useAppContext } from '../composables/useAppContext';
import RecipeList from './DiscoverPage.vue';
import CategoryPage from './CategoryPage.vue';
import MyRecipesPage from './MyRecipesPage.vue';
import FavoritesPage from './FavoritesPage.vue';
import type RecipeDetails from './recipes/RecipeDetails.vue';

const { appPage } = useAppContext();
</script>
