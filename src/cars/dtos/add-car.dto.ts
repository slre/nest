import { IsString } from "class-validator";

export class AddCarDto{
    @IsString()
    readonly brand:string;
    @IsString()
    readonly model:string;
}