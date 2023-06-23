import { Query } from 'appwrite';

import {
  DATABASE_ID,
  databases,
  LISTINGCOSTS_ID,
  LISTINGS_ID,
} from '@/lib/client-old';

import { Listing } from '@/types/listing';

export const fetchListingById = async (listingID) => {
  const _listing = await databases.getDocument(
    DATABASE_ID,
    LISTINGS_ID,
    listingID
  );

  // fetch all listing costs
  const _listingCosts = await databases.listDocuments(
    DATABASE_ID,
    LISTINGCOSTS_ID,
    [Query.equal('listingID', _listing.$id)]
  );

  return { ..._listing, costs: _listingCosts.documents[0] } as Listing;
};

// update listing

export const updateListingById = async (listingID, data) => {
  const newListing = await databases.updateDocument(
    DATABASE_ID,
    LISTINGS_ID,
    listingID,
    data
  );
  return newListing.$id;
};

export const updateListingCost = async (listingCostID, data) => {
  await databases.updateDocument(
    DATABASE_ID,
    LISTINGCOSTS_ID,
    listingCostID,
    data
  );
};

// delete
export const deleteListing = async (listingID, listingCostsID) => {
  //FEATURE: update clear galleries image from storage
  await databases.deleteDocument(DATABASE_ID, LISTINGS_ID, listingID);
  await databases.deleteDocument(DATABASE_ID, LISTINGCOSTS_ID, listingCostsID);
};
