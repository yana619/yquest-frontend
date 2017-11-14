import {unsetToken} from '~/utils/auth';
let miniToastr = require('mini-toastr');

miniToastr.init();
let errors = {
    400001: {
        message: null,
        display: true
    },
    400002: {
        message: null,
        display: true
    },
    401001: {
        message: 'Session Expired',
        display: false,
        callback: function () {
            unsetToken();
            window.location.href = '/';
        }
    },
    401002: {
        message: 'Sign In failed. Please, try again later',
        display: true
    },
    404001: {
        message: 'Unknown Socket Event',
        display: false
    },
    404002: {
        message: 'Unknown Answer',
        display: false
    },
};

export default class Error {
    static handle(errorData) {
        errorData = errorData.response.data || errorData;

        if (!errorData.status || !errors[errorData.status]) {
            return this.showError('An error occured. Please, try again later.')
        }

        let error = errors[errorData.status],
            errorMessage = error.message || errorData.response;

        if (error.display) {
            this.showError(errorMessage);
        }

        if (error.callback) {
            error.callback();
        }
    }

    static showError(errorMessage) {
        miniToastr['error'](errorMessage)
    }
}
