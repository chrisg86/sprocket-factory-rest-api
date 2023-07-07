const mockListen = jest.fn();
jest.mock('./app', () => ({
  listen: mockListen,
}));

// eslint-disable-next-line import/first
import './server';

describe('Server', () => {
  it('starts up correctly', () => {
    expect(mockListen.mock.calls[0][0]).toBe('5173');
  });
});
