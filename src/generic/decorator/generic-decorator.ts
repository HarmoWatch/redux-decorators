import 'reflect-metadata';
import { GenericDecoratorMethod } from './method/generic-decorator-method.type';

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

    public get forMethod(): (config?: T) => GenericDecoratorMethod<Function> {
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

        return Reflect.getMetadata(this.key, target) as T;
    }

    protected defineMetadata(target: {}, value: T) {
        Reflect.defineMetadata(this.key, value, target);
    }

}