$(function() {
    $('ul.nav > li > a').click(function() {
        // remove last active class
        $('ul.nav > li').removeClass('active');
        // hide old pages
        $('.cocktail-lounge-content').hide();
        // clearing maybe existing "flash messages"
        $('.cocktail-lounge-form-feedback-message').html('');
        // show actual page
        $('#cocktail-lounge-content-' + $(this).attr('data-target')).removeClass('hidden').show();
        // make navbar element seen as active
        $(this).parent().addClass('active');
    });
});
