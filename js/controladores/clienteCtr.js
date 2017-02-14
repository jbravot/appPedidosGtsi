;(function( ClienteCtr, $, undefined ){

	/*****************************************************************************************************
	 * Funcion que inicia los valores del formulario para crear usuarios
	 */
	ClienteCtr.iniciarFormulario = function(){
		$("#nuevo-cliente #user-nombre").val("");
	};

	/*****************************************************************************************************
	 * Funcion que crea un nuevo usuario
	 */
	ClienteCtr.nuevo = function(callback_app){
		var usuario = {
			'nombre': $("#nuevo-cliente #user-nombre").val(),
        	'fecha_creacion': Tools.getDate(),
		};
		Cliente.nuevo(usuario,callback_app);
	};

	/*****************************************************************************************************
	 * Funcion que valida los campos del formulario para crear usuarios
	 */
	ClienteCtr.validarFormulario = function(){
		if( Tools.noEstaVacio($("#nuevo-cliente #user-nombre").val()) ){
			return true;
		}else{
			Tools.mostrarMensajes("El campo Nombre no puede estar vacio.", 3000, {});
			return false;
		}
	};

	/*****************************************************************************************************
	 * cargar lista de Pacientes de la base de datos
	*/
	ClienteCtr.cargarListado = function(callback_app){
		Cliente.getClientes(function (){
			var clientes = JSON.parse(window.localStorage.getItem("clientes"));
			$("#clientes-lista").html("");
			var html_li = "";

			$.each(clientes, function (i, cliente) {
				html_li += '<li>'+
					'<a href="#">'+
						'<h2>'+cliente.nombre+'</h2>'+
					'</a>'
				'</li>';
			});

			$("#clientes-lista").html(html_li);
			$("#clientes-lista").listview("refresh");
			Tools.hideLoading();
		});
	};

	/*****************************************************************************************************
	 * cargar lista de Pacientes de la base de datos
	*/
	ClienteCtr.cargarCombo = function(callback_app){
		Cliente.getClientes(function (){
			var clientes = JSON.parse(window.localStorage.getItem("clientes"));
			$("#ped-cliente").html("");
			var html_li = "<option value=''>-----------</option>";

			$.each(clientes, function (i, cliente) {
				html_li += '<option value="'+cliente.nombre+'">'+cliente.nombre+'</option>';
			});
			$("#ped-cliente").html(html_li);
			callback_app();
		});
	}

}( window.ClienteCtr = window.ClienteCtr || {}, jQuery ));