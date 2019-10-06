import App from './js/app';


window.onload = () => {
  const container = document.getElementById('container');
  const ThreeApp = new App(container);
  console.log('onLoadDone');
}
