import {getToken} from '~/utils/auth'

export default function ({store, req}) {
    store.commit('SET_AUTH_TOKEN', getToken(req));
}
