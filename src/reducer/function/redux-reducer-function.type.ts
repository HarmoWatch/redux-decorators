import { ReduxActionWithPayload } from '../../action/redux-action-with-payload.interface';

export type ReduxReducerFunction<S, P> = (state: S, action?: ReduxActionWithPayload<P>) => S;
