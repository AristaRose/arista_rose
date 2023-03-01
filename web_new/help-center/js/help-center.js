$(function () {
    let codePath = document.getElementById('help-center-textarea');
    codePath.addEventListener('input', function () {
        let _this = this;
        _this.style.height = 'auto';
        _this.style.height = `${_this.scrollHeight}px`;
        let _parent = this.parentNode;
        if (_parent.clientHeight > 216) {
            _parent.style.height = 'auto';
        }
        _parent.style.height = `${_parent.scrollHeight}px`;
    });

    $("#submit-btn").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/ajax/com/Help-center/inpcheck",
            data: $('#postForm').serialize(),
            dataType: "json",
            success: function (response) {
                $('.err').html('');
                if (response['state'] == '403') {
                    $.each(response['error'], function (key, value) { 
                        $("[name="+ key +"]").parent().next('.err').html(value);
                    });
                } else {
                    alert('Data berhasil dikirim. \nTerima kasih atas pendaftaran Anda.');
                    window.location.reload();
                }
            }
        });
    });
});