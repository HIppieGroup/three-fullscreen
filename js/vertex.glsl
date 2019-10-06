uniform vec2 uvRate1;

//varying vec2 vUv;
varying vec2 vUv1;

void main() {
//  vUv = uv;
  vec2 _uv = uv - 0.5;
  vUv1 = (_uv * uvRate1) + 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
