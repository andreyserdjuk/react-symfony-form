import {ResolvedInput} from "../ResolvedInput";

export interface InputResolverInterface {
    resolve(inputProps:any): ResolvedInput;
}