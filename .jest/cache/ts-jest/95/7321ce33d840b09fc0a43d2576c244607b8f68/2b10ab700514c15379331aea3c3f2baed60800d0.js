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
import * as React from 'react';
import NetworkConnectivity from './NetworkConnectivity';
import NetworkContext from './NetworkContext';
import { DEFAULT_ARGS } from '../utils/constants';
function NetworkProvider(_a) {
    var _b = _a.httpMethod, httpMethod = _b === void 0 ? DEFAULT_ARGS.httpMethod : _b, _c = _a.pingInBackground, pingInBackground = _c === void 0 ? DEFAULT_ARGS.pingInBackground : _c, _d = _a.pingInterval, pingInterval = _d === void 0 ? DEFAULT_ARGS.pingInterval : _d, _e = _a.pingOnlyIfOffline, pingOnlyIfOffline = _e === void 0 ? DEFAULT_ARGS.pingOnlyIfOffline : _e, _f = _a.pingServerUrl, pingServerUrl = _f === void 0 ? DEFAULT_ARGS.pingServerUrl : _f, _g = _a.pingTimeout, pingTimeout = _g === void 0 ? DEFAULT_ARGS.pingTimeout : _g, _h = _a.shouldPing, shouldPing = _h === void 0 ? DEFAULT_ARGS.shouldPing : _h, children = _a.children;
    return (React.createElement(NetworkConnectivity, __assign({}, {
        httpMethod: httpMethod,
        pingInBackground: pingInBackground,
        pingInterval: pingInterval,
        pingOnlyIfOffline: pingOnlyIfOffline,
        pingServerUrl: pingServerUrl,
        pingTimeout: pingTimeout,
        shouldPing: shouldPing,
    }), function (connectionState) { return (React.createElement(NetworkContext.Provider, { value: connectionState }, children)); }));
}
export default NetworkProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvY29tcG9uZW50cy9OZXR3b3JrUHJvdmlkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxtQkFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNbEQsU0FBUyxlQUFlLENBQUMsRUFTUjtRQVJmLGtCQUFvQyxFQUFwQyx5REFBb0MsRUFDcEMsd0JBQWdELEVBQWhELHFFQUFnRCxFQUNoRCxvQkFBd0MsRUFBeEMsNkRBQXdDLEVBQ3hDLHlCQUFrRCxFQUFsRCx1RUFBa0QsRUFDbEQscUJBQTBDLEVBQTFDLCtEQUEwQyxFQUMxQyxtQkFBc0MsRUFBdEMsMkRBQXNDLEVBQ3RDLGtCQUFvQyxFQUFwQyx5REFBb0MsRUFDcEMsc0JBQVE7SUFFUixPQUFPLENBQ0wsb0JBQUMsbUJBQW1CLGVBQ2Q7UUFDRixVQUFVLFlBQUE7UUFDVixnQkFBZ0Isa0JBQUE7UUFDaEIsWUFBWSxjQUFBO1FBQ1osaUJBQWlCLG1CQUFBO1FBQ2pCLGFBQWEsZUFBQTtRQUNiLFdBQVcsYUFBQTtRQUNYLFVBQVUsWUFBQTtLQUNYLEdBRUEsVUFBQSxlQUFlLElBQUksT0FBQSxDQUNsQixvQkFBQyxjQUFjLENBQUMsUUFBUSxJQUFDLEtBQUssRUFBRSxlQUFlLElBQzVDLFFBQVEsQ0FDZSxDQUMzQixFQUptQixDQUluQixDQUNtQixDQUN2QixDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsZUFBZSxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL2NvbXBvbmVudHMvTmV0d29ya1Byb3ZpZGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmV0d29ya0Nvbm5lY3Rpdml0eSBmcm9tICcuL05ldHdvcmtDb25uZWN0aXZpdHknO1xuaW1wb3J0IE5ldHdvcmtDb250ZXh0IGZyb20gJy4vTmV0d29ya0NvbnRleHQnO1xuaW1wb3J0IHsgQ29ubmVjdGl2aXR5QXJncyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IERFRkFVTFRfQVJHUyB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59ICYgQ29ubmVjdGl2aXR5QXJncztcblxuZnVuY3Rpb24gTmV0d29ya1Byb3ZpZGVyKHtcbiAgaHR0cE1ldGhvZCA9IERFRkFVTFRfQVJHUy5odHRwTWV0aG9kLFxuICBwaW5nSW5CYWNrZ3JvdW5kID0gREVGQVVMVF9BUkdTLnBpbmdJbkJhY2tncm91bmQsXG4gIHBpbmdJbnRlcnZhbCA9IERFRkFVTFRfQVJHUy5waW5nSW50ZXJ2YWwsXG4gIHBpbmdPbmx5SWZPZmZsaW5lID0gREVGQVVMVF9BUkdTLnBpbmdPbmx5SWZPZmZsaW5lLFxuICBwaW5nU2VydmVyVXJsID0gREVGQVVMVF9BUkdTLnBpbmdTZXJ2ZXJVcmwsXG4gIHBpbmdUaW1lb3V0ID0gREVGQVVMVF9BUkdTLnBpbmdUaW1lb3V0LFxuICBzaG91bGRQaW5nID0gREVGQVVMVF9BUkdTLnNob3VsZFBpbmcsXG4gIGNoaWxkcmVuLFxufTogUGFydGlhbDxQcm9wcz4pIHtcbiAgcmV0dXJuIChcbiAgICA8TmV0d29ya0Nvbm5lY3Rpdml0eVxuICAgICAgey4uLntcbiAgICAgICAgaHR0cE1ldGhvZCxcbiAgICAgICAgcGluZ0luQmFja2dyb3VuZCxcbiAgICAgICAgcGluZ0ludGVydmFsLFxuICAgICAgICBwaW5nT25seUlmT2ZmbGluZSxcbiAgICAgICAgcGluZ1NlcnZlclVybCxcbiAgICAgICAgcGluZ1RpbWVvdXQsXG4gICAgICAgIHNob3VsZFBpbmcsXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjb25uZWN0aW9uU3RhdGUgPT4gKFxuICAgICAgICA8TmV0d29ya0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2Nvbm5lY3Rpb25TdGF0ZX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L05ldHdvcmtDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgKX1cbiAgICA8L05ldHdvcmtDb25uZWN0aXZpdHk+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5ldHdvcmtQcm92aWRlcjtcbiJdLCJ2ZXJzaW9uIjozfQ==