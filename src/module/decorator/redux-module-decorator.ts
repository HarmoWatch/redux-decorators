import { ReduxReducerType, ReduxStateType } from '../../';
import { GenericDecorator } from '../../generic/generic-decorator';

export interface ReduxModuleDecoratorConfig {
    state: ReduxStateType;
    reducers?: ReduxReducerType[];
}

/**
 * @todo check if we really need this decorator
 */
export class ReduxModuleDecorator extends GenericDecorator<ReduxModuleDecoratorConfig> {

    public static readonly instance = new ReduxModuleDecorator();
    public static readonly get = ReduxModuleDecorator.instance.get.bind(ReduxModuleDecorator.instance);

    public static forClass(config?: ReduxModuleDecoratorConfig) {
        return ReduxModuleDecorator.instance.forClass(config);
    }

    constructor() {
        super('ReduxModule');
    }

}