(function() {
  function PlayerBarCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    this.getVolume = getVolume;


    function getVolume() {
      if(this.songPlayer.volume === undefined || this.songPlayer.volume === null) {
        return 50;
      } else {
        return this.songPlayer.volume;
      }
    }

  }

  angular
    .module('blocJams')
    .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();
