import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

describe('TeamsController', () => {
  let controller: TeamsController;

  const teams = [
    {
      id: 1,
      name: 'test',
      creator: {
        id: 1,
      },
    },
  ];

  const mockTeamsService = {
    create: jest.fn(() => 'Команда создана'),
    getAllUserTeams: jest.fn(() => {
      return {
        count: 1,
        teams,
      };
    }),
    getAllTeams: jest.fn(() => {
      return {
        count: 1,
        teams,
      };
    }),
    getTeamById: jest.fn(() => {
      return {
        id: 1,
        name: 'test',
      };
    }),
    removeUser: jest.fn(() => {
      return 'Пользователь удален из команды';
    }),
    delete: jest.fn(() => {
      return {
        id: 1,
        name: 'test',
      };
    }),
    addUser: jest.fn(() => {
      return 'Пользователь добавлен';
    }),
    update: jest.fn((id, teamDto) => {
      return {
        id,
        name: teamDto.name,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [TeamsService],
      imports: [JwtModule],
    })
      .overrideProvider(TeamsService)
      .useValue(mockTeamsService)
      .compile();

    controller = module.get<TeamsController>(TeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', () => {
    expect(
      controller.create(
        {
          name: 'test',
          creator: 1,
          users: ['test@test.ru'],
        },
        'token',
      ),
    ).toEqual('Команда создана');
  });

  it('should get a all user teams', () => {
    expect(controller.getAllUserTeams({ take: 50, skip: 0 }, 'token')).toEqual({
      count: 1,
      teams,
    });
  });

  it('should get a all teams', () => {
    expect(controller.getAllTeams({ take: 50, skip: 0 })).toEqual({
      count: 1,
      teams,
    });
  });

  it('should find a team by id', () => {
    expect(controller.findTeamById(1, 'token')).toEqual({
      id: 1,
      name: 'test',
    });
  });

  it('should remove a user in teams by id', () => {
    expect(controller.removeUser(1, 1, 'token')).toEqual(
      'Пользователь удален из команды',
    );
  });

  it('should delete a team by id', () => {
    expect(controller.delete(1, 'token')).toEqual({
      id: 1,
      name: 'test',
    });
  });

  it('should add a user ', () => {
    expect(controller.addUser(1, 2, 'token')).toEqual('Пользователь добавлен');
  });

  it('should update a team by id', () => {
    expect(controller.update(1, { name: 'test' }, 'token')).toEqual({
      id: 1,
      name: 'test',
    });
  });
});
