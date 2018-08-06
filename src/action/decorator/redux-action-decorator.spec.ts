import {ReduxActionDispatcher} from '../../';
import {ReduxActionDecorator, ReduxActionDecoratorForMethod} from './redux-action-decorator';

class TestSubject {

    @ReduxActionDecoratorForMethod({type: 'some-other-type'})
    public methodWithCustomType<T>(input: T): T {
        return input;
    }

    @ReduxActionDecoratorForMethod()
    public methodWithAutomaticType<T>(input: T): T {
        return input;
    }

    @ReduxActionDecoratorForMethod({
        onDispatchSuccess: TestSubject.prototype.updateSomethingDispatchSuccess,
    })
    public updateSomething<T>(input: T): T {
        return input;
    }

    public updateSomethingDispatchSuccess() {
        return {
            methodName: 'updateSomethingDispatchSuccess',
            boundContext: this,
        };
    }

}

describe('ReduxActionDecorator', () => {

    beforeEach(() => {
        spyOn(ReduxActionDispatcher, 'dispatch');
    });

    [{
        desc: 'methodWithCustomType()',
        target: TestSubject.prototype.methodWithCustomType,
        expected: {
            type: 'some-other-type',
            onDispatchSuccess: null,
        }
    }, {
        desc: 'methodWithAutomaticType()',
        target: TestSubject.prototype.methodWithAutomaticType,
        expected: {
            type: 'methodWithAutomaticType',
            onDispatchSuccess: null,
        }
    }, {
        desc: 'updateSomething()',
        target: TestSubject.prototype.updateSomething,
        expected: {
            type: 'updateSomething',
            onDispatchSuccess: TestSubject.prototype.updateSomethingDispatchSuccess,
        }
    }].forEach(cfg => {

        describe(cfg.desc, () => {

            it('decorates the method', () => {
                expect(ReduxActionDecorator.get(cfg.target)).toEqual({
                    ...cfg.expected,
                    contextClass: TestSubject,
                });
            });

            it('will dispatch the action well and return the original value', () => {
                const spy = ReduxActionDispatcher.dispatch as jasmine.Spy;
                const thisContext = new TestSubject();

                expect(cfg.target.call(thisContext, '123')).toEqual('123');
                expect(spy).toHaveBeenCalledTimes(1);

                const [givenTarget, givenPayload, givenOnDispatchSuccess] = spy.calls.mostRecent().args;

                expect(givenTarget).toBe(cfg.target);
                expect(givenPayload).toBe('123');

                if (cfg.expected.onDispatchSuccess) {
                    const returnValue = givenOnDispatchSuccess();
                    expect(returnValue.methodName).toEqual('updateSomethingDispatchSuccess');
                    expect(returnValue.boundContext).toBe(thisContext);
                } else {
                    expect(givenOnDispatchSuccess).toBe(null);
                }

            });

        });

    });

    it('returns null if a invalid target is given', () => {
        expect(ReduxActionDecorator.get('')).toBeNull();
    });

});