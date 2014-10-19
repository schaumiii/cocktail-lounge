# Cocktail-Lounge
This is an example app for the CouchApp workshop given by @jandworschak and @schaumiii at the Javascript Days 2014 in Berlin. This app is able to manage cocktail recipes including the ingredients showing the attendees of the workshop the features of CouchDB and CouchApps.
## Usage
Each step is tagged and can be checked out individually using `git checkout step-1`. You can push the app to a running CouchDB instance using for example [couchapp](https://github.com/couchapp/couchapp): `couchapp push`
## Steps
* step-1: Listing of recipes
* step-2: Adding new recipes
* step-3: Detail view of single recipe using show function
* step-4: Search for ingredient
* step-5: Document validation
* step-6: Added suggestion for ingredients in add-recipe form
* step-7: Rewrites and vhosts: following CouchDB config needed to be set for vhost `vhosts.cocktail-lounge = "/cocktail-lounge/_design/cocktail-lounge/_rewrite"` and an `/etc/hosts` entry for `cocktail-lounge` pointing to the database.
* step-8: image upload using PouchDB
* step-9: made use of changes-feed
