import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let simpleTree1Count = 0;
const coneGeometry = new T.ConeGeometry();
const cylinderGeometry = new T.CylinderGeometry();
const greenMaterial = new T.MeshPhongMaterial({ color: "green" });
const trunkmaterial = new T.MeshPhongMaterial({ color: "#3C321E" });
export class GrSimpleTree1 extends GrObject {
  constructor(params = {}) {
    const tree = new T.Group();
    super(`SimpleTree1-${++simpleTree1Count}`, tree);
    const height = params.height || 1; 
    const x = params.x || 0; 
    const y = params.y || 0; 
    const z = params.z || 0; 
    const cone = new T.Mesh(coneGeometry, greenMaterial);
    const stem = new T.Mesh(cylinderGeometry, trunkmaterial);
    cone.scale.set(1, height * 0.75, 1);
    cone.translateY(height * (0.25 + 0.75 * 0.5)); 
    stem.scale.set(0.2, height * 0.25, 0.2);
    stem.translateY(height * 0.25 * 0.5); 
    tree.add(cone, stem);
    tree.position.set(x, y, z);
    tree.scale.set(1, 1, 1);
  }
}

//snow
const textureLoader = new T.TextureLoader();
const snowtex = textureLoader.load("./images/snowflake.png");
const geometry = new T.BufferGeometry();
let position = [];
let velocity = [];
let particles;
const numOfSnow = 500;
const maxRange = 40;
const minRange = maxRange/2;
const minHeight = 50;

let snowmat = new T.PointsMaterial({
    size: 1,
    map: snowtex,
    transparent: true,
    opacity: 0.7,
    depthTest: false,
    blending: T.AdditiveBlending
});

makeSnow();
export class GrSimpleSnow extends GrObject{
    constructor(params = {}){
        
        particles = new T.Points(geometry, snowmat);
        particles.translateX(-20);
        particles.translateZ(-20);
        super(`Snow`, particles);
    }

    stepWorld(delta, timeOfDay) {
        for(let i = 0; i < numOfSnow*3; i+=3){
            particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
            particles.geometry.attributes.position.array[i+1] -= particles.geometry.attributes.velocity.array[i+1];
            particles.geometry.attributes.position.array[i+2] -= particles.geometry.attributes.velocity.array[i+2];

            if(particles.geometry.attributes.position.array[i+1] < 0){
                particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange);
                particles.geometry.attributes.position.array[i+1] = Math.floor(Math.random() * minRange + minHeight);
                particles.geometry.attributes.position.array[i+2] = Math.floor(Math.random() * maxRange - minRange);
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }
}

function makeSnow(){
    for(let i = 0; i<numOfSnow; i++){
        position.push(
            Math.floor(Math.random() * maxRange - minRange),
            Math.floor(Math.random() * minRange + minHeight),
            Math.floor(Math.random() * maxRange - minRange));

        velocity.push(
            Math.floor(Math.random()* 3 - 3) * 0.1,
            Math.floor(Math.random()* 3 + 0.12) * 0.18,
            Math.floor(Math.random()* 3 - 3) * 0.1
        );
    }
    geometry.setAttribute('position', new T.Float32BufferAttribute(position, 3));
    geometry.setAttribute('velocity', new T.Float32BufferAttribute(velocity, 3));
}

let fire_height = 0.4;
let texture = new T.TextureLoader().load("./images/Sun.jpg");
let geom = new T.SphereGeometry(4);
let shadermat = new T.ShaderMaterial("./shader.vs", "./shader.fs",{

    texture : {value: texture},
    fire_height : {value: fire_height},
    radius : {value: 0.3},
    height : {value: 0.3},
    pointLightColor: {value: new T.Vector3(1,1,0) },
    pointLightPosition: {value: new T.Vector3(1,2,3) },
});
export class GrSun extends GrObject{
    constructor(params = {}){
        let sun = new T.Mesh(geom, shadermat);
        super('sun', sun);
        this.shaderMat = shadermat;
		this.time = 0;
		let scale = 1;
		this.sun = sun;
		sun.scale.set(scale, scale, scale);
		sun.translateY(22.5);
        sun.translateX(-20);
		sun.translateZ(-20);
    }
    advance(delta,timeOfDay) {
		this.time += 0.002 * delta;
		this.sun.rotation.set(0,this.time,0);
		this.shaderMat.uniforms.fire_height.value = this.time % 2-0.5;
	}
}