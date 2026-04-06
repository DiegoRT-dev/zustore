# Zustore

Una tienda online moderna construida con **Next.js 16, Prisma, PostgreSQL (Supabase) y Zustand**, con autenticación, carrito persistente y soporte dark mode.

## Demo 
Prueba la aplicación aquí:
https://zustore-y1tz.vercel.app/

## Características principales

- Catálogo de productos con filtro por búsqueda y categoría
- Detalle de producto
- Carrito de compras (persistente en localStorage)
- Autenticación (login / registro)
- Página de perfil con historial de compras
- Cambio de tema claro/oscuro (persistente)
- Mensajes de éxito/error (toasts)
- Loader global y estados de carga
- Responsive y mobile-first
- Dark mode completo

## Tecnologías utilizadas

- **Framework**: Next.js 16
- **Estilos**: Tailwind CSS + dark mode
- **Base de datos**: PostgreSQL (Supabase) + Prisma
- **Estado global**: Zustand + persist (localStorage)
- **Autenticación**: Formulario básico + API route
- **Imágenes**: Next/Image con optimización

## Deploy

La aplicación está desplegada usando:

- **Frontend:** Vercel
- **Base de datos:** Supabase (PostgreSQL)
- **ORM:** Prisma

## Instalación y ejecución local

1. Clona el repositorio

```bash
git clone https://github.com/DiegoRT-dev/zustore.git
cd zustore
```

2. Instala dependencias

```bash
npm install
# o
pnpm install
# o
yarn install
```

3. Configura la base de datos

Crea un archivo .env en la raíz del proyecto con:

```bash
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/zustore"
```

4. Genera y aplica la base de datos

```bash
npx prisma generate
npx prisma db push
```

5. (Opcional) Agrega datos de prueba

```bash
npx prisma studio   # abre el editor visual
# o ejecuta un seed si tienes uno
```

6. Ejecuta la aplicación

```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

## Capturas de pantalla

Página principal

![Pagina Principal](public/screenshots/home-light.png)

Página principal con cuenta

![Pagina Principal Cuenta](public/screenshots/home-dark-user.png)

Página del usuario

![Pagina Usuario](public/screenshots/user-page.png)

Filtro

![Filtro](public/screenshots/filter.png)

Busqueda

![Busqueda](public/screenshots/search.png)

Carrito

![Carrito](public/screenshots/cart.png)

## Estructura del proyecto

```bash
app/
├── api/               # Rutas API (auth, cart, purchases, user/update)
├── login/             # Página para inicio de sesión
├── products/          # Página de detalle de producto
├── purchases/         # Historial de compras (protegida)
├── settings/          # Configuración de usuario
├── signup/            # Página registro
├── user/              # Página del usuario
components/            # Componentes reutilizables (Header, Cart, UserModal, Footer, etc.)
lib/
├── store/             # Zustand slices (user, theme, ui, cart, purchases, etc.)
prisma/                # schema.prisma + migrations
public/                # Imágenes estáticas, placeholder.jpg
```

## Funcionalidades clave

- Tema claro/oscuro persistente
- Carrito con cantidades, eliminación y total
- Autenticación (login / registro)
- Perfil con logout y configuración
- Compras guardadas por usuario
- Validación de stock al finalizar compra
- Toasts para feedback (éxito, error, advertencia)

## Próximas mejoras / ideas

- Checkout real con pago simulado
- Panel de administración (agregar/editar productos)
- Búsqueda avanzada + paginación
- Favoritos / lista de deseos
- Notificaciones por email
- Imágenes de productos en carrito y compras

## Notas sobre la base de datos

- En producción (Vercel), se utiliza la conexión **pooler de Supabase (IPv4)** para evitar errores de red.
- Es importante incluir `?sslmode=require` en la variable `DATABASE_URL`.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una idea para mejorar la app, abre un issue o un pull request.

## Licencia

MIT License - siéntete libre de usar, modificar y compartir este proyecto.
Creado por DiegoRT-dev

¡Gracias por visitar!
