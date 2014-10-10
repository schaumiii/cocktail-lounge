function(head, req) {
    var mustache = require('vendor/mustache'),
        row;

    start({
        'headers': {
            'Content-Type': 'text/html'
        }
    });

    mustache.parse(this.templates.recipe_list_item);

    while (row = getRow()) {
        send(mustache.render(this.templates.recipe_list_item, row.value));
    }
}