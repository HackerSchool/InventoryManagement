# hs-inventory backend

## API layout

Errors are handled by a middleware.

- `index.js` - The main entry point for any specific API. Routes from the router will be added to Express here.
- `routes.js` - The router. Where all the routes for this API will be defined. Authorization should be handled here.
- `controller.js` - The "brain" of the request: where you'll fetch data from the API, using the `req.db` (Knex) instance. Should return a JSON object or null/undefined.
