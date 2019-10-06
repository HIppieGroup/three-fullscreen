uniform float time;
uniform sampler2D texture1;

//varying vec2 vUv;
varying vec2 vUv1;

void main() {
  vec4 image1 = texture2D(texture1, vUv1);
  gl_FragColor = image1;
}
