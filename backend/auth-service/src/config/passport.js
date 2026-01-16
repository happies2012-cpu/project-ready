const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

// JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        // In production, fetch user from database
        // For now, return the payload
        return done(null, payload);
    } catch (error) {
        return done(error, false);
    }
}));

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // In production: Find or create user in database
            const user = {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                provider: 'google',
                avatar: profile.photos[0]?.value
            };
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));
}

// GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // In production: Find or create user in database
            const user = {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName || profile.username,
                provider: 'github',
                avatar: profile.photos[0]?.value
            };
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));
}

module.exports = passport;
