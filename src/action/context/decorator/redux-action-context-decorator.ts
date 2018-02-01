import { GenericDecorator } from '../../../generic/generic-decorator';

export interface ReduxActionContextDecoratorConfig {
    prefix: string;
}

export class ReduxActionContextDecorator extends GenericDecorator<ReduxActionContextDecoratorConfig> {

    public static readonly instance = new ReduxActionContextDecorator();

    public static readonly get = ReduxActionContextDecorator.instance.get.bind(ReduxActionContextDecorator.instance);

    public static forClass(config?: ReduxActionContextDecoratorConfig) {
        return ReduxActionContextDecorator.instance.forClass(config);
    }

    constructor() {
        super('ReduxActionContext');
    }

}
