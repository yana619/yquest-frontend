export default function ({ store, redirect }) {
    if (store.state.auth_token) {
        return redirect('/quest');
    }
}
