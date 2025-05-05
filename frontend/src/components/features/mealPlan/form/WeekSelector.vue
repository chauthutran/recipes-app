<template>
    <section class="flex flex-wrap gap-6 items-center">
        <div class="flex flex-col">
            <label for="weekStartDate" class="font-semibold mb-1"
                >Week Start</label
            >
            <input
                id="weekStartDate"
                type="date"
                :value="start"
                @input="
                    (e) =>
                        $emit(
                            'update:start',
                            (e.target as HTMLInputElement).value,
                        )
                "
                class="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
        </div>

        <div class="flex flex-col">
            <label for="weekEndDate" class="font-semibold mb-1">Week End</label>
            <input
                id="weekEndDate"
                type="date"
                :value="end"
                @input="
                    (e) =>
                        $emit(
                            'update:end',
                            (e.target as HTMLInputElement).value,
                        )
                "
                class="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    start: string;
    end: string;
}>();

defineEmits(['update:start', 'update:end']);
</script>
