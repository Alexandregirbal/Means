export default async function signUpFromApiAsync(e,p,pv,fn,ln) {
    //console.log('On envoie la request...')
    return fetch('https://means-api.herokuapp.com/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: e,
            password: p,
            pwd_verif: pv,
            firstName: fn,
            lastName: ln
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