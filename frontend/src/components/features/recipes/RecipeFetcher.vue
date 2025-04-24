<template>
    <LoadingCircle v-if="recipes === null" />
    <div v-else-if="errMsg !== ''" class="error">{{ errMsg }}</div>
    <div v-else-if="recipes.length === 0" class="italic p-4">
        No new recipes found.
    </div>
    <RowGridLayout v-else>
        <RecipeCard
            v-for="recipe in recipes"
            :key="'new_' + recipe._id"
            :recipe="recipe"
        />
    </RowGridLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IRecipe, ResponseData } from '../../../types/types';
import RowGridLayout from '../../layout/RowGridLayout.vue';
import RecipeCard from './RecipeCard.vue';

const props = defineProps<{
    fetchMethod: (...args: any[]) => Promise<ResponseData<IRecipe[]>>;
    fetchArgs?: any[]; // optional arguments for flexibility
}>();

const isLoading = ref(false);
const errMsg = ref('');
const recipes = ref<IRecipe[]>([]);

onMounted(async () => {
    isLoading.value = true;
    const repsonseData = await props.fetchMethod(...(props.fetchArgs || []));
    if (repsonseData.success) {
        recipes.value = repsonseData.data!;
    } else {
        errMsg.value = repsonseData.errMsg!;
    }

    isLoading.value = false;
});
</script>
