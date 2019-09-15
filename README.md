# Countries MongoDB
Back-end desarrollado con node.js, MongoDB y express. Para correr la aplicación, ingresar al directorio y ejecutar el comando "node index.js". Abrir el browser deseado y entrar a la URL "localhost:8080/countries". Para ejecutar pruebas con PostMan:
- Importar la coleccion "MongoDB Countries.postman_collection.json" con las pruebas a PostMan.
- Ejecutar el proyecto con el comando "node index.js" y probar cn PostMan el CRUD.


Se soportan todas las operaciones CRUD para las siguientes URLs:

- GET localhost:8080/countries: obtiene la lista de todos los países
- GET localhost:8080/countries/Albania: obtiene los detalles de Albania
- POST localhost:8080/countries: crea un nuevo país con los valores recibidos en el cuerpo de la petición
{
"country":"Genovia",
"population":9923,
"continent":"Europa",
"lifeExpectancy":43.8,
"purchasingPower":974.58
}
- PUT localhost:8080/countries/Albania: actualiza los datos de Albania con los valores recibidos en el cuerpo de la petición
{
"population":3600200,
"continent":"Europa",
"lifeExpectancy":70.8,
"purchasingPower":5937.58
}
- DELETE localhost:8080/countries/Albania: borra el documento que representa a Albania
