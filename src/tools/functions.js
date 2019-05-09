
// this function takes the artwork url from the apple music api and the desired image size 
// and returns a usable url
const getUsablePicUrl = (url, size) => {
  // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
  // with '200x200bb.jpeg' for example. width + height can be assigned this way
  let slicePoint = url.indexOf('{w}');

  return url.slice(0, slicePoint) + `${size}x${size}bb.jpeg`;
}

// this function takes millisecond time and converts it to standard
// ex - 10000 => 0:10
const convertMillisToStandard = (millis) => {
  let totalSeconds = millis / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds - minutes * 60);

  let secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${secondsDisplay}`
}

// let test = convertMillisToStandard(103000);
// console.log(test)

// this function will shorten a str if str.length > length. otherwise, returns 
// original string unchanged
const shortenStr = (str, length) => {
  let tooLong = str.length > length;
  if (tooLong) {
    return `${str.toString().slice(0, 20)} ...`;
  }
  else {
    return str;
  }
}

console.log(shortenStr('hello, how are you?', 20))
console.log(shortenStr('hello, how are you? are you here? who am i talking toooooo??', 20))

module.exports = {
  getUsablePicUrl,
  convertMillisToStandard
}