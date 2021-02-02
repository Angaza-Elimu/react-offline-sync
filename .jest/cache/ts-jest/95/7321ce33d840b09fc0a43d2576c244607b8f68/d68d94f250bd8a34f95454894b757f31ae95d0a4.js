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
import makeHttpRequest from './makeHttpRequest';
import { DEFAULT_HTTP_METHOD, DEFAULT_PING_SERVER_URL, DEFAULT_TIMEOUT, DEFAULT_CUSTOM_HEADERS, } from './constants';
var DEFAULT_ARGUMENTS = {
    timeout: DEFAULT_TIMEOUT,
    url: DEFAULT_PING_SERVER_URL,
    method: DEFAULT_HTTP_METHOD,
    customHeaders: DEFAULT_CUSTOM_HEADERS,
};
export default function checkInternetAccess(args) {
    var _this = this;
    var _a = args || DEFAULT_ARGUMENTS, _b = _a.timeout, timeout = _b === void 0 ? DEFAULT_TIMEOUT : _b, _c = _a.url, url = _c === void 0 ? DEFAULT_PING_SERVER_URL : _c, _d = _a.method, method = _d === void 0 ? DEFAULT_HTTP_METHOD : _d, _e = _a.customHeaders, customHeaders = _e === void 0 ? DEFAULT_CUSTOM_HEADERS : _e;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, makeHttpRequest({
                            method: method,
                            url: url,
                            timeout: timeout,
                            customHeaders: customHeaders,
                        })];
                case 1:
                    _a.sent();
                    resolve(true);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    resolve(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixlQUFlLEVBQ2Ysc0JBQXNCLEdBQ3ZCLE1BQU0sYUFBYSxDQUFDO0FBVXJCLElBQU0saUJBQWlCLEdBQWM7SUFDbkMsT0FBTyxFQUFFLGVBQWU7SUFDeEIsR0FBRyxFQUFFLHVCQUF1QjtJQUM1QixNQUFNLEVBQUUsbUJBQW1CO0lBQzNCLGFBQWEsRUFBRSxzQkFBc0I7Q0FDdEMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsbUJBQW1CLENBQ3pDLElBQThCO0lBRGhDLGlCQXVCQztJQXBCTyxJQUFBLDhCQUt1QixFQUozQixlQUF5QixFQUF6Qiw4Q0FBeUIsRUFDekIsV0FBNkIsRUFBN0Isa0RBQTZCLEVBQzdCLGNBQTRCLEVBQTVCLGlEQUE0QixFQUM1QixxQkFBc0MsRUFBdEMsMkRBQzJCLENBQUM7SUFFOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQWlDOzs7Ozs7b0JBRXZELHFCQUFNLGVBQWUsQ0FBQzs0QkFDcEIsTUFBTSxRQUFBOzRCQUNOLEdBQUcsS0FBQTs0QkFDSCxPQUFPLFNBQUE7NEJBQ1AsYUFBYSxlQUFBO3lCQUNkLENBQUMsRUFBQTs7b0JBTEYsU0FLRSxDQUFDO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztvQkFFZCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O1NBRWxCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUh0dHBSZXF1ZXN0IGZyb20gJy4vbWFrZUh0dHBSZXF1ZXN0JztcbmltcG9ydCB7XG4gIERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gIERFRkFVTFRfUElOR19TRVJWRVJfVVJMLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfQ1VTVE9NX0hFQURFUlMsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEhUVFBNZXRob2QsIEFkZFVuZGVmaW5lZCwgSFRUUEhlYWRlcnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbnR5cGUgQXJndW1lbnRzID0ge1xuICB1cmw6IHN0cmluZztcbiAgdGltZW91dDogbnVtYmVyO1xuICBtZXRob2Q/OiBIVFRQTWV0aG9kO1xuICBjdXN0b21IZWFkZXJzOiBIVFRQSGVhZGVycztcbn07XG5cbmNvbnN0IERFRkFVTFRfQVJHVU1FTlRTOiBBcmd1bWVudHMgPSB7XG4gIHRpbWVvdXQ6IERFRkFVTFRfVElNRU9VVCxcbiAgdXJsOiBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgbWV0aG9kOiBERUZBVUxUX0hUVFBfTUVUSE9ELFxuICBjdXN0b21IZWFkZXJzOiBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrSW50ZXJuZXRBY2Nlc3MoXG4gIGFyZ3M/OiBBZGRVbmRlZmluZWQ8QXJndW1lbnRzPixcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCB7XG4gICAgdGltZW91dCA9IERFRkFVTFRfVElNRU9VVCxcbiAgICB1cmwgPSBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgICBtZXRob2QgPSBERUZBVUxUX0hUVFBfTUVUSE9ELFxuICAgIGN1c3RvbUhlYWRlcnMgPSBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxuICB9ID0gYXJncyB8fCBERUZBVUxUX0FSR1VNRU5UUztcblxuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmU6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBtYWtlSHR0cFJlcXVlc3Qoe1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIHVybCxcbiAgICAgICAgdGltZW91dCxcbiAgICAgICAgY3VzdG9tSGVhZGVycyxcbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sInZlcnNpb24iOjN9