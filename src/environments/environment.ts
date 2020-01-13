// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: true,
  //add your firebase Project configuration
  // Take help from this Blog to setup firbase config:- https://enappd.com/blog/how-to-integrate-firebase-in-ionic-4-apps/23/
  config: {
    apiKey: "AIzaSyD4QJQn8taKoIjDovIggk1B7HQ7H6NEF8w",
    authDomain: "unicar-platform.firebaseapp.com",
    databaseURL: "https://unicar-platform.firebaseio.com",
    projectId: "unicar-platform",
    storageBucket: "unicar-platform.appspot.com",
    messagingSenderId: "970904163480",
    appId: "1:970904163480:web:5e7b93488cf4018bafeced",
    measurementId: "G-VCLS6N4XB4"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
