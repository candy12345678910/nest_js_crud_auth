import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { UserDto } from "./dto/user-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}
    
    // Create user
    async storeData(req: Request){
        try{
            const user= this.userRepo.find({where: {name: req.body.name }});
            if(Object.keys(user).length==0){
                await this.userRepo.save(req.body);
                return { msg: "User created successfully" };
            }
            else{
                return { msg: "User already present" };
            }
        }catch(err){
            return { msg: "Error occured while creating user" };
        }
    }

    // Find all users
    async findAll(){
        try{
            return await this.userRepo.find();
        }catch(err){
            return { msg: "No user present" };
        }
    }

    // Find users by id
    async findById(id){
        const d=await this.userRepo.findOne({where: {id}});
        if(!d){
            return { msg: "No user present" };
        }
        else{
            return d;
        }
    }

    // Update user
    async userUpdate(id, body: UserDto){
        try{
            const user=await this.userRepo.findOne({ where: { id } });
            if(!user){
                return { msg: "User not present" };
            }
            else{
                await this.userRepo.update(id, body);
                return { msg: "User updated" };
            }
        }catch(err){
            return { msg: "Error occured while updating user" };
        }
    }

    // Delete user
    async deleteUser(id){
        try{
            const user=await this.userRepo.findOne({ where: { id }})
            if(!user){
                return { msg: "User not found" };
            }
            else{
                await this.userRepo.delete(id);
                return { msg: "User deleted successfully" };
            }
        }catch(err){
            return { msg: "Error occured while delete user" };
        }
    }
    
    // Find user by email
    async findByEmail(email:string){
        const user= await this.userRepo.findOne({ where: { email } });
        return user;
    }

}