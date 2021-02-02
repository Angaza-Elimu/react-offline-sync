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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9zYWdhcy50ZXN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxXQUFXO0FBQ1gsT0FBTyxFQUNMLFFBQVEsR0FHVCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sT0FBeUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsRUFBRSxFQUNsQixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLG9DQUFvQyxFQUNwQyxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLHdCQUF3QixFQUN4QixxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLHFCQUFxQixHQUN0QixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxPQUFPLG1CQUFtQixNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxJQUFNLElBQUksR0FBRyxZQUFZLENBQUM7QUFFMUIsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNoQixRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3RCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUMxQyxJQUFBLGdDQUFZLEVBQUUsdUNBQVMsQ0FBVTtZQUNqQyxJQUFBLDBDQUFnQixFQUFFLDRDQUFpQixFQUFFLGdFQUFPLENBQVk7WUFDaEUsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7aUJBQzFCLElBQUksRUFBRTtpQkFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDO2lCQUM3QixJQUFJLEVBQUU7aUJBQ04sTUFBTSxFQUFFLENBQUM7UUFD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QUM7WUFDbkMsYUFBYTtZQUNiLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJO2lCQUNELElBQUksRUFBRTtpQkFDTixNQUFNLENBQUMsZUFBZSxDQUFDO2lCQUN2QixJQUFJLENBQUMsRUFBRSxXQUFXLGFBQUEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7aUJBQ3pDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3Qvc2FnYXMudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuaW1wb3J0IHtcbiAgdGVzdFNhZ2EsXG4gIFRlc3RBcGksXG4gIFRlc3RBcGlXaXRoRWZmZWN0c1Rlc3RlcnMsXG59IGZyb20gJ3JlZHV4LXNhZ2EtdGVzdC1wbGFuJztcbmltcG9ydCB7IFBsYXRmb3JtLCBBcHBTdGF0ZSB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgTmV0SW5mbywgeyBOZXRJbmZvU3RhdGUgfSBmcm9tICdAcmVhY3QtbmF0aXZlLWNvbW11bml0eS9uZXRpbmZvJztcbmltcG9ydCBuZXR3b3JrU2FnYSwge1xuICBuZXRJbmZvQ2hhbmdlU2FnYSxcbiAgY29ubmVjdGlvbkludGVydmFsU2FnYSxcbiAgY3JlYXRlTmV0SW5mb0Nvbm5lY3Rpb25DaGFuZ2VDaGFubmVsLFxuICBjb25uZWN0aW9uSGFuZGxlcixcbiAgY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EsXG4gIGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSxcbiAgY3JlYXRlSW50ZXJ2YWxDaGFubmVsLFxuICBpbnRlcnZhbENoYW5uZWxGbixcbiAgbmV0SW5mb0V2ZW50Q2hhbm5lbEZuLFxufSBmcm9tICcuLi9yZWR1eC9zYWdhcyc7XG5pbXBvcnQgeyBjb25uZWN0aW9uQ2hhbmdlIH0gZnJvbSAnLi4vcmVkdXgvYWN0aW9uQ3JlYXRvcnMnO1xuXG5pbXBvcnQgeyBuZXR3b3JrU2VsZWN0b3IgfSBmcm9tICcuLi9yZWR1eC9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IGNoZWNrSW50ZXJuZXRBY2Nlc3MgZnJvbSAnLi4vdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcyc7XG5pbXBvcnQgeyBERUZBVUxUX0FSR1MgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5jb25zdCBhcmdzID0gREVGQVVMVF9BUkdTO1xuXG5kZXNjcmliZSgnc2FnYXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCduZXR3b3JrU2FnYScsICgpID0+IHtcbiAgICBpdCgnZm9ya3MgbmV0SW5mb0NoYW5nZVNhZ2Egd2l0aCB0aGUgcmlnaHQgcGFyYW1zJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBwaW5nSW50ZXJ2YWwsIC4uLnBhcmFtcyB9ID0gYXJncztcbiAgICAgIGNvbnN0IHsgcGluZ0luQmFja2dyb3VuZCwgcGluZ09ubHlJZk9mZmxpbmUsIC4uLnJlc3QgfSA9IHBhcmFtcztcbiAgICAgIHRlc3RTYWdhKG5ldHdvcmtTYWdhLCBwYXJhbXMpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmZvcmsobmV0SW5mb0NoYW5nZVNhZ2EsIHJlc3QpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoYGZvcmtzIG5ldEluZm9DaGFuZ2VTYWdhIEFORCBzZXRzIGFuIGludGVydmFsIFxuICAgIGlmIHBpbmdJbnRlcnZhbCBpcyBoaWdoZXIgdGhhbiAwYCwgKCkgPT4ge1xuICAgICAgY29uc3QgeyBwaW5nSW50ZXJ2YWwsIC4uLnBhcmFtcyB9ID0gYXJncztcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGluZ0luQmFja2dyb3VuZCxcbiAgICAgICAgcGluZ09ubHlJZk9mZmxpbmUsXG4gICAgICAgIHNob3VsZFBpbmcsXG4gICAgICAgIC4uLnJlc3RcbiAgICAgIH0gPSBwYXJhbXM7XG4gICAgICB0ZXN0U2FnYShuZXR3b3JrU2FnYSwgeyAuLi5hcmdzLCBwaW5nSW50ZXJ2YWw6IDMwMDAgfSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuZm9yayhuZXRJbmZvQ2hhbmdlU2FnYSwgeyAuLi5yZXN0LCBzaG91bGRQaW5nIH0pXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmZvcmsoY29ubmVjdGlvbkludGVydmFsU2FnYSwge1xuICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgcGluZ0ludGVydmFsOiAzMDAwLFxuICAgICAgICAgIHBpbmdPbmx5SWZPZmZsaW5lLFxuICAgICAgICAgIHBpbmdJbkJhY2tncm91bmQsXG4gICAgICAgIH0pXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RlZmF1bHQgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGluZ09ubHlJZk9mZmxpbmUsXG4gICAgICAgIHBpbmdJbnRlcnZhbCxcbiAgICAgICAgcGluZ0luQmFja2dyb3VuZCxcbiAgICAgICAgLi4ucGFyYW1zXG4gICAgICB9ID0gYXJncztcbiAgICAgIHRlc3RTYWdhKG5ldHdvcmtTYWdhKVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5mb3JrKG5ldEluZm9DaGFuZ2VTYWdhLCB7IC4uLnBhcmFtcyB9KVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5pc0RvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ25ldEluZm9DaGFuZ2VTYWdhJywgKCkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHBpbmdUaW1lb3V0OiBhcmdzLnBpbmdUaW1lb3V0LFxuICAgICAgcGluZ1NlcnZlclVybDogYXJncy5waW5nU2VydmVyVXJsLFxuICAgICAgc2hvdWxkUGluZzogYXJncy5zaG91bGRQaW5nLFxuICAgICAgaHR0cE1ldGhvZDogYXJncy5odHRwTWV0aG9kLFxuICAgICAgY3VzdG9tSGVhZGVyczogYXJncy5jdXN0b21IZWFkZXJzLFxuICAgIH07XG4gICAgZnVuY3Rpb24gY2hhbm5lbExvb3Aoc2FnYTogVGVzdEFwaSkge1xuICAgICAgcmV0dXJuIHNhZ2FcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuY2FsbChjcmVhdGVOZXRJbmZvQ29ubmVjdGlvbkNoYW5nZUNoYW5uZWwsIG5ldEluZm9FdmVudENoYW5uZWxGbilcbiAgICAgICAgLm5leHQoJ2NoYW5uZWwnKVxuICAgICAgICAudGFrZSgnY2hhbm5lbCcpXG4gICAgICAgIC5uZXh0KHRydWUpXG4gICAgICAgIC5mb3JrKGNvbm5lY3Rpb25IYW5kbGVyLCB7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIGlzQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC50YWtlKCdjaGFubmVsJyk7XG4gICAgfVxuICAgIGl0KCdpT1MnLCAoKSA9PiB7XG4gICAgICBQbGF0Zm9ybS5PUyA9ICdpb3MnO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKG5ldEluZm9DaGFuZ2VTYWdhLCBwYXJhbXMpO1xuICAgICAgY2hhbm5lbExvb3Aoc2FnYSk7XG4gICAgfSk7XG5cbiAgICBpdCgnQW5kcm9pZCcsICgpID0+IHtcbiAgICAgIFBsYXRmb3JtLk9TID0gJ2FuZHJvaWQnO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKG5ldEluZm9DaGFuZ2VTYWdhLCBwYXJhbXMpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmNhbGwoW05ldEluZm8sIE5ldEluZm8uZmV0Y2hdKVxuICAgICAgICAubmV4dCh7IGlzQ29ubmVjdGVkOiBmYWxzZSB9KVxuICAgICAgICAuZm9yayhjb25uZWN0aW9uSGFuZGxlciwge1xuICAgICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgY2hhbm5lbExvb3Aoc2FnYSk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xvc2VzIHRoZSBjaGFubmVsIHdoZW4gaXQgZW5kcyBlbWl0dGluZycsICgpID0+IHtcbiAgICAgIFBsYXRmb3JtLk9TID0gJ2lvcyc7XG4gICAgICBjb25zdCBtb2NrQ2xvc2VGbiA9IGplc3QuZm4oKTtcbiAgICAgIGNvbnN0IG1vY2tDaGFubmVsID0ge1xuICAgICAgICBjbG9zZTogbW9ja0Nsb3NlRm4sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpdGVyYXRvciA9IG5ldEluZm9DaGFuZ2VTYWdhKHBhcmFtcyk7XG4gICAgICBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAvLyBUaGlzIHdpbGwgbWFrZSB0YWtlKG1vY2tDaGFubmVsKSB0aHJvdyBhbiBlcnJvciwgc2luY2UgaXQncyBub3QgYSB2YWxpZFxuICAgICAgLy8gY2hhbm5lbCBvciBhIHZhbGlkIHBhdHRlcm4gZm9yIHRha2UoKSBpbnNpZGUgdGhlIGluZmluaXRlIGxvb3AsXG4gICAgICAvLyBoZW5jZSBleGVjdXRpbmcgdGhlIGZpbmFsbHkgYmxvY2suXG4gICAgICBpdGVyYXRvci5uZXh0KChtb2NrQ2hhbm5lbCBhcyB1bmtub3duKSBhcyBOZXRJbmZvU3RhdGUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaXRlcmF0b3IubmV4dCh7IGlzQ29ubmVjdGVkOiB0cnVlIH0gYXMgTmV0SW5mb1N0YXRlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tDbG9zZUZuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIE5PVCBjbG9zZSB0aGUgY2hhbm5lbCBpZiByZWR1eC1zYWdhIGRvZXMgTk9UIHlpZWxkIGEgY2FuY2VsbGVkIGVmZmVjdCcsICgpID0+IHtcbiAgICAgIFBsYXRmb3JtLk9TID0gJ2lvcyc7XG4gICAgICBjb25zdCBtb2NrQ2xvc2VGbiA9IGplc3QuZm4oKTtcbiAgICAgIGNvbnN0IG1vY2tDaGFubmVsID0ge1xuICAgICAgICBjbG9zZTogbW9ja0Nsb3NlRm4sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpdGVyYXRvciA9IG5ldEluZm9DaGFuZ2VTYWdhKHBhcmFtcyk7XG4gICAgICBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAvLyBUaGlzIHdpbGwgbWFrZSB0YWtlKG1vY2tDaGFubmVsKSB0aHJvdyBhbiBlcnJvciwgc2luY2UgaXQncyBub3QgYSB2YWxpZFxuICAgICAgLy8gY2hhbm5lbCBvciBhIHZhbGlkIHBhdHRlcm4gZm9yIHRha2UoKSBpbnNpZGUgdGhlIGluZmluaXRlIGxvb3AsXG4gICAgICAvLyBoZW5jZSBleGVjdXRpbmcgdGhlIGZpbmFsbHkgYmxvY2suXG4gICAgICBpdGVyYXRvci5uZXh0KChtb2NrQ2hhbm5lbCBhcyB1bmtub3duKSBhcyBOZXRJbmZvU3RhdGUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaXRlcmF0b3IubmV4dCh7IGlzQ29ubmVjdGVkOiBmYWxzZSB9IGFzIE5ldEluZm9TdGF0ZSk7XG4gICAgICAgIGV4cGVjdChtb2NrQ2xvc2VGbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29ubmVjdGlvbkhhbmRsZXInLCAoKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgcGluZ1RpbWVvdXQ6IGFyZ3MucGluZ1RpbWVvdXQsXG4gICAgICBwaW5nU2VydmVyVXJsOiBhcmdzLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICBzaG91bGRQaW5nOiB0cnVlLFxuICAgICAgaHR0cE1ldGhvZDogYXJncy5odHRwTWV0aG9kLFxuICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICBjdXN0b21IZWFkZXJzOiBhcmdzLmN1c3RvbUhlYWRlcnMsXG4gICAgfTtcbiAgICBpdCgnZm9ya3MgY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EgaWYgc2hvdWxkUGluZyBBTkQgaXNDb25uZWN0ZWQgYXJlIHRydWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzYWdhID0gdGVzdFNhZ2EoY29ubmVjdGlvbkhhbmRsZXIsIHBhcmFtcyk7XG4gICAgICBzYWdhXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmZvcmsoY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EsIHtcbiAgICAgICAgICBwaW5nVGltZW91dDogYXJncy5waW5nVGltZW91dCxcbiAgICAgICAgICBwaW5nU2VydmVyVXJsOiBhcmdzLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICAgICAgaHR0cE1ldGhvZDogYXJncy5odHRwTWV0aG9kLFxuICAgICAgICAgIHBpbmdJbkJhY2tncm91bmQ6IGFyZ3MucGluZ0luQmFja2dyb3VuZCxcbiAgICAgICAgICBjdXN0b21IZWFkZXJzOiBhcmdzLmN1c3RvbUhlYWRlcnMsXG4gICAgICAgIH0pXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuICAgIGl0KCdmb3JrcyBoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgaWYgc2hvdWxkUGluZyBPUiBpc0Nvbm5lY3RlZCBhcmUgTk9UIHRydWUnLCAoKSA9PiB7XG4gICAgICBwYXJhbXMuaXNDb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHNhZ2EgPSB0ZXN0U2FnYShjb25uZWN0aW9uSGFuZGxlciwgcGFyYW1zKTtcbiAgICAgIHNhZ2FcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuZm9yayhoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UsIGZhbHNlKVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5pc0RvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2Nvbm5lY3Rpb25JbnRlcnZhbFNhZ2EnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBzaG91bGRQaW5nLCAuLi5wYXJhbXMgfSA9IGFyZ3M7XG4gICAgZnVuY3Rpb24gdGFrZUNoYW5uZWxBbmRHZXRDb25uZWN0aW9uKHNhZ2E6IFRlc3RBcGksIGlzQ29ubmVjdGVkOiBib29sZWFuKSB7XG4gICAgICByZXR1cm4gc2FnYVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5jYWxsKGNyZWF0ZUludGVydmFsQ2hhbm5lbCwgMzAwMCwgaW50ZXJ2YWxDaGFubmVsRm4pXG4gICAgICAgIC5uZXh0KCdjaGFubmVsJylcbiAgICAgICAgLnRha2UoJ2NoYW5uZWwnKVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5zZWxlY3QobmV0d29ya1NlbGVjdG9yKVxuICAgICAgICAubmV4dCh7IGlzQ29ubmVjdGVkIH0pO1xuICAgIH1cbiAgICBpdChgZm9ya3MgY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EgaWYgaXQncyBOT1QgY29ubmVjdGVkIG9yIGl0IGlzLFxuICAgICBidXQgcGluZ09ubHlJZk9mZmxpbmUgaXMgZmFsc2VgLCAoKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsZXQgc2FnYTogVGVzdEFwaVdpdGhFZmZlY3RzVGVzdGVycyA9IHRlc3RTYWdhKGNvbm5lY3Rpb25JbnRlcnZhbFNhZ2EsIHtcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICBwaW5nT25seUlmT2ZmbGluZTogZmFsc2UsXG4gICAgICAgIHBpbmdJbnRlcnZhbDogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgc2FnYSA9IHRha2VDaGFubmVsQW5kR2V0Q29ubmVjdGlvbihzYWdhLCB0cnVlKTtcbiAgICAgIHNhZ2FcbiAgICAgICAgLmZvcmsoY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EsIHtcbiAgICAgICAgICBwaW5nVGltZW91dDogcGFyYW1zLnBpbmdUaW1lb3V0LFxuICAgICAgICAgIHBpbmdTZXJ2ZXJVcmw6IHBhcmFtcy5waW5nU2VydmVyVXJsLFxuICAgICAgICAgIGh0dHBNZXRob2Q6IHBhcmFtcy5odHRwTWV0aG9kLFxuICAgICAgICAgIHBpbmdJbkJhY2tncm91bmQ6IHBhcmFtcy5waW5nSW5CYWNrZ3JvdW5kLFxuICAgICAgICAgIGN1c3RvbUhlYWRlcnM6IGFyZ3MuY3VzdG9tSGVhZGVycyxcbiAgICAgICAgfSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAudGFrZSgnY2hhbm5lbCcpO1xuICAgIH0pO1xuXG4gICAgaXQoYGRvZXMgTk9UIGZvcmsgY2hlY2tJbnRlcm5ldEFjY2Vzc1NhZ2EgaWYgaXQncyBjb25uZWN0ZWQgXG4gICAgQU5EIHBpbmdPbmx5SWZPZmZsaW5lIGlzIHRydWVgLCAoKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBsZXQgc2FnYTogVGVzdEFwaVdpdGhFZmZlY3RzVGVzdGVycyA9IHRlc3RTYWdhKGNvbm5lY3Rpb25JbnRlcnZhbFNhZ2EsIHtcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICBwaW5nT25seUlmT2ZmbGluZTogdHJ1ZSxcbiAgICAgICAgcGluZ0ludGVydmFsOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICBzYWdhID0gdGFrZUNoYW5uZWxBbmRHZXRDb25uZWN0aW9uKHNhZ2EsIHRydWUpO1xuICAgICAgc2FnYS50YWtlKCdjaGFubmVsJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xvc2VzIHRoZSBjaGFubmVsIHdoZW4gaXQgZW5kcyBlbWl0dGluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vY2tDbG9zZUZuID0gamVzdC5mbigpO1xuICAgICAgY29uc3QgbW9ja0NoYW5uZWwgPSB7XG4gICAgICAgIGNsb3NlOiBtb2NrQ2xvc2VGbixcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBhY3Rpb25RdWV1ZTogW10sXG4gICAgICAgIGlzUXVldWVQYXVzZWQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGl0ZXJhdG9yID0gY29ubmVjdGlvbkludGVydmFsU2FnYSh7XG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgcGluZ09ubHlJZk9mZmxpbmU6IHRydWUsXG4gICAgICAgIHBpbmdJbnRlcnZhbDogMzAwMCxcbiAgICAgIH0pO1xuICAgICAgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgLy8gVGhpcyB3aWxsIG1ha2UgdGFrZShtb2NrQ2hhbm5lbCkgdGhyb3cgYW4gZXJyb3IsIHNpbmNlIGl0J3Mgbm90IGEgdmFsaWRcbiAgICAgIC8vIGNoYW5uZWwgb3IgYSB2YWxpZCBwYXR0ZXJuIGZvciB0YWtlKCkgaW5zaWRlIHRoZSBpbmZpbml0ZSBsb29wLFxuICAgICAgLy8gaGVuY2UgZXhlY3V0aW5nIHRoZSBmaW5hbGx5IGJsb2NrLlxuICAgICAgaXRlcmF0b3IubmV4dChtb2NrQ2hhbm5lbCk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGl0ZXJhdG9yLm5leHQodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChtb2NrQ2xvc2VGbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBOT1QgY2xvc2UgdGhlIGNoYW5uZWwgaWYgcmVkdXgtc2FnYSBkb2VzIE5PVCB5aWVsZCBhIGNhbmNlbGxlZCBlZmZlY3QnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtb2NrQ2xvc2VGbiA9IGplc3QuZm4oKTtcbiAgICAgIGNvbnN0IG1vY2tDaGFubmVsID0ge1xuICAgICAgICBjbG9zZTogbW9ja0Nsb3NlRm4sXG4gICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgYWN0aW9uUXVldWU6IFtdLFxuICAgICAgICBpc1F1ZXVlUGF1c2VkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBpdGVyYXRvciA9IGNvbm5lY3Rpb25JbnRlcnZhbFNhZ2Eoe1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIHBpbmdPbmx5SWZPZmZsaW5lOiB0cnVlLFxuICAgICAgICBwaW5nSW50ZXJ2YWw6IDMwMDAsXG4gICAgICB9KTtcbiAgICAgIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIC8vIFRoaXMgd2lsbCBtYWtlIHRha2UobW9ja0NoYW5uZWwpIHRocm93IGFuIGVycm9yLCBzaW5jZSBpdCdzIG5vdCBhIHZhbGlkXG4gICAgICAvLyBjaGFubmVsIG9yIGEgdmFsaWQgcGF0dGVybiBmb3IgdGFrZSgpIGluc2lkZSB0aGUgaW5maW5pdGUgbG9vcCxcbiAgICAgIC8vIGhlbmNlIGV4ZWN1dGluZyB0aGUgZmluYWxseSBibG9jay5cbiAgICAgIGl0ZXJhdG9yLm5leHQobW9ja0NoYW5uZWwpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpdGVyYXRvci5uZXh0KGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KG1vY2tDbG9zZUZuKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjaGVja0ludGVybmV0QWNjZXNzU2FnYScsICgpID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBwaW5nU2VydmVyVXJsOiBhcmdzLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICBwaW5nVGltZW91dDogYXJncy5waW5nVGltZW91dCxcbiAgICAgIGh0dHBNZXRob2Q6IGFyZ3MuaHR0cE1ldGhvZCxcbiAgICAgIHBpbmdJbkJhY2tncm91bmQ6IGZhbHNlLFxuICAgICAgY3VzdG9tSGVhZGVyczogYXJncy5jdXN0b21IZWFkZXJzLFxuICAgIH07XG4gICAgaXQoJ3JldHVybnMgZWFybHkgaWYgcGluZ0luQmFja2dyb3VuZCBpcyBmYWxzZSBBTkQgYXBwIHN0YXRlIGlzIE5PVCBhY3RpdmUnLCAoKSA9PiB7XG4gICAgICBBcHBTdGF0ZS5jdXJyZW50U3RhdGUgPSAnaW5hY3RpdmUnO1xuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKGNoZWNrSW50ZXJuZXRBY2Nlc3NTYWdhLCBwYXJhbXMpO1xuICAgICAgc2FnYS5uZXh0KCkuaXNEb25lKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FsbHMgY2hlY2tJbnRlcm5ldEFjY2VzcyBBTkQgaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlJywgKCkgPT4ge1xuICAgICAgcGFyYW1zLnBpbmdJbkJhY2tncm91bmQgPSB0cnVlO1xuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKGNoZWNrSW50ZXJuZXRBY2Nlc3NTYWdhLCBwYXJhbXMpO1xuICAgICAgc2FnYVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5jYWxsKGNoZWNrSW50ZXJuZXRBY2Nlc3MsIHtcbiAgICAgICAgICB1cmw6IHBhcmFtcy5waW5nU2VydmVyVXJsLFxuICAgICAgICAgIHRpbWVvdXQ6IHBhcmFtcy5waW5nVGltZW91dCxcbiAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5odHRwTWV0aG9kLFxuICAgICAgICAgIGN1c3RvbUhlYWRlcnM6IHBhcmFtcy5jdXN0b21IZWFkZXJzLFxuICAgICAgICB9KVxuICAgICAgICAubmV4dCh0cnVlKVxuICAgICAgICAuY2FsbChoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UsIHRydWUpXG4gICAgICAgIC5uZXh0KClcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlJywgKCkgPT4ge1xuICAgIGl0KCdkaXNwYXRjaGVzIGEgQ09OTkVDVElPTl9DSEFOR0UgYWN0aW9uIGlmIHRoZSBjb25uZWN0aW9uIGNoYW5nZWQgJywgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uUXVldWUgPSBbJ2ZvbycsICdiYXInXTtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNvbnN0IHNhZ2EgPSB0ZXN0U2FnYShoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UsIGZhbHNlKTtcbiAgICAgIHNhZ2FcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuc2VsZWN0KG5ldHdvcmtTZWxlY3RvcilcbiAgICAgICAgLm5leHQoeyBhY3Rpb25RdWV1ZSwgaXNDb25uZWN0ZWQ6IHRydWUgfSlcbiAgICAgICAgLnB1dChjb25uZWN0aW9uQ2hhbmdlKGZhbHNlKSlcbiAgICAgICAgLm5leHQoKVxuICAgICAgICAuaXNEb25lKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBOT1QgZGlzcGF0Y2ggaWYgY29ubmVjdGlvbiBkaWQgTk9UIGNoYW5nZSBhbmQgd2UgYXJlIG9mZmxpbmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb25RdWV1ZSA9IFsnZm9vJywgJ2JhciddO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3Qgc2FnYSA9IHRlc3RTYWdhKGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSwgZmFsc2UpO1xuICAgICAgc2FnYVxuICAgICAgICAubmV4dCgpXG4gICAgICAgIC5zZWxlY3QobmV0d29ya1NlbGVjdG9yKVxuICAgICAgICAubmV4dCh7IGFjdGlvblF1ZXVlLCBpc0Nvbm5lY3RlZDogZmFsc2UgfSlcbiAgICAgICAgLmlzRG9uZSgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInZlcnNpb24iOjN9