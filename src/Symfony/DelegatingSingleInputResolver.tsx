import {ResolvedInput} from "../ResolvedInput";
import {SingleInputResolverInterface} from "./SingleInputResolverInterface";

export class DelegatingSingleInputResolver implements SingleInputResolverInterface {
    private renderers: Array<SingleInputResolverInterface> = [];

    addResolver(resolver:SingleInputResolverInterface) {
        this.renderers.push(resolver);
    }

    canResolve(inputProps:any): boolean {
        for (let renderer of this.renderers) {
            if (renderer.canResolve(inputProps)) {
                return true;
            }
        }

        return false;
    }

    resolve(inputProps:any): ResolvedInput {
        for (let renderer of this.renderers) {
            if (renderer.canResolve(inputProps)) {
                return renderer.resolve(inputProps);
            }
        }

        throw new CannotFoundRendererException(inputProps);
    }
}

class CannotFoundRendererException {
    message:string;
    constructor(props:{}) {
        this.message = `Cannot find renderer for props "${JSON.stringify(props)}"`;
    }
}
