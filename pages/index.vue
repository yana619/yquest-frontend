<template>
    <section id="index-page" class="section">
        <div class="container">
            <div class="column custom-column is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet is-8-mobile is-offset-2-mobile">
                <div class="title">
                    <h1>Welcome to YQuest</h1>
                </div>
                <div class="content">
                    <p>YQuest is an online quest. We are still in the development-mode. It's simple, I'm not kidding) You need
                        some crypto and wiki-surfing skills to solve it.</p>
                    <p>If you have questions, catch bugs or need help, text me at <span
                            class="email">yanka-gala@mail.ru</span>.</p>
                    <p>Please, sign in to keep your progress. We will add more sign-in providers later, I hope..)</p>
                    <p>And do not bruteforce, please.. )</p>
                    <br>
                    <p>If you can't sign in or don't want to do it, use "Log In as Guest" button. But we do not guarantee that your progress will continue.</p>
                </div>
                <login-providers/>
            </div>
        </div>
    </section>
</template>

<script>
    import LoginProviders from '~/components/login/Providers.vue';

    export default {
        components: {
            'login-providers': LoginProviders,
        },

        middleware: 'anonymous',
    }
</script>
