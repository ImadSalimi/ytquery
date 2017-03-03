require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3000,
  apiBaseURL: process.env.API_BASEURL || 'https://www.googleapis.com/youtube/v3',
  apiKey: process.env.API_KEY || 'AIzaSyCJ9Vsu892Y654IpptAujYffOnvzuQsGFo',

}, environment);
