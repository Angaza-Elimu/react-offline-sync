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
jest.mock('../utils/makeHttpRequest', function () {
    return jest.fn(function (params) {
        if (params.method === 'FAIL') {
            return Promise.reject(false);
        }
        return Promise.resolve(true);
    });
});
import checkInternetAccess from '../utils/checkInternetAccess';
import makeHttpRequest from '../utils/makeHttpRequest';
import { DEFAULT_HTTP_METHOD, DEFAULT_PING_SERVER_URL, DEFAULT_TIMEOUT, DEFAULT_CUSTOM_HEADERS, } from '../utils/constants';
describe('checkInternetAccess', function () {
    it('uses defaults parameters if no args are passed', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkInternetAccess()];
                case 1:
                    _a.sent();
                    expect(makeHttpRequest).toHaveBeenCalledWith({
                        timeout: DEFAULT_TIMEOUT,
                        url: DEFAULT_PING_SERVER_URL,
                        method: DEFAULT_HTTP_METHOD,
                        customHeaders: DEFAULT_CUSTOM_HEADERS,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolves to true if there is Internet access', function () { return __awaiter(void 0, void 0, void 0, function () {
        var timeout, url, hasInternetAccess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = 2000;
                    url = 'foo.com';
                    return [4 /*yield*/, checkInternetAccess({
                            url: url,
                            timeout: timeout,
                            customHeaders: DEFAULT_CUSTOM_HEADERS,
                        })];
                case 1:
                    hasInternetAccess = _a.sent();
                    expect(makeHttpRequest).toHaveBeenCalledWith({
                        url: url,
                        timeout: timeout,
                        method: DEFAULT_HTTP_METHOD,
                        customHeaders: DEFAULT_CUSTOM_HEADERS,
                    });
                    expect(hasInternetAccess).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolves to false if there is NOT Internet access', function () { return __awaiter(void 0, void 0, void 0, function () {
        var timeout, url, method, customHeaders, hasInternetAccess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = 2000;
                    url = 'foo123321.com';
                    method = 'FAIL';
                    customHeaders = DEFAULT_CUSTOM_HEADERS;
                    return [4 /*yield*/, checkInternetAccess({
                            timeout: timeout,
                            url: url,
                            method: method,
                            customHeaders: customHeaders,
                        })];
                case 1:
                    hasInternetAccess = _a.sent();
                    expect(makeHttpRequest).toHaveBeenCalledWith({
                        timeout: timeout,
                        url: url,
                        method: method,
                        customHeaders: customHeaders,
                    });
                    expect(hasInternetAccess).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolves to true if there is internet access after including custom headers as well', function () { return __awaiter(void 0, void 0, void 0, function () {
        var timeout, url, customHeadersToAdd, hasInternetAccess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeout = 2000;
                    url = 'foo.com';
                    customHeadersToAdd = {
                        'any-cool-header-key': 'something-cool',
                    };
                    return [4 /*yield*/, checkInternetAccess({
                            url: url,
                            timeout: timeout,
                            customHeaders: customHeadersToAdd,
                        })];
                case 1:
                    hasInternetAccess = _a.sent();
                    expect(makeHttpRequest).toHaveBeenCalledWith({
                        url: url,
                        timeout: timeout,
                        method: DEFAULT_HTTP_METHOD,
                        customHeaders: customHeadersToAdd,
                    });
                    expect(hasInternetAccess).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9jaGVja0ludGVybmV0QWNjZXNzLnRlc3QudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRTtJQUN4QyxPQUFBLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBQSxNQUFNO1FBQ1osSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUM1QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBTEYsQ0FLRSxDQUNILENBQUM7QUFoQkYsT0FBTyxtQkFBbUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLGVBQWUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixlQUFlLEVBQ2Ysc0JBQXNCLEdBQ3ZCLE1BQU0sd0JBQXdCLENBQUM7QUFXaEMsUUFBUSxDQUFDLHFCQUFxQixFQUFFO0lBQzlCLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTs7O3dCQUNuRCxxQkFBTSxtQkFBbUIsRUFBRSxFQUFBOztvQkFBM0IsU0FBMkIsQ0FBQztvQkFDNUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO3dCQUMzQyxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsR0FBRyxFQUFFLHVCQUF1Qjt3QkFDNUIsTUFBTSxFQUFFLG1CQUFtQjt3QkFDM0IsYUFBYSxFQUFFLHNCQUFzQjtxQkFDdEMsQ0FBQyxDQUFDOzs7O1NBQ0osQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFOzs7OztvQkFDM0MsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixHQUFHLEdBQUcsU0FBUyxDQUFDO29CQUNJLHFCQUFNLG1CQUFtQixDQUFDOzRCQUNsRCxHQUFHLEtBQUE7NEJBQ0gsT0FBTyxTQUFBOzRCQUNQLGFBQWEsRUFBRSxzQkFBc0I7eUJBQ3RDLENBQUMsRUFBQTs7b0JBSkksaUJBQWlCLEdBQUcsU0FJeEI7b0JBQ0YsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO3dCQUMzQyxHQUFHLEtBQUE7d0JBQ0gsT0FBTyxTQUFBO3dCQUNQLE1BQU0sRUFBRSxtQkFBbUI7d0JBQzNCLGFBQWEsRUFBRSxzQkFBc0I7cUJBQ3RDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7U0FDdEMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1EQUFtRCxFQUFFOzs7OztvQkFDaEQsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixHQUFHLEdBQUcsZUFBZSxDQUFDO29CQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNoQixhQUFhLEdBQUcsc0JBQXNCLENBQUM7b0JBQ25CLHFCQUFNLG1CQUFtQixDQUFDOzRCQUNsRCxPQUFPLFNBQUE7NEJBQ1AsR0FBRyxLQUFBOzRCQUNILE1BQU0sUUFBQTs0QkFDTixhQUFhLGVBQUE7eUJBQ1AsQ0FBQyxFQUFBOztvQkFMSCxpQkFBaUIsR0FBRyxTQUtqQjtvQkFDVCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsb0JBQW9CLENBQUM7d0JBQzNDLE9BQU8sU0FBQTt3QkFDUCxHQUFHLEtBQUE7d0JBQ0gsTUFBTSxRQUFBO3dCQUNOLGFBQWEsZUFBQTtxQkFDZCxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1NBQ3ZDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxRkFBcUYsRUFBRTs7Ozs7b0JBQ2xGLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsR0FBRyxHQUFHLFNBQVMsQ0FBQztvQkFDaEIsa0JBQWtCLEdBQUc7d0JBQ3pCLHFCQUFxQixFQUFFLGdCQUFnQjtxQkFDeEMsQ0FBQztvQkFDd0IscUJBQU0sbUJBQW1CLENBQUM7NEJBQ2xELEdBQUcsS0FBQTs0QkFDSCxPQUFPLFNBQUE7NEJBQ1AsYUFBYSxFQUFFLGtCQUFrQjt5QkFDbEMsQ0FBQyxFQUFBOztvQkFKSSxpQkFBaUIsR0FBRyxTQUl4QjtvQkFDRixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsb0JBQW9CLENBQUM7d0JBQzNDLEdBQUcsS0FBQTt3QkFDSCxPQUFPLFNBQUE7d0JBQ1AsTUFBTSxFQUFFLG1CQUFtQjt3QkFDM0IsYUFBYSxFQUFFLGtCQUFrQjtxQkFDbEMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztTQUN0QyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMvRGV2QUMvRGVza3RvcC9BbmdhemEvcmVhY3Qtb2ZmbGluZS1zeW5jL3NyYy90ZXN0L2NoZWNrSW50ZXJuZXRBY2Nlc3MudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hlY2tJbnRlcm5ldEFjY2VzcyBmcm9tICcuLi9zcmMvdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcyc7XG5pbXBvcnQgbWFrZUh0dHBSZXF1ZXN0IGZyb20gJy4uL3NyYy91dGlscy9tYWtlSHR0cFJlcXVlc3QnO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgREVGQVVMVF9QSU5HX1NFUlZFUl9VUkwsXG4gIERFRkFVTFRfVElNRU9VVCxcbiAgREVGQVVMVF9DVVNUT01fSEVBREVSUyxcbn0gZnJvbSAnLi4vc3JjL3V0aWxzL2NvbnN0YW50cyc7XG5cbmplc3QubW9jaygnLi4vc3JjL3V0aWxzL21ha2VIdHRwUmVxdWVzdCcsICgpID0+XG4gIGplc3QuZm4ocGFyYW1zID0+IHtcbiAgICBpZiAocGFyYW1zLm1ldGhvZCA9PT0gJ0ZBSUwnKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9KSxcbik7XG5cbmRlc2NyaWJlKCdjaGVja0ludGVybmV0QWNjZXNzJywgKCkgPT4ge1xuICBpdCgndXNlcyBkZWZhdWx0cyBwYXJhbWV0ZXJzIGlmIG5vIGFyZ3MgYXJlIHBhc3NlZCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBjaGVja0ludGVybmV0QWNjZXNzKCk7XG4gICAgZXhwZWN0KG1ha2VIdHRwUmVxdWVzdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgdGltZW91dDogREVGQVVMVF9USU1FT1VULFxuICAgICAgdXJsOiBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgICAgIG1ldGhvZDogREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgICAgIGN1c3RvbUhlYWRlcnM6IERFRkFVTFRfQ1VTVE9NX0hFQURFUlMsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdyZXNvbHZlcyB0byB0cnVlIGlmIHRoZXJlIGlzIEludGVybmV0IGFjY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0ID0gMjAwMDtcbiAgICBjb25zdCB1cmwgPSAnZm9vLmNvbSc7XG4gICAgY29uc3QgaGFzSW50ZXJuZXRBY2Nlc3MgPSBhd2FpdCBjaGVja0ludGVybmV0QWNjZXNzKHtcbiAgICAgIHVybCxcbiAgICAgIHRpbWVvdXQsXG4gICAgICBjdXN0b21IZWFkZXJzOiBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxuICAgIH0pO1xuICAgIGV4cGVjdChtYWtlSHR0cFJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgIHVybCxcbiAgICAgIHRpbWVvdXQsXG4gICAgICBtZXRob2Q6IERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gICAgICBjdXN0b21IZWFkZXJzOiBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxuICAgIH0pO1xuICAgIGV4cGVjdChoYXNJbnRlcm5ldEFjY2VzcykudG9CZSh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3Jlc29sdmVzIHRvIGZhbHNlIGlmIHRoZXJlIGlzIE5PVCBJbnRlcm5ldCBhY2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGltZW91dCA9IDIwMDA7XG4gICAgY29uc3QgdXJsID0gJ2ZvbzEyMzMyMS5jb20nO1xuICAgIGNvbnN0IG1ldGhvZCA9ICdGQUlMJztcbiAgICBjb25zdCBjdXN0b21IZWFkZXJzID0gREVGQVVMVF9DVVNUT01fSEVBREVSUztcbiAgICBjb25zdCBoYXNJbnRlcm5ldEFjY2VzcyA9IGF3YWl0IGNoZWNrSW50ZXJuZXRBY2Nlc3Moe1xuICAgICAgdGltZW91dCxcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGN1c3RvbUhlYWRlcnMsXG4gICAgfSBhcyBhbnkpOyAvLyB0eXBlY2FzdGluZyBpdCBiZWNhdXNlIG1ldGhvZCBjYW4gb25seSBiZSBIRUFELCBPUFRJT05TIGFzIHBlciBUU1xuICAgIGV4cGVjdChtYWtlSHR0cFJlcXVlc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBjdXN0b21IZWFkZXJzLFxuICAgIH0pO1xuICAgIGV4cGVjdChoYXNJbnRlcm5ldEFjY2VzcykudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXNvbHZlcyB0byB0cnVlIGlmIHRoZXJlIGlzIGludGVybmV0IGFjY2VzcyBhZnRlciBpbmNsdWRpbmcgY3VzdG9tIGhlYWRlcnMgYXMgd2VsbCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0ID0gMjAwMDtcbiAgICBjb25zdCB1cmwgPSAnZm9vLmNvbSc7XG4gICAgY29uc3QgY3VzdG9tSGVhZGVyc1RvQWRkID0ge1xuICAgICAgJ2FueS1jb29sLWhlYWRlci1rZXknOiAnc29tZXRoaW5nLWNvb2wnLFxuICAgIH07XG4gICAgY29uc3QgaGFzSW50ZXJuZXRBY2Nlc3MgPSBhd2FpdCBjaGVja0ludGVybmV0QWNjZXNzKHtcbiAgICAgIHVybCxcbiAgICAgIHRpbWVvdXQsXG4gICAgICBjdXN0b21IZWFkZXJzOiBjdXN0b21IZWFkZXJzVG9BZGQsXG4gICAgfSk7XG4gICAgZXhwZWN0KG1ha2VIdHRwUmVxdWVzdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgdXJsLFxuICAgICAgdGltZW91dCxcbiAgICAgIG1ldGhvZDogREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgICAgIGN1c3RvbUhlYWRlcnM6IGN1c3RvbUhlYWRlcnNUb0FkZCxcbiAgICB9KTtcbiAgICBleHBlY3QoaGFzSW50ZXJuZXRBY2Nlc3MpLnRvQmUodHJ1ZSk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=