import {InputsResolverInterface} from "./InputsResolverInterface";
import {ResolvedFormInterface} from "./ResolvedFormInterface";
import {FormAttrsResolverInterface} from "./FormAttrsResolverInterface";

export class FormResolver {
    constructor(private formAttrsResolver:FormAttrsResolverInterface, private inputsResolver:InputsResolverInterface) {
    }

    resolve(props:any): ResolvedFormInterface {
        let attrs = this.formAttrsResolver.resolve(props);
        let children = this.inputsResolver.resolve(props);

        return {attrs, children};
    }
}
