import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginUserDto) {

    const user = await this.usersService.getByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Email ou senha inválidos');

    const payload = { sub: user.id_user, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}