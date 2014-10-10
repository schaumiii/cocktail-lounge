function (newObject, oldObject, userContext) {
    if (newObject._deleted) {
        return;
    }
    switch (newObject.type) {
        case 'cocktail-recipe':
            if (!newObject.title || !newObject.ingredients || newObject.ingredients.length === 0) {
                throw("Missing required field.");
            }
            break;
        default:
            throw("Untyped documents are not allowed");
    }
}
