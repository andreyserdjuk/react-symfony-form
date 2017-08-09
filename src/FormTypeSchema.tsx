export interface FormTypeSchema {
    name: string,
    method: string,
    widget_container_attributes: WidgetAttributes,
    children: ChildMapInterface
}

export interface ChildInterface {
    widget_attributes: WidgetAttributes,
    children?: ChildMapInterface
}

export interface ChildMapInterface {
    [key:string]: ChildInterface,
}

interface WidgetContainerAttributes {
    name: string,
    method: string,
}

interface WidgetAttributes {
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
    choices?: Array<ChoiceAttr>,
    [key:string]:any,
    method: string,
    action: string,
    // submitted: boolean,
    block_prefixes: Array<string>,
}

export interface ChoiceAttr {
    attr: Array<{[key:string]: string}>,
    label: string,
    value: string,
    data: string,
}
