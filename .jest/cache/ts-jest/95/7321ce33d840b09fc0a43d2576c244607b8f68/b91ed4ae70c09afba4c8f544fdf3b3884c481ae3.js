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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9SZWR1eE5ldHdvcmtQcm92aWRlci50ZXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsT0FBTyxJQUFJLFNBQVMsRUFDcEIsTUFBTSxJQUFJLFFBQVEsR0FDbkIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsZUFBZSxHQUNoQixNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9ELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUMzQixJQUFNLEtBQUssR0FBRztJQUNaLFFBQVEsVUFBQTtJQUNSLFdBQVcsRUFBRSxLQUFLO0NBQ25CLENBQUM7QUFFRixJQUFNLFFBQVEsR0FBRyxVQUFDLFNBQWM7SUFBZCwwQkFBQSxFQUFBLGNBQWM7SUFBSyxPQUFBLHVCQUFNLEtBQUssR0FBSyxTQUFTLEVBQUc7QUFBNUIsQ0FBNEIsQ0FBQztBQUVsRSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7SUFDL0IsU0FBUyxDQUFDO1FBQ1IsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixFQUFFLENBQUMsMkJBQTJCLEVBQUU7WUFDdEIsSUFBQTt3REFBTSxDQUlaO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQzNCLElBQUE7a0VBQVMsQ0FJZjtZQUVGLElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDbEUsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUNyQixvQkFBQyxvQkFBb0IsZUFBSyxLQUFLO2dCQUM3QixvQkFBQyxJQUFJLE9BQUcsQ0FDYSxDQUN4QixDQUFDO1lBQ0YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9GQUNZLEVBQUU7WUFDZixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQ3JCLG9CQUFDLG9CQUFvQixlQUFLLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdkQsb0JBQUMsSUFBSSxPQUFHLENBQ2EsQ0FDeEIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUMxQixFQUFFLENBQUMsaURBQWlELEVBQUU7UUFDcEQsSUFBTSxRQUFRLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDeEMsSUFBTSxLQUFLLEdBQUc7WUFDWixPQUFPLGFBQ0wsV0FBVyxFQUFFLEVBQUUsRUFDZixhQUFhLEVBQUUsS0FBSyxJQUNqQixRQUFRLENBQ1o7U0FDRixDQUFDO1FBRUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9EZXZBQy9EZXNrdG9wL0FuZ2F6YS9yZWFjdC1vZmZsaW5lLXN5bmMvc3JjL3Rlc3QvUmVkdXhOZXR3b3JrUHJvdmlkZXIudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFZpZXcsIFRleHQgfSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IHtcbiAgc2hhbGxvdyBhcyByblNoYWxsb3csXG4gIHJlbmRlciBhcyByblJlbmRlcixcbn0gZnJvbSAncmVhY3QtbmF0aXZlLXRlc3RpbmctbGlicmFyeSc7XG5pbXBvcnQgeyBzaGFsbG93IH0gZnJvbSAnZW56eW1lJztcbmltcG9ydCB7XG4gIFJlZHV4TmV0d29ya1Byb3ZpZGVyLFxuICBtYXBTdGF0ZVRvUHJvcHMsXG59IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1JlZHV4TmV0d29ya1Byb3ZpZGVyJztcbmltcG9ydCB7IGNvbm5lY3Rpb25DaGFuZ2UgfSBmcm9tICcuLi9zcmMvcmVkdXgvYWN0aW9uQ3JlYXRvcnMnO1xuXG5jb25zdCBkaXNwYXRjaCA9IGplc3QuZm4oKTtcbmNvbnN0IHByb3BzID0ge1xuICBkaXNwYXRjaCxcbiAgaXNDb25uZWN0ZWQ6IGZhbHNlLFxufTtcblxuY29uc3QgZ2V0UHJvcHMgPSAob3ZlcnJpZGVzID0ge30pID0+ICh7IC4uLnByb3BzLCAuLi5vdmVycmlkZXMgfSk7XG5cbmRlc2NyaWJlKCdSZWR1eE5ldHdvcmtQcm92aWRlcicsICgpID0+IHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBkaXNwYXRjaC5tb2NrQ2xlYXIoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3JlbmRlcicsICgpID0+IHtcbiAgICBpdCgnaGFzIHRoZSBjb3JyZWN0IHN0cnVjdHVyZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgb3V0cHV0IH0gPSByblNoYWxsb3coXG4gICAgICAgIDxSZWR1eE5ldHdvcmtQcm92aWRlciB7Li4ucHJvcHN9PlxuICAgICAgICAgIDxWaWV3IC8+XG4gICAgICAgIDwvUmVkdXhOZXR3b3JrUHJvdmlkZXI+LFxuICAgICAgKTtcbiAgICAgIGV4cGVjdChvdXRwdXQpLnRvTWF0Y2hTbmFwc2hvdCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbmRlcnMgdGhlIGNoaWxkcmVuIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgZ2V0QnlUZXh0IH0gPSByblJlbmRlcihcbiAgICAgICAgPFJlZHV4TmV0d29ya1Byb3ZpZGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgPFRleHQ+QmF6PC9UZXh0PlxuICAgICAgICA8L1JlZHV4TmV0d29ya1Byb3ZpZGVyPixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHZpZXdDaGlsZCA9IGdldEJ5VGV4dCgnQmF6Jyk7XG4gICAgICBleHBlY3Qodmlld0NoaWxkKS50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlJywgKCkgPT4ge1xuICAgIGl0KGBkaXNwYXRjaGVzIGEgQ09OTkVDVElPTl9DSEFOR0UgYWN0aW9uIHdpdGggdGhlIG5ldyBjb25uZWN0aW9uYCwgKCkgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHNoYWxsb3c8UmVkdXhOZXR3b3JrUHJvdmlkZXI+KFxuICAgICAgICA8UmVkdXhOZXR3b3JrUHJvdmlkZXIgey4uLnByb3BzfT5cbiAgICAgICAgICA8VmlldyAvPlxuICAgICAgICA8L1JlZHV4TmV0d29ya1Byb3ZpZGVyPixcbiAgICAgICk7XG4gICAgICB3cmFwcGVyLmluc3RhbmNlKCkuaGFuZGxlQ29ubmVjdGl2aXR5Q2hhbmdlKHRydWUpO1xuICAgICAgZXhwZWN0KHByb3BzLmRpc3BhdGNoKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb25uZWN0aW9uQ2hhbmdlKHRydWUpKTtcbiAgICAgIGV4cGVjdChwcm9wcy5kaXNwYXRjaCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoYGRvZXMgTk9UIGRpc3BhdGNoIGEgQ09OTkVDVElPTl9DSEFOR0UgYWN0aW9uIGlmIHRoZSBjb25uZWN0aW9uXG4gICAgZGlkIG5vdCBjaGFuZ2VgLCAoKSA9PiB7XG4gICAgICBjb25zdCB3cmFwcGVyID0gc2hhbGxvdzxSZWR1eE5ldHdvcmtQcm92aWRlcj4oXG4gICAgICAgIDxSZWR1eE5ldHdvcmtQcm92aWRlciB7Li4uZ2V0UHJvcHMoeyBpc0Nvbm5lY3RlZDogdHJ1ZSB9KX0+XG4gICAgICAgICAgPFZpZXcgLz5cbiAgICAgICAgPC9SZWR1eE5ldHdvcmtQcm92aWRlcj4sXG4gICAgICApO1xuICAgICAgd3JhcHBlci5pbnN0YW5jZSgpLmhhbmRsZUNvbm5lY3Rpdml0eUNoYW5nZSh0cnVlKTtcbiAgICAgIGV4cGVjdChwcm9wcy5kaXNwYXRjaCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ21hcFN0YXRlVG9Qcm9wcycsICgpID0+IHtcbiAgaXQoJ21hcHMgaXNDb25uZWN0ZWQgYW5kIGFjdGlvblF1ZXVlIHN0YXRlIHRvIHByb3BzJywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkID0geyBpc0Nvbm5lY3RlZDogZmFsc2UgfTtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgYWN0aW9uUXVldWU6IFtdLFxuICAgICAgICBpc1F1ZXVlUGF1c2VkOiBmYWxzZSxcbiAgICAgICAgLi4uZXhwZWN0ZWQsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBleHBlY3QobWFwU3RhdGVUb1Byb3BzKHN0YXRlKSkudG9FcXVhbChleHBlY3RlZCk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=