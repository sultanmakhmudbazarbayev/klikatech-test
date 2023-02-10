const fs = require('fs');
const csvFilePath =
  './Music_Dataset_Lyrics_and_Metadata_from_1950_to_2019/clean_music.csv';
const csv = require('csvtojson');

/// Arrays for saving unique artists and genres by mapping to corresponding index inside of arrays
const uniqueArtists = [];
const uniqueGenres = [];

/// Arrays for saving songs, artists and genres to send them to seeders-data
const arraySongObjects = [];
const arrayArtistObjects = [];
const arrayGenreObjects = [];

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.map((jsonObj) => {
      const songObject = {};
      const artistObject = {};
      const genreObject = {};

      songObject.song = jsonObj.track_name;
      songObject.year = jsonObj.release_date;

      if (!uniqueArtists.includes(jsonObj.artist_name)) {
        uniqueArtists.push(jsonObj.artist_name);

        artistObject.id = uniqueArtists.indexOf(jsonObj.artist_name) + 1;
        artistObject.artist_name = jsonObj.artist_name;
        arrayArtistObjects.push(artistObject);
      }

      if (!uniqueGenres.includes(jsonObj.genre)) {
        uniqueGenres.push(jsonObj.genre);

        genreObject.id = uniqueGenres.indexOf(jsonObj.genre) + 1;
        genreObject.genre = jsonObj.genre;
        arrayGenreObjects.push(genreObject);
      }

      if (uniqueArtists.includes(jsonObj.artist_name)) {
        songObject.artist_id = uniqueArtists.indexOf(jsonObj.artist_name) + 1;
      }

      if (uniqueGenres.includes(jsonObj.genre)) {
        songObject.genre_id = uniqueGenres.indexOf(jsonObj.genre) + 1;
      }

      arraySongObjects.push(songObject);
    });
  })
  .then(() => {
    const artistsData = JSON.stringify(arrayArtistObjects);
    const genresData = JSON.stringify(arrayGenreObjects);
    const songsData = JSON.stringify(arraySongObjects);

    fs.promises.writeFile('../db/seeders-data/artists.js', artistsData);
    fs.promises.writeFile('../db/seeders-data/genres.js', genresData);
    fs.promises.writeFile('../db/seeders-data/songs.js', songsData);
  })
  .catch((error) => {
    console.error(error);
  });
