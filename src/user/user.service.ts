import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

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

  async findOne(id: number) {
    const firstUser = await this.userRepository.findOneBy({
      id,
    });
    return firstUser;
  }

  async create(userDto: UserDto) {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.isActive = userDto.isActive;

    const userResponse = await this.userRepository.save(user);

    return userResponse;
  }

  async createMany(usersDto: UserDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    const response: User[] = [];
    try {
      for (const user of usersDto) {
        const newUser = new User();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.isActive = user.isActive;

        const userResponse = await queryRunner.manager.save(newUser);
        response.push(userResponse);
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
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      return;
    }
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.isActive = userDto.isActive;

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
