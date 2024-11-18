Para que la aplicación funcione correctamente, es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombreBaseDatos"
JWT_SECRET="TuClaveSecretaSuperSeguraParaJWT"

npm i -g bun
bun install
bun dev

