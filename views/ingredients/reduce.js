function (keys, values) {
    var ingredients = [];

    values.forEach(function (value) {
        value.forEach(function (ingredient) {
            if (ingredients.indexOf(ingredient) === -1) {
                ingredients.push(ingredient);
            }
        });
    });

    return ingredients;
}
