import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        auth_token: null,
        socket: {
            isConnected: false,
            message: '',
        },
        pid: 1,
        quest: {
            chapter: '',
            message: ''
        }
    },
    mutations: {
        SOCKET_ONOPEN (state, event)  {
            state.socket.isConnected = true;
        },
        SOCKET_ONCLOSE (state, event)  {
            state.socket.isConnected = false;
        },
        SOCKET_ONERROR (state, event)  {
            state.socket.isConnected = false;
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)  {
            switch (message.topic) {
                case 'main':
                    state.socket.message = message;
                    break;

                case 'quest':
                    state.quest.message = message;
                    break;
            }
        },
        SOCKET_RECONNECT(state, reconnectionCount) {
        },
        SOCKET_RECONNECT_ERROR(state, status) {
        },
        INCREMENT_PID (state) {
            state.pid++
        },
        SET_AUTH_TOKEN (state, token) {
            state.auth_token = token || null;
        },
        SET_QUEST_CHAPTER (state, chapterUid) {
            state.quest.chapter = chapterUid;
        }
    },

    actions: {
        incrementPid (context) {
            context.commit('INCREMENT_PID')
        },
        socketConnecting(context) {
            context.commit('SOCKET_CONNECTING');
        }
    }
});

export default store
