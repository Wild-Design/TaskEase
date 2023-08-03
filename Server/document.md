<!-- ------------------------------------------------------------- -->

POST: /user/register (Registrar usuario)
Nececita por body el objeto con estos campos obligatórios:
{user_name:(string), password:(string), email:(string)}

<!-- ------------------------------------------------------------- -->

GET: /user/login/:userName/:password (Loguear usuario, si el usuario se loguea correctamente, se le envia todas sus Listas y tareas)
Nececita por params el nombre del usuario y el password.

<!-- ------------------------------------------------------------- -->

POST: list/:listName (Crea nueva lista, recive por params
el nombre de la lista deseada y también recive por body los campos obligatorios
{ UserId: (string), user_name: (string), password: (string) })

<!-- ------------------------------------------------------------- -->

POST: /task (Crea nueva taea, resive por body los campos obligatorios { ListId: (string), user_name (string), password: (string), description: (string) })

<!-- ------------------------------------------------------------- -->

DELETE: /list/:listId (Borra la lista seleccionada y todas las tareas pertenecientes a esa lista): datos obligatorio: id de la lista por params, y por body {user_name,password}

<!-- ------------------------------------------------------------- -->

DELETE: /task/:taskId (Bora una tarea), se nececita el id de la tarea por params y por body {user_name,password}

<!-- ------------------------------------------------------------- -->

PUT /list/:listId (actualiza el nombre de una lista): recive obligatoriamente por body {user_name,password,description} y por params el id de la lista

<!-- ------------------------------------------------------------- -->

PUT /task/:taskId (actualiza la descripción de una tarea) recive obligatoriamente por body{user_name,password,description} y por params el id de la tarea a actualizar
