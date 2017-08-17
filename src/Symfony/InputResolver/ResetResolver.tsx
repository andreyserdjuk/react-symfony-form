import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";

export class ResetResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["button","reset","_test_form_active"] */
        return props.widget_attributes.block_prefixes.includes('reset') &&
               props.widget_attributes.block_prefixes.includes('button') &&
               props.widget_attributes.block_prefixes.length == 3;
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);
        return new ResolvedInput(resolvedProps.id, 'button', {type:'reset', ...resolvedProps});
    }
}