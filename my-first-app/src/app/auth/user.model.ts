export class User {
    constructor(
        public email: string,
        private _idToken: string,
        public localId: string,
        private _expiredTime: Date,
        public signUp: boolean
    ) {}
    
    get idToken() {
        if (!this._expiredTime || new Date() > this._expiredTime) {
            return null;
        }

        return this._idToken;
    }
}