var bookShelf = [];
var libraryURL = "http://127.0.0.1:3002/Library/";

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


var spacesToCamelCase = function (str) {
  var splits = str.split(/(?=[A-Z]+)/);
  var rejoined = splits.join(" ");
  var myArr = [];
  for(i = 0;i < rejoined.length;i++)
  if(i === 0){
    myArr.push(rejoined[i].toUpperCase())
  }else{
    myArr.push(rejoined[i])
  }
  return myArr.join("");
};

var getRidOfIdAndV = function(obj){
  var tempArr = []
  for (var i = 0; i < obj.length; i++) {
    var myObj = new Object();
    for (var key in obj[i]) {
      if(key === "_id" || key === "__v"){

      }else{
        myObj[key] = obj[i][key]
      }
    }
    tempArr.push(new Book(myObj))
  }
  console.log(tempArr);
  return tempArr
}


var bookify = function(arr){
  var tempArr = []
  for (var i = 0; i < arr.length; i++) {
    var myObj = new Object();
    for (var key in arr[i]) {
        myObj[key] = arr[i][key]
    }
    tempArr.push(new Book(myObj))
  }
  //console.log(tempArr);
  return tempArr
}
