function (doc) {
    // we just want to have all cocktail recipes here
    if (typeof doc.type !== 'undefined' && doc.type === 'cocktail-recipe') {
        emit(doc.created_at, doc);
    }
}
