$(document).ready(function () { // Se ejecuta cuando el documento HTML ha sido completamente cargado y analizado

    $("#desp1").change(function () { // Se ejecuta cuando cambia el valor del elemento con id "desp1"
        var plantaCount = $("#desp1").val(); // Obtiene el valor seleccionado en el elemento con id "desp1"
        $(".planta img").attr("src", function (index) { // Asigna dinámicamente las fuentes de las imágenes de las plantas
            return "img/flor" + (index + 1) + ".png"; // Devuelve la imagen de cada planta con su índice
        });
		
        $(".planta").hide().slice(0, plantaCount).show(); // Oculta las plantas y muestra solo la cantidad seleccionada
    });

    var ordenLlegada = []; // Creamos un array vacío de elementos para que los vaya llenando después

    $("#boton1").click(function () { // Se ejecuta cuando se hace clic en el botón con id "boton1"
        $("#boton1").hide(); // Oculta el botón con id "boton1"
        $("#boton2").show(); // Muestra el botón con id "boton2"

        var selecciona = parseInt($("#desp1").val()); // Obtiene el valor seleccionado en el elemento con id "desp1"
        var flores = $(".planta:visible"); // Selecciona las plantas visibles en el invernadero

        var nombrePlantas = {		// Variable que almacena una "clave-valor" de cada planta
            "planta1": "Violeta",
            "planta2": "Margarita",
            "planta3": "Rosa naranja",
            "planta4": "Rosa rosa",
            "planta5": "Girasol",
            "planta6": "Gladiolo"
        };

        function crearTabla() { // Función para crear la tabla con las plantas y su posición
            var tabla = "<table><tr><th>Posición</th><th>Planta</th></tr>"; // Crea la tabla con dos columnas

            for (var i = 0; i < ordenLlegada.length; i++) { // Itera el orden de llegada de cada planta
                var indice = ordenLlegada[i]; // Obtiene el valor de ordenLlegada y lo asigna a la variable indice
                var nombrePlanta = nombrePlantas["planta" + (indice + 1)]; /*Utiliza el valor de indice para construir una
				cadena y acceder a la propiedad correspondiente en el objeto nombrePlantas el índice se incrementa en 1
				porque los nombres de las plantas comienzan desde 1 en lugar de 0 */
                tabla += "<tr><td>" + (i + 1) + "</td><td>" + nombrePlanta + "</td></tr>"; /* Concatena una fila a la
				variable tabla que contiene la información de la posición y el nombre de la planta */
            }

            tabla += "</table>";

            $("#tabla").html(tabla); // Inserta la tabla en el elemento con id "tabla"
            $("#tabla").css("visibility", "visible"); // Hace visible el contenedor de la tabla
        }

        $(".planta img:visible").each(function (index) { // Itera sobre cada planta visible
            var planta = $(this);
            var velocidadCrecimiento = Math.random(9) * 15000; // Para ajustar la velocidad aleatoria de las plantas

            planta.animate({ marginTop: "-=600px" }, velocidadCrecimiento, function () {
                // Animación: desplaza la planta hacia arriba con una velocidad aleatoria
                var indice = index;
                ordenLlegada.push(indice);

                if (ordenLlegada.length === selecciona) {
                    // Cuando todas las plantas han llegado crea la tabla
                    crearTabla();
                }
            });
        });
    });

    $("#boton2").click(function () { // Se ejecuta cuando se hace clic en el botón con id "boton2"
        $(".planta img").stop(true, false); // Detiene la animación actual de las plantas
        $(".planta img").animate({ marginTop: "530px" }, 2000); // Anima las plantas para que vuelvan a la posición inicial

        $("#boton2").hide(); // Oculta el botón con id "boton2"
        $("#boton1").show(); // Muestra el botón con id "boton1"

        ordenLlegada = []; // Reinicia el orden de llegada
        $("#tabla").empty(); // Vacía el contenido del elemento con id "tabla"
        $("#tabla").css("visibility", "hidden"); // Oculta el contenedor de la tabla
    });
});
