function createDocument(txt) {
    return new DOMParser().parseFromString(`${txt}`, 'text/html').body.childNodes;
}


window.onload = function() {
    let Swiper1;
    if (document.body.offsetWidth <= 768) {
        let displayIItem = 5
        Swiper1 = new Swiper('.icon-row.swiper',{
            autoplay : 0,
            slidesPerView : displayIItem,
            loop : false,
            spaceBetween: 15,
            navigation: {
              nextEl:'.product-arrow',
            },
        });
        
        let productUnit = Array.prototype.slice.call(document.querySelectorAll('.swiper-slide'));
        // let productUnitNum = productUnit.length;
        let productActive = Array.prototype.slice.call(document.querySelectorAll('.icon-row.swiper .active'));

        let selectNumber = productUnit.findIndex(function(item, index){
          if (item == productActive[0]) {
            return index;            
          }
        });

        if (selectNumber+1 > displayIItem) {
          Swiper1.slideTo(selectNumber);
        }
    }
}