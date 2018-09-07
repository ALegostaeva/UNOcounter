//Timer

var gameStarted = new Date().getTime();
// Update the count down every 1 second
  var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = now-gameStarted;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (document.getElementById('timer') != 0) {
    document.getElementById('timer').innerHTML = days + 'd ' + hours + 'h '
  + minutes + 'm ' + seconds + 's ';
}},
   1000);


