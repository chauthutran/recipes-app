<template>
    <div className="mx-5 mb-8">
        <h2
            className="text-2xl font-semibold border-b border-leaf-green w-fit pr-3 mb-5"
        >
            Categories Navigation
        </h2>

        <div className="px-3">
            <CategoriesNavigation @handleItemOnClick="fetchRecipes" />
        </div>

        <!-- <div v-if="selectedCategory.name !== ''">
            <h2 className="text-2xl font-semibold border-b border-leaf-green w-fit pr-3 mt-10 mb-5 flex space-x-3 pb-2">
                {selectedCategory.icon && <div dangerouslySetInnerHTML={{ __html: selectedCategory.icon.replace('<svg', '<svg width="32" height="32"'), }} />}
                <div>Recipes of {selectedCategory.name}</div>
            </h2>
            {loading ? <div>Loading ...</div> : <RecipeList data={recipes} />}
            
        </div>} -->
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { ICategory } from '../types/types';

const categories = ref<ICategory[]>([]);

onMounted(async () => {
    const res = await axios.get('http://localhost:3000/categories');
    categories.value = res.data;
});

const fetchRecipes = async (filterCategory: ICategory) => {
    // setLoading(true);
    // setSelectedCategory(filterCategories[0]);

    // const filterCategoryIds = filterCategories.map(item => item._id);
    // const response = await axios.get("http://localhost:3000/categories?filter=" + filterCategories.join(","));
    // if( response.status == "success" ) {
    //     setRecipes( response.data );
    // }
    // else {
    //     setErrMsg( response.message );
    // }
    // setLoading(false);
    console.log('=== filterCategory: ', filterCategory);
};
</script>
