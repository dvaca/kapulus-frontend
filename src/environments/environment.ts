// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//URLBack: 'http://localhost:4000';
//URLBack: 'http://169.254.168.35:4000'; //PEER TO PEER
//URLBack: 'http://192.168.0.100:4000'; //KAPULUS
//URLBack: 'https://kapulus-backend.herokuapp.com'; //LOCAL
//URLBack: 'http://192.168.0.102:4000'; //LOCAL
//URLBack: 'http://172.20.10.6:4000'; //INTERNET


export const environment = {
  production: false,
  URLBack: 'http://back.kapulus.com:4000'
};
