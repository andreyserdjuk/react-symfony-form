import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";

export class ChoiceResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","choice","_form_choice"] */
        return props.widget_attributes.block_prefixes.includes('choice') &&
               props.widget_attributes.block_prefixes.length == 3 &&
               props.children == null;
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);

        // todo
        if (props.widget_attributes.multipart) {
            /**
             * if props.widget_attributes.multiple = false
             * @var props.widget_attributes.children[0].widget_attributes
             *      = ["form","checkbox","radio","_form_choice_entry"]
             * @var props.widget_attributes.children[0].widget_attributes
             *      = ["form","checkbox","_form_choice_multiple_expanded_entry"]
             * */

        } else {
        }

        return new ResolvedInput(resolvedProps.id, 'input', {type:'text', ...resolvedProps});
    }
}