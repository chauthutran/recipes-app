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
            <label class="block font-semibold mb-1">
                Image
            </label>
            
            <div class="flex items-center gap-2">
                <!-- Image preview -->
                <span
                    v-if="!previewUrl && !recipe.imageUrl"
                    class="flex-1 text-sm text-gray-600 min-w-[140px] truncate italic border border-gray-300 py-2 px-3 rounded-md"
                >
                    {{ recipe.imageUrl || file?.name || 'No file chosen' }}
                </span>
                
                <div v-else class="mt-4">
                    <img
                        :src="previewUrl || recipe.imageUrl"
                        alt="Image Preview"
                        class="w-48 h-48 object-cover rounded border"
                    />
                </div>
                
                <!-- Custom Upload Button -->
                <label
                    for="fileInput"
                    class="text-green-600 bg-gray-100 py-2 px-3 font-semibold rounded hover:bg-gray-200 border border-gray-200"
                >
                    Choose Image

                    <!-- Hidden file input -->
                    <input
                        id="fileInput"
                        type="file"
                        class="hidden"
                        @change="onFileChange"
                    />
                </label>
            </div>
        </div>

        <!-- Ingredients -->
        <div>
            <label class="block font-semibold mb-1">Ingredients</label>
            <div class="space-y-1">
                <div
                    v-for="(_, i) in recipe.ingredients?.length
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

        <!-- Method -->
        <div>
            <label class="block font-semibold mb-1">Method</label>
            <div class="space-y-1">
                <div
                    v-for="(_, i) in recipe.method?.length
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

        <!-- Categories -->
        <div>
            <label class="block font-semibold text-lg">Categories</label>
            <CategorySelector
                v-if="recipe.categories"
                :key="recipe._id + '-cat'"
                :hasCheckBox="true"
                :itemSize="32"
                @itemsOnClick="handleCategoryOnClick"
                :selectedIds="
                    recipe.categories.map((item: ICategory) => item._id)
                "
            />
        </div>

        <div>
            <label class="text-lg font-semibold text-gray-800">
                Meal Types
            </label>
            <MealTypeSelector
                v-if="recipe.mealTypes"
                :key="recipe._id + '-meal'"
                @itemsOnClick="handleMealTypeChange"
                :selectedIds="recipe.mealTypes.map((item: string) => item)"
            />
        </div>

        <div>
            <label class="text-lg font-semibold text-gray-800"
                >Dietary Restrictions</label
            >
            <DietaryRestrictionSelector
                v-if="recipe.dietaryRestrictions"
                :key="recipe._id + '-diet'"
                @items-on-click="handleDietaryRestrictionChange"
                :has-check-box="true"
                :selectedList="recipe.dietaryRestrictions.map((item: string) => item)"
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ICategory, IRecipe } from '../types/types';
import CategorySelector from './features/categories/CategorySelector.vue';
import { emptyRecipe } from '../utils/recipeUtils';
import DietaryRestrictionSelector from './features/dietary/DietaryRestrictionSelector.vue';
import MealTypeSelector from './features/MealTypeSelector.vue';
import {
    addRecipe,
    updateRecipe,
    retrieveRecipeDetails,
} from '../utils/request/recipeRequest';
import { onBeforeUnmount } from 'vue';
import {
    uploadImageToCloud,
    deleteImageFromCloud,
} from '../utils/request/cloudinaryRequest';
import { useAuthContext } from '../hooks/useAuthContext';


const emit = defineEmits(['update:modelValue']);
const route = useRoute();
const router = useRouter();
const { user } = useAuthContext();

const recipeId = route.params.id as string | undefined;
const isEditMode = !!recipeId;
const recipe = ref<Partial<IRecipe>>(emptyRecipe);
const previewUrl = ref<string | null>(null);
const errMsg = ref('');
// Store current preview URL
const currentPreviewUrl = ref<string | null>(null);

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


// // Cleanup when component unmounts
// watch(file, (_, oldFile) => {
//     if (oldFile) {
//         URL.revokeObjectURL(previewUrl.value!); // free memory
//     }
// });

async function uploadImage() {
    if (!file.value) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value); // now it's guaranteed to be a File

    const responseData = await uploadImageToCloud(formData);
    if (responseData.success && responseData.data) {
        recipe.value.imageUrl = responseData.data.url; // Cloudinary image URL
        file.value = null;
    } else {
        errMsg.value += responseData.errMsg!;
    }
}

async function deleteRecipeImage() {
    if(!recipe.value.imageUrl) return;
    
    const responseData = await deleteImageFromCloud(recipe.value.imageUrl);
    if (!responseData.success) {
        errMsg.value += responseData.errMsg!;
    }
}

async function onSubmit() {
    errMsg.value = '';
    if( file.value ) {
        await uploadImage();
        // Delete existing image only if a new one is selected and uploaded successfully
        await deleteRecipeImage();
    }
    await saveRecipe();
}

async function saveRecipe() {
    const payload = recipe.value;
    let responseData;
    if (isEditMode) {
        // Update
        responseData = await updateRecipe(payload);
    } else {
        // Add new
        payload.user = user.value!;
        responseData = await addRecipe(payload);
    }

    if (responseData.success) {
        alert('The recipe is saved !');
        if(!isEditMode) {
            router.push(`recipes/form/${responseData.data!._id}`);
        }
    } else {
        errMsg.value += responseData.errMsg!;
    }
}

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

// For selecting an image
function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];
    if (selectedFile) {
        // file.value = selectedFile;
        // previewUrl.value = URL.createObjectURL(selectedFile);
        
        // Cleanup previous preview URL
        if (currentPreviewUrl.value) {
            URL.revokeObjectURL(currentPreviewUrl.value);
        }
        
        file.value = selectedFile;
        const newUrl = URL.createObjectURL(selectedFile);
        previewUrl.value = newUrl;
        currentPreviewUrl.value = newUrl;
    }
}

onBeforeUnmount(() => {
    if (currentPreviewUrl.value) {
        URL.revokeObjectURL(currentPreviewUrl.value);
    }
});
</script>
