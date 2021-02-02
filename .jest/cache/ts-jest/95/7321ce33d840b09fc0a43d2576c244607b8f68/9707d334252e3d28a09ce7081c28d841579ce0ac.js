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
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import NetworkConsumer from '../components/NetworkConsumer';
import NetworkProvider from '../components/NetworkProvider';
var getElement = function (_a) {
    var _b = _a.props, props = _b === void 0 ? {} : _b, _c = _a.children, children = _c === void 0 ? null : _c;
    return React.createElement(NetworkProvider, __assign({}, props), children);
};
function Consumer() {
    return (React.createElement(NetworkConsumer, null, function (_a) {
        var isConnected = _a.isConnected;
        return (React.createElement(Text, { testID: "connectionText" }, "Connected: " + isConnected));
    }));
}
describe.only('NetworkConsumer', function () {
    it("throws if it's not rendered within the Provider", function () {
        expect(function () { return render(React.createElement(Consumer, null)); }).toThrow('NetworkConsumer components should be rendered within NetworkProvider. ' +
            'Make sure you are rendering a NetworkProvider at the top of your component hierarchy');
    });
    it('receives isConnected prop from Provider using context', function () {
        var getByTestId = render(getElement({ children: React.createElement(Consumer, null) })).getByTestId;
        var textChild = getByTestId('connectionText');
        expect(textChild.props.children).toBe('Connected: true');
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29uc3VtZXIudGVzdC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQW9CLE1BQU0sT0FBTyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sZUFBZSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sZUFBZSxNQUFNLG1DQUFtQyxDQUFDO0FBR2hFLElBQU0sVUFBVSxHQUFHLFVBQUMsRUFNbkI7UUFMQyxhQUFrQyxFQUFsQywrQkFBa0MsRUFDbEMsZ0JBQWUsRUFBZixvQ0FBZTtJQUlYLE9BQUEsb0JBQUMsZUFBZSxlQUFLLEtBQUssR0FBRyxRQUFRLENBQW1CO0FBQXhELENBQXdELENBQUM7QUFFL0QsU0FBUyxRQUFRO0lBQ2YsT0FBTyxDQUNMLG9CQUFDLGVBQWUsUUFDYixVQUFDLEVBQWU7WUFBYiw0QkFBVztRQUFPLE9BQUEsQ0FDcEIsb0JBQUMsSUFBSSxJQUFDLE1BQU0sRUFBQyxnQkFBZ0IsSUFBRSxnQkFBYyxXQUFhLENBQVEsQ0FDbkU7SUFGcUIsQ0FFckIsQ0FDZSxDQUNuQixDQUFDO0FBQ0osQ0FBQztBQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7SUFDL0IsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1FBQ3BELE1BQU0sQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLG9CQUFDLFFBQVEsT0FBRyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxPQUFPLENBQ3hDLHdFQUF3RTtZQUN0RSxzRkFBc0YsQ0FDekYsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1FBQ2xELElBQUEsK0ZBQVcsQ0FBb0Q7UUFDdkUsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMvRGV2QUMvRGVza3RvcC9BbmdhemEvcmVhY3Qtb2ZmbGluZS1zeW5jL3NyYy90ZXN0L05ldHdvcmtDb25zdW1lci50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1uYXRpdmUtdGVzdGluZy1saWJyYXJ5JztcbmltcG9ydCBOZXR3b3JrQ29uc3VtZXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTmV0d29ya0NvbnN1bWVyJztcbmltcG9ydCBOZXR3b3JrUHJvdmlkZXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTmV0d29ya1Byb3ZpZGVyJztcblxudHlwZSBOZXR3b3JrUHJvdmlkZXJQcm9wcyA9IFJlYWN0LkNvbXBvbmVudFByb3BzPHR5cGVvZiBOZXR3b3JrUHJvdmlkZXI+O1xuY29uc3QgZ2V0RWxlbWVudCA9ICh7XG4gIHByb3BzID0ge30gYXMgTmV0d29ya1Byb3ZpZGVyUHJvcHMsXG4gIGNoaWxkcmVuID0gbnVsbCxcbn06IHtcbiAgcHJvcHM/OiBOZXR3b3JrUHJvdmlkZXJQcm9wcztcbiAgY2hpbGRyZW46IG51bGwgfCBSZWFjdE5vZGU7XG59KSA9PiA8TmV0d29ya1Byb3ZpZGVyIHsuLi5wcm9wc30+e2NoaWxkcmVufTwvTmV0d29ya1Byb3ZpZGVyPjtcblxuZnVuY3Rpb24gQ29uc3VtZXIoKSB7XG4gIHJldHVybiAoXG4gICAgPE5ldHdvcmtDb25zdW1lcj5cbiAgICAgIHsoeyBpc0Nvbm5lY3RlZCB9KSA9PiAoXG4gICAgICAgIDxUZXh0IHRlc3RJRD1cImNvbm5lY3Rpb25UZXh0XCI+e2BDb25uZWN0ZWQ6ICR7aXNDb25uZWN0ZWR9YH08L1RleHQ+XG4gICAgICApfVxuICAgIDwvTmV0d29ya0NvbnN1bWVyPlxuICApO1xufVxuXG5kZXNjcmliZS5vbmx5KCdOZXR3b3JrQ29uc3VtZXInLCAoKSA9PiB7XG4gIGl0KGB0aHJvd3MgaWYgaXQncyBub3QgcmVuZGVyZWQgd2l0aGluIHRoZSBQcm92aWRlcmAsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4gcmVuZGVyKDxDb25zdW1lciAvPikpLnRvVGhyb3coXG4gICAgICAnTmV0d29ya0NvbnN1bWVyIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJlbmRlcmVkIHdpdGhpbiBOZXR3b3JrUHJvdmlkZXIuICcgK1xuICAgICAgICAnTWFrZSBzdXJlIHlvdSBhcmUgcmVuZGVyaW5nIGEgTmV0d29ya1Byb3ZpZGVyIGF0IHRoZSB0b3Agb2YgeW91ciBjb21wb25lbnQgaGllcmFyY2h5JyxcbiAgICApO1xuICB9KTtcblxuICBpdCgncmVjZWl2ZXMgaXNDb25uZWN0ZWQgcHJvcCBmcm9tIFByb3ZpZGVyIHVzaW5nIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBnZXRCeVRlc3RJZCB9ID0gcmVuZGVyKGdldEVsZW1lbnQoeyBjaGlsZHJlbjogPENvbnN1bWVyIC8+IH0pKTtcbiAgICBjb25zdCB0ZXh0Q2hpbGQgPSBnZXRCeVRlc3RJZCgnY29ubmVjdGlvblRleHQnKTtcbiAgICBleHBlY3QodGV4dENoaWxkLnByb3BzLmNoaWxkcmVuKS50b0JlKCdDb25uZWN0ZWQ6IHRydWUnKTtcbiAgfSk7XG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==