window.onload=()=>{let bannerBtn=document.querySelectorAll('.banner-btn');bannerBtn.forEach(btn=>{btn.onclick=e=>{window.location.href='#'+e.target.innerHTML.replace(/\s/g,'-');bannerBtn.forEach(btn=>{btn.classList.remove('banner-btn-active');})
e.target.classList.add('banner-btn-active');let bannerList=document.querySelectorAll('.banner-img');bannerList.forEach(banner=>{banner.classList.remove('ev-show');});document.querySelector('#banner-'+e.target.id).classList.add('ev-show');document.querySelector('#banner-box-top').setAttribute('data-before',e.target.dataset.desc);let mainList=document.querySelectorAll('.main-box');mainList.forEach(main=>{main.parentNode.classList.remove('ev-show');});document.querySelector('#main-'+e.target.id).parentNode.classList.add('ev-show');}})
let hash=window.location.hash.substring(1).toLocaleLowerCase();hash=hash===''?'indonesia':hash;document.querySelector('#'+hash).click();let videoSwiper=new Swiper('.indonesia-video-swiper',{loop:true,navigation:{nextEl:'.video-swiper-button-next',prevEl:'.video-swiper-button-prev',},breakpoints:{320:{slidesPerView:1,spaceBetween:0},1280:{slidesPerView:2,spaceBetween:40}}});}