import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import createNetworkMiddleware, {
  createReleaseQueue,
} from '../redux/createNetworkMiddleware';
import * as actionCreators from '../redux/actionCreators';
import wait from '../utils/wait';
import { SEMAPHORE_COLOR } from '../utils/constants';

type Thunk = ThunkDispatch<{}, undefined, AnyAction>;

const getFetchAction = (type: string) => ({
  type,
  payload: {
    isFetching: true,
  },
});

describe('createNetworkMiddleware with actionTypes in config', () => {
  const networkMiddleware = createNetworkMiddleware({
    actionTypes: ['REFRESH_DATA'],
  });
  const middlewares = [networkMiddleware, thunk];
  const mockStore = configureStore(middlewares);

  it('action DOES NOT match criteria', () => {
    const initialState = {
      network: {
        isConnected: false,
        actionQueue: [],
      },
    };
    const store = mockStore(initialState);

    store.dispatch({ type: 'TEST' });

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'TEST' }]);
  });

  it('action MATCHES criteria, status ONLINE', () => {
    const initialState = {
      network: {
        isConnected: true,
        actionQueue: [],
      },
    };
    const store = mockStore(initialState);
    const action = getFetchAction('FETCH_SOME_DATA_REQUEST');
    store.dispatch(action);

    const actions = store.getActions();
    expect(actions).toEqual([getFetchAction('FETCH_SOME_DATA_REQUEST')]);
  });

 


  it('action ENQUEUED, status back ONLINE', async () => {
    const action1 = getFetchAction('FETCH_SOME_DATA_REQUEST');
    const action2 = getFetchAction('FETCH_SOMETHING_ELSE_REQUEST');
    const action3 = getFetchAction('FETCH_USER_REQUEST');
    const prevActionQueue = [action1, action2, action3];
    const initialState = {
      network: {
        isConnected: false,
        actionQueue: prevActionQueue,
      },
    };
    const store = mockStore(initialState);
    store.dispatch(actionCreators.connectionChange(true));
    const actions = store.getActions();
    expect(actions).toEqual([actionCreators.connectionChange(true)]);
  });

  it('action ENQUEUED, queue PAUSED, status queue RESUMED', async () => {
    const action1 = getFetchAction('FETCH_SOME_DATA_REQUEST');
    const action2 = getFetchAction('FETCH_SOMETHING_ELSE_REQUEST');
    const action3 = getFetchAction('FETCH_USER_REQUEST');
    const prevActionQueue = [action1, action2, action3];
    const initialState = {
      network: {
        isConnected: true,
        isQueuePaused: true,
        actionQueue: prevActionQueue,
      },
    };
    const store = mockStore(initialState);
    store.dispatch(actionCreators.changeQueueSemaphore(SEMAPHORE_COLOR.GREEN));
    const actions = store.getActions();
    expect(actions).toEqual([
      actionCreators.changeQueueSemaphore(SEMAPHORE_COLOR.GREEN),
    ]);
  });
});



