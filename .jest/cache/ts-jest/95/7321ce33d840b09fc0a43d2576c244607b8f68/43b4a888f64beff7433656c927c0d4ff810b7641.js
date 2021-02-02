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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29ubmVjdGl2aXR5LnRlc3QudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBLElBQUksQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFO0lBQ3hDLE9BQUEsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztBQUFqQyxDQUFpQyxDQUNsQyxDQUFDO0FBdkNGLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sT0FBNkIsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxtQkFFTixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxtQkFBbUIsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLE9BQU8sTUFBTSx3QkFBd0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWE1RCxJQUFNLDJCQUEyQixHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM5QyxJQUFNLDhCQUE4QixHQUFHLElBQUksQ0FBQyxFQUFFLENBQzVDLGNBQU0sT0FBQSwyQkFBMkIsRUFBM0IsQ0FBMkIsQ0FDbEMsQ0FBQztBQUNGLElBQU0sbUJB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UUFBUSxFQUFFLGlCQUFpQixFQUFFO2lCQUNwRSxDQUFDLENBQ0g7WUFMRCxDQUtDLENBQ0YsQ0FBQyxPQUFPLENBQUMsOERBQThELENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29ubmVjdGl2aXR5LnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOZXRJbmZvLCB7IE5ldEluZm9TdGF0ZVR5cGUgfSBmcm9tICdAcmVhY3QtbmF0aXZlLWNvbW11bml0eS9uZXRpbmZvJztcbmltcG9ydCB7IEFwcFN0YXRlLCBQbGF0Zm9ybSwgVmlldyB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgeyBzaGFsbG93IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LW5hdGl2ZS10ZXN0aW5nLWxpYnJhcnknO1xuaW1wb3J0IE5ldHdvcmtDb25uZWN0aXZpdHksIHtcbiAgUmVxdWlyZWRQcm9wcyxcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9OZXR3b3JrQ29ubmVjdGl2aXR5JztcbmltcG9ydCB7IGNsZWFyLCBzZXR1cCB9IGZyb20gJy4uL3V0aWxzL2NoZWNrQ29ubmVjdGl2aXR5SW50ZXJ2YWwnO1xuaW1wb3J0IGNoZWNrSW50ZXJuZXRBY2Nlc3MgZnJvbSAnLi4vdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcyc7XG5pbXBvcnQgZW50cmllcyBmcm9tICcuLi91dGlscy9vYmplY3RFbnRyaWVzJztcbmltcG9ydCB7IERFRkFVTFRfQ1VTVE9NX0hFQURFUlMgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG50eXBlIE9wdGlvbmFsUHJvcHMgPSBPbWl0PFJlcXVpcmVkUHJvcHMsICdjaGlsZHJlbic+O1xudHlwZSBHZXRFbGVtZW50UGFyYW1zPFAgPSBhbnk+ID0ge1xuICBwcm9wcz86IFBpY2s8UmVxdWlyZWRQcm9wcywgJ2NoaWxkcmVuJz4gJiBQYXJ0aWFsPE9wdGlvbmFsUHJvcHM+O1xuICBDb21wb25lbnQ/OiBSZWFjdC5Db21wb25lbnRUeXBlPFA+O1xufTtcblxuaW50ZXJmYWNlIE1ldGhvZHNNYXAge1xuICBnZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcj86IGFueTtcbiAgaW50ZXJ2YWxIYW5kbGVyPzogYW55O1xuICBzZXRTdGF0ZT86IGFueTtcbn1cbmNvbnN0IG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlciA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tHZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlciA9IGplc3QuZm4oXG4gICgpID0+IG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcixcbik7XG5jb25zdCBtb2NrSW50ZXJ2YWxIYW5kbGVyID0gamVzdC5mbigpO1xuY29uc3QgbW9ja0hhbmRsZU5ldEluZm9DaGFuZ2UgPSBqZXN0LmZuKCk7XG5jb25zdCBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gamVzdC5mbigpO1xuY29uc3QgbW9ja0NoZWNrSW50ZXJuZXQgPSBqZXN0LmZuKCk7XG5cbmNvbnN0IGFkZEV2ZW50TGlzdGVuZXIgPSBOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIgYXMgamVzdC5Nb2NrO1xuY29uc3QgdW5zdWJzY3JpYmUgPSBqZXN0LmZuKCk7XG5jb25zdCBmZXRjaCA9IE5ldEluZm8uZmV0Y2ggYXMgamVzdC5Nb2NrO1xuamVzdC5tb2NrKCcuLi91dGlscy9jaGVja0Nvbm5lY3Rpdml0eUludGVydmFsJyk7XG5qZXN0Lm1vY2soJy4uL3V0aWxzL2NoZWNrSW50ZXJuZXRBY2Nlc3MnLCAoKSA9PlxuICBqZXN0LmZuKCkubW9ja1Jlc29sdmVkVmFsdWUodHJ1ZSksXG4pO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBjbGFzcyB0aGF0IGV4dGVuZHMgTmV0d29ya0Nvbm5lY3Rpdml0eVxuICogYW5kIG1vY2tzIHRoZSBzcGVjaWZpYyBtZXRob2RzIG9uIHRoZSBwcm90b3R5cGUsXG4gKiBpbiBvcmRlciB0byBub3QgYWZmZWN0IHRoZSByZXN0IG9mIHRoZSB0ZXN0c1xuICogQHBhcmFtIG1ldGhvZHNNYXBcbiAqIEByZXR1cm5zIHtDbGFzc1dpdGhNb2Nrc31cbiAqL1xuXG5mdW5jdGlvbiBtb2NrUHJvdG90eXBlTWV0aG9kcyhtZXRob2RzTWFwOiBNZXRob2RzTWFwID0ge30gYXMgTWV0aG9kc01hcCkge1xuICBjbGFzcyBDbGFzc1dpdGhNb2NrcyBleHRlbmRzIE5ldHdvcmtDb25uZWN0aXZpdHkge31cbiAgZW50cmllcyhtZXRob2RzTWFwKS5mb3JFYWNoKFxuICAgIChbbWV0aG9kLCBtb2NrRm5dKSA9PiAoQ2xhc3NXaXRoTW9ja3MucHJvdG90eXBlW21ldGhvZF0gPSBtb2NrRm4pLFxuICApO1xuICByZXR1cm4gQ2xhc3NXaXRoTW9ja3M7XG59XG5cbmNvbnN0IENoaWxkcmVuQ29tcG9uZW50ID0gKCkgPT4gPFZpZXcgLz47XG5cbmNvbnN0IGluaXRpYWxQcm9wcyA9IHtcbiAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxufTtcblxuY29uc3QgZ2V0RWxlbWVudCA9ICh7XG4gIHByb3BzID0gaW5pdGlhbFByb3BzLFxuICBDb21wb25lbnQgPSBOZXR3b3JrQ29ubmVjdGl2aXR5LFxufTogR2V0RWxlbWVudFBhcmFtcyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnJlc3QgfSA9IHByb3BzO1xuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucmVzdH0+e2NoaWxkcmVufTwvQ29tcG9uZW50Pjtcbn07XG5cbmRlc2NyaWJlKCdOZXR3b3JrQ29ubmVjdGl2aXR5JywgKCkgPT4ge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIubW9ja0NsZWFyKCk7XG4gICAgZmV0Y2gubW9ja0NsZWFyKCk7XG4gICAgbW9ja0Nvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyLm1vY2tDbGVhcigpO1xuICAgIG1vY2tHZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlci5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrSW50ZXJ2YWxIYW5kbGVyLm1vY2tDbGVhcigpO1xuICAgIG1vY2tIYW5kbGVOZXRJbmZvQ2hhbmdlLm1vY2tDbGVhcigpO1xuICAgIG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UubW9ja0NsZWFyKCk7XG4gICAgbW9ja0NoZWNrSW50ZXJuZXQubW9ja0NsZWFyKCk7XG4gIH0pO1xuXG4gIGl0KCdkZWZhdWx0UHJvcHMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KE5ldHdvcmtDb25uZWN0aXZpdHkuZGVmYXVsdFByb3BzKS50b01hdGNoU25hcHNob3QoKTtcbiAgfSk7XG5cbiAgaXQoJ3Bhc3NlcyB0aGUgY29ubmVjdGlvbiBzdGF0ZSBpbnRvIHRoZSBGQUNDJywgKCkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gamVzdC5mbigpO1xuICAgIHNoYWxsb3coZ2V0RWxlbWVudCh7IHByb3BzOiB7IGNoaWxkcmVuIH0gfSkpO1xuICAgIGV4cGVjdChjaGlsZHJlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpc0Nvbm5lY3RlZDogdHJ1ZSB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NvbXBvbmVudERpZE1vdW50JywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCdpT1MsIHBpbmdJbnRlcnZhbCA9IDAnLCAoKSA9PiB7XG4gICAgICBpdChgc2V0cyB1cCBhIE5ldEluZm8uaXNDb25uZWN0ZWQgbGlzdGVuZXIgZm9yIGNvbm5lY3Rpb25DaGFuZ2UgXG4gICAgICBBTkQgZG9lcyBOT1QgY2FsbCBzZXR1cENvbm5lY3Rpdml0eUNoZWNrSW50ZXJ2YWxgLCAoKSA9PiB7XG4gICAgICAgIFBsYXRmb3JtLk9TID0gJ2lvcyc7XG4gICAgICAgIGNvbnN0IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHkgPSBtb2NrUHJvdG90eXBlTWV0aG9kcyh7XG4gICAgICAgICAgZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXI6IG1vY2tHZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcixcbiAgICAgICAgfSk7XG4gICAgICAgIHNoYWxsb3coXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBDb21wb25lbnQ6IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHksXG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICAgIGV4cGVjdChOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgZXhwZWN0KE5ldEluZm8uYWRkRXZlbnRMaXN0ZW5lcikudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgbW9ja0Nvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyLFxuICAgICAgICApO1xuICAgICAgICBleHBlY3Qoc2V0dXApLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdBbmRyb2lkLCBwaW5nSW50ZXJ2YWwgPSAwJywgKCkgPT4ge1xuICAgICAgaXQoYHNldHMgdXAgYSBOZXRJbmZvLmlzQ29ubmVjdGVkIGxpc3RlbmVyIGZvciBjb25uZWN0aW9uQ2hhbmdlXG4gICAgICBBTkQgZmV0Y2hlcyBpbml0aWFsIGNvbm5lY3Rpb25cbiAgICAgIEFORCBjYWxscyB0aGUgaGFuZGxlclxuICAgICAgQU5EIGRvZXMgTk9UIGNhbGwgc2V0dXBDb25uZWN0aXZpdHlDaGVja0ludGVydmFsYCwgKGRvbmU6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIGZldGNoLm1vY2tJbXBsZW1lbnRhdGlvbk9uY2UoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKSk7XG4gICAgICAgIFBsYXRmb3JtLk9TID0gJ2FuZHJvaWQnO1xuICAgICAgICBjb25zdCBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5ID0gbW9ja1Byb3RvdHlwZU1ldGhvZHMoe1xuICAgICAgICAgIGdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyOiBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBzaGFsbG93KFxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgQ29tcG9uZW50OiBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5LFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBleHBlY3QoTmV0SW5mby5hZGRFdmVudExpc3RlbmVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgIGV4cGVjdChOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcixcbiAgICAgICAgKTtcbiAgICAgICAgZXhwZWN0KE5ldEluZm8uZmV0Y2gpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmFsc2UpO1xuICAgICAgICAgIGV4cGVjdChzZXR1cCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdChgY2FsbHMgc2V0dXBDb25uZWN0aXZpdHlDaGVja0ludGVydmFsIHdpdGggdGhlIHJpZ2h0IGFyZ3VtZW50c1xuICAgICBXSEVOIHBpbmdJbnRlcnZhbCBpcyBoaWdoZXIgdGhhbiAwYCwgKCkgPT4ge1xuICAgICAgUGxhdGZvcm0uT1MgPSAnaW9zJztcbiAgICAgIGNvbnN0IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHkgPSBtb2NrUHJvdG90eXBlTWV0aG9kcyh7XG4gICAgICAgIGludGVydmFsSGFuZGxlcjogbW9ja0ludGVydmFsSGFuZGxlcixcbiAgICAgIH0pO1xuICAgICAgc2hhbGxvdyhcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgQ29tcG9uZW50OiBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICBwaW5nSW50ZXJ2YWw6IDEwMDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgZXhwZWN0KHNldHVwKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjb21wb25lbnRXaWxsVW5tb3VudCcsICgpID0+IHtcbiAgICBpdChgcmVtb3ZlcyB0aGUgTmV0SW5mbyBsaXN0ZW5lciB3aXRoIHRoZSByaWdodCBwYXJhbWV0ZXJzXG4gICAgICBBTkQgY2FsbCBjb25uZWN0aXZpdHlJbnRlcnZhbC5jbGVhcmAsICgpID0+IHtcbiAgICAgIChOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIgYXMgamVzdC5Nb2NrKS5tb2NrUmV0dXJuVmFsdWVPbmNlKHVuc3Vic2NyaWJlKTtcbiAgICAgIGNvbnN0IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHkgPSBtb2NrUHJvdG90eXBlTWV0aG9kcyh7XG4gICAgICAgIGdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyOiBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBDb21wb25lbnQ6IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHksXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIudW5tb3VudCgpO1xuICAgICAgZXhwZWN0KHVuc3Vic2NyaWJlKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICBleHBlY3QoY2xlYXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoaXMuaGFuZGxlTmV0SW5mb0NoYW5nZSB3aGVuIHByb3BzLnNob3VsZFBpbmcgPSB0cnVlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICBzaG91bGRQaW5nOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVOZXRJbmZvQ2hhbmdlID0gbW9ja0hhbmRsZU5ldEluZm9DaGFuZ2U7XG4gICAgICBleHBlY3Qod3JhcHBlci5pbnN0YW5jZSgpLmdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyKCkpLnRvQmUoXG4gICAgICAgIG1vY2tIYW5kbGVOZXRJbmZvQ2hhbmdlLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRoaXMuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlIHdoZW4gcHJvcHMuc2hvdWxkUGluZyA9IGZhbHNlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICBzaG91bGRQaW5nOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZTtcbiAgICAgIGV4cGVjdCh3cmFwcGVyLmluc3RhbmNlKCkuZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIoKSkudG9CZShcbiAgICAgICAgbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVOZXRJbmZvQ2hhbmdlJywgKCkgPT4ge1xuICAgIGl0KCdjYWxscyBoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgaWYgaXNDb25uZWN0ZWQgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihnZXRFbGVtZW50KCkpO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSA9IG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2U7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCA9IG1vY2tDaGVja0ludGVybmV0O1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZU5ldEluZm9DaGFuZ2Uoe1xuICAgICAgICB0eXBlOiAnbm9uZScgYXMgTmV0SW5mb1N0YXRlVHlwZS5ub25lLFxuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGlzSW50ZXJuZXRSZWFjaGFibGU6IGZhbHNlLFxuICAgICAgICBkZXRhaWxzOiBudWxsLFxuICAgICAgfSk7XG4gICAgICBleHBlY3QobW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICB0eXBlOiAnbm9uZScgYXMgTmV0SW5mb1N0YXRlVHlwZS5ub25lLFxuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGlzSW50ZXJuZXRSZWFjaGFibGU6IGZhbHNlLFxuICAgICAgICBkZXRhaWxzOiBudWxsLFxuICAgICAgfSk7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FsbHMgY2hlY2tJbnRlcm5ldCBpZiBpc0Nvbm5lY3RlZCBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oZ2V0RWxlbWVudCgpKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQgPSBtb2NrQ2hlY2tJbnRlcm5ldDtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVOZXRJbmZvQ2hhbmdlKHtcbiAgICAgICAgdHlwZTogJ290aGVyJyBhcyBOZXRJbmZvU3RhdGVUeXBlLm90aGVyLFxuICAgICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgaXNJbnRlcm5ldFJlYWNoYWJsZTogdHJ1ZSxcbiAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgIGNlbGx1bGFyR2VuZXJhdGlvbjogbnVsbCxcbiAgICAgICAgICBpc0Nvbm5lY3Rpb25FeHBlbnNpdmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBleHBlY3QobW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2hlY2tJbnRlcm5ldCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBlYXJseSBpZiBwaW5nSWZCYWNrZ3JvdW5kID0gZmFsc2UgQU5EIGFwcCBpcyBub3QgaW4gdGhlIGZvcmVncm91bmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBBcHBTdGF0ZS5jdXJyZW50U3RhdGUgPSAnYmFja2dyb3VuZCc7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgICAgIHBpbmdJbkJhY2tncm91bmQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlO1xuICAgICAgYXdhaXQgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQoKTtcbiAgICAgIGV4cGVjdChjaGVja0ludGVybmV0QWNjZXNzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgZXhwZWN0KG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdChgY2FsbHMgY2hlY2tJbnRlcm5ldEFjY2VzcyBBTkQgaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlIFxuICAgIHdpdGggdGhlIHJpZ2h0IGFyZ3VtZW50cyBpZiBhcHAgaXMgaW4gZm9yZWdyb3VuZGAsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgICBwaW5nVGltZW91dDogMjAwMCxcbiAgICAgICAgcGluZ1NlcnZlclVybDogJ2R1bW15LmNvbScsXG4gICAgICAgIGh0dHBNZXRob2Q6ICdPUFRJT05TJyBhcyAnT1BUSU9OUycsXG4gICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgY3VzdG9tSGVhZGVyczogREVGQVVMVF9DVVNUT01fSEVBREVSUyxcbiAgICAgIH07XG4gICAgICBBcHBTdGF0ZS5jdXJyZW50U3RhdGUgPSAnYWN0aXZlJztcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBwcm9wcyxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSA9IG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2U7XG4gICAgICBhd2FpdCB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCgpO1xuICAgICAgZXhwZWN0KGNoZWNrSW50ZXJuZXRBY2Nlc3MpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgdXJsOiBwcm9wcy5waW5nU2VydmVyVXJsLFxuICAgICAgICB0aW1lb3V0OiBwcm9wcy5waW5nVGltZW91dCxcbiAgICAgICAgbWV0aG9kOiBwcm9wcy5odHRwTWV0aG9kLFxuICAgICAgICBjdXN0b21IZWFkZXJzOiBwcm9wcy5jdXN0b21IZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICBleHBlY3QobW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaW50ZXJ2YWxIYW5kbGVyJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGVhcmx5IGlmIHRoZXJlIGlzIGNvbm5lY3Rpb24gQU5EIHBpbmdPbmx5SWZPZmZsaW5lID0gdHJ1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICAgICAgcGluZ09ubHlJZk9mZmxpbmU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQgPSBtb2NrQ2hlY2tJbnRlcm5ldDtcbiAgICAgIHdyYXBwZXIuc2V0U3RhdGUoeyBpc0Nvbm5lY3RlZDogdHJ1ZSB9KTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5pbnRlcnZhbEhhbmRsZXIoKTtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KGBjYWxscyBjaGVja0ludGVybmV0IGlmIGl0J3Mgbm90IGNvbm5lY3RlZCBPUiBwaW5nT25seUlmT2ZmbGluZSA9IGZhbHNlYCwgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICBwaW5nT25seUlmT2ZmbGluZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmNoZWNrSW50ZXJuZXQgPSBtb2NrQ2hlY2tJbnRlcm5ldDtcbiAgICAgIHdyYXBwZXIuc2V0U3RhdGUoeyBpc0Nvbm5lY3RlZDogZmFsc2UgfSk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaW50ZXJ2YWxIYW5kbGVyKCk7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcblxuICAgICAgd3JhcHBlci5zZXRTdGF0ZSh7IGlzQ29ubmVjdGVkOiB0cnVlIH0pO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmludGVydmFsSGFuZGxlcigpO1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UnLCAoKSA9PiB7XG4gICAgaXQoJ2NhbGxzIHNldFN0YXRlIHdpdGggdGhlIG5ldyBjb25uZWN0aW9uIHZhbHVlJywgKCkgPT4ge1xuICAgICAgY29uc3QgbW9ja1NldFN0YXRlID0gamVzdC5mbigpO1xuICAgICAgY29uc3QgTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSA9IG1vY2tQcm90b3R5cGVNZXRob2RzKHtcbiAgICAgICAgc2V0U3RhdGU6IG1vY2tTZXRTdGF0ZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIENvbXBvbmVudDogTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSxcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKHtcbiAgICAgICAgdHlwZTogJ290aGVyJyBhcyBOZXRJbmZvU3RhdGVUeXBlLm90aGVyLFxuICAgICAgICBpc0Nvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgaXNJbnRlcm5ldFJlYWNoYWJsZTogdHJ1ZSxcbiAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgIGNlbGx1bGFyR2VuZXJhdGlvbjogbnVsbCxcbiAgICAgICAgICBpc0Nvbm5lY3Rpb25FeHBlbnNpdmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBleHBlY3QobW9ja1NldFN0YXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGlzQ29ubmVjdGVkOiB0cnVlIH0pO1xuXG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKHtcbiAgICAgICAgdHlwZTogJ25vbmUnIGFzIE5ldEluZm9TdGF0ZVR5cGUubm9uZSxcbiAgICAgICAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBpc0ludGVybmV0UmVhY2hhYmxlOiBmYWxzZSxcbiAgICAgICAgZGV0YWlsczogbnVsbCxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KG1vY2tTZXRTdGF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpc0Nvbm5lY3RlZDogZmFsc2UgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdwaW5nVXJsQ2hhbmdlJywgKCkgPT4ge1xuICAgIGl0KCdjYWxscyBjaGVja0ludGVybmV0IGlmIHBpbmdTZXJ2ZXJVcmwgY2hhbmdlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KGdldEVsZW1lbnQoKSk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCA9IG1vY2tDaGVja0ludGVybmV0O1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgd3JhcHBlci5zZXRQcm9wcyh7IHBpbmdTZXJ2ZXJVcmw6ICdodHRwczovL25ld1NlcnZlclRvUGluZy5jb20nIH0pO1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdwcm9wcyB2YWxpZGF0aW9uJywgKCkgPT4ge1xuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBwaW5nVGltZW91dCBpcyBub3QgYSBudW1iZXInLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IHBpbmdUaW1lb3V0OiAnNDAwMCcsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBudW1iZXIgYXMgcGluZ1RpbWVvdXQgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3AgcGluZ1NlcnZlclVybCBpcyBub3QgYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IHBpbmdTZXJ2ZXJVcmw6IDkwLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgc3RyaW5nIGFzIHBpbmdTZXJ2ZXJVcmwgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3Agc2hvdWxkUGluZyBpcyBub3QgYSBib29sZWFuJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBzaG91bGRQaW5nOiAoKSA9PiBudWxsLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgYm9vbGVhbiBhcyBzaG91bGRQaW5nIHBhcmFtZXRlcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIHBpbmdJbnRlcnZhbCBpcyBub3QgYSBudW1iZXInLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IHBpbmdJbnRlcnZhbDogZmFsc2UsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBudW1iZXIgYXMgcGluZ0ludGVydmFsIHBhcmFtZXRlcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIHBpbmdPbmx5SWZPZmZsaW5lIGlzIG5vdCBhIGJvb2xlYW4nLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IHBpbmdPbmx5SWZPZmZsaW5lOiAxMCwgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIGJvb2xlYW4gYXMgcGluZ09ubHlJZk9mZmxpbmUgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3AgcGluZ0luQmFja2dyb3VuZCBpcyBub3QgYSBib29sZWFuJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBwaW5nSW5CYWNrZ3JvdW5kOiAnNDAwMCcsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBzdHJpbmcgYXMgcGluZ1NlcnZlclVybCBwYXJhbWV0ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBodHRwTWV0aG9kIGlzIG5vdCBlaXRoZXIgSEVBRCBvciBPUFRJT05TJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBodHRwTWV0aG9kOiAnUE9TVCcsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCdodHRwTWV0aG9kIHBhcmFtZXRlciBzaG91bGQgYmUgZWl0aGVyIEhFQUQgb3IgT1BUSU9OUycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIG9uQ29ubmVjdGl2aXR5Q2hhbmdlIGlzIG5vdCBhIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgIHJlbmRlcihcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgICBwcm9wczogeyBvbkNvbm5lY3Rpdml0eUNoYW5nZTogJ2ZvbycsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBmdW5jdGlvbiBhcyBvbkNvbm5lY3Rpdml0eUNoYW5nZSBwYXJhbWV0ZXInKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==