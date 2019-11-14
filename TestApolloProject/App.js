/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react'
import clientPromise from './apollo'
import { AppLogic } from './AppLogic'
import { ApolloProvider } from 'react-apollo'

const App = () => {
  const [apolloClient, setApolloClient] = useState(
    null
  )

  useEffect(() => {
    clientPromise.then(setApolloClient)
  }, [])

  if (apolloClient) {
    return (
      <ApolloProvider client={apolloClient}>
        <AppLogic />
      </ApolloProvider>
    )
  } else {
    return null
  }
};

export default App;