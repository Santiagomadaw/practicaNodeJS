# API de Gestión de Anuncios

Esta API proporciona endpoints para gestionar anuncios, incluyendo la obtención de anuncios filtrados, la obtención de una lista de tags en los anuncios, la modificación, agregación y eliminación de anuncios en la base de datos.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando `npm install`.
3. Configura la conexión a tu base de datos MongoDB`.
4. Ejecuta el servidor con `npm run initDB` para inicializar la base de datos.

    **ATENCION: ESTE PROCESO BORRA LOS DATOS PREVIOS EN LA BASE DE DATOS.**

5. Para desarrollo ejecuta `npm run dev` para despliegue `npm run start`

## Uso

La API consta de los siguientes endpoints:
<details>
 <summary><code>GET</code> <code><b>/api/anuncios</b></code> <code>(Obtiene una lista de anuncios filtrados.)</code></summary>

### **`GET` /api/anuncios**
Obtiene una lista de anuncios filtrados según los parámetros proporcionados.

#### Parámetros de Consulta

- `min` Precio minimo buscado (numero).
- `max` Precio maximo buscado (numero).
- `prize` Precio exacto buscado (numero) Este parametro no es compatible con min y max.
- `sell` Tipo de anuncio  compra o venta (boolean).
- `tags` busquedad por tags (texto). Se puede usar varias veces (ej. ?tag=mobile&tag=work).
- `tittleStart` Busca anuncios que empiezan por un deteminado texto (texto).
- `tittle` Busca anuncios que contienen un deteminado texto (texto).

#### Paginaciòn

- `star` Primer articulo mostrado (numero).
- `step` Numero de articulos mostrados (numero).


#### Ejemplo

> ```
>  http://localhost:3000/api/anuncio/?tags=mobile&min=30&max=50
> ```

#### Resultado

>```json
>
>{"result":
>    [
>        {"_id":"65dcb51da6f87b5ddf91342f",
>        "name":"Teléfono móvil Nokia 3310",
>        "sell":false,
>        "price":50,
>       "photo":"nokia_3310.jpg",
>       "tags":["mobile","lifestyle"],
>        "__v":0},
>        {"_id":"65dcb51da6f87b5ddf91343b",
>        "name":"Teléfono móvil BlackBerry Curve 8520",
>        "sell":false,
>        "price":40,
>        "photo":"blackberry_curve_8520.jpg",
>        "tags":["mobile","work"],
>        "__v":0},
>        {"_id":"65dcb51da6f87b5ddf913440",
>        "name":"Teléfono móvil Sony Ericsson T10s",
>        "sell":false,"price":35,
>        "photo":"sony_ericsson_t10s.jpg",
>        "tags":["mobile","lifestyle"],
>        "__v":0}
>    ]
>}
>
>```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/anuncios/tags</b></code> <code>(Obtiene una lista de tags los anuncios.)</code></summary>

### **`GET` /api/anuncios/tags**

Obtiene una lista de tags incluidos en los anuncios.

#### Example

> ```
>  http://localhost:3000/api/anuncio/tags
> ```

#### Resultado

>```json
>    {"result":
>        [
>            "lifestyle",
>            "mobile",
>            "motor",
>            "work"
>        ]
>    }
>```

</details>

<details>
 <summary><code>PUT</code> <code><b>/api/anuncios/:id</b></code> <code>(Modifica un anuncio)</code></summary>

### **`PUT` /api/anuncios/:id**

Modifica un anuncio pasando el id como parametro

#### Example

> ```
>  http://localhost:3000/api/anuncio/65dd20908de6e1742cab1ac4
> ```
>![alt text](image.png)

#### Previo

>```json
>{
>    "result": {
>        "name": "Cámara clásica Nikon F1",
>        "sell": true,
>        "price": 21,
>        "photo": "nikonF1.jpg",
>        "tags": [
>            "lifestyle"
>        ],
>        "_id": "65dd20908de6e1742cab1ac4",
>        "__v": 0
>    }
>}
>```

#### Resultado

>```json
>{
>    "result": {
>        "_id": "65dd20908de6e1742cab1ac4",
>        "name": "Cámara clásica Nikon F1",
>        "sell": true,
>        "price": 200,
>        "photo": "nikonF1.jpg",
>        "tags": [
>            "lifestyle"
>        ],
>        "__v": 0
>    }
>}
>```

 </details>
<details>
 <summary><code>POST</code> <code><b>/api/anuncios/</b></code> <code>(Añade un nuevo anuncio)</code></summary>

### **`POST` /api/anuncios/**

Este endpoint añade un nuevo anuncio siguiendo el siguiente esquema.

### Schema

```javascript
Schema({
    name: {type:String,required:true},
    sell: {type:Boolean,required:true},
    price: {type:Number,required:true},
    photo: {type:String,required:true},
    tags: {type:[String],required:true},
});
```

#### Example

> ```
>  http://localhost:3000/api/anuncio/
> ```
>![alt text](image-1.png)

#### Resultado

>```json
>{
>    "result": {
>        "name": "Telefono Nokia 8100",
>        "sell": true,
>        "price": 1000,
>        "photo": "nokia_8100.jpg",
>        "tags": [
>            "mobile",
>            "lifestyle"
>        ],
>        "_id": "65dd3d984a5d35e0578c5afc",
>        "__v": 0
>    }
>}
>```

</details>
<details>
 <summary><code>DELETE</code> <code><b>/api/anuncios/:id</b></code> <code>(Elimina un anuncio)</code></summary>

### **`DELETE` /api/anuncios/:id**

Elimina un anuncio de la base de datos recibiendo por parametro el id del anuncio

#### Example

> ```
>  http://localhost:3000/api/anuncio/65dd20908de6e1742cab1ac4
> ```
>![alt text](image-2.png)
#### Resultado

> Este metodo no devuelve nada

</details>
