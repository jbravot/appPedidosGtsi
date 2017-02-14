;(function( Pedido, $, undefined ) {

	/*****************************************************************************************************
	 * Agregar Pedido a la base de datos
	*/
	Pedido.nuevo = function(pedido,callback_app){
		Database.db.transaction(
			function(tx){
				tx.executeSql('INSERT INTO pedido (cliente, producto, subtotal, cantidad, total, estado, fecha_creacion) '+
					'VALUES(?,?,?,?,?,?,?);',[
					pedido.cliente,
					pedido.producto,
					pedido.subtotal,
					pedido.cantidad,
					pedido.total,
					pedido.estado,
					pedido.fecha_creacion]
				);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * elimiar Pedido a la base de datos
	*/
	Pedido.eliminar = function(pedido_id,callback_app){
		Database.db.transaction(
			function(tx){
				tx.executeSql('DELETE FROM pedido WHERE id=?;',[pedido_id]
				);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * cargar lista de Pedidos de la base de datos
	*/
	Pedido.getPedidos = function(callback_app){
		//Validacion interna
		Database.db.transaction(
			function(tx) {
				tx.executeSql('SELECT * FROM pedido WHERE 1 ORDER BY producto DESC',
					[],
					function(tx, result)
					{
						var pedidos = [];
						for (var i=0; i < result.rows.length; i++){
							var row = result.rows.item(i);
							var pedido = {
								'id': row['id'],
								'cliente': row['cliente'],
								'producto': row['producto'],
								'subtotal': row['subtotal'],
								'cantidad': row['cantidad'],
								'total': row['total'],
								'fecha_creacion': row['fecha_creacion'],
							};
							pedidos.push(pedido);
						}
						window.localStorage.setItem("pedidos",  JSON.stringify(pedidos));
					},
					Database.errorCB);
			},
			Database.errorCB, callback_app
		);
	};

}( window.Pedido = window.Pedido || {}, jQuery ));