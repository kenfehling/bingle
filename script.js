var URLS = {
    web: 'https://google.com/search?q=',
    image: 'http://bing.com/images/search?q=',
    video: 'http://bing.com/videos/search?q=',
    maps: 'https://maps.google.com/maps?q=',
    news: 'http://bing.com/news/search?q=',
    shopping: 'https://google.com/search?tbm=shop&q=',
    goto: 'http://'
};
var DEFAULT_ACTION = 'web';
$(function() {
    var $form = $('form');
    var $q = $('#q');
    var $menu = $('#menu');

    $form.attr('action', URLS[DEFAULT_ACTION]);
    $q.change(setLinks);

    function forEachMenuLink(f) {
        $menu.find('a').get().forEach(f);
    }

    function setLinks() {
        forEachMenuLink(function(link) {
            $(link).attr('href', URLS[link.id] + $q.val());
        });
    }

    function addTabIndexes() {
        forEachMenuLink(function(link, i) {
            if (link.id === DEFAULT_ACTION) {
                $(link).attr('tabindex', -1);
                $(link).addClass('default');
            }
            else {
                $(link).attr('tabindex', i + 2);
            }
        });
    }

    setLinks();
    addTabIndexes();
});