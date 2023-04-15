const Strategy = require("passport-discord").Strategy;
const express = require('express')
const app = express()
const passport = require('passport');
const session = require('express-session');

let domain = `frontendurl`

app.use(
	session({
	  secret: "55CWSa21QbGeNxiJX3HngI7gm_F5bEGiZMGDu5rcUlDqILu1K9q_m4wDHDX3Prk84xurn9gyZgVIr",
	  resave: false,
	  saveUninitialized: false
	})
);

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(require('cors')({
	origin: domain
}));
passport.use(new Strategy({
	clientID: "clientID",
	clientSecret: "clientSecret",
	callbackURL: "callbackURL",
	scope: [ "identify", "guilds" ]
}, (accessToken, refreshToken, profile, done) => {
	process.nextTick(() => done(null, profile));
}));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });

app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/login", (req, res, next) => {
		req.session._authCallback = req.query.url || '/';
		next();
	}, passport.authenticate("discord", {
		scope: [ "identify", "guilds" ],
		prompt: "none"
	}));

	app.get("/auth/callback", passport.authenticate("discord", {
		failureRedirect: "/auth/login"
	}), async (req, res) => {
		if (req.user) {
			res.redirect(`${domain}/_auth/${req.user.accessToken}`)
		} else {
			res.redirect('/auth/login');
		};
	});


app.listen(3000)