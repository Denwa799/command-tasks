import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { Team } from './teams.entity';
import { JwtService } from '@nestjs/jwt';
import { InvitationsService } from 'src/api/invitations/invitations.service';
import { UsersService } from 'src/api/users/users.service';

describe('TeamsService', () => {
  let service: TeamsService;

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoidGVzdEB0ZXN0LnJ1Iiwicm9sZXMiOlt7ImlkIjoyLCJ2YWx1ZSI6InVzZXIiLCJkZXNjcmlwdGlvbiI6ItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTc6MzA6MTYuMjY4WiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTc6MzA6MTYuMjY4WiJ9XSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY3MTYxNjYxMSwiZXhwIjoxNjcxNjE3NTExfQ.E1YT6cdkwjHout0wfxQ7Ejgk6FZm2gB2Yki4whUMbao';

  const team = {
    id: 1,
    name: 'test',
    creator: {
      id: 1,
    },
  };

  const teams = [team];

  const mockTeamsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((team) => Promise.resolve({ id: 1, ...team })),
    findAndCount: jest.fn().mockImplementation(() => [teams, 1]),
  };

  const mockUsersService = {
    findUserById: jest.fn().mockImplementation((id) => {
      return { id, name: 'creator', email: 'test@test.ru' };
    }),
    findUserByEmail: jest.fn().mockImplementation((email) => {
      return { id: 1, name: email, email };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        JwtService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockTeamsRepository,
        },
        {
          provide: InvitationsService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new team record and return than', async () => {
    expect(
      await service.create(
        { name: 'test', creator: 1, users: ['test@test.ru'] },
        'token',
      ),
    ).toEqual('Команда создана');
  });

  it('should get a all user teams', async () => {
    expect(await service.getAllUserTeams(mockToken, 50, 0)).toEqual({
      count: 1,
      teams,
    });
  });
});
