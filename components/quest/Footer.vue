<template>
    <section class="footer">
        <div class="container">
            <section>
                <div class="column custom-column is-8-desktop is-offset-2-desktop is-8-tablet is-offset-2-tablet is-8-mobile is-offset-2-mobile">
                    <div id="answer" class="field has-addons" v-bind:class="answerStatus">
                        <div class="control control-input">
                            <input class="input" type="text" title="" v-model="answer" name="answer">
                        </div>
                        <div class="control">
                            <a class="button is-outlined is-primary" @click="sendAnswer">
                                Go
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="left-content">
            YQuest, 2017
        </div>
        <div class="right-content">
            <div class="socket-indicator" v-bind:class="{ active: isNetworkActive}">
                <i class="fa fa-circle" aria-hidden="true" title="I should be green, if not, refresh the page =)"></i>
            </div>
            <button class="button sign-out-btn" @click="logOut" title="Goodbye =)">
                <i class="fa fa-sign-out fa-2x" aria-hidden="true"></i>
            </button>
        </div>
    </section>
</template>
<script>
    import {signOut} from '~/utils/api';

    export default {
        props: [
            'answerStatus', 'isNetworkActive'
        ],

        data() {
            return {
                answer: this.answer,
            }
        },

        created() {
            this.answer = '';
        },

        methods: {
            sendAnswer() {
                let self = this;

                if (self.answer.length > 0) {
                    self.$emit('on-answer', self.answer);
                    self.answer = '';
                }
            },

            logOut() {
                signOut();
            }
        },
    }
</script>

