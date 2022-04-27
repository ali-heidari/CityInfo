export class Exception extends Error {
    constructor(message: string, extraData?: Object) {
        super(message);
    }

    public get extraData(): Object {
        return this.extraData;
    }

}