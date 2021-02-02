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
jest.mock('../utils/checkInternetAccess');
import NetInfo from '@react-native-community/netinfo';
import { mocked } from 'ts-jest/utils';
import checkInternetConnection from '../utils/checkInternetConnection';
import checkInternetAccess from '../utils/checkInternetAccess';
import { DEFAULT_PING_SERVER_URL, DEFAULT_TIMEOUT, DEFAULT_HTTP_METHOD, DEFAULT_CUSTOM_HEADERS, } from '../utils/constants';
mocked(checkInternetAccess).mockResolvedValue(true);
var fetch = NetInfo.fetch;
describe('checkInternetConnection', function () {
    afterEach(function () {
        mocked(checkInternetAccess).mockClear();
    });
    describe('shouldPing = true', function () {
        it("calls checkInternetAccess and resolves the promise with its returned value", function () { return __awaiter(void 0, void 0, void 0, function () {
            var isConnected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, checkInternetConnection('foo.com', 3000, true)];
                    case 1:
                        isConnected = _a.sent();
                        expect(checkInternetAccess).toHaveBeenCalledWith({
                            method: DEFAULT_HTTP_METHOD,
                            timeout: 3000,
                            url: 'foo.com',
                            customHeaders: DEFAULT_CUSTOM_HEADERS,
                        });
                        expect(isConnected).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('shouldPing = false', function () {
        it("does NOT call checkInternetAccess and directly resolves the promise with a boolean", function () { return __awaiter(void 0, void 0, void 0, function () {
            var isConnected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetch.mockImplementationOnce(function () {
                            return Promise.resolve({ isConnected: false });
                        });
                        return [4 /*yield*/, checkInternetConnection('foo.com', 3000, false)];
                    case 1:
                        isConnected = _a.sent();
                        expect(checkInternetAccess).not.toHaveBeenCalled();
                        expect(isConnected).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('default parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isConnected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch.mockImplementationOnce(function () { return Promise.resolve({ isConnected: true }); });
                    return [4 /*yield*/, checkInternetConnection()];
                case 1:
                    isConnected = _a.sent();
                    expect(checkInternetAccess).toHaveBeenCalledWith({
                        method: DEFAULT_HTTP_METHOD,
                        timeout: DEFAULT_TIMEOUT,
                        url: DEFAULT_PING_SERVER_URL,
                        customHeaders: DEFAULT_CUSTOM_HEADERS,
                    });
                    expect(isConnected).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9jaGVja0ludGVybmV0Q29ubmVjdGlvbi50ZXN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLElBQUksQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQVg5QyxPQUFPLE9BQU8sTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sdUJBQXVCLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxtQkFBbUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsc0JBQXNCLEdBQ3ZCLE1BQU0sd0JBQXdCLENBQUM7QUFJaEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQWtCLENBQUM7QUFFekMsUUFBUSxDQUFDLHlCQUF5QixFQUFFO0lBQ2xDLFNBQVMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLEVBQUUsQ0FBQyw0RUFBNEUsRUFBRTs7Ozs0QkFDM0QscUJBQU0sdUJBQXVCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQWxFLFdBQVcsR0FBRyxTQUFvRDt3QkFDeEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsb0JBQW9CLENBQUM7NEJBQy9DLE1BQU0sRUFBRSxtQkFBbUI7NEJBQzNCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxTQUFTOzRCQUNkLGFBQWEsRUFBRSxzQkFBc0I7eUJBQ3RDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O2FBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLEVBQUUsQ0FBQyxvRkFBb0YsRUFBRTs7Ozs7d0JBQ3ZGLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDM0IsT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUF2QyxDQUF1QyxDQUN4QyxDQUFDO3dCQUNrQixxQkFBTSx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFBbkUsV0FBVyxHQUFHLFNBQXFEO3dCQUN6RSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDbkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OzthQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTs7Ozs7b0JBQ3ZCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7b0JBQ3ZELHFCQUFNLHVCQUF1QixFQUFFLEVBQUE7O29CQUE3QyxXQUFXLEdBQUcsU0FBK0I7b0JBQ25ELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO3dCQUMvQyxNQUFNLEVBQUUsbUJBQW1CO3dCQUMzQixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsR0FBRyxFQUFFLHVCQUF1Qjt3QkFDNUIsYUFBYSxFQUFFLHNCQUFzQjtxQkFDdEMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7U0FDaEMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9jaGVja0ludGVybmV0Q29ubmVjdGlvbi50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXRJbmZvIGZyb20gJ0ByZWFjdC1uYXRpdmUtY29tbXVuaXR5L25ldGluZm8nO1xuaW1wb3J0IHsgbW9ja2VkIH0gZnJvbSAndHMtamVzdC91dGlscyc7XG5pbXBvcnQgY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24gZnJvbSAnLi4vc3JjL3V0aWxzL2NoZWNrSW50ZXJuZXRDb25uZWN0aW9uJztcbmltcG9ydCBjaGVja0ludGVybmV0QWNjZXNzIGZyb20gJy4uL3NyYy91dGlscy9jaGVja0ludGVybmV0QWNjZXNzJztcbmltcG9ydCB7XG4gIERFRkFVTFRfUElOR19TRVJWRVJfVVJMLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gIERFRkFVTFRfQ1VTVE9NX0hFQURFUlMsXG59IGZyb20gJy4uL3NyYy91dGlscy9jb25zdGFudHMnO1xuXG5qZXN0Lm1vY2soJy4uL3NyYy91dGlscy9jaGVja0ludGVybmV0QWNjZXNzJyk7XG5cbm1vY2tlZChjaGVja0ludGVybmV0QWNjZXNzKS5tb2NrUmVzb2x2ZWRWYWx1ZSh0cnVlKTtcblxuY29uc3QgZmV0Y2ggPSBOZXRJbmZvLmZldGNoIGFzIGplc3QuTW9jaztcblxuZGVzY3JpYmUoJ2NoZWNrSW50ZXJuZXRDb25uZWN0aW9uJywgKCkgPT4ge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIG1vY2tlZChjaGVja0ludGVybmV0QWNjZXNzKS5tb2NrQ2xlYXIoKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzaG91bGRQaW5nID0gdHJ1ZScsICgpID0+IHtcbiAgICBpdChgY2FsbHMgY2hlY2tJbnRlcm5ldEFjY2VzcyBhbmQgcmVzb2x2ZXMgdGhlIHByb21pc2Ugd2l0aCBpdHMgcmV0dXJuZWQgdmFsdWVgLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpc0Nvbm5lY3RlZCA9IGF3YWl0IGNoZWNrSW50ZXJuZXRDb25uZWN0aW9uKCdmb28uY29tJywgMzAwMCwgdHJ1ZSk7XG4gICAgICBleHBlY3QoY2hlY2tJbnRlcm5ldEFjY2VzcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICBtZXRob2Q6IERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAsXG4gICAgICAgIHVybDogJ2Zvby5jb20nLFxuICAgICAgICBjdXN0b21IZWFkZXJzOiBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxuICAgICAgfSk7XG4gICAgICBleHBlY3QoaXNDb25uZWN0ZWQpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzaG91bGRQaW5nID0gZmFsc2UnLCAoKSA9PiB7XG4gICAgaXQoYGRvZXMgTk9UIGNhbGwgY2hlY2tJbnRlcm5ldEFjY2VzcyBhbmQgZGlyZWN0bHkgcmVzb2x2ZXMgdGhlIHByb21pc2Ugd2l0aCBhIGJvb2xlYW5gLCBhc3luYyAoKSA9PiB7XG4gICAgICBmZXRjaC5tb2NrSW1wbGVtZW50YXRpb25PbmNlKCgpID0+XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh7IGlzQ29ubmVjdGVkOiBmYWxzZSB9KSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpc0Nvbm5lY3RlZCA9IGF3YWl0IGNoZWNrSW50ZXJuZXRDb25uZWN0aW9uKCdmb28uY29tJywgMzAwMCwgZmFsc2UpO1xuICAgICAgZXhwZWN0KGNoZWNrSW50ZXJuZXRBY2Nlc3MpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICBleHBlY3QoaXNDb25uZWN0ZWQpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnZGVmYXVsdCBwYXJhbWV0ZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgIGZldGNoLm1vY2tJbXBsZW1lbnRhdGlvbk9uY2UoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSkpO1xuICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gYXdhaXQgY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24oKTtcbiAgICBleHBlY3QoY2hlY2tJbnRlcm5ldEFjY2VzcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgbWV0aG9kOiBERUZBVUxUX0hUVFBfTUVUSE9ELFxuICAgICAgdGltZW91dDogREVGQVVMVF9USU1FT1VULFxuICAgICAgdXJsOiBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgICAgIGN1c3RvbUhlYWRlcnM6IERFRkFVTFRfQ1VTVE9NX0hFQURFUlMsXG4gICAgfSk7XG4gICAgZXhwZWN0KGlzQ29ubmVjdGVkKS50b0JlKHRydWUpO1xuICB9KTtcbn0pO1xuIl0sInZlcnNpb24iOjN9