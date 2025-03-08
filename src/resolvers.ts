import { validateFullAmenities } from "./helpers";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        featuredListings: (_, __, { dataSources }) => {
            return dataSources.listingAPI.getFeaturedListings();
        },
        listing: (_, { id }, { dataSources }) => {
            return dataSources.listingAPI.getListing(id);
        }
    },
    Listing: {
        amenities: ({ id, amenities }, _, { dataSources }) => {
            return validateFullAmenities(amenities) ? amenities : dataSources.listingAPI.getAmenity(id);
        }
    },
    Mutation: {
        createListing: async (_, { input }, { dataSources }) => {
            try {
                const listing = await dataSources.listingAPI.createListing(input);
                return {
                    code: 200,
                    success: true,
                    message: "Listing created sucessfully!",
                    listing: listing
                }
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong: ${err}`,
                    listing: null
                }
            }
            
        }
    }
};