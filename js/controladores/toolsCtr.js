;(function( Tools, $, undefined ){

	/*****************************************************************************************************
	 * Funcion para mostrar mensajes
	 */
	Tools.mostrarMensajes = function(msg, tiempo, action){
		new $.nd2Toast({
			message : msg,
			action : action,
			ttl : tiempo
		});

	}

	/*****************************************************************************************************
	 * Funcion para mostrar mensaje con loading
	 */
	Tools.showLoading = function(msg){
		$.mobile.loading( 'show', {
			text: msg,
			textVisible: true,
			theme: 'b',
			textonly: false,
		});
	};

	/*****************************************************************************************************
	 * Funcion para ocultar loading...
	 */
	Tools.hideLoading = function(){
		$.mobile.loading( "hide" );
	};

	/*****************************************************************************************************
	 * Funcion para mostrar mensaje de confirmacion
	 */
	Tools.showConfirm = function(msg, callback_app) {
		navigator.notification.confirm(
			msg,
			callback_app,
			'Salir',
			'Cancelar,OK'
		);
	};

	/*****************************************************************************************************
	 * Funcion para obtener la fecha actual
	 */
	Tools.getDate = function(){
		var currentTime = new Date();
		var seconds = currentTime.getSeconds();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();

		return month+"/"+day+"/"+year+" "+hours +":"+minutes +":"+seconds ;
	};

	/*****************************************************************************************************
	 * Funcion para obtener la fecha actual
	 */
	Tools.getOnlyDate = function(){
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();

		return month+"/"+day+"/"+year;
	};

	/*****************************************************************************************************
	 * Funcion para validar que un valor no este vacio
	 */
	Tools.noEstaVacio = function(valor){
		if(valor != "" && valor != undefined && valor != "null" ){
			return true;
		}else{
			return	false;
		}
	};

	/*****************************************************************************************************
	 * Funcion para validar que un valor sea solo texto
	 */
	Tools.esTexto = function(valor){	
		valor = valor.replace(" ", "");
		var formato = new RegExp(/^([a-zA-ZñÑáéíóúÁÉÍÓÚ]+)$/);
  		return formato.test(valor);
	}

	/*****************************************************************************************************
	 * Funcion para validar que un valor sea solo numeros
	 */
	Tools.esNumero = function(valor){	
		var formato = new RegExp(/^([0-9]+)$/);
  		return formato.test(valor);
	}

	/*****************************************************************************************************
	 * Funcion para validar que un valor sea solo decimales
	 */
	Tools.esDecimal = function(valor){
		if(!isNaN(parseFloat(valor))){
		   return true;
		}else{
			return false;
		}
	}

	/*****************************************************************************************************
	 * Funcion para validar que un valor sea un email
	 */
	Tools.esEmail = function(valor){	
		var formato = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
  		return formato.test(valor);
	}

	/*****************************************************************************************************
	 * Funcion para validar que dos valores sean iguales
	 */
	Tools.sonIguales = function(valor_1, valor_2){
		if(valor_1 == valor_2){
			return true;
		}else{
			return	false;
		}
	}

}( window.Tools = window.Tools || {}, jQuery ));