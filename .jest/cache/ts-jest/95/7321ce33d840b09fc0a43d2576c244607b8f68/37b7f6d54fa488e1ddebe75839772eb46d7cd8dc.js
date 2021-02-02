var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import * as React from 'react';
import { AppState, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as connectivityInterval from '../utils/checkConnectivityInterval';
import checkInternetAccess from '../utils/checkInternetAccess';
import { DEFAULT_ARGS } from '../utils/constants';
function validateProps(props) {
    if (typeof props.onConnectivityChange !== 'function') {
        throw new Error('you should pass a function as onConnectivityChange parameter');
    }
    if (typeof props.pingTimeout !== 'number') {
        throw new Error('you should pass a number as pingTimeout parameter');
    }
    if (typeof props.pingServerUrl !== 'string') {
        throw new Error('you should pass a string as pingServerUrl parameter');
    }
    if (typeof props.shouldPing !== 'boolean') {
        throw new Error('you should pass a boolean as shouldPing parameter');
    }
    if (typeof props.pingInterval !== 'number') {
        throw new Error('you should pass a number as pingInterval parameter');
    }
    if (typeof props.pingOnlyIfOffline !== 'boolean') {
        throw new Error('you should pass a boolean as pingOnlyIfOffline parameter');
    }
    if (typeof props.pingInBackground !== 'boolean') {
        throw new Error('you should pass a string as pingServerUrl parameter');
    }
    if (!['HEAD', 'OPTIONS'].includes(props.httpMethod)) {
        throw new Error('httpMethod parameter should be either HEAD or OPTIONS');
    }
}
var NetworkConnectivity = /** @class */ (function (_super) {
    __extends(NetworkConnectivity, _super);
    function NetworkConnectivity(props) {
        var _this = _super.call(this, props) || this;
        _this.unsubscribe = function () { return undefined; };
        _this.handleNetInfoChange = function (connectionState) {
            if (!connectionState.isConnected) {
                _this.handleConnectivityChange(connectionState);
            }
            else {
                _this.checkInternet();
            }
        };
        _this.checkInternet = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, pingInBackground, pingTimeout, pingServerUrl, httpMethod, customHeaders, _b, hasInternetAccess, netInfoState;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, pingInBackground = _a.pingInBackground, pingTimeout = _a.pingTimeout, pingServerUrl = _a.pingServerUrl, httpMethod = _a.httpMethod, customHeaders = _a.customHeaders;
                        if (pingInBackground === false && AppState.currentState !== 'active') {
                            return [2 /*return*/]; // <-- Return early as we don't care about connectivity if app is not in foreground.
                        }
                        return [4 /*yield*/, Promise.all([
                                checkInternetAccess({
                                    url: pingServerUrl,
                                    timeout: pingTimeout,
                                    method: httpMethod,
                                    customHeaders: customHeaders,
                                }),
                                NetInfo.fetch(),
                            ])];
                    case 1:
                        _b = _c.sent(), hasInternetAccess = _b[0], netInfoState = _b[1];
                        this.handleConnectivityChange(__assign(__assign({}, netInfoState), { isConnected: hasInternetAccess }));
                        return [2 /*return*/];
                }
            });
        }); };
        _this.intervalHandler = function () {
            var isConnected = _this.state.isConnected;
            var pingOnlyIfOffline = _this.props.pingOnlyIfOffline;
            if (isConnected && pingOnlyIfOffline === true) {
                return;
            }
            _this.checkInternet();
        };
        _this.handleConnectivityChange = function (_a) {
            var isConnected = _a.isConnected;
            _this.setState({
                isConnected: isConnected,
            });
        };
        validateProps(props);
        _this.state = {
            isConnected: true,
        };
        return _this;
    }
    NetworkConnectivity.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pingInterval, handler, netInfoState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pingInterval = this.props.pingInterval;
                        handler = this.getConnectionChangeHandler();
                        this.unsubscribe = NetInfo.addEventListener(handler);
                        if (!(Platform.OS === 'android')) return [3 /*break*/, 2];
                        return [4 /*yield*/, NetInfo.fetch()];
                    case 1:
                        netInfoState = _a.sent();
                        handler(netInfoState);
                        _a.label = 2;
                    case 2:
                        if (pingInterval > 0) {
                            connectivityInterval.setup(this.intervalHandler, pingInterval);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkConnectivity.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.props, pingServerUrl = _a.pingServerUrl, onConnectivityChange = _a.onConnectivityChange;
        var isConnected = this.state.isConnected;
        if (prevProps.pingServerUrl !== pingServerUrl) {
            this.checkInternet();
        }
        if (prevState.isConnected !== isConnected) {
            onConnectivityChange(isConnected);
        }
    };
    NetworkConnectivity.prototype.componentWillUnmount = function () {
        this.unsubscribe();
        connectivityInterval.clear();
    };
    NetworkConnectivity.prototype.getConnectionChangeHandler = function () {
        var shouldPing = this.props.shouldPing;
        return shouldPing
            ? this.handleNetInfoChange
            : this.handleConnectivityChange;
    };
    NetworkConnectivity.prototype.render = function () {
        var children = this.props.children;
        return children(this.state);
    };
    NetworkConnectivity.defaultProps = __assign(__assign({}, DEFAULT_ARGS), { onConnectivityChange: function () { return undefined; } });
    return NetworkConnectivity;
}(React.PureComponent));
export default NetworkConnectivity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvY29tcG9uZW50cy9OZXR3b3JrQ29ubmVjdGl2aXR5LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLE9BQXlCLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxLQUFLLG9CQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sbUJBQW1CLE1BQU0sOEJBQThCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBVWxELFNBQVMsYUFBYSxDQUFDLEtBQW9CO0lBQ3pDLElBQUksT0FBTyxLQUFLLENBQUMsb0JBQW9CLEtBQUssVUFBVSxFQUFFO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQ2IsOERBQThELENBQy9ELENBQUM7S0FDSDtJQUNELElBQUksT0FBTyxLQUFLLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDdEU7SUFDRCxJQUFJLE9BQU8sS0FBSyxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7UUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0tBQ3hFO0lBQ0QsSUFBSSxPQUFPLEtBQUssQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztLQUN0RTtJQUNELElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtRQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7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QyxLQUFLLENBQUMsYUFBYSxHQStHcEQ7QUFFRCxlQUFlLG1CQUFtQixDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL2NvbXBvbmVudHMvTmV0d29ya0Nvbm5lY3Rpdml0eS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXBwU3RhdGUsIFBsYXRmb3JtIH0gZnJvbSAncmVhY3QtbmF0aXZlJztcbmltcG9ydCBOZXRJbmZvLCB7IE5ldEluZm9TdGF0ZSB9IGZyb20gJ0ByZWFjdC1uYXRpdmUtY29tbXVuaXR5L25ldGluZm8nO1xuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5SW50ZXJ2YWwgZnJvbSAnLi4vdXRpbHMvY2hlY2tDb25uZWN0aXZpdHlJbnRlcnZhbCc7XG5pbXBvcnQgY2hlY2tJbnRlcm5ldEFjY2VzcyBmcm9tICcuLi91dGlscy9jaGVja0ludGVybmV0QWNjZXNzJztcbmltcG9ydCB7IENvbm5lY3Rpdml0eUFyZ3MsIENvbm5lY3Rpdml0eVN0YXRlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgREVGQVVMVF9BUkdTIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcblxuZXhwb3J0IHR5cGUgUmVxdWlyZWRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IChzdGF0ZTogQ29ubmVjdGl2aXR5U3RhdGUpID0+IFJlYWN0LlJlYWN0Tm9kZTtcbn0gJiBEZWZhdWx0UHJvcHM7XG5cbmV4cG9ydCB0eXBlIERlZmF1bHRQcm9wcyA9IENvbm5lY3Rpdml0eUFyZ3MgJiB7XG4gIG9uQ29ubmVjdGl2aXR5Q2hhbmdlOiAoaXNDb25uZWN0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BzKHByb3BzOiBSZXF1aXJlZFByb3BzKSB7XG4gIGlmICh0eXBlb2YgcHJvcHMub25Db25uZWN0aXZpdHlDaGFuZ2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAneW91IHNob3VsZCBwYXNzIGEgZnVuY3Rpb24gYXMgb25Db25uZWN0aXZpdHlDaGFuZ2UgcGFyYW1ldGVyJyxcbiAgICApO1xuICB9XG4gIGlmICh0eXBlb2YgcHJvcHMucGluZ1RpbWVvdXQgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHBhc3MgYSBudW1iZXIgYXMgcGluZ1RpbWVvdXQgcGFyYW1ldGVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwcm9wcy5waW5nU2VydmVyVXJsICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcigneW91IHNob3VsZCBwYXNzIGEgc3RyaW5nIGFzIHBpbmdTZXJ2ZXJVcmwgcGFyYW1ldGVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwcm9wcy5zaG91bGRQaW5nICE9PSAnYm9vbGVhbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgcGFzcyBhIGJvb2xlYW4gYXMgc2hvdWxkUGluZyBwYXJhbWV0ZXInKTtcbiAgfVxuICBpZiAodHlwZW9mIHByb3BzLnBpbmdJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBzaG91bGQgcGFzcyBhIG51bWJlciBhcyBwaW5nSW50ZXJ2YWwgcGFyYW1ldGVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwcm9wcy5waW5nT25seUlmT2ZmbGluZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHBhc3MgYSBib29sZWFuIGFzIHBpbmdPbmx5SWZPZmZsaW5lIHBhcmFtZXRlcicpO1xuICB9XG4gIGlmICh0eXBlb2YgcHJvcHMucGluZ0luQmFja2dyb3VuZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd5b3Ugc2hvdWxkIHBhc3MgYSBzdHJpbmcgYXMgcGluZ1NlcnZlclVybCBwYXJhbWV0ZXInKTtcbiAgfVxuICBpZiAoIVsnSEVBRCcsICdPUFRJT05TJ10uaW5jbHVkZXMocHJvcHMuaHR0cE1ldGhvZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2h0dHBNZXRob2QgcGFyYW1ldGVyIHNob3VsZCBiZSBlaXRoZXIgSEVBRCBvciBPUFRJT05TJyk7XG4gIH1cbn1cblxuY2xhc3MgTmV0d29ya0Nvbm5lY3Rpdml0eSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8XG4gIFJlcXVpcmVkUHJvcHMsXG4gIENvbm5lY3Rpdml0eVN0YXRlXG4+IHtcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZTogKCkgPT4gdm9pZCA9ICgpID0+IHVuZGVmaW5lZDtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRFRkFVTFRfQVJHUyxcbiAgICBvbkNvbm5lY3Rpdml0eUNoYW5nZTogKCkgPT4gdW5kZWZpbmVkLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZXF1aXJlZFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHZhbGlkYXRlUHJvcHMocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBwaW5nSW50ZXJ2YWwgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIoKTtcblxuICAgIHRoaXMudW5zdWJzY3JpYmUgPSBOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIoaGFuZGxlcik7XG4gICAgLy8gT24gQW5kcm9pZCB0aGUgbGlzdGVuZXIgZG9lcyBub3QgZmlyZSBvbiBzdGFydHVwXG4gICAgaWYgKFBsYXRmb3JtLk9TID09PSAnYW5kcm9pZCcpIHtcbiAgICAgIGNvbnN0IG5ldEluZm9TdGF0ZSA9IGF3YWl0IE5ldEluZm8uZmV0Y2goKTtcbiAgICAgIGhhbmRsZXIobmV0SW5mb1N0YXRlKTtcbiAgICB9XG4gICAgaWYgKHBpbmdJbnRlcnZhbCA+IDApIHtcbiAgICAgIGNvbm5lY3Rpdml0eUludGVydmFsLnNldHVwKHRoaXMuaW50ZXJ2YWxIYW5kbGVyLCBwaW5nSW50ZXJ2YWwpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFJlcXVpcmVkUHJvcHMsIHByZXZTdGF0ZTogQ29ubmVjdGl2aXR5U3RhdGUpIHtcbiAgICBjb25zdCB7IHBpbmdTZXJ2ZXJVcmwsIG9uQ29ubmVjdGl2aXR5Q2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaXNDb25uZWN0ZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKHByZXZQcm9wcy5waW5nU2VydmVyVXJsICE9PSBwaW5nU2VydmVyVXJsKSB7XG4gICAgICB0aGlzLmNoZWNrSW50ZXJuZXQoKTtcbiAgICB9XG4gICAgaWYgKHByZXZTdGF0ZS5pc0Nvbm5lY3RlZCAhPT0gaXNDb25uZWN0ZWQpIHtcbiAgICAgIG9uQ29ubmVjdGl2aXR5Q2hhbmdlKGlzQ29ubmVjdGVkKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgY29ubmVjdGl2aXR5SW50ZXJ2YWwuY2xlYXIoKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyKCkge1xuICAgIGNvbnN0IHsgc2hvdWxkUGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gc2hvdWxkUGluZ1xuICAgICAgPyB0aGlzLmhhbmRsZU5ldEluZm9DaGFuZ2VcbiAgICAgIDogdGhpcy5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2U7XG4gIH1cblxuICBoYW5kbGVOZXRJbmZvQ2hhbmdlID0gKGNvbm5lY3Rpb25TdGF0ZTogTmV0SW5mb1N0YXRlKSA9PiB7XG4gICAgaWYgKCFjb25uZWN0aW9uU3RhdGUuaXNDb25uZWN0ZWQpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKGNvbm5lY3Rpb25TdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hlY2tJbnRlcm5ldCgpO1xuICAgIH1cbiAgfTtcblxuICBjaGVja0ludGVybmV0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHBpbmdJbkJhY2tncm91bmQsXG4gICAgICBwaW5nVGltZW91dCxcbiAgICAgIHBpbmdTZXJ2ZXJVcmwsXG4gICAgICBodHRwTWV0aG9kLFxuICAgICAgY3VzdG9tSGVhZGVycyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAocGluZ0luQmFja2dyb3VuZCA9PT0gZmFsc2UgJiYgQXBwU3RhdGUuY3VycmVudFN0YXRlICE9PSAnYWN0aXZlJykge1xuICAgICAgcmV0dXJuOyAvLyA8LS0gUmV0dXJuIGVhcmx5IGFzIHdlIGRvbid0IGNhcmUgYWJvdXQgY29ubmVjdGl2aXR5IGlmIGFwcCBpcyBub3QgaW4gZm9yZWdyb3VuZC5cbiAgICB9XG4gICAgY29uc3QgW2hhc0ludGVybmV0QWNjZXNzLCBuZXRJbmZvU3RhdGVdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgY2hlY2tJbnRlcm5ldEFjY2Vzcyh7XG4gICAgICAgIHVybDogcGluZ1NlcnZlclVybCxcbiAgICAgICAgdGltZW91dDogcGluZ1RpbWVvdXQsXG4gICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZCxcbiAgICAgICAgY3VzdG9tSGVhZGVycyxcbiAgICAgIH0pLFxuICAgICAgTmV0SW5mby5mZXRjaCgpLFxuICAgIF0pO1xuXG4gICAgdGhpcy5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2Uoe1xuICAgICAgLi4ubmV0SW5mb1N0YXRlLFxuICAgICAgaXNDb25uZWN0ZWQ6IGhhc0ludGVybmV0QWNjZXNzLFxuICAgIH0gYXMgTmV0SW5mb1N0YXRlKTtcbiAgfTtcblxuICBpbnRlcnZhbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpc0Nvbm5lY3RlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHBpbmdPbmx5SWZPZmZsaW5lIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc0Nvbm5lY3RlZCAmJiBwaW5nT25seUlmT2ZmbGluZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNoZWNrSW50ZXJuZXQoKTtcbiAgfTtcblxuICBoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSAoeyBpc0Nvbm5lY3RlZCB9OiBOZXRJbmZvU3RhdGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzQ29ubmVjdGVkLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjaGlsZHJlbih0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOZXR3b3JrQ29ubmVjdGl2aXR5O1xuIl0sInZlcnNpb24iOjN9