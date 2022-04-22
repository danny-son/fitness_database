export default class User {
    static username = '';
    static login = e => {
        this.username = e;
    }

    static logout = e => {
        this.username = '';
    }
}