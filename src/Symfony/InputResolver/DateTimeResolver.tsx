import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";

export class DateTimeResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","datetime","_test_form_datetime"] */
        return props.widget_attributes.block_prefixes.includes('datetime') &&
               props.widget_attributes.block_prefixes.length == 3;
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);
        return new ResolvedInput(resolvedProps.id, 'input', {type:'datetime-local', ...resolvedProps});
    }
}