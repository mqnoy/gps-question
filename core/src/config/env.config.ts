import 'dotenv/config'

export const EnvConfig = {
    appPort: Number(process.env.APP_PORT || '3000'),
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: Number(process.env.DB_PORT || '5432'),
    dbUser: process.env.DB_USERNAME || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'postgres',
    dbName: process.env.DB_NAME || 'gps_question_db',
    jwtSecret: process.env.JWT_SECRET,
    jwtAccessTknExpiry: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY || '86400'),
    jwtRefreshTknExpiry: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY || '604800'),
}
