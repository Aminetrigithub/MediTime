import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

//  API for adding doctor
const addDoctor = async(req,res) => { 

  try {
    const   { name, email, password, speciality, degree, experience, about, fees, address} = req.body;
    const imageFile = req.file;
    
    // Checking for empty fields
    if (!name || !email || !password  || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ message: "Missing details",success: false, status: 409 });
    }

    // validation email format
    if(!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email",success: false, status: 400 }); 
    }

    // Validating strong password
    if(password.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters long",success: false, status: 400 });
    }
    
    // Hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const HashedPassword = await bcrypt.hash(password, salt)

    // Uploading image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"   })
    const imageUrl =  imageUpload.secure_url

    // saving to database
    const doctorData = {
      name, 
      email, 
      image: imageUrl,
      password: HashedPassword,  
      speciality, 
      degree, 
      experience,
      about, 
      fees, 
      address: JSON.parse(address),
      date: Date.now(), 
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({ message: `Doctor added successfully`,success: true});

  }catch (error) {  
    console.log(error);
    res.json({ message: error.message+" something went wrong", success: false, status: 400 });
  }
}


// API for Admin login
const loginAdmin = async(req,res) => { 

  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) 
     {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({message: "Admin login successfully", token: token, success: true, status: 200});
     }
    else{
    res.json({ message: " Invalid credentials", success: false, status: 400 });
    }

    }catch (error) {
    console.log(error);
    res.json({ message: error.message+", something went wrong", success: false, status: 400 });
  }   
}

export {addDoctor, loginAdmin}