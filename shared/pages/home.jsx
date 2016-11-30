import React from 'react';

//import { connect } from 'react-redux';
//import { needs } from 'lib/needs';
//import * as PostStubActions from 'actions/PostStubActions';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import nprogress from 'nprogress';
import { Map } from 'immutable';
import {absoluteUrl} from '../utils';

//@connect(state => ({postStubs: state.postStubs}))
//@needs([props => PostStubActions.getPostStubs()])
export default class Home extends React.Component {
  handleLoadMore(){
    /*nprogress.start();
    this.setState({loadingMore: true});
    this.props.dispatch(PostStubActions.getPostStubs(this.getStubs().size)).then(response => {
      this.setState({loadingMore: false});
      nprogress.done();
    });*/
  }
  render() {
    return (
      <main className="home">
        <Helmet
          title="Isomorphic Demo"
          meta={[
            {property: "og:type", content: "article"},
            {property: "og:title", content: "Isomorphic Demo"},
            {property: "og:description", content: "Isomorphic demo."},
            {property: "og:image", content: absoluteUrl('/media/header-fb.jpg')},
            {property: "og:image:width", content: 3000},
            {property: "og:image:height", content: 1575}
          ]}/>
        <div className="container">
          <h1>Isomorphic Home</h1>
          <p>
            This is a demo of our beautiful isomorphic app.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </main>
    );
  }
}
