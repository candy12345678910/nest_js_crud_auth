import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    // Passport auth
    @UseGuards(AuthGuard('local'))
    @Post("login")
    login(@Request() req: any){
        // return req.user;
        return this.authService.login(req);
    }
}
