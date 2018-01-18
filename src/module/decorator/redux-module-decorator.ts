import { GenericDecorator } from '../../generic/generic-decorator';
import { ReduxReducerType } from '../../reducer/redux-reducer.type';
import { ReduxStateType } from '../../state/redux-state.type';

/**
 * @todo check if we really need this decorator
 */
export class ReduxModuleDecorator<T = {
    state: ReduxStateType;
    reducers?: ReduxReducerType[];
}> extends GenericDecorator<T> {

    public static readonly instance = new ReduxModuleDecorator();
    public static readonly get = ReduxModuleDecorator.instance.get.bind(ReduxModuleDecorator.instance);
    public static readonly forClass = ReduxModuleDecorator.instance.forClass;

    constructor() {
        super('ReduxModule');
    }

}