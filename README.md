# Como usar?

1.Clona este repositorio
2.Ejecuta npm install
3.Ejecuta npm run dev
4.Happy hacking :)

## Introducción
La aplicación de simulación de lanzamiento de dados es un componente de React diseñado para proporcionar una experiencia de usuario interactiva al simular el lanzamiento de dos dados. El componente utiliza el estado de React y efectos para gestionar el proceso de lanzamiento de los dados, mostrar los resultados y calcular las probabilidades de todas las combinaciones posibles.

## Estructura del Código
El código se organiza en varias secciones para mantener una estructura clara y modular:

## Importaciones
Importa las dependencias necesarias para el funcionamiento de la aplicación, incluyendo React, componentes de iconos de dados y un archivo CSS personalizado para estilos.
Estado Inicial
dice1 y dice2: Dos estados que almacenan los valores actuales de los dados.
sum: Un estado que guarda la suma de los valores de los dados.
results: Un estado que mantiene un registro de todas las combinaciones de dados y sus probabilidades.
totalSum: Un estado que acumula la suma total de todas las tiradas de dados.
Funciones
calculateProbability(combination): Una función que calcula la probabilidad de una combinación específica de dados. Divide 1 entre 36 y multiplica por 1 o 2, dependiendo de si los valores de los dados son iguales o diferentes.

rollDice(): Una función que simula el lanzamiento de dos dados. Genera números aleatorios para ambos dados, actualiza los resultados y muestra una animación de lanzamiento antes de mostrar el resultado final.

### Efecto de React
useEffect: Utiliza el hook useEffect de React para gestionar la animación de lanzamiento de dados. Cuando los estados dice1 o dice2 cambian, se dispara este efecto para simular la animación de lanzamiento.
Renderización
El componente renderiza la interfaz de usuario, incluyendo dos dados con iconos correspondientes a los valores, la suma de los dados, un botón para lanzar los dados y una tabla que muestra las probabilidades de todas las combinaciones posibles.

Las clases CSS se aplican dinámicamente para reflejar los valores actuales de los dados y dar estilo a la interfaz de usuario.

## Uso
Para incorporar la aplicación en tu proyecto de React, simplemente importa el componente App y colócalo en la ubicación deseada de tu aplicación. Puedes personalizar la apariencia ajustando las clases CSS en la sección de renderización.
