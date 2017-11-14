<template>
    <div>
        <template v-if="!isNetworkActive && !chapter">
            <page-loader/>
        </template>
        <template v-else>
            <section class="section quest-view-section">
                <div class="container">
                    <div class="column custom-column is-8-desktop is-offset-2-desktop is-8-tablet is-offset-2-tablet is-8-mobile is-offset-2-mobile">
                        <chapter :chapterData="chapter" v-if="chapter"/>
                    </div>
                </div>
            </section>
            <quest-footer :answerStatus="answerStatus" :isNetworkActive="isNetworkActive" @on-answer="sendAnswer"/>
        </template>

    </div>
</template>
<script>
    import PageLoader from '~/components/main/PageLoader.vue';
    import Chapter from '~/components/quest/Chapter.vue';
    import QuestFooter from '~/components/quest/Footer.vue';
    import WS from '~/modules/ws';

    export default {
        components: {
            'chapter': Chapter,
            'quest-footer': QuestFooter,
            'page-loader': PageLoader
        },

        middleware: 'authenticated',

        data() {
            return {
                ws: this.ws,
                chapter: this.chapter,
                chapterId: this.chapterId,
                answerStatus: this.answerStatus,
                isNetworkActive: this.isNetworkActive
            }
        },
        created() {
            this.chapter = false;
            this.chapterId = false;
            this.answerStatus = '';
            this.isNetworkActive = false;
        },

        mounted() {
            let self = this;
            this.ws = new WS(self.$store);

            self.$store.watch(
                    function (state) {
                        return state.socket.isConnected
                    },
                    function (isConnected) {
                        self.isNetworkActive = isConnected;
                    }
            );

            self.$store.watch(
                    function (state) {
                        return state.quest.message
                    },
                    function (message) {
                        let response = message.payload.response;
                        let status = message.payload.status;

                        switch (message.event) {
                            case 'answer':
                                self.setAnswerStatus((status == 200) ? 'success' : 'error');
                                break;

                            case 'state_content':
                                self.chapter = response.content.chapters[0];
                                self.chapterId = self.chapter['id'];
                                break;

                            case 'new_content':
                                let question = response.content.question;
                                question.isLazy = true;
                                self.chapter.questions.push(question);
                                break;
                        }

                    }
            );
        },

        methods: {
            sendAnswer(answer) {
                let self = this;
                self.ws.answer(self.chapterId, answer);
            },

            setAnswerStatus(status) {
                let self = this;
                self.answerStatus = status;

                setTimeout(function () {
                    self.answerStatus = '';
                }, 1000)
            }
        }
    }
</script>
