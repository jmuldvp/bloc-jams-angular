(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      /**
      * @desc Active song object from list of songs
      * @type {Object}
      */
      SongPlayer.currentSong = song;
    };

    /**
    * @function playSong
    * @desc Plays the selected song
    * @param {Object} song
    */
    var playSong = function(song) {
      // console.log(currentBuzzObject);
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function getSongIndex
    * @desc Aquires index of the selected song
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @function stopSong
    * @desc Stops the selected song
    * @param {Object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function play
    * @desc Play current or new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject && currentBuzzObject.isPaused()) {
          playSong(song);
        } else {
            song = currentAlbum.songs[0];
            setSong(song);
            playSong(song);
        }
      }
    };

    /**
    * @function pause
    * @desc Pause current song
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc Play previous song unless it's the first song. Stop if it is.
    * @param {Object} song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      // console.log((currentSongIndex + 1) + " out of " + currentAlbum.songs.length);
      if (currentSongIndex < 0) {
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function next
    * @desc Play next song unless current song is the last song. Stop if it is.
    * @param {Object} song
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if ((currentSongIndex + 1) > currentAlbum.songs.length) {
        stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
