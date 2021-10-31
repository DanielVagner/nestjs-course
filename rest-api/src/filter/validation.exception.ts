import { ArgumentsHost, BadRequestException, Catch } from "@nestjs/common";


export class ValidationException extends  BadRequestException {

    constructor(public validationErrors: string[]){
        super();
    }
   
}