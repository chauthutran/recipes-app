
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../components/HomePage.vue';
import DiscoverPage from '../components/DiscoverPage.vue';
import CategoryPage from '../components/CategoryPage.vue';
import MyRecipesPage from '../components/MyRecipesPage.vue';
import FavoritesPage from '../components/FavoritesPage.vue';
import LoginForm from '../components/user/LoginForm.vue';
import RecipeDetails from '../components/recipes/RecipeDetails.vue';

const routes = [
    {path: "/", name: "Home", component: HomePage },
    {path: "/", name: "Discover", component: DiscoverPage },
    {path: "/", name: "Categories", component: CategoryPage },
    {path: "/", name: "My Recipes", component: MyRecipesPage },
    {path: "/", name: "Favorites", component: FavoritesPage },
    
    {path: "/", name: "Login", component: LoginForm },
    {path: "/", name: "Details", component: RecipeDetails },
]

const route = createRouter({
    history: createWebHistory(),
    routes
});

export default route;