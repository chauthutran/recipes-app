<template>
    <div 
        :key="data._id" 
        class="p-4 border-2 border-leaf-green rounded-md shadow-sm w-full space-y-3">
            <h2 className="text-xl font-semibold">{{ data.name }}</h2>
            <Image
                v-if="data.imageUrl"
                :src="data.imageUrl"
                alt="Logo"
                width="300"
                height="500"
            />
            <div className="mt-2">
                <strong>Ingredients:</strong>
                <ul className="list-disc pl-5">
                    <li 
                        v-for="(ingredient, index) in data.ingredients"
                        :key="'igd_' + index">
                        {{ ingredient }}
                    </li>
                </ul>
            </div>
            <div className="mt-2">
                <strong>Method:</strong>
                <ol className="list-decimal pl-5">
                    {data.method.map((step: string, index: number) => (
                        <li 
                            v-for="(step, index) in data.method"
                            :key="'mtd_' + index">{{ step }}</li>
                    ))}
                </ol>
            </div>
            <p className="text-gray-500 text-sm mt-2">Created at: {{ new Date(data.
                createdAt!).toLocaleString() }}</p>
        </div>
</template>

<script setup lang="ts">
import type { IRecipe } from '../../types/types';

defineProps<{
    data: IRecipe
}>()
</script>