import {ResolvedInput} from "../ResolvedInput";
import {SingleInputResolverInterface} from "./SingleInputResolverInterface";
import {InputResolverInterface} from "./InputResolverInterface";

export class DelegatingSingleInputResolver implements InputResolverInterface {
    private resolvers: Array<SingleInputResolverInterface> = [];

    addResolver(resolver:SingleInputResolverInterface) {
        this.resolvers.push(resolver);
    }

    resolve(inputProps:any): ResolvedInput {
        for (let resolver of this.resolvers) {
            if (resolver.canResolve(inputProps)) {
                return resolver.resolve(inputProps);
            }
        }

        throw `Cannot find renderer for props "${JSON.stringify(inputProps)}"`;
    }
}