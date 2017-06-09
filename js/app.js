(function() {
  // console.log('sanity check');
  var person4Name, person4HomeWorld,
  person14Name, person14Species, filmList;
  person4Name = document.getElementById('person4Name');
  person4HomeWorld = document.getElementById('person4HomeWorld');
  person14Name = document.getElementById('person14Name');
  person14Species = document.getElementById('person14Species');
  filmList = document.getElementById('filmList');

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
    var response = JSON.parse(this.responseText);
    person4Name.innerHTML = response.name;
    person4HomeWorld.innerHTML = response.homeworld;
  });
  oReq.open('GET', 'http://swapi.co/api/people/4/');
  oReq.send();

  var oReq2 = new XMLHttpRequest();
  oReq2.addEventListener('load', function() {
    var response = JSON.parse(this.responseText);
    person14Name.innerHTML = response.name;
    person14Species.innerHTML = response.species;
  });
  oReq2.open('GET', 'http://swapi.co/api/people/14/');
  oReq2.send();

  var oReq3 = new XMLHttpRequest();
  oReq3.addEventListener('load', function() {
    var filmResponse = JSON.parse(this.responseText);
    var filmLi, filmTitleH2, filmPlanetH3,
    filmPlanetUl, filmPlanetLi, filmPlanetH4;
    for(var i = 0; i < filmResponse.results.length; i++) {
      filmLi = document.createElement('li');
      filmLi.className = 'film';
      filmTitleH2 = document.createElement('h2');
      filmTitleH2.className = 'filmTitle';
      filmTitleH2.innerHTML = filmResponse.results[i].title;
      filmLi.appendChild(filmTitleH2);
      filmPlanetH3 = document.createElement('h3');
      filmPlanetH3.innerHTML = 'Planets';
      filmLi.appendChild(filmPlanetH3);
      filmPlanetUl = document.createElement('ul');
      filmLi.appendChild(filmPlanetUl);
      filmList.appendChild(filmLi);
      for(var j = 0; j < filmResponse.results[i].planets.length; j++) {
        (function(ul) {
          var oReq4 = new XMLHttpRequest();
          oReq4.addEventListener('load', function() {
            var planetResponse = JSON.parse(this.responseText);

            filmPlanetLi = document.createElement('li');
            filmPlanetLi.className = 'planet';
            filmPlanetH4 = document.createElement('h4');
            filmPlanetH4.className = 'planetName';
            filmPlanetH4.innerHTML = planetResponse.name;
            filmPlanetLi.appendChild(filmPlanetH4);
            ul.appendChild(filmPlanetLi);
          });
          oReq4.open('GET', filmResponse.results[i].planets[j]);
          oReq4.send();
        })(filmPlanetUl);
      }
    }
  });
  oReq3.open('GET', 'http://swapi.co/api/films/');
  oReq3.send();
})();