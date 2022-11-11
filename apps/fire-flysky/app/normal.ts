export const normVertShader = `attribute vec4 tangent;

uniform vec2 uvScale;
uniform vec3 lightPosition;

varying vec2 vUv;
varying mat3 tbn;
varying vec3 vLightVector;

void main() {
  vUv = uvScale * uv;

  /** Create tangent-binormal-normal matrix used to transform
      coordinates from object space to tangent space */
  vec3 vNormal = normalize(normalMatrix * normal);
  vec3 vTangent = normalize(normalMatrix * tangent.xyz);
  vec3 vBinormal = normalize(cross(vNormal, vTangent) * tangent.w);
  tbn = mat3(vTangent, vBinormal, vNormal);

  /** Calculate the vertex-to-light vector */
  vec4 lightVector = viewMatrix * vec4(lightPosition, 1.0);
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vLightVector = normalize(lightVector.xyz - modelViewPosition.xyz);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const normFragShader = `uniform sampler2D textureMap;
    uniform sampler2D normalMap;

    varying vec2 vUv;
    varying mat3 tbn;
    varying vec3 vLightVector;

    void main() {
        /** Transform texture coordinate of normal map to a range (-1, 1) */
        vec3 normalCoordinate = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;

        /** Transform the normal vector in the RGB channels to tangent space */
        vec3 normal = normalize(tbn * normalCoordinate.rgb);

        /** Lighting intensity is calculated as dot of normal vector and
            the vertex-to-light vector */
        float intensity = max(0.07, dot(normal, vLightVector));
        vec4 lighting = vec4(intensity, intensity, intensity, 1.0);

        /** Final color is calculated with the lighting applied */
        gl_FragColor = texture2D(textureMap, vUv) * lighting;
    }`;

export const xShaderVertex = `
uniform float amplitude;
attribute vec3 customColor;
attribute vec3 displacement;
varying vec3 vNormal;
varying vec3 vColor;

void main() {
  vNormal = normal;
  vColor = customColor;

  vec3 newPosition = position + normal * amplitude * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}`;

export const xShaderFragmen = `
varying vec3 vNormal;
varying vec3 vColor;

void main() {
  const float ambient = 0.4;
  vec3 light = vec3( 1.0 );
  light = normalize( light );
  float directional = max( dot( vNormal, light ), 0.0 );
  gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );
}`;
