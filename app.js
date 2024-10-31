/* Este código realiza operaciones básicas de creación, lectura, actualización y eliminación (CRUD) en una base de datos
MongoDB utilizando Mongoose, con la definición de un esquema */


// Importa el módulo de Mongoose, que permite interactuar con MongoDB desde Node.js
const mongoose = require('mongoose');

// Establece la conexión a MongoDB usando una URL de conexión.
// `mongoose.connect` devuelve una promesa, que maneja una conexión exitosa o un error.
mongoose.connect('mongodb+srv://grupo-02:grupo02@cursadanodejs.ls9ii.mongodb.net/Node-js')
    .then(() => console.log('Conexión exitosa a MongoDB')) // Muestra un mensaje si la conexión es exitosa.
    .catch(error => console.error('Error al conectar a MongoDB:', error)); // Muestra un error si la conexión falla.

    const superheroSchema = new mongoose.Schema({
        nombreSuperHeroe: { type: String, required: true }, // Nombre del superhéroe, requerido y tipo String.
        nombreReal: { type: String, required: true }, // Nombre real, requerido y tipo String.
        edad: { type: Number, min: 0 }, // Edad como número, con un valor mínimo de 0.
        planetaOrigen: { type: String, default: 'Desconocido' }, // Origen, tipo String, valor predeterminado "Desconocido".
        debilidad: String, // Debilidad del superhéroe, tipo String.
        poderes: [String], // Lista de poderes, cada uno como tipo String.
        aliados: [String], // Lista de aliados, cada uno como tipo String.
        enemigos: [String], // Lista de enemigos, cada uno como tipo String.
        createdAt: { type: Date, default: Date.now }, // Fecha de creación, con valor predeterminado la fecha actual.
        creador: { type: String, default: 'Isabel'}
    }, { collection: 'Grupo-02' }); // Establece el nombre de la colección en MongoDB como "Grupo-02".
    

// Crea un modelo llamado "Superhero" basado en el esquema definido.
// Este modelo representa la colección y permite realizar operaciones CRUD.
const Superhero = mongoose.model('Superhero', superheroSchema);

// Función asíncrona para insertar un nuevo superhéroe en la base de datos.
async function insertSuperHero() {
    // Crea una instancia de Superhero con los datos de un superhéroe.
    const hero = new Superhero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
      
    });

    await hero.save(); // Guarda el superhéroe en la base de datos.
    console.log('Superhéroe insertado:', hero); // Muestra un mensaje con el héroe insertado.
}

// Función asíncrona para actualizar la edad de un superhéroe.
async function updateSuperHero(nombreSuperHeroe) {
    const result = await Superhero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe }, // Encuentra el superhéroe por su nombre.
        { $set: { edad: 26 } } // Actualiza el campo "edad" a 26.
    );
    console.log('Resultado de la actualización:', result); // Muestra el resultado de la operación.
}

// Función asíncrona para eliminar un superhéroe de la base de datos.
async function deleteSuperHero(nombreSuperHeroe) {
    const result = await Superhero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe }); // Borra el superhéroe por nombre.
    console.log('Superhéroe eliminado:', result); // Muestra el resultado de la eliminación.
}

// Función asíncrona para buscar superhéroes que tengan como origen "Tierra".
async function findSuperHeroes() {
    const heroes = await Superhero.find({ planetaOrigen: 'Tierra' }); // Encuentra superhéroes de la Tierra.
    console.log('Superhéroes de la Tierra:', heroes); // Muestra la lista de superhéroes encontrados.
}

// Llamadas a las funciones CRUD
insertSuperHero(); // Inserta un superhéroe.
updateSuperHero('Spiderman'); // Actualiza el superhéroe llamado "Spiderman".
deleteSuperHero('Spiderman'); // Elimina al superhéroe llamado "Spiderman".
findSuperHeroes(); // Busca y muestra superhéroes con planeta de origen "Tierra".



