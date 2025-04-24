<template>
    <div v-if="errMsg !== ''" class="error">{{ errMsg }}</div>

    <form
        v-else
        @submit.prevent="onSubmit"
        class="space-y-5 p-4 bg-white shadow rounded-md text-left"
    >
        <!-- Name -->
        <div>
            <label class="block font-semibold mb-1">Recipe Name</label>
            <input
                v-model="recipe.name"
                type="text"
                class="border border-gray-300 rounded-md w-full py-1 px-3"
                required
            />
        </div>
        
        <!-- Image -->
        <div>
            <label class="block font-semibold mb-1">Image</label>
            <div class="flex items-center gap-2">
                <!-- Show file name or placeholder -->
                <span class="flex-1 text-sm text-gray-600 min-w-[140px] truncate italic border border-gray-300 py-2 px-3 rounded-md ">
                    {{ recipe.imageUrl || file?.name || 'No file chosen' }}
                </span>

                <!-- Custom Upload Button -->
                <label
                    for="fileInput"
                    class="cursor-pointer bg-leaf-green text-white text-sm font-semibold px-4 py-2 rounded hover:bg-green-700"
                >
                    Choose Image
                </label>

                <!-- Hidden file input -->
                <input
                    id="fileInput"
                    type="file"
                    class="hidden"
                    @change="onFileChange"
                />
                
                <button 
                    v-if="file"
                    type="button"
                    class="cursor-pointer bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700"
                    @click="handleImageUpload"
                >
                    Upload
                </button>
            </div>
        </div>

        <div>
            <label class="block font-semibold mb-1">Ingredients</label>
            <div class="space-y-1">
                <div
                    v-for="(ingredient, i) in recipe.ingredients?.length
                        ? recipe.ingredients
                        : ['']"
                    :key="i"
                    class="flex gap-2"
                >
                    <input
                        v-model="recipe.ingredients![i]"
                        type="text"
                        class="border border-gray-300 rounded-md w-full py-1 px-3"
                    />
                    <button
                        type="button"
                        class="text-red-500 bg-gray-100 py-2 px-3 font-semibold rounded hover:bg-gray-200 border border-gray-200"
                        @click="removeIngredient(i)"
                    >
                        Remove
                    </button>
                </div>

                <button
                    type="button"
                    class="text-green-600 underline"
                    @click="addIngredient"
                >
                    + Add Ingredient
                </button>
            </div>
        </div>

        <div>
            <label class="block font-semibold mb-1">Method</label>
            <div class="space-y-1">
                <div
                    v-for="(method, i) in recipe.method?.length
                        ? recipe.method
                        : ['']"
                    :key="i"
                    class="flex gap-2"
                >
                    <input
                        v-model="recipe.method![i]"
                        type="text"
                        class="border border-gray-300 rounded-md w-full py-1 px-3"
                    />
                    <button
                        type="button"
                        class="text-red-500 bg-gray-100 py-2 px-3 font-semibold rounded hover:bg-gray-200 border border-gray-200"
                        @click="removeMethod(i)"
                    >
                        Remove
                    </button>
                </div>
                <button
                    type="button"
                    class="text-green-600 underline"
                    @click="addMethod"
                >
                    + Add Step
                </button>
            </div>
        </div>

        <!-- <div>
            <label class="block font-semibold mb-1">Image URL</label>
            <input
                v-model="recipe.imageUrl"
                type="text"
                class="input"
                placeholder="https://..."
            />
        </div> -->

        <div>
            <label class="block font-semibold text-lg">Categories</label>
            <CategorySelector
                :hasCheckBox="true"
                :itemSize="32"
                @itemsOnClick="handleCategoryOnClick"
                :selectedIds="
                    recipe.categories?.length
                        ? recipe.categories.map((item: ICategory) => item._id)
                        : []
                "
            />
        </div>

        <div>
            <label class="text-lg font-semibold text-gray-800">
                Meal Types
            </label>
            <MealTypeSelector @itemsOnClick="handleMealTypeChange" />
        </div>

        <div>
            <label class="text-lg font-semibold text-gray-800"
                >Dietary Restrictions</label
            >
            <DietaryRestrictionSelector
                @itemsOnClick="handleDietaryRestrictionChange"
            />
        </div>

        <div class="flex justify-end gap-4 mt-4">
            <button
                type="submit"
                class="bg-leaf-green text-white px-4 py-2 rounded hover:bg-green-700"
            >
                {{ recipeId ? 'Update Recipe' : 'Add Recipe' }}
            </button>
        </div>
    </form>

    <!-- <form @submit.prevent="handleUpload">
        <input type="file" @change="onFileChange" />
        <button type="submit">Upload</button>
    </form> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { ICategory, IRecipe } from '../types/types';
