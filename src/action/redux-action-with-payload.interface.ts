export interface ReduxActionWithPayload<P = void> {
    type: string;
    payload?: P;
}
