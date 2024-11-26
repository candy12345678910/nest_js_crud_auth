import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request } from "express";
import { UserDto } from "./dto/user-create.dto";

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    // Create user
    @Post('store')
    store(@Req() req:Request){
        return this.userService.storeData(req);
    }

    // Find all users
    @Get()
    findAll(){
        return this.userService.findAll();
    }
    
    // Find user by id
    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id){
        return this.userService.findById(id);
    }

    // Update user
    @Put('/:id')
    updateUser(
        @Param('id', ParseIntPipe) id,
        @Body() body: UserDto
    )
    {
        return this.userService.userUpdate(id, body);
    }

    // Delete user by Id
    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id){
        return this.userService.deleteUser(id);
    }
}