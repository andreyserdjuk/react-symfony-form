import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";

export class EmailResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","text","email","_form_email"] */
        return props.widget_attributes.block_prefixes.includes('email') &&
               props.widget_attributes.block_prefixes.includes('text') &&
               props.widget_attributes.block_prefixes.length == 4;
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);
        return new ResolvedInput(resolvedProps.id, 'input', {type:'email', ...resolvedProps});
    }
}