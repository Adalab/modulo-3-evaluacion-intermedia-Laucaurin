const callToApi = () => {
  return fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
    .then(response => response.json())
};
export default callToApi;