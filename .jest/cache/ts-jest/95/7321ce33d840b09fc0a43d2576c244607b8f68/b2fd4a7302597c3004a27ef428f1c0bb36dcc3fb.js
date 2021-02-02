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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import get from 'lodash/get';
import without from 'lodash/without';
import * as actionTypes from './actionTypes';
import { SEMAPHORE_COLOR } from '../utils/constants';
import getSimilarActionInQueue from '../utils/getSimilarActionInQueue';
import nonNullable from '../utils/nonNullable';
var actionQueue = [];
export var initialState = {
    isConnected: true,
    actionQueue: actionQueue,
    isQueuePaused: false,
};
function handleOfflineAction(state, _a, comparisonFn) {
    var _b = _a.payload, prevAction = _b.prevAction, prevThunk = _b.prevThunk, meta = _a.meta;
    var isActionToRetry = typeof prevAction === 'object' && get(meta, 'retry') === true;
    var isThunkToRetry = typeof prevThunk === 'function' && get(prevThunk, 'meta.retry') === true;
    if (isActionToRetry || isThunkToRetry) {
        // If a similar action already existed on the queue, we remove it and push it again to the end of the queue
        var actionToLookUp = prevAction || prevThunk;
        var actionWithMetaData = typeof actionToLookUp === 'object'
            ? __assign(__assign({}, actionToLookUp), { meta: meta })
            : actionToLookUp;
        var similarActionQueued = comparisonFn(actionWithMetaData, state.actionQueue);
        var newActionQueue = similarActionQueued
            ? __spreadArrays(without(state.actionQueue, similarActionQueued), [actionWithMetaData]) : __spreadArrays(state.actionQueue, [actionWithMetaData]);
        return __assign(__assign({}, state), { actionQueue: newActionQueue.filter(nonNullable) });
    }
    return state;
}
function handleRemoveActionFromQueue(state, action) {
    var similarActionQueued = getSimilarActionInQueue(action, state.actionQueue);
    return __assign(__assign({}, state), { actionQueue: without(state.actionQueue, similarActionQueued).filter(nonNullable) });
}
function handleDismissActionsFromQueue(state, triggerActionToDismiss) {
    var newActionQueue = state.actionQueue.filter(function (action) {
        var dismissArray = get(action, 'meta.dismiss', []);
        return !dismissArray.includes(triggerActionToDismiss);
    });
    return __assign(__assign({}, state), { actionQueue: newActionQueue });
}
function handleChangeQueueSemaphore(state, semaphoreColor) {
    return __assign(__assign({}, state), { isQueuePaused: semaphoreColor === SEMAPHORE_COLOR.RED });
}
export default (function (comparisonFn) {
    if (comparisonFn === void 0) { comparisonFn = getSimilarActionInQueue; }
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case actionTypes.CONNECTION_CHANGE:
                return __assign(__assign({}, state), { isConnected: action.payload });
            case actionTypes.FETCH_OFFLINE_MODE:
                return handleOfflineAction(state, action, comparisonFn);
            case actionTypes.REMOVE_FROM_ACTION_QUEUE:
                return handleRemoveActionFromQueue(state, action.payload);
            case actionTypes.DISMISS_ACTIONS_FROM_QUEUE:
                return handleDismissActionsFromQueue(state, action.payload);
            case actionTypes.CHANGE_QUEUE_SEMAPHORE:
                return handleChangeQueueSemaphore(state, action.payload);
            default:
                return state;
        }
    };
});
export function networkSelector(state) {
    return state.network;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvY3JlYXRlUmVkdWNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUM7QUFDN0IsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxLQUFLLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sdUJBQXVCLE1BQU0sa0NBQWtDLENBQUM7QUFTdkUsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFPL0MsSUFBTSxXQUFXLEdBQXFCLEVBQUUsQ0FBQztBQUN6QyxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQUc7SUFDMUIsV0FBVyxFQUFFLElBQUk7SUFDakIsV0FBVyxhQUFBO0lBQ1gsYUFBYSxFQUFFLEtBQUs7Q0FDckIsQ0FBQztBQUVGLFNBQVMsbUJBQW1CLENBQzFCLEtBQW1CLEVBQ25CLEVBQWtFLEVBQ2xFLFlBQTBCO1FBRHhCLGVBQWtDLEVBQXZCLDBCQUFVLEVBQUUsd0JBQVMsRUFBSSxjQUFJO0lBRzFDLElBQU0sZUFBZSxHQUNuQixPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUM7SUFFaEUsSUFBTSxjQUFjLEdBQ2xCLE9BQU8sU0FBUyxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQztJQUUzRSxJQUFJLGVBQWUsSUFBSSxjQUFjLEVBQUU7UUFDckMsMkdBQTJHO1FBQzNHLElBQU0sY0FBYyxHQUFHLFVBQVUsSUFBSSxTQUFTLENBQUM7UUFDL0MsSUFBTSxrQkFBa0IsR0FDdEIsT0FBTyxjQUFjLEtBQUssUUFBUTtZQUNoQyxDQUFDLENBQUUsc0JBQUssY0FBYyxLQUFFLElBQUksTUFBQSxHQUFpQjtZQUM3QyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ3JCLElBQU0sbUJBQW1CLEdBQUcsWUFBWSxDQUN0QyxrQkFBa0IsRUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FDbEIsQ0FBQztRQUNGLElBQU0sY0FBYyxHQUFHLG1CQUFtQjtZQUN4QyxDQUFDLGdCQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDLEdBQUUsa0JBQWtCLEdBQ3pFLENBQUMsZ0JBQUssS0FBSyxDQUFDLFdBQVcsR0FBRSxrQkFBa0IsRUFBQyxDQUFDO1FBQy9DLDZCQUNLLEtBQUssS0FDUixXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFDL0M7S0FDSDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsMkJBQTJCLENBQ2xDLEtBQW1CLEVBQ25CLE1BQXNCO0lBRXRCLElBQU0sbUJBQW1CLEdBQUcsdUJBQXVCLENBQ2pELE1BQU0sRUFDTixLQUFLLENBQUMsV0FBVyxDQUNsQixDQUFDO0lBRUYsNkJBQ0ssS0FBSyxLQUNSLFdBQVcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FDakUsV0FBVyxDQUNaLElBQ0Q7QUFDSixDQUFDO0FBRUQsU0FBUyw2QkFBNkIsQ0FDcEMsS0FBbUIsRUFDbkIsc0JBQThCO0lBRTlCLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtRQUNwRCxJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBRUgsNkJBQ0ssS0FBSyxLQUNSLFdBQVcsRUFBRSxjQUFjLElBQzNCO0FBQ0osQ0FBQztBQUVELFNBQVMsMEJBQTBCLENBQ2pDLEtBQW1CLEVBQ25CLGNBQThCO0lBRTlCLDZCQUNLLEtBQUssS0FDUixhQUFhLEVBQUUsY0FBYyxLQUFLLGVBQWUsQ0FBQyxHQUFHLElBQ3JEO0FBQ0osQ0FBQztBQUVELGdCQUFlLFVBQUMsWUFBb0Q7SUFBcEQsNkJBQUEsRUFBQSxzQ0FBb0Q7SUFBSyxPQUFBLFVBQ3ZFLEtBQWtDLEVBQ2xDLE1BQWdDO1FBRGhDLHNCQUFBLEVBQUEsb0JBQWtDO1FBR2xDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLFdBQVcsQ0FBQyxpQkFBaUI7Z0JBQ2hDLDZCQUNLLEtBQUssS0FDUixXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDM0I7WUFDSixLQUFLLFdBQVcsQ0FBQyxrQkFBa0I7Z0JBQ2pDLE9BQU8sbUJBQW1CLENBQ3hCLEtBQUssRUFDTCxNQUE4QixFQUM5QixZQUFZLENBQ2IsQ0FBQztZQUVKLEtBQUssV0FBVyxDQUFDLHdCQUF3QjtnQkFDdkMsT0FBTywyQkFBMkIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELEtBQUssV0FBVyxDQUFDLDBCQUEwQjtnQkFDekMsT0FBTyw2QkFBNkIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELEtBQUssV0FBVyxDQUFDLHNCQUFzQjtnQkFDckMsT0FBTywwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNEO2dCQUNFLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztBQTFCd0UsQ0EwQnhFLEVBQUM7QUFFRixNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQWdDO0lBQzlELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3JlZHV4L2NyZWF0ZVJlZHVjZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcbmltcG9ydCB3aXRob3V0IGZyb20gJ2xvZGFzaC93aXRob3V0JztcbmltcG9ydCB7IEFueUFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCAqIGFzIGFjdGlvblR5cGVzIGZyb20gJy4vYWN0aW9uVHlwZXMnO1xuaW1wb3J0IHsgU0VNQVBIT1JFX0NPTE9SIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCBnZXRTaW1pbGFyQWN0aW9uSW5RdWV1ZSBmcm9tICcuLi91dGlscy9nZXRTaW1pbGFyQWN0aW9uSW5RdWV1ZSc7XG5pbXBvcnQge1xuICBOZXR3b3JrU3RhdGUsXG4gIEVucXVldWVkQWN0aW9uLFxuICBGbHV4QWN0aW9uLFxuICBUaHVuayxcbiAgU2VtYXBob3JlQ29sb3IsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFJlZHV4QWN0aW9ucywgRmV0Y2hPZmZsaW5lTW9kZVR5cGUgfSBmcm9tICcuL2FjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBub25OdWxsYWJsZSBmcm9tICcuLi91dGlscy9ub25OdWxsYWJsZSc7XG5cbnR5cGUgQ29tcGFyaXNvbkZuID0gKFxuICBhY3Rpb246IGFueSxcbiAgYWN0aW9uUXVldWU6IEVucXVldWVkQWN0aW9uW10sXG4pID0+IEZsdXhBY3Rpb248YW55PiB8IFRodW5rIHwgdW5kZWZpbmVkO1xuXG5jb25zdCBhY3Rpb25RdWV1ZTogRW5xdWV1ZWRBY3Rpb25bXSA9IFtdO1xuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgaXNDb25uZWN0ZWQ6IHRydWUsXG4gIGFjdGlvblF1ZXVlLFxuICBpc1F1ZXVlUGF1c2VkOiBmYWxzZSxcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZU9mZmxpbmVBY3Rpb24oXG4gIHN0YXRlOiBOZXR3b3JrU3RhdGUsXG4gIHsgcGF5bG9hZDogeyBwcmV2QWN0aW9uLCBwcmV2VGh1bmsgfSwgbWV0YSB9OiBGZXRjaE9mZmxpbmVNb2RlVHlwZSxcbiAgY29tcGFyaXNvbkZuOiBDb21wYXJpc29uRm4sXG4pOiBOZXR3b3JrU3RhdGUge1xuICBjb25zdCBpc0FjdGlvblRvUmV0cnkgPVxuICAgIHR5cGVvZiBwcmV2QWN0aW9uID09PSAnb2JqZWN0JyAmJiBnZXQobWV0YSwgJ3JldHJ5JykgPT09IHRydWU7XG5cbiAgY29uc3QgaXNUaHVua1RvUmV0cnkgPVxuICAgIHR5cGVvZiBwcmV2VGh1bmsgPT09ICdmdW5jdGlvbicgJiYgZ2V0KHByZXZUaHVuaywgJ21ldGEucmV0cnknKSA9PT0gdHJ1ZTtcblxuICBpZiAoaXNBY3Rpb25Ub1JldHJ5IHx8IGlzVGh1bmtUb1JldHJ5KSB7XG4gICAgLy8gSWYgYSBzaW1pbGFyIGFjdGlvbiBhbHJlYWR5IGV4aXN0ZWQgb24gdGhlIHF1ZXVlLCB3ZSByZW1vdmUgaXQgYW5kIHB1c2ggaXQgYWdhaW4gdG8gdGhlIGVuZCBvZiB0aGUgcXVldWVcbiAgICBjb25zdCBhY3Rpb25Ub0xvb2tVcCA9IHByZXZBY3Rpb24gfHwgcHJldlRodW5rO1xuICAgIGNvbnN0IGFjdGlvbldpdGhNZXRhRGF0YSA9XG4gICAgICB0eXBlb2YgYWN0aW9uVG9Mb29rVXAgPT09ICdvYmplY3QnXG4gICAgICAgID8gKHsgLi4uYWN0aW9uVG9Mb29rVXAsIG1ldGEgfSBhcyBGbHV4QWN0aW9uKVxuICAgICAgICA6IGFjdGlvblRvTG9va1VwO1xuICAgIGNvbnN0IHNpbWlsYXJBY3Rpb25RdWV1ZWQgPSBjb21wYXJpc29uRm4oXG4gICAgICBhY3Rpb25XaXRoTWV0YURhdGEsXG4gICAgICBzdGF0ZS5hY3Rpb25RdWV1ZSxcbiAgICApO1xuICAgIGNvbnN0IG5ld0FjdGlvblF1ZXVlID0gc2ltaWxhckFjdGlvblF1ZXVlZFxuICAgICAgPyBbLi4ud2l0aG91dChzdGF0ZS5hY3Rpb25RdWV1ZSwgc2ltaWxhckFjdGlvblF1ZXVlZCksIGFjdGlvbldpdGhNZXRhRGF0YV1cbiAgICAgIDogWy4uLnN0YXRlLmFjdGlvblF1ZXVlLCBhY3Rpb25XaXRoTWV0YURhdGFdO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGlvblF1ZXVlOiBuZXdBY3Rpb25RdWV1ZS5maWx0ZXIobm9uTnVsbGFibGUpLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVSZW1vdmVBY3Rpb25Gcm9tUXVldWUoXG4gIHN0YXRlOiBOZXR3b3JrU3RhdGUsXG4gIGFjdGlvbjogRW5xdWV1ZWRBY3Rpb24sXG4pOiBOZXR3b3JrU3RhdGUge1xuICBjb25zdCBzaW1pbGFyQWN0aW9uUXVldWVkID0gZ2V0U2ltaWxhckFjdGlvbkluUXVldWUoXG4gICAgYWN0aW9uLFxuICAgIHN0YXRlLmFjdGlvblF1ZXVlLFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgYWN0aW9uUXVldWU6IHdpdGhvdXQoc3RhdGUuYWN0aW9uUXVldWUsIHNpbWlsYXJBY3Rpb25RdWV1ZWQpLmZpbHRlcihcbiAgICAgIG5vbk51bGxhYmxlLFxuICAgICksXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURpc21pc3NBY3Rpb25zRnJvbVF1ZXVlKFxuICBzdGF0ZTogTmV0d29ya1N0YXRlLFxuICB0cmlnZ2VyQWN0aW9uVG9EaXNtaXNzOiBzdHJpbmcsXG4pOiBOZXR3b3JrU3RhdGUge1xuICBjb25zdCBuZXdBY3Rpb25RdWV1ZSA9IHN0YXRlLmFjdGlvblF1ZXVlLmZpbHRlcihhY3Rpb24gPT4ge1xuICAgIGNvbnN0IGRpc21pc3NBcnJheSA9IGdldChhY3Rpb24sICdtZXRhLmRpc21pc3MnLCBbXSk7XG4gICAgcmV0dXJuICFkaXNtaXNzQXJyYXkuaW5jbHVkZXModHJpZ2dlckFjdGlvblRvRGlzbWlzcyk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgYWN0aW9uUXVldWU6IG5ld0FjdGlvblF1ZXVlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDaGFuZ2VRdWV1ZVNlbWFwaG9yZShcbiAgc3RhdGU6IE5ldHdvcmtTdGF0ZSxcbiAgc2VtYXBob3JlQ29sb3I6IFNlbWFwaG9yZUNvbG9yLFxuKTogTmV0d29ya1N0YXRlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpc1F1ZXVlUGF1c2VkOiBzZW1hcGhvcmVDb2xvciA9PT0gU0VNQVBIT1JFX0NPTE9SLlJFRCxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGNvbXBhcmlzb25GbjogQ29tcGFyaXNvbkZuID0gZ2V0U2ltaWxhckFjdGlvbkluUXVldWUpID0+IChcbiAgc3RhdGU6IE5ldHdvcmtTdGF0ZSA9IGluaXRpYWxTdGF0ZSxcbiAgYWN0aW9uOiBSZWR1eEFjdGlvbnMgfCBBbnlBY3Rpb24sXG4pOiBOZXR3b3JrU3RhdGUgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25UeXBlcy5DT05ORUNUSU9OX0NIQU5HRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpc0Nvbm5lY3RlZDogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9O1xuICAgIGNhc2UgYWN0aW9uVHlwZXMuRkVUQ0hfT0ZGTElORV9NT0RFOlxuICAgICAgcmV0dXJuIGhhbmRsZU9mZmxpbmVBY3Rpb24oXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBhY3Rpb24gYXMgRmV0Y2hPZmZsaW5lTW9kZVR5cGUsXG4gICAgICAgIGNvbXBhcmlzb25GbixcbiAgICAgICk7XG5cbiAgICBjYXNlIGFjdGlvblR5cGVzLlJFTU9WRV9GUk9NX0FDVElPTl9RVUVVRTpcbiAgICAgIHJldHVybiBoYW5kbGVSZW1vdmVBY3Rpb25Gcm9tUXVldWUoc3RhdGUsIGFjdGlvbi5wYXlsb2FkKTtcbiAgICBjYXNlIGFjdGlvblR5cGVzLkRJU01JU1NfQUNUSU9OU19GUk9NX1FVRVVFOlxuICAgICAgcmV0dXJuIGhhbmRsZURpc21pc3NBY3Rpb25zRnJvbVF1ZXVlKHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG4gICAgY2FzZSBhY3Rpb25UeXBlcy5DSEFOR0VfUVVFVUVfU0VNQVBIT1JFOlxuICAgICAgcmV0dXJuIGhhbmRsZUNoYW5nZVF1ZXVlU2VtYXBob3JlKHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ldHdvcmtTZWxlY3RvcihzdGF0ZTogeyBuZXR3b3JrOiBOZXR3b3JrU3RhdGUgfSkge1xuICByZXR1cm4gc3RhdGUubmV0d29yaztcbn1cbiJdLCJ2ZXJzaW9uIjozfQ==