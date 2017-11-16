import Vue from 'vue';
import GoogleAuth from 'vue-google-auth';
import {signInGoogle, signInGuest} from '~/utils/api';
import Error from '~/utils/error-handler';
import params from '~/.params';

Vue.use(GoogleAuth, {clientId: params.providers.google.clientId});
Vue.googleAuth().load();

export const authenticate = function (provider) {
    switch (provider) {
        case 'google':
            Vue.googleAuth().directAccess();

            Vue.googleAuth().signIn(function (googleUser) {
                let authResponse = googleUser.getAuthResponse();
                signInGoogle(authResponse.access_token);
            }, function (error) {
                Error.handle(error);
            });

            break;

        case 'guest':
            signInGuest();
            break;
    }
};
