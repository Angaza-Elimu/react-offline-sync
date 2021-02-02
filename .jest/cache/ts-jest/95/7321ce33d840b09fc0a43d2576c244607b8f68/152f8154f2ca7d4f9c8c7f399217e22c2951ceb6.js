import React from 'react';
import NetworkContext from './NetworkContext';
export default function NetworkConsumer(_a) {
    var children = _a.children;
    return (React.createElement(NetworkContext.Consumer, null, function (context) {
        if (!context) {
            throw new Error('NetworkConsumer components should be rendered within NetworkProvider. ' +
                'Make sure you are rendering a NetworkProvider at the top of your component hierarchy');
        }
        return children(context);
    }));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvY29tcG9uZW50cy9OZXR3b3JrQ29uc3VtZXIudHN4IiwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBb0IsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFPOUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQUMsRUFBbUI7UUFBakIsc0JBQVE7SUFDaEQsT0FBTyxDQUNMLG9CQUFDLGNBQWMsQ0FBQyxRQUFRLFFBQ3JCLFVBQUEsT0FBTztRQUNOLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUNiLHdFQUF3RTtnQkFDdEUsc0ZBQXNGLENBQ3pGLENBQUM7U0FDSDtRQUNELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FDdUIsQ0FDM0IsQ0FBQztBQUNKLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL0RldkFDL0Rlc2t0b3AvQW5nYXphL3JlYWN0LW9mZmxpbmUtc3luYy9zcmMvY29tcG9uZW50cy9OZXR3b3JrQ29uc3VtZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmV0d29ya0NvbnRleHQgZnJvbSAnLi9OZXR3b3JrQ29udGV4dCc7XG5pbXBvcnQgeyBDb25uZWN0aXZpdHlTdGF0ZSB9IGZyb20gJy4uL3R5cGVzJztcblxudHlwZSBQcm9wcyA9IHtcbiAgY2hpbGRyZW46IChhcmdzOiBDb25uZWN0aXZpdHlTdGF0ZSkgPT4gUmVhY3ROb2RlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmV0d29ya0NvbnN1bWVyKHsgY2hpbGRyZW4gfTogUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8TmV0d29ya0NvbnRleHQuQ29uc3VtZXI+XG4gICAgICB7Y29udGV4dCA9PiB7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdOZXR3b3JrQ29uc3VtZXIgY29tcG9uZW50cyBzaG91bGQgYmUgcmVuZGVyZWQgd2l0aGluIE5ldHdvcmtQcm92aWRlci4gJyArXG4gICAgICAgICAgICAgICdNYWtlIHN1cmUgeW91IGFyZSByZW5kZXJpbmcgYSBOZXR3b3JrUHJvdmlkZXIgYXQgdGhlIHRvcCBvZiB5b3VyIGNvbXBvbmVudCBoaWVyYXJjaHknLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuKGNvbnRleHQpO1xuICAgICAgfX1cbiAgICA8L05ldHdvcmtDb250ZXh0LkNvbnN1bWVyPlxuICApO1xufVxuIl0sInZlcnNpb24iOjN9