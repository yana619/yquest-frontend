import Vue from 'vue';
import VueWS from '~/modules/ws-native/Main';
import Error from '~/utils/error-handler';
import params from '~/.params';


export default class WS {
    constructor(store) {
        let self = this;
        self.store = store;

        Vue.use(VueWS, params.ws_host, {
            format: 'json',
            store: self.store,
            reconnection: true, // (Boolean) whether to reconnect automatically (false)
            reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
            reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
        });

        this.store.watch(
            function (state) {
                return state.socket.isConnected
            },
            function (isConnected) {
                if (isConnected) {
                    self.joinQuest();
              //      self.ping();
                }
            });

        this.store.watch(
            function (state) {
                return state.socket.message
            },
            function (message) {
                WS.parseMessage(message);
            });
    };


    static getEvent(eventType) {
        switch (eventType) {
            case 'answer':
                return 'answer';
            case 'ping':
                return 'ping';
            case 'join':
                return 'join';
            default:
                return '';
        }
    };

    static sendMessage(message) {
        message = JSON.stringify(message);
      //  this.$socket.send(message)
        Vue.prototype.$socket.send(message);
    };

    ping() {
        let self = this;

        setInterval(function () {
            WS.sendMessage(self.composeMessage('ping', {}));
        }, 30000);
    };

    joinQuest() {
        let message = this.composeMessage('join', {
            token: this.store.state.auth_token
        });
        WS.sendMessage(message);
    };

    answer(chapterId, answer) {
        let message = this.composeMessage('answer', {
            chapterId: chapterId,
            answer: answer,
        });
        WS.sendMessage(message);
    };

    composeMessage(eventType, payload) {
        let message = {
            event: WS.getEvent(eventType),
            payload: payload,
            pid: this.store.state.pid
        };
        this.store.dispatch('incrementPid');

        return message;
    };

    static parseMessage(message) {
        let payload = message.payload;

        if (payload.status !== 200) {
            Error.handle(payload);
        }
    }
};
