import { ReduxActionDispatcher } from '../../';
import { GenericDecorator} from '../../generic/decorator/generic-decorator';
import { GenericDecoratorMethod } from '../../generic/decorator/method/generic-decorator-method.type';

export interface ReduxActionDecoratorConfig {
    type?: string;
    contextClass?: {},
    onDispatchSuccess?: Function;
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

    public get forMethod(): (config?: ReduxActionDecoratorConfig) => GenericDecoratorMethod<Function> {
        return config => (target, propertyKey, descriptor) => {
            config = Object.assign({
                type: String(propertyKey),
                contextClass: target.constructor,
                onDispatchSuccess: null,
            }, config);

            const originalFunction = descriptor.value;
            const proxyFunction = function () {
                const returnValue = originalFunction.apply(this, arguments);
                const onDispatchSuccess = config.onDispatchSuccess ? config.onDispatchSuccess.bind(this) : null;
                ReduxActionDispatcher.dispatch(proxyFunction, returnValue, onDispatchSuccess);
                return returnValue;
            } as GenericDecoratorMethod<{}>;

            this.defineMetadata(proxyFunction, config);
            descriptor.value = proxyFunction;
        };
    }

}