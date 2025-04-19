<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="w-96 p-6 bg-white rounded-lg shadow-md">
            <!-- Email -->
            <div class="mb-5 w-full text-left">
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                >
                    Email
                </label>
                <div class="relative">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        v-model="email"
                        placeholder="Enter your email"
                        required
                        class="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-leaf-green"
                    />
                    <UserIcon
                        class="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-leaf-green"
                    />
                </div>
            </div>

            <!-- Password -->
            <div class="mb-5 w-full text-left">
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 mb-1 text-left"
                >
                    Password
                </label>
                <div class="relative">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="Enter password"
                        required
                        minlength="4"
                        class="peer block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-leaf-green focus:border-leaf-green"
                    />
                    <KeyIcon
                        class="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-leaf-green"
                    />
                </div>
            </div>

            <div class="mb-4">
                <button
                    :class="[
                        'flex w-full flex-row px-4 py-2 rounded text-white',
                        loading ? 'bg-gray-300' : 'bg-leaf-green hover:bg-green-600',
                    ]"
                    @click="handleLogin"
                >
                    <span class="flex-1">Log in</span>
                    <LoadingCircle :size="20" v-if="loading" />
                    <!-- <FaSpinner class="ml-auto h-5" size={20} />} -->
                </button>
            </div>
        </div>
        
        <p v-if="errMsg !== ''">{{ errMsg }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoadingCircle from "../basics/LoadingCircle.vue";
import { KeyIcon, UserIcon } from '@heroicons/vue/24/solid';
import { PAGE_HOME } from '../../constants/constants';
import { useAppContext } from '../../composables/useAppContext';
import { useAuthContext } from '../../composables/useAuthContext';

const { appPage } = useAppContext();
const { user, login, loading, errMsg } = useAuthContext();

const email = ref<string>('test2@example.com');
const password = ref<string>('1234');
const error = ref<string | null>(null);

const handleLogin = async () => {
    if (!email.value || !password.value) {
        error.value = 'Please fill in all fields';
        return;
    }

    await login(email.value, password.value);
    if(user)
    {
        appPage.value = PAGE_HOME;
    }
};
</script>
