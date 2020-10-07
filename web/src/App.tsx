import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Articles } from "./containers/Articles"
import { Home } from "./containers/Home"
import { Provider, defaultTheme, Flex, View } from "@adobe/react-spectrum"
import { Header } from "./components/Header"
import { QueryCache, ReactQueryCacheProvider } from "react-query"
import { Article } from "./containers/Article"

const queryCache = new QueryCache()

function App() {
  return (
    <Router>
      <Provider theme={defaultTheme} width="100%" height="100%">
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Flex direction="column" gap="size-100" alignItems="center" width="100%" height="100%">
            <View height="size-1000">
              <Header />
            </View>

            <View>
              <Switch>
                <Route exact path="/articles">
                  <Articles />
                </Route>
                <Route exact path="/articles/:id">
                  <Article />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </View>
          </Flex>
        </ReactQueryCacheProvider>
      </Provider>
    </Router>
  )
}

export default App
