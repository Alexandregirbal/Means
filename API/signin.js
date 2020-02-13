export default async function signInFromApiAsync(e,p) {
    //console.log('On envoie la request...')
    return fetch('https://means-api.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: e,
            password: p
        }),
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }