import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReduxActionContextDecorator, ReduxActionDecorator, ReduxActionFunction } from '../../';

export class ReduxActionDispatcher {

    public static readonly dispatchedActions = new Subject<{ type: string, payload: any }>();

    public static getType(target: ReduxActionFunction): string {

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
        return Promise
            .resolve(payload instanceof Observable ? payload.toPromise() : payload)
            .then((p) => {
                const type = ReduxActionDispatcher.getType(target);
                type ? ReduxActionDispatcher.dispatchedActions.next({type, payload: p}) : null;
            });
    }

}