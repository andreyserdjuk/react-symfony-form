import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";

export abstract class AbstractInputResolver implements SingleInputResolverInterface{

    abstract canResolve(props: ChildInterface): boolean;

    abstract resolve(props: ChildInterface): ResolvedInput;

    protected resolveCommonProps(props: ChildInterface) {
        let attrs = props.widget_attributes;
        let resolvedProps:{[key:string]:string} = {
            id:     attrs.id,
            name:   attrs.full_name,
        };

        /** @see https://facebook.github.io/react/docs/uncontrolled-components.html  */
        if (attrs.value) {
            resolvedProps['defaultValue'] = attrs.value;
        }

        return resolvedProps;
    }
}