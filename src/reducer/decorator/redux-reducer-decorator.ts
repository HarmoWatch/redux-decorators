import { GenericDecorator } from '../../generic/generic-decorator';

export class ReduxReducerDecorator<T = Array<Function | string> | Function | string> extends GenericDecorator<T> {

    public static readonly instance = new ReduxReducerDecorator();
    public static readonly get = ReduxReducerDecorator.instance.get.bind(ReduxReducerDecorator.instance);
    public static readonly forMethod = ReduxReducerDecorator.instance.forMethod;

    constructor() {
        super('ReduxReducer');
    }

}
