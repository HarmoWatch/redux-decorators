import 'rxjs/add/operator/toPromise';

import { ReduxActionDispatcher } from '../../';
import { GenericDecorator, MethodType } from '../../generic/generic-decorator';

export interface ReduxActionDecoratorConfig {
    type?: string;
    contextClass?: {}
}

export function ReduxActionDecoratorForMethod(config?: ReduxActionDecoratorConfig) {
    return ReduxActionDecorator.instance.forMethod(config);
}

export class ReduxActionDecorator extends GenericDecorator<ReduxActionDecoratorConfig> {

    public static readonly instance = new ReduxActionDecorator();

    public static readonly get = ReduxActionDecorator.instance.get.bind(ReduxActionDecorator.instance);

    public static forMethod = ReduxActionDecoratorForMethod;

    constructor() {
        super('ReduxAction');
    }

    public get forMethod(): (config?: ReduxActionDecoratorConfig) => MethodType<Function> {
        return config => (target, propertyKey, descriptor) => {
            config = Object.assign({
                type: String(propertyKey),
                contextClass: target.constructor,
            }, config);

            const originalFunction = descriptor.value;
            const proxyFunction = function () {
                const returnValue = originalFunction.apply(this, arguments);
                ReduxActionDispatcher.dispatch(proxyFunction, returnValue);
                return returnValue;
            } as MethodType<{}>;

            this.defineMetadata(proxyFunction, config);
            descriptor.value = proxyFunction;
        };
    }

}