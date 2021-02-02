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
jest.mock('../utils/checkConnectivityInterval');
jest.mock('../utils/checkInternetAccess', function () {
    return jest.fn().mockResolvedValue(true);
});
import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AppState, Platform, View } from 'react-native';
import { shallow } from 'enzyme';
import { render } from 'react-native-testing-library';
import NetworkConnectivity from '../components/NetworkConnectivity';
import { clear, setup } from '../utils/checkConnectivityInterval';
import checkInternetAccess from '../utils/checkInternetAccess';
import entries from '../utils/objectEntries';
import { DEFAULT_CUSTOM_HEADERS } from '../utils/constants';
var mockConnectionChangeHandler = jest.fn();
var mockGetConnectionChangeHandler = jest.fn(function () { return mockConnectionChangeHandler; });
var mockIntervalHandler = jest.fn();
var mockHandleNetInfoChange = jest.fn();
var mockHandleConnectivityChange = jest.fn();
var mockCheckInternet = jest.fn();
var addEventListener = NetInfo.addEventListener;
var unsubscribe = jest.fn();
var fetch = NetInfo.fetch;
/**
 * Helper function that creates a class that extends NetworkConnectivity
 * and mocks the specific methods on the prototype,
 * in order to not affect the rest of the tests
 * @param methodsMap
 * @returns {ClassWithMocks}
 */
