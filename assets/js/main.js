var _gaq = [['_setAccount', 'UA-17389688-3'], ['_trackPageview']];

if (typeof(disqus_identifier) !== 'undefined') {
    var disqus_developer = (window.location.hostname === 'jnrbsn.com' ? 0 : 1),
        disqus_shortname = 'jnrbsn';
}

$(function () {

    $.ajaxSetup({cache: true});

    // Load Google Analytics.
    if (window.location.hostname === 'jnrbsn.com') {
        $.getScript('http://www.google-analytics.com/ga.js');
    }

    // Load gists asynchronously.
    $('a[data-gist]').each(function () {
        var gistId = $(this).attr('data-gist'), file = $(this).attr('data-gist-file'),
            url = 'https://gist.github.com/' + gistId + '.json' + (file ? '?file=' + file + '&' : '?') + 'callback=?',
            $link = $(this);

        $.getJSON(url, function (gist) {
            if (!$('link[href*="//gist.github.com/"]').length) {
                $('head').append('<link rel="stylesheet" href="' + gist.stylesheet + '">');
            }

            $link.replaceWith(gist.div);
        });
    });

    // Load share buttons.
    if ($('#share-buttons').length) {
        (function () {
            var $shareButtons = $('#share-buttons'),
                pageTitle = $shareButtons.data('pageTitle'),
                pageUrl = $shareButtons.data('pageUrl'),
                deferredAssets = [];

            $shareButtons.css('opacity', 0.0);

            // Twitter tweet button <http://twitter.com/about/resources/tweetbutton>.
            $shareButtons.append(
                '<a class="twitter-share-button" href="http://twitter.com/share" data-count="none" data-text="' +
                pageTitle + '" data-url="' + pageUrl + '" data-via="jonathanrobson">Tweet</a>'
            );
            deferredAssets.push($.getScript('http://platform.twitter.com/widgets.js'));

            // Facebook like button <http://developers.facebook.com/docs/reference/plugins/like/>.
            $shareButtons.append(
                '<iframe class="facebook-like-button" src="http://www.facebook.com/plugins/like.php?href=' + pageUrl +
                '&amp;layout=button_count&amp;show_faces=true&amp;width=50&amp;action=like&amp;' +
                'colorscheme=light&amp;height=20" scrolling="no" frameborder="0"></iframe>'
            );

            // Linkedin share buttom <http://www.linkedin.com/publishers>.
            $shareButtons.append('<script type="in/share" data-url="' + pageUrl + '"></script>');
            deferredAssets.push($.getScript('http://platform.linkedin.com/in.js'));

            // Google +1 button <http://www.google.com/webmasters/+1/button/>.
            $shareButtons.append('<g:plusone size="medium" count="false" href="' + pageUrl + '"></g:plusone>');
            deferredAssets.push($.getScript('https://apis.google.com/js/plusone.js'));

            $.when.apply($, deferredAssets).done(function () {
                $shareButtons.fadeTo(1000, 1);
            });
        })();
    }

    // Load DISQUS comments.
    if ($('#disqus_thread').length) {
        $.getScript('http://jnrbsn.disqus.com/embed.js', function () {
            $(window).on('orientationchange', function () {
                DISQUS.reset({reload:true});
            });
        });
    }

    // Hide URL bar on Mobile Safari.
    if ($(window).width() < 768) {
        $(window).scrollTop(1);
    }

    // Make external links open in a new tab/window.
    $('a').each(function () {
        var $a = $(this), re = new RegExp('^(\/|(https?:)?\/\/' + window.location.host + ')');
        if(!re.test($a.attr('href'))) {
            $a.attr('target', '_blank');
        }
    });

    // Setup scroll-to links.
    $('a[data-scroll-to], button[data-scroll-to]').each(function () {
        $(this).click(function () {
            var scrollTo = $(this).attr('data-scroll-to');

            if (isNaN(parseInt(scrollTo))) {
                scrollTo = $(scrollTo).offset().top;
            }

            $('body, html').animate({ scrollTop: scrollTo }, 500);

            return false;
        });
    });

});
