import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 3, 10).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 8, 3, 11),
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('fake-provider-id');
    expect(appointment.user_id).toBe('fake-user-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 8, 3, 8).getTime();
    });

    const provider_id = 'fake-provider-id';
    const user_id = 'fake-user-id';
    const date = new Date(2020, 8, 3, 11);

    await createAppointmentService.execute({
      date,
      provider_id,
      user_id,
    });

    await expect(
      createAppointmentService.execute({
        date,
        provider_id,
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 3, 10).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 8, 3, 9),
        provider_id: 'fake-provider-id',
        user_id: 'fake-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 3, 10).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 8, 3, 11),
        provider_id: 'fake-provider-id',
        user_id: 'fake-provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 3, 10).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 8, 4, 7),
        provider_id: 'fake-provider-id',
        user_id: 'fake-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 8, 4, 18),
        provider_id: 'fake-provider-id',
        user_id: 'fake-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