function mockPrototypeMethods(methodsMap) {
    if (methodsMap === void 0) { methodsMap = {}; }
    var ClassWithMocks = /** @class */ (function (_super) {
        __extends(ClassWithMocks, _super);
        function ClassWithMocks() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ClassWithMocks;
    }(NetworkConnectivity));
    entries(methodsMap).forEach(function (_a) {
        var method = _a[0], mockFn = _a[1];
        return (ClassWithMocks.prototype[method] = mockFn);
    });
    return ClassWithMocks;
}
var ChildrenComponent = function () { return React.createElement(View, null); };
var initialProps = {
    children: ChildrenComponent,
};
var getElement = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.props, props = _c === void 0 ? initialProps : _c, _d = _b.Component, Component = _d === void 0 ? NetworkConnectivity : _d;
    var children = props.children, rest = __rest(props, ["children"]);
    return React.createElement(Component, __assign({}, rest), children);
};
describe('NetworkConnectivity', function () {
    afterEach(function () {
        addEventListener.mockClear();
        fetch.mockClear();
        mockConnectionChangeHandler.mockClear();
        mockGetConnectionChangeHandler.mockClear();
        mockIntervalHandler.mockClear();
        mockHandleNetInfoChange.mockClear();
        mockHandleConnectivityChange.mockClear();
        mockCheckInternet.mockClear();
    });
    it('defaultProps', function () {
        expect(NetworkConnectivity.defaultProps).toMatchSnapshot();
    });
    it('passes the connection state into the FACC', function () {
        var children = jest.fn();
        shallow(getElement({ props: { children: children } }));
        expect(children).toHaveBeenCalledWith({ isConnected: true });
    });
    describe('componentDidMount', function () {
        describe('iOS, pingInterval = 0', function () {
            it("sets up a NetInfo.isConnected listener for connectionChange \n      AND does NOT call setupConnectivityCheckInterval", function () {
                Platform.OS = 'ios';
                var MockedNetworkConnectivity = mockPrototypeMethods({
                    getConnectionChangeHandler: mockGetConnectionChangeHandler,
                });
                shallow(getElement({
                    Component: MockedNetworkConnectivity,
                }));
                expect(NetInfo.addEventListener).toHaveBeenCalledTimes(1);
                expect(NetInfo.addEventListener).toHaveBeenCalledWith(mockConnectionChangeHandler);
                expect(setup).not.toHaveBeenCalled();
            });
        });
        describe('Android, pingInterval = 0', function () {
            it("sets up a NetInfo.isConnected listener for connectionChange\n      AND fetches initial connection\n      AND calls the handler\n      AND does NOT call setupConnectivityCheckInterval", function (done) {
                fetch.mockImplementationOnce(function () { return Promise.resolve(false); });
                Platform.OS = 'android';
                var MockedNetworkConnectivity = mockPrototypeMethods({
                    getConnectionChangeHandler: mockGetConnectionChangeHandler,
                });
                shallow(getElement({
                    Component: MockedNetworkConnectivity,
                }));
                expect(NetInfo.addEventListener).toHaveBeenCalledTimes(1);
                expect(NetInfo.addEventListener).toHaveBeenCalledWith(mockConnectionChangeHandler);
                expect(NetInfo.fetch).toHaveBeenCalledTimes(1);
                process.nextTick(function () {
                    expect(mockConnectionChangeHandler).toHaveBeenCalledWith(false);
                    expect(setup).not.toHaveBeenCalled();
                    done();
                });
            });
        });
        it("calls setupConnectivityCheckInterval with the right arguments\n     WHEN pingInterval is higher than 0", function () {
            Platform.OS = 'ios';
            var MockedNetworkConnectivity = mockPrototypeMethods({
                intervalHandler: mockIntervalHandler,
            });
            shallow(getElement({
                Component: MockedNetworkConnectivity,
                props: {
                    children: ChildrenComponent,
                    pingInterval: 1000,
                },
            }));
            expect(setup).toHaveBeenCalled();
        });
    });
    describe('componentWillUnmount', function () {
        it("removes the NetInfo listener with the right parameters\n      AND call connectivityInterval.clear", function () {
            NetInfo.addEventListener.mockReturnValueOnce(unsubscribe);
            var MockedNetworkConnectivity = mockPrototypeMethods({
                getConnectionChangeHandler: mockGetConnectionChangeHandler,
            });
            var wrapper = shallow(getElement({
                Component: MockedNetworkConnectivity,
            }));
            wrapper.unmount();
            expect(unsubscribe).toHaveBeenCalledTimes(1);
            expect(clear).toHaveBeenCalled();
        });
    });
    describe('getConnectionChangeHandler', function () {
        it('returns this.handleNetInfoChange when props.shouldPing = true', function () {
            var wrapper = shallow(getElement({
                props: {
                    children: ChildrenComponent,
                    shouldPing: true,
                },
            }));
            wrapper.instance().handleNetInfoChange = mockHandleNetInfoChange;
            expect(wrapper.instance().getConnectionChangeHandler()).toBe(mockHandleNetInfoChange);
        });
        it('returns this.handleConnectivityChange when props.shouldPing = false', function () {
            var wrapper = shallow(getElement({
                props: {
                    children: ChildrenComponent,
                    shouldPing: false,
                },
            }));
            wrapper.instance().handleConnectivityChange = mockHandleConnectivityChange;
            expect(wrapper.instance().getConnectionChangeHandler()).toBe(mockHandleConnectivityChange);
        });
    });
    describe('handleNetInfoChange', function () {
        it('calls handleConnectivityChange if isConnected is false', function () {
            var wrapper = shallow(getElement());
            wrapper.instance().handleConnectivityChange = mockHandleConnectivityChange;
            wrapper.instance().checkInternet = mockCheckInternet;
            wrapper.instance().handleNetInfoChange({
                type: 'none',
                isConnected: false,
                isInternetReachable: false,
                details: null,
            });
            expect(mockHandleConnectivityChange).toHaveBeenCalledWith({
                type: 'none',
                isConnected: false,
                isInternetReachable: false,
                details: null,
            });
            expect(mockCheckInternet).not.toHaveBeenCalled();
        });
        it('calls checkInternet if isConnected is true', function () {
            var wrapper = shallow(getElement());
            wrapper.instance().handleConnectivityChange = mockHandleConnectivityChange;
            wrapper.instance().checkInternet = mockCheckInternet;
            wrapper.instance().handleNetInfoChange({
                type: 'other',
                isConnected: true,
                isInternetReachable: true,
                details: {
                    cellularGeneration: null,
                    isConnectionExpensive: false,
                },
            });
            expect(mockHandleConnectivityChange).not.toHaveBeenCalled();
            expect(mockCheckInternet).toHaveBeenCalled();
        });
    });
    describe('checkInternet', function () {
        it('returns early if pingIfBackground = false AND app is not in the foreground', function () { return __awaiter(void 0, void 0, void 0, function () {
            var wrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        AppState.currentState = 'background';
                        wrapper = shallow(getElement({
                            props: {
                                children: ChildrenComponent,
                                pingInBackground: false,
                            },
                        }));
                        wrapper.instance().handleConnectivityChange = mockHandleConnectivityChange;
                        return [4 /*yield*/, wrapper.instance().checkInternet()];
                    case 1:
                        _a.sent();
                        expect(checkInternetAccess).not.toHaveBeenCalled();
                        expect(mockHandleConnectivityChange).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("calls checkInternetAccess AND handleConnectivityChange \n    with the right arguments if app is in foreground", function () { return __awaiter(void 0, void 0, void 0, function () {
            var props, wrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        props = {
                            pingTimeout: 2000,
                            pingServerUrl: 'dummy.com',
                            httpMethod: 'OPTIONS',
                            children: ChildrenComponent,
                            customHeaders: DEFAULT_CUSTOM_HEADERS,
                        };
                        AppState.currentState = 'active';
                        wrapper = shallow(getElement({
                            props: props,
                        }));
                        wrapper.instance().handleConnectivityChange = mockHandleConnectivityChange;
                        return [4 /*yield*/, wrapper.instance().checkInternet()];
                    case 1:
                        _a.sent();
                        expect(checkInternetAccess).toHaveBeenCalledWith({
                            url: props.pingServerUrl,
                            timeout: props.pingTimeout,
                            method: props.httpMethod,
                            customHeaders: props.customHeaders,
                        });
                        expect(mockHandleConnectivityChange).toHaveBeenCalledWith({
                            isConnected: true,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('intervalHandler', function () {
        it('returns early if there is connection AND pingOnlyIfOffline = true', function () {
            var wrapper = shallow(getElement({
                props: {
                    children: ChildrenComponent,
                    pingOnlyIfOffline: true,
                },
            }));
            wrapper.instance().checkInternet = mockCheckInternet;
            wrapper.setState({ isConnected: true });
            wrapper.instance().intervalHandler();
            expect(mockCheckInternet).not.toHaveBeenCalled();
        });
        it("calls checkInternet if it's not connected OR pingOnlyIfOffline = false", function () {
            var wrapper = shallow(getElement({
                props: {
                    children: ChildrenComponent,
                    pingOnlyIfOffline: false,
                },
            }));
            wrapper.instance().checkInternet = mockCheckInternet;
            wrapper.setState({ isConnected: false });
            wrapper.instance().intervalHandler();
            expect(mockCheckInternet).toHaveBeenCalledTimes(1);
            wrapper.setState({ isConnected: true });
            wrapper.instance().intervalHandler();
            expect(mockCheckInternet).toHaveBeenCalledTimes(2);
        });
    });
    describe('handleConnectivityChange', function () {
        it('calls setState with the new connection value', function () {
            var mockSetState = jest.fn();
            var MockedNetworkConnectivity = mockPrototypeMethods({
                setState: mockSetState,
            });
            var wrapper = shallow(getElement({
                Component: MockedNetworkConnectivity,
            }));
            wrapper.instance().handleConnectivityChange({
                type: 'other',
                isConnected: true,
                isInternetReachable: true,
                details: {
                    cellularGeneration: null,
                    isConnectionExpensive: false,
                },
            });
            expect(mockSetState).toHaveBeenCalledWith({ isConnected: true });
            wrapper.instance().handleConnectivityChange({
                type: 'none',
                isConnected: false,
                isInternetReachable: false,
                details: null,
            });
            expect(mockSetState).toHaveBeenCalledWith({ isConnected: false });
        });
    });
    describe('pingUrlChange', function () {
        it('calls checkInternet if pingServerUrl changes', function () {
            var wrapper = shallow(getElement());
            wrapper.instance().checkInternet = mockCheckInternet;
            expect(mockCheckInternet).not.toHaveBeenCalled();
            wrapper.setProps({ pingServerUrl: 'https://newServerToPing.com' });
            expect(mockCheckInternet).toHaveBeenCalled();
        });
    });
    describe('props validation', function () {
        it('throws if prop pingTimeout is not a number', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { pingTimeout: '4000', children: ChildrenComponent },
                }));
            }).toThrow('you should pass a number as pingTimeout parameter');
        });
        it('throws if prop pingServerUrl is not a string', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { pingServerUrl: 90, children: ChildrenComponent },
                }));
            }).toThrow('you should pass a string as pingServerUrl parameter');
        });
        it('throws if prop shouldPing is not a boolean', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { shouldPing: function () { return null; }, children: ChildrenComponent },
                }));
            }).toThrow('you should pass a boolean as shouldPing parameter');
        });
        it('throws if prop pingInterval is not a number', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { pingInterval: false, children: ChildrenComponent },
                }));
            }).toThrow('you should pass a number as pingInterval parameter');
        });
        it('throws if prop pingOnlyIfOffline is not a boolean', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { pingOnlyIfOffline: 10, children: ChildrenComponent },
                }));
            }).toThrow('you should pass a boolean as pingOnlyIfOffline parameter');
        });
        it('throws if prop pingInBackground is not a boolean', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { pingInBackground: '4000', children: ChildrenComponent },
                }));
            }).toThrow('you should pass a string as pingServerUrl parameter');
        });
        it('throws if prop httpMethod is not either HEAD or OPTIONS', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { httpMethod: 'POST', children: ChildrenComponent },
                }));
            }).toThrow('httpMethod parameter should be either HEAD or OPTIONS');
        });
        it('throws if prop onConnectivityChange is not a function', function () {
            expect(function () {
                return render(
                // @ts-ignore
                getElement({
                    props: { onConnectivityChange: 'foo', children: ChildrenComponent },
                }));
            }).toThrow('you should pass a function as onConnectivityChange parameter');
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29ubmVjdGl2aXR5LnRlc3QudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBLElBQUksQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQztBQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFO0lBQzVDLE9BQUEsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztBQUFqQyxDQUFpQyxDQUNsQyxDQUFDO0FBdkNGLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sT0FBNkIsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxtQkFFTixNQUFNLHVDQUF1QyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdEUsT0FBTyxtQkFBbUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLE9BQU8sTUFBTSw0QkFBNEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWFoRSxJQUFNLDJCQUEyQixHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM5QyxJQUFNLDhCQUE4QixHQUFHLElBQUksQ0FBQyxFQUFFLENBQzVDLGNBQU0sT0FBQSwyQkFBMkIsRUFBM0IsQ0FBMkIsQ0FDbEMsQ0FBQztBQUNGLElBQU0sbUJB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UUFBUSxFQUFFLGlCQUFpQixFQUFFO2lCQUNwRSxDQUFDLENBQ0g7WUFMRCxDQUtDLENBQ0YsQ0FBQyxPQUFPLENBQUMsOERBQThELENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29ubmVjdGl2aXR5LnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOZXRJbmZvLCB7IE5ldEluZm9TdGF0ZVR5cGUgfSBmcm9tICdAcmVhY3QtbmF0aXZlLWNvbW11bml0eS9uZXRpbmZvJztcbmltcG9ydCB7IEFwcFN0YXRlLCBQbGF0Zm9ybSwgVmlldyB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgeyBzaGFsbG93IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LW5hdGl2ZS10ZXN0aW5nLWxpYnJhcnknO1xuaW1wb3J0IE5ldHdvcmtDb25uZWN0aXZpdHksIHtcbiAgUmVxdWlyZWRQcm9wcyxcbn0gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTmV0d29ya0Nvbm5lY3Rpdml0eSc7XG5pbXBvcnQgeyBjbGVhciwgc2V0dXAgfSBmcm9tICcuLi9zcmMvdXRpbHMvY2hlY2tDb25uZWN0aXZpdHlJbnRlcnZhbCc7XG5pbXBvcnQgY2hlY2tJbnRlcm5ldEFjY2VzcyBmcm9tICcuLi9zcmMvdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcyc7XG5pbXBvcnQgZW50cmllcyBmcm9tICcuLi9zcmMvdXRpbHMvb2JqZWN0RW50cmllcyc7XG5pbXBvcnQgeyBERUZBVUxUX0NVU1RPTV9IRUFERVJTIH0gZnJvbSAnLi4vc3JjL3V0aWxzL2NvbnN0YW50cyc7XG5cbnR5cGUgT3B0aW9uYWxQcm9wcyA9IE9taXQ8UmVxdWlyZWRQcm9wcywgJ2NoaWxkcmVuJz47XG50eXBlIEdldEVsZW1lbnRQYXJhbXM8UCA9IGFueT4gPSB7XG4gIHByb3BzPzogUGljazxSZXF1aXJlZFByb3BzLCAnY2hpbGRyZW4nPiAmIFBhcnRpYWw8T3B0aW9uYWxQcm9wcz47XG4gIENvbXBvbmVudD86IFJlYWN0LkNvbXBvbmVudFR5cGU8UD47XG59O1xuXG5pbnRlcmZhY2UgTWV0aG9kc01hcCB7XG4gIGdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyPzogYW55O1xuICBpbnRlcnZhbEhhbmRsZXI/OiBhbnk7XG4gIHNldFN0YXRlPzogYW55O1xufVxuY29uc3QgbW9ja0Nvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyID0gamVzdC5mbigpO1xuY29uc3QgbW9ja0dldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyID0gamVzdC5mbihcbiAgKCkgPT4gbW9ja0Nvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyLFxuKTtcbmNvbnN0IG1vY2tJbnRlcnZhbEhhbmRsZXIgPSBqZXN0LmZuKCk7XG5jb25zdCBtb2NrSGFuZGxlTmV0SW5mb0NoYW5nZSA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSBqZXN0LmZuKCk7XG5jb25zdCBtb2NrQ2hlY2tJbnRlcm5ldCA9IGplc3QuZm4oKTtcblxuY29uc3QgYWRkRXZlbnRMaXN0ZW5lciA9IE5ldEluZm8uYWRkRXZlbnRMaXN0ZW5lciBhcyBqZXN0Lk1vY2s7XG5jb25zdCB1bnN1YnNjcmliZSA9IGplc3QuZm4oKTtcbmNvbnN0IGZldGNoID0gTmV0SW5mby5mZXRjaCBhcyBqZXN0Lk1vY2s7XG5qZXN0Lm1vY2soJy4uL3NyYy91dGlscy9jaGVja0Nvbm5lY3Rpdml0eUludGVydmFsJyk7XG5qZXN0Lm1vY2soJy4uL3NyYy91dGlscy9jaGVja0ludGVybmV0QWNjZXNzJywgKCkgPT5cbiAgamVzdC5mbigpLm1vY2tSZXNvbHZlZFZhbHVlKHRydWUpLFxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgY2xhc3MgdGhhdCBleHRlbmRzIE5ldHdvcmtDb25uZWN0aXZpdHlcbiAqIGFuZCBtb2NrcyB0aGUgc3BlY2lmaWMgbWV0aG9kcyBvbiB0aGUgcHJvdG90eXBlLFxuICogaW4gb3JkZXIgdG8gbm90IGFmZmVjdCB0aGUgcmVzdCBvZiB0aGUgdGVzdHNcbiAqIEBwYXJhbSBtZXRob2RzTWFwXG4gKiBAcmV0dXJucyB7Q2xhc3NXaXRoTW9ja3N9XG4gKi9cblxuZnVuY3Rpb24gbW9ja1Byb3RvdHlwZU1ldGhvZHMobWV0aG9kc01hcDogTWV0aG9kc01hcCA9IHt9IGFzIE1ldGhvZHNNYXApIHtcbiAgY2xhc3MgQ2xhc3NXaXRoTW9ja3MgZXh0ZW5kcyBOZXR3b3JrQ29ubmVjdGl2aXR5IHt9XG4gIGVudHJpZXMobWV0aG9kc01hcCkuZm9yRWFjaChcbiAgICAoW21ldGhvZCwgbW9ja0ZuXSkgPT4gKENsYXNzV2l0aE1vY2tzLnByb3RvdHlwZVttZXRob2RdID0gbW9ja0ZuKSxcbiAgKTtcbiAgcmV0dXJuIENsYXNzV2l0aE1vY2tzO1xufVxuXG5jb25zdCBDaGlsZHJlbkNvbXBvbmVudCA9ICgpID0+IDxWaWV3IC8+O1xuXG5jb25zdCBpbml0aWFsUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbn07XG5cbmNvbnN0IGdldEVsZW1lbnQgPSAoe1xuICBwcm9wcyA9IGluaXRpYWxQcm9wcyxcbiAgQ29tcG9uZW50ID0gTmV0d29ya0Nvbm5lY3Rpdml0eSxcbn06IEdldEVsZW1lbnRQYXJhbXMgPSB7fSkgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5yZXN0IH0gPSBwcm9wcztcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnJlc3R9PntjaGlsZHJlbn08L0NvbXBvbmVudD47XG59O1xuXG5kZXNjcmliZSgnTmV0d29ya0Nvbm5lY3Rpdml0eScsICgpID0+IHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBhZGRFdmVudExpc3RlbmVyLm1vY2tDbGVhcigpO1xuICAgIGZldGNoLm1vY2tDbGVhcigpO1xuICAgIG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlci5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIubW9ja0NsZWFyKCk7XG4gICAgbW9ja0ludGVydmFsSGFuZGxlci5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrSGFuZGxlTmV0SW5mb0NoYW5nZS5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlLm1vY2tDbGVhcigpO1xuICAgIG1vY2tDaGVja0ludGVybmV0Lm1vY2tDbGVhcigpO1xuICB9KTtcblxuICBpdCgnZGVmYXVsdFByb3BzJywgKCkgPT4ge1xuICAgIGV4cGVjdChOZXR3b3JrQ29ubmVjdGl2aXR5LmRlZmF1bHRQcm9wcykudG9NYXRjaFNuYXBzaG90KCk7XG4gIH0pO1xuXG4gIGl0KCdwYXNzZXMgdGhlIGNvbm5lY3Rpb24gc3RhdGUgaW50byB0aGUgRkFDQycsICgpID0+IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGplc3QuZm4oKTtcbiAgICBzaGFsbG93KGdldEVsZW1lbnQoeyBwcm9wczogeyBjaGlsZHJlbiB9IH0pKTtcbiAgICBleHBlY3QoY2hpbGRyZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjb21wb25lbnREaWRNb3VudCcsICgpID0+IHtcbiAgICBkZXNjcmliZSgnaU9TLCBwaW5nSW50ZXJ2YWwgPSAwJywgKCkgPT4ge1xuICAgICAgaXQoYHNldHMgdXAgYSBOZXRJbmZvLmlzQ29ubmVjdGVkIGxpc3RlbmVyIGZvciBjb25uZWN0aW9uQ2hhbmdlIFxuICAgICAgQU5EIGRvZXMgTk9UIGNhbGwgc2V0dXBDb25uZWN0aXZpdHlDaGVja0ludGVydmFsYCwgKCkgPT4ge1xuICAgICAgICBQbGF0Zm9ybS5PUyA9ICdpb3MnO1xuICAgICAgICBjb25zdCBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5ID0gbW9ja1Byb3RvdHlwZU1ldGhvZHMoe1xuICAgICAgICAgIGdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyOiBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBzaGFsbG93KFxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgQ29tcG9uZW50OiBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5LFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBleHBlY3QoTmV0SW5mby5hZGRFdmVudExpc3RlbmVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgIGV4cGVjdChOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcixcbiAgICAgICAgKTtcbiAgICAgICAgZXhwZWN0KHNldHVwKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnQW5kcm9pZCwgcGluZ0ludGVydmFsID0gMCcsICgpID0+IHtcbiAgICAgIGl0KGBzZXRzIHVwIGEgTmV0SW5mby5pc0Nvbm5lY3RlZCBsaXN0ZW5lciBmb3IgY29ubmVjdGlvbkNoYW5nZVxuICAgICAgQU5EIGZldGNoZXMgaW5pdGlhbCBjb25uZWN0aW9uXG4gICAgICBBTkQgY2FsbHMgdGhlIGhhbmRsZXJcbiAgICAgIEFORCBkb2VzIE5PVCBjYWxsIHNldHVwQ29ubmVjdGl2aXR5Q2hlY2tJbnRlcnZhbGAsIChkb25lOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICBmZXRjaC5tb2NrSW1wbGVtZW50YXRpb25PbmNlKCgpID0+IFByb21pc2UucmVzb2x2ZShmYWxzZSkpO1xuICAgICAgICBQbGF0Zm9ybS5PUyA9ICdhbmRyb2lkJztcbiAgICAgICAgY29uc3QgTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSA9IG1vY2tQcm90b3R5cGVNZXRob2RzKHtcbiAgICAgICAgICBnZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcjogbW9ja0dldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgc2hhbGxvdyhcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIENvbXBvbmVudDogTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgZXhwZWN0KE5ldEluZm8uYWRkRXZlbnRMaXN0ZW5lcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgICBleHBlY3QoTmV0SW5mby5hZGRFdmVudExpc3RlbmVyKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICBtb2NrQ29ubmVjdGlvbkNoYW5nZUhhbmRsZXIsXG4gICAgICAgICk7XG4gICAgICAgIGV4cGVjdChOZXRJbmZvLmZldGNoKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrQ29ubmVjdGlvbkNoYW5nZUhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZhbHNlKTtcbiAgICAgICAgICBleHBlY3Qoc2V0dXApLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoYGNhbGxzIHNldHVwQ29ubmVjdGl2aXR5Q2hlY2tJbnRlcnZhbCB3aXRoIHRoZSByaWdodCBhcmd1bWVudHNcbiAgICAgV0hFTiBwaW5nSW50ZXJ2YWwgaXMgaGlnaGVyIHRoYW4gMGAsICgpID0+IHtcbiAgICAgIFBsYXRmb3JtLk9TID0gJ2lvcyc7XG4gICAgICBjb25zdCBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5ID0gbW9ja1Byb3RvdHlwZU1ldGhvZHMoe1xuICAgICAgICBpbnRlcnZhbEhhbmRsZXI6IG1vY2tJbnRlcnZhbEhhbmRsZXIsXG4gICAgICB9KTtcbiAgICAgIHNoYWxsb3coXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIENvbXBvbmVudDogTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICAgICAgcGluZ0ludGVydmFsOiAxMDAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIGV4cGVjdChzZXR1cCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29tcG9uZW50V2lsbFVubW91bnQnLCAoKSA9PiB7XG4gICAgaXQoYHJlbW92ZXMgdGhlIE5ldEluZm8gbGlzdGVuZXIgd2l0aCB0aGUgcmlnaHQgcGFyYW1ldGVyc1xuICAgICAgQU5EIGNhbGwgY29ubmVjdGl2aXR5SW50ZXJ2YWwuY2xlYXJgLCAoKSA9PiB7XG4gICAgICAoTmV0SW5mby5hZGRFdmVudExpc3RlbmVyIGFzIGplc3QuTW9jaykubW9ja1JldHVyblZhbHVlT25jZSh1bnN1YnNjcmliZSk7XG4gICAgICBjb25zdCBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5ID0gbW9ja1Byb3RvdHlwZU1ldGhvZHMoe1xuICAgICAgICBnZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcjogbW9ja0dldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyLFxuICAgICAgfSk7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdyhcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgQ29tcG9uZW50OiBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLnVubW91bnQoKTtcbiAgICAgIGV4cGVjdCh1bnN1YnNjcmliZSkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgZXhwZWN0KGNsZWFyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGlzLmhhbmRsZU5ldEluZm9DaGFuZ2Ugd2hlbiBwcm9wcy5zaG91bGRQaW5nID0gdHJ1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICAgICAgc2hvdWxkUGluZzogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlTmV0SW5mb0NoYW5nZSA9IG1vY2tIYW5kbGVOZXRJbmZvQ2hhbmdlO1xuICAgICAgZXhwZWN0KHdyYXBwZXIuaW5zdGFuY2UoKS5nZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcigpKS50b0JlKFxuICAgICAgICBtb2NrSGFuZGxlTmV0SW5mb0NoYW5nZSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGlzLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSB3aGVuIHByb3BzLnNob3VsZFBpbmcgPSBmYWxzZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICAgICAgc2hvdWxkUGluZzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSA9IG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2U7XG4gICAgICBleHBlY3Qod3JhcHBlci5pbnN0YW5jZSgpLmdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyKCkpLnRvQmUoXG4gICAgICAgIG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UsXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlTmV0SW5mb0NoYW5nZScsICgpID0+IHtcbiAgICBpdCgnY2FsbHMgaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlIGlmIGlzQ29ubmVjdGVkIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oZ2V0RWxlbWVudCgpKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQgPSBtb2NrQ2hlY2tJbnRlcm5ldDtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVOZXRJbmZvQ2hhbmdlKHtcbiAgICAgICAgdHlwZTogJ25vbmUnIGFzIE5ldEluZm9TdGF0ZVR5cGUubm9uZSxcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0ludGVybmV0UmVhY2hhYmxlOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsczogbnVsbCxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgdHlwZTogJ25vbmUnIGFzIE5ldEluZm9TdGF0ZVR5cGUubm9uZSxcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0ludGVybmV0UmVhY2hhYmxlOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsczogbnVsbCxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIGNoZWNrSW50ZXJuZXQgaWYgaXNDb25uZWN0ZWQgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KGdldEVsZW1lbnQoKSk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0ID0gbW9ja0NoZWNrSW50ZXJuZXQ7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlTmV0SW5mb0NoYW5nZSh7XG4gICAgICAgIHR5cGU6ICdvdGhlcicgYXMgTmV0SW5mb1N0YXRlVHlwZS5vdGhlcixcbiAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgIGlzSW50ZXJuZXRSZWFjaGFibGU6IHRydWUsXG4gICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICBjZWxsdWxhckdlbmVyYXRpb246IG51bGwsXG4gICAgICAgICAgaXNDb25uZWN0aW9uRXhwZW5zaXZlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NoZWNrSW50ZXJuZXQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZWFybHkgaWYgcGluZ0lmQmFja2dyb3VuZCA9IGZhbHNlIEFORCBhcHAgaXMgbm90IGluIHRoZSBmb3JlZ3JvdW5kJywgYXN5bmMgKCkgPT4ge1xuICAgICAgQXBwU3RhdGUuY3VycmVudFN0YXRlID0gJ2JhY2tncm91bmQnO1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICBwaW5nSW5CYWNrZ3JvdW5kOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZTtcbiAgICAgIGF3YWl0IHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0KCk7XG4gICAgICBleHBlY3QoY2hlY2tJbnRlcm5ldEFjY2Vzcykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIGV4cGVjdChtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoYGNhbGxzIGNoZWNrSW50ZXJuZXRBY2Nlc3MgQU5EIGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSBcbiAgICB3aXRoIHRoZSByaWdodCBhcmd1bWVudHMgaWYgYXBwIGlzIGluIGZvcmVncm91bmRgLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgcGluZ1RpbWVvdXQ6IDIwMDAsXG4gICAgICAgIHBpbmdTZXJ2ZXJVcmw6ICdkdW1teS5jb20nLFxuICAgICAgICBodHRwTWV0aG9kOiAnT1BUSU9OUycgYXMgJ09QVElPTlMnLFxuICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgIGN1c3RvbUhlYWRlcnM6IERFRkFVTFRfQ1VTVE9NX0hFQURFUlMsXG4gICAgICB9O1xuICAgICAgQXBwU3RhdGUuY3VycmVudFN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgcHJvcHMsXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlO1xuICAgICAgYXdhaXQgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQoKTtcbiAgICAgIGV4cGVjdChjaGVja0ludGVybmV0QWNjZXNzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgIHVybDogcHJvcHMucGluZ1NlcnZlclVybCxcbiAgICAgICAgdGltZW91dDogcHJvcHMucGluZ1RpbWVvdXQsXG4gICAgICAgIG1ldGhvZDogcHJvcHMuaHR0cE1ldGhvZCxcbiAgICAgICAgY3VzdG9tSGVhZGVyczogcHJvcHMuY3VzdG9tSGVhZGVycyxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2ludGVydmFsSGFuZGxlcicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBlYXJseSBpZiB0aGVyZSBpcyBjb25uZWN0aW9uIEFORCBwaW5nT25seUlmT2ZmbGluZSA9IHRydWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgICAgIHBpbmdPbmx5SWZPZmZsaW5lOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0ID0gbW9ja0NoZWNrSW50ZXJuZXQ7XG4gICAgICB3cmFwcGVyLnNldFN0YXRlKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaW50ZXJ2YWxIYW5kbGVyKCk7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdChgY2FsbHMgY2hlY2tJbnRlcm5ldCBpZiBpdCdzIG5vdCBjb25uZWN0ZWQgT1IgcGluZ09ubHlJZk9mZmxpbmUgPSBmYWxzZWAsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICAgICAgcGluZ09ubHlJZk9mZmxpbmU6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0ID0gbW9ja0NoZWNrSW50ZXJuZXQ7XG4gICAgICB3cmFwcGVyLnNldFN0YXRlKHsgaXNDb25uZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmludGVydmFsSGFuZGxlcigpO1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG5cbiAgICAgIHdyYXBwZXIuc2V0U3RhdGUoeyBpc0Nvbm5lY3RlZDogdHJ1ZSB9KTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5pbnRlcnZhbEhhbmRsZXIoKTtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDIpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlJywgKCkgPT4ge1xuICAgIGl0KCdjYWxscyBzZXRTdGF0ZSB3aXRoIHRoZSBuZXcgY29ubmVjdGlvbiB2YWx1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vY2tTZXRTdGF0ZSA9IGplc3QuZm4oKTtcbiAgICAgIGNvbnN0IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHkgPSBtb2NrUHJvdG90eXBlTWV0aG9kcyh7XG4gICAgICAgIHNldFN0YXRlOiBtb2NrU2V0U3RhdGUsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBDb21wb25lbnQ6IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHksXG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSh7XG4gICAgICAgIHR5cGU6ICdvdGhlcicgYXMgTmV0SW5mb1N0YXRlVHlwZS5vdGhlcixcbiAgICAgICAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gICAgICAgIGlzSW50ZXJuZXRSZWFjaGFibGU6IHRydWUsXG4gICAgICAgIGRldGFpbHM6IHtcbiAgICAgICAgICBjZWxsdWxhckdlbmVyYXRpb246IG51bGwsXG4gICAgICAgICAgaXNDb25uZWN0aW9uRXhwZW5zaXZlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KG1vY2tTZXRTdGF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpc0Nvbm5lY3RlZDogdHJ1ZSB9KTtcblxuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSh7XG4gICAgICAgIHR5cGU6ICdub25lJyBhcyBOZXRJbmZvU3RhdGVUeXBlLm5vbmUsXG4gICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgaXNJbnRlcm5ldFJlYWNoYWJsZTogZmFsc2UsXG4gICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChtb2NrU2V0U3RhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaXNDb25uZWN0ZWQ6IGZhbHNlIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncGluZ1VybENoYW5nZScsICgpID0+IHtcbiAgICBpdCgnY2FsbHMgY2hlY2tJbnRlcm5ldCBpZiBwaW5nU2VydmVyVXJsIGNoYW5nZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihnZXRFbGVtZW50KCkpO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQgPSBtb2NrQ2hlY2tJbnRlcm5ldDtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIHdyYXBwZXIuc2V0UHJvcHMoeyBwaW5nU2VydmVyVXJsOiAnaHR0cHM6Ly9uZXdTZXJ2ZXJUb1BpbmcuY29tJyB9KTtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncHJvcHMgdmFsaWRhdGlvbicsICgpID0+IHtcbiAgICBpdCgndGhyb3dzIGlmIHByb3AgcGluZ1RpbWVvdXQgaXMgbm90IGEgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBwaW5nVGltZW91dDogJzQwMDAnLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgbnVtYmVyIGFzIHBpbmdUaW1lb3V0IHBhcmFtZXRlcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIHBpbmdTZXJ2ZXJVcmwgaXMgbm90IGEgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBwaW5nU2VydmVyVXJsOiA5MCwgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIHN0cmluZyBhcyBwaW5nU2VydmVyVXJsIHBhcmFtZXRlcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIHNob3VsZFBpbmcgaXMgbm90IGEgYm9vbGVhbicsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgc2hvdWxkUGluZzogKCkgPT4gbnVsbCwgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIGJvb2xlYW4gYXMgc2hvdWxkUGluZyBwYXJhbWV0ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBwaW5nSW50ZXJ2YWwgaXMgbm90IGEgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBwaW5nSW50ZXJ2YWw6IGZhbHNlLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgbnVtYmVyIGFzIHBpbmdJbnRlcnZhbCBwYXJhbWV0ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBwaW5nT25seUlmT2ZmbGluZSBpcyBub3QgYSBib29sZWFuJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBwaW5nT25seUlmT2ZmbGluZTogMTAsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBib29sZWFuIGFzIHBpbmdPbmx5SWZPZmZsaW5lIHBhcmFtZXRlcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIHBpbmdJbkJhY2tncm91bmQgaXMgbm90IGEgYm9vbGVhbicsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgcGluZ0luQmFja2dyb3VuZDogJzQwMDAnLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgc3RyaW5nIGFzIHBpbmdTZXJ2ZXJVcmwgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3AgaHR0cE1ldGhvZCBpcyBub3QgZWl0aGVyIEhFQUQgb3IgT1BUSU9OUycsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgaHR0cE1ldGhvZDogJ1BPU1QnLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygnaHR0cE1ldGhvZCBwYXJhbWV0ZXIgc2hvdWxkIGJlIGVpdGhlciBIRUFEIG9yIE9QVElPTlMnKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBvbkNvbm5lY3Rpdml0eUNoYW5nZSBpcyBub3QgYSBmdW5jdGlvbicsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgb25Db25uZWN0aXZpdHlDaGFuZ2U6ICdmb28nLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgZnVuY3Rpb24gYXMgb25Db25uZWN0aXZpdHlDaGFuZ2UgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=