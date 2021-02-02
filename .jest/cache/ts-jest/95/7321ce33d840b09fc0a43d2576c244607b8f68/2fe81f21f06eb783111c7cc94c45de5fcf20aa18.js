var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/* @flow */
import { testSaga, } from 'redux-saga-test-plan';
import { Platform, AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import networkSaga, { netInfoChangeSaga, connectionIntervalSaga, createNetInfoConnectionChangeChannel, connectionHandler, checkInternetAccessSaga, handleConnectivityChange, createIntervalChannel, intervalChannelFn, netInfoEventChannelFn, } from '../redux/sagas';
import { connectionChange } from '../redux/actionCreators';
import { networkSelector } from '../redux/createReducer';
import checkInternetAccess from '../utils/checkInternetAccess';
import { DEFAULT_ARGS } from '../utils/constants';
var args = DEFAULT_ARGS;
describe('sagas', function () {
    describe('networkSaga', function () {
        it('forks netInfoChangeSaga with the right params', function () {
            var pingInterval = args.pingInterval, params = __rest(args, ["pingInterval"]);
            var pingInBackground = params.pingInBackground, pingOnlyIfOffline = params.pingOnlyIfOffline, rest = __rest(params, ["pingInBackground", "pingOnlyIfOffline"]);
            testSaga(networkSaga, params)
                .next()
                .fork(netInfoChangeSaga, rest)
                .next()
                .isDone();
        });
        it("forks netInfoChangeSaga AND sets an interval \n    if pingInterval is higher than 0", function () {
            var pingInterval = args.pingInterval, params = __rest(args, ["pingInterval"]);
            var pingInBackground = params.pingInBackground, pingOnlyIfOffline = params.pingOnlyIfOffline, shouldPing = params.shouldPing, rest = __rest(params, ["pingInBackground", "pingOnlyIfOffline", "shouldPing"]);
            testSaga(networkSaga, __assign(__assign({}, args), { pingInterval: 3000 }))
                .next()
                .fork(netInfoChangeSaga, __assign(__assign({}, rest), { shouldPing: shouldPing }))
                .next()
                .fork(connectionIntervalSaga, __assign(__assign({}, rest), { pingInterval: 3000, pingOnlyIfOffline: pingOnlyIfOffline,
                pingInBackground: pingInBackground }))
                .next()
                .isDone();
        });
        it('default parameters', function () {
            var pingOnlyIfOffline = args.pingOnlyIfOffline, pingInterval = args.pingInterval, pingInBackground = args.pingInBackground, params = __rest(args, ["pingOnlyIfOffline", "pingInterval", "pingInBackground"]);
            testSaga(networkSaga)
                .next()
                .fork(netInfoChangeSaga, __assign({}, params))
                .next()
                .isDone();
        });
    });
    describe('netInfoChangeSaga', function () {
        var params = {
            pingTimeout: args.pingTimeout,
            pingServerUrl: args.pingServerUrl,
            shouldPing: args.shouldPing,
            httpMethod: args.httpMethod,
            customHeaders: args.customHeaders,
        };
        function channelLoop(saga) {
            return saga
                .next()
                .call(createNetInfoConnectionChangeChannel, netInfoEventChannelFn)
                .next('channel')
                .take('channel')
                .next(true)
                .fork(connectionHandler, __assign(__assign({}, params), { isConnected: true }))
                .next()
                .take('channel');
        }
        it('iOS', function () {
            Platform.OS = 'ios';
            // @ts-ignore
            var saga = testSaga(netInfoChangeSaga, params);
            channelLoop(saga);
        });
        it('Android', function () {
            Platform.OS = 'android';
            // @ts-ignore
            var saga = testSaga(netInfoChangeSaga, params)
                .next()
                .call([NetInfo, NetInfo.fetch])
                .next({ isConnected: false })
                .fork(connectionHandler, __assign(__assign({}, params), { isConnected: false }));
            channelLoop(saga);
        });
        it('closes the channel when it ends emitting', function () {
            Platform.OS = 'ios';
            var mockCloseFn = jest.fn();
            var mockChannel = {
                close: mockCloseFn,
            };
            var iterator = netInfoChangeSaga(params);
            iterator.next();
            // This will make take(mockChannel) throw an error, since it's not a valid
            // channel or a valid pattern for take() inside the infinite loop,
            // hence executing the finally block.
            iterator.next(mockChannel);
            try {
                iterator.next({ isConnected: true });
                expect(mockCloseFn).toHaveBeenCalled();
                // eslint-disable-next-line
            }
            catch (e) { }
        });
        it('does NOT close the channel if redux-saga does NOT yield a cancelled effect', function () {
            Platform.OS = 'ios';
            var mockCloseFn = jest.fn();
            var mockChannel = {
                close: mockCloseFn,
            };
            var iterator = netInfoChangeSaga(params);
            iterator.next();
            // This will make take(mockChannel) throw an error, since it's not a valid
            // channel or a valid pattern for take() inside the infinite loop,
            // hence executing the finally block.
            iterator.next(mockChannel);
            try {
                iterator.next({ isConnected: false });
                expect(mockCloseFn).not.toHaveBeenCalled();
                // eslint-disable-next-line
            }
            catch (e) { }
        });
    });
    describe('connectionHandler', function () {
        var params = {
            pingTimeout: args.pingTimeout,
            pingServerUrl: args.pingServerUrl,
            shouldPing: true,
            httpMethod: args.httpMethod,
            isConnected: true,
            customHeaders: args.customHeaders,
        };
        it('forks checkInternetAccessSaga if shouldPing AND isConnected are true', function () {
            var saga = testSaga(connectionHandler, params);
            saga
                .next()
                .fork(checkInternetAccessSaga, {
                pingTimeout: args.pingTimeout,
                pingServerUrl: args.pingServerUrl,
                httpMethod: args.httpMethod,
                pingInBackground: args.pingInBackground,
                customHeaders: args.customHeaders,
            })
                .next()
                .isDone();
        });
        it('forks handleConnectivityChange if shouldPing OR isConnected are NOT true', function () {
            params.isConnected = false;
            var saga = testSaga(connectionHandler, params);
            saga
                .next()
                .fork(handleConnectivityChange, false)
                .next()
                .isDone();
        });
    });
    describe('connectionIntervalSaga', function () {
        var shouldPing = args.shouldPing, params = __rest(args, ["shouldPing"]);
        function takeChannelAndGetConnection(saga, isConnected) {
            return saga
                .next()
                .call(createIntervalChannel, 3000, intervalChannelFn)
                .next('channel')
                .take('channel')
                .next()
                .select(networkSelector)
                .next({ isConnected: isConnected });
        }
        it("forks checkInternetAccessSaga if it's NOT connected or it is,\n     but pingOnlyIfOffline is false", function () {
            // @ts-ignore
            var saga = testSaga(connectionIntervalSaga, __assign(__assign({}, params), { pingOnlyIfOffline: false, pingInterval: 3000 }));
            saga = takeChannelAndGetConnection(saga, true);
            saga
                .fork(checkInternetAccessSaga, {
                pingTimeout: params.pingTimeout,
                pingServerUrl: params.pingServerUrl,
                httpMethod: params.httpMethod,
                pingInBackground: params.pingInBackground,
                customHeaders: args.customHeaders,
            })
                .next()
                .take('channel');
        });
        it("does NOT fork checkInternetAccessSaga if it's connected \n    AND pingOnlyIfOffline is true", function () {
            // @ts-ignore
            var saga = testSaga(connectionIntervalSaga, __assign(__assign({}, params), { pingOnlyIfOffline: true, pingInterval: 3000 }));
            saga = takeChannelAndGetConnection(saga, true);
            saga.take('channel');
        });
        it('closes the channel when it ends emitting', function () {
            var mockCloseFn = jest.fn();
            var mockChannel = {
                close: mockCloseFn,
                isConnected: false,
                actionQueue: [],
                isQueuePaused: false,
            };
            var iterator = connectionIntervalSaga(__assign(__assign({}, params), { pingOnlyIfOffline: true, pingInterval: 3000 }));
            iterator.next();
            // This will make take(mockChannel) throw an error, since it's not a valid
            // channel or a valid pattern for take() inside the infinite loop,
            // hence executing the finally block.
            iterator.next(mockChannel);
            try {
                // @ts-ignore
                iterator.next(true);
                expect(mockCloseFn).toHaveBeenCalled();
                // eslint-disable-next-line
            }
            catch (e) { }
        });
        it('does NOT close the channel if redux-saga does NOT yield a cancelled effect', function () {
            var mockCloseFn = jest.fn();
            var mockChannel = {
                close: mockCloseFn,
                isConnected: false,
                actionQueue: [],
                isQueuePaused: false,
            };
            var iterator = connectionIntervalSaga(__assign(__assign({}, params), { pingOnlyIfOffline: true, pingInterval: 3000 }));
            iterator.next();
            // This will make take(mockChannel) throw an error, since it's not a valid
            // channel or a valid pattern for take() inside the infinite loop,
            // hence executing the finally block.
            iterator.next(mockChannel);
            try {
                // @ts-ignore
                iterator.next(false);
                expect(mockCloseFn).not.toHaveBeenCalled();
                // eslint-disable-next-line
            }
            catch (e) { }
        });
    });
    describe('checkInternetAccessSaga', function () {
        var params = {
            pingServerUrl: args.pingServerUrl,
            pingTimeout: args.pingTimeout,
            httpMethod: args.httpMethod,
            pingInBackground: false,
            customHeaders: args.customHeaders,
        };
        it('returns early if pingInBackground is false AND app state is NOT active', function () {
            AppState.currentState = 'inactive';
            var saga = testSaga(checkInternetAccessSaga, params);
            saga.next().isDone();
        });
        it('calls checkInternetAccess AND handleConnectivityChange', function () {
            params.pingInBackground = true;
            var saga = testSaga(checkInternetAccessSaga, params);
            saga
                .next()
                .call(checkInternetAccess, {
                url: params.pingServerUrl,
                timeout: params.pingTimeout,
                method: params.httpMethod,
                customHeaders: params.customHeaders,
            })
                .next(true)
                .call(handleConnectivityChange, true)
                .next()
                .isDone();
        });
    });
    describe('handleConnectivityChange', function () {
        it('dispatches a CONNECTION_CHANGE action if the connection changed ', function () {
            var actionQueue = ['foo', 'bar'];
            // @ts-ignore
            var saga = testSaga(handleConnectivityChange, false);
            saga
                .next()
                .select(networkSelector)
                .next({ actionQueue: actionQueue, isConnected: true })
                .put(connectionChange(false))
                .next()
                .isDone();
        });
        it('does NOT dispatch if connection did NOT change and we are offline', function () {
            var actionQueue = ['foo', 'bar'];
            // @ts-ignore
            var saga = testSaga(handleConnectivityChange, false);
            saga
                .next()
                .select(networkSelector)
                .next({ actionQueue: actionQueue, isConnected: false })
                .isDone();
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9zYWdhcy50ZXN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxXQUFXO0FBQ1gsT0FBTyxFQUNMLFFBQVEsR0FHVCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sT0FBeUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsRUFBRSxFQUNsQixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLG9DQUFvQyxFQUNwQyxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLHdCQUF3QixFQUN4QixxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLHFCQUFxQixHQUN0QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxPQUFPLG1CQUFtQixNQUFNLGtDQUFrQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxJQUFNLElBQUksR0FBRyxZQUFZLENBQUM7QUFFMUIsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNoQixRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3RCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUMxQyxJQUFBLGdDQUFZLEVBQUUsdUNBQVMsQ0FBVTtZQUNqQyxJQUFBLDBDQUFnQixFQUFFLDRDQUFpQixFQUFFLGdFQUFPLENBQVk7WUFDaEUsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7aUJBQzFCLElBQUksRUFBRTtpQkFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDO2lCQUM3QixJQUFJLEVBQUU7aUJBQ04sTUFBTSxFQUFFLENBQUM7UUFD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QUM7WUFDbkMsYUFBYTtZQUNiLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJO2lCQUNELElBQUksRUFBRTtpQkFDTixNQUFNLENBQUMsZUFBZSxDQUFDO2lCQUN2QixJQUFJLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ3pDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3Qvc2FnYXMudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuaW1wb3J0IHtcbiAgdGVzdFNhZ2EsXG4gIFRlc3RBcGksXG4gIFRlc3RBcGlXaXRoRWZmZWN0c1Rlc3RlcnMsXG59IGZyb20gJ3JlZHV4LXNhZ2EtdGVzdC1wbGFuJztcbmltcG9ydCB7IFBsYXRmb3JtLCBBcHBTdGF0ZSB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgTmV0SW5mbywgeyBOZXRJbmZvU3RhdGUgfSBmcm9tICdAcmVhY3QtbmF0aXZlLWNvbW11bml0eS9uZXRpbmZvJztcbmltcG9ydCBuZXR3b3JrU2FnYSwge1xuICBuZXRJbmZvQ2hhbmdlU2FnYSxcbiAgY29ubmVjdGlvbkludGVydmFsU2FnYSxcbiAgY3JlYXRlTmV0SW5mb0Nvbm5lY3Rpb25DaGFuZ2VDaGFubmVsLFxuICBjb25uZWN0aW9uSGFuZGxlcixcbiAgY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EsXG4gIGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSxcbiAgY3JlYXRlSW50ZXJ2YWxDaGFubmVsLFxuICBpbnRlcnZhbENoYW5uZWxGbixcbiAgbmV0SW5mb0V2ZW50Q2hhbm5lbEZuLFxufSBmcm9tICcuLi9zcmMvcmVkdXgvc2FnYXMnO1xuaW1wb3J0IHsgY29ubmVjdGlvbkNoYW5nZSB9IGZyb20gJy4uL3NyYy9yZWR1eC9hY3Rpb25DcmVhdG9ycyc7XG5cbmltcG9ydCB7IG5ldHdvcmtTZWxlY3RvciB9IGZyb20gJy4uL3NyYy9yZWR1eC9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IGNoZWNrSW50ZXJuZXRBY2Nlc3MgZnJvbSAnLi4vc3JjL3V0aWxzL2NoZWNrSW50ZXJuZXRBY2Nlc3MnO1xuaW1wb3J0IHsgREVGQVVMVF9BUkdTIH0gZnJvbSAnLi4vc3JjL3V0aWxzL2NvbnN0YW50cyc7XG5cbmNvbnN0IGFyZ3MgPSBERUZBVUxUX0FSR1M7XG5cbmRlc2NyaWJlKCdzYWdhcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ25ldHdvcmtTYWdhJywgKCkgPT4ge1xuICAgIGl0KCdmb3JrcyBuZXRJbmZvQ2hhbmdlU2FnYSB3aXRoIHRoZSByaWdodCBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHBpbmdJbnRlcnZhbCwgLi4ucGFyYW1zIH0gPSBhcmdzO1xuICAgICAgY29uc3QgeyBwaW5nSW5CYWNrZ3JvdW5kLCBwaW5nT25seUlmT2ZmbGluZSwgLi4ucmVzdCB9ID0gcGFyYW1zO1xuICAgICAgdGVzdFNhZ2EobmV0d29ya1NhZ2EsIHBhcmFtcylcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuZm9yayhuZXRJbmZvQ2hhbmdlU2FnYSwgcmVzdClcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuaXNEb25lKCk7XG4gICAgfSk7XG5cbiAgICBpdChgZm9ya3MgbmV0SW5mb0NoYW5nZVNhZ2EgQU5EIHNldHMgYW4gaW50ZXJ2YWwgXG4gICAgaWYgcGluZ0ludGVydmFsIGlzIGhpZ2hlciB0aGFuIDBgLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHBpbmdJbnRlcnZhbCwgLi4ucGFyYW1zIH0gPSBhcmdzO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwaW5nSW5CYWNrZ3JvdW5kLFxuICAgICAgICBwaW5nT25seUlmT2ZmbGluZSxcbiAgICAgICAgc2hvdWxkUGluZyxcbiAgICAgICAgLi4ucmVzdFxuICAgICAgfSA9IHBhcmFtcztcbiAgICAgIHRlc3RTYWdhKG5ldHdvcmtTYWdhLCB7IC4uLmFyZ3MsIHBpbmdJbnRlcnZhbDogMzAwMCB9KVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5mb3JrKG5ldEluZm9DaGFuZ2VTYWdhLCB7IC4uLnJlc3QsIHNob3VsZFBpbmcgfSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuZm9yayhjb25uZWN0aW9uSW50ZXJ2YWxTYWdhLCB7XG4gICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICBwaW5nSW50ZXJ2YWw6IDMwMDAsXG4gICAgICAgICAgcGluZ09ubHlJZk9mZmxpbmUsXG4gICAgICAgICAgcGluZ0luQmFja2dyb3VuZCxcbiAgICAgICAgfSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuaXNEb25lKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVmYXVsdCBwYXJhbWV0ZXJzJywgKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwaW5nT25seUlmT2ZmbGluZSxcbiAgICAgICAgcGluZ0ludGVydmFsLFxuICAgICAgICBwaW5nSW5CYWNrZ3JvdW5kLFxuICAgICAgICAuLi5wYXJhbXNcbiAgICAgIH0gPSBhcmdzO1xuICAgICAgdGVzdFNhZ2EobmV0d29ya1NhZ2EpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmZvcmsobmV0SW5mb0NoYW5nZVNhZ2EsIHsgLi4ucGFyYW1zIH0pXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnbmV0SW5mb0NoYW5nZVNhZ2EnLCAoKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgcGluZ1RpbWVvdXQ6IGFyZ3MucGluZ1RpbWVvdXQsXG4gICAgICBwaW5nU2VydmVyVXJsOiBhcmdzLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICBzaG91bGRQaW5nOiBhcmdzLnNob3VsZFBpbmcsXG4gICAgICBodHRwTWV0aG9kOiBhcmdzLmh0dHBNZXRob2QsXG4gICAgICBjdXN0b21IZWFkZXJzOiBhcmdzLmN1c3RvbUhlYWRlcnMsXG4gICAgfTtcbiAgICBmdW5jdGlvbiBjaGFubmVsTG9vcChzYWdhOiBUZXN0QXBpKSB7XG4gICAgICByZXR1cm4gc2FnYVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5jYWxsKGNyZWF0ZU5ldEluZm9Db25uZWN0aW9uQ2hhbmdlQ2hhbm5lbCwgbmV0SW5mb0V2ZW50Q2hhbm5lbEZuKVxuICAgICAgICAubmV4dCgnY2hhbm5lbCcpXG4gICAgICAgIC50YWtlKCdjaGFubmVsJylcbiAgICAgICAgLm5leHQodHJ1ZSlcbiAgICAgICAgLmZvcmsoY29ubmVjdGlvbkhhbmRsZXIsIHtcbiAgICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLnRha2UoJ2NoYW5uZWwnKTtcbiAgICB9XG4gICAgaXQoJ2lPUycsICgpID0+IHtcbiAgICAgIFBsYXRmb3JtLk9TID0gJ2lvcyc7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBzYWdhID0gdGVzdFNhZ2EobmV0SW5mb0NoYW5nZVNhZ2EsIHBhcmFtcyk7XG4gICAgICBjaGFubmVsTG9vcChzYWdhKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbmRyb2lkJywgKCkgPT4ge1xuICAgICAgUGxhdGZvcm0uT1MgPSAnYW5kcm9pZCc7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBzYWdhID0gdGVzdFNhZ2EobmV0SW5mb0NoYW5nZVNhZ2EsIHBhcmFtcylcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuY2FsbChbTmV0SW5mbywgTmV0SW5mby5mZXRjaF0pXG4gICAgICAgIC5uZXh0KHsgaXNDb25uZWN0ZWQ6IGZhbHNlIH0pXG4gICAgICAgIC5mb3JrKGNvbm5lY3Rpb25IYW5kbGVyLCB7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICBjaGFubmVsTG9vcChzYWdhKTtcbiAgICB9KTtcblxuICAgIGl0KCdjbG9zZXMgdGhlIGNoYW5uZWwgd2hlbiBpdCBlbmRzIGVtaXR0aW5nJywgKCkgPT4ge1xuICAgICAgUGxhdGZvcm0uT1MgPSAnaW9zJztcbiAgICAgIGNvbnN0IG1vY2tDbG9zZUZuID0gamVzdC5mbigpO1xuICAgICAgY29uc3QgbW9ja0NoYW5uZWwgPSB7XG4gICAgICAgIGNsb3NlOiBtb2NrQ2xvc2VGbixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGl0ZXJhdG9yID0gbmV0SW5mb0NoYW5nZVNhZ2EocGFyYW1zKTtcbiAgICAgIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIC8vIFRoaXMgd2lsbCBtYWtlIHRha2UobW9ja0NoYW5uZWwpIHRocm93IGFuIGVycm9yLCBzaW5jZSBpdCdzIG5vdCBhIHZhbGlkXG4gICAgICAvLyBjaGFubmVsIG9yIGEgdmFsaWQgcGF0dGVybiBmb3IgdGFrZSgpIGluc2lkZSB0aGUgaW5maW5pdGUgbG9vcCxcbiAgICAgIC8vIGhlbmNlIGV4ZWN1dGluZyB0aGUgZmluYWxseSBibG9jay5cbiAgICAgIGl0ZXJhdG9yLm5leHQoKG1vY2tDaGFubmVsIGFzIHVua25vd24pIGFzIE5ldEluZm9TdGF0ZSk7XG4gICAgICB0cnkge1xuICAgICAgICBpdGVyYXRvci5uZXh0KHsgaXNDb25uZWN0ZWQ6IHRydWUgfSBhcyBOZXRJbmZvU3RhdGUpO1xuICAgICAgICBleHBlY3QobW9ja0Nsb3NlRm4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgTk9UIGNsb3NlIHRoZSBjaGFubmVsIGlmIHJlZHV4LXNhZ2EgZG9lcyBOT1QgeWllbGQgYSBjYW5jZWxsZWQgZWZmZWN0JywgKCkgPT4ge1xuICAgICAgUGxhdGZvcm0uT1MgPSAnaW9zJztcbiAgICAgIGNvbnN0IG1vY2tDbG9zZUZuID0gamVzdC5mbigpO1xuICAgICAgY29uc3QgbW9ja0NoYW5uZWwgPSB7XG4gICAgICAgIGNsb3NlOiBtb2NrQ2xvc2VGbixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGl0ZXJhdG9yID0gbmV0SW5mb0NoYW5nZVNhZ2EocGFyYW1zKTtcbiAgICAgIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIC8vIFRoaXMgd2lsbCBtYWtlIHRha2UobW9ja0NoYW5uZWwpIHRocm93IGFuIGVycm9yLCBzaW5jZSBpdCdzIG5vdCBhIHZhbGlkXG4gICAgICAvLyBjaGFubmVsIG9yIGEgdmFsaWQgcGF0dGVybiBmb3IgdGFrZSgpIGluc2lkZSB0aGUgaW5maW5pdGUgbG9vcCxcbiAgICAgIC8vIGhlbmNlIGV4ZWN1dGluZyB0aGUgZmluYWxseSBibG9jay5cbiAgICAgIGl0ZXJhdG9yLm5leHQoKG1vY2tDaGFubmVsIGFzIHVua25vd24pIGFzIE5ldEluZm9TdGF0ZSk7XG4gICAgICB0cnkge1xuICAgICAgICBpdGVyYXRvci5uZXh0KHsgaXNDb25uZWN0ZWQ6IGZhbHNlIH0gYXMgTmV0SW5mb1N0YXRlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tDbG9zZUZuKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjb25uZWN0aW9uSGFuZGxlcicsICgpID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBwaW5nVGltZW91dDogYXJncy5waW5nVGltZW91dCxcbiAgICAgIHBpbmdTZXJ2ZXJVcmw6IGFyZ3MucGluZ1NlcnZlclVybCxcbiAgICAgIHNob3VsZFBpbmc6IHRydWUsXG4gICAgICBodHRwTWV0aG9kOiBhcmdzLmh0dHBNZXRob2QsXG4gICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICAgIGN1c3RvbUhlYWRlcnM6IGFyZ3MuY3VzdG9tSGVhZGVycyxcbiAgICB9O1xuICAgIGl0KCdmb3JrcyBjaGVja0ludGVybmV0QWNjZXNzU2FnYSBpZiBzaG91bGRQaW5nIEFORCBpc0Nvbm5lY3RlZCBhcmUgdHJ1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHNhZ2EgPSB0ZXN0U2FnYShjb25uZWN0aW9uSGFuZGxlciwgcGFyYW1zKTtcbiAgICAgIHNhZ2FcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuZm9yayhjaGVja0ludGVybmV0QWNjZXNzU2FnYSwge1xuICAgICAgICAgIHBpbmdUaW1lb3V0OiBhcmdzLnBpbmdUaW1lb3V0LFxuICAgICAgICAgIHBpbmdTZXJ2ZXJVcmw6IGFyZ3MucGluZ1NlcnZlclVybCxcbiAgICAgICAgICBodHRwTWV0aG9kOiBhcmdzLmh0dHBNZXRob2QsXG4gICAgICAgICAgcGluZ0luQmFja2dyb3VuZDogYXJncy5waW5nSW5CYWNrZ3JvdW5kLFxuICAgICAgICAgIGN1c3RvbUhlYWRlcnM6IGFyZ3MuY3VzdG9tSGVhZGVycyxcbiAgICAgICAgfSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuaXNEb25lKCk7XG4gICAgfSk7XG4gICAgaXQoJ2ZvcmtzIGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSBpZiBzaG91bGRQaW5nIE9SIGlzQ29ubmVjdGVkIGFyZSBOT1QgdHJ1ZScsICgpID0+IHtcbiAgICAgIHBhcmFtcy5pc0Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKGNvbm5lY3Rpb25IYW5kbGVyLCBwYXJhbXMpO1xuICAgICAgc2FnYVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5mb3JrKGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSwgZmFsc2UpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29ubmVjdGlvbkludGVydmFsU2FnYScsICgpID0+IHtcbiAgICBjb25zdCB7IHNob3VsZFBpbmcsIC4uLnBhcmFtcyB9ID0gYXJncztcbiAgICBmdW5jdGlvbiB0YWtlQ2hhbm5lbEFuZEdldENvbm5lY3Rpb24oc2FnYTogVGVzdEFwaSwgaXNDb25uZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgIHJldHVybiBzYWdhXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmNhbGwoY3JlYXRlSW50ZXJ2YWxDaGFubmVsLCAzMDAwLCBpbnRlcnZhbENoYW5uZWxGbilcbiAgICAgICAgLm5leHQoJ2NoYW5uZWwnKVxuICAgICAgICAudGFrZSgnY2hhbm5lbCcpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLnNlbGVjdChuZXR3b3JrU2VsZWN0b3IpXG4gICAgICAgIC5uZXh0KHsgaXNDb25uZWN0ZWQgfSk7XG4gICAgfVxuICAgIGl0KGBmb3JrcyBjaGVja0ludGVybmV0QWNjZXNzU2FnYSBpZiBpdCdzIE5PVCBjb25uZWN0ZWQgb3IgaXQgaXMsXG4gICAgIGJ1dCBwaW5nT25seUlmT2ZmbGluZSBpcyBmYWxzZWAsICgpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxldCBzYWdhOiBUZXN0QXBpV2l0aEVmZmVjdHNUZXN0ZXJzID0gdGVzdFNhZ2EoY29ubmVjdGlvbkludGVydmFsU2FnYSwge1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIHBpbmdPbmx5SWZPZmZsaW5lOiBmYWxzZSxcbiAgICAgICAgcGluZ0ludGVydmFsOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICBzYWdhID0gdGFrZUNoYW5uZWxBbmRHZXRDb25uZWN0aW9uKHNhZ2EsIHRydWUpO1xuICAgICAgc2FnYVxuICAgICAgICAuZm9yayhjaGVja0ludGVybmV0QWNjZXNzU2FnYSwge1xuICAgICAgICAgIHBpbmdUaW1lb3V0OiBwYXJhbXMucGluZ1RpbWVvdXQsXG4gICAgICAgICAgcGluZ1NlcnZlclVybDogcGFyYW1zLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICAgICAgaHR0cE1ldGhvZDogcGFyYW1zLmh0dHBNZXRob2QsXG4gICAgICAgICAgcGluZ0luQmFja2dyb3VuZDogcGFyYW1zLnBpbmdJbkJhY2tncm91bmQsXG4gICAgICAgICAgY3VzdG9tSGVhZGVyczogYXJncy5jdXN0b21IZWFkZXJzLFxuICAgICAgICB9KVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC50YWtlKCdjaGFubmVsJyk7XG4gICAgfSk7XG5cbiAgICBpdChgZG9lcyBOT1QgZm9yayBjaGVja0ludGVybmV0QWNjZXNzU2FnYSBpZiBpdCdzIGNvbm5lY3RlZCBcbiAgICBBTkQgcGluZ09ubHlJZk9mZmxpbmUgaXMgdHJ1ZWAsICgpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGxldCBzYWdhOiBUZXN0QXBpV2l0aEVmZmVjdHNUZXN0ZXJzID0gdGVzdFNhZ2EoY29ubmVjdGlvbkludGVydmFsU2FnYSwge1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIHBpbmdPbmx5SWZPZmZsaW5lOiB0cnVlLFxuICAgICAgICBwaW5nSW50ZXJ2YWw6IDMwMDAsXG4gICAgICB9KTtcbiAgICAgIHNhZ2EgPSB0YWtlQ2hhbm5lbEFuZEdldENvbm5lY3Rpb24oc2FnYSwgdHJ1ZSk7XG4gICAgICBzYWdhLnRha2UoJ2NoYW5uZWwnKTtcbiAgICB9KTtcblxuICAgIGl0KCdjbG9zZXMgdGhlIGNoYW5uZWwgd2hlbiBpdCBlbmRzIGVtaXR0aW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgbW9ja0Nsb3NlRm4gPSBqZXN0LmZuKCk7XG4gICAgICBjb25zdCBtb2NrQ2hhbm5lbCA9IHtcbiAgICAgICAgY2xvc2U6IG1vY2tDbG9zZUZuLFxuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgICAgaXNRdWV1ZVBhdXNlZDogZmFsc2UsXG4gICAgICB9O1xuICAgICAgY29uc3QgaXRlcmF0b3IgPSBjb25uZWN0aW9uSW50ZXJ2YWxTYWdhKHtcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICBwaW5nT25seUlmT2ZmbGluZTogdHJ1ZSxcbiAgICAgICAgcGluZ0ludGVydmFsOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAvLyBUaGlzIHdpbGwgbWFrZSB0YWtlKG1vY2tDaGFubmVsKSB0aHJvdyBhbiBlcnJvciwgc2luY2UgaXQncyBub3QgYSB2YWxpZFxuICAgICAgLy8gY2hhbm5lbCBvciBhIHZhbGlkIHBhdHRlcm4gZm9yIHRha2UoKSBpbnNpZGUgdGhlIGluZmluaXRlIGxvb3AsXG4gICAgICAvLyBoZW5jZSBleGVjdXRpbmcgdGhlIGZpbmFsbHkgYmxvY2suXG4gICAgICBpdGVyYXRvci5uZXh0KG1vY2tDaGFubmVsKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaXRlcmF0b3IubmV4dCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tDbG9zZUZuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIE5PVCBjbG9zZSB0aGUgY2hhbm5lbCBpZiByZWR1eC1zYWdhIGRvZXMgTk9UIHlpZWxkIGEgY2FuY2VsbGVkIGVmZmVjdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vY2tDbG9zZUZuID0gamVzdC5mbigpO1xuICAgICAgY29uc3QgbW9ja0NoYW5uZWwgPSB7XG4gICAgICAgIGNsb3NlOiBtb2NrQ2xvc2VGbixcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogW10sXG4gICAgICAgIGlzUXVldWVQYXVzZWQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGl0ZXJhdG9yID0gY29ubmVjdGlvbkludGVydmFsU2FnYSh7XG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgcGluZ09ubHlJZk9mZmxpbmU6IHRydWUsXG4gICAgICAgIHBpbmdJbnRlcnZhbDogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgLy8gVGhpcyB3aWxsIG1ha2UgdGFrZShtb2NrQ2hhbm5lbCkgdGhyb3cgYW4gZXJyb3IsIHNpbmNlIGl0J3Mgbm90IGEgdmFsaWRcbiAgICAgIC8vIGNoYW5uZWwgb3IgYSB2YWxpZCBwYXR0ZXJuIGZvciB0YWtlKCkgaW5zaWRlIHRoZSBpbmZpbml0ZSBsb29wLFxuICAgICAgLy8gaGVuY2UgZXhlY3V0aW5nIHRoZSBmaW5hbGx5IGJsb2NrLlxuICAgICAgaXRlcmF0b3IubmV4dChtb2NrQ2hhbm5lbCk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGl0ZXJhdG9yLm5leHQoZmFsc2UpO1xuICAgICAgICBleHBlY3QobW9ja0Nsb3NlRm4pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NoZWNrSW50ZXJuZXRBY2Nlc3NTYWdhJywgKCkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHBpbmdTZXJ2ZXJVcmw6IGFyZ3MucGluZ1NlcnZlclVybCxcbiAgICAgIHBpbmdUaW1lb3V0OiBhcmdzLnBpbmdUaW1lb3V0LFxuICAgICAgaHR0cE1ldGhvZDogYXJncy5odHRwTWV0aG9kLFxuICAgICAgcGluZ0luQmFja2dyb3VuZDogZmFsc2UsXG4gICAgICBjdXN0b21IZWFkZXJzOiBhcmdzLmN1c3RvbUhlYWRlcnMsXG4gICAgfTtcbiAgICBpdCgncmV0dXJucyBlYXJseSBpZiBwaW5nSW5CYWNrZ3JvdW5kIGlzIGZhbHNlIEFORCBhcHAgc3RhdGUgaXMgTk9UIGFjdGl2ZScsICgpID0+IHtcbiAgICAgIEFwcFN0YXRlLmN1cnJlbnRTdGF0ZSA9ICdpbmFjdGl2ZSc7XG4gICAgICBjb25zdCBzYWdhID0gdGVzdFNhZ2EoY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EsIHBhcmFtcyk7XG4gICAgICBzYWdhLm5leHQoKS5pc0RvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyBjaGVja0ludGVybmV0QWNjZXNzIEFORCBoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBwYXJhbXMucGluZ0luQmFja2dyb3VuZCA9IHRydWU7XG4gICAgICBjb25zdCBzYWdhID0gdGVzdFNhZ2EoY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EsIHBhcmFtcyk7XG4gICAgICBzYWdhXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmNhbGwoY2hlY2tJbnRlcm5ldEFjY2Vzcywge1xuICAgICAgICAgIHVybDogcGFyYW1zLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICAgICAgdGltZW91dDogcGFyYW1zLnBpbmdUaW1lb3V0LFxuICAgICAgICAgIG1ldGhvZDogcGFyYW1zLmh0dHBNZXRob2QsXG4gICAgICAgICAgY3VzdG9tSGVhZGVyczogcGFyYW1zLmN1c3RvbUhlYWRlcnMsXG4gICAgICAgIH0pXG4gICAgICAgIC5uZXh0KHRydWUpXG4gICAgICAgIC5jYWxsKGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSwgdHJ1ZSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuaXNEb25lKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UnLCAoKSA9PiB7XG4gICAgaXQoJ2Rpc3BhdGNoZXMgYSBDT05ORUNUSU9OX0NIQU5HRSBhY3Rpb24gaWYgdGhlIGNvbm5lY3Rpb24gY2hhbmdlZCAnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb25RdWV1ZSA9IFsnZm9vJywgJ2JhciddO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSwgZmFsc2UpO1xuICAgICAgc2FnYVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5zZWxlY3QobmV0d29ya1NlbGVjdG9yKVxuICAgICAgICAubmV4dCh7IGFjdGlvblF1ZXVlLCBpc0Nvbm5lY3RlZDogdHJ1ZSB9KVxuICAgICAgICAucHV0KGNvbm5lY3Rpb25DaGFuZ2UoZmFsc2UpKVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5pc0RvbmUoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIE5PVCBkaXNwYXRjaCBpZiBjb25uZWN0aW9uIGRpZCBOT1QgY2hhbmdlIGFuZCB3ZSBhcmUgb2ZmbGluZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvblF1ZXVlID0gWydmb28nLCAnYmFyJ107XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBzYWdhID0gdGVzdFNhZ2EoaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlLCBmYWxzZSk7XG4gICAgICBzYWdhXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLnNlbGVjdChuZXR3b3JrU2VsZWN0b3IpXG4gICAgICAgIC5uZXh0KHsgYWN0aW9uUXVldWUsIGlzQ29ubmVjdGVkOiBmYWxzZSB9KVxuICAgICAgICAuaXNEb25lKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=