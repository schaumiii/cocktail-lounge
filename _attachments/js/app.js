(function () {
    "use strict";
    var path = decodeURI(document.location.pathname).split('/'),
        designDocName = path[3],
        db = $.couch.db(path[1]),
        loadRecentCocktails,
        addRecipeViewHandler;


    loadRecentCocktails = function () {
        db.view(designDocName + '/recipes', {
            descending: true,
            limit: 10,
            success: function (cocktailDocs) {
                $.Mustache.load('./templates/cocktail-listitem.html')
                    .done(function () {
                        var cocktailData = cocktailDocs.rows.map(function (row) {
                            return row.value;
                        });

                        $('#cocktail-lounge-latest-cocktails')
                            .mustache(
                                'cocktail-lounge-cocktail-listitem',
                                {cocktails: cocktailData},
                                {method: 'html'}
                            );

                        addRecipeViewHandler();
                    });
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

    $('#cocktail-lounge-search-field').keydown(function (event) {
        if ( event.which === 13 ) {
            event.preventDefault();

            var searchField = $('#cocktail-lounge-search-field');

            $.post(
                '_list/searchresult/recipes-by-ingredients',
                JSON.stringify({keys: [searchField.val()]}),
                function (data) {
                    CocktailLounge.util.showContent('searchresult');

                    $('#cocktail-lounge-searchkey').text(searchField.val());
                    searchField.val('').blur();

                    $('#cocktail-lounge-searchresult').html(data);

                    addRecipeViewHandler();

                },
                'html'
            );
        }
    });

    addRecipeViewHandler = function() {
        $('.cocktail-lounge-view-recipe').click(function (event) {
            event.preventDefault();

            $.get(
                '_show/recipe/' + $(this).attr('href'),
                null,
                function (data) {
                    $('#cocktail-lounge-content-recipe').html(data);

                    CocktailLounge.util.showContent('recipe');
                }
            )
        });
    };

    $(document).ready(function() {
        $('#cocktail-lounge-load-recent-button').click(loadRecentCocktails);
        $('#cocktail-lounge-homelink').click(loadRecentCocktails);



        loadRecentCocktails();
    });
})();
