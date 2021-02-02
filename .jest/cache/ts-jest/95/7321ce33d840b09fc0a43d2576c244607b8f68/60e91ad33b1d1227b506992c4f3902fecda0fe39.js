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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29ubmVjdGl2aXR5LnRlc3QudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBLElBQUksQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFO0lBQ3hDLE9BQUEsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztBQUFqQyxDQUFpQyxDQUNsQyxDQUFDO0FBdkNGLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sT0FBNkIsTUFBTSxpQ0FBaUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxtQkFFTixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxtQkFBbUIsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLE9BQU8sTUFBTSx3QkFBd0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWE1RCxJQUFNLDJCQUEyQixHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM5QyxJQUFNLDhCQUE4QixHQUFHLElBQUksQ0FBQyxFQUFFLENBQzVDLGNBQU0sT0FBQSwyQkFBMkIsRUFBM0IsQ0FBMkIsQ0FDbEMsQ0FBQztBQUNGLElBQU0sbUJB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LHVEQUF1RCxFQUFFO1lBQzFELE1BQU0sQ0FBQztnQkFDTCxPQUFBLE1BQU07Z0JBQ0osYUFBYTtnQkFDYixVQUFVLENBQUM7b0JBQ1QsS0FBSyxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTtpQkFDcEUsQ0FBQyxDQUNIO1lBTEQsQ0FLQyxDQUNGLENBQUMsT0FBTyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3QvTmV0d29ya0Nvbm5lY3Rpdml0eS50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmV0SW5mbywgeyBOZXRJbmZvU3RhdGVUeXBlIH0gZnJvbSAnQHJlYWN0LW5hdGl2ZS1jb21tdW5pdHkvbmV0aW5mbyc7XG5pbXBvcnQgeyBBcHBTdGF0ZSwgUGxhdGZvcm0sIFZpZXcgfSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IHsgc2hhbGxvdyB9IGZyb20gJ2VuenltZSc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1uYXRpdmUtdGVzdGluZy1saWJyYXJ5JztcbmltcG9ydCBOZXR3b3JrQ29ubmVjdGl2aXR5LCB7XG4gIFJlcXVpcmVkUHJvcHMsXG59IGZyb20gJy4uL2NvbXBvbmVudHMvTmV0d29ya0Nvbm5lY3Rpdml0eSc7XG5pbXBvcnQgeyBjbGVhciwgc2V0dXAgfSBmcm9tICcuLi91dGlscy9jaGVja0Nvbm5lY3Rpdml0eUludGVydmFsJztcbmltcG9ydCBjaGVja0ludGVybmV0QWNjZXNzIGZyb20gJy4uL3V0aWxzL2NoZWNrSW50ZXJuZXRBY2Nlc3MnO1xuaW1wb3J0IGVudHJpZXMgZnJvbSAnLi4vdXRpbHMvb2JqZWN0RW50cmllcyc7XG5pbXBvcnQgeyBERUZBVUxUX0NVU1RPTV9IRUFERVJTIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcblxudHlwZSBPcHRpb25hbFByb3BzID0gT21pdDxSZXF1aXJlZFByb3BzLCAnY2hpbGRyZW4nPjtcbnR5cGUgR2V0RWxlbWVudFBhcmFtczxQID0gYW55PiA9IHtcbiAgcHJvcHM/OiBQaWNrPFJlcXVpcmVkUHJvcHMsICdjaGlsZHJlbic+ICYgUGFydGlhbDxPcHRpb25hbFByb3BzPjtcbiAgQ29tcG9uZW50PzogUmVhY3QuQ29tcG9uZW50VHlwZTxQPjtcbn07XG5cbmludGVyZmFjZSBNZXRob2RzTWFwIHtcbiAgZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXI/OiBhbnk7XG4gIGludGVydmFsSGFuZGxlcj86IGFueTtcbiAgc2V0U3RhdGU/OiBhbnk7XG59XG5jb25zdCBtb2NrQ29ubmVjdGlvbkNoYW5nZUhhbmRsZXIgPSBqZXN0LmZuKCk7XG5jb25zdCBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIgPSBqZXN0LmZuKFxuICAoKSA9PiBtb2NrQ29ubmVjdGlvbkNoYW5nZUhhbmRsZXIsXG4pO1xuY29uc3QgbW9ja0ludGVydmFsSGFuZGxlciA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tIYW5kbGVOZXRJbmZvQ2hhbmdlID0gamVzdC5mbigpO1xuY29uc3QgbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tDaGVja0ludGVybmV0ID0gamVzdC5mbigpO1xuXG5jb25zdCBhZGRFdmVudExpc3RlbmVyID0gTmV0SW5mby5hZGRFdmVudExpc3RlbmVyIGFzIGplc3QuTW9jaztcbmNvbnN0IHVuc3Vic2NyaWJlID0gamVzdC5mbigpO1xuY29uc3QgZmV0Y2ggPSBOZXRJbmZvLmZldGNoIGFzIGplc3QuTW9jaztcbmplc3QubW9jaygnLi4vdXRpbHMvY2hlY2tDb25uZWN0aXZpdHlJbnRlcnZhbCcpO1xuamVzdC5tb2NrKCcuLi91dGlscy9jaGVja0ludGVybmV0QWNjZXNzJywgKCkgPT5cbiAgamVzdC5mbigpLm1vY2tSZXNvbHZlZFZhbHVlKHRydWUpLFxuKTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgY2xhc3MgdGhhdCBleHRlbmRzIE5ldHdvcmtDb25uZWN0aXZpdHlcbiAqIGFuZCBtb2NrcyB0aGUgc3BlY2lmaWMgbWV0aG9kcyBvbiB0aGUgcHJvdG90eXBlLFxuICogaW4gb3JkZXIgdG8gbm90IGFmZmVjdCB0aGUgcmVzdCBvZiB0aGUgdGVzdHNcbiAqIEBwYXJhbSBtZXRob2RzTWFwXG4gKiBAcmV0dXJucyB7Q2xhc3NXaXRoTW9ja3N9XG4gKi9cblxuZnVuY3Rpb24gbW9ja1Byb3RvdHlwZU1ldGhvZHMobWV0aG9kc01hcDogTWV0aG9kc01hcCA9IHt9IGFzIE1ldGhvZHNNYXApIHtcbiAgY2xhc3MgQ2xhc3NXaXRoTW9ja3MgZXh0ZW5kcyBOZXR3b3JrQ29ubmVjdGl2aXR5IHt9XG4gIGVudHJpZXMobWV0aG9kc01hcCkuZm9yRWFjaChcbiAgICAoW21ldGhvZCwgbW9ja0ZuXSkgPT4gKENsYXNzV2l0aE1vY2tzLnByb3RvdHlwZVttZXRob2RdID0gbW9ja0ZuKSxcbiAgKTtcbiAgcmV0dXJuIENsYXNzV2l0aE1vY2tzO1xufVxuXG5jb25zdCBDaGlsZHJlbkNvbXBvbmVudCA9ICgpID0+IDxWaWV3IC8+O1xuXG5jb25zdCBpbml0aWFsUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbn07XG5cbmNvbnN0IGdldEVsZW1lbnQgPSAoe1xuICBwcm9wcyA9IGluaXRpYWxQcm9wcyxcbiAgQ29tcG9uZW50ID0gTmV0d29ya0Nvbm5lY3Rpdml0eSxcbn06IEdldEVsZW1lbnRQYXJhbXMgPSB7fSkgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5yZXN0IH0gPSBwcm9wcztcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnJlc3R9PntjaGlsZHJlbn08L0NvbXBvbmVudD47XG59O1xuXG5kZXNjcmliZSgnTmV0d29ya0Nvbm5lY3Rpdml0eScsICgpID0+IHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBhZGRFdmVudExpc3RlbmVyLm1vY2tDbGVhcigpO1xuICAgIGZldGNoLm1vY2tDbGVhcigpO1xuICAgIG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlci5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIubW9ja0NsZWFyKCk7XG4gICAgbW9ja0ludGVydmFsSGFuZGxlci5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrSGFuZGxlTmV0SW5mb0NoYW5nZS5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlLm1vY2tDbGVhcigpO1xuICAgIG1vY2tDaGVja0ludGVybmV0Lm1vY2tDbGVhcigpO1xuICB9KTtcblxuICBpdCgnZGVmYXVsdFByb3BzJywgKCkgPT4ge1xuICAgIGV4cGVjdChOZXR3b3JrQ29ubmVjdGl2aXR5LmRlZmF1bHRQcm9wcykudG9NYXRjaFNuYXBzaG90KCk7XG4gIH0pO1xuXG4gIGl0KCdwYXNzZXMgdGhlIGNvbm5lY3Rpb24gc3RhdGUgaW50byB0aGUgRkFDQycsICgpID0+IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGplc3QuZm4oKTtcbiAgICBzaGFsbG93KGdldEVsZW1lbnQoeyBwcm9wczogeyBjaGlsZHJlbiB9IH0pKTtcbiAgICBleHBlY3QoY2hpbGRyZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjb21wb25lbnREaWRNb3VudCcsICgpID0+IHtcbiAgICBkZXNjcmliZSgnaU9TLCBwaW5nSW50ZXJ2YWwgPSAwJywgKCkgPT4ge1xuICAgICAgaXQoYHNldHMgdXAgYSBOZXRJbmZvLmlzQ29ubmVjdGVkIGxpc3RlbmVyIGZvciBjb25uZWN0aW9uQ2hhbmdlIFxuICAgICAgQU5EIGRvZXMgTk9UIGNhbGwgc2V0dXBDb25uZWN0aXZpdHlDaGVja0ludGVydmFsYCwgKCkgPT4ge1xuICAgICAgICBQbGF0Zm9ybS5PUyA9ICdpb3MnO1xuICAgICAgICBjb25zdCBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5ID0gbW9ja1Byb3RvdHlwZU1ldGhvZHMoe1xuICAgICAgICAgIGdldENvbm5lY3Rpb25DaGFuZ2VIYW5kbGVyOiBtb2NrR2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBzaGFsbG93KFxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgQ29tcG9uZW50OiBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5LFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgICBleHBlY3QoTmV0SW5mby5hZGRFdmVudExpc3RlbmVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgIGV4cGVjdChOZXRJbmZvLmFkZEV2ZW50TGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIG1vY2tDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcixcbiAgICAgICAgKTtcbiAgICAgICAgZXhwZWN0KHNldHVwKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGl0KGBjYWxscyBzZXR1cENvbm5lY3Rpdml0eUNoZWNrSW50ZXJ2YWwgd2l0aCB0aGUgcmlnaHQgYXJndW1lbnRzXG4gICAgIFdIRU4gcGluZ0ludGVydmFsIGlzIGhpZ2hlciB0aGFuIDBgLCAoKSA9PiB7XG4gICAgICBQbGF0Zm9ybS5PUyA9ICdpb3MnO1xuICAgICAgY29uc3QgTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSA9IG1vY2tQcm90b3R5cGVNZXRob2RzKHtcbiAgICAgICAgaW50ZXJ2YWxIYW5kbGVyOiBtb2NrSW50ZXJ2YWxIYW5kbGVyLFxuICAgICAgfSk7XG4gICAgICBzaGFsbG93KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBDb21wb25lbnQ6IE1vY2tlZE5ldHdvcmtDb25uZWN0aXZpdHksXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgICAgIHBpbmdJbnRlcnZhbDogMTAwMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICBleHBlY3Qoc2V0dXApLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NvbXBvbmVudFdpbGxVbm1vdW50JywgKCkgPT4ge1xuICAgIGl0KGByZW1vdmVzIHRoZSBOZXRJbmZvIGxpc3RlbmVyIHdpdGggdGhlIHJpZ2h0IHBhcmFtZXRlcnNcbiAgICAgIEFORCBjYWxsIGNvbm5lY3Rpdml0eUludGVydmFsLmNsZWFyYCwgKCkgPT4ge1xuICAgICAgKE5ldEluZm8uYWRkRXZlbnRMaXN0ZW5lciBhcyBqZXN0Lk1vY2spLm1vY2tSZXR1cm5WYWx1ZU9uY2UodW5zdWJzY3JpYmUpO1xuICAgICAgY29uc3QgTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSA9IG1vY2tQcm90b3R5cGVNZXRob2RzKHtcbiAgICAgICAgZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXI6IG1vY2tHZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcixcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3coXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIENvbXBvbmVudDogTW9ja2VkTmV0d29ya0Nvbm5lY3Rpdml0eSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci51bm1vdW50KCk7XG4gICAgICBleHBlY3QodW5zdWJzY3JpYmUpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgIGV4cGVjdChjbGVhcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhpcy5oYW5kbGVOZXRJbmZvQ2hhbmdlIHdoZW4gcHJvcHMuc2hvdWxkUGluZyA9IHRydWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgICAgIHNob3VsZFBpbmc6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZU5ldEluZm9DaGFuZ2UgPSBtb2NrSGFuZGxlTmV0SW5mb0NoYW5nZTtcbiAgICAgIGV4cGVjdCh3cmFwcGVyLmluc3RhbmNlKCkuZ2V0Q29ubmVjdGlvbkNoYW5nZUhhbmRsZXIoKSkudG9CZShcbiAgICAgICAgbW9ja0hhbmRsZU5ldEluZm9DaGFuZ2UsXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhpcy5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2Ugd2hlbiBwcm9wcy5zaG91bGRQaW5nID0gZmFsc2UnLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgICAgIHNob3VsZFBpbmc6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgPSBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlO1xuICAgICAgZXhwZWN0KHdyYXBwZXIuaW5zdGFuY2UoKS5nZXRDb25uZWN0aW9uQ2hhbmdlSGFuZGxlcigpKS50b0JlKFxuICAgICAgICBtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhbmRsZU5ldEluZm9DaGFuZ2UnLCAoKSA9PiB7XG4gICAgaXQoJ2NhbGxzIGhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSBpZiBpc0Nvbm5lY3RlZCBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KGdldEVsZW1lbnQoKSk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0ID0gbW9ja0NoZWNrSW50ZXJuZXQ7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlTmV0SW5mb0NoYW5nZSh7XG4gICAgICAgIHR5cGU6ICdub25lJyBhcyBOZXRJbmZvU3RhdGVUeXBlLm5vbmUsXG4gICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgaXNJbnRlcm5ldFJlYWNoYWJsZTogZmFsc2UsXG4gICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgIHR5cGU6ICdub25lJyBhcyBOZXRJbmZvU3RhdGVUeXBlLm5vbmUsXG4gICAgICAgIGlzQ29ubmVjdGVkOiBmYWxzZSxcbiAgICAgICAgaXNJbnRlcm5ldFJlYWNoYWJsZTogZmFsc2UsXG4gICAgICAgIGRldGFpbHM6IG51bGwsXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyBjaGVja0ludGVybmV0IGlmIGlzQ29ubmVjdGVkIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihnZXRFbGVtZW50KCkpO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSA9IG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2U7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCA9IG1vY2tDaGVja0ludGVybmV0O1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZU5ldEluZm9DaGFuZ2Uoe1xuICAgICAgICB0eXBlOiAnb3RoZXInIGFzIE5ldEluZm9TdGF0ZVR5cGUub3RoZXIsXG4gICAgICAgIGlzQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBpc0ludGVybmV0UmVhY2hhYmxlOiB0cnVlLFxuICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgY2VsbHVsYXJHZW5lcmF0aW9uOiBudWxsLFxuICAgICAgICAgIGlzQ29ubmVjdGlvbkV4cGVuc2l2ZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjaGVja0ludGVybmV0JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGVhcmx5IGlmIHBpbmdJZkJhY2tncm91bmQgPSBmYWxzZSBBTkQgYXBwIGlzIG5vdCBpbiB0aGUgZm9yZWdyb3VuZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIEFwcFN0YXRlLmN1cnJlbnRTdGF0ZSA9ICdiYWNrZ3JvdW5kJztcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PE5ldHdvcmtDb25uZWN0aXZpdHk+KFxuICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICAgICAgcGluZ0luQmFja2dyb3VuZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSA9IG1vY2tIYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2U7XG4gICAgICBhd2FpdCB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCgpO1xuICAgICAgZXhwZWN0KGNoZWNrSW50ZXJuZXRBY2Nlc3MpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICBleHBlY3QobW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KGBjYWxscyBjaGVja0ludGVybmV0QWNjZXNzIEFORCBoYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UgXG4gICAgd2l0aCB0aGUgcmlnaHQgYXJndW1lbnRzIGlmIGFwcCBpcyBpbiBmb3JlZ3JvdW5kYCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgIHBpbmdUaW1lb3V0OiAyMDAwLFxuICAgICAgICBwaW5nU2VydmVyVXJsOiAnZHVtbXkuY29tJyxcbiAgICAgICAgaHR0cE1ldGhvZDogJ09QVElPTlMnIGFzICdPUFRJT05TJyxcbiAgICAgICAgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50LFxuICAgICAgICBjdXN0b21IZWFkZXJzOiBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxuICAgICAgfTtcbiAgICAgIEFwcFN0YXRlLmN1cnJlbnRTdGF0ZSA9ICdhY3RpdmUnO1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIHByb3BzLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlID0gbW9ja0hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZTtcbiAgICAgIGF3YWl0IHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0KCk7XG4gICAgICBleHBlY3QoY2hlY2tJbnRlcm5ldEFjY2VzcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICB1cmw6IHByb3BzLnBpbmdTZXJ2ZXJVcmwsXG4gICAgICAgIHRpbWVvdXQ6IHByb3BzLnBpbmdUaW1lb3V0LFxuICAgICAgICBtZXRob2Q6IHByb3BzLmh0dHBNZXRob2QsXG4gICAgICAgIGN1c3RvbUhlYWRlcnM6IHByb3BzLmN1c3RvbUhlYWRlcnMsXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChtb2NrSGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgIGlzQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpbnRlcnZhbEhhbmRsZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZWFybHkgaWYgdGhlcmUgaXMgY29ubmVjdGlvbiBBTkQgcGluZ09ubHlJZk9mZmxpbmUgPSB0cnVlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oXG4gICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQsXG4gICAgICAgICAgICBwaW5nT25seUlmT2ZmbGluZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCA9IG1vY2tDaGVja0ludGVybmV0O1xuICAgICAgd3JhcHBlci5zZXRTdGF0ZSh7IGlzQ29ubmVjdGVkOiB0cnVlIH0pO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmludGVydmFsSGFuZGxlcigpO1xuICAgICAgZXhwZWN0KG1vY2tDaGVja0ludGVybmV0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoYGNhbGxzIGNoZWNrSW50ZXJuZXQgaWYgaXQncyBub3QgY29ubmVjdGVkIE9SIHBpbmdPbmx5SWZPZmZsaW5lID0gZmFsc2VgLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCxcbiAgICAgICAgICAgIHBpbmdPbmx5SWZPZmZsaW5lOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuY2hlY2tJbnRlcm5ldCA9IG1vY2tDaGVja0ludGVybmV0O1xuICAgICAgd3JhcHBlci5zZXRTdGF0ZSh7IGlzQ29ubmVjdGVkOiBmYWxzZSB9KTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5pbnRlcnZhbEhhbmRsZXIoKTtcbiAgICAgIGV4cGVjdChtb2NrQ2hlY2tJbnRlcm5ldCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXG4gICAgICB3cmFwcGVyLnNldFN0YXRlKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaW50ZXJ2YWxIYW5kbGVyKCk7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZScsICgpID0+IHtcbiAgICBpdCgnY2FsbHMgc2V0U3RhdGUgd2l0aCB0aGUgbmV3IGNvbm5lY3Rpb24gdmFsdWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtb2NrU2V0U3RhdGUgPSBqZXN0LmZuKCk7XG4gICAgICBjb25zdCBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5ID0gbW9ja1Byb3RvdHlwZU1ldGhvZHMoe1xuICAgICAgICBzZXRTdGF0ZTogbW9ja1NldFN0YXRlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxOZXR3b3JrQ29ubmVjdGl2aXR5PihcbiAgICAgICAgZ2V0RWxlbWVudCh7XG4gICAgICAgICAgQ29tcG9uZW50OiBNb2NrZWROZXR3b3JrQ29ubmVjdGl2aXR5LFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2Uoe1xuICAgICAgICB0eXBlOiAnb3RoZXInIGFzIE5ldEluZm9TdGF0ZVR5cGUub3RoZXIsXG4gICAgICAgIGlzQ29ubmVjdGVkOiB0cnVlLFxuICAgICAgICBpc0ludGVybmV0UmVhY2hhYmxlOiB0cnVlLFxuICAgICAgICBkZXRhaWxzOiB7XG4gICAgICAgICAgY2VsbHVsYXJHZW5lcmF0aW9uOiBudWxsLFxuICAgICAgICAgIGlzQ29ubmVjdGlvbkV4cGVuc2l2ZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChtb2NrU2V0U3RhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSk7XG5cbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2Uoe1xuICAgICAgICB0eXBlOiAnbm9uZScgYXMgTmV0SW5mb1N0YXRlVHlwZS5ub25lLFxuICAgICAgICBpc0Nvbm5lY3RlZDogZmFsc2UsXG4gICAgICAgIGlzSW50ZXJuZXRSZWFjaGFibGU6IGZhbHNlLFxuICAgICAgICBkZXRhaWxzOiBudWxsLFxuICAgICAgfSk7XG4gICAgICBleHBlY3QobW9ja1NldFN0YXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGlzQ29ubmVjdGVkOiBmYWxzZSB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3BpbmdVcmxDaGFuZ2UnLCAoKSA9PiB7XG4gICAgaXQoJ2NhbGxzIGNoZWNrSW50ZXJuZXQgaWYgcGluZ1NlcnZlclVybCBjaGFuZ2VzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8TmV0d29ya0Nvbm5lY3Rpdml0eT4oZ2V0RWxlbWVudCgpKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5jaGVja0ludGVybmV0ID0gbW9ja0NoZWNrSW50ZXJuZXQ7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB3cmFwcGVyLnNldFByb3BzKHsgcGluZ1NlcnZlclVybDogJ2h0dHBzOi8vbmV3U2VydmVyVG9QaW5nLmNvbScgfSk7XG4gICAgICBleHBlY3QobW9ja0NoZWNrSW50ZXJuZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Byb3BzIHZhbGlkYXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIHBpbmdUaW1lb3V0IGlzIG5vdCBhIG51bWJlcicsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgcGluZ1RpbWVvdXQ6ICc0MDAwJywgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIG51bWJlciBhcyBwaW5nVGltZW91dCBwYXJhbWV0ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBwaW5nU2VydmVyVXJsIGlzIG5vdCBhIHN0cmluZycsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgcGluZ1NlcnZlclVybDogOTAsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBzdHJpbmcgYXMgcGluZ1NlcnZlclVybCBwYXJhbWV0ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBzaG91bGRQaW5nIGlzIG5vdCBhIGJvb2xlYW4nLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IHNob3VsZFBpbmc6ICgpID0+IG51bGwsIGNoaWxkcmVuOiBDaGlsZHJlbkNvbXBvbmVudCB9LFxuICAgICAgICAgIH0pLFxuICAgICAgICApLFxuICAgICAgKS50b1Rocm93KCd5b3Ugc2hvdWxkIHBhc3MgYSBib29sZWFuIGFzIHNob3VsZFBpbmcgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3AgcGluZ0ludGVydmFsIGlzIG5vdCBhIG51bWJlcicsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgcGluZ0ludGVydmFsOiBmYWxzZSwgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIG51bWJlciBhcyBwaW5nSW50ZXJ2YWwgcGFyYW1ldGVyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3AgcGluZ09ubHlJZk9mZmxpbmUgaXMgbm90IGEgYm9vbGVhbicsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PlxuICAgICAgICByZW5kZXIoXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGdldEVsZW1lbnQoe1xuICAgICAgICAgICAgcHJvcHM6IHsgcGluZ09ubHlJZk9mZmxpbmU6IDEwLCBjaGlsZHJlbjogQ2hpbGRyZW5Db21wb25lbnQgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICkudG9UaHJvdygneW91IHNob3VsZCBwYXNzIGEgYm9vbGVhbiBhcyBwaW5nT25seUlmT2ZmbGluZSBwYXJhbWV0ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgcHJvcCBwaW5nSW5CYWNrZ3JvdW5kIGlzIG5vdCBhIGJvb2xlYW4nLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IHBpbmdJbkJhY2tncm91bmQ6ICc0MDAwJywgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIHN0cmluZyBhcyBwaW5nU2VydmVyVXJsIHBhcmFtZXRlcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm9wIGh0dHBNZXRob2QgaXMgbm90IGVpdGhlciBIRUFEIG9yIE9QVElPTlMnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IGh0dHBNZXRob2Q6ICdQT1NUJywgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ2h0dHBNZXRob2QgcGFyYW1ldGVyIHNob3VsZCBiZSBlaXRoZXIgSEVBRCBvciBPUFRJT05TJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHByb3Agb25Db25uZWN0aXZpdHlDaGFuZ2UgaXMgbm90IGEgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT5cbiAgICAgICAgcmVuZGVyKFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBnZXRFbGVtZW50KHtcbiAgICAgICAgICAgIHByb3BzOiB7IG9uQ29ubmVjdGl2aXR5Q2hhbmdlOiAnZm9vJywgY2hpbGRyZW46IENoaWxkcmVuQ29tcG9uZW50IH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgICApLnRvVGhyb3coJ3lvdSBzaG91bGQgcGFzcyBhIGZ1bmN0aW9uIGFzIG9uQ29ubmVjdGl2aXR5Q2hhbmdlIHBhcmFtZXRlcicpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInZlcnNpb24iOjN9