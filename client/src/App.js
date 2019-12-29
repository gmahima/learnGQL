import {ApolloClient,ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedIn, logout, getAccessToken } from './auth';
import { CompanyDetail } from './CompanyDetail';
import { LoginForm } from './LoginForm';
import { JobBoard } from './JobBoard';
import { JobDetail } from './JobDetail';
import { JobForm } from './JobForm';
import { NavBar } from './NavBar';
import gql from 'graphql-tag'
import {ApolloProvider} from 'react-apollo'
const endPointUrl = "http://localhost:9000/graphql"
const authLink = new ApolloLink((operation, forward) => {
  if(isLoggedIn()) {
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      }
    })
    
  }
  return forward(operation)
})
const client = new ApolloClient({
  link: new ApolloLink.from([authLink, new HttpLink({uri: endPointUrl})]),
  cache: new InMemoryCache()
})

client.query({
  query: gql`
    query {
      jobs{
        id
        title
        description
        company{
            name
            id
            description
        }
      }
    }
  `
}).then((res) => console.log(res))

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: isLoggedIn()};
  }

  handleLogin() {
    this.setState({loggedIn: true});
    this.router.history.push('/');
  }

  handleLogout() {
    logout();
    this.setState({loggedIn: false});
    this.router.history.push('/');
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <Router ref={(router) => this.router = router}>
      <ApolloProvider client={client} >
        <div>
          <NavBar loggedIn={loggedIn} onLogout={this.handleLogout.bind(this)} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={JobBoard} />
                <Route path="/companies/:companyId" component={CompanyDetail} />
                <Route exact path="/jobs/new" component={JobForm} />
                <Route path="/jobs/:jobId" component={JobDetail} />
                <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin.bind(this)} />} />
              </Switch>
            </div>
          </section>
        </div>
        </ApolloProvider>
      </Router>
    );
  }
}
