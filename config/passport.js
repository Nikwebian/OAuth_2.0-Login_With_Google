import passport from 'passport'; 
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userSchema.js';

export const configurePassport = ()=>{
    //GOOGLE STRATEGY 
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        }, // Verify Callback 
    async (accessToken, refreshToken, profile, done)=>{
        try{
            let user = await User.findOne({googleId: profile.id}); 
       if(!user)
       { 
         user = await User.create({
             googleId: profile.id, 
             displayName: profile.displayName, 
             email: profile.emails[0].value
         });
       }
       return done(null,user); 
    }
    catch(err)
    { 
         return done(err,null);
    }
    })
    );

// Serialize User Session 
passport.serializeUser((user,done)=>{
done(null,user.id); 
});

//DeserializeUSer 
passport.deserializeUser(async (id,done)=>{
     try{
      const user =    await User.findById(id);
         done(null,user); 
     }
     catch(err)
     { 
       done(err,null); 
     }
}); 
}