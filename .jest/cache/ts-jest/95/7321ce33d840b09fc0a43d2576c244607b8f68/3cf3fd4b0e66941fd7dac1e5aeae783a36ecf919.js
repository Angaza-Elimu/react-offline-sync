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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9jaGVja0ludGVybmV0Q29ubmVjdGlvbi50ZXN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQVgxQyxPQUFPLE9BQU8sTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sdUJBQXVCLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxtQkFBbUIsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsc0JBQXNCLEdBQ3ZCLE1BQU0sb0JBQW9CLENBQUM7QUFJNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQWtCLENBQUM7QUFFekMsUUFBUSxDQUFDLHlCQUF5QixFQUFFO0lBQ2xDLFNBQVMsQ0FBQztRQUNSLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLEVBQUUsQ0FBQyw0RUFBNEUsRUFBRTs7Ozs0QkFDM0QscUJBQU0sdUJBQXVCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQWxFLFdBQVcsR0FBRyxTQUFvRDt3QkFDeEUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsb0JBQW9CLENBQUM7NEJBQy9DLE1BQU0sRUFBRSxtQkFBbUI7NEJBQzNCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxTQUFTOzRCQUNkLGFBQWEsRUFBRSxzQkFBc0I7eUJBQ3RDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O2FBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzdCLEVBQUUsQ0FBQyxvRkFBb0YsRUFBRTs7Ozs7d0JBQ3ZGLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDM0IsT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUF2QyxDQUF1QyxDQUN4QyxDQUFDO3dCQUNrQixxQkFBTSx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFBbkUsV0FBVyxHQUFHLFNBQXFEO3dCQUN6RSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDbkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OzthQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTs7Ozs7b0JBQ3ZCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7b0JBQ3ZELHFCQUFNLHVCQUF1QixFQUFFLEVBQUE7O29CQUE3QyxXQUFXLEdBQUcsU0FBK0I7b0JBQ25ELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO3dCQUMvQyxNQUFNLEVBQUUsbUJBQW1CO3dCQUMzQixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsR0FBRyxFQUFFLHVCQUF1Qjt3QkFDNUIsYUFBYSxFQUFFLHNCQUFzQjtxQkFDdEMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7U0FDaEMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9jaGVja0ludGVybmV0Q29ubmVjdGlvbi50ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXRJbmZvIGZyb20gJ0ByZWFjdC1uYXRpdmUtY29tbXVuaXR5L25ldGluZm8nO1xuaW1wb3J0IHsgbW9ja2VkIH0gZnJvbSAndHMtamVzdC91dGlscyc7XG5pbXBvcnQgY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24gZnJvbSAnLi4vdXRpbHMvY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24nO1xuaW1wb3J0IGNoZWNrSW50ZXJuZXRBY2Nlc3MgZnJvbSAnLi4vdXRpbHMvY2hlY2tJbnRlcm5ldEFjY2Vzcyc7XG5pbXBvcnQge1xuICBERUZBVUxUX1BJTkdfU0VSVkVSX1VSTCxcbiAgREVGQVVMVF9USU1FT1VULFxuICBERUZBVUxUX0hUVFBfTUVUSE9ELFxuICBERUZBVUxUX0NVU1RPTV9IRUFERVJTLFxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5qZXN0Lm1vY2soJy4uL3V0aWxzL2NoZWNrSW50ZXJuZXRBY2Nlc3MnKTtcblxubW9ja2VkKGNoZWNrSW50ZXJuZXRBY2Nlc3MpLm1vY2tSZXNvbHZlZFZhbHVlKHRydWUpO1xuXG5jb25zdCBmZXRjaCA9IE5ldEluZm8uZmV0Y2ggYXMgamVzdC5Nb2NrO1xuXG5kZXNjcmliZSgnY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24nLCAoKSA9PiB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgbW9ja2VkKGNoZWNrSW50ZXJuZXRBY2Nlc3MpLm1vY2tDbGVhcigpO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3Nob3VsZFBpbmcgPSB0cnVlJywgKCkgPT4ge1xuICAgIGl0KGBjYWxscyBjaGVja0ludGVybmV0QWNjZXNzIGFuZCByZXNvbHZlcyB0aGUgcHJvbWlzZSB3aXRoIGl0cyByZXR1cm5lZCB2YWx1ZWAsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gYXdhaXQgY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24oJ2Zvby5jb20nLCAzMDAwLCB0cnVlKTtcbiAgICAgIGV4cGVjdChjaGVja0ludGVybmV0QWNjZXNzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgIG1ldGhvZDogREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgICAgICAgdGltZW91dDogMzAwMCxcbiAgICAgICAgdXJsOiAnZm9vLmNvbScsXG4gICAgICAgIGN1c3RvbUhlYWRlcnM6IERFRkFVTFRfQ1VTVE9NX0hFQURFUlMsXG4gICAgICB9KTtcbiAgICAgIGV4cGVjdChpc0Nvbm5lY3RlZCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Nob3VsZFBpbmcgPSBmYWxzZScsICgpID0+IHtcbiAgICBpdChgZG9lcyBOT1QgY2FsbCBjaGVja0ludGVybmV0QWNjZXNzIGFuZCBkaXJlY3RseSByZXNvbHZlcyB0aGUgcHJvbWlzZSB3aXRoIGEgYm9vbGVhbmAsIGFzeW5jICgpID0+IHtcbiAgICAgIGZldGNoLm1vY2tJbXBsZW1lbnRhdGlvbk9uY2UoKCkgPT5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHsgaXNDb25uZWN0ZWQ6IGZhbHNlIH0pLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gYXdhaXQgY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24oJ2Zvby5jb20nLCAzMDAwLCBmYWxzZSk7XG4gICAgICBleHBlY3QoY2hlY2tJbnRlcm5ldEFjY2Vzcykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIGV4cGVjdChpc0Nvbm5lY3RlZCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdkZWZhdWx0IHBhcmFtZXRlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgZmV0Y2gubW9ja0ltcGxlbWVudGF0aW9uT25jZSgoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBpc0Nvbm5lY3RlZDogdHJ1ZSB9KSk7XG4gICAgY29uc3QgaXNDb25uZWN0ZWQgPSBhd2FpdCBjaGVja0ludGVybmV0Q29ubmVjdGlvbigpO1xuICAgIGV4cGVjdChjaGVja0ludGVybmV0QWNjZXNzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICBtZXRob2Q6IERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gICAgICB0aW1lb3V0OiBERUZBVUxUX1RJTUVPVVQsXG4gICAgICB1cmw6IERFRkFVTFRfUElOR19TRVJWRVJfVVJMLFxuICAgICAgY3VzdG9tSGVhZGVyczogREVGQVVMVF9DVVNUT01fSEVBREVSUyxcbiAgICB9KTtcbiAgICBleHBlY3QoaXNDb25uZWN0ZWQpLnRvQmUodHJ1ZSk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=