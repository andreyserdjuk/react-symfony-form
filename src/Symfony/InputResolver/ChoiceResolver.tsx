import * as React from 'react';
import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";
import {ChoiceAttrInterface} from "../ChoiceAttrInterface";
import {InputHTMLAttributes} from "react";
import {ChoiceOptGroupInterface} from "../ChoiceOptGroupInterface";

export class ChoiceResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","choice","_form_choice"] */
        return (props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 3) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","entity","_post_user"] */
               (props.widget_attributes.block_prefixes.includes('entity') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","country","_test_form_country"] */
               (props.widget_attributes.block_prefixes.includes('country') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","language","_test_form_language"] */
               (props.widget_attributes.block_prefixes.includes('language') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","locale","_test_form_locale"] */
               (props.widget_attributes.block_prefixes.includes('locale') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","currency","_test_form_currency"] */
               (props.widget_attributes.block_prefixes.includes('currency') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4) ||
        /** @var props.widget_attributes.block_prefixes = ["form","choice","timezone","_test_form_timezone"] */
               (props.widget_attributes.block_prefixes.includes('timezone') &&
                props.widget_attributes.block_prefixes.includes('choice') &&
                props.widget_attributes.block_prefixes.length == 4)
            ;
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
                wa.choices.map((choice:ChoiceAttrInterface|ChoiceOptGroupInterface) => {
                    if (choice.hasOwnProperty('choices')) {
                        const optgroup = choice as ChoiceOptGroupInterface;
                        children.push(
                            <optgroup label={optgroup.label}>
                                {
                                    optgroup.choices.map((optgroupChoice:ChoiceAttrInterface) =>
                                            <option value={optgroupChoice.value}>{optgroupChoice.label}</option>
                                    )
                                }
                            </optgroup>
                        );
                    } else {
                        const singleChoice = choice as ChoiceAttrInterface;
                        children.push(<option value={singleChoice.value}>{singleChoice.label}</option>);
                    }
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