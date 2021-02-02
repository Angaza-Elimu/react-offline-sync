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
import * as React from 'react';
import { connect } from 'react-redux';
import NetworkConnectivity from './NetworkConnectivity';
import { connectionChange } from '../redux/actionCreators';
import { DEFAULT_ARGS } from '../utils/constants';
var ReduxNetworkProvider = /** @class */ (function (_super) {
    __extends(ReduxNetworkProvider, _super);
    function ReduxNetworkProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleConnectivityChange = function (isConnected) {
            var _a = _this.props, wasConnected = _a.isConnected, dispatch = _a.dispatch;
            if (isConnected !== wasConnected) {
                dispatch(connectionChange(isConnected));
            }
        };
        return _this;
    }
    ReduxNetworkProvider.prototype.render = function () {
        var _a = this.props, children = _a.children, rest = __rest(_a, ["children"]);
        return (React.createElement(NetworkConnectivity, __assign({}, rest, { onConnectivityChange: this.handleConnectivityChange }), function () { return children; }));
    };
    ReduxNetworkProvider.defaultProps = DEFAULT_ARGS;
    return ReduxNetworkProvider;
}(React.Component));
var mapStateToProps = function (state) { return ({
    isConnected: state.network.isConnected,
}); };
var ConnectedReduxNetworkProvider = connect(mapStateToProps)(ReduxNetworkProvider);
export { ConnectedReduxNetworkProvider as default, ReduxNetworkProvider, mapStateToProps, };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvY29tcG9uZW50cy9SZWR1eE5ldHdvcmtQcm92aWRlci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE9BQU8sbUJBQW1CLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBaUJsRDtJQUFtQyx3Q0FBc0I7SUFBekQ7UUFBQSxxRUFxQkM7UUFsQkMsOEJBQXdCLEdBQUcsVUFBQyxXQUFvQjtZQUN4QyxJQUFBLGdCQUFvRCxFQUFsRCw2QkFBeUIsRUFBRSxzQkFBdUIsQ0FBQztZQUMzRCxJQUFJLFdBQVcsS0FBSyxZQUFZLEVBQUU7Z0JBQ2hDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDOztJQWFKLENBQUM7SUFYQyxxQ0FBTSxHQUFOO1FBQ0UsSUFBTSxlQUFrQyxFQUFoQyxzQkFBUSxFQUFFLCtCQUFzQixDQUFDO1FBQ3pDLE9BQU8sQ0FDTCxvQkFBQyxtQkFBbUIsZUFDZCxJQUFJLElBQ1Isb0JBQW9CLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixLQUVsRCxjQUFNLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FDSyxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQW5CTSxpQ0FBWSxHQUFHLFlBQVksQ0FBQztJQW9CckMsMkJBQUM7Q0FBQSxBQXJCRCxDQUFtQyxLQUFLLENBQUMsU0FBUyxHQXFCakQ7QUFFRCxJQUFNLGVBQWUsR0FBRyxVQUFDLEtBQWUsSUFBSyxPQUFBLENBQUM7SUFDNUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVztDQUN2QyxDQUFDLEVBRjJDLENBRTNDLENBQUM7QUFFSCxJQUFNLDZCQUE2QixHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FDNUQsb0JBQW9CLENBQ3JCLENBQUM7QUFFRixPQUFPLEVBQ0wsNkJBQTZCLElBQUksT0FBTyxFQUN4QyxvQkFBb0IsRUFDcEIsZUFBZSxHQUNoQixDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL2NvbXBvbmVudHMvUmVkdXhOZXR3b3JrUHJvdmlkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBOZXR3b3JrQ29ubmVjdGl2aXR5IGZyb20gJy4vTmV0d29ya0Nvbm5lY3Rpdml0eSc7XG5pbXBvcnQgeyBjb25uZWN0aW9uQ2hhbmdlIH0gZnJvbSAnLi4vcmVkdXgvYWN0aW9uQ3JlYXRvcnMnO1xuXG5pbXBvcnQgeyBOZXR3b3JrU3RhdGUsIENvbm5lY3Rpdml0eUFyZ3MgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBERUZBVUxUX0FSR1MgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5pbnRlcmZhY2UgQXBwU3RhdGUge1xuICBuZXR3b3JrOiBOZXR3b3JrU3RhdGU7XG59XG5cbnR5cGUgT3duUHJvcHMgPSBDb25uZWN0aXZpdHlBcmdzO1xuXG5pbnRlcmZhY2UgU3RhdGVQcm9wcyB7XG4gIGlzQ29ubmVjdGVkOiBib29sZWFuO1xuICBkaXNwYXRjaDogRGlzcGF0Y2g7XG59XG5cbnR5cGUgUHJvcHMgPSBPd25Qcm9wcyAmXG4gIFN0YXRlUHJvcHMgJiB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgfTtcbmNsYXNzIFJlZHV4TmV0d29ya1Byb3ZpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBERUZBVUxUX0FSR1M7XG5cbiAgaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gKGlzQ29ubmVjdGVkOiBib29sZWFuKSA9PiB7XG4gICAgY29uc3QgeyBpc0Nvbm5lY3RlZDogd2FzQ29ubmVjdGVkLCBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoaXNDb25uZWN0ZWQgIT09IHdhc0Nvbm5lY3RlZCkge1xuICAgICAgZGlzcGF0Y2goY29ubmVjdGlvbkNoYW5nZShpc0Nvbm5lY3RlZCkpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4ucmVzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPE5ldHdvcmtDb25uZWN0aXZpdHlcbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIG9uQ29ubmVjdGl2aXR5Q2hhbmdlPXt0aGlzLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZX1cbiAgICAgID5cbiAgICAgICAgeygpID0+IGNoaWxkcmVufVxuICAgICAgPC9OZXR3b3JrQ29ubmVjdGl2aXR5PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBBcHBTdGF0ZSkgPT4gKHtcbiAgaXNDb25uZWN0ZWQ6IHN0YXRlLm5ldHdvcmsuaXNDb25uZWN0ZWQsXG59KTtcblxuY29uc3QgQ29ubmVjdGVkUmVkdXhOZXR3b3JrUHJvdmlkZXIgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoXG4gIFJlZHV4TmV0d29ya1Byb3ZpZGVyLFxuKTtcblxuZXhwb3J0IHtcbiAgQ29ubmVjdGVkUmVkdXhOZXR3b3JrUHJvdmlkZXIgYXMgZGVmYXVsdCxcbiAgUmVkdXhOZXR3b3JrUHJvdmlkZXIsXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbn07XG4iXSwidmVyc2lvbiI6M30=