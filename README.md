# 🖼️ Frontend - Rabotnik

**Rabotnik** es una aplicación web desarrollada con React y Vite, diseñada para gestionar de forma visual e intuitiva los datos de socios de la Asociación de Artes de Calle del País Vasco. Permite consultar, filtrar, crear, editar y eliminar socios, así como gestionar el estado de sus cuotas y su participación en la asociación.

---

## 🚀 Tecnologías usadas

* **Vite** + **React**
* **Tailwind CSS**
* **React Router v6** (`createBrowserRouter`, `RouterProvider`, `Outlet`)
* **React Context** para manejo global de estado
* **JWT** para autenticación (token generado por el backend)
* **Fetch API** para consumir el backend desplegado en Render

---

## 🧭 Enrutado

El sistema de rutas está construido con `createBrowserRouter` y tiene una estructura anidada. Por ejemplo:

* `/` → Home
* `/login` → Formulario de acceso
* `/register` → Registro de nuevos usuarios
* `/members` → Vista principal de socios (protegida)

  * `/members/:id` → Detalle de socio
  * `/members/create` → Formulario de creación

Todas las rutas privadas están protegidas mediante verificación de token JWT.

---

## 🔐 Autenticación

* El frontend consume el backend autenticado desplegado en Render.
* Al iniciar sesión, el token JWT se guarda localmente y se usa en las peticiones protegidas.
* El Context gestiona la persistencia del login y el acceso a rutas seguras.

---

## 🌐 Despliegue

La aplicación está desplegada en **Render**, conectada al backend también en Render. El despliegue puede automatizarse con GitHub y actualizaciones vía push.

---

## 📱 Responsive

La interfaz está diseñada para adaptarse correctamente a distintos tamaños de pantalla. El diseño mobile-first está implementado con Tailwind CSS.

---

## 🧩 Mejoras futuras

* [ ] Implementar **modo oscuro** con Tailwind
* [ ] **Migrar a TypeScript** para mayor robustez
* [ ] Integrar **TanStack Query** para optimizar manejo de datos y estados de red

---

## ✍️ Autoría

Desarrollado por yoanna rodionova

---