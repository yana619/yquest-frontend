<template>
    <div class="chapter">
        <div class="title" v-show="title">{{title}}</div>
        <div class="content" v-show="content" v-html="content"></div>
        <div class="question" v-for="question in questions">
            <question :isLazy="isLazyQuestion(question)" :question="question"></question>
        </div>
            <lock v-for="n in lockCount"/>
    </div>
</template>
<script>
    import Question from '~/components/quest/Question.vue';
    import Lock from '~/components/quest/Lock.vue';

    export default {
        components: {
            'question': Question,
            'lock': Lock
        },

        props: [
            'chapterData'
        ],

        data() {
            return {
                title: null,
                content: null,
                questions: [],
                lockCount: 0
            }
        },

        methods: {
            setData() {
                this.title = this.chapterData.title;
                this.content = this.chapterData.content;
                this.questions = this.chapterData.questions;
                this.setLockCount();
            },

            setLockCount() {
                this.lockCount = this.chapterData.lockCount - this.questions.length;
            },

            isLazyQuestion(question) {
                return (question.hasOwnProperty('isLazy'))
                        ? question.isLazy
                        : false
            }
        },

        created() {
            this.setData();
        },

        mounted() {
            this.$watch('chapterData', function () {
                this.setData();
            });

            this.$watch('questions', function () {
                this.setLockCount();
            });
        }
    }
</script>
