import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import NetworkConsumer from '../components/NetworkConsumer';
import NetworkProvider from '../components/NetworkProvider';

type NetworkProviderProps = React.ComponentProps<typeof NetworkProvider>;
const getElement = ({
  props = {} as NetworkProviderProps,
  children = null,
}: {
  props?: NetworkProviderProps;
  children: null | ReactNode;
}) => <NetworkProvider {...props}>{children}</NetworkProvider>;

function Consumer() {
  return (
    <NetworkConsumer>
      {({ isConnected }) => (
        <Text testID="connectionText">{`Connected: ${isConnected}`}</Text>
      )}
    </NetworkConsumer>
  );
}


