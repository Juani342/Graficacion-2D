# 🚀 Tank Wars | Neon Edition - Graficación 2D

Proyecto desarrollado para la materia de **Graficación 2D**. Es un juego de artillería por turnos basado en el clásico *Tanks*, implementado totalmente con **Canvas API** de JavaScript y una estética *Cyber-Glass* (Glassmorphism).

🔗 **Juega aquí:** [https://juani342.github.io/Graficacion-2D/](https://juani342.github.io/Graficacion-2D/)
  ** Repositorio en git: [https://github.com/Juani342/Graficacion-2D.git]
---

## 🛠️ Tecnologías Utilizadas
* **HTML5 & CSS3:** Estructura y diseño neón responsivo con **Bootstrap 5**.
* **JavaScript (ES6+):** Lógica del juego mediante Programación Orientada a Objetos (POO).
* **Canvas API:** Renderizado de gráficos en 2D en tiempo real.

---

## 🎮 Características del Proyecto
* **Física de Proyectiles:** Cálculo de trayectoria parabólica considerando gravedad y potencia.
* **Estructura Destructible:** Muralla central en forma de "T" y techos protectores con diferentes niveles de resistencia (Piedra y Madera).
* **Módulos Independientes:** Arquitectura limpia separando clases para `Tank`, `Bullet`, `Cloud` y `Structure`.
* **Interfaz de Usuario (HUD):** Modal de victoria personalizado y controles deslizantes (sliders) para ángulo y potencia.

---

## 📐 Conceptos Matemáticos Aplicados
Para este proyecto se implementaron los siguientes conceptos fundamentales de graficación:
1. **Transformaciones:** Uso de `translate()` y `rotate()` para el movimiento del cañón del tanque.
2. **Detección de Colisiones:** Algoritmo AABB (Axis-Aligned Bounding Box) para impactos entre proyectiles, tanques y estructuras.
3. **Sistemas de Coordenadas:** Mapeo de coordenadas del mouse para interacción con objetos (nubes).

---

## 👤 Autor
* **Juan Pablo** - *Desarrollo y Diseño* - [Juani342](https://github.com/Juani342)

---
> *Este proyecto fue realizado como parte de los entregables académicos para la carrera de Ingeniería en Sistemas.*