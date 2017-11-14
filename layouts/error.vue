<template>
    <div class="error-page">
        <div class="title">
            <template v-if="error.statusCode === 404">Page not found</template>
            <template v-else>An error occured</template>
        </div>
        <div>
            <nuxt-link to="/" class="button is-primary">Go home</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['error']
    }
</script>
