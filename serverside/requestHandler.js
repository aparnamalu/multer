import userSchema from './models/user.model.js';
import {promises as fs} from 'fs';
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';


export async function addUser(req,res) {
    try {
        const image=req.file;
        console.log(req.file);
        const {email,username,phone}=req.body;
        console.log(email,username,phone);
        res.status(201).send({msg:"successs"})
        userSchema
            .create({email,username,phone,image})
            .then(()=>{
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                return res.status(404).send({msg:"user not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

    export async function getUser(req,res) {
        try {
            const users= await userSchema.find();
            return res.status(200).send(users)
        } catch (error) {
            return res.status(404).send({msg:error})
        }
    }
  

    export async function deleteUser(req,res){
        const{_id}=req.params;
        console.log("===========================================================");
        const user=await userSchema.findOne({_id})
        console.log(user);
        
        if(!user)
            return res.status(500).send({msg:"user not available"})
            //get current file directory
        const __filename=fileURLToPath(import.meta.url)
        console.log(__filename);
        const __dirname=dirname(__filename);
        console.log(__dirname);
        const fullPath=join(__dirname,"/uploads/",user.image.filename);
        console.log(fullPath);
        await fs.unlink(fullPath);
        await userSchema.deleteOne({_id}).then(()=>{
             res.status(200).send({msg:"deleted"})
        }).catch((error)=>{
            res.status(500).send({msg:error})
        })
        
    }