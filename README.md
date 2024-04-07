# chserver
Challenge 1 - Cuarta entrega curso BackEnd:
Se configura servidor express y enrutador y rutas especificas para usuarios y productos.
Se crea metodo update y se configuran respuestas json para la configuración del API REST.
Se maneja errores con errorHandler y pathHandler
Se realizan pruebas con postman para cada método que adicionalmente a los anteriores se incluye el método update.


Tercer entrega curso BackEnd Se crea un servidor express, se configura y se crean las rutas para:
Leer todos los Pruductos y Usuarios
Leer un producto y/o usuario por ID
Leer un producto y/o usuario por categoria y rol respectivamente
Crear un producto y/o usuario
Filtrar productos y/o usuarios por categoria y rol respectivamente
Se manejan los errores para cuando no hay productos y/o usuarios, y para cuando no existe la cateogoría o el rol respectivamente.
Se dejan comentarios para separar cada seccion en el server (Usuarios y Productos)

Segunda Entrega curso BackEnd
A las clases ProductManager y UserManager se agregan los métodos readOne y destroy, para leer un item o eliminarlo respectivamente. Se crean 4 usuarios y 10 productos en memoria.
Se crean las mismas clases con los mismos métodos pero utilizando persistencia con FileSystem
Se dejan comentarios para poder probar cada método.




Primer Entrega curso BackEnd
<<<<<<< HEAD

Se crean 2 clases: 
  - ProductManager para gestionar un conjunto de productos.
  - UserManager para gestionar un conjunto de usuarios.
Cada una posee los metodos Create y Read para crear y leer cada producto o usarios respectivamente.
Cada gestor se programa con un verificador que no permite crear un item si no posee todas las propiedades requeridas, y se utiliza un aviso por consola para advertir la falta de un dato, también se utiliza un aviso por consola en caso de que el item haya sido creado exitosamente.
=======
Se crean 2 clases: ProductManager y UserManager, para generar arreglos de objetos con productos y usuarios respectivamente.
>>>>>>> 8b0fdf013c32e7622fee5930e5101213149b808b
