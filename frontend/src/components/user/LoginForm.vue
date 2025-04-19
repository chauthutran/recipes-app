<template>
    <div class="w-96 p-4 flex flex-col">
        <div class="mb-4">
            <label
                class="block text-xs font-medium text-gray-900"
                htmlFor="email"
            >
                Email
            </label>
            <div class="relative">
                <input
                    class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    v-model="email"
                    placeholder="Enter your email"
                    required
                />
                <UserIcon
                    class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                />
            </div>
        </div>
        <div class="mb-4">
            <label
                class="block text-xs font-medium text-gray-900"
                htmlFor="password"
            >
                Password
            </label>
            <div class="relative">
                <input
                    class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    v-model="password"
                    required
                    minLength="{4}"
                />
                <KeyIcon
                    class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                />
            </div>
        </div>

        <div class="mb-4">
            <button
                class="flex w-full flex-row bg-leaf-green px-4 py-2 rounded hover:bg-green-600 text-white"
                @click="handleLogin"
            >
                <span class="flex-1">Log in</span>
                <!-- <FaSpinner class="ml-auto h-5" size={20} />} -->
            </button>
        </div>

        <div class="flex h-8 items-end space-x-1 text-red-500">
            <p v-if="error != null">{error}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KeyIcon, UserIcon } from '@heroicons/vue/24/solid';
import axios from 'axios';
import { PAGE_HOME } from '../../constants/constants';
import { useAppContext } from '../../composables/useAppContext';

const { appPage } = useAppContext();

const email = ref<string>('test2@example.com');
const password = ref<string>('1234');
const error = ref<string | null>(null);

const handleLogin = async () => {
    if (!email.value || !password.value) {
        error.value = 'Please fill in all fields';
        return;
    }

    error.value = null;
    // Perform login logic here
    const user = await axios.post('http://localhost:3000/users/login', {
        email: email.value,
        password: password.value,
    });
    if (user != null) {
        alert('login successfully !!');
        appPage.value = PAGE_HOME;
    } else {
        error.value = 'Login failed !';
    }
};
</script>
