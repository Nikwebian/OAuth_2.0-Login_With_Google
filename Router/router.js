import express from 'express';
import passport from 'passport';

const router = express.Router();

// Step 1: Start Google Login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account'  })
);

// Step 2: Callback from Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile'); // redirect to profile
  }
);

// Step 3: Profile Page
router.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/');
  
  res.send(`
    <html>
      <head>
        <title>Profile</title>
        <style>
          body { font-family: Arial; text-align: center; margin-top: 50px; }
          .card {
            display: inline-block;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          img { border-radius: 50%; margin-bottom: 15px; }
          a { display: block; margin-top: 20px; color: red; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="card">
          <img src="https://ui-avatars.com/api/?name=${req.user.displayName}" width="100" height="100" />
          <h2>Welcome, ${req.user.displayName}</h2>
          <p>Email: ${req.user.email}</p>
          <a href="/auth/logout">Logout</a>
        </div>
      </body>
    </html>
  `);
});

// Step 4: Logout
router.get('/logout', (req, res, next) => { 
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

export default router;
