import * as React from 'react';
import {SingleInputResolverInterface} from "./SingleInputResolverInterface";
import {ChildInterface} from "./ChildInterface";
import {ResolvedInput} from "../ResolvedInput";
import {ChoiceAttrInterface} from "./ChoiceAttrInterface";

export class CoreSingleInputResolver implements SingleInputResolverInterface{

    canResolve(props: ChildInterface): boolean {
        let inputProps = props as ChildInterface;
        let prefixes = inputProps.widget_attributes.block_prefixes;
        let attrs = inputProps.widget_attributes;
        return !!(
            prefixes.includes('birthday') ||
            prefixes.includes('date') ||
            prefixes.includes('textarea') ||
            Object.hasOwnProperty.call(attrs, 'value') ||
            Object.hasOwnProperty.call(prefixes, 'choice')
        );
    }

    resolve(inputProps: ChildInterface): ResolvedInput {
        let prefixes = inputProps.widget_attributes.block_prefixes;
        let attrs = inputProps.widget_attributes;
        let props = {id:attrs.id, name:attrs.full_name};
        if (attrs.value) {
            props['defaultValue'] = attrs.value;
        }

        if (prefixes.includes('birthday') || prefixes.includes('date')) {
            return new ResolvedInput(attrs.id, 'input', {type:'date', ...props});
        }

        if (prefixes.includes('textarea')) {
            return new ResolvedInput(attrs.id, 'textarea', props);
        }

        if (prefixes.includes('choice')) {
            const choices = attrs.choices as Array<React.ReactNode>;
            const renderedChoices = choices.map((c:ChoiceAttrInterface) => (
                <option value={c.value}>{c.label}</option>
            ));

            return new ResolvedInput(attrs.id, 'select', {children:renderedChoices, defaultValue:attrs.value, id:attrs.id});
        }

        if (Object.hasOwnProperty.call(attrs, 'value')) {
            return new ResolvedInput(attrs.id, 'input', props);
        }

        throw 'cannot resolve';
    }
}
