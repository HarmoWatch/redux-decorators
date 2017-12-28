import 'rxjs/add/operator/take';

import { Store } from 'redux';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ReduxActionContextDecorator } from '../context/decorator/redux-action-context-decorator';
import { ReduxActionDecorator } from '../decorator/redux-action-decorator';
import { ReduxActionFunction } from '../function/redux-action-function.type';

export class ReduxActionDispatcher {

    private static _store = new BehaviorSubject<Store<{}>>(null);

    public static set store(store: Store<{}>) {
        ReduxActionDispatcher._store.next(store);
    }

    public static getType(target: ReduxActionFunction) {

        const action = ReduxActionDecorator.get(target);

        if (!action) {
            return null;
        }

        const {type, contextClass} = ReduxActionDecorator.get(target);

        const context = {
            prefix: '',
            ...ReduxActionContextDecorator.get(contextClass),
        };

        return `${ context.prefix }${ type }`;
    }

    public static dispatch(target: ReduxActionFunction, payload?: {} | Promise<{}> | Observable<{}>): Promise<void> {
        return Promise.all([
            payload instanceof Observable ? payload.toPromise() : payload,
            ReduxActionDispatcher.getStore(),
        ]).then(([ p, store ]) => {
            const type = ReduxActionDispatcher.getType(target);
            type ? store.dispatch({type, payload: p}) : null;
        });
    }

    private static getStore(): Promise<Store<{}>> {
        return new Promise(resolve => resolve(
            ReduxActionDispatcher._store.getValue() ||
            ReduxActionDispatcher._store.take(1).toPromise()
        ));
    }

}