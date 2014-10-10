function (doc) {
    // we just want to have all cocktail recipes here
    if (typeof doc.type !== 'undefined' && doc.type === 'cocktail-recipe') {
        doc.ingredients.forEach(function (ingredient) {
            emit(ingredient, doc);
        });
    }
}
