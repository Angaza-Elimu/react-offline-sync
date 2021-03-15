---
title: "Getting Started"
date: 2020-12-12T12:52:59+03:00
draft: false
---




# React Native Offline First Library

This project is a library that implements an offline first approach with SQLite and React Native (featuring TypeScript and CocoaPods under the hood).The library stores requests to local memory in abscence of a connection and share 
These instructions only cover iOS usage at this time.


## Install JS dependencies

    npm install offline-react-sync


## Install iOS dependencies (requires [Cocoapods](https://cocoapods.org/))

    pushd ios/
    pod install
    popd


## Start the React Native Metro Bundler

    npm start


## Compile TypeScript source in watch mode

    npm run tsc -- -w


## Run the Jest tests in watch mode

    npm test


## Open the source in VS Code

    code .


## Run (and debug) on an iOS simulator

With the "React Native Tools" VSCode extension installed, open the Debug tab and press the "Play" button with "Debug iOS" selected in the dropdown.

When the simulator opens, press Command-D to open the developer menu. Tap "Debug JS Remotely" to connect VSCode to the app and enable debugging.

Alternatively: 

    open ios/RNSQLiteDemo.xcworkspace

Select a simulator of your choice. Press the "run" button.

## E2E Testing with Detox

End-to-end testing happens from within the `e2e/` directory:

    cd e2e/
    npm install


#### Build E2E tests

    npm run test:e2e:build


#### Run E2E tests

    npm run test:e2e


#### Run tests without reinstalling onto the Simulator

Details on this workflow can be [found here](https://github.com/wix/Detox/blob/master/docs/Guide.DevelopingWhileWritingTests.md):

    npm run test:e2e:reuse


### Troubleshooting

#### Run Metro Bundler and clear it's cache

    npm start -- --reset-cache


## API

### Component Utilities
In order to render stuff conditionally with ease. They internally listen to connection changes and also provide an extra layer of reliability by ensuring there is internet access when reporting online. For that, an extra request is made to a remote server.

#### `NetworkProvider`
Provider component that injects the network state to children components via [React Context](https://reactjs.org/docs/context.html). Only children prop is required, the rest are optional. It should be used on top of your components hierarchy, ideally in (or close to) the entry point.

```js

type Props = {
    children: React.Node,
    pingTimeout?: number = 10000,
    pingServerUrl?: string = 'https://www.google.com/',
    shouldPing?: boolean = true,
    pingInterval?: number = 0,
    pingOnlyIfOffline?: boolean = false,
    pingInBackground?: boolean = false,
    httpMethod?: HTTPMethod = 'HEAD',
    customHeaders?: HTTPHeaders = {},
}
```

##### Config
`children`:  a React Element. This is the only required prop.

`pingTimeout`: amount of time (in ms) that the component should wait for the ping response. Defaults to `10000` ms. If you want to use a different value, it's recommended to use a higher one.

`pingServerUrl`: remote server to ping to. Defaults to `https://www.google.com/` since it's probably one the most stable servers out there, but you can provide your own if needed. Warning: www.google.com is a blocked domain in China, so if you need your app to be accessible from there, you MUST use another domain.

`shouldPing`: flag that denotes whether the extra ping check will be performed or not. Defaults to `true`.

`pingInterval`: the interval (in ms) you want to ping the server at. Defaults to `0`, and that means it is not going to check connectivity regularly. If opted in, it's advised not to choose a very small value, because that may drain your battery. Choose wisely. Something around 30000 ms should be fine.

`pingOnlyIfOffline`: when set to `true` and `pingInterval` > 0, it will ping the remote server regularly only if offline. Defaults to `false`.

`pingInBackground`: whether or not to check connectivity when app isn't in the foreground. Defaults to `false`.

`httpMethod`: http method used to ping the server. Supports HEAD or OPTIONS. Defaults to `HEAD`.

`customHeaders`: optional custom headers to add for ping request.

##### Usage
```js
// index.js
import React from 'react';
import { NetworkProvider } from 'offline-react-sync';
import App from './App';

const Root = () => (
  <NetworkProvider>
    <App />
  </NetworkProvider>
);

export default Root;
```

#### `NetworkConsumer`
React component that subscribes to connectivity changes. It requires a function as a child. The function receives the current connectivity status and returns a React node. **This component should be rendered within a NetworkProvider in order to work properly**.

##### Props
```js
type NetworkState = {
  isConnected: boolean,
}

type Props = {
  children: ({ isConnected }: NetworkState) => React.Node
}
```

##### Usage
```js
import React from 'react';
import { Image, Button, Text } from 'react-native';
import { NetworkConsumer } from 'offline-sync-react';

const ImageViewer = () => (
  <View>
    <Image src="foo.com" />
    <NetworkConsumer>
      {({ isConnected }) => (
        isConnected ? (
          <Button title="Download image" onPress={downloadImage} />
        ) : (
          <Text>Downloading images is disabled since you are offline</Text>
        )
      )}
    </NetworkConsumer>
  </View>
);
```

## Integration with Redux
There are 3 features that this library provides in order to leverage offline capabilities in your Redux store: a reducer, a middleware and an offline queue system. You can use all of them or just the ones that suits your needs.

### Network reducer
A network reducer to be provided to the store.

#### State
```js
type NetworkState = {
  isConnected: boolean,
  actionQueue: Array<*>
}
```
