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
        var container = document.querySelector("#activity>.grey-card-wrapper");
        container.innerHTML = '';
        var loopData = data.dataAll;
        loopData.forEach(item => {
            ref = "/archives/news/" + item.ref;
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
                            <div class="collapse collapse-horizontal" id="share-coll${ item.id }" data-bs-parent="#activity">
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
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "key=&page=4&category_id=5&createhtml=1"
        }).then(response => {
            return response.json();
        }).then(result => {
            render(result.data);
        });
    }
    getData();
})();

// get element
let history_link = document.querySelector('.yamaha-history .history-link');
let history_images_pc = document.querySelector('.history-images-pc');
let history_show_image = document.querySelector('.history-show-image');
history_show_image.addEventListener('load', function() {
    // calculate initail right
    let total_width = history_show_image.width;
    let show_width = window.innerWidth;
    let hidden_width = total_width - show_width;
    // pc
    if (show_width >= 1300) {
        if (hidden_width < 0) hidden_width = 0;
        history_link.style.cssText = `right: ${ hidden_width }px;`;
        // params
        let click_start_point = 0;
        let right = hidden_width;
        let scroll_left = history_images_pc.scrollLeft;
    
        function move(e) {
            var move_distance = (e.screenX - click_start_point);
            if (hidden_width == 0) move_distance *= ( total_width / hidden_width )
            right -= move_distance;
            if (right < 0) right = 0;
            if (scroll_left == 0) right = hidden_width;
            if (scroll_left >= 0) scroll_left += move_distance;
            if (scroll_left < 0) scroll_left = 0;
            click_start_point = e.screenX;
            history_link.style.right = right + 'px';
            history_images_pc.scrollLeft = scroll_left;
        }
    
        function stop() {
            document.onmousemove = history_link.onmousemove = null;
        }
    
        // bind event
        history_link.onmousedown = function(e) {
            click_start_point = e.screenX;
            document.onmousemove = history_link.onmousemove = move;
            e.preventDefault()
        }
        
        document.onmouseup = history_link.onmouseup = stop;
    } else {
        // sp
        let touch_start_point = 0;
        let initialLeft = (show_width / total_width) * show_width;
        let left = initialLeft;
        let history_link_width = history_link.clientWidth;
        let beilv = hidden_width / (show_width - (left + history_link_width));
        let disparity = 0;
        history_link.style.cssText = `left: ${ left }px;`;

        if (left - history_link_width < 0) {
            disparity = history_link_width - left;
        }
        function move(e) {
            var pageX = e.touches[0].pageX;
            var move_distance = pageX - touch_start_point;
            left += move_distance;
            if (left < initialLeft) left = initialLeft;
            if (left >= show_width - history_link_width) left = show_width - history_link_width;
            history_link.style.left = left + 'px';
            history_images_pc.scrollLeft = (left - initialLeft + disparity) * beilv;
            touch_start_point = e.touches[0].pageX;
        }

        function stop() {
            document.ontouchmove = history_link.ontouchmove = null;
        }

        history_link.ontouchstart = function(e) {
            history_images_pc.removeEventListener('scroll', scrollFunc);
            touch_start_point = e.touches[0].pageX;
            document.ontouchmove = history_link.ontouchmove = move;
        }

        document.ontouchend = history_link.ontouchend = stop;

        let scroll_beilv = (total_width - show_width) / (show_width - (initialLeft + history_link_width));
        let scrollFunc = function(e) {
            left = initialLeft + e.target.scrollLeft / scroll_beilv;
            history_link.style.left = left + 'px';
        }
        history_images_pc.ontouchstart = function() {
            history_images_pc.addEventListener('scroll', scrollFunc);
        }

        // nav sticky
        var q_passtion_nav = document.querySelector('.passion-nav');
        window.addEventListener('scroll', function(e) {
            console.log(this.document.querySelector('html').scrollTop);
            if (this.document.querySelector('html').scrollTop >= this.document.querySelector('.header-first').clientHeight) {
                q_passtion_nav.classList.add('passion-nav-sticky');
            } else {
                q_passtion_nav.classList.remove('passion-nav-sticky');
            }
        });
    }
});
