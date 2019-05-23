import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/api'
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // eslint-disable-line no-param-reassign
      }
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFub255bW91cyIsImlhdCI6MTQ5NjMyNTU1OX0.WQARaoUBgrWbmFkHzY77WF-pV4KSDgCy4X56HeF2LAE'
      req.options.headers.Authorization = `Bearer ${token}` // eslint-disable-line no-param-reassign
      next()
    },
  },
])

const client = new ApolloClient({
  networkInterface: networkInterface
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
