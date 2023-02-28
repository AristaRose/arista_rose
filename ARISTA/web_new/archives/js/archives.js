function LinkToOutSite(type, url) {
    switch (type) {
        case 'twitter':
            location.href = "https://twitter.com/intent/tweet?url=https://" + document.domain + url;
            break;
        case 'whatsapp':
            location.href = "whatsapp://send?text=https://" + document.domain + url;
            break;
        case 'facebook':
            location.href = "https://facebook.com/sharer.php?u=https://" + document.domain + url;
            break;
    }
}
(function() {
    var nav_links = document.querySelectorAll('.nav-link');
    var more_btn = document.getElementById('btn-more-news');

    function cleanNavLinksActive() {
        nav_links.forEach(link => {
            if (link.classList.contains('nav-link-active')) {
                link.classList.remove('nav-link-active');
            }
        })
    }

    nav_links.forEach(link => {
        link.onclick = e => {
            var target = e.target;
            page = 5;
            cleanNavLinksActive();
            target.classList.add('nav-link-active');
            getData(target.getAttribute("data-id"));
            more_btn.setAttribute('data-type', target.getAttribute("data-id"));
        }
    });

    function render(data, append) {
        append = append || false;
        var container = document.getElementById('all');
        container.innerHTML = '';
        var loopData = data.dataAll;
        loopData.forEach((item, index) => {
            ref = "/archives/news/" + item.ref;
            if (index === 0) {
                var model = `
                    <section class="blue-card">
                        <div class="blue-card-left">
                            <img class="blue-card-img" src="${ item.image }" alt="blue-card-img" decoding="async" loading="lazy">
                        </div>
                        <div class="blue-card-right">
                            <h2 class="blue-card-date">
                                ${ item.posted_date }
                                <img loading="lazy" class="blue-card-sticky" src="/web_new/archives/images/sticky.png" alt="sticky" decoding="async">
                            </h2>
                            <h1 class="blue-card-title">${ item.title }</h1>
                            <p class="blue-card-content">${ item.description }</p>
                            <div class="blue-card-bottom">
                                <a class="bottom-link" href="${ ref }"><span>Selengkapnya</span><img loading="lazy" class="blue-card-arrow" src="/web_new/archives/images/right-arrow.png" alt="right-arrow" decoding="async"></a>
                                <div class="collapse collapse-horizontal" id="share-coll${ item.id }" data-bs-parent="#archives-main">
                                    <div class="sec4-coll-in">
                                        <a class="sec4-coll-a" href="javascript:LinkToOutSite('twitter', '${ ref }');"><img decoding="async" class="sec4-coll-icon" src="/web_new/shared/image/twitter.svg"></a>
                                        <a class="sec4-coll-a" href="javascript:LinkToOutSite('whatsapp', '${ ref }');"><img decoding="async" class="sec4-coll-icon" src="/web_new/shared/image/whatsapp.svg"></a>
                                        <a class="sec4-coll-a" href="javascript:LinkToOutSite('facebook', '${ ref }');"><img decoding="async" class="sec4-coll-icon" src="/web_new/shared/image/facebook.svg"></a>
                                    </div>
                                </div>
                                <a class="bottom-link" data-bs-toggle="collapse" href="#share-coll${ item.id }" aria-expanded="false" aria-controls="share">
                                    <img loading="lazy" decoding="async" class="sec4-fa blue-card-share" src="/web_new/archives/images/share.png">
                                </a>
                            </div>
                        </div>
                    </section>
                `;
            } else {
                var model = `
                    <section class="grey-card">
                        <div class="grey-card-left">
                            <img class="grey-card-img" src="${ item.image }" alt="grey-card-img" decoding="async" loading="lazy">
                        </div>
                        <div class="grey-card-right">
                            <h2 class="grey-card-date">
                                ${ item.posted_date }
                            </h2>
                            <h1 class="grey-card-title">${ item.title }</h1>
                            <p class="grey-card-content">${ item.description }</p>
                            <div class="grey-card-bottom">
                                <a class="bottom-link" href="${ ref }"><span>Selengkapnya</span><img loading="lazy" class="grey-card-arrow" src="/web_new/archives/images/blue-right-arrow.jpg" alt="right-arrow" decoding="async"></a>
                                <div class="collapse collapse-horizontal" id="share-coll${ item.id }" data-bs-parent="#archives-main">
                                    <div class="sec4-coll-in">
                                        <a class="sec4-coll-a" href="javascript:LinkToOutSite('twitter', '${ ref }');"><img decoding="async"  class="sec4-coll-icon" src="/web_new/shared/image/twitter.svg"></a>
                                        <a class="sec4-coll-a" href="javascript:LinkToOutSite('whatsapp', '${ ref }');"><img decoding="async"  class="sec4-coll-icon" src="/web_new/shared/image/whatsapp.svg"></a>
                                        <a class="sec4-coll-a" href="javascript:LinkToOutSite('facebook', '${ ref }');"><img decoding="async"  class="sec4-coll-icon" src="/web_new/shared/image/facebook.svg"></a>
                                    </div>
                                </div>
                                <a class="bottom-link" data-bs-toggle="collapse" href="#share-coll${ item.id }" aria-expanded="false" aria-controls="share">
                                    <img loading="lazy" decoding="async" class="sec4-fa grey-card-share" src="/web_new/archives/images/black-share.png">
                                </a>
                            </div>
                        </div>
                    </section>
                `
            }
            container.innerHTML += model;
        });
    }

    var page = 5;
    function getData(category_id, append) {
        append = append || false;
        // fetch
        fetch('/ajax/com/archive/option', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `key=&page=${ page }&category_id=${ category_id }`
        }).then(response => {
            return response.json();
        }).then(result => {
            render(result.data, append);
        })
    }

    more_btn.onclick = function(e) {
        page += 4;
        getData(e.target.getAttribute('data-type'), true);
    }
})();
window.onload = function() {
    function parseURL(url) {
        let result = {},
            seg = url.slice(1).split('&'),
            len = seg.length,
            i = 0,
            s;
        for (; i < len; i++) {
            if (!seg[i]) {
                continue;
            }
            s = seg[i].split('=');
            result[s[0]] = decodeURIComponent(s[1]);
        }
        return result;
    }
    var params = parseURL(location.search.replaceAll(/\+/g,  "%20"));
    if (JSON.stringify(params) != '{}') {
        Array.from(document.getElementsByClassName("nav-link")).forEach((link) => {
            if (link.innerHTML == params.category) {
                link.click();
            }
        });
    }
}