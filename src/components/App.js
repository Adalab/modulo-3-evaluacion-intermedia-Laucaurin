import '../styles/App.scss';
import callToApi from '../services/api';
import { useEffect, useState } from 'react';

function App() {
  //variables
  const [friendsData, setFriendsData] = useState([]);

  //Call to api
  useEffect(() => {
    callToApi().then((results) => {
      setFriendsData(results);
    });
  }, []);

  //Render list
  const renderFriends = () => {
    return friendsData
      .map((eachFriend, i) => (
        <li key={i}>
          <p>{eachFriend.quote}</p>
          <p>{eachFriend.character}</p>
        </li>
      ));
  };

  //On submit function form
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  }

  return (
    <div className='body'>
      <header>
        <h1>Frases de Friends</h1>
      </header>
      <main>
        <form className='form' action="" onSubmit={handleOnSubmit}>
          <fieldset>
            <legend>Búsqueda</legend>
            <label htmlFor="phrase">Filtrar por frase</label>
            <input type="text" placeholder='Ej:Pivot! pivot!' id='phrase' name='phrase' />

            <label htmlFor="character">Filtrar por personaje</label>
            <select name="character" id="character">
              <option value="all">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Mónica">Mónica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
            <h2>Resultados</h2>
            <ul>{renderFriends()}</ul>
          </fieldset>
          <fieldset>
            <legend>Añadir una nueva frase</legend>

            <label htmlFor="phrase-add">Frase
              <input type="text" name='phrase-add' id='phrase-add' placeholder='Ej:Pivot! pivot!' />
            </label>

            <label htmlFor="character-add">Personaje
              <input type="text" name='character-add' id='character-add' placeholder='Ej: Ross' />
            </label>

            <input type="button" name="button" id="button" value="Añadir una nueva frase" />

          </fieldset>
        </form>
      </main>
    </div>
  );
}
export default App;
