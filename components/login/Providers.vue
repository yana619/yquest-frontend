<template>
    <div class="login-providers">
        <div class="column is-6 is-offset-3 is-12-mobile">
            <template v-for="provider in providers">
                <button class="provider-button button" v-bind:class="provider.name" @click="login(provider.name)">
                    <div class="icon">
                        <i :class="provider.icon" aria-hidden="true"></i>
                    </div>
                    <div class="label">
                        Log In with {{provider.label}}
                    </div>
                </button>
            </template>
        </div>
    </div>
</template>

<script>
    import {authenticate} from '~/utils/authenticate-providers';

    export default {
        data() {
            return {
                providers: [
                    {
                        name: 'google',
                        label: 'Google',
                        icon: 'fa fa-google'
                    }
                ]
            }
        },
        methods: {
            login(provider) {
                authenticate(provider);
            }
        }
    }
</script>
