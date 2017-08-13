import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as CoreExtension from './Extensions/CoreExtension';
import {Form} from './Form';
import {FormSchemaInterface} from "./Symfony/FormSchemaInterface";
import {FormResolver} from "./FormResolver";
import {FormAttrsResolver} from "./Symfony/FormAttrsResolver";
import {CoreSingleInputResolver} from "./Symfony/CoreSingleInputResolverInterface";
import {RecursiveInputsResolver} from "./Symfony/RecursiveInputsResolver";
import {DelegatingSingleInputResolver} from "./Symfony/DelegatingSingleInputResolver";

fetch('./../tests/form_schema.json')
    .then((data:Response) => {
        return data.json();
    })
    .then((data:FormSchemaInterface) => {
        const delegatingInputResolver = new DelegatingSingleInputResolver();
        delegatingInputResolver.addResolver(new CoreSingleInputResolver());
        const formResolver = new FormResolver(new FormAttrsResolver(), new RecursiveInputsResolver(delegatingInputResolver));

        // ReactDOM.resolve(
        //     <Form schema={data} inputRenderer={delegatingInputResolver}></Form>,
        //     document.getElementById("example")
        // );
        ReactDOM.render(
            React.createElement(
                Form,
                {
                    schema:data,
                    formResolver:formResolver,
                }
            ),
            document.getElementById("example")
        );
    });