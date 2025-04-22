<template>
    <form
        @submit.prevent="onSubmit"
        class="space-y-4 p-4 bg-white shadow rounded-md text-left"
    >
        <div>
            <label class="block font-semibold mb-1">Recipe Name</label>
            <input v-model="form.name" type="text" class="border border-gray-300 rounded-md w-full p-1" required />
        </div>

        <div>
            <label class="block font-semibold mb-1">Ingredients</label>
            <!-- <div class="space-y-1">
                <div
                    v-for="(ingredient, i) in form.ingredients"
                    :key="i"
                    class="flex gap-2"
                >
                    <input v-model="form.ingredients[i]" class="input flex-1" />
                    <button
                        type="button"
                        @click="removeIngredient(i)"
                        class="text-red-500"
                    >
                        Remove
                    </button>
                </div>
                <button
                    type="button"
                    @click="addIngredient"
                    class="text-green-600 underline"
                >
                    + Add Ingredient
                </button>
            </div> -->
        </div>

        <div>
            <label class="block font-semibold mb-1">Method</label>
            <!-- <div class="space-y-1">
                <div
                    v-for="(step, i) in form.method"
                    :key="i"
                    class="flex gap-2"
                >
                    <input v-model="form.method[i]" class="input flex-1" />
                    <button
                        type="button"
                        @click="removeMethod(i)"
                        class="text-red-500"
                    >
                        Remove
                    </button>
                </div>
                <button
                    type="button"
                    @click="addMethod"
                    class="text-green-600 underline"
                >
                    + Add Step
                </button>
            </div> -->
        </div>

        <div>
            <label class="block font-semibold mb-1">Image URL</label>
            <input
                v-model="form.imageUrl"
                type="text"
                class="input"
                placeholder="https://..."
            />
        </div>

        <div>
            <label class="block font-semibold mb-1"
                >Categories (comma-separated)</label
            >
            <input
                v-model="form.categories"
                class="input"
                placeholder="e.g. breakfast, quick-meal"
            />
        </div>

        <div>
            <label class="block font-semibold mb-1">Meal Types</label>
            <div class="flex flex-wrap gap-2">
                <label
                    v-for="type in mealTypeOptions"
                    :key="type"
                    class="flex items-center gap-1"
                >
                    <input
                        type="checkbox"
                        :value="type"
                        v-model="form.mealTypes"
                    />
                    {{ type }}
                </label>
            </div>
        </div>

        <div>
            <label class="block font-semibold mb-1">Dietary Restrictions</label>
            <div class="flex flex-wrap gap-2">
                <label
                    v-for="option in dietaryOptions"
                    :key="option"
                    class="flex items-center gap-1"
                >
                    <input
                        type="checkbox"
                        :value="option"
                        v-model="form.dietaryRestrictions"
                    />
                    {{ option }}
                </label>
            </div>
        </div>

        <div class="flex justify-end gap-4 mt-4">
            <button
                type="submit"
                class="bg-leaf-green text-white px-4 py-2 rounded hover:bg-green-700"
            >
                {{ isEdit ? 'Update Recipe' : 'Add Recipe' }}
            </button>
        </div>
    </form>

    <form @submit.prevent="handleUpload">
        <input type="file" @change="onFileChange" />
        <button type="submit">Upload</button>
    </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { IRecipe } from '../../types/types';

const props = defineProps<{
    modelValue?: any; // For editing
    onSave: (recipeData: any) => void;
}>();

const emit = defineEmits(['update:modelValue']);
const route = useRoute();

const recipeId = route.params.id as string | undefined;
const isEditMode = !!recipeId;
const recipe = ref<IRecipe | null>(null);

// If in edit mode, fetch the recipe
onMounted(async () => {
    if (isEditMode) {
        const res = await fetch(`http://localhost:3000/recipes/view/${recipeId}`);
        recipe.value = await res.json();
    }
});

const file = ref<File | null>(null);
function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
        file.value = target.files[0];
    }
}

async function handleUpload() {
    if (!file.value) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('file', file.value); // now it's guaranteed to be a File

    const res = await fetch('http://localhost:3000/recipes/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    console.log(data.url); // Cloudinary image URL
}

///

const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
];
const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const defaultForm = {
    name: '',
    ingredients: [''],
    method: [''],
    imageUrl: '',
    categories: '',
    mealTypes: [] as string[],
    dietaryRestrictions: [] as string[],
};

const form = reactive({ ...defaultForm });

const isEdit = computed(() => !!props.modelValue);

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            Object.assign(form, {
                ...val,
                categories: val.categories?.join(', ') ?? '',
            });
        }
    },
    { immediate: true },
);

// function addIngredient() {
//     form.ingredients.push('');
// }

// function removeIngredient(index: number) {
//     form.ingredients.splice(index, 1);
// }

// function addMethod() {
//     form.method.push('');
// }

// function removeMethod(index: number) {
//     form.method.splice(index, 1);
// }

function onSubmit() {
    const recipeData = {
        ...form,
        categories: form.categories.split(',').map((c) => c.trim()),
    };
    props.onSave(recipeData);
}
</script>
