let http = require('http');

// http://primodev1.bobst.nyu.edu:1701/PrimoWebServices/xservice/getscopesofview?viewId=NYU-NUI

let institution = 'NYU-NUI';

let options = {
  hostname: 'primodev1.bobst.nyu.edu',
  port: '1701',
  path: '/PrimoWebServices/xservice/getscopesofview?viewId=' + institution
};

http.get(options, (result) => {
  console.log('Success, with: ' + result);
  let body = '';
  result.on('data', (raw)  => {

  });
  result.on('end', () => {
  });
}).on('error', function (err) {
  console.log('Error, with: ' + err.message);
});
