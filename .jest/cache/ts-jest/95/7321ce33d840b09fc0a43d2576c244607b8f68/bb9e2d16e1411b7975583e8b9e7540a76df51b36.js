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
import * as actionTypes from './actionTypes';
export var connectionChange = function (isConnected) { return ({
    type: actionTypes.CONNECTION_CHANGE,
    payload: isConnected,
}); };
export var fetchOfflineMode = function (action) {
    var _a = action.meta, meta = _a === void 0 ? {} : _a, actionRest = __rest(action, ["meta"]);
    if (typeof action === 'object') {
        return {
            type: actionTypes.FETCH_OFFLINE_MODE,
            payload: {
                prevAction: __assign({}, actionRest),
            },
            meta: meta,
        };
    }
    // Thunk
    return {
        type: actionTypes.FETCH_OFFLINE_MODE,
        payload: {
            prevThunk: action,
        },
        meta: meta,
    };
};
export var removeActionFromQueue = function (action) { return ({
    type: actionTypes.REMOVE_FROM_ACTION_QUEUE,
    payload: action,
}); };
export var dismissActionsFromQueue = function (actionTrigger) { return ({
    type: actionTypes.DISMISS_ACTIONS_FROM_QUEUE,
    payload: actionTrigger,
}); };
export var changeQueueSemaphore = function (semaphoreColor) { return ({
    type: actionTypes.CHANGE_QUEUE_SEMAPHORE,
    payload: semaphoreColor,
}); };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvYWN0aW9uQ3JlYXRvcnMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBRzdDLE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUFHLFVBQUMsV0FBb0IsSUFBSyxPQUFBLENBQUM7SUFDekQsSUFBSSxFQUFFLFdBQVcsQ0FBQyxpQkFBeUQ7SUFDM0UsT0FBTyxFQUFFLFdBQVc7Q0FDckIsQ0FBQyxFQUh3RCxDQUd4RCxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxNQUFzQjtJQUM3QyxJQUFBLGdCQUFTLEVBQVQsOEJBQVMsRUFBRSxxQ0FBYSxDQUFZO0lBQzVDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsV0FBVyxDQUFDLGtCQUEyRDtZQUM3RSxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxlQUNMLFVBQVUsQ0FDZDthQUNGO1lBQ0QsSUFBSSxNQUFBO1NBQ0wsQ0FBQztLQUNIO0lBQ0QsUUFBUTtJQUNSLE9BQU87UUFDTCxJQUFJLEVBQUUsV0FBVyxDQUFDLGtCQUEyRDtRQUM3RSxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsTUFBTTtTQUNsQjtRQUNELElBQUksTUFBQTtLQUNMLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLE1BQXNCLElBQUssT0FBQSxDQUFDO0lBQ2hFLElBQUksRUFBRSxXQUFXLENBQUMsd0JBQXVFO0lBQ3pGLE9BQU8sRUFBRSxNQUFNO0NBQ2hCLENBQUMsRUFIK0QsQ0FHL0QsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFHLFVBQUMsYUFBcUIsSUFBSyxPQUFBLENBQUM7SUFDakUsSUFBSSxFQUFFLFdBQVcsQ0FBQywwQkFBMkU7SUFDN0YsT0FBTyxFQUFFLGFBQWE7Q0FDdkIsQ0FBQyxFQUhnRSxDQUdoRSxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxjQUE4QixJQUFLLE9BQUEsQ0FBQztJQUN2RSxJQUFJLEVBQUUsV0FBVyxDQUFDLHNCQUFzQjtJQUN4QyxPQUFPLEVBQUUsY0FBYztDQUN4QixDQUFDLEVBSHNFLENBR3RFLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvcmVkdXgvYWN0aW9uQ3JlYXRvcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYWN0aW9uVHlwZXMgZnJvbSAnLi9hY3Rpb25UeXBlcyc7XG5pbXBvcnQgeyBFbnF1ZXVlZEFjdGlvbiwgU2VtYXBob3JlQ29sb3IgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0aW9uQ2hhbmdlID0gKGlzQ29ubmVjdGVkOiBib29sZWFuKSA9PiAoe1xuICB0eXBlOiBhY3Rpb25UeXBlcy5DT05ORUNUSU9OX0NIQU5HRSBhcyB0eXBlb2YgYWN0aW9uVHlwZXMuQ09OTkVDVElPTl9DSEFOR0UsXG4gIHBheWxvYWQ6IGlzQ29ubmVjdGVkLFxufSk7XG5cbmV4cG9ydCBjb25zdCBmZXRjaE9mZmxpbmVNb2RlID0gKGFjdGlvbjogRW5xdWV1ZWRBY3Rpb24pID0+IHtcbiAgY29uc3QgeyBtZXRhID0ge30sIC4uLmFjdGlvblJlc3QgfSA9IGFjdGlvbjtcbiAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IGFjdGlvblR5cGVzLkZFVENIX09GRkxJTkVfTU9ERSBhcyB0eXBlb2YgYWN0aW9uVHlwZXMuRkVUQ0hfT0ZGTElORV9NT0RFLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBwcmV2QWN0aW9uOiB7XG4gICAgICAgICAgLi4uYWN0aW9uUmVzdCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtZXRhLFxuICAgIH07XG4gIH1cbiAgLy8gVGh1bmtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25UeXBlcy5GRVRDSF9PRkZMSU5FX01PREUgYXMgdHlwZW9mIGFjdGlvblR5cGVzLkZFVENIX09GRkxJTkVfTU9ERSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBwcmV2VGh1bms6IGFjdGlvbixcbiAgICB9LFxuICAgIG1ldGEsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQWN0aW9uRnJvbVF1ZXVlID0gKGFjdGlvbjogRW5xdWV1ZWRBY3Rpb24pID0+ICh7XG4gIHR5cGU6IGFjdGlvblR5cGVzLlJFTU9WRV9GUk9NX0FDVElPTl9RVUVVRSBhcyB0eXBlb2YgYWN0aW9uVHlwZXMuUkVNT1ZFX0ZST01fQUNUSU9OX1FVRVVFLFxuICBwYXlsb2FkOiBhY3Rpb24sXG59KTtcblxuZXhwb3J0IGNvbnN0IGRpc21pc3NBY3Rpb25zRnJvbVF1ZXVlID0gKGFjdGlvblRyaWdnZXI6IHN0cmluZykgPT4gKHtcbiAgdHlwZTogYWN0aW9uVHlwZXMuRElTTUlTU19BQ1RJT05TX0ZST01fUVVFVUUgYXMgdHlwZW9mIGFjdGlvblR5cGVzLkRJU01JU1NfQUNUSU9OU19GUk9NX1FVRVVFLFxuICBwYXlsb2FkOiBhY3Rpb25UcmlnZ2VyLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VRdWV1ZVNlbWFwaG9yZSA9IChzZW1hcGhvcmVDb2xvcjogU2VtYXBob3JlQ29sb3IpID0+ICh7XG4gIHR5cGU6IGFjdGlvblR5cGVzLkNIQU5HRV9RVUVVRV9TRU1BUEhPUkUsXG4gIHBheWxvYWQ6IHNlbWFwaG9yZUNvbG9yLFxufSk7XG5cbmV4cG9ydCB0eXBlIENvbm5lY3Rpb25DaGFuZ2VUeXBlID0gUmV0dXJuVHlwZTx0eXBlb2YgY29ubmVjdGlvbkNoYW5nZT47XG5leHBvcnQgdHlwZSBGZXRjaE9mZmxpbmVNb2RlVHlwZSA9IFJldHVyblR5cGU8dHlwZW9mIGZldGNoT2ZmbGluZU1vZGU+O1xuZXhwb3J0IHR5cGUgUmVtb3ZlQWN0aW9uRnJvbVF1ZXVlVHlwZSA9IFJldHVyblR5cGU8XG4gIHR5cGVvZiByZW1vdmVBY3Rpb25Gcm9tUXVldWVcbj47XG5leHBvcnQgdHlwZSBEaXNtaXNzQWN0aW9uc0Zyb21RdWV1ZVR5cGUgPSBSZXR1cm5UeXBlPFxuICB0eXBlb2YgZGlzbWlzc0FjdGlvbnNGcm9tUXVldWVcbj47XG5leHBvcnQgdHlwZSBDaGFuZ2VRdWV1ZVNlbWFwaG9yZVR5cGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBjaGFuZ2VRdWV1ZVNlbWFwaG9yZT47XG5cbmV4cG9ydCB0eXBlIFJlZHV4QWN0aW9ucyA9XG4gIHwgQ29ubmVjdGlvbkNoYW5nZVR5cGVcbiAgfCBGZXRjaE9mZmxpbmVNb2RlVHlwZVxuICB8IFJlbW92ZUFjdGlvbkZyb21RdWV1ZVR5cGVcbiAgfCBEaXNtaXNzQWN0aW9uc0Zyb21RdWV1ZVR5cGVcbiAgfCBDaGFuZ2VRdWV1ZVNlbWFwaG9yZVR5cGU7XG4iXSwidmVyc2lvbiI6M30=