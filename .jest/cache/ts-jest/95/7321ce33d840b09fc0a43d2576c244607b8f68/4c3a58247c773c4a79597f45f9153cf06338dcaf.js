import getSimilarActionInQueue from '../utils/getSimilarActionInQueue';
describe('getSimilarActionInQueue', function () {
    describe('action is an object', function () {
        var action1 = {
            type: 'foo',
            payload: {
                bar: 1,
            },
        };
        var action1Copy = {
            type: 'foo',
            payload: {
                bar: 1,
            },
        };
        var action2 = {
            type: 'foo',
            payload: {
                bar: 3,
            },
        };
        it('should return the action enqueued if it presents the same shape than some action passed', function () {
            expect(getSimilarActionInQueue(action1Copy, [action1])).toBe(action1);
        });
        it('should return undefined if the action enqueued does NOT present the same shape than the action passed', function () {
            expect(getSimilarActionInQueue(action1, [action2])).toBe(undefined);
        });
    });
    describe('action is a thunk', function () {
        var thunkFactory = function (param) {
            function thunk1(dispatch) {
                dispatch({ type: 'FETCH_DATA_REQUEST', payload: param });
            }
            return thunk1;
        };
        function thunk2(dispatch) {
            dispatch({ type: 'SOMETHING_ELSE' });
        }
        it("should return the thunk enqueued if\n     it presents the same shape than the thunk passed", function () {
            var thunk = thunkFactory('foo');
            var thunkCopy = thunkFactory('bar');
            expect(getSimilarActionInQueue(thunkCopy, [thunk])).toBe(thunk);
            expect(getSimilarActionInQueue(thunk, [thunk])).toBe(thunk);
        });
        it("should return undefined if the thunk enqueued\n     does NOT present the same shape than the thunk passed", function () {
            expect(getSimilarActionInQueue(thunkFactory('foo'), [thunk2])).toBe(undefined);
        });
    });
    it('returns undefined if action JS type is something different', function () {
        expect(getSimilarActionInQueue(false, [])).toBe(undefined);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9nZXRTaW1pbGFyQWN0aW9uSW5RdWV1ZS50ZXN0LnRzIiwibWFwcGluZ3MiOiJBQUNBLE9BQU8sdUJBQXVCLE1BQU0sc0NBQXNDLENBQUM7QUFFM0UsUUFBUSxDQUFDLHlCQUF5QixFQUFFO0lBQ2xDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFNLE9BQU8sR0FBRztZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxDQUFDO2FBQ1A7U0FDRixDQUFDO1FBQ0YsSUFBTSxXQUFXLEdBQUc7WUFDbEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsR0FBRyxFQUFFLENBQUM7YUFDUDtTQUNGLENBQUM7UUFDRixJQUFNLE9BQU8sR0FBRztZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxDQUFDO2FBQ1A7U0FDRixDQUFDO1FBRUYsRUFBRSxDQUFDLHlGQUF5RixFQUFFO1lBQzVGLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVHQUF1RyxFQUFFO1lBQzFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDNUIsSUFBTSxZQUFZLEdBQUcsVUFBQyxLQUFVO1lBQzlCLFNBQVMsTUFBTSxDQUFDLFFBQWtCO2dCQUNoQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVGLFNBQVMsTUFBTSxDQUFDLFFBQWtCO1lBQ2hDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELEVBQUUsQ0FBQyw0RkFDK0MsRUFBRTtZQUNsRCxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJHQUNvRCxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNqRSxTQUFTLENBQ1YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNERBQTRELEVBQUU7UUFDL0QsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3QvZ2V0U2ltaWxhckFjdGlvbkluUXVldWUudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBnZXRTaW1pbGFyQWN0aW9uSW5RdWV1ZSBmcm9tICcuLi9zcmMvdXRpbHMvZ2V0U2ltaWxhckFjdGlvbkluUXVldWUnO1xuXG5kZXNjcmliZSgnZ2V0U2ltaWxhckFjdGlvbkluUXVldWUnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdhY3Rpb24gaXMgYW4gb2JqZWN0JywgKCkgPT4ge1xuICAgIGNvbnN0IGFjdGlvbjEgPSB7XG4gICAgICB0eXBlOiAnZm9vJyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgYmFyOiAxLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IGFjdGlvbjFDb3B5ID0ge1xuICAgICAgdHlwZTogJ2ZvbycsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGJhcjogMSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBhY3Rpb24yID0ge1xuICAgICAgdHlwZTogJ2ZvbycsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGJhcjogMyxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBhY3Rpb24gZW5xdWV1ZWQgaWYgaXQgcHJlc2VudHMgdGhlIHNhbWUgc2hhcGUgdGhhbiBzb21lIGFjdGlvbiBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoZ2V0U2ltaWxhckFjdGlvbkluUXVldWUoYWN0aW9uMUNvcHksIFthY3Rpb24xXSkpLnRvQmUoYWN0aW9uMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB1bmRlZmluZWQgaWYgdGhlIGFjdGlvbiBlbnF1ZXVlZCBkb2VzIE5PVCBwcmVzZW50IHRoZSBzYW1lIHNoYXBlIHRoYW4gdGhlIGFjdGlvbiBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoZ2V0U2ltaWxhckFjdGlvbkluUXVldWUoYWN0aW9uMSwgW2FjdGlvbjJdKSkudG9CZSh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnYWN0aW9uIGlzIGEgdGh1bmsnLCAoKSA9PiB7XG4gICAgY29uc3QgdGh1bmtGYWN0b3J5ID0gKHBhcmFtOiBhbnkpID0+IHtcbiAgICAgIGZ1bmN0aW9uIHRodW5rMShkaXNwYXRjaDogRGlzcGF0Y2gpIHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnRkVUQ0hfREFUQV9SRVFVRVNUJywgcGF5bG9hZDogcGFyYW0gfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGh1bmsxO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0aHVuazIoZGlzcGF0Y2g6IERpc3BhdGNoKSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdTT01FVEhJTkdfRUxTRScgfSk7XG4gICAgfVxuXG4gICAgaXQoYHNob3VsZCByZXR1cm4gdGhlIHRodW5rIGVucXVldWVkIGlmXG4gICAgIGl0IHByZXNlbnRzIHRoZSBzYW1lIHNoYXBlIHRoYW4gdGhlIHRodW5rIHBhc3NlZGAsICgpID0+IHtcbiAgICAgIGNvbnN0IHRodW5rID0gdGh1bmtGYWN0b3J5KCdmb28nKTtcbiAgICAgIGNvbnN0IHRodW5rQ29weSA9IHRodW5rRmFjdG9yeSgnYmFyJyk7XG4gICAgICBleHBlY3QoZ2V0U2ltaWxhckFjdGlvbkluUXVldWUodGh1bmtDb3B5LCBbdGh1bmtdKSkudG9CZSh0aHVuayk7XG4gICAgICBleHBlY3QoZ2V0U2ltaWxhckFjdGlvbkluUXVldWUodGh1bmssIFt0aHVua10pKS50b0JlKHRodW5rKTtcbiAgICB9KTtcblxuICAgIGl0KGBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCBpZiB0aGUgdGh1bmsgZW5xdWV1ZWRcbiAgICAgZG9lcyBOT1QgcHJlc2VudCB0aGUgc2FtZSBzaGFwZSB0aGFuIHRoZSB0aHVuayBwYXNzZWRgLCAoKSA9PiB7XG4gICAgICBleHBlY3QoZ2V0U2ltaWxhckFjdGlvbkluUXVldWUodGh1bmtGYWN0b3J5KCdmb28nKSwgW3RodW5rMl0pKS50b0JlKFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgYWN0aW9uIEpTIHR5cGUgaXMgc29tZXRoaW5nIGRpZmZlcmVudCcsICgpID0+IHtcbiAgICBleHBlY3QoZ2V0U2ltaWxhckFjdGlvbkluUXVldWUoZmFsc2UsIFtdKSkudG9CZSh1bmRlZmluZWQpO1xuICB9KTtcbn0pO1xuIl0sInZlcnNpb24iOjN9