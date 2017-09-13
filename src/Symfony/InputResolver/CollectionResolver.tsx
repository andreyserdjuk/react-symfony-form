import * as React from 'react';
import {SingleInputResolverInterface} from "../SingleInputResolverInterface";
import {ChildInterface} from "../ChildInterface";
import {ResolvedInput} from "../../ResolvedInput";
import {AbstractInputResolver} from "./AbstractInputResolver";
import {InputHTMLAttributes} from "react";

export class CollectionResolver extends AbstractInputResolver implements SingleInputResolverInterface {

    canResolve(props: ChildInterface): boolean {
        /** @var props.widget_attributes.block_prefixes = ["form","collection","_test_form_collection"] */
        return (props.widget_attributes.block_prefixes.includes('collection') &&
                props.widget_attributes.block_prefixes.length == 3)
            ;
    }

    resolve(props: ChildInterface): ResolvedInput {
    }
}