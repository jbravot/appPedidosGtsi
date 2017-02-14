;(function( Cliente, $, undefined ) {

	/*****************************************************************************************************
	 * Agregar Cliente a la base de datos
	*/
	Cliente.nuevo = function(cliente,callback_app){
		Database.db.transaction(
			function(tx){
				tx.executeSql('INSERT INTO cliente (nombre, fecha_creacion) '+
					'VALUES(?,?);',[
					cliente.nombre,
					cliente.fecha_creacion]
				);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * cargar lista de Productos de la base de datos
	*/
	Cliente.getClientes = function(callback_app){
		//Validacion interna
		Database.db.transaction(
			function(tx) {
				tx.executeSql('SELECT * FROM cliente WHERE 1 ORDER BY nombre DESC',
					[],
					function(tx, result)
					{
						var clientes = [];
						for (var i=0; i < result.rows.length; i++){
							var row = result.rows.item(i);
							var cliente = {
								'id': row['id'],
								'nombre': row['nombre'],
								'fecha_creacion': row['fecha_creacion'],
							};
							clientes.push(cliente);
						}
						window.localStorage.setItem("clientes",  JSON.stringify(clientes));
					},
					Database.errorCB);
			},
			Database.errorCB, callback_app
		);
	};

}( window.Cliente = window.Cliente || {}, jQuery ));