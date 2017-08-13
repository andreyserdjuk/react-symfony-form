import {WidgetAttributesInterface} from "./WidgetAttributesInterface";
import {ChildrenListInterface} from "./ChildrenListInterface";

export interface ChildInterface {
    widget_attributes: WidgetAttributesInterface,
    children?: ChildrenListInterface
}
