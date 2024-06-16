import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../types/types'

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email)
    const correctPassword = await argon2.verify(user?.password, password)
    if (user && correctPassword) {
      return user
    }
    throw new UnauthorizedException('Incorrect email or password. Please try again.')
  }

  async login(user: IUser) {
    const { id, email } = user
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    }
  }
}
