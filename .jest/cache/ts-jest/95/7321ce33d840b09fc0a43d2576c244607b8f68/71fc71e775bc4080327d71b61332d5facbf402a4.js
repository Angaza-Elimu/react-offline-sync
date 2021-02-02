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
import { put, select, call, take, cancelled, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { AppState, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { networkSelector } from './createReducer';
import checkInternetAccess from '../utils/checkInternetAccess';
import { connectionChange } from './actionCreators';
import { DEFAULT_TIMEOUT, DEFAULT_PING_SERVER_URL, DEFAULT_HTTP_METHOD, DEFAULT_ARGS, } from '../utils/constants';
export function netInfoEventChannelFn(emit) {
    return NetInfo.addEventListener(emit);
}
export function intervalChannelFn(interval) {
    return function (emit) {
        var iv = setInterval(function () { return emit(true); }, interval);
        return function () {
            clearInterval(iv);
        };
    };
}
/**
 * Returns a factory function that creates a channel from network connection change events
 * @returns {Channel<T>}
 */
export function createNetInfoConnectionChangeChannel(channelFn) {
    return eventChannel(channelFn);
}
/**
 * Returns a factory function that creates a channel from an interval
 * @param interval
 * @returns {Channel<T>}
 */
export function createIntervalChannel(interval, channelFn) {
    var handler = channelFn(interval);
    return eventChannel(handler);
}
/**
 * Creates a NetInfo change event channel that:
 * - Listens to NetInfo connection change events
 * - If shouldPing === true, it first verifies we have internet access
 * - Otherwise it calls handleConnectivityChange immediately to process the new information into the redux store
 * @param pingTimeout
 * @param pingServerUrl
 * @param shouldPing
 * @param httpMethod
 * @param customHeaders
 */
export function netInfoChangeSaga(_a) {
    var networkState, chan, isConnected;
    var pingTimeout = _a.pingTimeout, pingServerUrl = _a.pingServerUrl, shouldPing = _a.shouldPing, httpMethod = _a.httpMethod, customHeaders = _a.customHeaders;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(Platform.OS === 'android')) return [3 /*break*/, 3];
                return [4 /*yield*/, call([NetInfo, NetInfo.fetch])];
            case 1:
                networkState = _b.sent();
                return [4 /*yield*/, fork(connectionHandler, {
                        shouldPing: shouldPing,
                        isConnected: networkState.isConnected,
                        pingTimeout: pingTimeout,
                        pingServerUrl: pingServerUrl,
                        httpMethod: httpMethod,
                        customHeaders: customHeaders,
                    })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4 /*yield*/, call(createNetInfoConnectionChangeChannel, netInfoEventChannelFn)];
            case 4:
                chan = _b.sent();
                _b.label = 5;
            case 5:
                _b.trys.push([5, , 10, 12]);
                _b.label = 6;
            case 6:
                if (!true) return [3 /*break*/, 9];
                return [4 /*yield*/, take(chan)];
            case 7:
                isConnected = _b.sent();
                return [4 /*yield*/, fork(connectionHandler, {
                        shouldPing: shouldPing,
                        isConnected: isConnected,
                        pingTimeout: pingTimeout,
                        pingServerUrl: pingServerUrl,
                        httpMethod: httpMethod,
                        customHeaders: customHeaders,
                    })];
            case 8:
                _b.sent();
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, cancelled()];
            case 11:
                if (_b.sent()) {
                    chan.close();
                }
                return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}
/**
 * Either checks internet by pinging a server or calls the store handler function
 * @param shouldPing
 * @param isConnected
 * @param pingTimeout
 * @param pingServerUrl
 * @param httpMethod
 * @param customHeaders
 * @returns {IterableIterator<ForkEffect | *>}
 */
export function connectionHandler(_a) {
    var shouldPing = _a.shouldPing, isConnected = _a.isConnected, pingTimeout = _a.pingTimeout, pingServerUrl = _a.pingServerUrl, httpMethod = _a.httpMethod, customHeaders = _a.customHeaders;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(shouldPing && isConnected)) return [3 /*break*/, 2];
                return [4 /*yield*/, fork(checkInternetAccessSaga, {
                        pingTimeout: pingTimeout,
                        pingServerUrl: pingServerUrl,
                        httpMethod: httpMethod,
                        pingInBackground: false,
                        customHeaders: customHeaders,
                    })];
            case 1:
                _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, fork(handleConnectivityChange, isConnected)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}
/**
 * Creates an interval channel that periodically verifies internet access
 * @param pingTimeout
 * @param pingServerUrl
 * @param interval
 * @param pingOnlyIfOffline
 * @param pingInBackground
 * @param httpMethod
 * @param customHeaders
 * @returns {IterableIterator<*>}
 */
