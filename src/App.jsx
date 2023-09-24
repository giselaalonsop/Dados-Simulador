import { useState } from "react";

const profesores = ["A", "B", "C", "D", "E"];
const cursos = ["C1", "C2", "C3", "C4", "C5"];

function App() {
    const [preferencias, setPreferencias] = useState({
        C1: [5, 8, 5, 9, 7],
        C2: [7, 2, 3, 6, 8],
        C3: [9, 10, 8, 9, 8],
        C4: [8, 7, 9, 7, 8],
        C5: [6, 9, 9, 10, 5],
    });

    const [edicionPreferencias, setEdicionPreferencias] = useState(false);
    const [asignacionOptima, setAsignacionOptima] = useState(null);

    const cambiarPreferencia = (curso, profesor, valor) => {
        const nuevasPreferencias = { ...preferencias };
        nuevasPreferencias[curso][profesores.indexOf(profesor)] =
            parseInt(valor);
        setPreferencias(nuevasPreferencias);
    };

    const resolverAsignacion = () => {
        // Realizar una búsqueda exhaustiva para encontrar la asignación óptima

        const asignacionOptima = {};
        const cursosAsignados = new Set();
        const profesoresAsignados = new Set();

        // Función recursiva para explorar todas las posibles asignaciones
        const explorarAsignaciones = (cursoIndex) => {
            if (cursoIndex === cursos.length) {
                // Si hemos asignado todos los cursos, calculamos la puntuación total
                let puntuacionTotal = 0;
                cursos.forEach((curso) => {
                    const profesorAsignado = asignacionOptima[curso];
                    const puntuacion =
                        preferencias[curso][
                            profesores.indexOf(profesorAsignado)
                        ];
                    puntuacionTotal += puntuacion;
                });

                // Si es mejor que la asignación actual, la reemplazamos
                if (
                    !asignacionOptima.puntuacion ||
                    puntuacionTotal > asignacionOptima.puntuacion
                ) {
                    asignacionOptima.asignacion = { ...asignacionOptima };
                    asignacionOptima.puntuacion = puntuacionTotal;
                }

                return;
            }

            const cursoActual = cursos[cursoIndex];
            for (const profesor of profesores) {
                if (
                    !cursosAsignados.has(cursoActual) &&
                    !profesoresAsignados.has(profesor)
                ) {
                    // Intentamos asignar el curso al profesor actual
                    asignacionOptima[cursoActual] = profesor;
                    cursosAsignados.add(cursoActual);
                    profesoresAsignados.add(profesor);

                    // Pasamos al siguiente curso
                    explorarAsignaciones(cursoIndex + 1);

                    // Deshacemos la asignación para explorar otras opciones
                    delete asignacionOptima[cursoActual];
                    cursosAsignados.delete(cursoActual);
                    profesoresAsignados.delete(profesor);
                }
            }
        };

        // Iniciamos la búsqueda exhaustiva desde el primer curso
        explorarAsignaciones(0);

        // Actualizar el estado con la asignación óptima encontrada
        setAsignacionOptima(asignacionOptima);
    };

    return (
        <div className="container mx-auto mt-5 p-5 content-center">
            <h1 className="text-lg font-bold mb-3 text-center ">
                Asignación de Profesores a Cursos
            </h1>
            <div className="w-full max-w-xl mx-auto">
                <div className="mb-5 ">
                    <table className="w-full border-collapse border sm:rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Curso
                                </th>
                                {profesores.map((profesor, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3"
                                    >
                                        Profesor {profesor}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso, cursoIndex) => (
                                <tr
                                    key={cursoIndex}
                                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                                    >
                                        Curso {curso}
                                    </th>
                                    {profesores.map(
                                        (profesor, profesorIndex) => (
                                            <td
                                                key={profesorIndex}
                                                className="px-6 py-4  text-white"
                                            >
                                                {edicionPreferencias ? (
                                                    <input
                                                        type="number"
                                                        className="w-10 h-8 text-center border rounded-lg text-black"
                                                        value={
                                                            preferencias[curso][
                                                                profesorIndex
                                                            ]
                                                        }
                                                        onChange={(e) =>
                                                            cambiarPreferencia(
                                                                curso,
                                                                profesor,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    preferencias[curso][
                                                        profesorIndex
                                                    ]
                                                )}
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mb-5">
                    <button
                        onClick={() =>
                            setEdicionPreferencias(!edicionPreferencias)
                        }
                        className="px-4 py-2 mr-3 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        {edicionPreferencias
                            ? "Guardar Preferencias"
                            : "Editar Preferencias"}
                    </button>
                    <button
                        onClick={resolverAsignacion}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        Resolver Asignación
                    </button>
                </div>
                {asignacionOptima && (
                    <div>
                        <h2 className="text-lg font-bold mb-3 text-center">
                            Asignación Óptima
                        </h2>
                        <table className="w-full border-collapse border rounded-lg">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Curso
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Profesor Asignado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cursos.map((curso, cursoIndex) => (
                                    <tr
                                        key={cursoIndex}
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-semibold text-gray-900 dark:text-white "
                                        >
                                            Curso {curso}
                                        </th>
                                        <td className="px-6 py-4 align-top text-center text-white">
                                            {" "}
                                            {/* Agregamos align-top aquí */}
                                            {asignacionOptima.asignacion[curso]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
