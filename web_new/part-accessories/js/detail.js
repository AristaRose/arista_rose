window.addEventListener('load',function(){let mySwiper;let w=document.documentElement.clientWidth;let swi_btn_prev=document.querySelector('.swi_btn_prev');let swi_btn_next=document.querySelector('.swi_btn_next');if(w<=768){mySwiper=new Swiper('.power-product-swiper',{loop:true,slidesPerView:2,touchRatio:0.7,spaceBetween:'2%',});}else if(w<=1366){mySwiper=new Swiper('.power-product-swiper',{loop:true,slidesPerView:3,touchRatio:0.7,spaceBetween:'2%',});}else{mySwiper=new Swiper('.power-product-swiper',{loop:true,slidesPerView:4,spaceBetween:'2%',touchRatio:0.7,});}
swi_btn_prev.addEventListener('click',function(e){mySwiper.slidePrev();});swi_btn_next.addEventListener('click',function(e){mySwiper.slideNext();});});let detail_thums_lis=document.querySelectorAll('#container .detail_thums li');let detail_imgs_lis=document.querySelectorAll('#container .detail_imgs li');detail_thums_lis.forEach((item,index)=>{item.addEventListener('click',function(e){document.querySelector('#container .detail_thums li.thums_active').classList.remove('thums_active');this.classList.add('thums_active');document.querySelector('#container .detail_imgs li.detail_active').classList.remove('detail_active');detail_imgs_lis[index].classList.add('detail_active');});});let mark_menu_control=document.querySelector('#mark-menu-control');let down_arrow=document.querySelector('.btn_icon_down_arrow');let mark_menu=document.querySelector('.mark-menu');mark_menu_control.onclick=function(){if(!down_arrow.classList.contains('reverse')){down_arrow.classList.add('reverse');}else{down_arrow.classList.remove('reverse');}
if(!mark_menu.classList.contains('mark-menu-show')){mark_menu.classList.add('mark-menu-show');}else{mark_menu.classList.remove('mark-menu-show');}}