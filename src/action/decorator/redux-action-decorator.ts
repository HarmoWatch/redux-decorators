import 'rxjs/add/operator/toPromise';

import { GenericDecorator, MethodType } from '../../generic/generic-decorator';
import { ReduxActionDispatcher } from '../dispatcher/redux-action-dispatcher';

export class ReduxActionDecorator<T = {
    type?: string;
    contextClass?: {}
}> extends GenericDecorator<T> {

    public static readonly instance = new ReduxActionDecorator();

    public static readonly get = ReduxActionDecorator.instance.get.bind(ReduxActionDecorator.instance);
    public static readonly forMethod = ReduxActionDecorator.instance.forMethod;

    constructor() {
        super('ReduxAction');
    }

    public get forMethod(): (value?: T) => MethodType<Function> {
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