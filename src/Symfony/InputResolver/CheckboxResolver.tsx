import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";

export class CheckboxResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","checkbox","_test_form_active"] */
        return props.widget_attributes.block_prefixes.includes('checkbox') &&
               props.widget_attributes.block_prefixes.length == 3;
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);
        const checked = props.widget_attributes.checked;
        return new ResolvedInput(resolvedProps.id, 'input', {type:'checkbox', ...resolvedProps, checked});
    }
}