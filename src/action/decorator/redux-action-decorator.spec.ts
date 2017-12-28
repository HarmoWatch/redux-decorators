import 'rxjs/add/observable/from';

import { ReduxActionDispatcher } from '../dispatcher/redux-action-dispatcher';
import { ReduxActionDecorator } from './redux-action-decorator';

class TestSubject {

    @ReduxActionDecorator.forMethod({type: 'some-other-type'})
    public methodWithCustomType<T>(input: T): T {
        return input;
    }

    @ReduxActionDecorator.forMethod()
    public methodWithAutomaticType<T>(input: T): T {
        return input;
    }

}

describe('ReduxActionDecorator', () => {

    beforeEach(() => {
        spyOn(ReduxActionDispatcher, 'dispatch');
    });

    [ {
        desc: 'methodWithCustomType()',
        target: TestSubject.prototype.methodWithCustomType,
        expected: {
            type: 'some-other-type',
        }
    }, {
        desc: 'methodWithAutomaticType()',
        target: TestSubject.prototype.methodWithAutomaticType,
        expected: {
            type: 'methodWithAutomaticType',
        }
    } ].forEach(cfg => {

        describe(cfg.desc, () => {

            it('decorates the method', () => {
                expect(ReduxActionDecorator.get(cfg.target)).toEqual({
                    type: cfg.expected.type,
                    contextClass: TestSubject,
                });
            });

            it('will dispatch the action and return the original value', () => {
                expect(cfg.target('123')).toEqual('123');
                expect(ReduxActionDispatcher.dispatch).toHaveBeenCalledTimes(1);
                expect(ReduxActionDispatcher.dispatch).toHaveBeenCalledWith(cfg.target, '123');
            });

        });

    });

});