<template>
     <div class="bg-white p-5 rounded-lg shadow-lg">
            
        <h2 class="text-3xl font-bold mb-5 flex items-center justify-center text-center">Post Message</h2>

        <form @submit.prevent="handleSubmit" action="POST">
            <div class="mb-4">
                <label htmlFor="name" class="block text-sm font-semibold">Title</label>
                <input
                    type="text"
                    id="title"
                    value={name}
                    class="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                />
            </div>


            <div class="mb-4">
                <label htmlFor="name" class="block text-sm font-semibold mb-1">Upload Image</label>
                <input type="file" accept="image/*" @change="handleFileChange($event)" />
            </div>
            
            <button
                type="submit"
                class="flex bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                <span class="flex-1">Upload</span>

            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref("");
const imageFile = ref<string | null>("");

const handleSubmit = async() => {
    // const response = await dbService.createRecipe({ name, imageFile });
    // if (response.status === "success") {
    //     console.log("The message is posted!");
    //     setImageFile(null);
    // }
    // else {
    //     alert(response.message);
    // }
    
    console.log();
}

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            imageFile.value = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
}
</script>