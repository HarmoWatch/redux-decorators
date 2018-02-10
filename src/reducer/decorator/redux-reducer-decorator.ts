import { GenericDecorator} from '../../generic/decorator/generic-decorator';
import { ReduxReducerFunction } from '../function/redux-reducer-function.type';
import { ReduxActionFunction } from '../../action/function/redux-action-function.type';
import { GenericDecoratorMethod } from '../../generic/decorator/method/generic-decorator-method.type';

export type ReduxReducerDecoratorConfig<P = {}, T = ReduxActionFunction<P>> = Array<T | string> | T | string;

export function ReduxReducerDecoratorForMethod<S, P>(config?: ReduxReducerDecoratorConfig<P>): GenericDecoratorMethod<ReduxReducerFunction<S, P>> {
    return ReduxReducerDecorator.instance.forMethod(config);
}

export class ReduxReducerDecorator extends GenericDecorator<ReduxReducerDecoratorConfig> {

    public static readonly instance = new ReduxReducerDecorator();
    public static readonly get = ReduxReducerDecorator.instance.get.bind(ReduxReducerDecorator.instance);

    public static forMethod = ReduxReducerDecoratorForMethod;

    constructor() {
        super('ReduxReducer');
    }

}
