import {
  AuthHelper,
} from '../../helpers';

describe('Auth Helper', () => {
  test('should return hashed password', async () => {
    const hash = await AuthHelper.hashData('data', 10);

    expect(typeof hash).toEqual('string');
  });

  test('should compare correct and incorrect passwords', async () => {
    const correctPass = 'qwe';
    const notCorrectPassword = 'ewq';

    const hash = await AuthHelper.hashData(correctPass, 10);

    const isPasswordsEqual = await AuthHelper.compareData(correctPass, hash);
    const isPasswordsNotEqual = await AuthHelper.compareData(notCorrectPassword, hash);

    expect(isPasswordsEqual).toBeTruthy();
    expect(isPasswordsNotEqual).toBeFalsy();
  });
});
