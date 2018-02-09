import 'reflect-metadata';

export type MethodType<T> = (target: object,
                             propertyKey: string | symbol,
                             descriptor: TypedPropertyDescriptor<T>) => void;

export abstract class GenericDecorator<T> {

    constructor(private key: string | symbol) {
    }

    public get forClass(): (config?: T) => <C extends { new(...args: any[]): {} }>(constructor: C) => C {
        return value => {
            return constructor => {
                this.defineMetadata(constructor, value);
                return constructor;
            };
        }
    }

    public get forMethod(): (config?: T) => MethodType<Function> {
        return value => {
            return (target, propertyKey, descriptor) => {
                this.defineMetadata(descriptor.value, value);
            };
        }
    }

    public get(target: {}): T {
        if (typeof target === 'string' || typeof target === 'number') {
            return null;
        }

        try {
            return Reflect.getMetadata(this.key, target) as T;
        } catch (e) {
            return null;
        }
    }

    protected defineMetadata(target: {}, value: T) {
        Reflect.defineMetadata(this.key, value, target);
    }

}