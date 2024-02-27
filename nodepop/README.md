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

### Obtener Anuncios Filtrados

GET /api/anuncios

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
