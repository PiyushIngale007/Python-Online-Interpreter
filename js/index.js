function encode(data) {
  return btoa(unescape(encodeURIComponent(data)));
}

function getResult(token) {
  
  fetch(
    'https://judge0-ce.p.rapidapi.com/submissions/' +
      token.token +
      '?base64_encoded=false&fields=*',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9a1e533b35msh3b49916d58c4124p1389c5jsnfc392a00200e',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      
      $('#loading').css('display', 'none');
      if (data.stdout == null) {
        document.getElementById('output').innerHTML = data.stderr;
      } else {
        document.getElementById('output').innerHTML = data.stdout;
      }
    });
}
function onClickRun() {
  document.getElementById('output').innerHTML = '';
  
  var data = JSON.stringify({
    language_id: 71,
    source_code: encode($('#source').val()),
    stdin: encode($('#input').val()),
  });

  
  $('#loading').css('display', 'unset');
  fetch(
    'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '9a1e533b35msh3b49916d58c4124p1389c5jsnfc392a00200e',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
      body: data,
    }
  )
    .then((response) => response.text())
    .then((token) => {
      setTimeout(function () {
        getResult(JSON.parse(token));
      }, 1000);
    });
}

function gettoken() {
  document.getElementById('console').innerHTML = '';
  
  var data = JSON.stringify({
    language_id: 71,
    source_code: encode($('#source').val()),
    stdin: encode($('#input').val()),
  });

  
  $('#loading').css('display', 'unset');
  fetch(
    'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': '9a1e533b35msh3b49916d58c4124p1389c5jsnfc392a00200e',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
      body: data,
    }
  )
    .then((response) => response.text())
    .then((token) => {
      setTimeout(function () {
        getResult1(JSON.parse(token));
      }, 1000);
    });
}

function getResult1(token) {
  
  fetch(
    'https://judge0-ce.p.rapidapi.com/submissions/' +
      token.token +
      '?base64_encoded=false&fields=*',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9a1e533b35msh3b49916d58c4124p1389c5jsnfc392a00200e',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      
      $('#loading').css('display', 'none');
      if (data.stdout == null) {
        document.getElementById('console').innerHTML = data.stderr;
      } else {
        document.getElementById('console').innerHTML = data.stdout;
      }
    });
}

var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById('console');
var captionText = document.getElementById('caption');
img.onclick = function () {
  modal.style.display = 'unset';
  modalImg.src = this.src;
  gettoken();
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

window.onorientationchange = function () {
  var orientation = window.orientation;
  switch (orientation) {
    case 0:
    case 90:
    case -90:
      window.location.reload();
      break;
  }
};
