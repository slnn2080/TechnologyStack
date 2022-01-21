(function(window) {
  let a = 10
  function fn() {
    console.log(a)
  }

  window.utils = {
    fn
  }
})(window)