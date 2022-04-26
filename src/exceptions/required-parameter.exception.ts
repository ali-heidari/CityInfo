import { Exception } from "./exception";

export class RequiredParameterException extends Exception {
    constructor(parameterName: string) {
        super(`${parameterName} is required!`, parameterName);
    }
}