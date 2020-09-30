import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 30, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fake-provider-id',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 31, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'fake-provider-id',
      year: 2020,
      month: 8,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 28, available: true },
        { day: 30, available: false },
        { day: 31, available: true },
      ]),
    );
  });
});
