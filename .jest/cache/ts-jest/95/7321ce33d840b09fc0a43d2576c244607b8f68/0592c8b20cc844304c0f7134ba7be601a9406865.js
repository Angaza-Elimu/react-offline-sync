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
import NetInfo from '@react-native-community/netinfo';
import checkInternetAccess from './checkInternetAccess';
import { DEFAULT_PING_SERVER_URL, DEFAULT_TIMEOUT, DEFAULT_HTTP_METHOD, DEFAULT_CUSTOM_HEADERS, } from './constants';
/**
 * Utility that allows to query for internet connectivity on demand
 * @param url
 * @param timeout
 * @param shouldPing
 * @param method
 * @returns {Promise<boolean>}
 */
export default function checkInternetConnection(url, timeout, shouldPing, method, customHeaders) {
    if (url === void 0) { url = DEFAULT_PING_SERVER_URL; }
    if (timeout === void 0) { timeout = DEFAULT_TIMEOUT; }
    if (shouldPing === void 0) { shouldPing = true; }
    if (method === void 0) { method = DEFAULT_HTTP_METHOD; }
    if (customHeaders === void 0) { customHeaders = DEFAULT_CUSTOM_HEADERS; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, NetInfo.fetch().then(function (connectionState) { return __awaiter(_this, void 0, void 0, function () {
                    var hasInternetAccess;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!shouldPing) return [3 /*break*/, 2];
                                return [4 /*yield*/, checkInternetAccess({
                                        timeout: timeout,
                                        url: url,
                                        method: method,
                                        customHeaders: customHeaders,
                                    })];
                            case 1:
                                hasInternetAccess = _a.sent();
                                return [2 /*return*/, hasInternetAccess];
                            case 2: return [2 /*return*/, connectionState.isConnected];
                        }
                    });
                }); })];
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdXRpbHMvY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxPQUFPLE1BQU0saUNBQWlDLENBQUM7QUFDdEQsT0FBTyxtQkFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsc0JBQXNCLEdBQ3ZCLE1BQU0sYUFBYSxDQUFDO0FBR3JCOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFnQix1QkFBdUIsQ0FDbkQsR0FBcUMsRUFDckMsT0FBaUMsRUFDakMsVUFBaUIsRUFDakIsTUFBd0MsRUFDeEMsYUFBbUQ7SUFKbkQsb0JBQUEsRUFBQSw2QkFBcUM7SUFDckMsd0JBQUEsRUFBQSx5QkFBaUM7SUFDakMsMkJBQUEsRUFBQSxpQkFBaUI7SUFDakIsdUJBQUEsRUFBQSw0QkFBd0M7SUFDeEMsOEJBQUEsRUFBQSxzQ0FBbUQ7Ozs7WUFFbkQsc0JBQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFNLGVBQWU7Ozs7O3FDQUMzQyxVQUFVLEVBQVYsd0JBQVU7Z0NBQ2MscUJBQU0sbUJBQW1CLENBQUM7d0NBQ2xELE9BQU8sU0FBQTt3Q0FDUCxHQUFHLEtBQUE7d0NBQ0gsTUFBTSxRQUFBO3dDQUNOLGFBQWEsZUFBQTtxQ0FDZCxDQUFDLEVBQUE7O2dDQUxJLGlCQUFpQixHQUFHLFNBS3hCO2dDQUNGLHNCQUFPLGlCQUFpQixFQUFDO29DQUUzQixzQkFBTyxlQUFlLENBQUMsV0FBVyxFQUFDOzs7cUJBQ3BDLENBQUMsRUFBQzs7O0NBQ0oiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdXRpbHMvY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5ldEluZm8gZnJvbSAnQHJlYWN0LW5hdGl2ZS1jb21tdW5pdHkvbmV0aW5mbyc7XG5pbXBvcnQgY2hlY2tJbnRlcm5ldEFjY2VzcyBmcm9tICcuL2NoZWNrSW50ZXJuZXRBY2Nlc3MnO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9QSU5HX1NFUlZFUl9VUkwsXG4gIERFRkFVTFRfVElNRU9VVCxcbiAgREVGQVVMVF9IVFRQX01FVEhPRCxcbiAgREVGQVVMVF9DVVNUT01fSEVBREVSUyxcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgSFRUUE1ldGhvZCwgSFRUUEhlYWRlcnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogVXRpbGl0eSB0aGF0IGFsbG93cyB0byBxdWVyeSBmb3IgaW50ZXJuZXQgY29ubmVjdGl2aXR5IG9uIGRlbWFuZFxuICogQHBhcmFtIHVybFxuICogQHBhcmFtIHRpbWVvdXRcbiAqIEBwYXJhbSBzaG91bGRQaW5nXG4gKiBAcGFyYW0gbWV0aG9kXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY2hlY2tJbnRlcm5ldENvbm5lY3Rpb24oXG4gIHVybDogc3RyaW5nID0gREVGQVVMVF9QSU5HX1NFUlZFUl9VUkwsXG4gIHRpbWVvdXQ6IG51bWJlciA9IERFRkFVTFRfVElNRU9VVCxcbiAgc2hvdWxkUGluZyA9IHRydWUsXG4gIG1ldGhvZDogSFRUUE1ldGhvZCA9IERFRkFVTFRfSFRUUF9NRVRIT0QsXG4gIGN1c3RvbUhlYWRlcnM6IEhUVFBIZWFkZXJzID0gREVGQVVMVF9DVVNUT01fSEVBREVSUyxcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gTmV0SW5mby5mZXRjaCgpLnRoZW4oYXN5bmMgY29ubmVjdGlvblN0YXRlID0+IHtcbiAgICBpZiAoc2hvdWxkUGluZykge1xuICAgICAgY29uc3QgaGFzSW50ZXJuZXRBY2Nlc3MgPSBhd2FpdCBjaGVja0ludGVybmV0QWNjZXNzKHtcbiAgICAgICAgdGltZW91dCxcbiAgICAgICAgdXJsLFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGN1c3RvbUhlYWRlcnMsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoYXNJbnRlcm5ldEFjY2VzcztcbiAgICB9XG4gICAgcmV0dXJuIGNvbm5lY3Rpb25TdGF0ZS5pc0Nvbm5lY3RlZDtcbiAgfSk7XG59XG4iXSwidmVyc2lvbiI6M30=