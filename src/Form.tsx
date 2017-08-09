import * as React from 'react';
import {FormTypeSchema, ChildInterface, ChildMapInterface} from './FormTypeSchema';
import {CoreInputResolver} from './CoreInputResolver';
import {ResolvedInput} from './InputProxy';

interface FormPropsInterface {
    schema: FormTypeSchema,
    inputRenderer: CoreInputResolver
}

export class Form extends React.Component<FormPropsInterface, {}> {
    constructor(props:FormPropsInterface) {
        super(props);
    }

    // recursiveRender = (children: ChildMapInterface): Array<React.ReactElement<{}>> => {
    recursiveRender = (children: ChildMapInterface): Array<ResolvedInput> => {
        // let renderedChildren = new Array<React.ReactElement<{}>>();
        let renderedChildren = new Array<ResolvedInput>();
        
        Object.entries(children).map(([key, val]) => {
            if (this.props.inputRenderer.canResolve(val)) {
                renderedChildren.push(
                    this.props.inputRenderer.render(key, val)
                );
            } else if (Object.hasOwnProperty.call(val, 'children')) {
                renderedChildren = [
                    ...renderedChildren,
                    ...this.recursiveRender(
                        val.children as ChildMapInterface
                    ),
                ];
            } else {
                // renderedChildren.push(
                //     <input id={val.widget_attributes.id} key={key} name={val.widget_attributes.full_name}></input>
                // );
            }
        });

        return renderedChildren;
    };

    render() {
        let method = this.props.schema.widget_container_attributes.method;
        let action = this.props.schema.widget_container_attributes.action;
        let value = this.props.schema.widget_container_attributes.value;
        let id = this.props.schema.widget_container_attributes.id;
        let encType = this.props.schema.widget_container_attributes.multipart? 'multipart/form-data' : 'application/x-www-form-urlencoded';
        let attrs = {
            method,
            action,
            encType,
            // value,
            // id,
        };
        // const labelText = Object.hasOwnProperty.call(attrs, 'label')? attrs.label : attrs.name;
        // const label = <label htmlFor={attrs.id}>{labelText}</label>;
        let children = this.recursiveRender(this.props.schema.children);
        let renderedChildren = new Array<React.ReactElement<{}>>();
        renderedChildren = children.map((proxy:ResolvedInput) =>
            <div key={proxy.key} className={'form-group'}>
                {proxy.createElement()}
            </div>
        );

        return (
            <form {...attrs}>
                {renderedChildren}
            </form>
        );
    }
}
