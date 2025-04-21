<template>
    <LoginForm v-if="appPage === PAGE_LOGIN" />
    <HomePage v-else-if="appPage === PAGE_HOME" />
    <RecipeList v-else-if="appPage === PAGE_DISCOVER" />
    <CategoryPage v-else-if="appPage === PAGE_RECIPES_BY_CATEGORY" />
    <MyRecipesPage v-else-if="appPage === PAGE_MY_RECIPES" />
</template>

<script setup lang="ts">
import {
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_DISCOVER,
    PAGE_RECIPES_BY_CATEGORY,
PAGE_MY_RECIPES,
} from '../constants/constants';
import HomePage from './HomePage.vue';
import LoginForm from './user/LoginForm.vue';
import { useAppContext } from '../composables/useAppContext';
import RecipeList from './DiscoverPage.vue';
import CategoryPage from './CategoryPage.vue';
import MyRecipesPage from './MyRecipesPage.vue';

const { appPage } = useAppContext();
</script>
