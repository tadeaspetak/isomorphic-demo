# Isomorphic Demo

This is a demo that supported my session on isomorphic apps built with React, Redux and webpack, given in December 2016 at [Jayway](https://jayway.com).

There are six phases represented by six branches - *phase-1* to *phase-6* - gradually turning a plain single page app into an isomorphic one. If you'd like to see the code changes from a phase to phase, you can easily do that using e.g. `git diff phase-3..phase-4`.

In any phase, you can run the `dev` version with `npm run dev` and the `prod` version with `npm run bprod`.

- `phase-1` is the initial, non-isomorphic, single page app
- `phase-2` represents the first stage of returning HTML from the server; it does **not**, however, fetch data for components
- `phase-3` uses `helmet` to add `title` and `meta` tags to the two pages
- `phase-4` fetches necessary data for components on the server and therefore returns HTML returning the representation of this data
- `phase-5` passes the state fetched on the server to the client so that the app does not make unnecessary requests
- `phase-6` is an example of what submitting a form with disabled JS might look like

If you have any questions or suggestions for improvements, I would love to hear from you!
