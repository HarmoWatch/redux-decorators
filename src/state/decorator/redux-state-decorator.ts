import { GenericDecorator } from '../../generic/generic-decorator';

export interface ReduxStateDecoratorConfig {
    name: string;
}

export class ReduxStateDecorator extends GenericDecorator<ReduxStateDecoratorConfig> {

    public static readonly instance = new ReduxStateDecorator();
    public static readonly get = ReduxStateDecorator.instance.get.bind(ReduxStateDecorator.instance);

    public static forClass(config?: ReduxStateDecoratorConfig) {
        return ReduxStateDecorator.instance.forClass(config);
    }

    constructor() {
        super('ReduxState');
    }

}