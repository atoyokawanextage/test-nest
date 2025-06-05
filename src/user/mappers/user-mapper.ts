import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class userMapper {
  constructor() {}
  static toEntity(userDto: UserDto) {
    // If the entity and DTO atribute are the same you can use
    // const user: User = { ...userDto };
    const user = new User();
    user.id = userDto.id;
    user.login = userDto.login;
    user.password = userDto.password;
    user.isActive = userDto.isActive;
    return user;
  }

  static toDto(user: User) {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.login = user.login;
    userDto.password = user.password;
    userDto.isActive = user.isActive;
    return userDto;
  }
}
