let src,node,views;document.querySelectorAll(".modal-show").forEach((item,index)=>{item.addEventListener('click',(e)=>{src="https://www.youtube.com/embed/"+item.previousElementSibling.getAttribute("data-uid");node=item.parentElement.nextElementSibling.children[1].innerHTML;views=item.parentElement.nextElementSibling.children[2].children[1].innerHTML;new bootstrap.Modal('#video-modal').show();});});document.querySelector("#video-modal").addEventListener("show.bs.modal",e=>{let target=document.querySelector("#video-modal").children[0].children[0].children[0];target.children[0].setAttribute("src",src);target.children[1].children[0].children[0].innerHTML=node;target.children[1].children[0].children[0].nextElementSibling.children[1].innerHTML=views;});document.querySelector("#video-modal").addEventListener('hidden.bs.modal',e=>{let target=document.querySelector("#video-modal").children[0].children[0].children[0];target.children[0].setAttribute("src",'');target.children[1].children[0].children[0].innerHTML='';target.children[1].children[0].children[0].nextElementSibling.children[1].innerHTML='';});window.onload=function(){var mySwiper=new Swiper('.selectrow.swiper',{autoplay:0,loop:false,slidesPerView:'auto',spaceBetween:5,})}
function sectionSwitch(num){document.querySelector(".selectrow-button.active").classList.remove("active");document.querySelector("#btn"+num).classList.add("active");document.querySelector("section.show").classList.remove("show");document.querySelector("#section"+num).classList.add("show");}