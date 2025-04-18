<template>
    <LoginForm v-if="appPage.name === PAGE_LOGIN" />
    <HomePage v-if="appPage.name === PAGE_HOME" />
    <RecipesByCategoryPage v-if="appPage.name === PAGE_RECIPES_BY_CATEGORY" />
</template>

<script setup lang="ts">
import {
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_RECIPES_BY_CATEGORY,
} from '../constants/constants';
import HomePage from './HomePage.vue';
import LoginForm from './user/LoginForm.vue';
import RecipesByCategoryPage from './RecipesByCategoryPage.vue';
import { useAppContext } from '../composables/useAppContext';

const { appPage } = useAppContext();
</script>
