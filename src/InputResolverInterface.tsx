import {ChildInterface} from './FormTypeSchema';
import {ResolvedInput} from './InputProxy';

export interface InputResolverInterface {
    canResolve(inputProps:ChildInterface): boolean
    resolve(key:string, inputProps:ChildInterface): ResolvedInput
}