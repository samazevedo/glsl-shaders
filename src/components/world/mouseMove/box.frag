uniform float u_time;
uniform vec3 u_color;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

float scaleValue(float value, float minOutput, float maxOutput){
    return minOutput + (maxOutput - minOutput) * value;
}


void main() {
    // Normalize mouse coords to [0,1]
    // float normalizedMouseX = u_mouse.x  / u_resolution.x ; 
    // float normalizedMouseY = u_mouse.y / u_resolution.y;
    
    // using mousemove to change the color 
    vec3 color = vec3(u_mouse.x /u_mouse.x  , u_mouse.x / u_mouse.y, u_mouse.y);

    // using time to change the color
    // vec3 color = vec3((sin(u_time) +1.0)/ 2.0, (cos(u_time)),(cos(u_time)+ 1.0/2.0));


    //blender color 
    // vec2 uv = gl_FragCoord.xy /u_resolution;
    // vec3 cl1 = vec3(0.43,0.7,0.4);
    // vec3 cl2 = vec3(0.0,0.2,0.25);
    // vec3 color = mix(cl1, cl2, uv.y);

 

    gl_FragColor = vec4(color, 1.0);

    
}