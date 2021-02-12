import { Dispatch } from 'redux';
import getSimilarActionInQueue from '../utils/getSimilarActionInQueue';

describe('getSimilarActionInQueue', () => {
  describe('action is an object', () => {
    const action1 = {
      type: 'foo',
      payload: {
        bar: 1,
      },
    };
    const action1Copy = {
      type: 'foo',
      payload: {
        bar: 1,
      },
    };
    const action2 = {
      type: 'foo',
      payload: {
        bar: 3,
      },
    };

    it('should return the action enqueued if it presents the same shape than some action passed', () => {
      expect(getSimilarActionInQueue(action1Copy, [action1])).toBe(action1);
    });
  });

 
  
});
