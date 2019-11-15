import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const QUERY_WITH_DOCUMENTARY = gql`
  query booksWithDocument {
    books {
      ... on Fantasy {
        id
        book {
          id
          title
          author
        }
      }

      ... on SciFi {
        id
        book {
          id
          title
          author
        }
      }

      ... on Documentary {
        id
        book {
          id
          title
          author
        }
      }
    }
  }
`;

const QUERY_WITHOUT_DOCUMENTARY = gql`
  query booksWithoutDocumentary {
    books {
      ... on Fantasy {
        id
        book {
          title
          author
        }
      }

      ... on SciFi {
        id
        book {
          title
          author
        }
      }
    }
  }
`;

export const AppLogic = () => {

  // 0. Install app fresh so you have a clear apollo cache, When you boot the app, attatch the debugger so you can view logs
  // 1. Run with this uncommented, you should see in the logs the documentary object

  const {data, loading} = useQuery(QUERY_WITH_DOCUMENTARY, {
    fetchPolicy: 'network-only',
  });

  // 2. Comment out above then uncomment this one below. You can see it pulls the documentary object from the cache correctly.

  // const { data, loading } = useQuery(QUERY_WITH_DOCUMENTARY, {
  //   fetchPolicy: 'cache-only'
  // })

  // 3. Comment out above then uncomment this one below. You can see it now fetches from the network,
  //    but doesn't get back anything but the typename for the documentary object

  // const { data, loading } = useQuery(QUERY_WITHOUT_DOCUMENTARY, {
  //   fetchPolicy: 'network-only'
  // })

  // 4. Comment out above then uncomment this one below. You can see it can successfully fetch from
  //    the cache what is requested

  // const { data, loading } = useQuery(QUERY_WITHOUT_DOCUMENTARY, {
  //   fetchPolicy: 'cache-only'
  // })

  // 5. Comment out above then uncomment this one below. This will error out saying data is not defined.
  //    Because the Documentary object wasn't in the last query that hit the network, it purged it from
  //    the cache. This doesn't _seem_ correct. You had already cached the documentary object and you
  //    never explicitly purged it.

  // const { data, loading } = useQuery(QUERY_WITH_DOCUMENTARY, {
  //   fetchPolicy: 'cache-only'
  // })

  if (!loading) {
    console.log(`Hook data: ${JSON.stringify(data.books)}`);
  }

  return (
    <>
      <Text>Something</Text>
    </>
  );
};
