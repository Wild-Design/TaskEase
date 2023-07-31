<!-- ------------------------------------------------------------- -->

GET: http://localhost:3001/user (Get de todos los usuarios)

<!-- ------------------------------------------------------------- -->

POST: http://localhost:3001/user/register (Registrar usuario)
Nececita por body el objeto con estos campos obligatórios:
{user_name:(string), password:(string), email:(string)}

<!-- ------------------------------------------------------------- -->

GET: http://localhost:3001/user/login (Loguear usuario, si el usuario se loguea correctamente, se le envia todas sus Listas y tareas)
Nececita por body el objeto con estos campos obligatorios:
{user_name: (string), password: (string) }

<!-- ------------------------------------------------------------- -->

POST: http://localhost:3001/list/:listName (Crea nueva lista, recive por params
el nombre de la lista deseada y también recive por body los campos obligatorios
{ UserId: (string), user_name: (string), password: (string) })

<!-- ------------------------------------------------------------- -->

DELETE: http://localhost:3001/list/:listId (Borra la lista seleccionada y todas las tareas pertenecientes a esa lista): datos obligatorio: id de la lista por params, y por body {user_name,password}

<!-- ------------------------------------------------------------- -->

POST: http://localhost:3001/task (Crea nueva taea, resive por body los campos obligatorios { ListId: (string), user_name (string), password: (string), description: (string) })
