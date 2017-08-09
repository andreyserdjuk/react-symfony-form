import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as CoreExtension from './Extensions/CoreExtension';
import {Form} from './Form';
import {CoreInputResolver} from './CoreInputResolver';
import {DelegatingInputRenderer} from './DelegatingInputRenderer';
import {FormTypeSchema} from './FormTypeSchema';

// const r = new Request('')

fetch('./../tests/form_schema.json')
    .then((data:Response) => {
        return data.json();
    })
    .then((data:FormTypeSchema) => {
        const coreRenderer = new CoreInputResolver();
        const delegatingRenderer = new DelegatingInputRenderer();
        delegatingRenderer.addRenderer(coreRenderer);

        // ReactDOM.resolve(
        //     <Form schema={data} inputRenderer={delegatingRenderer}></Form>,
        //     document.getElementById("example")
        // );
        const f = Form;
        ReactDOM.render(
            React.createElement(
                Form,
                {
                    schema:data,
                    inputRenderer:delegatingRenderer,
                }
            ),
            document.getElementById("example")
        );
    });


// const displayNone = {display:'none'};
// ReactDOM.resolve(
//     React.createElement(
//         'form',
//         {
//             name:'asd',
//             action:'none',
//             onSubmit: () => alert('hi submit')
//         }, 
//         React.createElement(
//             'label',
//             {},
//             'label text'
//         ),
//         <input type="submit" style={displayNone} />,
//         React.createElement(
//             'input',
//             {
//                 autoFocus: true,
//                 type:'date',
//                 name:'our_date',
//                 defaultValue: '2000-01-02',
//             }
//         )
//     ),
//     document.getElementById("example")
// );

// 