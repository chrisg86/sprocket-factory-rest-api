import { errorEnvelope, validationEnvelope } from './error';

describe('Error envelope', () => {
  it('returns the correct format', () => {
    const data = { key: 'val' };
    expect(errorEnvelope(data)).toStrictEqual({
      error: data,
    });
  });
});

describe('Validation envelope', () => {
  it('returns the correct format', () => {
    const data = { key: 'val' };
    expect(validationEnvelope(data)).toStrictEqual({
      error: { validation: data },
    });
  });
});
