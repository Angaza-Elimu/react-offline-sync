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
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
import { JSDOM } from 'jsdom';
var jsdom = new JSDOM('<!doctype html><html><body></body></html>');
var window = jsdom.window;
function copyProps(src, target) {
    Object.defineProperties(target, __assign(__assign({}, Object.getOwnPropertyDescriptors(src)), Object.getOwnPropertyDescriptors(target)));
}
global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);
/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });
console.error = function () { return null; };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvdGVzdC9zZXR1cFRlc3RFbnYudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLGFBQWEsQ0FBQztBQUNyQixPQUFPLE9BQU8sTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUI7O0dBRUc7QUFDSCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRTlCLElBQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7QUFDN0QsSUFBQSxxQkFBTSxDQUFXO0FBRXpCLFNBQVMsU0FBUyxDQUFDLEdBQXdCLEVBQUUsTUFBMkI7SUFDdEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sd0JBQ3pCLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsR0FDckMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxFQUMzQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNsQyxNQUFNLENBQUMsU0FBUyxHQUFHO0lBQ2pCLFNBQVMsRUFBRSxTQUFTO0NBQ3JCLENBQUM7QUFDRixTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRTFCOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFN0MsT0FBTyxDQUFDLEtBQUssR0FBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyIsIm5hbWVzIjpbXSwic291cmNlcyI6WyIvVXNlcnMvRGV2QUMvRGVza3RvcC9BbmdhemEvcmVhY3Qtb2ZmbGluZS1zeW5jL3NyYy90ZXN0L3NldHVwVGVzdEVudi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2plc3QtZW56eW1lJztcbmltcG9ydCBBZGFwdGVyIGZyb20gJ2VuenltZS1hZGFwdGVyLXJlYWN0LTE2JztcbmltcG9ydCBFbnp5bWUgZnJvbSAnZW56eW1lJztcbi8qKlxuICogU2V0IHVwIERPTSBpbiBub2RlLmpzIGVudmlyb25tZW50IGZvciBFbnp5bWUgdG8gbW91bnQgdG9cbiAqL1xuaW1wb3J0IHsgSlNET00gfSBmcm9tICdqc2RvbSc7XG5cbmNvbnN0IGpzZG9tID0gbmV3IEpTRE9NKCc8IWRvY3R5cGUgaHRtbD48aHRtbD48Ym9keT48L2JvZHk+PC9odG1sPicpO1xuY29uc3QgeyB3aW5kb3cgfSA9IGpzZG9tO1xuXG5mdW5jdGlvbiBjb3B5UHJvcHMoc3JjOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCB0YXJnZXQ6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCB7XG4gICAgLi4uT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc3JjKSxcbiAgICAuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0YXJnZXQpLFxuICB9KTtcbn1cblxuZ2xvYmFsLndpbmRvdyA9IHdpbmRvdztcbmdsb2JhbC5kb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbmdsb2JhbC5uYXZpZ2F0b3IgPSB7XG4gIHVzZXJBZ2VudDogJ25vZGUuanMnLFxufTtcbmNvcHlQcm9wcyh3aW5kb3csIGdsb2JhbCk7XG5cbi8qKlxuICogU2V0IHVwIEVuenltZSB0byBtb3VudCB0byBET00sIHNpbXVsYXRlIGV2ZW50cyxcbiAqIGFuZCBpbnNwZWN0IHRoZSBET00gaW4gdGVzdHMuXG4gKi9cbkVuenltZS5jb25maWd1cmUoeyBhZGFwdGVyOiBuZXcgQWRhcHRlcigpIH0pO1xuXG5jb25zb2xlLmVycm9yID0gKCkgPT4gbnVsbDtcbiJdLCJ2ZXJzaW9uIjozfQ==