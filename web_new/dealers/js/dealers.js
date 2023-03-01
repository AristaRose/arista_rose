function redirect(latitude, longitude) {
    window.open('https://www.google.co.id/maps?q=' + latitude + ',' + longitude, '_blank');
}

(function() {
    // init
    function initializeSelect2(target, placeholder) {
        target.select2({
            placeholder: placeholder
        });
    }

    $("select[id^=condition]").each(function(index, target) {
        target = $(target);
        initializeSelect2(target, target.data('placeholder'));
    });

    function resetDealerInfo() {
        var dealer_info = $(".dealer-info");
        dealer_info.each(function(index, target) {
            target = $(target);
            var childrenNum = target.children().length;
            if (childrenNum % 3 !== 0) {
                target.append($("<div class='dealer-card' style='background-color: transparent; height: 0; margin: 0;'></div>"));
            }
        });
    }
    resetDealerInfo();

    // multiple-select click
    $(".multiple-select-btn").click(function(e) {
        e.stopPropagation();
        var $this = $(this);
        var select_arrow = $this.children('.multiple-select-arrow');
        if (select_arrow.hasClass('multiple-select-arrow-rotate')) {
            select_arrow.removeClass('multiple-select-arrow-rotate')
        } else {
            select_arrow.addClass('multiple-select-arrow-rotate')
        }
        $this.next('.multiple-select-menu').toggle();
    });

    $("body").click(function() {
        $(".multiple-select-btn > .multiple-select-arrow").removeClass('multiple-select-arrow-rotate')
        $(".multiple-select-menu").css("display", "none");
    });

    $(".multiple-select-menu").click(function(e) {
        e.stopPropagation();
    });

    // update dealer card
    $nearby_box = $("#nearby-box");
    $result_box = $("#result-box");
    function updateHtml($box, obj, clearable = true) {
        var result_box = $box;
        var newHtml = '';
        clearable && result_box.empty();
        obj.forEach(function(item) {
            var model = `
                <div class="dealer-card">
                    <div class="dealer-card-top">
                        <h2 class="dealer-name">${ item.name }</h2>
                        <p class="dealer-address">
                            ${ item.address }<br>
                            ${ item.city }
                        </p>
                    </div>
                    <div class="dealer-card-bottom">
                        <a class="dealer-card-btn" href="tel:${ item.no_phone }"><img loading="lazy" class="dealer-card-icon" src="/web_new/dealers/images/phone.png" alt="phone" decoding="async"><span>${ item.no_phone }</span></a>
                        <a class="dealer-card-btn" href="/consultation/"><img loading="lazy" class="dealer-card-icon" src="/web_new/dealers/images/note.png" alt="note" decoding="async"><span>KONSULTASI PEMBELIAN</span></a>
                        <a class="dealer-card-btn" href="javascript:void(0);" onclick="redirect('${ item.latitude }', '${ item.longitude }')"><img loading="lazy" class="dealer-card-icon" src="/web_new/dealers/images/pointer.png" alt="pointer" decoding="async"></a>
                    </div>
                </div>
            `;
            newHtml += model;
        });
        result_box.append(newHtml);
        resetDealerInfo();
    }

    // calculate nearby three dealers
    function getDistance(source, destination) {
        return google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(source.lat, source.lng),
            new google.maps.LatLng(destination.lat, destination.lng)
        );
    }
    function calculateDistance(obj) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var myLocation =  { lat: position.coords.latitude, lng: position.coords.longitude };
                var nearbys = [];
                obj.forEach(function(item) {
                    var dist = getDistance(myLocation, { lat:item.latitude, lng:item.longitude });
                    item.dist = parseInt(dist);
                    nearbys.push(item);
                });

                for (let i = 0; i < nearbys.length - 1; i++) {
                    let min = i; 
                    for (let j = min + 1; j < nearbys.length; j++) {
                        if (nearbys[min].dist > nearbys[j].dist) {
                            min = j;
                        }
                    }
                    let tmp = JSON.parse(JSON.stringify(nearbys[min]));
                    nearbys[min] = JSON.parse(JSON.stringify(nearbys[i]));
                    nearbys[i] = JSON.parse(JSON.stringify(tmp));
                }

                nearbys = nearbys.slice(0, 3);
                updateHtml($nearby_box, nearbys);
                $("#map").attr("src", `https://www.google.com/maps/embed/v1/place?q=${nearbys[0].latitude}%2C${nearbys[0].longitude}&key=AIzaSyA8frodS4j_wAHsICFi_nCwXcxXoJuxLi0`)
            }, function(fail) {
                console.error(fail);
            });
        }
    }

    var first = true;
    // ajax to get dealer data
    function loadFilterMansory($search, $province, $city, $district) {
        offset = 9;
        $search = $search || $("#search-input");
        $province = $province || $("#condition-provinsi");
        $city = $city || $("#condition-kota");
        $district = $district || $("#condition-layanan");
        $.ajax({
            url: "/ajax/com/dealer/filter",
            type: "POST",
            dataType: "json",
            data: {
                "search": $search.val(),
                "filter": window.checkedOptions,
                "city": $city.find(":selected").text(),
                "province": $province.find(":selected").text(),
                "district": $district.find(":selected").text(),
            },
            success: function(data) {
                updateHtml($result_box, data.view);
                if (first) {
                    getNearbyDealers();
                    first = !first;
                }
            },
        });
    }

    // ajax to get nearby dealers
    function getNearbyDealers() {
        $.ajax({
            url: "/ajax/com/dealer/search-dealers",
            type: "POST",
            dataType: "json",
            success: function(data) {
                calculateDistance(data);
            },
        });
    }

    // ajax to load more dealers
    var offset = 9;
    function loadMore($search, $province, $city, $district) {
        $search = $search || $("#search-input");
        $province = $province || $("#condition-provinsi");
        $city = $city || $("#condition-kota");
        $district = $district || $("#condition-layanan");
        $.ajax({
            url: "/ajax/com/dealer/loadmore",
            type: "POST",
            dataType: "json",
            data: {
                "offset": offset,
                "search": $search.val(),
                "filter": window.checkedOptions,
                "city": $city.find(":selected").text(),
                "province": $province.find(":selected").text(),
                "district": $district.find(":selected").text()
            },
            success: function(data) {
                if (data.view.length != 0) {
                    updateHtml($result_box, data.view, false);
                    offset += 9;
                }
            },
        });
    }

    // ajax to get city data
    function getCity(province_id, target) {
        target.empty().append(`<option value=""></option>`);
        $.ajax({
            url: '/ajax/com/dealer/getcity',
            type: 'POST',
            dataType: 'json',
            data: { province_id: province_id },
            success: function (data) {
                $.each(data, function(key, value) {
                    target.append("<option value='" + value.id + "'>" + value.name + "</option>");
                });
            }
        });
    }

    // ajax to get district data
    function getDistrict(city, target) {
        target.empty().append(`<option value=""></option>`);
        $.ajax({
            url: '/ajax/com/dealer/search-dealers',
            type: 'POST',
            dataType: 'json',
            data: { city: city },
            success: function (data) {
                var checkRepeat = [];
                $.each(data, function(key, value) {
                    if (!checkRepeat.includes(value.district)) {
                        target.append("<option value='" + value.district + "'>" + value.district + "</option>");
                        checkRepeat.push(value.district);
                    }
                });
            }
        });
    }

    // bind change event
    window.checkedOptions = [];
    var sw = screen.width;
    var $condition_search = $("#search-input");
    var $condition_search_sp = $("#search-input-sp");
    var $condition_provinsi = $("#condition-provinsi");
    var $condition_provinsi_sp = $("#condition-provinsi-sp");
    var $condition_kota = $("#condition-kota");
    var $condition_kota_sp = $("#condition-kota-sp");
    var $condition_layanan = $("#condition-layanan");
    var $condition_layanan_sp = $("#condition-layanan-sp");

    if (sw >= 768) {
        // pc
        $condition_provinsi.change(function() {
            var $this = $(this);
            getCity($this.val(), $condition_kota);
            loadFilterMansory($condition_search, $this, $condition_kota, $condition_layanan);
        });

        $condition_kota.change(function() {
            var $this = $(this);
            getDistrict($this.children('option:selected').html(), $condition_layanan);
            loadFilterMansory($condition_search, $condition_provinsi, $this, $condition_layanan);
        });

        $condition_layanan.change(function() {
            loadFilterMansory($condition_search, $condition_provinsi, $condition_kota, $condition_layanan);
        });

        $(".category-btn").click(function() {
            var $this = $(this);
            if ($(this).prop("checked")) {
                window.checkedOptions.push($this.val());
            } else {
                window.checkedOptions = window.checkedOptions.filter((x) => x !== $this.val());
            }
            loadFilterMansory($condition_search, $condition_provinsi, $condition_kota, $condition_layanan);
        });
        
        $("#search-input").keyup(function() {
            var value = $(this).val();
            var $province = $("#condition-provinsi");
            var $city = $("#condition-kota");
            var $district = $("#condition-layanan");
            if (value.length >= 3 || value.length == 0) {
                $.ajax({
                    url: "/ajax/com/dealer/filter",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "filter": window.checkedOptions,
                        "city": $city.find(":selected").text(),
                        "province": $province.find(":selected").text(),
                        "district": $district.find(":selected").text(),
                        "search": value
                    },
                    success: function(data) {
                        updateHtml($result_box, data.view);
                    },
                });
            }
        });
        // get more dealers
        $('#btn-more-dealers').click(function() {
            loadMore($condition_search, $condition_provinsi, $condition_kota, $condition_layanan);
        });
        // reset
        $("#reset-btn").click(function() {
            $(".multiple-checkbox").prop("checked", false);
            $("#condition-provinsi").select2().val('').trigger("change");
            $("#condition-kota").select2().val('').trigger("change");
            $("#search-input").val('');
            window.checkedOptions = [];
        });
    } else {
        // sp
        $condition_provinsi_sp.change(function() {
            var $this = $(this);
            getCity($this.val(), $condition_kota_sp);
            loadFilterMansory($condition_search_sp, $this, $condition_kota_sp, $condition_layanan_sp);
        });

        $condition_kota_sp.change(function() {
            var $this = $(this);
            getDistrict($this.children('option:selected').html(), $condition_layanan_sp);
            loadFilterMansory($condition_search_sp, $condition_provinsi_sp, $this, $condition_layanan_sp);
        });

        $condition_layanan_sp.change(function() {
            loadFilterMansory($condition_search_sp, $condition_provinsi_sp, $condition_kota_sp, $condition_layanan_sp);
        });

        $(".category-btn-sp").click(function() {
            var $this = $(this);
            if ($(this).prop("checked")) {
                window.checkedOptions.push($this.val());
            } else {
                window.checkedOptions = window.checkedOptions.filter((x) => x !== $this.val());
            }
            loadFilterMansory($condition_search_sp, $condition_provinsi_sp, $condition_kota_sp, $condition_layanan_sp)
        });

        $("#search-input-sp").keyup(function() {
            var value = $(this).val();
            var $province = $("#condition-provinsi-sp");
            var $city = $("#condition-kota-sp");
            var $district = $("#condition-layanan-sp");
            if (value.length >= 3 || value.length == 0) {
                $.ajax({
                    url: "/ajax/com/dealer/filter",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "filter": window.checkedOptions,
                        "city": $city.find(":selected").text(),
                        "province": $province.find(":selected").text(),
                        "district": $district.find(":selected").text(),
                        "search": value
                    },
                    success: function(data) {
                        updateHtml($result_box, data.view);
                    },
                });
            }
        });
        // get more dealers
        $('#btn-more-dealers').click(function() {
            loadMore($condition_search_sp, $condition_provinsi_sp, $condition_kota_sp, $condition_layanan_sp);
        });
        // reset
        $("#reset-btn-sp").click(function() {
            $(".multiple-checkbox").prop("checked", false);
            $("#condition-provinsi-sp").select2().val('').trigger("change");
            $("#condition-kota-sp").select2().val('').trigger("change");
            $("#search-input-sp").val('');
            window.checkedOptions = [];
        });
    }

    // initial first load data
    loadFilterMansory();
})();