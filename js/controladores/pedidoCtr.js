;(function( PedidoCtr, $, undefined ){

	/*****************************************************************************************************
	 * Funcion que crea un nuevo usuario
	 */
	PedidoCtr.nuevo = function(callback_app){
		var producto = $("#nuevo-pedido #ped-producto").val().split("|");
		var ped = {
			'cliente': $("#nuevo-pedido #ped-cliente").val(),
			'producto': producto[0],
			'subtotal': producto[1],
			'cantidad': 1,
			'total': producto[1],
			'estado': true,
        	'fecha_creacion': Tools.getOnlyDate(),
		};
		Pedido.nuevo(ped,callback_app);
	};

	/*****************************************************************************************************
	 * Funcion que valida los campos del formulario para crear usuarios
	 */
	PedidoCtr.validarFormulario = function(){
		if( Tools.noEstaVacio($("#nuevo-pedido #ped-cliente").val()) ){
			if( Tools.noEstaVacio($("#nuevo-pedido #ped-producto").val()) ){
				return true;
			}else{
				Tools.mostrarMensajes("El campo Producto no puede estar vacio.", 3000, {});
				return false;
			}
		}else{
			Tools.mostrarMensajes("El campo Cliente no puede estar vacio.", 3000, {});
			return false;
		}
	};

	/*****************************************************************************************************
	 * cargar lista de Pacientes de la base de datos
	*/
	PedidoCtr.cargarListado = function(callback_app){
		Pedido.getPedidos(function (){
			var pedidos = JSON.parse(window.localStorage.getItem("pedidos"));
			$("#pedidos-lista").html("");
			var html_li = "";
			var total = 0.0;

			$.each(pedidos, function (i, pedido) {
				html_li += '<li><a href="#">' +
							'<h2>'+pedido.producto+'</h2>'+
							'<p><i class="zmdi zmdi-account-box"></i> '+pedido.cliente+'</p></a>'+
							'<span class="ui-li-count">$ '+pedido.total+'</span></li>';
				total += pedido.total
			});

			$("#pedidos-lista").html(html_li);
			$("#pedidos-lista").listview("refresh");
			$("#home #ped-total").html("$ "+total);
			Tools.hideLoading();
		});
	}

}( window.PedidoCtr = window.PedidoCtr || {}, jQuery ));