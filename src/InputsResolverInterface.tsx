import {ResolvedInput} from "./ResolvedInput";

export interface InputsResolverInterface {
    resolve(props:any): Array<ResolvedInput>
}
