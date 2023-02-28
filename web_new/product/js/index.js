var Swiper1;
var Swiper2;
var Swiper3;
var Swiper4;
var Swiper5;
var SwiperBanner;
var c = true;
var crl;
window.onload = function () {
  SwiperBanner = new Swiper("#bannnerswiper", { autoplay: { delay: 5000 }, slidesPerView: 1, loop: true });
  if (SwiperBanner.slides.length <= 3) {
    SwiperBanner.destroy();
  }
  if (document.body.offsetWidth <= 1119) {
    if (document.querySelector("#sec2-swiper0")) {
      Swiper1 = new Swiper("#sec2-swiper0", {
        autoplay: 0,
        slidesPerView: 1.5,
        loop: false,
        centeredSlides: true,
        allowTouchMove: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        on: {
          click: function () {
            var btn = "sec2-div0-" + this.clickedIndex;
            document.getElementById(btn).click();
          },
        },
        spaceBetween: -30,
      });
    }
    if (document.querySelector("#sec3-swiper")) {
      Swiper2 = new Swiper("#sec3-swiper", {
        autoplay: 0,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        allowTouchMove: false,
        navigation: { prevEl: "#sec3-swiper-btn-L", nextEl: "#sec3-swiper-btn-R" },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slideToClickedSlide: true,
      });
    }
    if (document.querySelector("#sec6-swiper")) {
      Swiper3 = new Swiper("#sec6-swiper", {
        autoplay: 0,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        navigation: { prevEl: "#sec6-swiper-btn-L", nextEl: "#sec6-swiper-btn-R" },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      });
    }
    if (document.querySelector("#sec5-swiper")) {
      Swiper4 = new Swiper("#sec5-swiper", { autoplay: false, slidesPerView: 1, loop: true, navigation: { prevEl: "#sec5-swiper-btn-L", nextEl: "#sec5-swiper-btn-R" } });
    }
    if (document.querySelector("#sec7-swiper")) {
      if (document.querySelectorAll("#sec7-swiper .swiper-slide").length == 1) {
        Swiper5 = new Swiper("#sec7-swiper", { autoplay: 0, slidesPerView: 2, spaceBetween: 12, loop: false, navigation: { prevEl: "#sec7-swiper-btn-L", nextEl: "#sec7-swiper-btn-R" } });
      } else {
        Swiper5 = new Swiper("#sec7-swiper", { autoplay: 0, slidesPerView: 2, spaceBetween: 12, loop: true, navigation: { prevEl: "#sec7-swiper-btn-L", nextEl: "#sec7-swiper-btn-R" } });
      }
    }
  } else {
    if (document.querySelector("#sec2-swiper0")) {
      Swiper1 = new Swiper("#sec2-swiper0", {
        autoplay: 0,
        slidesPerView: 3,
        loop: false,
        centeredSlides: true,
        allowTouchMove: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        on: {
          click: function () {
            var btn = "sec2-div0-" + this.clickedIndex;
            document.getElementById(btn).click();
          },
        },
      });
    }
    if (document.querySelector("#sec3-swiper")) {
      Swiper2 = new Swiper("#sec3-swiper", {
        autoplay: 0,
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        allowTouchMove: false,
        navigation: { prevEl: "#sec3-swiper-btn-L", nextEl: "#sec3-swiper-btn-R" },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slideToClickedSlide: true,
      });
    }
    if (document.querySelector("#sec6-swiper")) {
      Swiper3 = new Swiper("#sec6-swiper", {
        autoplay: 0,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        navigation: { prevEl: "#sec6-swiper-btn-L", nextEl: "#sec6-swiper-btn-R" },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      });
    }
    if (document.querySelector("#sec5-swiper")) {
      if (document.querySelectorAll("#sec5-swiper .swiper-slide").length == "1") {
        Swiper4 = new Swiper("#sec5-swiper", { autoplay: false, slidesPerView: 2, centerInsufficientSlides: true, loop: false, navigation: { prevEl: "#sec5-swiper-btn-L", nextEl: "#sec5-swiper-btn-R" } });
      } else {
        Swiper4 = new Swiper("#sec5-swiper", { autoplay: false, slidesPerView: 2, loop: true, navigation: { prevEl: "#sec5-swiper-btn-L", nextEl: "#sec5-swiper-btn-R" } });
      }
    }
    if (document.querySelector("#sec7-swiper")) {
      if (document.querySelectorAll("#sec7-swiper .swiper-slide").length <= 3) {
        Swiper5 = new Swiper("#sec7-swiper", { autoplay: 0, slidesPerView: 4, spaceBetween: 20, loop: false, navigation: { prevEl: "#sec7-swiper-btn-L", nextEl: "#sec7-swiper-btn-R" } });
      } else {
        Swiper5 = new Swiper("#sec7-swiper", { autoplay: 0, slidesPerView: 4, spaceBetween: 20, loop: true, navigation: { prevEl: "#sec7-swiper-btn-L", nextEl: "#sec7-swiper-btn-R" } });
      }
    }
  }
  if (document.querySelector("#circlr")) {
    crl = circlr("circlr", { scroll: true, mouse: false, loader: "loader" });
  }
};
var sec2ColorDiv = document.querySelectorAll(".sec2-color-div");
sec2ColorDiv.forEach(function (element, index) {
  element.onclick = function () {
    document.querySelectorAll(".sec2-color-div.active").forEach(function (element2, index) {
      element2.classList.remove("active");
    });
    var color_name = element.getAttribute("data-src");
    element.parentElement.nextElementSibling.innerHTML = color_name;
    this.classList.add("active");
    var id = this.getAttribute("data-no");
    Swiper1.slideTo(id, 1000, true);
  };
});
document.querySelectorAll(".sec4-coll").forEach(function (element, index) {
  element.addEventListener("hide.bs.collapse", (event) => {
    element.previousElementSibling.children[0].children[2].innerHTML = "+";
  });
  element.addEventListener("show.bs.collapse", (event) => {
    element.previousElementSibling.children[0].children[2].innerHTML = "-";
  });
});
if (document.querySelector(".sec7-coll")) {
  document.querySelectorAll(".sec7-coll").forEach(function (element, index) {
    element.addEventListener("hide.bs.collapse", (event) => {
      element.previousElementSibling.children[0].children[1].innerHTML = "+ Show";
    });
    element.addEventListener("show.bs.collapse", (event) => {
      element.previousElementSibling.children[0].children[1].innerHTML = "- Hide";
    });
  });
}
if (document.querySelector(".scrollBtn")) {
  document.querySelectorAll(".scrollBtn").forEach(function (element, index) {
    element.onclick = function () {
      var height = document.getElementById("section2").offsetTop;
      window.scrollTo({ top: height, behavior: "smooth" });
    };
  });
}
if (document.querySelector("#control360")) {
  document.getElementById("control360").onclick = function () {
    if (c) {
      crl.play();
      c = false;
      return false;
    } else {
      crl.stop();
      c = true;
      return false;
    }
  };
}
$("#sec7-collapse").load("/web_new/consultation/input.html", function () {
  var name = document.getElementById("product_name").value;
  setTimeout(() => {
    interested(name);
  }, 2000);
});
function sec2Change($key) {
  document.querySelectorAll(".sec2-div.sec2-show").forEach(function (element, index) {
    element.classList.remove("sec2-show");
  });
  document.getElementById("sec2-div" + $key).classList.add("sec2-show");
  document.querySelectorAll(".sec2-version.active").forEach(function (element, index) {
    element.classList.remove("active");
  });
  document.getElementById("sec2-btn" + $key).classList.add("active");
  if (document.body.offsetWidth <= 1199) {
    Swiper1 = new Swiper("#sec2-swiper" + $key, {
      autoplay: 0,
      slidesPerView: 1.5,
      loop: false,
      centeredSlides: true,
      allowTouchMove: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      on: {
        click: function () {
          var btn = "sec2-div" + $key + "-" + this.clickedIndex;
          document.getElementById(btn).click();
        },
      },
      spaceBetween: -30,
    });
  } else {
    Swiper1 = new Swiper("#sec2-swiper" + $key, {
      autoplay: 0,
      slidesPerView: 3,
      loop: false,
      centeredSlides: true,
      allowTouchMove: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      on: {
        click: function () {
          var btn = "sec2-div" + $key + "-" + this.clickedIndex;
          document.getElementById(btn).click();
        },
      },
    });
  }
  console.log(document.querySelector("#sec2-div" + $key + "-0"));
  document.querySelector("#sec2-div" + $key + "-0").click();
}
