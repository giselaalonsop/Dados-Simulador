import { useState, useEffect } from "react";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";
import "./App.css"; // Importa un archivo CSS personalizado

const App = () => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [sum, setSum] = useState(2);
  const [results, setResults] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  const calculateProbability = (combination) => {
    const [result1, result2] = combination.split("-").map(Number);
    return (1 / 36) * (result1 === result2 ? 1 : 2);
  };

  const rollDice = () => {
    // Generar números aleatorios para los dados
    const result1 = Math.floor(Math.random() * 6) + 1;
    const result2 = Math.floor(Math.random() * 6) + 1;

    const combination = `${result1}-${result2}`;
    const currentProbability = calculateProbability(combination);

    const newResults = [
      ...results,
      { combination, probability: currentProbability },
    ];
    setResults(newResults);

    // Simula una animación de lanzamiento agregando y eliminando una clase
    setDice1(0);
    setDice2(0);

    setTimeout(() => {
      setDice1(result1);
      setDice2(result2);

      const currentSum = result1 + result2;
      setSum(currentSum);

      setTotalSum((prevTotalSum) => prevTotalSum + currentSum);
    }, 200); // Espera 1 segundo antes de mostrar el resultado
  };

  useEffect(() => {
    // Simula la animación de lanzamiento agregando y eliminando la clase 'rolling'
    if (dice1 === 0 || dice2 === 0) {
      setTimeout(() => {
        setDice1(dice1);
        setDice2(dice2);
      }, 10);
    }
  }, [dice1, dice2]);

  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-semibold mb-4">
        Simulación de Lanzamiento de Dados
      </h1>
      <div className="flex justify-center items-center space-x-8">
        <div
          className={`w-32 h-32 bg-white border border-gray-300 rounded-md flex justify-center items-center text-6xl dice ${
            dice1 === 1 && "dice-one"
          } ${dice1 === 2 && "dice-two"} ${dice1 === 3 && "dice-three"} ${
            dice1 === 4 && "dice-four"
          } ${dice1 === 5 && "dice-five"} ${dice1 === 6 && "dice-six"}`}
        >
          {dice1 === 1 && <FaDiceOne />}
          {dice1 === 2 && <FaDiceTwo />}
          {dice1 === 3 && <FaDiceThree />}
          {dice1 === 4 && <FaDiceFour />}
          {dice1 === 5 && <FaDiceFive />}
          {dice1 === 6 && <FaDiceSix />}
        </div>
        <div
          className={`w-32 h-32 bg-white border border-gray-300 rounded-md flex justify-center items-center text-6xl dice ${
            dice2 === 1 && "dice-one"
          } ${dice2 === 2 && "dice-two"} ${dice2 === 3 && "dice-three"} ${
            dice2 === 4 && "dice-four"
          } ${dice2 === 5 && "dice-five"} ${dice2 === 6 && "dice-six"}`}
        >
          {dice2 === 1 && <FaDiceOne />}
          {dice2 === 2 && <FaDiceTwo />}
          {dice2 === 3 && <FaDiceThree />}
          {dice2 === 4 && <FaDiceFour />}
          {dice2 === 5 && <FaDiceFive />}
          {dice2 === 6 && <FaDiceSix />}
        </div>
      </div>
      <p className="text-2xl mt-4">Suma: {sum}</p>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={rollDice}
        disabled={dice1 === 0 || dice2 === 0}
      >
        Lanzar Dados
      </button>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Suma Total:</h2>
        <p className="text-4xl">{totalSum}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">
          Probabilidades de Combinaciones:
        </h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Combinación</th>
              <th className="border border-gray-300 p-2">Probabilidad</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  {result.combination}
                </td>
                <td className="border border-gray-300 p-2">
                  {result.probability.toFixed(4)} (
                  {(result.probability * 100).toFixed(2)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
