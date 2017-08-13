import {FormSchemaInterface} from "./Symfony/FormSchemaInterface";
import {FormAttrsInterface} from "./FormAttrsInterface";

export interface FormAttrsResolverInterface {
    resolve(formSchema:{}): FormAttrsInterface
}
