<template>
    <RecipeRating rating={Utils.calculateAverageRating(data)} ratingUserNo={data.ratings.length} />
</template>