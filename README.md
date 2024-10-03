# backend-focus-up

# Primer Parcial 2024 - Arquitectura Orientada a Servicios

## Descripción

Este es un servicio de **API REST** desarrollado como parte del primer parcial de la asignatura Arquitectura Orientada a Servicios (SOA). Fue construido con **Node.js**, **Express** y **MongoDB**. 

La API permite obtener y almacenar información sobre objetivos de los usuarios, siempre que el usuario esté autenticado. Se utiliza una base de datos MongoDB para gestionar los datos, y las principales características de la API incluyen:

- Autorización mediante Basic Auth
- Validación de parámetros de entrada
- Manejador de errores

## Instalación

### Clonar el repositorio:

```bash
git clone https://github.com/Cromero100/bakend-focus-up.git
cd clase
```
### Instalacion Manual:

```bash
npm install
```
## Tabla de contenido

- [Caracteristicas](#Caracteristicas)
- [Comandos](#Comandos)
- [Variables de Entorno](#Variables-de-Entorno)
- [Estructura del Proyecto](#Estructura-del-Proyecto)
- [API Endpoints](#API-Endpoints)


## Característica
- Node js
- NPM
- checkSchema
- Mongoose

## Comandos
Run Local:
```
    npm run dev
```
Run Producción:
```
    npm run start
```

## Variables de Entorno
```
###> CONFIG SERVER <####
PORT=8000
URL_SERVER=http:\\127.0.0.1:8000\
###> CONFIG SERVER <####

###> DB_CONNECTION ### 
DB_URL=mongodb://localhost:27017/focus
###< CONFIGURE SERVER ###

###> JWT_HASH ###
JWT_HASH =password2024-250A
###< SECRET_KEY ###
```
## Estructura del Proyecto

```
src\
 |--config\         # Variables de entorno y configuración 
 |--controllers\    # Controladores 
 |--middlewares\    # Middleware Personalizados
 |--models\         # MongoDB models (data layer) 
 |--routers\         # Rutas del sistema
 |--services\       # Servicios de conexión BD y Token 
 |--validator\      # Esquemas de validación
 |--index.js        # Express app
```

## API Endpoints
<code>POST /auth/login</code>
- **body:** 
    - **correo**:  requerido
    - **contraseña**: requerido
- Response
    -**success:** boolean   
    - **msg :** string
    - **data :** json(Informacion del usuario o token)

<code>POST /auth/registro</code>
- Request
    - **body**
      - **primerNombre**: String, requerido
      - **segundoNombre**: String, opcional
      - **primerApellido**:  String, requerido
      - **segundoApellido**: String, opcional
      - **sexo**: String, requerido  (debe ser "M" o "F")
      - **correo**:  String, requerido, úinco
      - **contraseña**: String, requerido (debe tener mínimo 6 caracteres, al menos una letra mayúscula, una minúscula y un número)
      - **fechaNacimiento**: String,requerido (formato YYYY-MM-DD, fecha anterior a la actual)


        
        
- Response
    - **success:** boolean   
    - **msg :** string
    - **data :** json (información del nuevo usuario)
 

<code>GET /api/objetivos/:id</code> 
- Request
    - **params:**
        - **id**: requerido (debe ser un ID válido de MongoDB)
- Response
    - **success :** boolean
    - **msg :** string
    - **data :** json
 
  <code>POST /api/objetivos</code>
- Request
    - **body:**
        - **nombre** :  String, requerido
        - **usuarioId**: String, requerido, tipo id mongo
        - **descripcion** : String, opcional
        - **fechaFinalizacion** : String, opcional (formato YYYY-MM-DD, fecha posterior a la actual)
        - **prioridad** : String, opcional (puede ser "Alta", "Media", "Baja", por defecto es Mediana)
        - **categoria** : String, opcional (ej. "Personal", "Profesional", "Otra", por defecto es Personal)
        - **Subobjetivos**:
        - **Subobjetivos.nombre**: requerido, string
        - **Subobjetivo.descripción**: requerido, string
        - **Subobjetivo.completado**: Por defecto false, solo se puede cambiar el estado al acceder al endpoint de modificar objetivo
- Response
    - **success :** boolean
    - **data :** json
    - **msg :** string 

<code>PUT /api/objetivos/:id</code>
- Request
    - **body**
        - **nombre** :  String, requerido
        - **usuarioId**: String, requerido, tipo id mongo
        - **descripcion** : String, opcional
        - **fechaFinalizacion** : String, opcional (formato YYYY-MM-DD, fecha posterior a la actual)
        - **prioridad** : String, opcional (puede ser "Alta", "Media", "Baja", por defecto es Mediana)
        - **categoria** : String, opcional (ej. "Personal", "Profesional", "Otra", por defecto es Personal)
        - **Subobjetivos**:
        - **Subobjetivos.nombre**: requerido, string
        - **Subobjetivo.descripción**: requerido, string
        - **Subobjetivo.completado**: Por defecto false, solo se puede cambiar el estado al acceder al endpoint         de modificar objetivo
- Response
    - **success :** boolean
    - **data :** json
    - **msg :** string 

<code>DELETE /api/objetivos/:id</code> 
- Request
    - **params:**
        - **id** : requerido, tipo mongo
- Response
    - **data :** array
    - **msg :** string 
    - **success :** boolean

