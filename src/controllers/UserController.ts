//importing modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from '../model/UserModel';

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
 try {
  const { id, role, email, password } = req.body;

  type Data = {
    id: Number;
    role: String;
    email: String;
    password: String;
  }

   const data: Data = {
    id,
    role,
    email,
    password: await bcrypt.hash(password, 10),
   };
   //saving the user
   const user = await UserModel.create(data);

   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id }, "lbkjbefkjbwekfkewfk", {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};

//login authentication
const login = async (req, res) => {
 try {

const { email, password } = req.body;

   //find a user by their email
   const user = await UserModel.findOne({ email });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id }, "lbkjbefkjbwekfkewfk", {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       //send user data
       return res.status(201).send(user);
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

export default {
  signup: signup,
  login: login
};