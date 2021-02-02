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
import makeHttpRequest, { headers } from '../utils/makeHttpRequest';
import { DEFAULT_HTTP_METHOD, DEFAULT_PING_SERVER_URL, DEFAULT_TIMEOUT, } from '../utils/constants';
var mockOpen = jest.fn();
var mockSetRequestHeader = jest.fn();
var mockSend = jest.fn();
var mockSetTimeout = jest.fn();
var mockOnLoad = jest.fn();
var mockOnError = jest.fn();
var mockOnTimeout = jest.fn();
// @ts-ignore
global.XMLHttpRequest = /** @class */ (function () {
    function MockXMLHttpRequest(callbackToFire) {
        if (callbackToFire === void 0) { callbackToFire = ''; }
        // @ts-ignore
        this.status = 0;
        // @ts-ignore
        this.t = 0;
        this.callbackToFire = callbackToFire;
        switch (callbackToFire) {
            case 'onload/2xx':
                this.status = 200;
                break;
            case 'onload/3xx':
                this.status = 304;
                break;
            case 'onload/4xx':
                this.status = 403;
                break;
            case 'onload/5xx':
                this.status = 500;
                break;
            case 'onerror':
            case 'ontimeout':
                this.status = -1;
                break;
            default:
                this.status = 0;
        }
    }
    Object.defineProperty(MockXMLHttpRequest.prototype, "timeout", {
        set: function (t) {
            mockSetTimeout(t);
            this.t = t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockXMLHttpRequest.prototype, "onload", {
        set: function (fn) {
            mockOnLoad();
            if (this.callbackToFire.includes('onload')) {
                fn.call(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockXMLHttpRequest.prototype, "onerror", {
        set: function (fn) {
            mockOnError();
            if (this.callbackToFire === 'onerror') {
                fn.call(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockXMLHttpRequest.prototype, "ontimeout", {
        set: function (fn) {
            mockOnTimeout();
            if (this.callbackToFire === 'ontimeout') {
                fn.call(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return MockXMLHttpRequest;
}());
// @ts-ignore
global.XMLHttpRequest.prototype.open = mockOpen;
// @ts-ignore
global.XMLHttpRequest.prototype.setRequestHeader = mockSetRequestHeader;
// @ts-ignore
global.XMLHttpRequest.prototype.send = mockSend;
describe('makeHttpRequest', function () {
    afterEach(function () {
        mockOpen.mockClear();
        mockSend.mockClear();
        mockSetTimeout.mockClear();
        mockSetRequestHeader.mockClear();
        mockOnLoad.mockClear();
        mockOnError.mockClear();
        mockOnTimeout.mockClear();
    });
    var params = {
        method: 'HEAD',
        url: 'foo.com',
        timeout: 5000,
    };
    it('sets up the XMLHttpRequest configuration properly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var headerKeys;
        return __generator(this, function (_a) {
            headerKeys = Object.keys(headers);
            makeHttpRequest(params);
            expect(mockOpen).toHaveBeenCalledWith(params.method, params.url);
            expect(mockSetTimeout).toHaveBeenCalledWith(params.timeout);
            expect(mockOnLoad).toHaveBeenCalledTimes(1);
            expect(mockOnError).toHaveBeenCalledTimes(1);
            expect(mockOnTimeout).toHaveBeenCalledTimes(1);
            expect(mockSetRequestHeader).toHaveBeenCalledTimes(3);
            headerKeys.forEach(function (key, index) {
                var k = key;
                expect(mockSetRequestHeader).toHaveBeenNthCalledWith(index + 1, k, headers[k]);
            });
            expect(mockSend).toHaveBeenCalledWith(null);
            return [2 /*return*/];
        });
    }); });
    it('accepts custom headers', function () {
        makeHttpRequest(__assign(__assign({}, params), { customHeaders: { foo: 'bar' } }));
        expect(mockSetRequestHeader).toHaveBeenNthCalledWith(4, 'foo', 'bar');
    });
    it('default parameters', function () {
        makeHttpRequest();
        expect(mockOpen).toHaveBeenCalledWith(DEFAULT_HTTP_METHOD, DEFAULT_PING_SERVER_URL);
        expect(mockSetTimeout).toHaveBeenCalledWith(DEFAULT_TIMEOUT);
    });
    describe('onload', function () {
        it('resolves the promise if status is 2xx or 3xx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeHttpRequest(__assign(__assign({}, params), { testMethod: 'onload/2xx' }))];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({ status: 200 });
                        return [4 /*yield*/, makeHttpRequest(__assign(__assign({}, params), { testMethod: 'onload/3xx' }))];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual({ status: 304 });
                        return [2 /*return*/];
                }
            });
        }); });
        it('rejects the promise if status is 4xx or 5xx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, makeHttpRequest(__assign(__assign({}, params), { testMethod: 'onload/4xx' }))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        expect(e_1).toEqual({ status: 403 });
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, makeHttpRequest(__assign(__assign({}, params), { testMethod: 'onload/5xx' }))];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        expect(e_2).toEqual({ status: 500 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('onerror', function () {
        it('rejects the promise with the xhr status', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, makeHttpRequest(__assign(__assign({}, params), { testMethod: 'onerror' }))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        expect(e_3).toEqual({ status: -1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ontimeout', function () {
        it('rejects the promise with the xhr status', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, makeHttpRequest(__assign(__assign({}, params), { testMethod: 'ontimeout' }))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        expect(e_4).toEqual({ status: -1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9tYWtlSHR0cFJlcXVlc3QudGVzdC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUNMLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIsZUFBZSxHQUNoQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUMzQixJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUN2QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDM0IsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUM3QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDOUIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBSWhDLGFBQWE7QUFDYixNQUFNLENBQUMsY0FBYztJQVNuQiw0QkFBWSxjQUFtQjtRQUFuQiwrQkFBQSxFQUFBLG1CQUFtQjtRQVIvQixhQUFhO1FBQ0wsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVuQixhQUFhO1FBQ0wsTUFBQyxHQUFHLENBQUMsQ0FBQztRQUtaLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLFFBQVEsY0FBYyxFQUFFO1lBQ3RCLEtBQUssWUFBWTtnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDbEIsTUFBTTtZQUNSLEtBQUssWUFBWTtnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFH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Ozt3QkFIRixTQUdFLENBQUM7Ozs7d0JBRUgsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7O2FBRXJDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7Ozt3QkFFMUMscUJBQU0sZUFBZSx1QkFDaEIsTUFBTSxLQUNULFVBQVUsRUFBRSxXQUFXLElBQ3ZCLEVBQUE7O3dCQUhGLFNBR0UsQ0FBQzs7Ozt3QkFFSCxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7Ozs7YUFFckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMvRGV2QUMvRGVza3RvcC9BbmdhemEvcmVhY3Qtb2ZmbGluZS1zeW5jL3NyYy90ZXN0L21ha2VIdHRwUmVxdWVzdC50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYWtlSHR0cFJlcXVlc3QsIHsgaGVhZGVycyB9IGZyb20gJy4uL3V0aWxzL21ha2VIdHRwUmVxdWVzdCc7XG5pbXBvcnQge1xuICBERUZBVUxUX0hUVFBfTUVUSE9ELFxuICBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgREVGQVVMVF9USU1FT1VULFxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5jb25zdCBtb2NrT3BlbiA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tTZXRSZXF1ZXN0SGVhZGVyID0gamVzdC5mbigpO1xuY29uc3QgbW9ja1NlbmQgPSBqZXN0LmZuKCk7XG5jb25zdCBtb2NrU2V0VGltZW91dCA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tPbkxvYWQgPSBqZXN0LmZuKCk7XG5jb25zdCBtb2NrT25FcnJvciA9IGplc3QuZm4oKTtcbmNvbnN0IG1vY2tPblRpbWVvdXQgPSBqZXN0LmZuKCk7XG5cbnR5cGUgRm4gPSAoKSA9PiBhbnk7XG5cbi8vIEB0cy1pZ25vcmVcbmdsb2JhbC5YTUxIdHRwUmVxdWVzdCA9IGNsYXNzIE1vY2tYTUxIdHRwUmVxdWVzdCB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBzdGF0dXMgPSAwO1xuXG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSB0ID0gMDtcblxuICBwcml2YXRlIGNhbGxiYWNrVG9GaXJlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2FsbGJhY2tUb0ZpcmUgPSAnJykge1xuICAgIHRoaXMuY2FsbGJhY2tUb0ZpcmUgPSBjYWxsYmFja1RvRmlyZTtcbiAgICBzd2l0Y2ggKGNhbGxiYWNrVG9GaXJlKSB7XG4gICAgICBjYXNlICdvbmxvYWQvMnh4JzpcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAyMDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb25sb2FkLzN4eCc6XG4gICAgICAgIHRoaXMuc3RhdHVzID0gMzA0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29ubG9hZC80eHgnOlxuICAgICAgICB0aGlzLnN0YXR1cyA9IDQwMztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvbmxvYWQvNXh4JzpcbiAgICAgICAgdGhpcy5zdGF0dXMgPSA1MDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb25lcnJvcic6XG4gICAgICBjYXNlICdvbnRpbWVvdXQnOlxuICAgICAgICB0aGlzLnN0YXR1cyA9IC0xO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcbiAgICB9XG4gIH1cblxuICBzZXQgdGltZW91dCh0OiBudW1iZXIpIHtcbiAgICBtb2NrU2V0VGltZW91dCh0KTtcbiAgICB0aGlzLnQgPSB0O1xuICB9XG5cbiAgc2V0IG9ubG9hZChmbjogRm4pIHtcbiAgICBtb2NrT25Mb2FkKCk7XG4gICAgaWYgKHRoaXMuY2FsbGJhY2tUb0ZpcmUuaW5jbHVkZXMoJ29ubG9hZCcpKSB7XG4gICAgICBmbi5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHNldCBvbmVycm9yKGZuOiBGbikge1xuICAgIG1vY2tPbkVycm9yKCk7XG4gICAgaWYgKHRoaXMuY2FsbGJhY2tUb0ZpcmUgPT09ICdvbmVycm9yJykge1xuICAgICAgZm4uY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzZXQgb250aW1lb3V0KGZuOiBGbikge1xuICAgIG1vY2tPblRpbWVvdXQoKTtcbiAgICBpZiAodGhpcy5jYWxsYmFja1RvRmlyZSA9PT0gJ29udGltZW91dCcpIHtcbiAgICAgIGZuLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBAdHMtaWdub3JlXG5nbG9iYWwuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBtb2NrT3Blbjtcbi8vIEB0cy1pZ25vcmVcbmdsb2JhbC5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2V0UmVxdWVzdEhlYWRlciA9IG1vY2tTZXRSZXF1ZXN0SGVhZGVyO1xuLy8gQHRzLWlnbm9yZVxuZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kID0gbW9ja1NlbmQ7XG5cbmRlc2NyaWJlKCdtYWtlSHR0cFJlcXVlc3QnLCAoKSA9PiB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgbW9ja09wZW4ubW9ja0NsZWFyKCk7XG4gICAgbW9ja1NlbmQubW9ja0NsZWFyKCk7XG4gICAgbW9ja1NldFRpbWVvdXQubW9ja0NsZWFyKCk7XG4gICAgbW9ja1NldFJlcXVlc3RIZWFkZXIubW9ja0NsZWFyKCk7XG4gICAgbW9ja09uTG9hZC5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrT25FcnJvci5tb2NrQ2xlYXIoKTtcbiAgICBtb2NrT25UaW1lb3V0Lm1vY2tDbGVhcigpO1xuICB9KTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIG1ldGhvZDogJ0hFQUQnIGFzICdIRUFEJyxcbiAgICB1cmw6ICdmb28uY29tJyxcbiAgICB0aW1lb3V0OiA1MDAwLFxuICB9O1xuICBpdCgnc2V0cyB1cCB0aGUgWE1MSHR0cFJlcXVlc3QgY29uZmlndXJhdGlvbiBwcm9wZXJseScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXJLZXlzID0gT2JqZWN0LmtleXMoaGVhZGVycyk7XG4gICAgbWFrZUh0dHBSZXF1ZXN0KHBhcmFtcyk7XG4gICAgZXhwZWN0KG1vY2tPcGVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChwYXJhbXMubWV0aG9kLCBwYXJhbXMudXJsKTtcbiAgICBleHBlY3QobW9ja1NldFRpbWVvdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHBhcmFtcy50aW1lb3V0KTtcbiAgICBleHBlY3QobW9ja09uTG9hZCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIGV4cGVjdChtb2NrT25FcnJvcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIGV4cGVjdChtb2NrT25UaW1lb3V0KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgZXhwZWN0KG1vY2tTZXRSZXF1ZXN0SGVhZGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMyk7XG4gICAgaGVhZGVyS2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBrID0ga2V5IGFzIGtleW9mIHR5cGVvZiBoZWFkZXJzO1xuICAgICAgZXhwZWN0KG1vY2tTZXRSZXF1ZXN0SGVhZGVyKS50b0hhdmVCZWVuTnRoQ2FsbGVkV2l0aChcbiAgICAgICAgaW5kZXggKyAxLFxuICAgICAgICBrLFxuICAgICAgICBoZWFkZXJzW2tdLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICBleHBlY3QobW9ja1NlbmQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG51bGwpO1xuICB9KTtcblxuICBpdCgnYWNjZXB0cyBjdXN0b20gaGVhZGVycycsICgpID0+IHtcbiAgICBtYWtlSHR0cFJlcXVlc3QoeyAuLi5wYXJhbXMsIGN1c3RvbUhlYWRlcnM6IHsgZm9vOiAnYmFyJyB9IH0pO1xuICAgIGV4cGVjdChtb2NrU2V0UmVxdWVzdEhlYWRlcikudG9IYXZlQmVlbk50aENhbGxlZFdpdGgoNCwgJ2ZvbycsICdiYXInKTtcbiAgfSk7XG5cbiAgaXQoJ2RlZmF1bHQgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICBtYWtlSHR0cFJlcXVlc3QoKTtcbiAgICBleHBlY3QobW9ja09wZW4pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgICAgIERFRkFVTFRfUElOR19TRVJWRVJfVVJMLFxuICAgICk7XG4gICAgZXhwZWN0KG1vY2tTZXRUaW1lb3V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChERUZBVUxUX1RJTUVPVVQpO1xuICB9KTtcblxuICBkZXNjcmliZSgnb25sb2FkJywgKCkgPT4ge1xuICAgIGl0KCdyZXNvbHZlcyB0aGUgcHJvbWlzZSBpZiBzdGF0dXMgaXMgMnh4IG9yIDN4eCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBtYWtlSHR0cFJlcXVlc3Qoe1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIHRlc3RNZXRob2Q6ICdvbmxvYWQvMnh4JyxcbiAgICAgIH0pO1xuICAgICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbCh7IHN0YXR1czogMjAwIH0pO1xuXG4gICAgICByZXN1bHQgPSBhd2FpdCBtYWtlSHR0cFJlcXVlc3Qoe1xuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIHRlc3RNZXRob2Q6ICdvbmxvYWQvM3h4JyxcbiAgICAgIH0pO1xuXG4gICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKHsgc3RhdHVzOiAzMDQgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVqZWN0cyB0aGUgcHJvbWlzZSBpZiBzdGF0dXMgaXMgNHh4IG9yIDV4eCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1ha2VIdHRwUmVxdWVzdCh7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIHRlc3RNZXRob2Q6ICdvbmxvYWQvNHh4JyxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGV4cGVjdChlKS50b0VxdWFsKHsgc3RhdHVzOiA0MDMgfSk7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1ha2VIdHRwUmVxdWVzdCh7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIHRlc3RNZXRob2Q6ICdvbmxvYWQvNXh4JyxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGV4cGVjdChlKS50b0VxdWFsKHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdvbmVycm9yJywgKCkgPT4ge1xuICAgIGl0KCdyZWplY3RzIHRoZSBwcm9taXNlIHdpdGggdGhlIHhociBzdGF0dXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBtYWtlSHR0cFJlcXVlc3Qoe1xuICAgICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgICB0ZXN0TWV0aG9kOiAnb25lcnJvcicsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBleHBlY3QoZSkudG9FcXVhbCh7IHN0YXR1czogLTEgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdvbnRpbWVvdXQnLCAoKSA9PiB7XG4gICAgaXQoJ3JlamVjdHMgdGhlIHByb21pc2Ugd2l0aCB0aGUgeGhyIHN0YXR1cycsIGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1ha2VIdHRwUmVxdWVzdCh7XG4gICAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICAgIHRlc3RNZXRob2Q6ICdvbnRpbWVvdXQnLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXhwZWN0KGUpLnRvRXF1YWwoeyBzdGF0dXM6IC0xIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInZlcnNpb24iOjN9