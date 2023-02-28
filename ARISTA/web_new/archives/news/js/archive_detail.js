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
    function render(data) {
        var container = document.querySelector("#more-articles>.grey-card-container");
        container.innerHTML = '';
        var loopData = data.dataAll;
        loopData.forEach(item => {
            if (data.createhtml == '') {
                ref = "/archives/news/" + item.ref;
            } else {
                ref = "/Preview/archive/createhtml/archive_id/" + item.id;
            }
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
                            <a class="bottom-link" href="javascript:window.open('${ ref }')"><span>Selengkapnya</span><img loading="lazy" class="grey-card-arrow" src="/web_new/archives/images/blue-right-arrow.jpg" alt="right-arrow" decoding="async"></a>
                            <div class="collapse collapse-horizontal" id="share-coll${ item.id }" data-bs-parent="#news-main">
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
            `;
            container.innerHTML += model;
        });
    }
    function getData() {
        // fetch
        fetch('/ajax/com/archive/option', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "key=&page=4&category_id=" + category_id
        }).then(response => {
            return response.json();
        }).then(result => {
            render(result.data);
        });
    }
    getData();
})();