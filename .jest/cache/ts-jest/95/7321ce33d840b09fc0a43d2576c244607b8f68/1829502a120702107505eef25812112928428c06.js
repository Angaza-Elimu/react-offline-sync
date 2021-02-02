var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createNetworkMiddleware, { createReleaseQueue, } from '../redux/createNetworkMiddleware';
import * as actionCreators from '../redux/actionCreators';
import wait from '../utils/wait';
import { SEMAPHORE_COLOR } from '../utils/constants';
var getFetchAction = function (type) { return ({
    type: type,
    payload: {
        isFetching: true,
    },
}); };
describe('createNetworkMiddleware with actionTypes in config', function () {
    var networkMiddleware = createNetworkMiddleware({
        actionTypes: ['REFRESH_DATA'],
    });
    var middlewares = [networkMiddleware, thunk];
    var mockStore = configureStore(middlewares);
    it('action DOES NOT match criteria', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        store.dispatch({ type: 'TEST' });
        var actions = store.getActions();
        expect(actions).toEqual([{ type: 'TEST' }]);
    });
    it('action MATCHES criteria, status ONLINE', function () {
        var initialState = {
            network: {
                isConnected: true,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('FETCH_SOME_DATA_REQUEST');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([getFetchAction('FETCH_SOME_DATA_REQUEST')]);
    });
    it('action MATCHES criteria through REGEX, status OFFLINE', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('FETCH_SOME_DATA_REQUEST');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([actionCreators.fetchOfflineMode(action)]);
    });
    it('action MATCHES criteria through ARRAY of ACTION TYPES, status OFFLINE', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('REFRESH_DATA');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([actionCreators.fetchOfflineMode(action)]);
    });
    it('action ENQUEUED, status back ONLINE', function () { return __awaiter(void 0, void 0, void 0, function () {
        var action1, action2, action3, prevActionQueue, initialState, store, actions;
        return __generator(this, function (_a) {
            action1 = getFetchAction('FETCH_SOME_DATA_REQUEST');
            action2 = getFetchAction('FETCH_SOMETHING_ELSE_REQUEST');
            action3 = getFetchAction('FETCH_USER_REQUEST');
            prevActionQueue = [action1, action2, action3];
            initialState = {
                network: {
                    isConnected: false,
                    actionQueue: prevActionQueue,
                },
            };
            store = mockStore(initialState);
            store.dispatch(actionCreators.connectionChange(true));
            actions = store.getActions();
            expect(actions).toEqual([actionCreators.connectionChange(true)]);
            return [2 /*return*/];
        });
    }); });
    it('action ENQUEUED, queue PAUSED, status queue RESUMED', function () { return __awaiter(void 0, void 0, void 0, function () {
        var action1, action2, action3, prevActionQueue, initialState, store, actions;
        return __generator(this, function (_a) {
            action1 = getFetchAction('FETCH_SOME_DATA_REQUEST');
            action2 = getFetchAction('FETCH_SOMETHING_ELSE_REQUEST');
            action3 = getFetchAction('FETCH_USER_REQUEST');
            prevActionQueue = [action1, action2, action3];
            initialState = {
                network: {
                    isConnected: true,
                    isQueuePaused: true,
                    actionQueue: prevActionQueue,
                },
            };
            store = mockStore(initialState);
            store.dispatch(actionCreators.changeQueueSemaphore(SEMAPHORE_COLOR.GREEN));
            actions = store.getActions();
            expect(actions).toEqual([
                actionCreators.changeQueueSemaphore(SEMAPHORE_COLOR.GREEN),
            ]);
            return [2 /*return*/];
        });
    }); });
});
describe('createNetworkMiddleware with NO CONFIG', function () {
    var networkMiddleware = createNetworkMiddleware();
    var middlewares = [networkMiddleware];
    var mockStore = configureStore(middlewares);
    it('REFRESH_ACTION does not match in this case in OFFLINE mode', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('REFRESH_DATA');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([getFetchAction('REFRESH_DATA')]);
    });
});
describe('createNetworkMiddleware with different REGEX config', function () {
    var networkMiddleware = createNetworkMiddleware({
        regexActionType: /REFRESH/,
    });
    var middlewares = [networkMiddleware];
    var mockStore = configureStore(middlewares);
    it('REFRESH_ACTION MATCHES through REGEX in OFFLINE mode', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('REFRESH_DATA');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([actionCreators.fetchOfflineMode(action)]);
    });
    it('FETCH_ACTION type no longer matches default REGEX', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('FETCH_DATA');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([getFetchAction('FETCH_DATA')]);
    });
});
describe('createNetworkMiddleware with thunks', function () {
    // Helper to simulate a network request
    var fetchMockData = function (dispatch) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                dispatch({ type: 'FETCH_DATA_SUCCESS' });
                resolve();
            }, 1000);
        });
    };
    var fetchData = function (dispatch) {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        return fetchMockData(dispatch);
    };
    fetchData.interceptInOffline = true;
    function fetchSomethingWithoutInterception(dispatch) {
        return dispatch({ type: 'TOGGLE_DROPDOWN' });
    }
    it('thunk does NOT match criteria', function () {
        var networkMiddleware = createNetworkMiddleware();
        var middlewares = [networkMiddleware, thunk];
        var mockStore = configureStore(middlewares);
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        store.dispatch(fetchSomethingWithoutInterception);
        var actions = store.getActions();
        // The action went through and was dispatched
        expect(actions).toEqual([{ type: 'TOGGLE_DROPDOWN' }]);
    });
    it('thunk MATCHES criteria and we are OFFLINE', function () {
        var networkMiddleware = createNetworkMiddleware();
        var middlewares = [networkMiddleware, thunk];
        var mockStore = configureStore(middlewares);
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        store.dispatch(fetchData);
        var actions = store.getActions();
        expect(actions).toEqual([actionCreators.fetchOfflineMode(fetchData)]);
    });
    it('thunk enqueued, regex MATCHES criteria, back ONLINE -> thunk gets redispatched', function () {
        var networkMiddleware = createNetworkMiddleware();
        var middlewares = [networkMiddleware, thunk];
        var mockStore = configureStore(middlewares);
        fetchData.retry = true;
        var initialState = {
            network: {
                isConnected: true,
                actionQueue: [fetchData],
            },
        };
        var store = mockStore(initialState);
        store.dispatch(fetchData).then(function () {
            var actions = store.getActions();
            expect(actions).toEqual([
                actionCreators.removeActionFromQueue(fetchData),
                { type: 'FETCH_DATA_REQUEST' },
                { type: 'FETCH_DATA_SUCCESS' },
            ]);
        });
    });
});
describe('createNetworkMiddleware with dismissing actions functionality', function () {
    describe('Plain objects', function () {
        var getFetchActionWithDismiss = function (type) {
            var actionsToDismiss = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                actionsToDismiss[_i - 1] = arguments[_i];
            }
            return ({
                type: type,
                payload: {
                    isFetching: true,
                },
                meta: {
                    retry: true,
                    dismiss: actionsToDismiss,
                },
            });
        };
        it('NO actions enqueued with dismiss options', function () {
            var networkMiddleware = createNetworkMiddleware();
            var middlewares = [networkMiddleware];
            var mockStore = configureStore(middlewares);
            var actionEnqueued = getFetchActionWithDismiss('FETCH_DATA');
            var navigationAction = { type: 'NAVIGATE_BACK' };
            var initialState = {
                network: {
                    isConnected: false,
                    actionQueue: [actionEnqueued],
                },
            };
            var store = mockStore(initialState);
            store.dispatch(navigationAction);
            var actionsDispatched = store.getActions();
            expect(actionsDispatched).toEqual([{ type: 'NAVIGATE_BACK' }]);
        });
        it('SOME actions enqueued with dismiss options', function () {
            var networkMiddleware = createNetworkMiddleware();
            var middlewares = [networkMiddleware];
            var mockStore = configureStore(middlewares);
            var actionEnqueued = getFetchActionWithDismiss('FETCH_DATA', 'NAVIGATE_BACK');
            var navigationAction = { type: 'NAVIGATE_BACK' };
            var initialState = {
                network: {
                    isConnected: false,
                    actionQueue: [actionEnqueued],
                },
            };
            var store = mockStore(initialState);
            store.dispatch(navigationAction);
            var actionsDispatched = store.getActions();
            expect(actionsDispatched).toEqual([
                actionCreators.dismissActionsFromQueue('NAVIGATE_BACK'),
                { type: 'NAVIGATE_BACK' },
            ]);
        });
        it('SOME actions enqueued with dismiss options, but no match', function () {
            var networkMiddleware = createNetworkMiddleware();
            var middlewares = [networkMiddleware];
            var mockStore = configureStore(middlewares);
            var actionEnqueued = getFetchActionWithDismiss('FETCH_DATA', 'NAVIGATE_BACK');
            var navigationAction = { type: 'NAVIGATE_TO_LOGIN' };
            var initialState = {
                network: {
                    isConnected: false,
                    actionQueue: [actionEnqueued],
                },
            };
            var store = mockStore(initialState);
            store.dispatch(navigationAction);
            var actionsDispatched = store.getActions();
            expect(actionsDispatched).toEqual([{ type: 'NAVIGATE_TO_LOGIN' }]);
        });
    });
    describe('thunks', function () {
        function fetchThunk(dispatch) {
            dispatch({ type: 'FETCH_DATA_REQUEST' });
        }
        it('Thunks enqueued with NO dismiss options', function () {
            var networkMiddleware = createNetworkMiddleware();
            var middlewares = [networkMiddleware];
            var mockStore = configureStore(middlewares);
            fetchThunk.meta = {
                retry: true,
                dismiss: [],
            };
            var navigationAction = { type: 'NAVIGATE_BACK' };
            var initialState = {
                network: {
                    isConnected: false,
                    actionQueue: [fetchThunk],
                },
            };
            var store = mockStore(initialState);
            store.dispatch(navigationAction);
            var actionsDispatched = store.getActions();
            expect(actionsDispatched).toEqual([{ type: 'NAVIGATE_BACK' }]);
        });
        it('SOME thunks enqueued with dismiss options', function () {
            var networkMiddleware = createNetworkMiddleware();
            var middlewares = [networkMiddleware];
            var mockStore = configureStore(middlewares);
            fetchThunk.meta = {
                retry: true,
                dismiss: ['NAVIGATE_TO_LOGIN'],
            };
            var navigationAction = { type: 'NAVIGATE_TO_LOGIN' };
            var initialState = {
                network: {
                    isConnected: false,
                    actionQueue: [fetchThunk],
                },
            };
            var store = mockStore(initialState);
            store.dispatch(navigationAction);
            var actionsDispatched = store.getActions();
            expect(actionsDispatched).toEqual([
                actionCreators.dismissActionsFromQueue('NAVIGATE_TO_LOGIN'),
                { type: 'NAVIGATE_TO_LOGIN' },
            ]);
        });
    });
});
describe('createNetworkMiddleware with queueDeselector', function () {
    var mockDequeueSelector = jest.fn();
    var networkMiddleware = createNetworkMiddleware({
        shouldDequeueSelector: mockDequeueSelector,
    });
    var middlewares = [networkMiddleware];
    var mockStore = configureStore(middlewares);
    it('Proxies action to next middleware if deselector returns false', function () {
        var initialState = {
            network: {
                isConnected: true,
                actionQueue: [],
            },
        };
        var store = mockStore(initialState);
        var action = getFetchAction('REFRESH_DATA');
        store.dispatch(action);
        var actions = store.getActions();
        expect(actions).toEqual([getFetchAction('REFRESH_DATA')]);
    });
});
describe('createReleaseQueue', function () {
    var mockDispatch = jest.fn();
    var mockGetState = jest.fn();
    var mockDequeueSelector = jest.fn();
    var mockDelay = 50;
    beforeEach(function () {
        mockDequeueSelector.mockImplementation(function () { return true; });
        mockGetState.mockImplementation(function () { return ({
            network: {
                isConnected: true,
                isQueuePaused: false,
            },
        }); });
    });
    afterEach(function () {
        mockDispatch.mockClear();
        mockGetState.mockClear();
    });
    it('empties the queue if we are online and queue is not halted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var releaseQueue, foo, bar, actionQueue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    releaseQueue = createReleaseQueue(mockGetState, mockDispatch, mockDelay, mockDequeueSelector);
                    foo = { type: 'foo', payload: {} };
                    bar = { type: 'bar', payload: {} };
                    actionQueue = [foo, bar];
                    return [4 /*yield*/, releaseQueue(actionQueue)];
                case 1:
                    _a.sent();
                    expect(mockDispatch).toHaveBeenCalledTimes(4);
                    expect(mockDispatch).toHaveBeenNthCalledWith(1, actionCreators.removeActionFromQueue(foo));
                    expect(mockDispatch).toHaveBeenNthCalledWith(2, foo);
                    expect(mockDispatch).toHaveBeenNthCalledWith(3, actionCreators.removeActionFromQueue(bar));
                    expect(mockDispatch).toHaveBeenNthCalledWith(4, bar);
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not empty the queue if dequeue selector returns false', function () { return __awaiter(void 0, void 0, void 0, function () {
        var releaseQueue, foo, bar, actionQueue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    releaseQueue = createReleaseQueue(mockGetState, mockDispatch, mockDelay, function () { return false; });
                    foo = { type: 'foo', payload: {} };
                    bar = { type: 'bar', payload: {} };
                    actionQueue = [foo, bar];
                    return [4 /*yield*/, releaseQueue(actionQueue)];
                case 1:
                    _a.sent();
                    expect(mockDispatch).toHaveBeenCalledTimes(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not empty the queue if queue has been halted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var releaseQueue, foo, bar, actionQueue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGetState.mockImplementation(function () { return ({
                        network: {
                            isQueuePaused: true,
                        },
                    }); });
                    releaseQueue = createReleaseQueue(mockGetState, mockDispatch, mockDelay, mockDequeueSelector);
                    foo = { type: 'foo', payload: {} };
                    bar = { type: 'bar', payload: {} };
                    actionQueue = [foo, bar];
                    return [4 /*yield*/, releaseQueue(actionQueue)];
                case 1:
                    _a.sent();
                    expect(mockDispatch).toHaveBeenCalledTimes(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('dispatches only during the online window', function () { return __awaiter(void 0, void 0, void 0, function () {
        var switchToOffline, releaseQueue, foo, bar, actionQueue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    switchToOffline = function () {
                        return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, wait(30)];
                                    case 1:
                                        _a.sent();
                                        mockGetState.mockImplementation(function () { return ({
                                            network: {
                                                isConnected: false,
                                            },
                                        }); });
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    };
                    releaseQueue = createReleaseQueue(mockGetState, mockDispatch, mockDelay, mockDequeueSelector);
                    foo = { type: 'foo', payload: {} };
                    bar = { type: 'bar', payload: {} };
                    actionQueue = [foo, bar];
                    return [4 /*yield*/, Promise.all([releaseQueue(actionQueue), switchToOffline()])];
                case 1:
                    _a.sent();
                    expect(mockDispatch).toHaveBeenCalledTimes(2);
                    expect(mockDispatch).toHaveBeenNthCalledWith(1, actionCreators.removeActionFromQueue(foo));
                    expect(mockDispatch).toHaveBeenNthCalledWith(2, foo);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('createNetworkMiddleware with wrong type params', function () {
    it('invalid regex', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        // typecasting as any because otherwise TS won't let you send a string
        var networkMiddleware = createNetworkMiddleware({
            regexActionType: 'REFRESH',
        });
        var middlewares = [networkMiddleware];
        var mockStore = configureStore(middlewares);
        var store = mockStore(initialState);
        var action = getFetchAction('REFRESH_DATA');
        expect(function () { return store.dispatch(action); }).toThrow('You should pass a regex as regexActionType param');
    });
    it('invalid actionTypes', function () {
        var initialState = {
            network: {
                isConnected: false,
                actionQueue: [],
            },
        };
        var networkMiddleware = createNetworkMiddleware({
            actionTypes: 'REFRESH',
        });
        var middlewares = [networkMiddleware];
        var mockStore = configureStore(middlewares);
        var store = mockStore(initialState);
        var action = getFetchAction('REFRESH_DATA');
        expect(function () { return store.dispatch(action); }).toThrow('You should pass an array as actionTypes param');
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9jcmVhdGVOZXR3b3JrTWlkZGxld2FyZS50ZXN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sS0FBd0IsTUFBTSxhQUFhLENBQUM7QUFFbkQsT0FBTyx1QkFBdUIsRUFBRSxFQUM5QixrQkFBa0IsR0FDbkIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEtBQUssY0FBYyxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJckQsSUFBTSxjQUFjLEdBQUcsVUFBQyxJQUFZLElBQUssT0FBQSxDQUFDO0lBQ3hDLElBQUksTUFBQTtJQUNKLE9BQU8sRUFBRTtRQUNQLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0NBQ0YsQ0FBQyxFQUx1QyxDQUt2QyxDQUFDO0FBRUgsUUFBUSxDQUFDLG9EQUFvRCxFQUFFO0lBQzdELElBQU0saUJBQWlCLEdBQUcsdUJBQXVCLENBQUM7UUFDaEQsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO0tBQzlCLENBQUMsQ0FBQztJQUNILElBQU0sV0FBVyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsSUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTlDLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNuQyxJQUFNLFlBQVksR0FBRztZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxFQUFFO2FBQ2hCO1NBQ0YsQ0FBQztRQUNGLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV0QyxLQUFLLENB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QUFXLENBQUMsQ0FBQztRQUU5QyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FDMUMsa0RBQWtELENBQ25ELENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUN4QixJQUFNLFlBQVksR0FBRztZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFdBQVcsRUFBRSxFQUFFO2FBQ2hCO1NBQ0YsQ0FBQztRQUNGLElBQU0saUJBQWlCLEdBQUcsdUJBQXVCLENBQUM7WUFDaEQsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBTSxXQUFXLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLElBQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5QyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FDMUMsK0NBQStDLENBQ2hELENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3QvY3JlYXRlTmV0d29ya01pZGRsZXdhcmUudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAncmVkdXgtbW9jay1zdG9yZSc7XG5pbXBvcnQgdGh1bmssIHsgVGh1bmtEaXNwYXRjaCB9IGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IERpc3BhdGNoLCBBbnlBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgY3JlYXRlTmV0d29ya01pZGRsZXdhcmUsIHtcbiAgY3JlYXRlUmVsZWFzZVF1ZXVlLFxufSBmcm9tICcuLi9yZWR1eC9jcmVhdGVOZXR3b3JrTWlkZGxld2FyZSc7XG5pbXBvcnQgKiBhcyBhY3Rpb25DcmVhdG9ycyBmcm9tICcuLi9yZWR1eC9hY3Rpb25DcmVhdG9ycyc7XG5pbXBvcnQgd2FpdCBmcm9tICcuLi91dGlscy93YWl0JztcbmltcG9ydCB7IFNFTUFQSE9SRV9DT0xPUiB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5cbnR5cGUgVGh1bmsgPSBUaHVua0Rpc3BhdGNoPHt9LCB1bmRlZmluZWQsIEFueUFjdGlvbj47XG5cbmNvbnN0IGdldEZldGNoQWN0aW9uID0gKHR5cGU6IHN0cmluZykgPT4gKHtcbiAgdHlwZSxcbiAgcGF5bG9hZDoge1xuICAgIGlzRmV0Y2hpbmc6IHRydWUsXG4gIH0sXG59KTtcblxuZGVzY3JpYmUoJ2NyZWF0ZU5ldHdvcmtNaWRkbGV3YXJlIHdpdGggYWN0aW9uVHlwZXMgaW4gY29uZmlnJywgKCkgPT4ge1xuICBjb25zdCBuZXR3b3JrTWlkZGxld2FyZSA9IGNyZWF0ZU5ldHdvcmtNaWRkbGV3YXJlKHtcbiAgICBhY3Rpb25UeXBlczogWydSRUZSRVNIX0RBVEEnXSxcbiAgfSk7XG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW25ldHdvcmtNaWRkbGV3YXJlLCB0aHVua107XG4gIGNvbnN0IG1vY2tTdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKG1pZGRsZXdhcmVzKTtcblxuICBpdCgnYWN0aW9uIERPRVMgTk9UIG1hdGNoIGNyaXRlcmlhJywgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogW10sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgc3RvcmUgPSBtb2NrU3RvcmUoaW5pdGlhbFN0YXRlKTtcblxuICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ1RFU1QnIH0pO1xuXG4gICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICBleHBlY3QoYWN0aW9ucykudG9FcXVhbChbeyB0eXBlOiAnVEVTVCcgfV0pO1xuICB9KTtcblxuICBpdCgnYWN0aW9uIE1BVENIRVMgY3JpdGVyaWEsIHN0YXR1cyBPTkxJTkUnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgYWN0aW9uUXVldWU6IFtdLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgY29uc3QgYWN0aW9uID0gZ2V0RmV0Y2hBY3Rpb24oJ0ZFVENIX1NPTUVfREFUQV9SRVFVRVNUJyk7XG4gICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgZXhwZWN0KGFjdGlvbnMpLnRvRXF1YWwoW2dldEZldGNoQWN0aW9uKCdGRVRDSF9TT01FX0RBVEFfUkVRVUVTVCcpXSk7XG4gIH0pO1xuXG4gIGl0KCdhY3Rpb24gTUFUQ0hFUyBjcml0ZXJpYSB0aHJvdWdoIFJFR0VYLCBzdGF0dXMgT0ZGTElORScsICgpID0+IHtcbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICBuZXR3b3JrOiB7XG4gICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgYWN0aW9uUXVldWU6IFtdLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgY29uc3QgYWN0aW9uID0gZ2V0RmV0Y2hBY3Rpb24oJ0ZFVENIX1NPTUVfREFUQV9SRVFVRVNUJyk7XG4gICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgZXhwZWN0KGFjdGlvbnMpLnRvRXF1YWwoW2FjdGlvbkNyZWF0b3JzLmZldGNoT2ZmbGluZU1vZGUoYWN0aW9uKV0pO1xuICB9KTtcblxuICBpdCgnYWN0aW9uIE1BVENIRVMgY3JpdGVyaWEgdGhyb3VnaCBBUlJBWSBvZiBBQ1RJT04gVFlQRVMsIHN0YXR1cyBPRkZMSU5FJywgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogW10sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgc3RvcmUgPSBtb2NrU3RvcmUoaW5pdGlhbFN0YXRlKTtcbiAgICBjb25zdCBhY3Rpb24gPSBnZXRGZXRjaEFjdGlvbignUkVGUkVTSF9EQVRBJyk7XG4gICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9uKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgZXhwZWN0KGFjdGlvbnMpLnRvRXF1YWwoW2FjdGlvbkNyZWF0b3JzLmZldGNoT2ZmbGluZU1vZGUoYWN0aW9uKV0pO1xuICB9KTtcblxuICBpdCgnYWN0aW9uIEVOUVVFVUVELCBzdGF0dXMgYmFjayBPTkxJTkUnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYWN0aW9uMSA9IGdldEZldGNoQWN0aW9uKCdGRVRDSF9TT01FX0RBVEFfUkVRVUVTVCcpO1xuICAgIGNvbnN0IGFjdGlvbjIgPSBnZXRGZXRjaEFjdGlvbignRkVUQ0hfU09NRVRISU5HX0VMU0VfUkVRVUVTVCcpO1xuICAgIGNvbnN0IGFjdGlvbjMgPSBnZXRGZXRjaEFjdGlvbignRkVUQ0hfVVNFUl9SRVFVRVNUJyk7XG4gICAgY29uc3QgcHJldkFjdGlvblF1ZXVlID0gW2FjdGlvbjEsIGFjdGlvbjIsIGFjdGlvbjNdO1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogcHJldkFjdGlvblF1ZXVlLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9uQ3JlYXRvcnMuY29ubmVjdGlvbkNoYW5nZSh0cnVlKSk7XG4gICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICBleHBlY3QoYWN0aW9ucykudG9FcXVhbChbYWN0aW9uQ3JlYXRvcnMuY29ubmVjdGlvbkNoYW5nZSh0cnVlKV0pO1xuICB9KTtcblxuICBpdCgnYWN0aW9uIEVOUVVFVUVELCBxdWV1ZSBQQVVTRUQsIHN0YXR1cyBxdWV1ZSBSRVNVTUVEJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGFjdGlvbjEgPSBnZXRGZXRjaEFjdGlvbignRkVUQ0hfU09NRV9EQVRBX1JFUVVFU1QnKTtcbiAgICBjb25zdCBhY3Rpb24yID0gZ2V0RmV0Y2hBY3Rpb24oJ0ZFVENIX1NPTUVUSElOR19FTFNFX1JFUVVFU1QnKTtcbiAgICBjb25zdCBhY3Rpb24zID0gZ2V0RmV0Y2hBY3Rpb24oJ0ZFVENIX1VTRVJfUkVRVUVTVCcpO1xuICAgIGNvbnN0IHByZXZBY3Rpb25RdWV1ZSA9IFthY3Rpb24xLCBhY3Rpb24yLCBhY3Rpb24zXTtcbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICBuZXR3b3JrOiB7XG4gICAgICAgIGlzQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBpc1F1ZXVlUGF1c2VkOiB0cnVlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogcHJldkFjdGlvblF1ZXVlLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgc3RvcmUuZGlzcGF0Y2goYWN0aW9uQ3JlYXRvcnMuY2hhbmdlUXVldWVTZW1hcGhvcmUoU0VNQVBIT1JFX0NPTE9SLkdSRUVOKSk7XG4gICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICBleHBlY3QoYWN0aW9ucykudG9FcXVhbChbXG4gICAgICBhY3Rpb25DcmVhdG9ycy5jaGFuZ2VRdWV1ZVNlbWFwaG9yZShTRU1BUEhPUkVfQ09MT1IuR1JFRU4pLFxuICAgIF0pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY3JlYXRlTmV0d29ya01pZGRsZXdhcmUgd2l0aCBOTyBDT05GSUcnLCAoKSA9PiB7XG4gIGNvbnN0IG5ldHdvcmtNaWRkbGV3YXJlID0gY3JlYXRlTmV0d29ya01pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZXMgPSBbbmV0d29ya01pZGRsZXdhcmVdO1xuICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG5cbiAgaXQoJ1JFRlJFU0hfQUNUSU9OIGRvZXMgbm90IG1hdGNoIGluIHRoaXMgY2FzZSBpbiBPRkZMSU5FIG1vZGUnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IGdldEZldGNoQWN0aW9uKCdSRUZSRVNIX0RBVEEnKTtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb24pO1xuXG4gICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICBleHBlY3QoYWN0aW9ucykudG9FcXVhbChbZ2V0RmV0Y2hBY3Rpb24oJ1JFRlJFU0hfREFUQScpXSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSB3aXRoIGRpZmZlcmVudCBSRUdFWCBjb25maWcnLCAoKSA9PiB7XG4gIGNvbnN0IG5ldHdvcmtNaWRkbGV3YXJlID0gY3JlYXRlTmV0d29ya01pZGRsZXdhcmUoe1xuICAgIHJlZ2V4QWN0aW9uVHlwZTogL1JFRlJFU0gvLFxuICB9KTtcbiAgY29uc3QgbWlkZGxld2FyZXMgPSBbbmV0d29ya01pZGRsZXdhcmVdO1xuICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG5cbiAgaXQoJ1JFRlJFU0hfQUNUSU9OIE1BVENIRVMgdGhyb3VnaCBSRUdFWCBpbiBPRkZMSU5FIG1vZGUnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IGdldEZldGNoQWN0aW9uKCdSRUZSRVNIX0RBVEEnKTtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb24pO1xuXG4gICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICBleHBlY3QoYWN0aW9ucykudG9FcXVhbChbYWN0aW9uQ3JlYXRvcnMuZmV0Y2hPZmZsaW5lTW9kZShhY3Rpb24pXSk7XG4gIH0pO1xuXG4gIGl0KCdGRVRDSF9BQ1RJT04gdHlwZSBubyBsb25nZXIgbWF0Y2hlcyBkZWZhdWx0IFJFR0VYJywgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogW10sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3Qgc3RvcmUgPSBtb2NrU3RvcmUoaW5pdGlhbFN0YXRlKTtcbiAgICBjb25zdCBhY3Rpb24gPSBnZXRGZXRjaEFjdGlvbignRkVUQ0hfREFUQScpO1xuICAgIHN0b3JlLmRpc3BhdGNoKGFjdGlvbik7XG5cbiAgICBjb25zdCBhY3Rpb25zID0gc3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgIGV4cGVjdChhY3Rpb25zKS50b0VxdWFsKFtnZXRGZXRjaEFjdGlvbignRkVUQ0hfREFUQScpXSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSB3aXRoIHRodW5rcycsICgpID0+IHtcbiAgLy8gSGVscGVyIHRvIHNpbXVsYXRlIGEgbmV0d29yayByZXF1ZXN0XG4gIGNvbnN0IGZldGNoTW9ja0RhdGEgPSAoZGlzcGF0Y2g6IERpc3BhdGNoKSA9PlxuICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0ZFVENIX0RBVEFfU1VDQ0VTUycgfSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG4gIGNvbnN0IGZldGNoRGF0YSA9IChkaXNwYXRjaDogRGlzcGF0Y2gpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdGRVRDSF9EQVRBX1JFUVVFU1QnIH0pO1xuICAgIHJldHVybiBmZXRjaE1vY2tEYXRhKGRpc3BhdGNoKTtcbiAgfTtcblxuICBmZXRjaERhdGEuaW50ZXJjZXB0SW5PZmZsaW5lID0gdHJ1ZTtcblxuICBmdW5jdGlvbiBmZXRjaFNvbWV0aGluZ1dpdGhvdXRJbnRlcmNlcHRpb24oZGlzcGF0Y2g6IERpc3BhdGNoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKHsgdHlwZTogJ1RPR0dMRV9EUk9QRE9XTicgfSk7XG4gIH1cblxuICBpdCgndGh1bmsgZG9lcyBOT1QgbWF0Y2ggY3JpdGVyaWEnLCAoKSA9PiB7XG4gICAgY29uc3QgbmV0d29ya01pZGRsZXdhcmUgPSBjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSgpO1xuICAgIGNvbnN0IG1pZGRsZXdhcmVzID0gW25ldHdvcmtNaWRkbGV3YXJlLCB0aHVua107XG4gICAgY29uc3QgbW9ja1N0b3JlID0gY29uZmlndXJlU3RvcmU8e30sIFRodW5rPihtaWRkbGV3YXJlcyk7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuXG4gICAgc3RvcmUuZGlzcGF0Y2goZmV0Y2hTb21ldGhpbmdXaXRob3V0SW50ZXJjZXB0aW9uKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgLy8gVGhlIGFjdGlvbiB3ZW50IHRocm91Z2ggYW5kIHdhcyBkaXNwYXRjaGVkXG4gICAgZXhwZWN0KGFjdGlvbnMpLnRvRXF1YWwoW3sgdHlwZTogJ1RPR0dMRV9EUk9QRE9XTicgfV0pO1xuICB9KTtcblxuICBpdCgndGh1bmsgTUFUQ0hFUyBjcml0ZXJpYSBhbmQgd2UgYXJlIE9GRkxJTkUnLCAoKSA9PiB7XG4gICAgY29uc3QgbmV0d29ya01pZGRsZXdhcmUgPSBjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSgpO1xuICAgIGNvbnN0IG1pZGRsZXdhcmVzID0gW25ldHdvcmtNaWRkbGV3YXJlLCB0aHVua107XG4gICAgY29uc3QgbW9ja1N0b3JlID0gY29uZmlndXJlU3RvcmU8e30sIFRodW5rPihtaWRkbGV3YXJlcyk7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuXG4gICAgc3RvcmUuZGlzcGF0Y2goZmV0Y2hEYXRhKTtcblxuICAgIGNvbnN0IGFjdGlvbnMgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgZXhwZWN0KGFjdGlvbnMpLnRvRXF1YWwoW2FjdGlvbkNyZWF0b3JzLmZldGNoT2ZmbGluZU1vZGUoZmV0Y2hEYXRhKV0pO1xuICB9KTtcblxuICBpdCgndGh1bmsgZW5xdWV1ZWQsIHJlZ2V4IE1BVENIRVMgY3JpdGVyaWEsIGJhY2sgT05MSU5FIC0+IHRodW5rIGdldHMgcmVkaXNwYXRjaGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IG5ldHdvcmtNaWRkbGV3YXJlID0gY3JlYXRlTmV0d29ya01pZGRsZXdhcmUoKTtcbiAgICBjb25zdCBtaWRkbGV3YXJlcyA9IFtuZXR3b3JrTWlkZGxld2FyZSwgdGh1bmtdO1xuICAgIGNvbnN0IG1vY2tTdG9yZSA9IGNvbmZpZ3VyZVN0b3JlPHt9LCBUaHVuaz4obWlkZGxld2FyZXMpO1xuICAgIChmZXRjaERhdGEgYXMgYW55KS5yZXRyeSA9IHRydWU7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgYWN0aW9uUXVldWU6IFtmZXRjaERhdGFdLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG5cbiAgICBzdG9yZS5kaXNwYXRjaChmZXRjaERhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgIGV4cGVjdChhY3Rpb25zKS50b0VxdWFsKFtcbiAgICAgICAgYWN0aW9uQ3JlYXRvcnMucmVtb3ZlQWN0aW9uRnJvbVF1ZXVlKGZldGNoRGF0YSksXG4gICAgICAgIHsgdHlwZTogJ0ZFVENIX0RBVEFfUkVRVUVTVCcgfSxcbiAgICAgICAgeyB0eXBlOiAnRkVUQ0hfREFUQV9TVUNDRVNTJyB9LFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSB3aXRoIGRpc21pc3NpbmcgYWN0aW9ucyBmdW5jdGlvbmFsaXR5JywgKCkgPT4ge1xuICBkZXNjcmliZSgnUGxhaW4gb2JqZWN0cycsICgpID0+IHtcbiAgICBjb25zdCBnZXRGZXRjaEFjdGlvbldpdGhEaXNtaXNzID0gKFxuICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgLi4uYWN0aW9uc1RvRGlzbWlzczogc3RyaW5nW11cbiAgICApID0+ICh7XG4gICAgICB0eXBlLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgcmV0cnk6IHRydWUsXG4gICAgICAgIGRpc21pc3M6IGFjdGlvbnNUb0Rpc21pc3MsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaXQoJ05PIGFjdGlvbnMgZW5xdWV1ZWQgd2l0aCBkaXNtaXNzIG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBuZXR3b3JrTWlkZGxld2FyZSA9IGNyZWF0ZU5ldHdvcmtNaWRkbGV3YXJlKCk7XG4gICAgICBjb25zdCBtaWRkbGV3YXJlcyA9IFtuZXR3b3JrTWlkZGxld2FyZV07XG4gICAgICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG4gICAgICBjb25zdCBhY3Rpb25FbnF1ZXVlZCA9IGdldEZldGNoQWN0aW9uV2l0aERpc21pc3MoJ0ZFVENIX0RBVEEnKTtcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25BY3Rpb24gPSB7IHR5cGU6ICdOQVZJR0FURV9CQUNLJyB9O1xuICAgICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGFjdGlvblF1ZXVlOiBbYWN0aW9uRW5xdWV1ZWRdLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgICBzdG9yZS5kaXNwYXRjaChuYXZpZ2F0aW9uQWN0aW9uKTtcblxuICAgICAgY29uc3QgYWN0aW9uc0Rpc3BhdGNoZWQgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICBleHBlY3QoYWN0aW9uc0Rpc3BhdGNoZWQpLnRvRXF1YWwoW3sgdHlwZTogJ05BVklHQVRFX0JBQ0snIH1dKTtcbiAgICB9KTtcblxuICAgIGl0KCdTT01FIGFjdGlvbnMgZW5xdWV1ZWQgd2l0aCBkaXNtaXNzIG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBuZXR3b3JrTWlkZGxld2FyZSA9IGNyZWF0ZU5ldHdvcmtNaWRkbGV3YXJlKCk7XG4gICAgICBjb25zdCBtaWRkbGV3YXJlcyA9IFtuZXR3b3JrTWlkZGxld2FyZV07XG4gICAgICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG4gICAgICBjb25zdCBhY3Rpb25FbnF1ZXVlZCA9IGdldEZldGNoQWN0aW9uV2l0aERpc21pc3MoXG4gICAgICAgICdGRVRDSF9EQVRBJyxcbiAgICAgICAgJ05BVklHQVRFX0JBQ0snLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25BY3Rpb24gPSB7IHR5cGU6ICdOQVZJR0FURV9CQUNLJyB9O1xuICAgICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGFjdGlvblF1ZXVlOiBbYWN0aW9uRW5xdWV1ZWRdLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgICBzdG9yZS5kaXNwYXRjaChuYXZpZ2F0aW9uQWN0aW9uKTtcblxuICAgICAgY29uc3QgYWN0aW9uc0Rpc3BhdGNoZWQgPSBzdG9yZS5nZXRBY3Rpb25zKCk7XG4gICAgICBleHBlY3QoYWN0aW9uc0Rpc3BhdGNoZWQpLnRvRXF1YWwoW1xuICAgICAgICBhY3Rpb25DcmVhdG9ycy5kaXNtaXNzQWN0aW9uc0Zyb21RdWV1ZSgnTkFWSUdBVEVfQkFDSycpLFxuICAgICAgICB7IHR5cGU6ICdOQVZJR0FURV9CQUNLJyB9LFxuICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU09NRSBhY3Rpb25zIGVucXVldWVkIHdpdGggZGlzbWlzcyBvcHRpb25zLCBidXQgbm8gbWF0Y2gnLCAoKSA9PiB7XG4gICAgICBjb25zdCBuZXR3b3JrTWlkZGxld2FyZSA9IGNyZWF0ZU5ldHdvcmtNaWRkbGV3YXJlKCk7XG4gICAgICBjb25zdCBtaWRkbGV3YXJlcyA9IFtuZXR3b3JrTWlkZGxld2FyZV07XG4gICAgICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG4gICAgICBjb25zdCBhY3Rpb25FbnF1ZXVlZCA9IGdldEZldGNoQWN0aW9uV2l0aERpc21pc3MoXG4gICAgICAgICdGRVRDSF9EQVRBJyxcbiAgICAgICAgJ05BVklHQVRFX0JBQ0snLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25BY3Rpb24gPSB7IHR5cGU6ICdOQVZJR0FURV9UT19MT0dJTicgfTtcbiAgICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgICBhY3Rpb25RdWV1ZTogW2FjdGlvbkVucXVldWVkXSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgICAgc3RvcmUuZGlzcGF0Y2gobmF2aWdhdGlvbkFjdGlvbik7XG5cbiAgICAgIGNvbnN0IGFjdGlvbnNEaXNwYXRjaGVkID0gc3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgZXhwZWN0KGFjdGlvbnNEaXNwYXRjaGVkKS50b0VxdWFsKFt7IHR5cGU6ICdOQVZJR0FURV9UT19MT0dJTicgfV0pO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3RodW5rcycsICgpID0+IHtcbiAgICBmdW5jdGlvbiBmZXRjaFRodW5rKGRpc3BhdGNoOiBEaXNwYXRjaCkge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnRkVUQ0hfREFUQV9SRVFVRVNUJyB9KTtcbiAgICB9XG5cbiAgICBpdCgnVGh1bmtzIGVucXVldWVkIHdpdGggTk8gZGlzbWlzcyBvcHRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgbmV0d29ya01pZGRsZXdhcmUgPSBjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSgpO1xuICAgICAgY29uc3QgbWlkZGxld2FyZXMgPSBbbmV0d29ya01pZGRsZXdhcmVdO1xuICAgICAgY29uc3QgbW9ja1N0b3JlID0gY29uZmlndXJlU3RvcmUobWlkZGxld2FyZXMpO1xuICAgICAgKGZldGNoVGh1bmsgYXMgYW55KS5tZXRhID0ge1xuICAgICAgICByZXRyeTogdHJ1ZSxcbiAgICAgICAgZGlzbWlzczogW10sXG4gICAgICB9O1xuICAgICAgY29uc3QgbmF2aWdhdGlvbkFjdGlvbiA9IHsgdHlwZTogJ05BVklHQVRFX0JBQ0snIH07XG4gICAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgYWN0aW9uUXVldWU6IFtmZXRjaFRodW5rXSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgICAgc3RvcmUuZGlzcGF0Y2gobmF2aWdhdGlvbkFjdGlvbik7XG5cbiAgICAgIGNvbnN0IGFjdGlvbnNEaXNwYXRjaGVkID0gc3RvcmUuZ2V0QWN0aW9ucygpO1xuICAgICAgZXhwZWN0KGFjdGlvbnNEaXNwYXRjaGVkKS50b0VxdWFsKFt7IHR5cGU6ICdOQVZJR0FURV9CQUNLJyB9XSk7XG4gICAgfSk7XG5cbiAgICBpdCgnU09NRSB0aHVua3MgZW5xdWV1ZWQgd2l0aCBkaXNtaXNzIG9wdGlvbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBuZXR3b3JrTWlkZGxld2FyZSA9IGNyZWF0ZU5ldHdvcmtNaWRkbGV3YXJlKCk7XG4gICAgICBjb25zdCBtaWRkbGV3YXJlcyA9IFtuZXR3b3JrTWlkZGxld2FyZV07XG4gICAgICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG4gICAgICAoZmV0Y2hUaHVuayBhcyBhbnkpLm1ldGEgPSB7XG4gICAgICAgIHJldHJ5OiB0cnVlLFxuICAgICAgICBkaXNtaXNzOiBbJ05BVklHQVRFX1RPX0xPR0lOJ10sXG4gICAgICB9O1xuICAgICAgY29uc3QgbmF2aWdhdGlvbkFjdGlvbiA9IHsgdHlwZTogJ05BVklHQVRFX1RPX0xPR0lOJyB9O1xuICAgICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGFjdGlvblF1ZXVlOiBbZmV0Y2hUaHVua10sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3Qgc3RvcmUgPSBtb2NrU3RvcmUoaW5pdGlhbFN0YXRlKTtcbiAgICAgIHN0b3JlLmRpc3BhdGNoKG5hdmlnYXRpb25BY3Rpb24pO1xuXG4gICAgICBjb25zdCBhY3Rpb25zRGlzcGF0Y2hlZCA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICAgIGV4cGVjdChhY3Rpb25zRGlzcGF0Y2hlZCkudG9FcXVhbChbXG4gICAgICAgIGFjdGlvbkNyZWF0b3JzLmRpc21pc3NBY3Rpb25zRnJvbVF1ZXVlKCdOQVZJR0FURV9UT19MT0dJTicpLFxuICAgICAgICB7IHR5cGU6ICdOQVZJR0FURV9UT19MT0dJTicgfSxcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY3JlYXRlTmV0d29ya01pZGRsZXdhcmUgd2l0aCBxdWV1ZURlc2VsZWN0b3InLCAoKSA9PiB7XG4gIGNvbnN0IG1vY2tEZXF1ZXVlU2VsZWN0b3IgPSBqZXN0LmZuKCk7XG4gIGNvbnN0IG5ldHdvcmtNaWRkbGV3YXJlID0gY3JlYXRlTmV0d29ya01pZGRsZXdhcmUoe1xuICAgIHNob3VsZERlcXVldWVTZWxlY3RvcjogbW9ja0RlcXVldWVTZWxlY3RvcixcbiAgfSk7XG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW25ldHdvcmtNaWRkbGV3YXJlXTtcbiAgY29uc3QgbW9ja1N0b3JlID0gY29uZmlndXJlU3RvcmUobWlkZGxld2FyZXMpO1xuXG4gIGl0KCdQcm94aWVzIGFjdGlvbiB0byBuZXh0IG1pZGRsZXdhcmUgaWYgZGVzZWxlY3RvciByZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IGdldEZldGNoQWN0aW9uKCdSRUZSRVNIX0RBVEEnKTtcbiAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb24pO1xuXG4gICAgY29uc3QgYWN0aW9ucyA9IHN0b3JlLmdldEFjdGlvbnMoKTtcbiAgICBleHBlY3QoYWN0aW9ucykudG9FcXVhbChbZ2V0RmV0Y2hBY3Rpb24oJ1JFRlJFU0hfREFUQScpXSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjcmVhdGVSZWxlYXNlUXVldWUnLCAoKSA9PiB7XG4gIGNvbnN0IG1vY2tEaXNwYXRjaCA9IGplc3QuZm4oKTtcbiAgY29uc3QgbW9ja0dldFN0YXRlID0gamVzdC5mbigpO1xuICBjb25zdCBtb2NrRGVxdWV1ZVNlbGVjdG9yID0gamVzdC5mbigpO1xuICBjb25zdCBtb2NrRGVsYXkgPSA1MDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBtb2NrRGVxdWV1ZVNlbGVjdG9yLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiB0cnVlKTtcbiAgICBtb2NrR2V0U3RhdGUubW9ja0ltcGxlbWVudGF0aW9uKCgpID0+ICh7XG4gICAgICBuZXR3b3JrOiB7XG4gICAgICAgIGlzQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBpc1F1ZXVlUGF1c2VkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSkpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIG1vY2tEaXNwYXRjaC5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrR2V0U3RhdGUubW9ja0NsZWFyKCk7XG4gIH0pO1xuXG4gIGl0KCdlbXB0aWVzIHRoZSBxdWV1ZSBpZiB3ZSBhcmUgb25saW5lIGFuZCBxdWV1ZSBpcyBub3QgaGFsdGVkJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlbGVhc2VRdWV1ZSA9IGNyZWF0ZVJlbGVhc2VRdWV1ZShcbiAgICAgIG1vY2tHZXRTdGF0ZSxcbiAgICAgIG1vY2tEaXNwYXRjaCxcbiAgICAgIG1vY2tEZWxheSxcbiAgICAgIG1vY2tEZXF1ZXVlU2VsZWN0b3IsXG4gICAgKTtcbiAgICBjb25zdCBmb28gPSB7IHR5cGU6ICdmb28nLCBwYXlsb2FkOiB7fSB9O1xuICAgIGNvbnN0IGJhciA9IHsgdHlwZTogJ2JhcicsIHBheWxvYWQ6IHt9IH07XG4gICAgY29uc3QgYWN0aW9uUXVldWUgPSBbZm9vLCBiYXJdO1xuICAgIGF3YWl0IHJlbGVhc2VRdWV1ZShhY3Rpb25RdWV1ZSk7XG4gICAgZXhwZWN0KG1vY2tEaXNwYXRjaCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDQpO1xuICAgIGV4cGVjdChtb2NrRGlzcGF0Y2gpLnRvSGF2ZUJlZW5OdGhDYWxsZWRXaXRoKFxuICAgICAgMSxcbiAgICAgIGFjdGlvbkNyZWF0b3JzLnJlbW92ZUFjdGlvbkZyb21RdWV1ZShmb28pLFxuICAgICk7XG4gICAgZXhwZWN0KG1vY2tEaXNwYXRjaCkudG9IYXZlQmVlbk50aENhbGxlZFdpdGgoMiwgZm9vKTtcbiAgICBleHBlY3QobW9ja0Rpc3BhdGNoKS50b0hhdmVCZWVuTnRoQ2FsbGVkV2l0aChcbiAgICAgIDMsXG4gICAgICBhY3Rpb25DcmVhdG9ycy5yZW1vdmVBY3Rpb25Gcm9tUXVldWUoYmFyKSxcbiAgICApO1xuICAgIGV4cGVjdChtb2NrRGlzcGF0Y2gpLnRvSGF2ZUJlZW5OdGhDYWxsZWRXaXRoKDQsIGJhcik7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdCBlbXB0eSB0aGUgcXVldWUgaWYgZGVxdWV1ZSBzZWxlY3RvciByZXR1cm5zIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlbGVhc2VRdWV1ZSA9IGNyZWF0ZVJlbGVhc2VRdWV1ZShcbiAgICAgIG1vY2tHZXRTdGF0ZSxcbiAgICAgIG1vY2tEaXNwYXRjaCxcbiAgICAgIG1vY2tEZWxheSxcbiAgICAgICgpID0+IGZhbHNlLFxuICAgICk7XG4gICAgY29uc3QgZm9vID0geyB0eXBlOiAnZm9vJywgcGF5bG9hZDoge30gfTtcbiAgICBjb25zdCBiYXIgPSB7IHR5cGU6ICdiYXInLCBwYXlsb2FkOiB7fSB9O1xuICAgIGNvbnN0IGFjdGlvblF1ZXVlID0gW2ZvbywgYmFyXTtcbiAgICBhd2FpdCByZWxlYXNlUXVldWUoYWN0aW9uUXVldWUpO1xuICAgIGV4cGVjdChtb2NrRGlzcGF0Y2gpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcbiAgfSk7XG5cbiAgaXQoJ2RvZXMgbm90IGVtcHR5IHRoZSBxdWV1ZSBpZiBxdWV1ZSBoYXMgYmVlbiBoYWx0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja0dldFN0YXRlLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiAoe1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc1F1ZXVlUGF1c2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSk7XG4gICAgY29uc3QgcmVsZWFzZVF1ZXVlID0gY3JlYXRlUmVsZWFzZVF1ZXVlKFxuICAgICAgbW9ja0dldFN0YXRlLFxuICAgICAgbW9ja0Rpc3BhdGNoLFxuICAgICAgbW9ja0RlbGF5LFxuICAgICAgbW9ja0RlcXVldWVTZWxlY3RvcixcbiAgICApO1xuICAgIGNvbnN0IGZvbyA9IHsgdHlwZTogJ2ZvbycsIHBheWxvYWQ6IHt9IH07XG4gICAgY29uc3QgYmFyID0geyB0eXBlOiAnYmFyJywgcGF5bG9hZDoge30gfTtcbiAgICBjb25zdCBhY3Rpb25RdWV1ZSA9IFtmb28sIGJhcl07XG4gICAgYXdhaXQgcmVsZWFzZVF1ZXVlKGFjdGlvblF1ZXVlKTtcbiAgICBleHBlY3QobW9ja0Rpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMCk7XG4gIH0pO1xuXG4gIGl0KCdkaXNwYXRjaGVzIG9ubHkgZHVyaW5nIHRoZSBvbmxpbmUgd2luZG93JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHN3aXRjaFRvT2ZmbGluZSA9ICgpID0+XG4gICAgICBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgYXdhaXQgd2FpdCgzMCk7XG4gICAgICAgIG1vY2tHZXRTdGF0ZS5tb2NrSW1wbGVtZW50YXRpb24oKCkgPT4gKHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICBjb25zdCByZWxlYXNlUXVldWUgPSBjcmVhdGVSZWxlYXNlUXVldWUoXG4gICAgICBtb2NrR2V0U3RhdGUsXG4gICAgICBtb2NrRGlzcGF0Y2gsXG4gICAgICBtb2NrRGVsYXksXG4gICAgICBtb2NrRGVxdWV1ZVNlbGVjdG9yLFxuICAgICk7XG4gICAgY29uc3QgZm9vID0geyB0eXBlOiAnZm9vJywgcGF5bG9hZDoge30gfTtcbiAgICBjb25zdCBiYXIgPSB7IHR5cGU6ICdiYXInLCBwYXlsb2FkOiB7fSB9O1xuICAgIGNvbnN0IGFjdGlvblF1ZXVlID0gW2ZvbywgYmFyXTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbcmVsZWFzZVF1ZXVlKGFjdGlvblF1ZXVlKSwgc3dpdGNoVG9PZmZsaW5lKCldKTtcbiAgICBleHBlY3QobW9ja0Rpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG4gICAgZXhwZWN0KG1vY2tEaXNwYXRjaCkudG9IYXZlQmVlbk50aENhbGxlZFdpdGgoXG4gICAgICAxLFxuICAgICAgYWN0aW9uQ3JlYXRvcnMucmVtb3ZlQWN0aW9uRnJvbVF1ZXVlKGZvbyksXG4gICAgKTtcbiAgICBleHBlY3QobW9ja0Rpc3BhdGNoKS50b0hhdmVCZWVuTnRoQ2FsbGVkV2l0aCgyLCBmb28pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY3JlYXRlTmV0d29ya01pZGRsZXdhcmUgd2l0aCB3cm9uZyB0eXBlIHBhcmFtcycsICgpID0+IHtcbiAgaXQoJ2ludmFsaWQgcmVnZXgnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgICAgbmV0d29yazoge1xuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICAvLyB0eXBlY2FzdGluZyBhcyBhbnkgYmVjYXVzZSBvdGhlcndpc2UgVFMgd29uJ3QgbGV0IHlvdSBzZW5kIGEgc3RyaW5nXG4gICAgY29uc3QgbmV0d29ya01pZGRsZXdhcmUgPSBjcmVhdGVOZXR3b3JrTWlkZGxld2FyZSh7XG4gICAgICByZWdleEFjdGlvblR5cGU6ICdSRUZSRVNIJyBhcyBhbnksXG4gICAgfSk7XG4gICAgY29uc3QgbWlkZGxld2FyZXMgPSBbbmV0d29ya01pZGRsZXdhcmVdO1xuICAgIGNvbnN0IG1vY2tTdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKG1pZGRsZXdhcmVzKTtcblxuICAgIGNvbnN0IHN0b3JlID0gbW9ja1N0b3JlKGluaXRpYWxTdGF0ZSk7XG4gICAgY29uc3QgYWN0aW9uID0gZ2V0RmV0Y2hBY3Rpb24oJ1JFRlJFU0hfREFUQScpO1xuXG4gICAgZXhwZWN0KCgpID0+IHN0b3JlLmRpc3BhdGNoKGFjdGlvbikpLnRvVGhyb3coXG4gICAgICAnWW91IHNob3VsZCBwYXNzIGEgcmVnZXggYXMgcmVnZXhBY3Rpb25UeXBlIHBhcmFtJyxcbiAgICApO1xuICB9KTtcblxuICBpdCgnaW52YWxpZCBhY3Rpb25UeXBlcycsICgpID0+IHtcbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICBuZXR3b3JrOiB7XG4gICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgYWN0aW9uUXVldWU6IFtdLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IG5ldHdvcmtNaWRkbGV3YXJlID0gY3JlYXRlTmV0d29ya01pZGRsZXdhcmUoe1xuICAgICAgYWN0aW9uVHlwZXM6ICdSRUZSRVNIJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1pZGRsZXdhcmVzID0gW25ldHdvcmtNaWRkbGV3YXJlXTtcbiAgICBjb25zdCBtb2NrU3RvcmUgPSBjb25maWd1cmVTdG9yZShtaWRkbGV3YXJlcyk7XG5cbiAgICBjb25zdCBzdG9yZSA9IG1vY2tTdG9yZShpbml0aWFsU3RhdGUpO1xuICAgIGNvbnN0IGFjdGlvbiA9IGdldEZldGNoQWN0aW9uKCdSRUZSRVNIX0RBVEEnKTtcblxuICAgIGV4cGVjdCgoKSA9PiBzdG9yZS5kaXNwYXRjaChhY3Rpb24pKS50b1Rocm93KFxuICAgICAgJ1lvdSBzaG91bGQgcGFzcyBhbiBhcnJheSBhcyBhY3Rpb25UeXBlcyBwYXJhbScsXG4gICAgKTtcbiAgfSk7XG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==