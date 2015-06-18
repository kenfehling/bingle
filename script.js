var SCHEMES = ['http://', 'https://']
var URLS = {
    web: 'https://google.com/search?q=',
    image: 'http://bing.com/images/search?q=',
    video: 'http://bing.com/videos/search?q=',
    maps: 'https://maps.google.com/maps?q=',
    news: 'http://bing.com/news/search?q=',
    shopping: 'https://google.com/search?tbm=shop&q=',
    goto: SCHEMES[0]
};

var urlFunctions = {};
_.each(URLS, function(url, key) {
    urlFunctions[key] = _.bind(setLinkWithUrl, {}, url);
});
urlFunctions.goto = function(string, link) {
    var f = _.bind(setLinkWithUrl, {}, URLS.goto);
    var scheme = getScheme(string);
    if (scheme) {
        f(string.slice(scheme.length), link);
    }
    else {
        f(string, link);
    }
};

function getScheme(string) {
    return _.find(SCHEMES, function(scheme) {
        return _.startsWith(string, scheme);
    });
}

function setLinkWithString(string, link) {
    $(link).attr('href', string);
}

function setLinkWithUrl(url, string, link) {
    setLinkWithString(url + string, link);
}

function setLink(string, link) {
    urlFunctions[link.id](string, link);
    //setLinkWithUrl(string, link, URLS[link.id]);
}

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
        forEachMenuLink(_.bind(setLink, {}, $q.val()));
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