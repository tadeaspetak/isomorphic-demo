// prefix the URL with a host if this runs on the server (necessary as relative URLs naturally cannot suffice)
export function normalizeUrl(url) {
  return process.env.BROWSER ? url : absoluteUrl(url);
}

// absolute URL
export function absoluteUrl(url){
  return `http://${process.env.BROWSER ? document.domain : process.env.HOST}${url.startsWith('/') ? '' : '/'}${url}`;
}

// decorator marking necessary resources for a component
export function needs(needs) {
  return function(component) {
    //set the static needs of this component
    component.needs = needs;

    // if present, delete the initial state on `componentDidMount`, making sure
    // we will query the data again next time it is needed
    const original = component.prototype.componentDidMount;
    component.prototype.componentDidMount = function() {
      if (window.state) {
        delete window.state;
      } else {
        needs.forEach(need => {
          //safer to pass `props` as binding this wouldn't work if the decorator was written using an arrow function
          let result = need(this.props);
          return result ? this.props.dispatch(result) : false;
        });
      }

      //call the original `componentDidMount` function (if there is one)
      if(original){
        original.bind(this)();
      }
    }
  }
}

// promise middleware for redux
// (based on: https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.3gzr00ycy)
export function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });

    return promise.then(res => {
        next({ ...rest, res, type: SUCCESS });

        return true;
      }).catch(error => {
        next({ ...rest, error, type: FAILURE });

        // Another benefit is being able to log all failures here
        console.log(error);
        return false;
      });
   };
}
