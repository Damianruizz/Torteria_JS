$( ".create-oven" ).on("submit", function( event ) {
  event.preventDefault();
  $( ".create-oven" ).remove();
  
  $(".oven").css("visibility", "visible");
  $(".oven").append('<form id="cook"><input type="text" id="type" name="type" placeholder="Type"><input type="text" id="time" name="time" placeholder="Time"><input id="cocinar" type="submit" value="Cocinar"></form>')
  
  $( "#cook" ).on("submit", function( event ) {
    event.preventDefault();

    var type = $('#type').val();
    var time = $('#time').val();
    var torta = new Torta(type);
    var time_ideal = torta.tiempoListas();
    console.log(torta);
    timer(time, time_ideal,torta.type);
  });

});

function timer(num, time_coxion, torta){
  counter = parseInt(num);
  num_init = counter;
  var time_ideal = counter - time_coxion;
  var status_tort = ""

  if (counter < 0 ){

    alert("Escribe un numero mayor a cero");

  } else{

    stop = setInterval(function(){
      console.log(torta);
      if (counter == num_init){
        $("#timer").addClass("Crudo");
        $("#timer").html("<p id='status'>"+counter+"</p><p>Crudo</p>");
        status_tort = "Crudo"
      } else if(time_ideal < counter) {
        $("#timer").removeClass("Crudo");
        $("#timer").addClass("Casi-listo");
        $("#timer").html("<p id='status'>"+counter+"</p><p>Casi listo</p>");
        status_tort = "Casi listo"
      } else if(time_ideal == counter){
        $("#timer").removeClass("Casi-listo");
        $("#timer").addClass("LISTO");
        $("#timer").html("<p id='status'>"+counter+"</p><p>Listo</p>");
        status_tort = "Listo"
      } else{
        $("#timer").removeClass("LISTO");
        $("#timer").addClass("QUEMADO");
        $("#timer").html("<p id='status'>"+counter+"</p><p>Quemado</p>");
        status_tort = "Quemado"
      }   



      counter--;

      if(counter === -1){
        clearInterval(stop);
        $("#history").css("visibility", "visible");
        $("#history").append("<li>"+ torta +" "+ status_tort+"</li>");
      }
    }, 1000);
  }
}

// Class Torta
function Torta(type){
  this.type = type;  
}

//Method class Torta
Torta.prototype.tiempoListas = function(){
  var torta = {
    "milanesa": 10,
    "queso": 8,
    "jamon": 6
  }
  return torta[this.type];
}