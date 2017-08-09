//todo: maybe remove this
import {createElement as e} from 'react';

let form =      (props:HTMLFormElement)     => e('form', props);
let input =     (props:HTMLInputElement)    => e('input', props);
let date =      (props:HTMLInputElement)    => e('input', props);
let textarea =  (props:HTMLTextAreaElement) => e('textarea', props);

export {
    form,
    input,
    date,
    textarea,
};  