(function () {
    "use strict";
    var path = decodeURI(document.location.pathname).split('/'),
        designDocName = path[3],
        db = $.couch.db(path[1]),
        loadRecentCocktails;


    loadRecentCocktails = function () {
        db.view(designDocName + '/recipes', {
            descending: true,
            limit: 10,
            success: function (cocktailDocs) {
                var cocktailList = '<ul>';

                cocktailDocs.rows.forEach(function (cocktailDoc) {
                    cocktailList += '<li>' + cocktailDoc.value.title + (cocktailDoc.value.non_alcoholic ? ' <i class="fa fa-car"></i>' : ' ') + '</li>';
                });

                cocktailList += '</ul>';

                $('#cocktail-lounge-latest-cocktails').html(cocktailList);
            }
        });
    };

    // add recipe
    $('form.cocktail-lounge-add').submit(function () {
        var doc, form = this;

        doc = $(form).serializeObject();

        // splitting the comma-seperated-list
        doc.ingredients = doc.ingredients.split(',').map(CocktailLounge.util.trim);
        // checking for checkbox
        doc.non_alcoholic = typeof doc.non_alcoholic !== 'undefined';

        doc.created_at = new Date();
        doc.type = 'cocktail-recipe';

        db.saveDoc(doc, {
            success: function () {
                $('p.cocktail-lounge-form-feedback-message')
                    .removeClass(['bg-primary', 'bg-info', 'bg-warning', 'bg-danger'])
                    .addClass('bg-success')
                    .html('Successfully added new recipe!');

                form.reset();
            },
            error: function (request, textStatus, errorThrown) {
                $('p.cocktail-lounge-form-feedback-message')
                    .removeClass(['bg-primary', 'bg-info', 'bg-success', 'bg-warning', 'bg-danger'])
                    .addClass('bg-danger')
                    .html(textStatus);
            }
        });

        return false;
    });

    $(document).ready(function() {
        $('#cocktail-lounge-load-recent-button').click(loadRecentCocktails);
        $('#cocktail-lounge-homelink').click(loadRecentCocktails);
        loadRecentCocktails();
    });
})();
