import * as React from 'react';
import {FormResolver} from "./FormResolver";
import {FormSchemaInterface} from "./Symfony/FormSchemaInterface";
import {ResolvedInput} from "./ResolvedInput";

interface FormPropsInterface {
    schema: FormSchemaInterface,
    formResolver: FormResolver
}

export class Form extends React.Component<FormPropsInterface, {}> {
    constructor(props:FormPropsInterface) {
        super(props);
    }

    render() {
        let resolvedForm = this.props.formResolver.resolve(this.props.schema);
        // let renderedChildren = resolvedForm.children.map((proxy:ResolvedInput) =>
        //     <div key={proxy.key} className={'form-group'}>
        //         {proxy.createElement()}
        //     </div>
        // );

        return (
            <form {...resolvedForm.attrs}>
                {resolvedForm.children.map(c => c.createElement())}
            </form>
        );
    }
}
