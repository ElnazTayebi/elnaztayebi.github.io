



$(":input").inputmask();






var time = new Date();
//alert(time);
time.setMinutes(time.getMinutes() + 2 );
var timestr = time.getFullYear()+'/'+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
//alert(timestr)
$('#clock').countdown(timestr, function(event) {
    $(this).html(event.strftime('%M:%S'));
  }).on('finish.countdown', function(e){
      alert("finish")
  });

