var CocktailLounge = CocktailLounge || {};

(function(jQuery, CocktailLounge){
    "use strict";

    var trim,
        showContent;

    trim = function (string) {
        // thanks to @jakobwesthoff for this trim regexp ;-)
        return string.replace(/^\s*\s*|\s*$/, '');
    };

    showContent = function(page) {
        // remove last active class
        $('ul.nav > li').removeClass('active');
        // hide old pages
        $('.cocktail-lounge-content').hide();
        // clearing maybe existing "flash messages"
        $('.cocktail-lounge-form-feedback-message').html('');
        // show actual page
        $('#cocktail-lounge-content-' + page).removeClass('hidden').show();
    };

    // friendly helper http://tinyurl.com/6aow6yn
    jQuery.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    CocktailLounge.util= {
        trim: trim,
        showContent: showContent
    };
})($, CocktailLounge);
