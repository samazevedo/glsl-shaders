uniform float u_time;
uniform vec3 u_color;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

float scaleValue(float value, float minOutput, float maxOutput){
    return minOutput + (maxOutput - minOutput) * value;
}


void main() {

    // using time to change the color
    vec3 color = vec3((sin(u_time) +1.0)/ 2.0, (cos(u_time)),(cos(u_time)+ 1.0/2.0));


    gl_FragColor = vec4(color, 1.0);   
}