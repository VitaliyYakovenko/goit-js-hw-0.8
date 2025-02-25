import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const playerEl = document.querySelector("#vimeo-player");
const KEY = "videoplayer-current-time";


const player = new Player(playerEl);

player.on("timeupdate", throttle(onPlay, 1000));

let time = localStorage.getItem(KEY);
player.setCurrentTime(time);


function onPlay(data) {
    localStorage.setItem(KEY, data.seconds);
};