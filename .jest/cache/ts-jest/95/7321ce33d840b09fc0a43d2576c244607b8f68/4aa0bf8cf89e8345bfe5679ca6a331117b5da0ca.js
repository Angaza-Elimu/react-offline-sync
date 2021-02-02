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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9OZXR3b3JrQ29uc3VtZXIudGVzdC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQW9CLE1BQU0sT0FBTyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRzVELElBQU0sVUFBVSxHQUFHLFVBQUMsRUFNbkI7UUFMQyxhQUFrQyxFQUFsQywrQkFBa0MsRUFDbEMsZ0JBQWUsRUFBZixvQ0FBZTtJQUlYLE9BQUEsb0JBQUMsZUFBZSxlQUFLLEtBQUssR0FBRyxRQUFRLENBQW1CO0FBQXhELENBQXdELENBQUM7QUFFL0QsU0FBUyxRQUFRO0lBQ2YsT0FBTyxDQUNMLG9CQUFDLGVBQWUsUUFDYixVQUFDLEVBQWU7WUFBYiw0QkFBVztRQUFPLE9BQUEsQ0FDcEIsb0JBQUMsSUFBSSxJQUFDLE1BQU0sRUFBQyxnQkFBZ0IsSUFBRSxnQkFBYyxXQUFhLENBQVEsQ0FDbkU7SUFGcUIsQ0FFckIsQ0FDZSxDQUNuQixDQUFDO0FBQ0osQ0FBQztBQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7SUFDL0IsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1FBQ3BELE1BQU0sQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLG9CQUFDLFFBQVEsT0FBRyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxPQUFPLENBQ3hDLHdFQUF3RTtZQUN0RSxzRkFBc0YsQ0FDekYsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1FBQ2xELElBQUEsK0ZBQVcsQ0FBb0Q7UUFDdkUsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMvRGV2QUMvRGVza3RvcC9BbmdhemEvcmVhY3Qtb2ZmbGluZS1zeW5jL3NyYy90ZXN0L05ldHdvcmtDb25zdW1lci50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1uYXRpdmUtdGVzdGluZy1saWJyYXJ5JztcbmltcG9ydCBOZXR3b3JrQ29uc3VtZXIgZnJvbSAnLi4vY29tcG9uZW50cy9OZXR3b3JrQ29uc3VtZXInO1xuaW1wb3J0IE5ldHdvcmtQcm92aWRlciBmcm9tICcuLi9jb21wb25lbnRzL05ldHdvcmtQcm92aWRlcic7XG5cbnR5cGUgTmV0d29ya1Byb3ZpZGVyUHJvcHMgPSBSZWFjdC5Db21wb25lbnRQcm9wczx0eXBlb2YgTmV0d29ya1Byb3ZpZGVyPjtcbmNvbnN0IGdldEVsZW1lbnQgPSAoe1xuICBwcm9wcyA9IHt9IGFzIE5ldHdvcmtQcm92aWRlclByb3BzLFxuICBjaGlsZHJlbiA9IG51bGwsXG59OiB7XG4gIHByb3BzPzogTmV0d29ya1Byb3ZpZGVyUHJvcHM7XG4gIGNoaWxkcmVuOiBudWxsIHwgUmVhY3ROb2RlO1xufSkgPT4gPE5ldHdvcmtQcm92aWRlciB7Li4ucHJvcHN9PntjaGlsZHJlbn08L05ldHdvcmtQcm92aWRlcj47XG5cbmZ1bmN0aW9uIENvbnN1bWVyKCkge1xuICByZXR1cm4gKFxuICAgIDxOZXR3b3JrQ29uc3VtZXI+XG4gICAgICB7KHsgaXNDb25uZWN0ZWQgfSkgPT4gKFxuICAgICAgICA8VGV4dCB0ZXN0SUQ9XCJjb25uZWN0aW9uVGV4dFwiPntgQ29ubmVjdGVkOiAke2lzQ29ubmVjdGVkfWB9PC9UZXh0PlxuICAgICAgKX1cbiAgICA8L05ldHdvcmtDb25zdW1lcj5cbiAgKTtcbn1cblxuZGVzY3JpYmUub25seSgnTmV0d29ya0NvbnN1bWVyJywgKCkgPT4ge1xuICBpdChgdGhyb3dzIGlmIGl0J3Mgbm90IHJlbmRlcmVkIHdpdGhpbiB0aGUgUHJvdmlkZXJgLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHJlbmRlcig8Q29uc3VtZXIgLz4pKS50b1Rocm93KFxuICAgICAgJ05ldHdvcmtDb25zdW1lciBjb21wb25lbnRzIHNob3VsZCBiZSByZW5kZXJlZCB3aXRoaW4gTmV0d29ya1Byb3ZpZGVyLiAnICtcbiAgICAgICAgJ01ha2Ugc3VyZSB5b3UgYXJlIHJlbmRlcmluZyBhIE5ldHdvcmtQcm92aWRlciBhdCB0aGUgdG9wIG9mIHlvdXIgY29tcG9uZW50IGhpZXJhcmNoeScsXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JlY2VpdmVzIGlzQ29ubmVjdGVkIHByb3AgZnJvbSBQcm92aWRlciB1c2luZyBjb250ZXh0JywgKCkgPT4ge1xuICAgIGNvbnN0IHsgZ2V0QnlUZXN0SWQgfSA9IHJlbmRlcihnZXRFbGVtZW50KHsgY2hpbGRyZW46IDxDb25zdW1lciAvPiB9KSk7XG4gICAgY29uc3QgdGV4dENoaWxkID0gZ2V0QnlUZXN0SWQoJ2Nvbm5lY3Rpb25UZXh0Jyk7XG4gICAgZXhwZWN0KHRleHRDaGlsZC5wcm9wcy5jaGlsZHJlbikudG9CZSgnQ29ubmVjdGVkOiB0cnVlJyk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=