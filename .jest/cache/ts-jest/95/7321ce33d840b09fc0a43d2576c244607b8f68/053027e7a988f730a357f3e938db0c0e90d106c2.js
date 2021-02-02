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
import React from 'react';
import { View, Text } from 'react-native';
import { shallow as rnShallow, render as rnRender, } from 'react-native-testing-library';
import { shallow } from 'enzyme';
import { ReduxNetworkProvider, mapStateToProps, } from '../components/ReduxNetworkProvider';
import { connectionChange } from '../redux/actionCreators';
var dispatch = jest.fn();
var props = {
    dispatch: dispatch,
    isConnected: false,
};
var getProps = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    return (__assign(__assign({}, props), overrides));
};
describe('ReduxNetworkProvider', function () {
    afterEach(function () {
        dispatch.mockClear();
    });
    describe('render', function () {
        it('has the correct structure', function () {
            var output = rnShallow(React.createElement(ReduxNetworkProvider, __assign({}, props),
                React.createElement(View, null))).output;
            expect(output).toMatchSnapshot();
        });
        it('renders the children correctly', function () {
            var getByText = rnRender(React.createElement(ReduxNetworkProvider, __assign({}, props),
                React.createElement(Text, null, "Baz"))).getByText;
            var viewChild = getByText('Baz');
            expect(viewChild).toBeDefined();
        });
    });
    describe('handleConnectivityChange', function () {
        it("dispatches a CONNECTION_CHANGE action with the new connection", function () {
            var wrapper = shallow(React.createElement(ReduxNetworkProvider, __assign({}, props),
                React.createElement(View, null)));
            wrapper.instance().handleConnectivityChange(true);
            expect(props.dispatch).toHaveBeenCalledWith(connectionChange(true));
            expect(props.dispatch).toHaveBeenCalledTimes(1);
        });
        it("does NOT dispatch a CONNECTION_CHANGE action if the connection\n    did not change", function () {
            var wrapper = shallow(React.createElement(ReduxNetworkProvider, __assign({}, getProps({ isConnected: true })),
                React.createElement(View, null)));
            wrapper.instance().handleConnectivityChange(true);
            expect(props.dispatch).not.toHaveBeenCalled();
        });
    });
});
describe('mapStateToProps', function () {
    it('maps isConnected and actionQueue state to props', function () {
        var expected = { isConnected: false };
        var state = {
            network: __assign({ actionQueue: [], isQueuePaused: false }, expected),
        };
        expect(mapStateToProps(state)).toEqual(expected);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9SZWR1eE5ldHdvcmtQcm92aWRlci50ZXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsT0FBTyxJQUFJLFNBQVMsRUFDcEIsTUFBTSxJQUFJLFFBQVEsR0FDbkIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsZUFBZSxHQUNoQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUMzQixJQUFNLEtBQUssR0FBRztJQUNaLFFBQVEsVUFBQTtJQUNSLFdBQVcsRUFBRSxLQUFLO0NBQ25CLENBQUM7QUFFRixJQUFNLFFBQVEsR0FBRyxVQUFDLFNBQWM7SUFBZCwwQkFBQSxFQUFBLGNBQWM7SUFBSyxPQUFBLHVCQUFNLEtBQUssR0FBSyxTQUFTLEVBQUc7QUFBNUIsQ0FBNEIsQ0FBQztBQUVsRSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7SUFDL0IsU0FBUyxDQUFDO1FBQ1IsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixFQUFFLENBQUMsMkJBQTJCLEVBQUU7WUFDdEIsSUFBQTt3REFBTSxDQUlaO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQzNCLElBQUE7a0VBQVMsQ0FJZjtZQUVGLElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDbEUsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUNyQixvQkFBQyxvQkFBb0IsZUFBSyxLQUFLO2dCQUM3QixvQkFBQyxJQUFJLE9BQUcsQ0FDYSxDQUN4QixDQUFDO1lBQ0YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9GQUNZLEVBQUU7WUFDZixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQ3JCLG9CQUFDLG9CQUFvQixlQUFLLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdkQsb0JBQUMsSUFBSSxPQUFHLENBQ2EsQ0FDeEIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUMxQixFQUFFLENBQUMsaURBQWlELEVBQUU7UUFDcEQsSUFBTSxRQUFRLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDeEMsSUFBTSxLQUFLLEdBQUc7WUFDWixPQUFPLGFBQ0wsV0FBVyxFQUFFLEVBQUUsRUFDZixhQUFhLEVBQUUsS0FBSyxJQUNqQixRQUFRLENBQ1o7U0FDRixDQUFDO1FBRUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3QvUmVkdXhOZXR3b3JrUHJvdmlkZXIudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFZpZXcsIFRleHQgfSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IHtcbiAgc2hhbGxvdyBhcyByblNoYWxsb3csXG4gIHJlbmRlciBhcyByblJlbmRlcixcbn0gZnJvbSAncmVhY3QtbmF0aXZlLXRlc3RpbmctbGlicmFyeSc7XG5pbXBvcnQgeyBzaGFsbG93IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7XG4gIFJlZHV4TmV0d29ya1Byb3ZpZGVyLFxuICBtYXBTdGF0ZVRvUHJvcHMsXG59IGZyb20gJy4uL2NvbXBvbmVudHMvUmVkdXhOZXR3b3JrUHJvdmlkZXInO1xuaW1wb3J0IHsgY29ubmVjdGlvbkNoYW5nZSB9IGZyb20gJy4uL3JlZHV4L2FjdGlvbkNyZWF0b3JzJztcblxuY29uc3QgZGlzcGF0Y2ggPSBqZXN0LmZuKCk7XG5jb25zdCBwcm9wcyA9IHtcbiAgZGlzcGF0Y2gsXG4gIGlzQ29ubmVjdGVkOiBmYWxzZSxcbn07XG5cbmNvbnN0IGdldFByb3BzID0gKG92ZXJyaWRlcyA9IHt9KSA9PiAoeyAuLi5wcm9wcywgLi4ub3ZlcnJpZGVzIH0pO1xuXG5kZXNjcmliZSgnUmVkdXhOZXR3b3JrUHJvdmlkZXInLCAoKSA9PiB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgZGlzcGF0Y2gubW9ja0NsZWFyKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZW5kZXInLCAoKSA9PiB7XG4gICAgaXQoJ2hhcyB0aGUgY29ycmVjdCBzdHJ1Y3R1cmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IG91dHB1dCB9ID0gcm5TaGFsbG93KFxuICAgICAgICA8UmVkdXhOZXR3b3JrUHJvdmlkZXIgey4uLnByb3BzfT5cbiAgICAgICAgICA8VmlldyAvPlxuICAgICAgICA8L1JlZHV4TmV0d29ya1Byb3ZpZGVyPixcbiAgICAgICk7XG4gICAgICBleHBlY3Qob3V0cHV0KS50b01hdGNoU25hcHNob3QoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW5kZXJzIHRoZSBjaGlsZHJlbiBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IGdldEJ5VGV4dCB9ID0gcm5SZW5kZXIoXG4gICAgICAgIDxSZWR1eE5ldHdvcmtQcm92aWRlciB7Li4ucHJvcHN9PlxuICAgICAgICAgIDxUZXh0PkJhejwvVGV4dD5cbiAgICAgICAgPC9SZWR1eE5ldHdvcmtQcm92aWRlcj4sXG4gICAgICApO1xuXG4gICAgICBjb25zdCB2aWV3Q2hpbGQgPSBnZXRCeVRleHQoJ0JheicpO1xuICAgICAgZXhwZWN0KHZpZXdDaGlsZCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZScsICgpID0+IHtcbiAgICBpdChgZGlzcGF0Y2hlcyBhIENPTk5FQ1RJT05fQ0hBTkdFIGFjdGlvbiB3aXRoIHRoZSBuZXcgY29ubmVjdGlvbmAsICgpID0+IHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93PFJlZHV4TmV0d29ya1Byb3ZpZGVyPihcbiAgICAgICAgPFJlZHV4TmV0d29ya1Byb3ZpZGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgPFZpZXcgLz5cbiAgICAgICAgPC9SZWR1eE5ldHdvcmtQcm92aWRlcj4sXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSh0cnVlKTtcbiAgICAgIGV4cGVjdChwcm9wcy5kaXNwYXRjaCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29ubmVjdGlvbkNoYW5nZSh0cnVlKSk7XG4gICAgICBleHBlY3QocHJvcHMuZGlzcGF0Y2gpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIGl0KGBkb2VzIE5PVCBkaXNwYXRjaCBhIENPTk5FQ1RJT05fQ0hBTkdFIGFjdGlvbiBpZiB0aGUgY29ubmVjdGlvblxuICAgIGRpZCBub3QgY2hhbmdlYCwgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8UmVkdXhOZXR3b3JrUHJvdmlkZXI+KFxuICAgICAgICA8UmVkdXhOZXR3b3JrUHJvdmlkZXIgey4uLmdldFByb3BzKHsgaXNDb25uZWN0ZWQ6IHRydWUgfSl9PlxuICAgICAgICAgIDxWaWV3IC8+XG4gICAgICAgIDwvUmVkdXhOZXR3b3JrUHJvdmlkZXI+LFxuICAgICAgKTtcbiAgICAgIHdyYXBwZXIuaW5zdGFuY2UoKS5oYW5kbGVDb25uZWN0aXZpdHlDaGFuZ2UodHJ1ZSk7XG4gICAgICBleHBlY3QocHJvcHMuZGlzcGF0Y2gpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdtYXBTdGF0ZVRvUHJvcHMnLCAoKSA9PiB7XG4gIGl0KCdtYXBzIGlzQ29ubmVjdGVkIGFuZCBhY3Rpb25RdWV1ZSBzdGF0ZSB0byBwcm9wcycsICgpID0+IHtcbiAgICBjb25zdCBleHBlY3RlZCA9IHsgaXNDb25uZWN0ZWQ6IGZhbHNlIH07XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICBuZXR3b3JrOiB7XG4gICAgICAgIGFjdGlvblF1ZXVlOiBbXSxcbiAgICAgICAgaXNRdWV1ZVBhdXNlZDogZmFsc2UsXG4gICAgICAgIC4uLmV4cGVjdGVkLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgZXhwZWN0KG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSkpLnRvRXF1YWwoZXhwZWN0ZWQpO1xuICB9KTtcbn0pO1xuIl0sInZlcnNpb24iOjN9