import { GenericDecorator } from '../../generic/generic-decorator';

export class ReduxStateDecorator<T = {
    name: string;
}> extends GenericDecorator<T> {

    public static readonly instance = new ReduxStateDecorator();
    public static readonly get = ReduxStateDecorator.instance.get.bind(ReduxStateDecorator.instance);
    public static readonly forClass = ReduxStateDecorator.instance.forClass;

    constructor() {
        super('ReduxState');
    }

}