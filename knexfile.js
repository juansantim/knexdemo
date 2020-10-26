const connectionString =
    process.env.DATABASE_URL || "postgresql://postgres@localhost/gemedics";

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./database/ge.db3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },

    production: {
        client: "pg",
        connection: connectionString,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
};
