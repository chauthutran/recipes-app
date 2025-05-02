import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../components/HomePage.vue';
import DiscoverPage from '../components/DiscoverPage.vue';
import CategoryPage from '../components/CategoryPage.vue';
import MyRecipesPage from '../components/MyRecipesPage.vue';
import FavoritesPage from '../components/FavoritesPage.vue';
import LoginForm from '../components/user/LoginForm.vue';
import RecipeDetailsPage from '../components/RecipeDetailsPage.vue';
import RecipeFormPage from '../components/RecipeFormPage.vue';
import MealPlannerPage from '../components/MealPlannerPage.vue';
import MealPlanForm from '../components/mealPlan/form/MealPlanForm.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/discovery', name: 'Discover', component: DiscoverPage },
    { path: '/categories', name: 'Categories', component: CategoryPage },
    { path: '/my-recipes', name: 'My Recipes', component: MyRecipesPage },
    { path: '/favorites', name: 'Favorites', component: FavoritesPage },
    { path: '/mealPlanner', name: 'Meal Planner', component: MealPlannerPage },

    { path: '/login', name: 'Login', component: LoginForm },
    {
        path: '/recipes/:id',
        name: 'Recipe Details',
        component: RecipeDetailsPage,
    },
    {
        path: '/recipes/form/:id',
        name: 'Edit Recipe',
        component: RecipeFormPage,
    },
    {
        path: '/recipes/add',
        name: 'Add New Recipe',
        component: RecipeFormPage,
    },
    {
        path: '/meal-plan/add',
        name: 'Add New Meal Plan',
        component: MealPlanForm,
    },
    {
        path: '/meal-plan/form/:id',
        name: 'Edit Meal Plan',
        component: MealPlanForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