export function connectionIntervalSaga(_a) {
    var chan, state;
    var pingTimeout = _a.pingTimeout, pingServerUrl = _a.pingServerUrl, pingInterval = _a.pingInterval, pingOnlyIfOffline = _a.pingOnlyIfOffline, pingInBackground = _a.pingInBackground, httpMethod = _a.httpMethod, customHeaders = _a.customHeaders;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, call(createIntervalChannel, pingInterval, intervalChannelFn)];
            case 1:
                chan = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, , 9, 11]);
                _b.label = 3;
            case 3:
                if (!true) return [3 /*break*/, 8];
                return [4 /*yield*/, take(chan)];
            case 4:
                _b.sent();
                return [4 /*yield*/, select(networkSelector)];
            case 5:
                state = _b.sent();
                if (!!(state.isConnected && pingOnlyIfOffline === true)) return [3 /*break*/, 7];
                return [4 /*yield*/, fork(checkInternetAccessSaga, {
                        pingTimeout: pingTimeout,
                        pingServerUrl: pingServerUrl,
                        httpMethod: httpMethod,
                        pingInBackground: pingInBackground,
                        customHeaders: customHeaders,
                    })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, cancelled()];
            case 10:
                if (_b.sent()) {
                    chan.close();
                }
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}
/**
 * Saga that verifies internet connection, besides connectivity, by pinging a server of your choice
 * @param pingServerUrl
 * @param pingTimeout
 * @param httpMethod
 * @param pingInBackground
 * @param customHeaders
 */
