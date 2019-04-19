$(function () {
    $(":input").inputmask();
    // var mobileinput = document.getElementById("mobileinput");
    //Inputmask(a,"9", { repeat: 10 }).mask(mobileinput);
    $("#mobileinput").inputmask("0\\9999999999");



$(".inputverification").inputmask();


    var time = new Date();
    //alert(time);
    time.setMinutes(time.getMinutes() + 2);
    var timestr = time.getFullYear() + '/' + (time.getMonth() + 1) + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    //alert(timestr)
    $('#clock').countdown(timestr, function (event) {
        $(this).html(event.strftime('%M:%S'));
    }).on('finish.countdown', function (e) {
        alert("finish")
    });


    //Call OTP Request
    var tkey = "KeyFnd2";
    var sid = "2766";
    var to = "12";
    var from;
    var basedomain = "http://localhost:5000";
    var otpurl = basedomain + "/api/App/OTP"

    $("#otprequestbtn").click(function (e) {
        from = $("#mobileinput").val();
        e.preventDefault();
        $.ajax({
            url: otpurl,
            type: 'POST',
            data: { 'From': from, 'To': to, 'Tkey': tkey, 'SID': sid },
            datatype: 'json',
            success: function (data) { alert(data); },
            error: function (jqXHR, textStatus, errorThrown) { alert(textStatus); }
        });
    });




});



