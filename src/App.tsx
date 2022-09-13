import { useState } from "react";
import "./App.css";
import Playground from "./components/Playground";
import { PlaygroundModel } from "./model/PlaygroundModel";

import SadAra from "./assets/SadAra.jpg";
import fancy from "./assets/fancy.png";

function App() {
  const [pg, setPg] = useState(() => new PlaygroundModel(10, 10, 8));
  const [isOver, setIsOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isSeen, setIsSeen] = useState(false);

  const handleGameOver = () => {
    setIsOver(true);
  };

  const handleWin = () => {
    setIsWin(true);
  };

  const handleAgain = () => {
    setPg(() => new PlaygroundModel(10, 10, 8));
    setIsOver(false);
  };

  const showHim = () => {
    setIsSeen(true);
  };

  const renderContent = () => {
    if (!isOver && !isWin) {
      return (
        <div className=" flex items-center flex-col">
          <h4 className="text-2xl">Правила:</h4>
          <ul className="italic my-4">
            <li>Числом обозначено количество БОМБ ФАТУЕВ возле клетки</li>
            <li>Левым кликом можно открывать поля</li>
            <li>
              Правым кликом можно помечать поля, если думаешь, то на этом поле
              бомба
            </li>
            <li>Для победы нужно открыть все поля кроме тех, что с бомбой</li>
          </ul>
          <Playground
            pg={pg}
            onGameOver={handleGameOver}
            onGameWin={handleWin}
          />
        </div>
      );
    }

    if (isOver) {
      return (
        <div className=" flex items-center flex-col">
          <h4 className="text-2xl">О НЕТ!</h4>
          <p className="text-2xl">
            Вы наступили на мину, но аранара вовремя вас спас! Попробуйте ещё
            раз.
          </p>
          <img className="mt-4" src={SadAra} alt="" />
          <button onClick={handleAgain}>Ещё раз</button>
        </div>
      );
    }

    if (isWin) {
      return (
        <div className="flex items-center flex-col">
          <h4 className="text-2xl">Ура!</h4>
          <p className="text-2xl mt-8">
            Вместе с Аранарой вы наконец-то нашли того незнакомца!
          </p>
          <p className="text-2xl mb-6">Но кто же это???</p>
          {!isSeen ? (
            <button onClick={showHim}>Кто же?</button>
          ) : (
            <div className="flex items-center flex-col">
              <img className="mt-4" src={fancy} width="300" />
              <p className="mt-4 text-2xl text-red-500 italic">
                А вот и ты, Семиклассница. Позволь мне поздравить тебя!
              </p>
              <p className="text-2xl text-red-500 italic">
                Я помню как ты купила аккаунт со мной когда-то давно.
              </p>
              <p className="text-2xl text-red-500 italic">
                С тех пор я приглядываю за тобой. И я вижу какой замечательной
                ты растёшь!
              </p>
              <p className="text-2xl text-red-500 italic">
                Сегодня я пью этот апельсиновый сок в твою честь! ^_^
              </p>
              <div className="text-right w-full">
                <p className="text-lg mt-4">Так он и сказал...</p>
                <p className="text-lg mt-4">С днём рождения!</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <main
      className={`flex flex-col items-center min-h-screen p-16 ${
        isSeen ? "diluc" : "aranara"
      }`}
    >
      <div className="px-8 py-4 bg-slate-100 rounded-lg border-0 shadow-md shadow-gray-200">
        <h1 className="text-3xl italic text-amber-500">ИВЕНТ ДНЯ РОЖДЕНЬЯ!</h1>
      </div>
      <div className="mt-12 px-8 py-4 bg-slate-100 rounded-lg border-0 shadow-md shadow-gray-200">
        <p className="text-2xl text-amber-500">
          По дороге со школы ты встретила АРАНАРУ! Он говорит, что тебя хочет
          поздравить кто-то очень крутой!
        </p>
        <p className="text-2xl text-amber-500">
          Но вот незадача - дорога обложена МИНАМИ ФАТУЕВ! Помоги АРАНАРЕ
          привести тебя к незнакомцу.
        </p>
      </div>
      <div className="mt-24 p-4 bg-slate-100 rounded-lg border-0 shadow-md shadow-gray-200">
        {renderContent()}
      </div>
    </main>
  );
}

export default App;
