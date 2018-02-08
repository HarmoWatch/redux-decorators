import { ReduxActionDecorator } from '../../';
import { ReduxReducerDecorator, ReduxReducerDecoratorForMethod } from './redux-reducer-decorator';

class SomeActionClass {

    @ReduxActionDecorator.forMethod()
    public addFoo() {

    }

    @ReduxActionDecorator.forMethod()
    public addAnotherFoo() {

    }

}

class SomeReducerClass {

    @ReduxReducerDecoratorForMethod(SomeActionClass.prototype.addFoo)
    public addFoo() {

    }

    @ReduxReducerDecoratorForMethod([
        SomeActionClass.prototype.addFoo,
        SomeActionClass.prototype.addAnotherFoo,
    ])
    public addTwoFoos() {

    }

    @ReduxReducerDecoratorForMethod('some-action-type')
    public stringType() {

    }

    @ReduxReducerDecoratorForMethod([ 'some-action-type', 'some-other-type' ])
    public stringsType() {

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

        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.stringType)).toEqual('some-action-type');
        expect(ReduxReducerDecorator.get(SomeReducerClass.prototype.stringsType)).toEqual([
            'some-action-type',
            'some-other-type',
        ]);
    });

});