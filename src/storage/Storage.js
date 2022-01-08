export const Storage = {
    token: {
        set(payload){
            const value = JSON.stringify(payload);
            localStorage.setItem('AppToken', value);
        },
        get() {
            const value = localStorage.getItem('AppToken');
            return JSON.parse(value);
        },
        delete() {
            return localStorage.removeItem('AppToken');
        }
    }

};