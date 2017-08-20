import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Form} from './Form';
import {FormSchemaInterface} from "./Symfony/FormSchemaInterface";
import {FormResolver} from "./FormResolver";
import {FormAttrsResolver} from "./Symfony/FormAttrsResolver";
import {RecursiveInputsResolver} from "./Symfony/RecursiveInputsResolver";
import {InputResolverFactory} from "./Symfony/InputResolverFactory";

fetch('./../tests/form_schema.json')
    .then((data:Response) => {
        return data.json();
    })
    .then((data:FormSchemaInterface) => {
        const delegatingInputResolver = InputResolverFactory.getResolver();
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