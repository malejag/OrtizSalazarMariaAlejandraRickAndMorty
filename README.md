# Rick and Morty App - versión estética con easter eggs

Proyecto en React + Vite que consume la API oficial de Rick and Morty:

https://rickandmortyapi.com/api/character

## Ejecutar

```powershell
npm install
npm run dev
```

Luego abre la URL que muestre Vite, normalmente:

```text
http://localhost:5173
```

## Archivos personalizables

### Botón de inicio

Reemplaza:

```text
public/icono.png
```

por tu imagen de Rick y Morty. Conserva el nombre `icono.png`.

### Música de fondo

Reemplaza:

```text
public/audio/intro.mp3
```

por la intro que quieras usar. Conserva el nombre `intro.mp3`.

### Botón oculto del easter egg

Reemplaza:

```text
public/imagenboton.jpg
```

por la imagen que quieras usar para el botón oculto.

### GIF del easter egg

Reemplaza:

```text
public/easter.gif
```

por tu GIF. Conserva el nombre `easter.gif`.

### Audio del easter egg

Reemplaza:

```text
public/audio/easter.mp3
```

por tu audio especial. Conserva el nombre `easter.mp3`.

## Easter egg

Haz 10 clics seguidos en el botón oculto ubicado en la esquina inferior derecha. Al activarse:

- cambia el tema visual,
- aparece `easter.gif` desde la esquina inferior derecha,
- suena `easter.mp3`.

Al recargar la página vuelve al diseño normal.
