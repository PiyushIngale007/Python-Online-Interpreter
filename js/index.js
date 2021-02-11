function encode(data) {
  return btoa(unescape(encodeURIComponent(data)));
}

function getResult(token) {
  console.log(token.token);
  fetch(
    'https://judge0-ce.p.rapidapi.com/submissions/' +
      token.token +
      '?base64_encoded=false&fields=*',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c5e4f34e74msh98beac42f63fb9ep1d10bajsn99f8d127891d',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
  console.log(encode($('#source').val()));
  var data = JSON.stringify({
    language_id: 71,
    source_code: encode($('#source').val()),
    stdin: encode($('#input').val()),
  });

  console.log(data);
  $('#loading').css('display', 'unset');
  fetch(
    'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': 'c5e4f34e74msh98beac42f63fb9ep1d10bajsn99f8d127891d',
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

