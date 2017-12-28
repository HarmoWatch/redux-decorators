import 'rxjs/add/observable/from';

import { Store } from 'redux';
import { Observable } from 'rxjs/Observable';

import { ReduxActionContextDecorator } from '../context/decorator/redux-action-context-decorator';
import { ReduxActionDecorator } from '../decorator/redux-action-decorator';
import { ReduxActionDispatcher } from './redux-action-dispatcher';

describe('ReduxActionDispatcher', () => {

    @ReduxActionContextDecorator.forClass({prefix: 'foo/'})
    class FooActions {

        @ReduxActionDecorator.forMethod({type: 'add'})
        public addFoo() {

        }

        @ReduxActionDecorator.forMethod()
        public remove() {

        }
    }

    class BarActions {

        @ReduxActionDecorator.forMethod({type: 'add'})
        public addFoo() {

        }

        @ReduxActionDecorator.forMethod()
        public remove() {

        }
    }

    @ReduxActionContextDecorator.forClass({prefix: 'baz/'})
    class BazContext {

    }

    class BazActions {

        @ReduxActionDecorator.forMethod({type: 'add', contextClass: BazContext})
        public addFoo() {

        }

        @ReduxActionDecorator.forMethod({contextClass: BazContext})
        public remove() {

        }

    }


    [ {
        name: 'FooActions.addFoo',
        target: FooActions.prototype.addFoo,
        expectedType: 'foo/add'
    }, {
        name: 'FooActions.remove',
        target: FooActions.prototype.remove,
        expectedType: 'foo/remove'
    }, {
        name: 'BarActions.addFoo',
        target: BarActions.prototype.addFoo,
        expectedType: 'add'
    }, {
        name: 'BarActions.remove',
        target: BarActions.prototype.remove,
        expectedType: 'remove'
    }, {
        name: 'BazActions.addFoo',
        target: BazActions.prototype.addFoo,
        expectedType: 'baz/add'
    }, {
        name: 'BazActions.remove',
        target: BazActions.prototype.remove,
        expectedType: 'baz/remove'
    } ].forEach(actionConfig => {

        const [ className, methodName ] = actionConfig.name.split('.');

        describe('getType()', () => {

            describe(`on ${className}`, () => {

                describe(`.${methodName}()`, () => {

                    it(`returns the action type "${actionConfig.expectedType}"`, () => {
                        expect(ReduxActionDispatcher.getType(actionConfig.target)).toEqual(actionConfig.expectedType);
                    });

                });

            });

        });

        describe('dispatch()', () => {

            let store: Store<{}>;

            beforeEach(() => {
                store = {
                    dispatch: jasmine.createSpy('dispatch')
                } as {} as Store<{}>;

                ReduxActionDispatcher.store = store;
            });

            describe(`on ${className}`, () => {

                describe(`.${methodName}()`, () => {

                    [ {
                        desc: 'payload is a string',
                        payload: 'lorem ipsum',
                        expectedPayload: 'lorem ipsum',
                    }, {
                        desc: 'payload is a Promise',
                        payload: Promise.resolve('lorem ipsum dolor'),
                        expectedPayload: 'lorem ipsum dolor',
                    }, {
                        desc: 'payload is an Observable',
                        payload: Observable.from([ 'one', 'two', 'three' ]),
                        expectedPayload: 'three',
                    } ].forEach(payloadConfig => {

                        describe(payloadConfig.desc, () => {

                            it('will dispatch the correct action', done => {

                                ReduxActionDispatcher.dispatch(actionConfig.target, payloadConfig.payload).then(() => {
                                    expect(store.dispatch).toHaveBeenCalledTimes(1);
                                    expect(store.dispatch).toHaveBeenCalledWith({
                                        type: actionConfig.expectedType,
                                        payload: payloadConfig.expectedPayload,
                                    });

                                    done();
                                });

                            });

                        });

                    });

                });


            });


        });


    });

});