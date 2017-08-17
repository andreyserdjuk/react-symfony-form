import * as React from 'react';
import {ResolvedInput} from '../ResolvedInput';
import {ChildrenListInterface} from "./ChildrenListInterface";
import {InputsResolverInterface} from "../InputsResolverInterface";
import {InputResolverInterface} from "./InputResolverInterface";

export class RecursiveInputsResolver implements InputsResolverInterface {
    constructor(public singleInputResolver: InputResolverInterface) {
    }

    resolve(props:any): Array<ResolvedInput> {
        let children = props.children as ChildrenListInterface;
        let resolvedChildren = [] as Array<ResolvedInput>;

        Object.values(children).map(childProps => {
            try {
                let resolvedInput = this.singleInputResolver.resolve(childProps);
                resolvedChildren.push(
                    this.singleInputResolver.resolve(resolvedInput)
                );
            } catch (e) {
                if (Object.hasOwnProperty.call(childProps, 'children')) {
                    resolvedChildren = [
                        ...resolvedChildren,
                        ...this.resolve(childProps),
                    ];
                } else {
                    throw e;
                }
            }
        });

        return resolvedChildren;
    }
}
