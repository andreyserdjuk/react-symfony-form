import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";

export class NumberResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","number","_form_number"] */
        return props.widget_attributes.block_prefixes.includes('number') &&
               props.widget_attributes.block_prefixes.length == 3;
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);
        return new ResolvedInput(resolvedProps.id, 'input', {type:'number', ...resolvedProps});
    }
}