import CategorySelector from './features/categories/CategorySelector.vue';
import { emptyRecipe } from '../utils/recipeUtils';
import DietaryRestrictionSelector from './features/dietary/DietaryRestrictionSelector.vue';
import MealTypeSelector from './features/MealTypeSelector.vue';
import {
addRecipe,
    retrieveRecipeDetails,
    uploadImage,
} from '../utils/request/recipeRequest';

const emit = defineEmits(['update:modelValue']);
const route = useRoute();

// const name = ref(''),
// const ingredients = ref<string[]> (['']);
// const method = ref<string[]> (['']);
// const imageUrl = ref('');
// const categories= ref<ICategory[]> ([]);
// const mealTypes = ref<string[]> (['']);
// const dietaryRestrictions = ref<string[]> (['']);

const recipeId = route.params.id as string | undefined;
const isEditMode = !!recipeId;
const recipe = ref<Partial<IRecipe>>(emptyRecipe);
const errMsg = ref('');

// If in edit mode, fetch the recipe
onMounted(async () => {
    if (isEditMode) {
        const repsonseData = await retrieveRecipeDetails(recipeId);

        if (repsonseData.success) {
            recipe.value = repsonseData.data!;
        } else {
            errMsg.value = repsonseData.errMsg!;
        }
    }
});

const handleCategoryOnClick = async (selectedIds: ICategory[]) => {
    recipe.value.categories = selectedIds;
};

const handleMealTypeChange = (selected: string[]) => {
    recipe.value.mealTypes = selected;
};

const handleDietaryRestrictionChange = (selected: string[]) => {
    recipe.value.dietaryRestrictions = selected;
};

const file = ref<File | null>(null);

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
        file.value = target.files[0];
    }
}

async function handleImageUpload() {
    if (!file.value) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value); // now it's guaranteed to be a File

    const responseData = await uploadImage(formData);
    if( responseData.success && responseData.data) {
        recipe.value.imageUrl = responseData.data.url; // Cloudinary image URL
        file.value = null;
    }
    else {
        errMsg.value = responseData.errMsg!;
    }
}

async function saveRecipe () {
    const payload = recipe.value;
    if(payload._id) { // Update
        
    }
    else { // Add new
        const responseData = await addRecipe(payload);
    }
}
// async function handleUpload() {
//     if (!file.value) {
//         console.error('No file selected');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('file', file.value); // now it's guaranteed to be a File

//     const repsonseData = await uploadImage(formData);
//     if (repsonseData.success && repsonseData.data) {
//         console.log(repsonseData.data.url); // Cloudinary image URL
//     } else {
//         errMsg.value = repsonseData.errMsg!;
//     }
// }

///

// watch(
//     () => props.modelValue,
//     (val) => {
//         if (val) {
//             Object.assign(form, {
//                 ...val,
//                 categories: Object.assign(form, val),
//             });
//         }
//     },
//     { immediate: true },
// );

function addIngredient() {
    recipe.value.ingredients?.push('');
}

function removeIngredient(index: number) {
    recipe.value.ingredients?.splice(index, 1);
}

function addMethod() {
    recipe.value.method?.push('');
}

function removeMethod(index: number) {
    recipe.value.method?.splice(index, 1);
}

function onSubmit() {
    // const recipeData = {
    //     ...form
    // };
    console.log('============ recipeData');
    console.log(recipe.value);
    handleUpload();
    // props.onSave(recipe);
}
</script>
