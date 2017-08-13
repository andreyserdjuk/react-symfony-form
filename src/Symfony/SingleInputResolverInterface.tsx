import {ResolvedInput} from "../ResolvedInput";
import {ChildInterface} from "./ChildInterface";

export interface SingleInputResolverInterface {
    canResolve(props:ChildInterface): boolean
    resolve(props:ChildInterface): ResolvedInput
}
