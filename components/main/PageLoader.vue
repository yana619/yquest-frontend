<template>
    <div class="page_loader">
        <div>
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
        <div>{{text}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                baseData: this.baseData,
                text: ''

            }
        },

        created() {
            this.baseData = [
                "Houston, We've got a problem..",
                "I will fix it ..",
                "What about magick!? Why not, I know good recipe X)",
                "So, I need a pot..",
                "And hot water ..",
                "And bonfire! Big bonfire !!!",
                "Ok, mandrake root..",
                "Three rat tails..",
                "Cat's coat..",
                "Twenty five salted ants..Are you kidding?!?",
                "Dried lizard skin..",
                "Dragon's blood..Where will i take it!?!",
                "Snake bile..ohh",
                "Three tears of a virgin..Seriously?!",
                "Ok, let's mix it..",
                "Oooh..it blushed!!",
                "And smells...",
                "A little bit more...",
                "AAAAAAAAAAA",
                "AHAHAHHAHAAAAAA!!!111111111111",
                "Something wrong...",
                "Harry??",
                "AAAAA...NO...PLEASE...WHO ARE YOU !?! DON'T TOUCH ME!!!!",
                "AAAAAAAAAAAAA",
                "Hm...",
                "It was a bad recipe..i think..",
                "Let's try again =)"
            ];
            this.showData(0);
        },
        methods: {
            showData(index) {
                let self = this;

                if (self.baseData[index] == undefined) {
                    index = 0
                }

                self.text = self.baseData[index];
                index++;

                setTimeout(function () {
                    self.showData(index);
                }, 2000);
            }
        }
    }
</script>
