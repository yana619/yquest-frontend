import {unsetToken, setToken} from '~/utils/auth';
import Error from '~/utils/error-handler';
import axios from 'axios';
import params from '~/.params';

export const signInGoogle = function (token) {
    let nuxt = document.getElementById('__nuxt');
    nuxt.className = 'waiting';

    axios
        .post(params.api_host + 'auth/sign-in-google', {token: token})
        .then(function (res) {
            setToken(res.headers.authorization);
            // TODO: AAA!! Rewrite!
            window.location.href = '/quest';
        })
        .catch(function (e) {
            nuxt.className = '';
            Error.handle(e);
        });
};

export const signOut = function () {
    unsetToken();
    // TODO: Add Rest Request to sign-out
    // TODO: AAA!! Rewrite!
    window.location.href = '/';
};
