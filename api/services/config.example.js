module.exports = {
    // App Settings
    SERVER_PORT: process.env.SERVER_PORT || '3000',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

    // Email Settings
    EMAIL_SECRET: process.env.EMAIL_SECRET || 'YOUR_UNIQUE_EMAIL_SECRET',
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_HOST_PORT: process.env.EMAIL_HOST_PORT || 465,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME || 'EMAIL_USERNAME@gmail.com',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'EMAIL_PASSWORD',
    EMAIL_ADMIN_EMAIL: process.env.EMAIL_ADMIN_EMAIL || 'EMAIL_ADMIN_EMAIL@gmail.com',

    // OAuth 2.0
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'YOUR_FACEBOOK_CLIENT_SECRET',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
};
