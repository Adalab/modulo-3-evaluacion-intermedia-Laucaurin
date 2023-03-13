import '../styles/App.scss';
import callToApi from '../services/api';
import { useEffect, useState } from 'react';

function App() {
  //variables
  const [friendsData, setFriendsData] = useState([]);
  const [searchQuote, setSearchQuote] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('all');
  const [newQuoteFriend, setNewQuoteFriend] = useState({
    quote: '',
    character: '',
  });

  //Call to api
  useEffect(() => {
    callToApi().then((results) => {
      setFriendsData(results);
    });
  }, []);

  // collect input value quote / character / new quote
  const handleSearchQuote = (ev) => {
    setSearchQuote(ev.target.value)
  }
  const handleSearchCharacter = (ev) => {
    setSearchCharacter(ev.target.value)
  }

  const handleNewQuoteFriend = (ev) => {
    setNewQuoteFriend({ ...newQuoteFriend, [ev.target.name]: ev.target.value })
  }

  //function to add new quote with click event & clean inputs 
  const handleclickAdd = () => {
    setFriendsData([...friendsData, newQuoteFriend])
    setNewQuoteFriend({
      quote: '',
      character: '',
    })
  }

  //Render list
  const renderFriends = () => {
    return friendsData
      .filter((eachFriend) => eachFriend.quote.toLocaleLowerCase().includes(searchQuote.toLocaleLowerCase()))
      .filter((eachFriend) => eachFriend.character.toLocaleLowerCase().includes(searchCharacter.toLocaleLowerCase()) || searchCharacter === 'all')
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

            <label htmlFor="phrase-filter">Filtrar por frase</label>
            <input type="text" placeholder='Ej:Pivot! pivot!' id='phrase' name='phrase' value={searchQuote} onChange={handleSearchQuote} />

            <label htmlFor="character">Filtrar por personaje</label>
            <select name="character" id="character" value={searchCharacter} onChange={handleSearchCharacter}>
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

            <label htmlFor="quote">Frase
              <input type="text" name='quote' id='quote' placeholder='Ej:Pivot! pivot!' onChange={handleNewQuoteFriend} value={newQuoteFriend.quote} />
            </label>

            <label htmlFor="character">Personaje
              <input type="text" name='character' id='character' placeholder='Ej: Ross' onChange={handleNewQuoteFriend} value={newQuoteFriend.character} />
            </label>

            <input type="button" name="button" id="button" value="Añadir una nueva frase" onClick={handleclickAdd} />

          </fieldset>
        </form>
      </main>
    </div>
  );
}
export default App;
