export type ReduxActionFunction<P = {} | void> = ((...rest: any[]) => Promise<P> | P) | string;