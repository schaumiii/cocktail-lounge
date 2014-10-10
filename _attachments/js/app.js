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

    $('#cocktail-lounge-load-recent-button').click(loadRecentCocktails);
})();
