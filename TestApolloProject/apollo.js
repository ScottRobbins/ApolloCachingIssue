import { ApolloLink } from 'apollo-link'
import AsyncStorage from '@react-native-community/async-storage'
import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { createHttpLink } from 'apollo-link-http'
import introspectionQueryResultData from './schema.json'

const makeLink = () => {
  const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' })
  return ApolloLink.from([httpLink])
}

// This can't be instantiated synchronously because we need to
// await on loading the cache, but the promise can be exported
// and awaited on in order to have this still be a singleton
const makeClient = async () => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  })

  const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: object => {
      switch(object.__typename) {
        case 'SciFi': return 'BOOK:SCIFI'
        case 'Documentary': return 'BOOK:DOCUMENTARY'
        case 'Fantasy': return 'BOOK:FANTASY'
      }
    }
  })
  // `storage`'s type declaration is bad but passing AsyncStorage to
  // it is perfectly valid
  await persistCache({ cache, storage: AsyncStorage })

  const link = makeLink(true)
  return new ApolloClient({ link, cache })
}

// Notice that the function is being invoked here so that the
// promise is what is actually exported
export default makeClient()
