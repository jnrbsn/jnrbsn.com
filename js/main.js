// First part of Google Analytics tracking code.
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17389688-3']);
_gaq.push(['_trackPageview']);

// Define variables for Disqus comments.
if (typeof jnrbsn_slug !== 'undefined') {
    var disqus_shortname = 'jnrbsn';
    var disqus_identifier = jnrbsn_slug;
    var disqus_url = jnrbsn_url;
}

(function () {


    // Load some external JavaScript asynchronously.
    var loadExternalJS = function (url)
    {
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        document.body.appendChild(s);

    };//end loadExternalJS


    // This function will get called when the windows load.
    var onLoadCallback = function ()
    {
        // Hide toolbar on iPhone.
        if (navigator.userAgent.match(/iphone/i)) {
            window.scrollTo(0, 0);
        }

        // Load share buttons.
        var shareButtonDiv = document.getElementById('share-buttons');
        if (shareButtonDiv) {
            // Twitter tweet button <http://twitter.com/about/resources/tweetbutton>.
            shareButtonDiv.innerHTML += '<a class="twitter-share-button" '+
                'href="http://twitter.com/share" data-count="none" data-text="'+jnrbsn_title+
                '" data-url="'+jnrbsn_url+'" data-via="jonathanrobson">Tweet</a>';
            loadExternalJS('http://platform.twitter.com/widgets.js');

            // Facebook like button <http://developers.facebook.com/docs/reference/plugins/like/>.
            shareButtonDiv.innerHTML += '<iframe class="facebook-like-button" '+
                'src="http://www.facebook.com/plugins/like.php?href='+jnrbsn_url+
                '&amp;layout=button_count&amp;show_faces=true&amp;width=50&amp;action=like&amp;'+
                'colorscheme=light&amp;height=20" scrolling="no" frameborder="0" '+
                'allowTransparency="true"></iframe>';

            // Linkedin share buttom <http://www.linkedin.com/publishers>.
            shareButtonDiv.innerHTML += '<script type="in/share" data-url="'+jnrbsn_url+
                '"></script>';
            loadExternalJS('http://platform.linkedin.com/in.js');

            // Google +1 button <http://www.google.com/webmasters/+1/button/>.
            shareButtonDiv.innerHTML += '<g:plusone size="medium" count="false" href="'+jnrbsn_url+
                '"></g:plusone>';
            loadExternalJS('http://apis.google.com/js/plusone.js');
        }

        // Load Disqus comments.
        var commentDiv = document.getElementById('disqus_thread');
        if (commentDiv) {
            loadExternalJS('http://jnrbsn.disqus.com/embed.js');
            loadExternalJS('http://jnrbsn.disqus.com/count.js');
        }

        // Add target="_blank" to any links that go outside this domain.
        var a = document.getElementsByTagName('a');
        var l = a.length;
        var u = location.href;
        var d = u.replace(/^([a-z]+:\/\/[^\/]+)\/?.*/, '$1');
        for (var i = 0; i < l; i++) {
            if (a[i].href.indexOf(d) != 0) {
                a[i].target = '_blank';
            }
        }

    };//end onLoadCallback


    // Second part of Google Analytics tracking code.
    if (location.hostname === 'jnrbsn.com') {
        loadExternalJS('http://www.google-analytics.com/ga.js');
    }


    // Run onLoadCallback asynchronously.
    window.onload = function ()
    {
        setTimeout(onLoadCallback, 1);

    };//end window.onload


})();
