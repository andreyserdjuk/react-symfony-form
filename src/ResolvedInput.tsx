import * as React from 'react';

export class ResolvedInput {
    public attrs:{[key:string]:any};
    public tagname:string;
    public key:string|number;

    constructor(key:string|number, tagname:string, attrs:{[key:string]:any}) {
        this.key = key;
        this.tagname = tagname;
        this.attrs = attrs;
    };

    createElement() {
        return React.createElement(
            this.tagname,
            {...this.attrs, key:this.key}
        );
    }
}