const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const video = document.getElementById('video');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Vertex & Fragment shaders
const vsSource = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 vTexCoord;
void main(){gl_Position=a_position;vTexCoord=a_texCoord;}
`;
const fsSource = `
precision mediump float;
uniform sampler2D u_texture;
uniform float u_time;
uniform float u_intensity;
uniform float u_kaleido;
uniform float u_audioBass;
varying vec2 vTexCoord;
void main(){
vec2 uv=vTexCoord-0.5;
float r=length(uv);
float a=atan(uv.y,uv.x);
if(u_kaleido==4.0) a=mod(a,3.1415/2.0)*2.0;
else if(u_kaleido==6.0) a=mod(a,3.1415/3.0)*3.0;
else if(u_kaleido==-1.0) a=mod(a,3.1415/6.0)*6.0;
float zoom=1.0+u_audioBass*0.1;
vec2 newUV=vec2(cos(a),sin(a))*r/zoom+0.5;
vec4 color=texture2D(u_texture,newUV);
color.r+=sin(u_time*3.0)*0.2*u_intensity;
color.g+=cos(u_time*2.0)*0.2*u_intensity;
color.b+=sin(u_time*5.0)*0.2*u_intensity;
gl_FragColor=color;
}
`;

// Shader compilation, program setup, buffer, texture, uniforms, audio, controls...
// (Full code from previous `player.js` section)
