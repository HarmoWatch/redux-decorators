import { GenericDecorator } from '../../../generic/generic-decorator';

export class ReduxActionContextDecorator<T = {
    prefix: string;
}> extends GenericDecorator<T> {

    public static readonly instance = new ReduxActionContextDecorator();

    public static readonly get = ReduxActionContextDecorator.instance.get.bind(ReduxActionContextDecorator.instance);
    public static readonly forClass = ReduxActionContextDecorator.instance.forClass;

    constructor() {
        super('ReduxActionContext');
    }

}