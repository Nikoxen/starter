'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${Object.entries(data[0].flags)[1][1]}" />
      <div class="country__data">
      <h3 class="country__name">${Object.entries(data[0].name)[0][1]}</h3>
      <h4 class="country__region">${data[0].region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data[0].population / 1000000
      ).toFixed(1)} People</p>
      <p class="country__row"><span>🗣️</span>${
        Object.entries(data[0].languages)[0][1]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.entries(Object.entries(data[0].currencies)[0])[0][1]
      }</p></div>
       </article> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //AJAX call country
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);

//     //render country
//     renderCountry(data);
//     //get neighbour country
//     const neighbour = data[0].borders;
//     if (!neighbour) return;
//     neighbour.forEach(CodeCountry => {
//       const request2 = new XMLHttpRequest();
//       request2.open(
//         'GET',
//         `https://restcountries.com/v3.1/alpha/${CodeCountry}`
//       );
//       request2.send();

//       //AJAX call country 2

//       request2.addEventListener('load', function () {
//         const data2 = JSON.parse(this.responseText);
//         console.log(data2);

//         renderCountry(data2, 'neighbour');
//       });
//     });
//   });
// };
// getCountryAndNeighbour('turkey');
///////////////////////////////////////////////
////////////////////////////////////////////////
// //callback hell
// setTimeout(() => {
//   console.log('1 sec');
//   setTimeout(() => {
//     console.log('2 sec');
//     setTimeout(() => {
//       console.log('3 sec');
//       setTimeout(() => {
//         console.log('4 sec');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     //json methodu da kendisi async method oldugundan yine promise döndürür.
//     //promise olur yine
//     //then ler small chain
//     .then(data => {
//       renderCountry(data);
//       const neighbour = data[0].borders;
//       if (!neighbour) return;

//       console.log(neighbour);
//       neighbour.forEach(neighbour => {
//         fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//           .then(response => response.json())
//           .then(data => {
//             renderCountry(data, 'neighbour');
//           });
//       });
//     }); //data[0]
// };
// getCountryData('turkey');

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => response.json() /*fullfilled*/,
//       /*rejected*/ error => alert(error)
//     )
//     .then(data => {
//       renderCountry(data);
//       const neighbour = data[0].borders;
//       if (!neighbour) return;

//       console.log(neighbour);
//       return neighbour.forEach(code => {
//         //eger return ile göndermeden direkt then yazarsak yine calisir ama diger thenin icinde oldugundan call back helle dönmüs oluruz.
//         fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`)
//           .then(
//             response => response.json(),
//             error => alert(error)
//           )
//           .then(data => renderCountry(data, 'neighbour'));
//       });
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
}; //returns a promise

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data);
      const neighbour = data[0].borders;

      if (!neighbour) throw new Error('No neighbour found!');

      try {
        neighbour.forEach(code => {
          getJSON(
            `https://restcountries.com/v3.1/alpha?codes=${code}`,
            'Country not found'
          ).then(data => renderCountry(data, 'neighbour'));
        });
      } catch (error) {
        getJSON(
          `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
          'Countryyyyyy not found'
        ).then(data => renderCountry(data, 'neighbour'));
      }
    })
    .catch(err => {
      console.error(`${err}🎇🎇🎇🎇🤣 `);
      renderError(`Something went wrong 🎇🎇🎇${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});

//////////////////////////////////
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Countryyyy not found ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data);
//       const neighbour = data[0].borders;

//       if (!neighbour) return;

//       // fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbour}`).then(
//       //   response => {
//       //     if (!response.ok) {
//       //       throw new Error(`Country not found ${response.status}`);
//       //     }

//       //     return response
//       //       .json()

//       //       .then(data => renderCountry(data, 'neighbour'));
//       //   }
//       // );
//       return neighbour.forEach(code => {
//         fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`).then(
//           response =>
//             response.json().then(data => renderCountry(data, 'neighbour'))
//           // response => {
//           //   if (!response.ok) {
//           //     throw new Error(`Country not found ${response}`);
//           //   }

//           //   return response
//           //     .json()

//           //     .then(data => renderCountry(data, 'neighbour'));
//           // }
//         );
//       });
//     })
//     .catch(err => {
//       console.error(`${err}🎇🎇🎇🎇🤣 `);
//       renderError(`Something went wrong 🎇🎇🎇${err.message}. Try again!`);
//       //catch de promise gönderir.
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//       //finally her kosulda gerceklesecek kisim
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('turkey');
// });
//getCountryData('turkdfghjhgey');

// .then(response => {
//   console.log(response);
//   if (!response.ok) {
//     throw new Error(`Country not found ${response.status}`);
//   }
// })
