import { ListingAPI } from "./datasources/listings-api";

export type DataSourceContext = {
    dataSources: {
        listingAPI: ListingAPI;
    }
};