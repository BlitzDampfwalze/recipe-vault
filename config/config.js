const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://PaulL:pie4paul@ds257752.mlab.com:57752/recipe-vault';
} else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/RecipeVaultTest';
} else if (env === 'production') {
    process.env.MONGODB_URI = 'mongodb://PaulL:pie4paul@ds257752.mlab.com:57752/recipe-vault';
}