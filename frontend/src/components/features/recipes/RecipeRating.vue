<template>
    <div className="flex items-center">
        <!-- Full stars -->
        <FullStar
            v-for="n in fullStars"
            :key="'full-' + n"
            class="w-5 h-5 text-yellow-400"
        />

        <!-- Half star -->
        <svg
            v-if="hasHalfStar"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-5 h-5"
        >
            <defs>
                <linearGradient id="half">
                    <!-- Half of the star will be yellow -->
                    <stop offset="50%" stop-color="#fdc700" />
                    <!-- Yellow color -->
                    <stop
                        offset="50%"
                        stop-color="transparent"
                        stop-opacity="1"
                    />
                </linearGradient>
            </defs>
            <path
                fill="url(#half)"
                d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
        </svg>

        <!-- Empty stars -->
        <EmptyStar
            v-for="n in emptyStars"
            :key="'empty-' + n"
            class="w-5 h-5 text-gray-300"
        />

        <span v-if="ratingUserNo" className="text-sm text-gray-600 ml-2"
            >({{ ratingUserNo }} user{{ ratingUserNo > 1 ? 's' : '' }})</span
        >
    </div>
</template>

<script setup lang="ts">
import { StarIcon as FullStar } from '@heroicons/vue/24/solid';
import { StarIcon as EmptyStar } from '@heroicons/vue/24/outline';

const props = defineProps<{
    rating: number;
    ratingUserNo?: number;
}>();

const fullStars = Math.floor(props.rating);
const hasHalfStar = props.rating % 1 !== 0;
const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
</script>
