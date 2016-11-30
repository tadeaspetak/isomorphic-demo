import React from 'react';
import { connect } from 'react-redux';
import {getTranslations, addTranslation, deleteTranslation} from '../actions/translationsActions';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import nprogress from 'nprogress';
import { OrderedMap } from 'immutable';

import { needs } from '../utils';

@connect(state => ({translations: state.translations}))
@needs([props => getTranslations()])
export default class Translations extends React.Component {
  static defaultProps = {
    translations: new OrderedMap()
  }
  constructor(props) {
   super(props);
   this.state = {
     expression1: '',
     expression2: '',
     isOpen: false
   };
 }
  handleSubmitTranslation(e){
    e.preventDefault();
    this.props.dispatch(addTranslation({
      expression1: this.state.expression1,
      expression2: this.state.expression2
    }));
  }
  handleDelete(translation){
    this.props.dispatch(deleteTranslation(translation.id));
  }
  render() {
    return (
      <main className="translations">
        <Helmet
          title="Translations"
          meta={[
            {property: "og:type", content: "article"},
            {property: "og:title", content: "Translations"},
            {property: "og:description", content: "Translations from Swedish to English."}
          ]}/>

        <div className="container">
          <h1>Add a new translation</h1>

          <form onSubmit={this.handleSubmitTranslation.bind(this)}>
            <textarea className="expression1" placeholder="Mening eller uttryck på svenska"
              value={this.state.message} onChange={e => this.setState({expression1: e.target.value})}></textarea>
            <textarea className="expression2" placeholder="Sentence or expression in English"
              value={this.state.message} onChange={e => this.setState({expression2: e.target.value})}></textarea>
            <button type="submit" className="button-block"><i className="fa fa-send"></i> Save</button>
          </form>

          <h2>Existing Translations</h2>
          <div className="translations-existing">
            <div className="translations-header">
              <div className="translation-language">Svenska</div>
              <div className="translation-language">English</div>
            </div>
            {this.props.translations.valueSeq().map(translation => {
              return (<div className="translation" key={translation.id}>
                <span className="translation-delete" title="delete" onClick={this.handleDelete.bind(this, translation)}><i className="fa fa-times"></i></span>
                <div
                  className="translation-expression"
                  dangerouslySetInnerHTML={{__html: translation.expression1}}></div>
                <div
                  className="translation-expression"
                  dangerouslySetInnerHTML={{__html: translation.expression2}}></div>
              </div>);
            })}
          </div>
        </div>
      </main>
    );
  }
}
