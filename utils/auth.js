import Cookie from 'js-cookie'

export const setToken = function(token) {
    Cookie.set('token', token);
};

export const unsetToken = function() {
    Cookie.remove('token');
};

export const getToken = function(req) {
    if (!req || !req.headers.cookie) {
        return null;
    }

    let cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));

    if (!cookie) {
        return null;
    }

    return cookie.split('=')[1] || null;
};
