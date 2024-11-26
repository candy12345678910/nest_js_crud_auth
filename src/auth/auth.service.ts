import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userSevice: UserService,
        private jwtService: JwtService,
    ){}

    async validateUser(email:string, password:string){
        const user = await this.userSevice.findByEmail(email);
        
        if(user && user.password === password){
            return user;
        }
        return null;
    }

    async login(user: any){
        const payload = { username: user.name, password: user.password };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
