import isEqual from 'lodash/isEqual';
/**
 * Finds and returns a similar thunk or action in the actionQueue.
 * Else undefined.
 * @param action
 * @param actionQueue
 */
export default function getSimilarActionInQueue(action, actionQueue) {
    if (typeof action === 'object') {
        return actionQueue.find(function (queued) { return isEqual(queued, action); });
    }
    if (typeof action === 'function') {
        return actionQueue.find(function (queued) { return action.toString() === queued.toString(); });
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdXRpbHMvZ2V0U2ltaWxhckFjdGlvbkluUXVldWUudHMiLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFHckM7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHVCQUF1QixDQUM3QyxNQUFXLEVBQ1gsV0FBNkI7SUFFN0IsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDaEMsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0tBQzVFO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMvRGV2QUMvRGVza3RvcC9BbmdhemEvcmVhY3Qtb2ZmbGluZS1zeW5jL3NyYy91dGlscy9nZXRTaW1pbGFyQWN0aW9uSW5RdWV1ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2gvaXNFcXVhbCc7XG5pbXBvcnQgeyBFbnF1ZXVlZEFjdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBGaW5kcyBhbmQgcmV0dXJucyBhIHNpbWlsYXIgdGh1bmsgb3IgYWN0aW9uIGluIHRoZSBhY3Rpb25RdWV1ZS5cbiAqIEVsc2UgdW5kZWZpbmVkLlxuICogQHBhcmFtIGFjdGlvblxuICogQHBhcmFtIGFjdGlvblF1ZXVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFNpbWlsYXJBY3Rpb25JblF1ZXVlKFxuICBhY3Rpb246IGFueSxcbiAgYWN0aW9uUXVldWU6IEVucXVldWVkQWN0aW9uW10sXG4pIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFjdGlvblF1ZXVlLmZpbmQocXVldWVkID0+IGlzRXF1YWwocXVldWVkLCBhY3Rpb24pKTtcbiAgfVxuICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBhY3Rpb25RdWV1ZS5maW5kKHF1ZXVlZCA9PiBhY3Rpb24udG9TdHJpbmcoKSA9PT0gcXVldWVkLnRvU3RyaW5nKCkpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iXSwidmVyc2lvbiI6M30=