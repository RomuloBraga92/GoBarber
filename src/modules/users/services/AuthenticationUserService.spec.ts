import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppErrors';
import AuthenticationUsersService from './AuthenticationUserService';
import CreateUsersService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    const authenticateUsers = new AuthenticationUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUsers.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUsers = new AuthenticationUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUsers.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    const authenticateUsers = new AuthenticationUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticateUsers.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
