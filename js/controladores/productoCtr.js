;(function( ProductoCtr, $, undefined ){

	/*****************************************************************************************************
	 * Funcion que inicia los valores del formulario para crear usuarios
	 */
	ProductoCtr.iniciarFormulario = function(){
		$("#nuevo-producto #user-nombre").val("");
	};

	/*****************************************************************************************************
	 * Funcion que crea un nuevo usuario
	 */
	ProductoCtr.nuevo = function(callback_app){
		var prod = {
			'nombre': $("#nuevo-producto #prod-nombre").val(),
			'precio': $("#nuevo-producto #prod-precio").val(),
			'imagen': '',
        	'fecha_creacion': Tools.getDate(),
		};
		Producto.nuevo(prod,callback_app);
	};

	/*****************************************************************************************************
	 * Funcion que valida los campos del formulario para crear usuarios
	 */
	ProductoCtr.validarFormulario = function(){
		if( Tools.noEstaVacio($("#nuevo-producto #prod-nombre").val()) ){
			if( Tools.noEstaVacio($("#nuevo-producto #prod-precio").val()) ){
				return true;
			}else{
				Tools.mostrarMensajes("El campo Precio no puede estar vacio.", 3000, {});
				return false;
			}
		}else{
			Tools.mostrarMensajes("El campo Nombre no puede estar vacio.", 3000, {});
			return false;
		}
	};

	/*****************************************************************************************************
	 * cargar lista de Pacientes de la base de datos
	*/
	ProductoCtr.cargarListado = function(callback_app){
		Producto.getProductos(function (){
			var productos = JSON.parse(window.localStorage.getItem("productos"));
			$("#productos-lista").html("");
			var html_li = "";

			$.each(productos, function (i, producto) {
				html_li += '<li>'+
					'<a href="#">'+
						'<img src="img/paciente/0.png" class="ui-thumbnail ui-thumbnail-circular" />'+
						'<h2>'+producto.nombre+'</h2>'+
						'<p><i class="fa fa-dollar"></i> '+producto.precio+'</p>'+
					'</a>'
				'</li>';
			});

			$("#productos-lista").html(html_li);
			$("#productos-lista").listview("refresh");
			Tools.hideLoading();
		});
	};

	/*****************************************************************************************************
	 * cargar lista de Pacientes de la base de datos
	*/
	ProductoCtr.cargarCombo = function(callback_app){
		Producto.getProductos(function (){
			var productos = JSON.parse(window.localStorage.getItem("productos"));
			$("#ped-producto").html("");
			var html_li = "<option value=''>-----------</option>";

			$.each(productos, function (i, producto) {
				html_li += '<option value="'+producto.nombre+'|'+producto.precio+'">'+producto.nombre+'</option>';
			});

			$("#ped-producto").html(html_li);
			Tools.hideLoading();
		});
	}

}( window.ProductoCtr = window.ProductoCtr || {}, jQuery ));