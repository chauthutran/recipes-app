<template>
    <div class="flex h-screen flex-col">
        <Header />

        <main className="flex-1 flex p-4">
            <RecipeList />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import RecipeList from './components/recipes/RecipeList.vue';
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
