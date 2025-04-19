<template>
    <LoginForm v-if="appPage === PAGE_LOGIN" />
    <HomePage v-else-if="appPage === PAGE_HOME" />
    <RecipeList v-else-if="appPage === PAGE_DISCOVER" />
    <RecipesByCategoryPage v-else-if="appPage === PAGE_RECIPES_BY_CATEGORY" />
</template>

<script setup lang="ts">
import {
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_DISCOVER,
    PAGE_RECIPES_BY_CATEGORY,
} from '../constants/constants';
import HomePage from './HomePage.vue';
import LoginForm from './user/LoginForm.vue';
import RecipesByCategoryPage from './RecipesByCategoryPage.vue';
import { useAppContext } from '../composables/useAppContext';
import RecipeList from './DiscoverPage.vue';

const { appPage } = useAppContext();
</script>
