const mockSprocketRoutes = jest.fn();
const mockSprocketFactoryRoutes = jest.fn();
jest.mock('./routes/v1/sprockets', () => mockSprocketRoutes);
jest.mock('./routes/v1/sprocketFactory', () => mockSprocketFactoryRoutes);

const mockInitialize = jest.fn();
jest.mock('./data-source', () => ({
  initialize: async () => {
    mockInitialize();
    await Promise.resolve();
  },
}));

// eslint-disable-next-line import/first
import './app';

describe('App', () => {
  it('sets up the database', () => {
    expect(mockInitialize).toHaveBeenCalled();
  });
  it('registers routes', () => {
    expect(mockSprocketRoutes).toHaveBeenCalled();
    expect(mockSprocketFactoryRoutes).toHaveBeenCalled();
  });
});
