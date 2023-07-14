const mockDataSource = jest.fn();
jest.mock('typeorm', () => ({
  DataSource: mockDataSource.mockImplementation(() => {
    return {};
  }),
}));

// eslint-disable-next-line import/first
import './data-source';

describe('DataSource', () => {
  it('sets up the correct data source', () => {
    expect(mockDataSource).toHaveBeenCalledWith({
      database: 'dummy-db',
      entities: ['build/entity/*.js'],
      host: 'localhost',
      logging: false,
      password: 'dummy-pass',
      port: 3306,
      synchronize: true,
      type: 'mysql',
      username: 'root',
    });
  });
});
