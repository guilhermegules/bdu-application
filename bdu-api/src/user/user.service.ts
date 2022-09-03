import { Inject, Injectable } from '@nestjs/common';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @Inject(getDataSourceToken()) private dataSource: DataSource,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const user = this.repository.create({
      name: createUserDto.name,
    });

    await this.repository.insert(user);

    return user;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }
}
