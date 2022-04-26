export default class User {
    static username = '';
    static password = '';
    static update = (username, password) => {
        this.username = username;
        this.password = password
    }

    static updatePassword = (password) => {
        this.password = password;
    }

    static logout = () => {
        this.username = '';
        this.password = '';
    }
}
