export type GenericDecoratorMethod<T> = (target: object,
                                         propertyKey: string | symbol,
                                         descriptor: TypedPropertyDescriptor<T>) => void;