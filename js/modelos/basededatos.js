;(function( Database, $, undefined ) {

	Database.db = window.openDatabase("pedidos_desayuno", "1.0", "Aplicacion Pedidos de Desayuno", 200000);

	Database.errorCB = function(err) {
		alert("Error processing SQL: "+err.message);
		$.mobile.loading( "hide" );
	};

	Database.successCB = function() {};

	/*****************************************************************************************************
	 * Funcion que crea la base de datos SQLlite
	 */
	Database.crearDb = function(){
		Database.db.transaction(
			function(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS cliente('+
					'id INTEGER PRIMARY KEY, '+
					'nombre Text,'+ 
					'fecha_creacion TEXT);'
				);

				tx.executeSql('CREATE TABLE IF NOT EXISTS producto('+
					'id INTEGER PRIMARY KEY, '+ 
					'nombre TEXT,'+  
					'precio REAL,'+  
					'imagen TEXT,'+  
					'fecha_creacion TEXT);'
				);

				tx.executeSql('CREATE TABLE IF NOT EXISTS pedido('+
					'id INTEGER PRIMARY KEY, '+ 
					'cliente TEXT,'+  
					'producto TEXT,'+ 
					'subtotal REAL,'+  
					'cantidad INTEGER,'+  
					'total REAL,'+  
					'estado BLOB,'+  
					'fecha_creacion TEXT);'
				);
			},
			Database.errorCB, Database.successCB
		);
	};

	/*****************************************************************************************************
	 * Funcion que crea la base de datos SQLlite
	 */
	Database.deleteDb = function() {
		Database.db.transaction(
			function(tx) {
				tx.executeSql("DROP TABLE IF EXISTS cliente");
				tx.executeSql("DROP TABLE IF EXISTS producto");
				tx.executeSql("DROP TABLE IF EXISTS pedido");
			},
			Database.errorCB, Database.successCB
		);
	};

}( window.Database = window.Database || {}, jQuery ));