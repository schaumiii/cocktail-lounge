function (doc, request) {
    if (!doc || (typeof doc.type !== 'undefined' && doc.type !== 'cocktail-recipe')) {
        throw (['error', 'not_found', 'The requested cocktail recipe has not been found.']);
    }
    var mustache = require('vendor/mustache');

    return mustache.render(this.templates.recipe, doc);
}
