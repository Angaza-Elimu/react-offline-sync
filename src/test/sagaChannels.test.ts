import { mocked } from 'ts-jest/utils';
import { eventChannel } from 'redux-saga';
import {
  createIntervalChannel,
  intervalChannelFn,
} from '../redux/sagas';

jest.mock('redux-saga');

describe('createIntervalChannel', () => {
  const interval = 50;
  it('returns a redux-saga channel', () => {
    const eventChannelMock = jest.fn().mockReturnValue('channel');
    mocked(eventChannel).mockImplementation(eventChannelMock);
    const mockIntervalChannelFn = jest.fn().mockReturnValue('handlerFn');
    expect(createIntervalChannel(interval, mockIntervalChannelFn)).toBe(
      'channel',
    );
    expect(mockIntervalChannelFn).toHaveBeenCalledWith(interval);
    expect(eventChannel).toHaveBeenCalledWith('handlerFn');
  });

  it('intervalChannelFn adheres to eventChannel cb interface', done => {
    global.clearInterval = jest.fn();
    const emitMock = jest.fn();
    const unsubscribe = intervalChannelFn(interval)(emitMock);
    setTimeout(() => {
      expect(emitMock).toHaveBeenCalledWith(true);
      done();
    }, interval + 20);
    unsubscribe();
    expect(global.clearInterval).toHaveBeenCalled();
  });
});
