import { GenericDecorator } from '../../../generic/generic-decorator';

export interface ReduxActionContextDecoratorConfig {
    prefix: string;
}

export function ReduxActionContextDecoratorForClass(config?: ReduxActionContextDecoratorConfig) {
    return ReduxActionContextDecorator.instance.forClass(config);
}

export class ReduxActionContextDecorator extends GenericDecorator<ReduxActionContextDecoratorConfig> {

    public static readonly instance = new ReduxActionContextDecorator();

    public static readonly get = ReduxActionContextDecorator.instance.get.bind(ReduxActionContextDecorator.instance);

    public static forClass = ReduxActionContextDecoratorForClass;

    constructor() {
        super('ReduxActionContext');
    }

}
