import { GenericDecorator } from '../../generic/generic-decorator';

export interface ReduxStateDecoratorConfig {
    name: string;
}

export function ReduxStateDecoratorForClass(config?: ReduxStateDecoratorConfig) {
    return ReduxStateDecorator.instance.forClass(config);
}

export class ReduxStateDecorator extends GenericDecorator<ReduxStateDecoratorConfig> {

    public static readonly instance = new ReduxStateDecorator();
    public static readonly get = ReduxStateDecorator.instance.get.bind(ReduxStateDecorator.instance);

    public static forClass = ReduxStateDecoratorForClass;

    constructor() {
        super('ReduxState');
    }

}