import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Basic } from './Entity/Basic';
import { CRUD } from './Resolvers/resolver';


const main = async () => {

    try {
        await createConnection(
            {
                type: "sqlite",
                database: "./db.sqlite3",
                logging: true,
                synchronize: true,
                entities: [Basic]
            }
        );
    } catch (error) {
        console.log("\n\n\n ERROR \n\n\n", error);
    }

    const schema = await buildSchema({
        resolvers: [CRUD],
    });

    const server = new ApolloServer({ schema });

    const app = express();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(" \n\n\✔️  http://localhost:4000/graphql\n\n");
    });
};
main();




