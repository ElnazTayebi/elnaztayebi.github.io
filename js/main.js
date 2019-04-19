$(function () {
    // $("#mobileinput").inputmask("0\\9999999999", { clearMaskOnLostFocus: false });
    $("#mobileinput").inputmask("99999999999", { clearMaskOnLostFocus: false });
   
    //Call OTP Request
    var tkey = "KeyFnd2";
    var sid = "2766";
    var to = "12";
    var from;
    var smscode;
    var basedomain = "http://app-land.ir";
    var otpurl = basedomain + "/api/App/OTP"
    var otpconfirmurl = basedomain + "/api/App/OTPConfirm"

    $("#otprequestbtn").click(function (e) {
        e.preventDefault();
        from = $("#mobileinput").val();
        var myData = JSON.stringify({ 'From': from, 'To': to, 'Tkey': tkey, 'SID': sid });
        $.ajax({
            url: otpurl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            data: myData,
            datatype: 'json',
            success: function (data) {
                if (data.statusCode == "0") {
                    $("#step1").addClass("d-none");
                    $("#step2").removeClass("d-none");
                    $("#stepno1").removeClass("stepin");
                    $("#stepno2").addClass("stepin");
                    $("#verificationcode").focus();
                    $("#verificationcode").inputmask("9 9 9 9", { clearMaskOnLostFocus: false });

                    $("#alertbox").addClass("d-none");
                    startTimer();
                }
                else {
                    $("#alertbox").removeClass("d-none");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#alertbox").show();
            }
        });
    });

    $("#otpresubmit").click(function (e) {
        e.preventDefault();
        from = $("#mobileinput").val();
        var myData = JSON.stringify({ 'From': from, 'To': to, 'Tkey': tkey, 'SID': sid });
        $.ajax({
            url: otpurl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            data: myData,
            datatype: 'json',
            success: function (data) {
                if (data.statusCode == "0") {
                    $("#otpresubmit").prop('disabled', true);
                    startTimer();
                }
                else {
                    $("#alertbox").removeClass("d-none");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#alertbox").show();
            }
        });
    });

    $("#submitverificationcode").click(function (e) {
        e.preventDefault();
        from = $("#mobileinput").val();
        smscode = $("#verificationcode").val().replace(/\s/g, '');
        var source = getUrlVars()["source"];
        var myData = JSON.stringify({ 'From': from, 'To': to, 'Tkey': tkey, 'SID': sid, 'SmsCode': smscode, 'Source': source });
        $.ajax({
            url: otpconfirmurl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            data: myData,
            datatype: 'json',
            success: function (data) {
                if (data.statusCode == "0") {
                    $("#step2").addClass("d-none");
                    $("#step3").removeClass("d-none");
                    $("#stepno2").removeClass("stepin");
                    $("#stepno3").addClass("stepin");

                    $("#alertbox").addClass("d-none");
                }
                else {
                    $("#alertbox").removeClass("d-none");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#alertbox").show();
            }
        });
    });


});


function startTimer() {
    var time = new Date();
    //alert(time);
    time.setMinutes(time.getMinutes() + 1);
    var timestr = time.getFullYear() + '/' + (time.getMonth() + 1) + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    //alert(timestr)
    $('#clock').countdown(timestr, function (event) {
        $(this).html(event.strftime('%M:%S'));
    }).on('finish.countdown', function (e) {
        $("#otpresubmit").prop('disabled', false);
    });
}


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


