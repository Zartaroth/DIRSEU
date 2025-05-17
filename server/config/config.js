import { config } from 'dotenv';
config();

const configs = {
    PORT: process.env.PORT || 49300,
    DB_HOST: process.env.DB_HOST || "dataepis.uandina.pe",
    DB_USER: process.env.DB_USER || "dirseu",
    DB_PASSWORD: process.env.DB_PASSWORD || "dirseu2025",
    DB_NAME: process.env.DB_NAME || "dirseu",
    DB_PORT: process.env.DB_PORT || 49206,
};

export default configs;