describe('createNetworkMiddleware with dismissing actions functionality', () => {
  describe('Plain objects', () => {
    const getFetchActionWithDismiss = (
      type: string,
      ...actionsToDismiss: string[]
    ) => ({
      type,
      payload: {
        isFetching: true,
      },
      meta: {
        retry: true,
        dismiss: actionsToDismiss,
      },
    });

    it('NO actions enqueued with dismiss options', () => {
      const networkMiddleware = createNetworkMiddleware();
      const middlewares = [networkMiddleware];
      const mockStore = configureStore(middlewares);
      const actionEnqueued = getFetchActionWithDismiss('FETCH_DATA');
      const navigationAction = { type: 'NAVIGATE_BACK' };
      const initialState = {
        network: {
          isConnected: false,
          actionQueue: [actionEnqueued],
        },
      };
      const store = mockStore(initialState);
      store.dispatch(navigationAction);

      const actionsDispatched = store.getActions();
      expect(actionsDispatched).toEqual([{ type: 'NAVIGATE_BACK' }]);
    });

    it('SOME actions enqueued with dismiss options', () => {
      const networkMiddleware = createNetworkMiddleware();
      const middlewares = [networkMiddleware];
      const mockStore = configureStore(middlewares);
      const actionEnqueued = getFetchActionWithDismiss(
        'FETCH_DATA',
        'NAVIGATE_BACK',
      );
      const navigationAction = { type: 'NAVIGATE_BACK' };
      const initialState = {
        network: {
          isConnected: false,
          actionQueue: [actionEnqueued],
        },
      };
      const store = mockStore(initialState);
      store.dispatch(navigationAction);

      const actionsDispatched = store.getActions();
      expect(actionsDispatched).toEqual([
        actionCreators.dismissActionsFromQueue('NAVIGATE_BACK'),
        { type: 'NAVIGATE_BACK' },
      ]);
    });

    it('SOME actions enqueued with dismiss options, but no match', () => {
      const networkMiddleware = createNetworkMiddleware();
      const middlewares = [networkMiddleware];
      const mockStore = configureStore(middlewares);
      const actionEnqueued = getFetchActionWithDismiss(
        'FETCH_DATA',
        'NAVIGATE_BACK',
      );
      const navigationAction = { type: 'NAVIGATE_TO_LOGIN' };
      const initialState = {
        network: {
          isConnected: false,
          actionQueue: [actionEnqueued],
        },
      };
      const store = mockStore(initialState);
      store.dispatch(navigationAction);

      const actionsDispatched = store.getActions();
      expect(actionsDispatched).toEqual([{ type: 'NAVIGATE_TO_LOGIN' }]);
    });
  });
  describe('thunks', () => {
    function fetchThunk(dispatch: Dispatch) {
      dispatch({ type: 'FETCH_DATA_REQUEST' });
    }

    it('Thunks enqueued with NO dismiss options', () => {
      const networkMiddleware = createNetworkMiddleware();
      const middlewares = [networkMiddleware];
      const mockStore = configureStore(middlewares);
      (fetchThunk as any).meta = {
        retry: true,
        dismiss: [],
      };
      const navigationAction = { type: 'NAVIGATE_BACK' };
      const initialState = {
        network: {
          isConnected: false,
          actionQueue: [fetchThunk],
        },
      };
      const store = mockStore(initialState);
      store.dispatch(navigationAction);

      const actionsDispatched = store.getActions();
      expect(actionsDispatched).toEqual([{ type: 'NAVIGATE_BACK' }]);
    });

    it('SOME thunks enqueued with dismiss options', () => {
      const networkMiddleware = createNetworkMiddleware();
      const middlewares = [networkMiddleware];
      const mockStore = configureStore(middlewares);
      (fetchThunk as any).meta = {
        retry: true,
        dismiss: ['NAVIGATE_TO_LOGIN'],
      };
      const navigationAction = { type: 'NAVIGATE_TO_LOGIN' };
      const initialState = {
        network: {
          isConnected: false,
          actionQueue: [fetchThunk],
        },
      };
      const store = mockStore(initialState);
      store.dispatch(navigationAction);

      const actionsDispatched = store.getActions();
      expect(actionsDispatched).toEqual([
        actionCreators.dismissActionsFromQueue('NAVIGATE_TO_LOGIN'),
        { type: 'NAVIGATE_TO_LOGIN' },
      ]);
    });
  });
});

describe('createNetworkMiddleware with queueDeselector', () => {
  const mockDequeueSelector = jest.fn();
  const networkMiddleware = createNetworkMiddleware({
    shouldDequeueSelector: mockDequeueSelector,
  });
  const middlewares = [networkMiddleware];
  const mockStore = configureStore(middlewares);

  it('Proxies action to next middleware if deselector returns false', () => {
    const initialState = {
      network: {
        isConnected: true,
        actionQueue: [],
      },
    };
    const store = mockStore(initialState);
    const action = getFetchAction('REFRESH_DATA');
    store.dispatch(action);

    const actions = store.getActions();
    expect(actions).toEqual([getFetchAction('REFRESH_DATA')]);
  });
});

