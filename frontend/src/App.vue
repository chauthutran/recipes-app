<script setup lang="ts">
import { useAppProvider } from './providers/useAppProvider';
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import { useAuthProvider } from './providers/useAuthProvider';

useAppProvider();
useAuthProvider();
</script>

<template>
    <div class="flex h-screen flex-col">
        <Header />

        <main className="p-4 flex flex-1 ">
            <router-view />
        </main>

        <Footer />
    </div>
</template>

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
