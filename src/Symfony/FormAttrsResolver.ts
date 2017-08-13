import {FormAttrsResolverInterface} from "../FormAttrsResolverInterface";
import {FormSchemaInterface} from "./FormSchemaInterface";
import {FormAttrsInterface} from "../FormAttrsInterface";

export class FormAttrsResolver implements FormAttrsResolverInterface {
    resolve(props:FormSchemaInterface): FormAttrsInterface {
        let method = props.widget_container_attributes.method;
        let action = props.widget_container_attributes.action;
        let id = props.widget_container_attributes.id;
        let encType = props.widget_container_attributes.multipart? 'multipart/form-data' : 'application/x-www-form-urlencoded';
        return {
            id,
            method,
            action,
            encType,
        };
    }
}