describe('createReleaseQueue', () => {
  const mockDispatch = jest.fn();
  const mockGetState = jest.fn();
  const mockDequeueSelector = jest.fn();
  const mockDelay = 50;

  beforeEach(() => {
    mockDequeueSelector.mockImplementation(() => true);
    mockGetState.mockImplementation(() => ({
      network: {
        isConnected: true,
        isQueuePaused: false,
      },
    }));
  });

  afterEach(() => {
    mockDispatch.mockClear();
    mockGetState.mockClear();
  });

  it('empties the queue if we are online and queue is not halted', async () => {
    const releaseQueue = createReleaseQueue(
      mockGetState,
      mockDispatch,
      mockDelay,
      mockDequeueSelector,
    );
    const foo = { type: 'foo', payload: {} };
    const bar = { type: 'bar', payload: {} };
    const actionQueue = [foo, bar];
    await releaseQueue(actionQueue);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      actionCreators.removeActionFromQueue(foo),
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(2, foo);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      3,
      actionCreators.removeActionFromQueue(bar),
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(4, bar);
  });

  it('does not empty the queue if dequeue selector returns false', async () => {
    const releaseQueue = createReleaseQueue(
      mockGetState,
      mockDispatch,
      mockDelay,
      () => false,
    );
    const foo = { type: 'foo', payload: {} };
    const bar = { type: 'bar', payload: {} };
    const actionQueue = [foo, bar];
    await releaseQueue(actionQueue);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('does not empty the queue if queue has been halted', async () => {
    mockGetState.mockImplementation(() => ({
      network: {
        isQueuePaused: true,
      },
    }));
    const releaseQueue = createReleaseQueue(
      mockGetState,
      mockDispatch,
      mockDelay,
      mockDequeueSelector,
    );
    const foo = { type: 'foo', payload: {} };
    const bar = { type: 'bar', payload: {} };
    const actionQueue = [foo, bar];
    await releaseQueue(actionQueue);
    expect(mockDispatch).toHaveBeenCalledTimes(0);
  });

  it('dispatches only during the online window', async () => {
    const switchToOffline = () =>
      new Promise(async resolve => {
        await wait(30);
        mockGetState.mockImplementation(() => ({
          network: {
            isConnected: false,
          },
        }));
        resolve();
      });
    const releaseQueue = createReleaseQueue(
      mockGetState,
      mockDispatch,
      mockDelay,
      mockDequeueSelector,
    );
    const foo = { type: 'foo', payload: {} };
    const bar = { type: 'bar', payload: {} };
    const actionQueue = [foo, bar];
    await Promise.all([releaseQueue(actionQueue), switchToOffline()]);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      actionCreators.removeActionFromQueue(foo),
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(2, foo);
  });
});

describe('createNetworkMiddleware with wrong type params', () => {
  it('invalid regex', () => {
    const initialState = {
      network: {
        isConnected: false,
        actionQueue: [],
      },
    };
    // typecasting as any because otherwise TS won't let you send a string
    const networkMiddleware = createNetworkMiddleware({
      regexActionType: 'REFRESH' as any,
    });
    const middlewares = [networkMiddleware];
    const mockStore = configureStore(middlewares);

    const store = mockStore(initialState);
    const action = getFetchAction('REFRESH_DATA');

    expect(() => store.dispatch(action)).toThrow(
      'You should pass a regex as regexActionType param',
    );
  });

  it('invalid actionTypes', () => {
    const initialState = {
      network: {
        isConnected: false,
        actionQueue: [],
      },
    };
    const networkMiddleware = createNetworkMiddleware({
      actionTypes: 'REFRESH',
    });

    const middlewares = [networkMiddleware];
    const mockStore = configureStore(middlewares);

    const store = mockStore(initialState);
    const action = getFetchAction('REFRESH_DATA');

    expect(() => store.dispatch(action)).toThrow(
      'You should pass an array as actionTypes param',
    );
  });
});
