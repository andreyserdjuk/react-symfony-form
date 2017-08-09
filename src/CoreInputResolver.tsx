import * as React from 'react';
import {InputResolverInterface} from './InputResolverInterface';
import {ChildInterface} from './FormTypeSchema'; 
import {ChoiceAttr} from './FormTypeSchema'; 
import {ResolvedInput} from './InputProxy';

export class CoreInputResolver implements InputResolverInterface {
    canResolve(inputProps:ChildInterface): boolean {
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

    resolve(key:string, inputProps:ChildInterface): ResolvedInput {
        let prefixes = inputProps.widget_attributes.block_prefixes;
        let attrs = inputProps.widget_attributes;
        let props = {id:attrs.id, name:attrs.full_name};
        if (attrs.value) {
            props['defaultValue'] = attrs.value;
        }

        if (prefixes.includes('birthday') || prefixes.includes('date')) {
            return new ResolvedInput(key, 'input', {type:'date', ...props});
        }

        if (prefixes.includes('textarea')) {
            return new ResolvedInput(key, 'textarea', props);
        }

        if (prefixes.includes('choice')) {
            const choices = attrs.choices as Array<React.ReactNode>;
            const renderedChoices = choices.map((c:ChoiceAttr) => (
                <option value={c.value}>{c.label}</option>
            ));

            return new ResolvedInput(key, 'select', {children:renderedChoices, defaultValue:attrs.value, id:attrs.id});
        }

        if (Object.hasOwnProperty.call(attrs, 'value')) {
            return new ResolvedInput(key, 'input', props);
        }

        throw 'cannot resolve';
    }
}