export function checkInternetAccessSaga(_a) {
    var hasInternetAccess;
    var pingServerUrl = _a.pingServerUrl, pingTimeout = _a.pingTimeout, httpMethod = _a.httpMethod, pingInBackground = _a.pingInBackground, customHeaders = _a.customHeaders;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (pingInBackground === false && AppState.currentState !== 'active') {
                    return [2 /*return*/]; // <-- Return early as we don't care about connectivity if app is not in foreground.
                }
                return [4 /*yield*/, call(checkInternetAccess, {
                        url: pingServerUrl,
                        timeout: pingTimeout,
                        method: httpMethod,
                        customHeaders: customHeaders,
                    })];
            case 1:
                hasInternetAccess = _b.sent();
                return [4 /*yield*/, call(handleConnectivityChange, hasInternetAccess)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
/**
 * Takes action under the new network connection value:
 * - Dispatches a '@@network-connectivity/CONNECTION_CHANGE' action type
 * - Flushes the queue of pending actions if we are connected back to the internet
 * @param hasInternetAccess
 */
export function handleConnectivityChange(hasInternetAccess) {
    var state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, select(networkSelector)];
            case 1:
                state = _a.sent();
                if (!(state.isConnected !== hasInternetAccess)) return [3 /*break*/, 3];
                return [4 /*yield*/, put(connectionChange(hasInternetAccess))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}
/**
 * Saga that controls internet connectivity in your whole application.
 * You just need to fork it from your root saga.
 * It receives the same parameters as withNetworkConnectivity HOC
 * @param pingTimeout
 * @param pingServerUrl
 * @param shouldPing
 * @param pingInterval
 * @param pingOnlyIfOffline
 * @param pingInBackground
 * @param httpMethod
 * @param customHeaders
 */
export default function networkSaga(args) {
    var _a, _b, pingTimeout, _c, pingServerUrl, _d, pingInterval, _e, shouldPing, _f, pingOnlyIfOffline, _g, pingInBackground, _h, httpMethod, customHeaders;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _a = args || DEFAULT_ARGS, _b = _a.pingTimeout, pingTimeout = _b === void 0 ? DEFAULT_TIMEOUT : _b, _c = _a.pingServerUrl, pingServerUrl = _c === void 0 ? DEFAULT_PING_SERVER_URL : _c, _d = _a.pingInterval, pingInterval = _d === void 0 ? 0 : _d, _e = _a.shouldPing, shouldPing = _e === void 0 ? true : _e, _f = _a.pingOnlyIfOffline, pingOnlyIfOffline = _f === void 0 ? false : _f, _g = _a.pingInBackground, pingInBackground = _g === void 0 ? false : _g, _h = _a.httpMethod, httpMethod = _h === void 0 ? DEFAULT_HTTP_METHOD : _h, customHeaders = _a.customHeaders;
                return [4 /*yield*/, fork(netInfoChangeSaga, {
                        pingTimeout: pingTimeout,
                        pingServerUrl: pingServerUrl,
                        shouldPing: shouldPing,
                        httpMethod: httpMethod,
                        customHeaders: customHeaders,
                    })];
            case 1:
                _j.sent();
                if (!(pingInterval > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, fork(connectionIntervalSaga, {
                        pingTimeout: pingTimeout,
                        pingServerUrl: pingServerUrl,
                        pingInterval: pingInterval,
                        pingOnlyIfOffline: pingOnlyIfOffline,
                        pingInBackground: pingInBackground,
                        httpMethod: httpMethod,
                        customHeaders: customHeaders,
                    })];
            case 2:
                _j.sent();
                _j.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvc2FnYXMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBYSxNQUFNLFlBQVksQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLE9BQXlCLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sbUJBQW1CLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFcEQsT0FBTyxFQUNMLGVBQWUsRUFDZix1QkFBdUIsRUFDdkIsbUJBQW1CLEVBQ25CLFlBQVksR0FDYixNQUFNLG9CQUFvQixDQUFDO0FBVTVCLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFzQztJQUMxRSxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFFBQWdCO0lBQ2hELE9BQU8sVUFBQyxJQUFpQztRQUN2QyxJQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBVixDQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsT0FBTztZQUNMLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLG9DQUFvQyxDQUNsRCxTQUF1QjtJQUV2QixPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxRQUFnQixFQUFFLFNBQW1CO0lBQ3pFLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sVUFBVyxpQkFBaUIsQ0FBQyxFQU1mOztRQUxsQiw0QkFBVyxFQUNYLGdDQUFhLEVBQ2IsMEJBQVUsRUFDViwwQkFBVSxFQUNWLGdDQUFhOzs7O3FCQUVULENBQUEsUUFBUSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUEsRUFBekIsd0JBQXlCO2dCQUNRLHFCQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQTs7Z0JBQWpFLFlBQVksR0FBaUIsU0FBb0M7Z0JBQ3ZFLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt3QkFDNUIsVUFBVSxZQUFBO3dCQUNWLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVzt3QkFDckMsV0FBVyxhQUFBO3dCQUNYLGFBQWEsZUFBQTt3QkFDYixVQUFVLFlBQUE7d0JBQ1YsYUFBYSxlQUFBO3FCQUNkLENBQUMsRUFBQTs7Z0JBUEYsU0FPRSxDQUFDOztvQkFFUSxxQkFBTSxJQUFJLENBQ3JCLG9DQUFvQyxFQUNwQyxxQkFBcUIsQ0FDdEIsRUFBQTs7Z0JBSEssSUFBSSxHQUFHLFNBR1o7Ozs7OztxQkFFUSxJQUFJO2dCQUNXLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQTs7Z0JBQTlCLFdBQVcsR0FBRyxTQUFnQjtnQkFDcEMscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFO3dCQUM1QixVQUFVLFlBQUE7d0JBQ1YsV0FBVyxhQUFBO3dCQUNYLFdBQVcsYUFBQTt3QkFDWCxhQUFhLGVBQUE7d0JBQ2IsVUFBVSxZQUFBO3dCQUNWLGFBQWEsZUFBQTtxQkFDZCxDQUFDLEVBQUE7O2dCQVBGLFNBT0UsQ0FBQzs7O3FCQUdELHFCQUFNLFNBQVMsRUFBRSxFQUFBOztnQkFBckIsSUFBSSxTQUFpQixFQUFFO29CQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7Ozs7O0NBRUo7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLFVBQVcsaUJBQWlCLENBQUMsRUFPWTtRQU43QywwQkFBVSxFQUNWLDRCQUFXLEVBQ1gsNEJBQVcsRUFDWCxnQ0FBYSxFQUNiLDBCQUFVLEVBQ1YsZ0NBQWE7Ozs7cUJBRVQsQ0FBQSxVQUFVLElBQUksV0FBVyxDQUFBLEVBQXpCLHdCQUF5QjtnQkFDM0IscUJBQU0sSUFBSSxDQUFDLHVCQUF1QixFQUFFO3dCQUNsQyxXQUFXLGFBQUE7d0JBQ1gsYUFBYSxlQUFBO3dCQUNiLFVBQVUsWUFBQTt3QkFDVixnQkFBZ0IsRUFBRSxLQUFLO3dCQUN2QixhQUFhLGVBQUE7cUJBQ2QsQ0FBQyxFQUFBOztnQkFORixTQU1FLENBQUM7O29CQUVILHFCQUFNLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsRUFBQTs7Z0JBQWpELFNBQWlELENBQUM7Ozs7O0NBRXJEO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVyxzQkFBc0IsQ0FBQyxFQVFEOztRQVByQyw0QkFBVyxFQUNYLGdDQUFhLEVBQ2IsOEJBQVksRUFDWix3Q0FBaUIsRUFDakIsc0NBQWdCLEVBQ2hCLDBCQUFVLEVBQ1YsZ0NBQWE7OztvQkFFQSxxQkFBTSxJQUFJLENBQ3JCLHFCQUFxQixFQUNyQixZQUFZLEVBQ1osaUJBQWlCLENBQ2xCLEVBQUE7O2dCQUpLLElBQUksR0FBRyxTQUlaOzs7Ozs7cUJBRVEsSUFBSTtnQkFDVCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O2dCQUFoQixTQUFnQixDQUFDO2dCQUNXLHFCQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBQTs7Z0JBQW5ELEtBQUssR0FBaUIsU0FBNkI7cUJBQ3JELENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLGlCQUFpQixLQUFLLElBQUksQ0FBQyxFQUFsRCx3QkFBa0Q7Z0JBQ3BELHFCQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRTt3QkFDbEMsV0FBVyxhQUFBO3dCQUNYLGFBQWEsZUFBQTt3QkFDYixVQUFVLFlBQUE7d0JBQ1YsZ0JBQWdCLGtCQUFBO3dCQUNoQixhQUFhLGVBQUE7cUJBQ2QsQ0FBQyxFQUFBOztnQkFORixTQU1FLENBQUM7Ozs7b0JBSUgscUJBQU0sU0FBUyxFQUFFLEVBQUE7O2dCQUFyQixJQUFJLFNBQWlCLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDZDs7Ozs7Q0FFSjtBQUVEOzs7Ozs7O0dBT0c7QUFFSCxNQUFNLFVBQVcsdUJBQXVCLENBQUMsRUFNckI7O1FBTGxCLGdDQUFhLEVBQ2IsNEJBQVcsRUFDWCwwQkFBVSxFQUNWLHNDQUFnQixFQUNoQixnQ0FBYTs7OztnQkFFYixJQUFJLGdCQUFnQixLQUFLLEtBQUssSUFBSSxRQUFRLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtvQkFDcEUsc0JBQU8sQ0FBQyxvRkFBb0Y7aUJBQzdGO2dCQUN5QixxQkFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7d0JBQ3hELEdBQUcsRUFBRSxhQUFhO3dCQUNsQixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLGFBQWEsZUFBQTtxQkFDZCxDQUFDLEVBQUE7O2dCQUxJLGlCQUFpQixHQUFHLFNBS3hCO2dCQUNGLHFCQUFNLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQyxFQUFBOztnQkFBdkQsU0FBdUQsQ0FBQzs7OztDQUN6RDtBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFXLHdCQUF3QixDQUFDLGlCQUEwQjs7OztvQkFDdEMscUJBQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFBOztnQkFBbkQsS0FBSyxHQUFpQixTQUE2QjtxQkFDckQsQ0FBQSxLQUFLLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFBLEVBQXZDLHdCQUF1QztnQkFDekMscUJBQU0sR0FBRyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBQTs7Z0JBQTlDLFNBQThDLENBQUM7Ozs7O0NBRWxEO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVyxXQUFXLENBQUMsSUFBdUI7Ozs7O2dCQUNwRCxLQVNGLElBQUksSUFBSSxZQUFZLEVBUnRCLG1CQUE2QixFQUE3QixXQUFXLG1CQUFHLGVBQWUsS0FBQSxFQUM3QixxQkFBdUMsRUFBdkMsYUFBYSxtQkFBRyx1QkFBdUIsS0FBQSxFQUN2QyxvQkFBZ0IsRUFBaEIsWUFBWSxtQkFBRyxDQUFDLEtBQUEsRUFDaEIsa0JBQWlCLEVBQWpCLFVBQVUsbUJBQUcsSUFBSSxLQUFBLEVBQ2pCLHlCQUF5QixFQUF6QixpQkFBaUIsbUJBQUcsS0FBSyxLQUFBLEVBQ3pCLHdCQUF3QixFQUF4QixnQkFBZ0IsbUJBQUcsS0FBSyxLQUFBLEVBQ3hCLGtCQUFnQyxFQUFoQyxVQUFVLG1CQUFHLG1CQUFtQixLQUFBLEVBQ2hDLGFBQWEsbUJBQUEsQ0FDVTtnQkFFekIscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFO3dCQUM1QixXQUFXLGFBQUE7d0JBQ1gsYUFBYSxlQUFBO3dCQUNiLFVBQVUsWUFBQTt3QkFDVixVQUFVLFlBQUE7d0JBQ1YsYUFBYSxlQUFBO3FCQUNkLENBQUMsRUFBQTs7Z0JBTkYsU0FNRSxDQUFDO3FCQUNDLENBQUEsWUFBWSxHQUFHLENBQUMsQ0FBQSxFQUFoQix3QkFBZ0I7Z0JBQ2xCLHFCQUFNLElBQUksQ0FBQyxzQkFBc0IsRUFBRTt3QkFDakMsV0FBVyxhQUFBO3dCQUNYLGFBQWEsZUFBQTt3QkFDYixZQUFZLGNBQUE7d0JBQ1osaUJBQWlCLG1CQUFBO3dCQUNqQixnQkFBZ0Isa0JBQUE7d0JBQ2hCLFVBQVUsWUFBQTt3QkFDVixhQUFhLGVBQUE7cUJBQ2QsQ0FBQyxFQUFBOztnQkFSRixTQVFFLENBQUM7Ozs7O0NBRU4iLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvc2FnYXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHV0LCBzZWxlY3QsIGNhbGwsIHRha2UsIGNhbmNlbGxlZCwgZm9yayB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgeyBldmVudENoYW5uZWwsIFN1YnNjcmliZSB9IGZyb20gJ3JlZHV4LXNhZ2EnO1xuaW1wb3J0IHsgQXBwU3RhdGUsIFBsYXRmb3JtIH0gZnJvbSAncmVhY3QtbmF0aXZlJztcbmltcG9ydCBOZXRJbmZvLCB7IE5ldEluZm9TdGF0ZSB9IGZyb20gJ0ByZWFjdC1uYXRpdmUtY29tbXVuaXR5L25ldGluZm8nO1xuaW1wb3J0IHsgbmV0d29ya1NlbGVjdG9yIH0gZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcbmltcG9ydCBjaGVja0ludGVybmV0QWNjZXNzIGZyb20gJy4uL3V0aWxzL2NoZWNrSW50ZXJuZXRBY2Nlc3MnO1xuaW1wb3J0IHsgY29ubmVjdGlvbkNoYW5nZSB9IGZyb20gJy4vYWN0aW9uQ3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29ubmVjdGl2aXR5QXJncywgTmV0d29ya1N0YXRlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9USU1FT1VULFxuICBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgREVGQVVMVF9BUkdTLFxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG50eXBlIE5ldEluZm9DaGFuZ2VBcmdzID0gT21pdDxcbiAgQ29ubmVjdGl2aXR5QXJncyxcbiAgJ3BpbmdJbnRlcnZhbCcgfCAncGluZ09ubHlJZk9mZmxpbmUnIHwgJ3BpbmdJbkJhY2tncm91bmQnXG4+O1xudHlwZSBDaGVja0ludGVybmV0QXJncyA9IE9taXQ8TmV0SW5mb0NoYW5nZUFyZ3MsICdzaG91bGRQaW5nJz4gJiB7XG4gIHBpbmdJbkJhY2tncm91bmQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV0SW5mb0V2ZW50Q2hhbm5lbEZuKGVtaXQ6IChwYXJhbTogTmV0SW5mb1N0YXRlKSA9PiB1bmtub3duKSB7XG4gIHJldHVybiBOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIoZW1pdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnZhbENoYW5uZWxGbihpbnRlcnZhbDogbnVtYmVyKSB7XG4gIHJldHVybiAoZW1pdDogKHBhcmFtOiBib29sZWFuKSA9PiB1bmtub3duKSA9PiB7XG4gICAgY29uc3QgaXYgPSBzZXRJbnRlcnZhbCgoKSA9PiBlbWl0KHRydWUpLCBpbnRlcnZhbCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaXYpO1xuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgY2hhbm5lbCBmcm9tIG5ldHdvcmsgY29ubmVjdGlvbiBjaGFuZ2UgZXZlbnRzXG4gKiBAcmV0dXJucyB7Q2hhbm5lbDxUPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5ldEluZm9Db25uZWN0aW9uQ2hhbmdlQ2hhbm5lbDxUID0gYW55PihcbiAgY2hhbm5lbEZuOiBTdWJzY3JpYmU8VD4sXG4pIHtcbiAgcmV0dXJuIGV2ZW50Q2hhbm5lbChjaGFubmVsRm4pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIGNoYW5uZWwgZnJvbSBhbiBpbnRlcnZhbFxuICogQHBhcmFtIGludGVydmFsXG4gKiBAcmV0dXJucyB7Q2hhbm5lbDxUPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUludGVydmFsQ2hhbm5lbChpbnRlcnZhbDogbnVtYmVyLCBjaGFubmVsRm46IEZ1bmN0aW9uKSB7XG4gIGNvbnN0IGhhbmRsZXIgPSBjaGFubmVsRm4oaW50ZXJ2YWwpO1xuICByZXR1cm4gZXZlbnRDaGFubmVsKGhhbmRsZXIpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBOZXRJbmZvIGNoYW5nZSBldmVudCBjaGFubmVsIHRoYXQ6XG4gKiAtIExpc3RlbnMgdG8gTmV0SW5mbyBjb25uZWN0aW9uIGNoYW5nZSBldmVudHNcbiAqIC0gSWYgc2hvdWxkUGluZyA9PT0gdHJ1ZSwgaXQgZmlyc3QgdmVyaWZpZXMgd2UgaGF2ZSBpbnRlcm5ldCBhY2Nlc3NcbiAqIC0gT3RoZXJ3aXNlIGl0IGNhbGxzIGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSBpbW1lZGlhdGVseSB0byBwcm9jZXNzIHRoZSBuZXcgaW5mb3JtYXRpb24gaW50byB0aGUgcmVkdXggc3RvcmVcbiAqIEBwYXJhbSBwaW5nVGltZW91dFxuICogQHBhcmFtIHBpbmdTZXJ2ZXJVcmxcbiAqIEBwYXJhbSBzaG91bGRQaW5nXG4gKiBAcGFyYW0gaHR0cE1ldGhvZFxuICogQHBhcmFtIGN1c3RvbUhlYWRlcnNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24qIG5ldEluZm9DaGFuZ2VTYWdhKHtcbiAgcGluZ1RpbWVvdXQsXG4gIHBpbmdTZXJ2ZXJVcmwsXG4gIHNob3VsZFBpbmcsXG4gIGh0dHBNZXRob2QsXG4gIGN1c3RvbUhlYWRlcnMsXG59OiBOZXRJbmZvQ2hhbmdlQXJncykge1xuICBpZiAoUGxhdGZvcm0uT1MgPT09ICdhbmRyb2lkJykge1xuICAgIGNvbnN0IG5ldHdvcmtTdGF0ZTogTmV0SW5mb1N0YXRlID0geWllbGQgY2FsbChbTmV0SW5mbywgTmV0SW5mby5mZXRjaF0pO1xuICAgIHlpZWxkIGZvcmsoY29ubmVjdGlvbkhhbmRsZXIsIHtcbiAgICAgIHNob3VsZFBpbmcsXG4gICAgICBpc0Nvbm5lY3RlZDogbmV0d29ya1N0YXRlLmlzQ29ubmVjdGVkLFxuICAgICAgcGluZ1RpbWVvdXQsXG4gICAgICBwaW5nU2VydmVyVXJsLFxuICAgICAgaHR0cE1ldGhvZCxcbiAgICAgIGN1c3RvbUhlYWRlcnMsXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgY2hhbiA9IHlpZWxkIGNhbGwoXG4gICAgY3JlYXRlTmV0SW5mb0Nvbm5lY3Rpb25DaGFuZ2VDaGFubmVsLFxuICAgIG5ldEluZm9FdmVudENoYW5uZWxGbixcbiAgKTtcbiAgdHJ5IHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgaXNDb25uZWN0ZWQgPSB5aWVsZCB0YWtlKGNoYW4pO1xuICAgICAgeWllbGQgZm9yayhjb25uZWN0aW9uSGFuZGxlciwge1xuICAgICAgICBzaG91bGRQaW5nLFxuICAgICAgICBpc0Nvbm5lY3RlZCxcbiAgICAgICAgcGluZ1RpbWVvdXQsXG4gICAgICAgIHBpbmdTZXJ2ZXJVcmwsXG4gICAgICAgIGh0dHBNZXRob2QsXG4gICAgICAgIGN1c3RvbUhlYWRlcnMsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKHlpZWxkIGNhbmNlbGxlZCgpKSB7XG4gICAgICBjaGFuLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRWl0aGVyIGNoZWNrcyBpbnRlcm5ldCBieSBwaW5naW5nIGEgc2VydmVyIG9yIGNhbGxzIHRoZSBzdG9yZSBoYW5kbGVyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gc2hvdWxkUGluZ1xuICogQHBhcmFtIGlzQ29ubmVjdGVkXG4gKiBAcGFyYW0gcGluZ1RpbWVvdXRcbiAqIEBwYXJhbSBwaW5nU2VydmVyVXJsXG4gKiBAcGFyYW0gaHR0cE1ldGhvZFxuICogQHBhcmFtIGN1c3RvbUhlYWRlcnNcbiAqIEByZXR1cm5zIHtJdGVyYWJsZUl0ZXJhdG9yPEZvcmtFZmZlY3QgfCAqPn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24qIGNvbm5lY3Rpb25IYW5kbGVyKHtcbiAgc2hvdWxkUGluZyxcbiAgaXNDb25uZWN0ZWQsXG4gIHBpbmdUaW1lb3V0LFxuICBwaW5nU2VydmVyVXJsLFxuICBodHRwTWV0aG9kLFxuICBjdXN0b21IZWFkZXJzLFxufTogTmV0SW5mb0NoYW5nZUFyZ3MgJiB7IGlzQ29ubmVjdGVkOiBib29sZWFuIH0pIHtcbiAgaWYgKHNob3VsZFBpbmcgJiYgaXNDb25uZWN0ZWQpIHtcbiAgICB5aWVsZCBmb3JrKGNoZWNrSW50ZXJuZXRBY2Nlc3NTYWdhLCB7XG4gICAgICBwaW5nVGltZW91dCxcbiAgICAgIHBpbmdTZXJ2ZXJVcmwsXG4gICAgICBodHRwTWV0aG9kLFxuICAgICAgcGluZ0luQmFja2dyb3VuZDogZmFsc2UsXG4gICAgICBjdXN0b21IZWFkZXJzLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHlpZWxkIGZvcmsoaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlLCBpc0Nvbm5lY3RlZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGludGVydmFsIGNoYW5uZWwgdGhhdCBwZXJpb2RpY2FsbHkgdmVyaWZpZXMgaW50ZXJuZXQgYWNjZXNzXG4gKiBAcGFyYW0gcGluZ1RpbWVvdXRcbiAqIEBwYXJhbSBwaW5nU2VydmVyVXJsXG4gKiBAcGFyYW0gaW50ZXJ2YWxcbiAqIEBwYXJhbSBwaW5nT25seUlmT2ZmbGluZVxuICogQHBhcmFtIHBpbmdJbkJhY2tncm91bmRcbiAqIEBwYXJhbSBodHRwTWV0aG9kXG4gKiBAcGFyYW0gY3VzdG9tSGVhZGVyc1xuICogQHJldHVybnMge0l0ZXJhYmxlSXRlcmF0b3I8Kj59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogY29ubmVjdGlvbkludGVydmFsU2FnYSh7XG4gIHBpbmdUaW1lb3V0LFxuICBwaW5nU2VydmVyVXJsLFxuICBwaW5nSW50ZXJ2YWwsXG4gIHBpbmdPbmx5SWZPZmZsaW5lLFxuICBwaW5nSW5CYWNrZ3JvdW5kLFxuICBodHRwTWV0aG9kLFxuICBjdXN0b21IZWFkZXJzLFxufTogT21pdDxDb25uZWN0aXZpdHlBcmdzLCAnc2hvdWxkUGluZyc+KSB7XG4gIGNvbnN0IGNoYW4gPSB5aWVsZCBjYWxsKFxuICAgIGNyZWF0ZUludGVydmFsQ2hhbm5lbCxcbiAgICBwaW5nSW50ZXJ2YWwsXG4gICAgaW50ZXJ2YWxDaGFubmVsRm4sXG4gICk7XG4gIHRyeSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHlpZWxkIHRha2UoY2hhbik7XG4gICAgICBjb25zdCBzdGF0ZTogTmV0d29ya1N0YXRlID0geWllbGQgc2VsZWN0KG5ldHdvcmtTZWxlY3Rvcik7XG4gICAgICBpZiAoIShzdGF0ZS5pc0Nvbm5lY3RlZCAmJiBwaW5nT25seUlmT2ZmbGluZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgeWllbGQgZm9yayhjaGVja0ludGVybmV0QWNjZXNzU2FnYSwge1xuICAgICAgICAgIHBpbmdUaW1lb3V0LFxuICAgICAgICAgIHBpbmdTZXJ2ZXJVcmwsXG4gICAgICAgICAgaHR0cE1ldGhvZCxcbiAgICAgICAgICBwaW5nSW5CYWNrZ3JvdW5kLFxuICAgICAgICAgIGN1c3RvbUhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoeWllbGQgY2FuY2VsbGVkKCkpIHtcbiAgICAgIGNoYW4uY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTYWdhIHRoYXQgdmVyaWZpZXMgaW50ZXJuZXQgY29ubmVjdGlvbiwgYmVzaWRlcyBjb25uZWN0aXZpdHksIGJ5IHBpbmdpbmcgYSBzZXJ2ZXIgb2YgeW91ciBjaG9pY2VcbiAqIEBwYXJhbSBwaW5nU2VydmVyVXJsXG4gKiBAcGFyYW0gcGluZ1RpbWVvdXRcbiAqIEBwYXJhbSBodHRwTWV0aG9kXG4gKiBAcGFyYW0gcGluZ0luQmFja2dyb3VuZFxuICogQHBhcmFtIGN1c3RvbUhlYWRlcnNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24qIGNoZWNrSW50ZXJuZXRBY2Nlc3NTYWdhKHtcbiAgcGluZ1NlcnZlclVybCxcbiAgcGluZ1RpbWVvdXQsXG4gIGh0dHBNZXRob2QsXG4gIHBpbmdJbkJhY2tncm91bmQsXG4gIGN1c3RvbUhlYWRlcnMsXG59OiBDaGVja0ludGVybmV0QXJncykge1xuICBpZiAocGluZ0luQmFja2dyb3VuZCA9PT0gZmFsc2UgJiYgQXBwU3RhdGUuY3VycmVudFN0YXRlICE9PSAnYWN0aXZlJykge1xuICAgIHJldHVybjsgLy8gPC0tIFJldHVybiBlYXJseSBhcyB3ZSBkb24ndCBjYXJlIGFib3V0IGNvbm5lY3Rpdml0eSBpZiBhcHAgaXMgbm90IGluIGZvcmVncm91bmQuXG4gIH1cbiAgY29uc3QgaGFzSW50ZXJuZXRBY2Nlc3MgPSB5aWVsZCBjYWxsKGNoZWNrSW50ZXJuZXRBY2Nlc3MsIHtcbiAgICB1cmw6IHBpbmdTZXJ2ZXJVcmwsXG4gICAgdGltZW91dDogcGluZ1RpbWVvdXQsXG4gICAgbWV0aG9kOiBodHRwTWV0aG9kLFxuICAgIGN1c3RvbUhlYWRlcnMsXG4gIH0pO1xuICB5aWVsZCBjYWxsKGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSwgaGFzSW50ZXJuZXRBY2Nlc3MpO1xufVxuXG4vKipcbiAqIFRha2VzIGFjdGlvbiB1bmRlciB0aGUgbmV3IG5ldHdvcmsgY29ubmVjdGlvbiB2YWx1ZTpcbiAqIC0gRGlzcGF0Y2hlcyBhICdAQG5ldHdvcmstY29ubmVjdGl2aXR5L0NPTk5FQ1RJT05fQ0hBTkdFJyBhY3Rpb24gdHlwZVxuICogLSBGbHVzaGVzIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIGFjdGlvbnMgaWYgd2UgYXJlIGNvbm5lY3RlZCBiYWNrIHRvIHRoZSBpbnRlcm5ldFxuICogQHBhcmFtIGhhc0ludGVybmV0QWNjZXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiogaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKGhhc0ludGVybmV0QWNjZXNzOiBib29sZWFuKSB7XG4gIGNvbnN0IHN0YXRlOiBOZXR3b3JrU3RhdGUgPSB5aWVsZCBzZWxlY3QobmV0d29ya1NlbGVjdG9yKTtcbiAgaWYgKHN0YXRlLmlzQ29ubmVjdGVkICE9PSBoYXNJbnRlcm5ldEFjY2Vzcykge1xuICAgIHlpZWxkIHB1dChjb25uZWN0aW9uQ2hhbmdlKGhhc0ludGVybmV0QWNjZXNzKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTYWdhIHRoYXQgY29udHJvbHMgaW50ZXJuZXQgY29ubmVjdGl2aXR5IGluIHlvdXIgd2hvbGUgYXBwbGljYXRpb24uXG4gKiBZb3UganVzdCBuZWVkIHRvIGZvcmsgaXQgZnJvbSB5b3VyIHJvb3Qgc2FnYS5cbiAqIEl0IHJlY2VpdmVzIHRoZSBzYW1lIHBhcmFtZXRlcnMgYXMgd2l0aE5ldHdvcmtDb25uZWN0aXZpdHkgSE9DXG4gKiBAcGFyYW0gcGluZ1RpbWVvdXRcbiAqIEBwYXJhbSBwaW5nU2VydmVyVXJsXG4gKiBAcGFyYW0gc2hvdWxkUGluZ1xuICogQHBhcmFtIHBpbmdJbnRlcnZhbFxuICogQHBhcmFtIHBpbmdPbmx5SWZPZmZsaW5lXG4gKiBAcGFyYW0gcGluZ0luQmFja2dyb3VuZFxuICogQHBhcmFtIGh0dHBNZXRob2RcbiAqIEBwYXJhbSBjdXN0b21IZWFkZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiBuZXR3b3JrU2FnYShhcmdzPzogQ29ubmVjdGl2aXR5QXJncykge1xuICBjb25zdCB7XG4gICAgcGluZ1RpbWVvdXQgPSBERUZBVUxUX1RJTUVPVVQsXG4gICAgcGluZ1NlcnZlclVybCA9IERFRkFVTFRfUElOR19TRVJWRVJfVVJMLFxuICAgIHBpbmdJbnRlcnZhbCA9IDAsXG4gICAgc2hvdWxkUGluZyA9IHRydWUsXG4gICAgcGluZ09ubHlJZk9mZmxpbmUgPSBmYWxzZSxcbiAgICBwaW5nSW5CYWNrZ3JvdW5kID0gZmFsc2UsXG4gICAgaHR0cE1ldGhvZCA9IERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gICAgY3VzdG9tSGVhZGVycyxcbiAgfSA9IGFyZ3MgfHwgREVGQVVMVF9BUkdTO1xuXG4gIHlpZWxkIGZvcmsobmV0SW5mb0NoYW5nZVNhZ2EsIHtcbiAgICBwaW5nVGltZW91dCxcbiAgICBwaW5nU2VydmVyVXJsLFxuICAgIHNob3VsZFBpbmcsXG4gICAgaHR0cE1ldGhvZCxcbiAgICBjdXN0b21IZWFkZXJzLFxuICB9KTtcbiAgaWYgKHBpbmdJbnRlcnZhbCA+IDApIHtcbiAgICB5aWVsZCBmb3JrKGNvbm5lY3Rpb25JbnRlcnZhbFNhZ2EsIHtcbiAgICAgIHBpbmdUaW1lb3V0LFxuICAgICAgcGluZ1NlcnZlclVybCxcbiAgICAgIHBpbmdJbnRlcnZhbCxcbiAgICAgIHBpbmdPbmx5SWZPZmZsaW5lLFxuICAgICAgcGluZ0luQmFja2dyb3VuZCxcbiAgICAgIGh0dHBNZXRob2QsXG4gICAgICBjdXN0b21IZWFkZXJzLFxuICAgIH0pO1xuICB9XG59XG4iXSwidmVyc2lvbiI6M30=