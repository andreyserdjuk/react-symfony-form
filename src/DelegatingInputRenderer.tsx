import {InputResolverInterface} from './InputRendererInterface';
import {ChildInterface} from './FormTypeSchema';
import {ResolvedInput} from './InputProxy';

export class DelegatingInputRenderer implements InputResolverInterface {
    private renderers:Array<InputResolverInterface>;

    constructor() {
        this.renderers = [];
    }

    addRenderer(renderer:InputResolverInterface) {
        this.renderers.push(renderer);
    }

    canRender(inputProps:ChildInterface): boolean {
        for (let renderer of this.renderers) {
            if (renderer.canRender(inputProps)) {
                return true;
            }
        }

        return false;
    }

    // resolve(key:string, inputProps:ChildInterface): ResolvedInput
    // resolve(key:string, inputProps:ChildInterface): React.ReactElement<{}> {
    render(key:string, inputProps:ChildInterface): ResolvedInput {
        for (let renderer of this.renderers) {
            if (renderer.canRender(inputProps)) {
                return renderer.render(key, inputProps);
            }
        }

        throw new CannotFoundRendererException(key, inputProps);
    }
}

class CannotFoundRendererException {
    message:string;
    constructor(key:string, props:{}) {
        this.message = `Cannot find renderer for props "${JSON.stringify(props)}" with key "${key}"`;
    }
}