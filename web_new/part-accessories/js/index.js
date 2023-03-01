(function() {
    // initial
    new Swiper ('.product-banner', {
        loop: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
    });

    function toThousands(num) {
        const result = []; let counter = 0
        num = (num || 0).toString().split('')
        for (let i = num.length - 1; i >= 0; i--) {
            counter++
            result.unshift(num[i])
            if (!(counter % 3) && i !== 0) { result.unshift(',') }
        }
        return result.join('');
    }

    const getValue = ({ product_price }) => {
        if (product_price == 'Rp -') return 0;
        if (product_price.indexOf("Rp") !== -1) {
            return product_price.replaceAll(/\D/ig, '');
        }
        return product_price;
    }

    /**
     * @param {string} flag sort/category
     * @param {string} category_name
     * @param {string} sort_type up/down
     */
    function render(flag, category_name, sort_type) {
        var flag = flag || '';
        var category_name = category_name || '';
        var product_show = document.querySelector('.product-show');
        product_show.innerHTML = '';

        if (flag == 'sort' && sort_type == 'up') {
            product_arr.sort((a, b) => getValue(a) - getValue(b));
        }

        if (flag == 'sort' && sort_type == 'down') {
            product_arr.sort((a, b) => getValue(b) - getValue(a));
        }

        product_arr.forEach(function(item) {
            if (category_name != '' && item.category_name != category_name) {
                return false;
            }
            var product_card = `
                <div class="product-card">
                    <a href="${ item.link }"><img class="product-card-image" decoding="async" src="${ item.picture_pc }"></a>
                    <div class="product-card-info">
                        <h1 class="product-name">${ item.product_name }</h1>
                        <p class="product-remark">${ item.product_remark }</p>
                        <span class="product-price">${ (item.product_price != 0 && item.product_price != 'Rp -') ? (item.product_price.indexOf('Rp') == -1 ? 'Rp ' + toThousands(item.product_price) : item.product_price) : '' }</span>
                    </div>
                    <a href="${ item.link }"><img class="right-arrow" src="/web_new/part-accessories/images/index/blue-right-arrow.jpg" alt="blue-right-arrow"></a>
                </div>
            `;
            product_show.innerHTML += product_card;
        });
    }

    document.querySelector('.category-select').onchange = function() {
        render('category', this.value);
        document.querySelector('#category_name').value = this.value;
    }

    var sort_type = 'up';
    document.querySelector('.sort-btn').onclick = function() {
        render('sort', document.querySelector('#category_name').value, sort_type);
        if (sort_type == 'up') {
            sort_type = 'down';
        } else {
            sort_type = 'up';
        }
    }
})();