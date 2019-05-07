
const getUsablePicUrl = (url, size) => {
  // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
  // with '200x200bb.jpeg' for example. width + height can be assigned this way
  let slicePoint = url.indexOf('{w}');

  return url.slice(0, slicePoint) + `${size}x${size}bb.jpeg`;
}

module.exports = {
  getUsablePicUrl
}