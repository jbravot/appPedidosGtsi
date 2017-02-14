/**
 * app.js
 *
 * @version 1.0
 * @author 
 * @requires jQuery
 * @see http://
 *
 * Proyecto de graduacion
 */
;(function( App, $, undefined ){

    /*****************************************************************************************************
     * Funcion que revisa si esta creada la base de datos SQLlite
     */
    App.checkCrearDb = function(){
   		//Database.deleteDb();
        Database.crearDb();
    };

    /*****************************************************************************************************
     * Funcion que valida los datos del formulario para crear usuarios
     */
    App.iniciarFormularioPedido = function(){
        $.mobile.changePage("#nuevo-pedido");
        Tools.showLoading("Cargando datos...");
        ClienteCtr.cargarCombo(ProductoCtr.cargarCombo);
    };


    /*****************************************************************************************************
     * Funcion que valida los datos del formulario para crear usuarios
     */
    App.addCliente = function(){
        if(ClienteCtr.validarFormulario()){
            ClienteCtr.nuevo(function(){
                $.mobile.changePage("#clientes");
                App.cargarClientes();
                Tools.mostrarMensajes("Cliente agregado.", 3000, {});
            });
        }
    };

    /*****************************************************************************************************
     * Funcion que valida los datos del formulario para crear usuarios
     */
    App.addProducto = function(){
        if(ProductoCtr.validarFormulario()){
            ProductoCtr.nuevo(function(){
                $.mobile.changePage("#productos");
                App.cargarProductos();
                Tools.mostrarMensajes("Producto agregado.", 3000, {});
            });
        }
    };

    /*****************************************************************************************************
     * Funcion que valida los datos del formulario para crear usuarios
     */
    App.addPedido = function(){
        if(PedidoCtr.validarFormulario()){
            PedidoCtr.nuevo(function(){
                $.mobile.changePage("#home");
                App.cargarPedidos();
                Tools.mostrarMensajes("Pedido agregado.", 3000, {});
            });
        }
    };

    /*****************************************************************************************************
     * Funcion que muestra el listado de clientes
     */
    App.cargarClientes = function(){
        Tools.showLoading("Cargando clientes...");
        ClienteCtr.cargarListado();
    };

    /*****************************************************************************************************
     * Funcion que muestra el listado de productos
     */
    App.cargarProductos = function(){
        Tools.showLoading("Cargando productos...");
        ProductoCtr.cargarListado();
    };

    /*****************************************************************************************************
     * Funcion que muestra el listado de productos
     */
    App.cargarPedidos = function(){
        Tools.showLoading("Cargando pedido...");
        PedidoCtr.cargarListado();
    };

}( window.App = window.App || {}, jQuery ));


function init() {

	/*$.mobile.defaultPageTransition   = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.buttonMarkup.hoverDelay = 0;*/

	FastClick.attach(document.body);
	App.checkCrearDb();

    $.mobile.changePage("#home");
    App.cargarPedidos();

    $(document).on( "tap", ".ir_pedidos", function(event) {
        event.preventDefault();
        $.mobile.changePage("#home");
        App.cargarPedidos();
        return false;
    });

    $(document).on( "tap", ".ir_productos", function(event) {
        event.preventDefault();
        $.mobile.changePage("#productos");
        App.cargarProductos();
        return false;
    });

    $(document).on( "tap", ".ir_clientes", function(event) {
        event.preventDefault();
        $.mobile.changePage("#clientes");
        App.cargarClientes();
        return false;
    });

    $(document).on( "tap", "#guardar-cliente-btn", function(event) {
        event.preventDefault();
        App.addCliente();
        return false;
    });

    $(document).on( "tap", "#guardar-prod-btn", function(event) {
        event.preventDefault();
        App.addProducto();
        return false;
    });

    $(document).on( "tap", "#nuevo-pedido-btn", function(event) {
        event.preventDefault();
        App.iniciarFormularioPedido();
        return false;
    });

    $(document).on( "tap", "#guardar-ped-btn", function(event) {
        event.preventDefault();
        App.addPedido();
        return false;
    });

}		