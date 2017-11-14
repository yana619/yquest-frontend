<template>
    <div class="question">
        <div class="title">{{title}}</div>
        <div class="content" v-html="content"></div>
    </div>
</template>
<script>
    export default {
        props: [
            'question',
            'isLazy'
        ],

        data() {
            return {
                title: this.title,
                content: this.content
            }
        },

        methods: {
            showContent(content) {
                if (!this.isLazy) {
                    this.content = content;
                } else {
                    this.content = '';
                    this.lazyContent(content, 0);
                }
            },

            lazyContent(message, index) {
                if (index < message.length) {
                    let self = this;

                    if (message[index] == '<') {
                        let tag = '';

                        while (message[index] != '>') {
                            tag += message[index];
                            index++;
                        }

                        tag += '>';
                        self.content += tag;
                    } else {
                        self.content += message[index];
                    }

                    index++;

                    setTimeout(function () {
                        self.lazyContent(message, index);
                    }, 30);
                }
            }
        },


        created() {
            this.title = this.question.title;
            this.showContent(this.question.content);
        }
    }
</script>
