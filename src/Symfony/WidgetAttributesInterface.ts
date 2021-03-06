import {ChoiceAttrInterface} from "./ChoiceAttrInterface";

export interface WidgetAttributesInterface {
    value?: string,
    id: string,
    name: string,
    full_name: string,
    disabled: boolean,
    multipart: boolean,
    // unique_block_prefix: string,
    // read_only: boolean,
    valid: boolean,
    required: boolean,
    compound: boolean,
    choices?: Array<ChoiceAttrInterface>,
    [key:string]:any,
    method: string,
    action: string,
    // submitted: boolean,
    checked?: boolean,
    expanded?: boolean,
    multiple?: boolean,
    block_prefixes: Array<string>,
}