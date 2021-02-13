import { Dispatch } from 'redux';
import isEqual from 'lodash/isEqual';
import * as actionCreators from '../redux/actionCreators';
import { EnqueuedAction, NetworkState } from '../types';
import createReducer, {
  initialState,
  networkSelector,
} from '../redux/createReducer';
import getSimilarActionInQueue from '../utils/getSimilarActionInQueue';

const networkReducer = createReducer();

const getState = (isConnected = false, ...actionQueue: EnqueuedAction[]) => ({
  isConnected,
  actionQueue,
  isQueuePaused: false,
});

/** Actions used from now on to test different scenarios */
const prevActionToRetry1 = {
  type: 'FETCH_DATA_REQUEST',
  payload: {
    id: '1',
  },
  meta: {
    retry: true,
  },
};
const prevActionToRetry2 = {
  type: 'FETCH_OTHER_REQUEST',
  payload: {
    isFetching: true,
  },
  meta: {
    retry: true,
  },
};
const prevActionToRetry1WithDifferentPayload = {
  type: 'FETCH_DATA_REQUEST',
  payload: {
    id: '2',
  },
  meta: {
    retry: true,
  },
};

describe('unknown action type', () => {
  it('returns prevState on initialization', () => {
    expect(networkReducer(undefined, { type: 'ACTION_I_DONT_CARE' })).toEqual(
      initialState,
    );
  });

  it('returns prevState if the action is not handled', () => {
    expect(
      networkReducer(initialState, { type: 'ANOTHER_ACTION_I_DONT_CARE' }),
    ).toEqual(initialState);
  });
});

describe('CONNECTION_CHANGE action type', () => {
  it('changes isConnected state properly', () => {
    const mockAction = actionCreators.connectionChange(false);
    expect(networkReducer(initialState, mockAction)).toEqual({
      isConnected: false,
      actionQueue: [],
      isQueuePaused: false,
    });
  });
});

describe('OFFLINE_ACTION action type', () => {
  describe('meta.retry !== true', () => {
    it('should NOT add the action to the queue', () => {
      const prevAction = {
        type: 'FETCH_DATA_REQUEST',
        payload: {
          id: '1',
        },
      };
      const anotherPrevAction = {
        type: 'FETCH_DATA_REQUEST',
        payload: {
          id: '1',
        },
        meta: {
          retry: false,
        },
      };

      const action = actionCreators.fetchOfflineMode(prevAction);
      const anotherAction = actionCreators.fetchOfflineMode(anotherPrevAction);

      expect(networkReducer(initialState, action)).toEqual(initialState);
      expect(networkReducer(initialState, anotherAction)).toEqual(initialState);
    });
  });

  describe('meta.retry === true', () => {

  });
});

describe('REMOVE_ACTION_FROM_QUEUE action type', () => {

});

describe('QUEUE_SEMAPHORE_CHANGE action type', () => {
  
});



describe('dismiss feature', () => {
  const actionEnqueued1 = {
    type: 'FETCH_PAGE_REQUEST',
    payload: {
      id: '2',
    },
    meta: {
      retry: true,
      dismiss: ['NAVIGATE_BACK', 'NAVIGATE_TO_LOGIN'],
    },
  };
  const actionEnqueued2 = {
    type: 'FETCH_USER_REQUEST',
    payload: {
      id: '4',
    },
    meta: {
      retry: true,
      dismiss: ['NAVIGATE_TO_LOGIN'],
    },
  };
  const actionEnqueued3 = {
    type: 'FETCH_USER_REQUEST',
    payload: {
      id: '4',
    },
    meta: {
      retry: true,
    },
  };

  it('NAVIGATE_BACK dispatched, dismissing 1 action', () => {
    const prevState = getState(
      false,
      actionEnqueued1,
      actionEnqueued2,
      actionEnqueued3,
    );
    const action = actionCreators.dismissActionsFromQueue('NAVIGATE_BACK');

    expect(networkReducer(prevState, action)).toEqual(
      getState(false, actionEnqueued2, actionEnqueued3),
    );
  });

  it('NAVIGATE_TO_LOGIN dispatched, dismissing 2 actions', () => {
    const prevState = getState(
      false,
      actionEnqueued1,
      actionEnqueued2,
      actionEnqueued3,
    );
    const action = actionCreators.dismissActionsFromQueue('NAVIGATE_TO_LOGIN');

    expect(networkReducer(prevState, action)).toEqual(
      getState(false, actionEnqueued3),
    );
  });

  it("Any other action dispatched, no changes (although the middleware won't allow that)", () => {
    const prevState = getState(
      false,
      actionEnqueued1,
      actionEnqueued2,
      actionEnqueued3,
    );
    const action = actionCreators.dismissActionsFromQueue('NAVIGATE_AWAY');

    expect(networkReducer(prevState, action)).toEqual(
      getState(false, actionEnqueued1, actionEnqueued2, actionEnqueued3),
    );
  });
});

describe('networkSelector', () => {
  it('returns the correct shape', () => {
    const state: { network: NetworkState } = {
      network: {
        isConnected: true,
        actionQueue: [{ type: 'foo', payload: {} }],
        isQueuePaused: false,
      },
    };
    expect(networkSelector(state)).toEqual({
      isConnected: true,
      actionQueue: [{ type: 'foo', payload: {} }],
      isQueuePaused: false,
    });
  });
});
