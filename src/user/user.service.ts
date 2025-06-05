import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { userMapper } from './mappers/user-mapper';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async findById(id: number) {
    const firstUser = await this.userRepository.findOneBy({
      id,
    });
    return firstUser;
  }

  async findByAuth(loginAuthDto: LoginAuthDto) {
    const firstUser = await this.userRepository.findOneBy({
      login: loginAuthDto.login,
      password: loginAuthDto.password,
    });
    return firstUser;
  }

  async create(userDto: UserDto) {
    const user = userMapper.toEntity(userDto);

    const userResponse = await this.userRepository.save(user);

    return userMapper.toDto(userResponse);
  }

  async createMany(usersDto: UserDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    const response: User[] = [];
    try {
      for (const userDto of usersDto) {
        const newUser = userMapper.toEntity(userDto);

        const userResponse = await queryRunner.manager.save(newUser);
        response.push(userMapper.toDto(userResponse));
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return response;
  }

  async update(id: number, userDto: UserDto) {
    let user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      return;
    }
    user = { ...user, ...userDto };

    const userResponse = await this.userRepository.save(user);
    return userResponse;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      return;
    }

    await this.userRepository.delete(user);

    return user;
  }
}
