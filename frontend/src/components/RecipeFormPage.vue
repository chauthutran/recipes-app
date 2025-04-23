<template>
    <div v-if="errMsg !== ''" class="error">{{ errMsg }}</div>

    <form
        v-else
        @submit.prevent="onSubmit"
        class="space-y-5 p-4 bg-white shadow rounded-md text-left"
    >
        <div>
            <label class="block font-semibold mb-1">Recipe Name</label>
            <input
                v-model="recipe.name"
                type="text"
                class="border border-gray-300 rounded-md w-full py-1 px-3"
                required
            />
        </div>

        <div>
            <label class="block font-semibold mb-1">Image</label>
            <!-- <div class="flex items-center gap-4">
                <input
                    v-model="recipe.imageUrl"
                    type="text"
                    class="input flex-1 hidden"
                    placeholder="https://..."
                    readonly
                />
                <input
                    type="file"
                    @change="handleUpload"
                    class="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-leaf-green file:text-white hover:file:bg-green-700"
                />
            </div> -->
            <div class="flex items-center gap-4">
                <!-- Show file name or placeholder -->
                <span class="text-sm text-gray-600 min-w-[140px] truncate">
                    {{ recipe.imageUrl || 'No file chosen' }}
                </span>

                <!-- Custom Upload Button -->
                <label
                    for="fileInput"
                    class="cursor-pointer bg-leaf-green text-white text-sm font-semibold px-4 py-2 rounded hover:bg-green-700"
                >
                    Choose File
                </label>

                <!-- Hidden file input -->
                <input
                    id="fileInput"
                    type="file"
                    class="hidden"
                    @change="onFileChange"
                />
            </div>
        </div>
        
        <div>
            <label class="block font-semibold mb-1">Ingredients</label>
            <div class="space-y-1">
                <div
                    v-for="(ingredient, i) in recipe.ingredients?.length ? recipe.ingredients : ['']"
                    :key="i + '_' + ingredient"
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
                    v-for="(method, i) in recipe.method?.length ? recipe.method : ['']"
                    :key="i + '_' + method"
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
                :selectedIds="recipe.categories?.length ? recipe.categories.map((item: ICategory) => item._id) : []"
            />
        </div>

        <div>
            <label class="text-lg font-semibold text-gray-800">
                Meal Types
            </label>
            <MealTypeSelector @itemsOnClick="handleMealTypeChange" />
        </div>

        <div>
            <label class="text-lg font-semibold text-gray-800">Dietary Restrictions</label>
            <DietaryRestrictionSelector @itemsOnClick="handleDietaryRestrictionChange" />
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
import DietaryRestrictionSelector from './features/DietaryRestrictionSelector.vue';
import MealTypeSelector from './features/MealTypeSelector.vue';
import { retrieveRecipeDetails, uploadImage } from '../utils/RESTUtils';

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
const errMsg = ref("");
    

// If in edit mode, fetch the recipe
onMounted(async () => {
    if (isEditMode) {
        const repsonseData = await retrieveRecipeDetails(recipeId);
            
        if( repsonseData.success ) {
            recipe.value = repsonseData.data!;
        }
        else {
            errMsg.value = repsonseData.errMsg!;
        }
    
        // recipe = await getDetails();
        // name.value = recipe.name;
        // ingredients.value = recipe.ingredients
        // method.value = recipe.method;
        // imageUrl.value = recipe?.imageUrl || "";
        // categories.value = recipe.categories;
        // mealTypes.value = recipe.mealTypes;
        // dietaryRestrictions.value = recipe.dietaryRestrictions;
    }
});

const handleCategoryOnClick = async (selectedIds: ICategory[]) => {
    recipe.value.categories = selectedIds;
};


const handleMealTypeChange = (selected: string[]) => {
    recipe.value.mealTypes = selected;
}

const handleDietaryRestrictionChange = (selected: string[]) => {
    recipe.value.dietaryRestrictions = selected;
}

const file = ref<File | null>(null);
function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
        file.value = target.files[0];
    }
}

// async function handleUpload() {
//     if (!file.value) {
//         console.error('No file selected');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('file', file.value); // now it's guaranteed to be a File

//     const res = await fetch('http://localhost:3000/recipes/upload', {
//         method: 'POST',
//         body: formData,
//     });

//     const data = await res.json();
//     console.log(data.url); // Cloudinary image URL
// }


async function handleUpload() {
    if (!file.value) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value); // now it's guaranteed to be a File

    const repsonseData = await uploadImage(formData);
    if( repsonseData.success && repsonseData.data) {
        console.log(repsonseData.data.url); // Cloudinary image URL
    }
    else {
        errMsg.value = repsonseData.errMsg!;
    }
    
    
}

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
    console.log("============ recipeData");
    console.log(recipe.value);
    handleUpload();
    // props.onSave(recipe);
}
</script>
