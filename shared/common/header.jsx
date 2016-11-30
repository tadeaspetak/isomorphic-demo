import React from 'react';
import {IndexLink, Link} from 'react-router';

export default class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  render() {
    return <header>
      <div className="container">
        <h1 className="site-header" onClick={() => this.context.router.push('/')}>Isomorphic Demo</h1>
        <nav>
          <ul>
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/translations" activeClassName="active">Translations</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  }
}
