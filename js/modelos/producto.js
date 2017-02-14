;(function( Producto, $, undefined ) {

	/*****************************************************************************************************
	 * Agregar Producto a la base de datos
	*/
	Producto.nuevo = function(producto,callback_app){
		Database.db.transaction(
			function(tx){
				tx.executeSql('INSERT INTO producto (nombre, precio, imagen, fecha_creacion) '+
					'VALUES(?,?,?,?);',[
					producto.nombre,
					producto.precio,
					producto.imagen,
					producto.fecha_creacion]
				);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * elimiar Producto a la base de datos
	*/
	Producto.eliminar = function(producto_id,callback_app){
		Database.db.transaction(
			function(tx){
				tx.executeSql('DELETE FROM producto WHERE id=?;',[producto_id]
				);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * cargar lista de Productos de la base de datos
	*/
	Producto.getProductos = function(callback_app){
		//Validacion interna
		Database.db.transaction(
			function(tx) {
				tx.executeSql('SELECT * FROM producto WHERE 1 ORDER BY nombre DESC',
					[],
					function(tx, result)
					{
						var productos = [];
						for (var i=0; i < result.rows.length; i++){
							var row = result.rows.item(i);
							var producto = {
								'id': row['id'],
								'nombre': row['nombre'],
								'precio': row['precio'],
								'imagen': row['imagen'],
								'fecha_creacion': row['fecha_creacion'],
							};
							productos.push(producto);
						}
						window.localStorage.setItem("productos",  JSON.stringify(productos));
					},
					Database.errorCB);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * cargar detalle del Producto de la base de datos
	*/
	Producto.getProducto = function(producto_id, callback_app){
		//Validacion interna
		Database.db.transaction(
			function(tx) {
				tx.executeSql('SELECT p.* FROM producto as p,WHERE p.id=? ORDER BY p.nombre DESC LIMIT 1',
					[Producto_id],
					function(tx, result)
					{
						for (var i=0; i < result.rows.length; i++){
							var row = result.rows.item(i);
							var producto = {
								'id': row['id'],
								'nombre': row['nombre'],
								'precio': row['precio'],
								'imagen': row['imagen'],
								'fecha_creacion': row['fecha_creacion'],
							};
							window.localStorage.setItem("producto",  JSON.stringify(producto));
						}
						
					},
					Database.errorCB);
			},
			Database.errorCB, callback_app
		);
	};

	/*****************************************************************************************************
	 * Editar Producto a la base de datos
	*/
	Producto.editar = function(producto,callback_app){
		Database.db.transaction(
			function(tx){
				tx.executeSql('UPDATE producto SET nombre=?, precio=?, imagen=? WHERE id=?;',
					[
					producto.nombre,
					producto.precio,
					producto.imagen,
					producto.id]
				);
			},
			Database.errorCB, callback_app
		);
	};

}( window.Producto = window.Producto || {}, jQuery ));