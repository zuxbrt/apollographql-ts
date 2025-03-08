import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./resolvers";
import { ListingAPI } from "./datasources/listings-api";

import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "../src/schema.graphql"), {
        encoding: "utf-8"
    })
)

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const { cache } = server;

            return {
                dataSources: {
                    listingAPI: new ListingAPI({ cache })
                }
            }
        }
    });
    console.log(`
        Server running.
        Query url: ${url}
    `)
}

startApolloServer();