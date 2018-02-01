import { GenericDecorator } from '../../generic/generic-decorator';

export type ReduxReducerDecoratorConfig = Array<Function | string> | Function | string;

export class ReduxReducerDecorator extends GenericDecorator<ReduxReducerDecoratorConfig> {

    public static readonly instance = new ReduxReducerDecorator();
    public static readonly get = ReduxReducerDecorator.instance.get.bind(ReduxReducerDecorator.instance);

    public static forMethod(config?: ReduxReducerDecoratorConfig) {
        return ReduxReducerDecorator.instance.forMethod(config);
    }

    constructor() {
        super('ReduxReducer');
    }

}
