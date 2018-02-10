import { ReduxActionDecorator } from '../../';
import { ReduxReducerDecorator, ReduxReducerDecoratorForMethod } from './redux-reducer-decorator';
import { ReduxActionWithPayload } from '../../action/redux-action-with-payload.interface';

class SomeActionClass {

    @ReduxActionDecorator.forMethod()
    public addFoo(): string {
        return 'test string';
    }

    @ReduxActionDecorator.forMethod()
    public addAnotherFoo(): string {
        return 'test string';
    }

    @ReduxActionDecorator.forMethod()
    public addDefaultFoo() {

    }
}

class SomeReducerClass {

    @ReduxReducerDecoratorForMethod(SomeActionClass.prototype.addFoo)
    public addFoo<S>(state: S, action: ReduxActionWithPayload<string>): S {
        return state;
    }

    @ReduxReducerDecoratorForMethod([
        SomeActionClass.prototype.addFoo,
        SomeActionClass.prototype.addAnotherFoo,
    ])
    public addTwoFoos<S>(state: S, action: ReduxActionWithPayload<string>): S {
        return state;
    }

    @ReduxReducerDecoratorForMethod(SomeActionClass.prototype.addFoo)
    @ReduxReducerDecoratorForMethod(SomeActionClass.prototype.addAnotherFoo)
    public decoratedTwice<S>(state: S, action: ReduxActionWithPayload<string>): S {
        return state;
    }

    @ReduxReducerDecoratorForMethod([
        SomeActionClass.prototype.addFoo,
        SomeActionClass.prototype.addAnotherFoo,
    ])
    @ReduxReducerDecoratorForMethod(SomeActionClass.prototype.addDefaultFoo)
    public decoratedTwiceMixed<S>(state: S, action: ReduxActionWithPayload<string | void>): S {
        return state;
    }

    @ReduxReducerDecoratorForMethod('some-action-type')
    public stringType<S>(state: S, action: ReduxActionWithPayload<string>): S {
        return state;
    }

    @ReduxReducerDecoratorForMethod([ 'some-action-type', 'some-other-type' ])
    public stringsType<S>(state: S, action: ReduxActionWithPayload<string>): S {
        return null;
    }

}

describe('ReduxReducerMethodDecorator', () => {

    it('decorates the method', () => {
        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.addFoo)).toEqual(
            SomeActionClass.prototype.addFoo
        );

        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.addTwoFoos)).toEqual([
            SomeActionClass.prototype.addFoo,
            SomeActionClass.prototype.addAnotherFoo,
        ]);

        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.decoratedTwice)).toEqual([
            SomeActionClass.prototype.addFoo,
            SomeActionClass.prototype.addAnotherFoo,
        ]);

        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.decoratedTwiceMixed)).toEqual([
            SomeActionClass.prototype.addFoo,
            SomeActionClass.prototype.addAnotherFoo,
            SomeActionClass.prototype.addDefaultFoo,
        ]);

        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.stringType)).toEqual('some-action-type');
        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.stringsType)).toEqual([
            'some-action-type',
            'some-other-type',
        ]);
    });

});