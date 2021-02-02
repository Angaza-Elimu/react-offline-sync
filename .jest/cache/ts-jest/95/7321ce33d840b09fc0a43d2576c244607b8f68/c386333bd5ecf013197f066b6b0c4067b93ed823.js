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
import find from 'lodash/find';
import get from 'lodash/get';
import { fetchOfflineMode, removeActionFromQueue, dismissActionsFromQueue, } from './actionCreators';
import * as networkActionTypes from './actionTypes';
import wait from '../utils/wait';
import { SEMAPHORE_COLOR } from '../utils/constants';
var DEFAULT_ARGUMENTS = {
    actionTypes: [],
    regexActionType: /FETCH.*REQUEST/,
    queueReleaseThrottle: 50,
    shouldDequeueSelector: function () { return true; },
};
function validateParams(regexActionType, actionTypes) {
    if ({}.toString.call(regexActionType) !== '[object RegExp]')
        throw new Error('You should pass a regex as regexActionType param');
    if ({}.toString.call(actionTypes) !== '[object Array]')
        throw new Error('You should pass an array as actionTypes param');
}
function findActionToBeDismissed(action, actionQueue) {
    return find(actionQueue, function (a) {
        var actionsToDismiss = get(a, 'meta.dismiss', []);
        return actionsToDismiss.includes(action.type);
    });
}
function isObjectAndShouldBeIntercepted(action, regexActionType, actionTypes) {
    if (typeof action === 'object' && 'type' in action) {
        return (regexActionType.test(action.type) || actionTypes.includes(action.type));
    }
    return false;
}
function isThunkAndShouldBeIntercepted(action) {
    return typeof action === 'function' && action.interceptInOffline === true;
}
function checkIfActionShouldBeIntercepted(action, regexActionType, actionTypes) {
    return (isObjectAndShouldBeIntercepted(action, regexActionType, actionTypes) ||
        isThunkAndShouldBeIntercepted(action));
}
function didComeBackOnline(action, wasConnected) {
    if ('type' in action && 'payload' in action) {
        return (action.type === networkActionTypes.CONNECTION_CHANGE &&
            !wasConnected &&
            action.payload === true);
    }
    return false;
}
function didQueueResume(action, isQueuePaused) {
    if ('type' in action && 'payload' in action) {
        return (action.type === networkActionTypes.CHANGE_QUEUE_SEMAPHORE &&
            isQueuePaused &&
            action.payload === SEMAPHORE_COLOR.GREEN);
    }
    return false;
}
export var createReleaseQueue = function (getState, next, delay, shouldDequeueSelector) { return function (queue) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, queue_1, action, state, _a, isConnected, isQueuePaused;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, queue_1 = queue;
                _b.label = 1;
            case 1:
                if (!(_i < queue_1.length)) return [3 /*break*/, 5];
                action = queue_1[_i];
                state = getState();
                _a = state.network, isConnected = _a.isConnected, isQueuePaused = _a.isQueuePaused;
                if (!(isConnected && !isQueuePaused && shouldDequeueSelector(state))) return [3 /*break*/, 3];
                next(removeActionFromQueue(action));
                next(action);
                // eslint-disable-next-line
                return [4 /*yield*/, wait(delay)];
            case 2:
                // eslint-disable-next-line
                _b.sent();
                return [3 /*break*/, 4];
            case 3: return [3 /*break*/, 5];
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); }; };
function createNetworkMiddleware(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.regexActionType, regexActionType = _c === void 0 ? DEFAULT_ARGUMENTS.regexActionType : _c, _d = _b.actionTypes, actionTypes = _d === void 0 ? DEFAULT_ARGUMENTS.actionTypes : _d, _e = _b.queueReleaseThrottle, queueReleaseThrottle = _e === void 0 ? DEFAULT_ARGUMENTS.queueReleaseThrottle : _e, _f = _b.shouldDequeueSelector, shouldDequeueSelector = _f === void 0 ? DEFAULT_ARGUMENTS.shouldDequeueSelector : _f;
    return function (_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            var _a = getState().network, isConnected = _a.isConnected, actionQueue = _a.actionQueue, isQueuePaused = _a.isQueuePaused;
            var releaseQueue = createReleaseQueue(getState, next, queueReleaseThrottle, shouldDequeueSelector);
            validateParams(regexActionType, actionTypes);
            var shouldInterceptAction = checkIfActionShouldBeIntercepted(action, regexActionType, actionTypes);
            if (shouldInterceptAction && isConnected === false) {
                // Offline, preventing the original action from being dispatched.
                // Dispatching an internal action instead.
                return next(fetchOfflineMode(action));
            }
            var isBackOnline = didComeBackOnline(action, isConnected);
            var hasQueueBeenResumed = didQueueResume(action, isQueuePaused);
            var shouldDequeue = (isBackOnline || (isConnected && hasQueueBeenResumed)) &&
                shouldDequeueSelector(getState());
            if (shouldDequeue) {
                // Dispatching queued actions in order of arrival (if we have any)
                next(action);
                return releaseQueue(actionQueue);
            }
            // Checking if we have a dismissal case
            // narrow down type from thunk to only pass in actions with type -> AnyAction
            if ('type' in action) {
                var isAnyActionToBeDismissed = findActionToBeDismissed(action, actionQueue);
                if (isAnyActionToBeDismissed && !isConnected) {
                    next(dismissActionsFromQueue(action.type));
                }
            }
            // Proxy the original action to the next middleware on the chain or final dispatch
            return next(action);
        }; };
    };
}
export default createNetworkMiddleware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvY3JlYXRlTmV0d29ya01pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBQy9CLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQztBQUU3QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLHFCQUFxQixFQUNyQix1QkFBdUIsR0FDeEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEtBQUssa0JBQWtCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUVqQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFjckQsSUFBTSxpQkFBaUIsR0FBYztJQUNuQyxXQUFXLEVBQUUsRUFBRTtJQUNmLGVBQWUsRUFBRSxnQkFBZ0I7SUFDakMsb0JBQW9CLEVBQUUsRUFBRTtJQUN4QixxQkFBcUIsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7Q0FDbEMsQ0FBQztBQUtGLFNBQVMsY0FBYyxDQUFDLGVBQXVCLEVBQUUsV0FBdUI7SUFDdEUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxpQkFBaUI7UUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBRXRFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssZ0JBQWdCO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FDOUIsTUFBaUIsRUFDakIsV0FBNkI7SUFFN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUEsQ0FBQztRQUN4QixJQUFNLGdCQUFnQixHQUFHLEdBQUcs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QUF1QixDQUN0RCxNQUFNLEVBQ04sV0FBVyxDQUNaLENBQUM7Z0JBQ0YsSUFBSSx3QkFBd0IsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDNUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUM1QzthQUNGO1lBRUQsa0ZBQWtGO1lBQ2xGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUMsRUFqREksQ0FpREo7SUFuRHdELENBbUR4RCxDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsdUJBQXVCLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvY3JlYXRlTmV0d29ya01pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpbmQgZnJvbSAnbG9kYXNoL2ZpbmQnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcbmltcG9ydCB7IE1pZGRsZXdhcmUsIE1pZGRsZXdhcmVBUEksIERpc3BhdGNoLCBBbnlBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge1xuICBmZXRjaE9mZmxpbmVNb2RlLFxuICByZW1vdmVBY3Rpb25Gcm9tUXVldWUsXG4gIGRpc21pc3NBY3Rpb25zRnJvbVF1ZXVlLFxufSBmcm9tICcuL2FjdGlvbkNyZWF0b3JzJztcbmltcG9ydCAqIGFzIG5ldHdvcmtBY3Rpb25UeXBlcyBmcm9tICcuL2FjdGlvblR5cGVzJztcbmltcG9ydCB3YWl0IGZyb20gJy4uL3V0aWxzL3dhaXQnO1xuaW1wb3J0IHsgTmV0d29ya1N0YXRlLCBFbnF1ZXVlZEFjdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFNFTUFQSE9SRV9DT0xPUiB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5cbnR5cGUgR2V0U3RhdGUgPSBNaWRkbGV3YXJlQVBJPERpc3BhdGNoLCBTdGF0ZT5bJ2dldFN0YXRlJ107XG50eXBlIFN0YXRlID0ge1xuICBuZXR3b3JrOiBOZXR3b3JrU3RhdGU7XG59O1xudHlwZSBBY3Rpb25UeXBlID0gQXJyYXk8c3RyaW5nPiB8IHN0cmluZztcbnR5cGUgQXJndW1lbnRzID0ge1xuICByZWdleEFjdGlvblR5cGU6IFJlZ0V4cDtcbiAgYWN0aW9uVHlwZXM6IEFjdGlvblR5cGU7XG4gIHF1ZXVlUmVsZWFzZVRocm90dGxlOiBudW1iZXI7XG4gIHNob3VsZERlcXVldWVTZWxlY3RvcjogKHN0YXRlOiBTdGF0ZSkgPT4gYm9vbGVhbjtcbn07XG5cbmNvbnN0IERFRkFVTFRfQVJHVU1FTlRTOiBBcmd1bWVudHMgPSB7XG4gIGFjdGlvblR5cGVzOiBbXSxcbiAgcmVnZXhBY3Rpb25UeXBlOiAvRkVUQ0guKlJFUVVFU1QvLFxuICBxdWV1ZVJlbGVhc2VUaHJvdHRsZTogNTAsXG4gIHNob3VsZERlcXVldWVTZWxlY3RvcjogKCkgPT4gdHJ1ZSxcbn07XG5cbi8vIGJlY2F1c2UgSSBkb24ndCBrbm93IGhvdyBtYW55IG1pZGRsZXdhcmVzIHdvdWxkIGJlIGFkZGVkLCB0aHVuaywgb2JlcnNlcnZhYmxlIGV0Y1xudHlwZSBTdG9yZURpc3BhdGNoID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUGFyYW1zKHJlZ2V4QWN0aW9uVHlwZTogUmVnRXhwLCBhY3Rpb25UeXBlczogQWN0aW9uVHlwZSkge1xuICBpZiAoe30udG9TdHJpbmcuY2FsbChyZWdleEFjdGlvblR5cGUpICE9PSAnW29iamVjdCBSZWdFeHBdJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91bGQgcGFzcyBhIHJlZ2V4IGFzIHJlZ2V4QWN0aW9uVHlwZSBwYXJhbScpO1xuXG4gIGlmICh7fS50b1N0cmluZy5jYWxsKGFjdGlvblR5cGVzKSAhPT0gJ1tvYmplY3QgQXJyYXldJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91bGQgcGFzcyBhbiBhcnJheSBhcyBhY3Rpb25UeXBlcyBwYXJhbScpO1xufVxuXG5mdW5jdGlvbiBmaW5kQWN0aW9uVG9CZURpc21pc3NlZChcbiAgYWN0aW9uOiBBbnlBY3Rpb24sXG4gIGFjdGlvblF1ZXVlOiBFbnF1ZXVlZEFjdGlvbltdLFxuKSB7XG4gIHJldHVybiBmaW5kKGFjdGlvblF1ZXVlLCBhID0+IHtcbiAgICBjb25zdCBhY3Rpb25zVG9EaXNtaXNzID0gZ2V0KGEsICdtZXRhLmRpc21pc3MnLCBbXSk7XG4gICAgcmV0dXJuIGFjdGlvbnNUb0Rpc21pc3MuaW5jbHVkZXMoYWN0aW9uLnR5cGUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3RBbmRTaG91bGRCZUludGVyY2VwdGVkKFxuICBhY3Rpb246IEVucXVldWVkQWN0aW9uLFxuICByZWdleEFjdGlvblR5cGU6IFJlZ0V4cCxcbiAgYWN0aW9uVHlwZXM6IEFjdGlvblR5cGUsXG4pIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnICYmICd0eXBlJyBpbiBhY3Rpb24pIHtcbiAgICByZXR1cm4gKFxuICAgICAgcmVnZXhBY3Rpb25UeXBlLnRlc3QoYWN0aW9uLnR5cGUpIHx8IGFjdGlvblR5cGVzLmluY2x1ZGVzKGFjdGlvbi50eXBlKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1RodW5rQW5kU2hvdWxkQmVJbnRlcmNlcHRlZChhY3Rpb246IEVucXVldWVkQWN0aW9uKSB7XG4gIHJldHVybiB0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nICYmIGFjdGlvbi5pbnRlcmNlcHRJbk9mZmxpbmUgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSWZBY3Rpb25TaG91bGRCZUludGVyY2VwdGVkKFxuICBhY3Rpb246IEVucXVldWVkQWN0aW9uLFxuICByZWdleEFjdGlvblR5cGU6IFJlZ0V4cCxcbiAgYWN0aW9uVHlwZXM6IEFjdGlvblR5cGUsXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBpc09iamVjdEFuZFNob3VsZEJlSW50ZXJjZXB0ZWQoYWN0aW9uLCByZWdleEFjdGlvblR5cGUsIGFjdGlvblR5cGVzKSB8fFxuICAgIGlzVGh1bmtBbmRTaG91bGRCZUludGVyY2VwdGVkKGFjdGlvbilcbiAgKTtcbn1cblxuZnVuY3Rpb24gZGlkQ29tZUJhY2tPbmxpbmUoYWN0aW9uOiBFbnF1ZXVlZEFjdGlvbiwgd2FzQ29ubmVjdGVkOiBib29sZWFuKSB7XG4gIGlmICgndHlwZScgaW4gYWN0aW9uICYmICdwYXlsb2FkJyBpbiBhY3Rpb24pIHtcbiAgICByZXR1cm4gKFxuICAgICAgYWN0aW9uLnR5cGUgPT09IG5ldHdvcmtBY3Rpb25UeXBlcy5DT05ORUNUSU9OX0NIQU5HRSAmJlxuICAgICAgIXdhc0Nvbm5lY3RlZCAmJlxuICAgICAgYWN0aW9uLnBheWxvYWQgPT09IHRydWVcbiAgICApO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZGlkUXVldWVSZXN1bWUoYWN0aW9uOiBFbnF1ZXVlZEFjdGlvbiwgaXNRdWV1ZVBhdXNlZDogYm9vbGVhbikge1xuICBpZiAoJ3R5cGUnIGluIGFjdGlvbiAmJiAncGF5bG9hZCcgaW4gYWN0aW9uKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGFjdGlvbi50eXBlID09PSBuZXR3b3JrQWN0aW9uVHlwZXMuQ0hBTkdFX1FVRVVFX1NFTUFQSE9SRSAmJlxuICAgICAgaXNRdWV1ZVBhdXNlZCAmJlxuICAgICAgYWN0aW9uLnBheWxvYWQgPT09IFNFTUFQSE9SRV9DT0xPUi5HUkVFTlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlUmVsZWFzZVF1ZXVlID0gKFxuICBnZXRTdGF0ZTogR2V0U3RhdGUsXG4gIG5leHQ6IFN0b3JlRGlzcGF0Y2gsXG4gIGRlbGF5OiBudW1iZXIsXG4gIHNob3VsZERlcXVldWVTZWxlY3RvcjogQXJndW1lbnRzWydzaG91bGREZXF1ZXVlU2VsZWN0b3InXSxcbikgPT4gYXN5bmMgKHF1ZXVlOiBFbnF1ZXVlZEFjdGlvbltdKSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBxdWV1ZSkge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICBjb25zdCB7IGlzQ29ubmVjdGVkLCBpc1F1ZXVlUGF1c2VkIH0gPSBzdGF0ZS5uZXR3b3JrO1xuICAgIGlmIChpc0Nvbm5lY3RlZCAmJiAhaXNRdWV1ZVBhdXNlZCAmJiBzaG91bGREZXF1ZXVlU2VsZWN0b3Ioc3RhdGUpKSB7XG4gICAgICBuZXh0KHJlbW92ZUFjdGlvbkZyb21RdWV1ZShhY3Rpb24pKTtcbiAgICAgIG5leHQoYWN0aW9uKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgYXdhaXQgd2FpdChkZWxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlTmV0d29ya01pZGRsZXdhcmUoe1xuICByZWdleEFjdGlvblR5cGUgPSBERUZBVUxUX0FSR1VNRU5UUy5yZWdleEFjdGlvblR5cGUsXG4gIGFjdGlvblR5cGVzID0gREVGQVVMVF9BUkdVTUVOVFMuYWN0aW9uVHlwZXMsXG4gIHF1ZXVlUmVsZWFzZVRocm90dGxlID0gREVGQVVMVF9BUkdVTUVOVFMucXVldWVSZWxlYXNlVGhyb3R0bGUsXG4gIHNob3VsZERlcXVldWVTZWxlY3RvciA9IERFRkFVTFRfQVJHVU1FTlRTLnNob3VsZERlcXVldWVTZWxlY3Rvcixcbn06IFBhcnRpYWw8QXJndW1lbnRzPiA9IHt9KTogTWlkZGxld2FyZTx7fSwgU3RhdGUsIERpc3BhdGNoPiB7XG4gIHJldHVybiAoeyBnZXRTdGF0ZSB9OiBNaWRkbGV3YXJlQVBJPERpc3BhdGNoLCBTdGF0ZT4pID0+IChcbiAgICBuZXh0OiBTdG9yZURpc3BhdGNoLFxuICApID0+IChhY3Rpb246IEVucXVldWVkQWN0aW9uKSA9PiB7XG4gICAgY29uc3QgeyBpc0Nvbm5lY3RlZCwgYWN0aW9uUXVldWUsIGlzUXVldWVQYXVzZWQgfSA9IGdldFN0YXRlKCkubmV0d29yaztcbiAgICBjb25zdCByZWxlYXNlUXVldWUgPSBjcmVhdGVSZWxlYXNlUXVldWUoXG4gICAgICBnZXRTdGF0ZSxcbiAgICAgIG5leHQsXG4gICAgICBxdWV1ZVJlbGVhc2VUaHJvdHRsZSxcbiAgICAgIHNob3VsZERlcXVldWVTZWxlY3RvcixcbiAgICApO1xuICAgIHZhbGlkYXRlUGFyYW1zKHJlZ2V4QWN0aW9uVHlwZSwgYWN0aW9uVHlwZXMpO1xuXG4gICAgY29uc3Qgc2hvdWxkSW50ZXJjZXB0QWN0aW9uID0gY2hlY2tJZkFjdGlvblNob3VsZEJlSW50ZXJjZXB0ZWQoXG4gICAgICBhY3Rpb24sXG4gICAgICByZWdleEFjdGlvblR5cGUsXG4gICAgICBhY3Rpb25UeXBlcyxcbiAgICApO1xuXG4gICAgaWYgKHNob3VsZEludGVyY2VwdEFjdGlvbiAmJiBpc0Nvbm5lY3RlZCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIE9mZmxpbmUsIHByZXZlbnRpbmcgdGhlIG9yaWdpbmFsIGFjdGlvbiBmcm9tIGJlaW5nIGRpc3BhdGNoZWQuXG4gICAgICAvLyBEaXNwYXRjaGluZyBhbiBpbnRlcm5hbCBhY3Rpb24gaW5zdGVhZC5cbiAgICAgIHJldHVybiBuZXh0KGZldGNoT2ZmbGluZU1vZGUoYWN0aW9uKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNCYWNrT25saW5lID0gZGlkQ29tZUJhY2tPbmxpbmUoYWN0aW9uLCBpc0Nvbm5lY3RlZCk7XG4gICAgY29uc3QgaGFzUXVldWVCZWVuUmVzdW1lZCA9IGRpZFF1ZXVlUmVzdW1lKGFjdGlvbiwgaXNRdWV1ZVBhdXNlZCk7XG5cbiAgICBjb25zdCBzaG91bGREZXF1ZXVlID1cbiAgICAgIChpc0JhY2tPbmxpbmUgfHwgKGlzQ29ubmVjdGVkICYmIGhhc1F1ZXVlQmVlblJlc3VtZWQpKSAmJlxuICAgICAgc2hvdWxkRGVxdWV1ZVNlbGVjdG9yKGdldFN0YXRlKCkpO1xuXG4gICAgaWYgKHNob3VsZERlcXVldWUpIHtcbiAgICAgIC8vIERpc3BhdGNoaW5nIHF1ZXVlZCBhY3Rpb25zIGluIG9yZGVyIG9mIGFycml2YWwgKGlmIHdlIGhhdmUgYW55KVxuICAgICAgbmV4dChhY3Rpb24pO1xuICAgICAgcmV0dXJuIHJlbGVhc2VRdWV1ZShhY3Rpb25RdWV1ZSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2tpbmcgaWYgd2UgaGF2ZSBhIGRpc21pc3NhbCBjYXNlXG4gICAgLy8gbmFycm93IGRvd24gdHlwZSBmcm9tIHRodW5rIHRvIG9ubHkgcGFzcyBpbiBhY3Rpb25zIHdpdGggdHlwZSAtPiBBbnlBY3Rpb25cbiAgICBpZiAoJ3R5cGUnIGluIGFjdGlvbikge1xuICAgICAgY29uc3QgaXNBbnlBY3Rpb25Ub0JlRGlzbWlzc2VkID0gZmluZEFjdGlvblRvQmVEaXNtaXNzZWQoXG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgYWN0aW9uUXVldWUsXG4gICAgICApO1xuICAgICAgaWYgKGlzQW55QWN0aW9uVG9CZURpc21pc3NlZCAmJiAhaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgbmV4dChkaXNtaXNzQWN0aW9uc0Zyb21RdWV1ZShhY3Rpb24udHlwZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByb3h5IHRoZSBvcmlnaW5hbCBhY3Rpb24gdG8gdGhlIG5leHQgbWlkZGxld2FyZSBvbiB0aGUgY2hhaW4gb3IgZmluYWwgZGlzcGF0Y2hcbiAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXR3b3JrTWlkZGxld2FyZTtcbiJdLCJ2ZXJzaW9uIjozfQ==