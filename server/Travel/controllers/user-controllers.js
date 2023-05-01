import { compareSync, hashSync } from "bcryptjs";
import User from "../models/User"

export const getAllUsers= async(req,res)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){return console.log(err);}
    if(!users){
        return res.status(500).json({message:'Error Occured'});
    }
    return res.status(200).json({users});
}

export const getUserById=async(req,res)=>{
    const id=req.params.id;
    let users;
    try{
        users=await User.findById(id).populate('posts');
    }catch(err){
        return console.log(err);
    }
    if(!users){
        return res.status(404).json({message:'Cant find user'});
    }
    return res.status(200).json({users});
}
export const signup = async(req,res,next)=>{
    const {name,email,password}=req.body;
    {console.log(email)}
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.length<6){
        return res.status(422).json({message:'Invalid Data'});
    }
    let user;
    const hashedPassword= hashSync(password);
    try{
        user=new User({email,name,password:hashedPassword});
    await user.save();
    }catch(err){
        console.log(err);
    }
    
    if(!user){
        return res.status(500).json({message:'Error Occured'});
    }
    return res.status(201).json({user});

}

export const login= async(req,res,next)=>{
    const {email,password}=req.body;
    
    if(!email && email.trim()==="" && !password && password.length<6){
        return res.status(422).json({message:'Invalid Data'});
    }
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:'User not exist'});
    }
    const passwordCorrect=compareSync(password,existingUser.password);
    if(!passwordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({id:existingUser._id ,message:'Login Successful'})
}