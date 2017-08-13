import {ChildrenListInterface} from "./ChildrenListInterface";
import {WidgetAttributesInterface} from "./WidgetAttributesInterface";

export interface FormSchemaInterface {
    name: string,
    method: string,
    widget_container_attributes: WidgetAttributesInterface,
    children: ChildrenListInterface
}
