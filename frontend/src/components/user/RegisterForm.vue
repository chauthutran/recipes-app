<template>
    <div class="max-w-md mx-auto p-8 h-[calc(100vh-138px)]">
        <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

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
                    type="text"
                    name="email"
                    v-model="email"
                    required
                    minLength="4"
                    placeholder="Enter your email"
                />
                <UserIcon
                    class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                />

                <span v-if="email === ''" class="text-red-500 italic text-sm"
                    >* This field is required</span
                >
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
                    v-model="password"
                    required
                    minLength="4"
                    placeholder="Enter your password"
                />
                <KeyIcon
                    class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                />

                <span v-if="password === ''" class="text-red-500 italic text-sm"
                    >* This field is required</span
                >
            </div>
        </div>

        <div class="mb-4">
            <label
                class="block text-xs font-medium text-gray-900"
                htmlFor="confirmPassword"
            >
                Confirm Password
            </label>
            <div class="relative">
                <input
                    class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    v-model="confirmPassword"
                    required
                    minLength="4"
                    placeholder="Confirm Password"
                />
                <KeyIcon
                    class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                />

                <span
                    v-if="errorMsg !== null"
                    class="text-red-500 italic text-sm"
                    >{{ errorMsg }}</span
                >
            </div>
        </div>

        <div class="mb-4">
            <button
                class="flex w-full flex-row bg-gold px-4 py-2 rounded hover:bg-yellow-300"
                @click.prevent="handleRegister"
            >
                <span class="flex-1">Register</span>
                <!-- {processStatus === Constant.RESPONSE_REGISTRATION_REQUEST && <FaSpinner class="ml-auto h-5 text-gray-50" size={20} />} -->
            </button>
        </div>

        <div class="flex h-8 items-end space-x-1">
            {error !== null &&
            <p>{error}</p>
            }
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KeyIcon, UserIcon } from '@heroicons/vue/24/solid';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');

const handleRegister = () => {
    console.log('Login button is clicked !');
};
</script>
