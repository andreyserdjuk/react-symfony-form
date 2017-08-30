import * as React from 'react';
import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";
import {ChoiceAttrInterface} from "../ChoiceAttrInterface";
import {InputHTMLAttributes} from "react";

export class ChoiceResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","choice","_form_choice"] */
        return (props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 3) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","entity","_post_user"] */
               (props.widget_attributes.block_prefixes.includes('entity') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4);
    }

    resolve(props: ChildInterface): ResolvedInput {
        const resolvedProps = this.resolveCommonProps(props);
        const wa = props.widget_attributes;
        const multiple = wa.multiple == null
            ? false
            : wa.multiple;
        const children:Array<React.ReactNode> = [];

        let rootTagName = 'div';
        const rootElementAttrs:InputHTMLAttributes<{}> = {};

        if (wa.expanded == null || wa.expanded == false) {
            rootTagName = 'select';
            rootElementAttrs.multiple = multiple;

            if (wa.choices instanceof Array) {
                wa.choices.map((c:ChoiceAttrInterface) => {
                    children.push(<option value={c.value}>{c.label}</option>);
                });
            }
        } else {
            const inputType = multiple? 'checkbox' : 'radio';

            if (props.children instanceof Array) {
                props.children.map((c:ChildInterface) => {
                    children.push(
                        <input
                            type={inputType}
                            name={c.widget_attributes.name}
                            value={c.widget_attributes.value}
                            disabled={c.widget_attributes.disabled}
                            checked={Boolean(c.widget_attributes.checked)}
                        >
                            {c.widget_attributes.label}
                        </input>
                    );
                });
            }
        }

        return new ResolvedInput(resolvedProps.id, rootTagName, {children, ...resolvedProps, multiple});
    }
}