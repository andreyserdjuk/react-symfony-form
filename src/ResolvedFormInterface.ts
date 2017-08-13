import {ResolvedInput} from "./ResolvedInput";

export interface ResolvedFormInterface {
    attrs: {
        id: string,
        method: string,
        action: string,
        encType: string,
    }

    children: Array<ResolvedInput>
}
