$(function () {




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
    var tkey = "KeyPNakh";
    var sid = "2762";
    var to = "10";
    var otpurl = "http://79.175.138.108:8090/webAppInline/sub"

    $("#otprequestbtn").click(function(e){
        e.preventDefault();
        $.ajax({
            url: otpurl,
            type: 'POST',
            headers: {  'Tkey': tkey, 'SID': sid },
            data: { 'From': '989901359936', 'To': to },
            datatype: 'jsonp',
            success: function (data) { alert(data); },
            error: function (jqXHR, textStatus, errorThrown) { alert(textStatus); }
        });
    });

    


});



