import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Paging } from 'src/app/core';

const getPage = gql`
query ($offset: Int, $first: Int) {
  allStoredFiles(offset: $offset, first: $first, orderBy: UPDATED_AT_DESC) {
    nodes {
      id
      metaData
      status
      createdAt
      updatedAt
    }
    totalCount
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(
    private apollo: Apollo,
  ) { }

  getPage(paging: Paging) {
    return this.apollo.query({
      query: getPage,
      variables: { offset: paging.offset, first: paging.first },
      fetchPolicy: 'no-cache'
    });
  }
}
