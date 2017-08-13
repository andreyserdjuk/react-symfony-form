import * as React from 'react';
import {ResolvedInput} from '../ResolvedInput';
import {ChildrenListInterface} from "./ChildrenListInterface";
import {SingleInputResolverInterface} from "./SingleInputResolverInterface";
import {InputsResolverInterface} from "../InputsResolverInterface";

export class RecursiveInputsResolver implements InputsResolverInterface {
    constructor(public singleInputResolver: SingleInputResolverInterface) {
    }

    resolve(props:any): Array<ResolvedInput> {
        let children = props.children as ChildrenListInterface;
        let resolvedChildren = [] as Array<ResolvedInput>;

        Object.values(children).map(val => {
            if (this.singleInputResolver.canResolve(val)) {
                resolvedChildren.push(
                    this.singleInputResolver.resolve(val)
                );
            } else if (Object.hasOwnProperty.call(val, 'children')) {
                resolvedChildren = [
                    ...resolvedChildren,
                    ...this.resolve(
                        val.children as ChildrenListInterface
                    ),
                ];
            } else {
                // resolvedChildren.push(
                //     <input id={val.widget_attributes.id} key={key} name={val.widget_attributes.full_name}></input>
                // );
            }
        });

        return resolvedChildren;
    }
}
