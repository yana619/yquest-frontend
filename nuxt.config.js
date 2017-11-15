module.exports = {
    loading: {
        color: 'grey',
        height: '5px'
    },
    head: {
        titleTemplate: 'YQuest',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'YQuest. The idea was taken from blacklight.ai'}
        ]
    },
    build: {
        vendor: ['axios', 'mini-toastr']
    },
    css: [
        {src: 'bulma', lang: 'sass'},
        {src: '~assets/sass/layout.scss', lang: 'scss'}
    ],
    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type)
            }
        }
    },
    router: {
        middleware: ['check-auth']
    }
};
