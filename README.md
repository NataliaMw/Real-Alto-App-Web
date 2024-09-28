## Instrucciones para descargar y ejecutar el proyecto

### Requisitos previos:

Este proyecto requiere un sistema operativo compatible con Node.js para ejecutarse. Los sistemas operativos compatibles son:
- **macOS Sonoma o versiones posteriores**
- **Windows 11**

Para ejecutar este proyecto en tu computadora local, es necesario que tengas instalado **Node.js** y **npm** (Node Package Manager).

#### Para macOS:

1. **Instalar Node.js con nvm (Node Version Manager)**:
    - Ve al sitio oficial de Node.js: [Descargar Node.js](https://nodejs.org/en/download/package-manager) y selecciona la versión 20.17.0.
   - Abre la Terminal.
   - Descarga e instala `nvm` (gestor de versiones de Node.js) ejecutando este comando:
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
     ```
   - Cierra y vuelve a abrir la Terminal, o bien ejecuta el siguiente comando para recargar el perfil:
     ```bash
     source ~/.bashrc
     ```
   - Instala la versión recomendada de Node.js:
     ```bash
     nvm install 20
     ```
   - Verifica la instalación:
     ```bash
     node -v
     npm -v
     ```
     Deberías ver algo similar a:
     ```
     v20.17.0
     10.8.2
     ```

#### Para Windows 11:

1. **Instalar Node.js con fnm (Fast Node Manager)**:
    - Ve al sitio oficial de Node.js: [Descargar Node.js](https://nodejs.org/en/download/package-manager) y selecciona la versión 20.17.0.
   - Abre PowerShell con privilegios de administrador.
   - Ejecuta el siguiente comando para instalar `fnm` (gestor de versiones de Node.js):
     ```bash
     winget install Schniz.fnm
     ```
   - Configura el entorno de `fnm` con:
     ```bash
     fnm env --use-on-cd | Out-String | Invoke-Expression
     ```
   - Instala la versión recomendada de Node.js:
     ```bash
     fnm use --install-if-missing 20
     ```
   - Verifica la instalación:
     ```bash
     node -v
     npm -v
     ```
     Deberías ver algo como:
     ```
     v20.17.0
     10.8.2
     ```


### Descargar y ejecutar el proyecto:

1. **Descargar el proyecto**:
   - Ve al repositorio del proyecto en GitHub: [Real-Alto-App-Web](https://github.com/damm2001/Real-Alto-App-Web).
   - En la página principal del repositorio, busca el botón que dice "Code" en verde.
   - Haz clic en el botón "Code". Se desplegará un menú con varias opciones.
   - Selecciona la opción **Download ZIP**. Esto descargará el proyecto como un archivo comprimido en formato ZIP en tu computadora.
   - Una vez descargado el archivo ZIP, ve a la carpeta donde se guardó y descomprímelo. Si estás en Windows, puedes hacer clic derecho sobre el archivo y seleccionar "Extraer todo". En macOS, simplemente haz doble clic sobre el archivo ZIP para descomprimirlo.

2. **Instalar dependencias**:
   - Abre una terminal (en Windows puedes usar PowerShell o cmd, y en macOS puedes usar la Terminal).
   - Navega a la carpeta del proyecto que acabas de descomprimir usando el comando `cd` (cambia de directorio). Por ejemplo:
     ```bash
     cd /ruta/del/proyecto
     ```
   - Una vez que estés dentro de la carpeta del proyecto, ejecuta el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install
     ```

3. **Ejecutar el servidor de desarrollo**:
   - Para iniciar el servidor en modo de desarrollo, ejecuta el siguiente comando:
     ```bash
     npm run dev
     ```

4. **Abrir la aplicación**:
   - Una vez iniciado el servidor, abre tu navegador y accede a:
     ```
     http://localhost:3000
     ```
   - Podrás ver la aplicación ejecutándose en tu entorno local.

## Aprende más sobre Next.js

Para obtener más información sobre Next.js, puedes consultar los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - Aprende sobre las características y API de Next.js.
- [Tutorial interactivo de Next.js](https://nextjs.org/learn) - Aprende Next.js de manera interactiva.

También puedes visitar el [repositorio de GitHub de Next.js](https://github.com/vercel/next.js/), donde se agradecen tus comentarios y contribuciones.

