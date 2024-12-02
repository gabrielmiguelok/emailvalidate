
# Validación de Correos Electrónicos

Una aplicación web para la validación de correos electrónicos con soporte para la exportación de datos a Excel y CSV. La aplicación utiliza React (Next.js), Material UI para la interfaz, y bibliotecas como `validator` y `email-existence` para la validación de correos.

## Tabla de Contenidos
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Características

- Validación de sintaxis de correos electrónicos.
- Verificación de registros MX y existencia de correos mediante SMTP.
- Interfaz de usuario moderna basada en Material UI.
- Exportación de resultados a formatos Excel y CSV.
- Manejo de errores y logs detallados mediante Winston.
- Configuración optimizada para desarrollo con Next.js.

---

## Requisitos

Antes de comenzar, asegúrate de que tu sistema cumpla con los siguientes requisitos:

- Node.js v16.0.0 o superior
- npm o yarn
- Conexión a internet para descargar dependencias

---

## Instalación

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/gabrielmiguelok/emailvalidate.git
   cd nombre_del_repositorio
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env.local` en la raíz del proyecto con las configuraciones necesarias para el entorno.

---

## Uso

1. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

2. Abre tu navegador en `http://localhost:3000` para usar la aplicación.

---

## Comandos Disponibles

Estos son los comandos principales que puedes usar en este proyecto:

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera los archivos optimizados para producción.
- `npm start`: Inicia la aplicación en modo producción.
- `npm run lint`: Verifica el código siguiendo las reglas de ESLint.

---

## Estructura del Proyecto

El proyecto sigue una estructura modular y escalable. A continuación, se describen las carpetas principales:

- **`components/`**: Componentes reutilizables como `DataGridComponent`.
- **`hooks/`**: Hooks personalizados como `useExport`.
- **`pages/`**: Páginas de Next.js, incluyendo la API para la validación de correos.
- **`utils/`**: Funciones utilitarias como `ExportUtils`.

---

## Contribuciones

¡Contribuir es fácil y bienvenido! Sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores (`git checkout -b feature/nueva-funcionalidad`).
3. Haz un commit de tus cambios (`git commit -m "Añadir nueva funcionalidad"`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request en este repositorio.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
