import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

const textureLoader = new T.TextureLoader();
let simpleHouse1Count = 0;
const boxGeometry = new T.BoxGeometry();
const triangle = new T.Shape();
triangle.moveTo(0, 1);
triangle.lineTo(-0.5, 0);
triangle.lineTo(0.5, 0);
triangle.lineTo(0, 1);
const triangleGeometry = new T.ExtrudeGeometry(triangle, { depth: 1, bevelEnabled: false });
const simpleHouse1Texture = textureLoader.load("./images/simpleHouse1-front.png");
const simpleHouseMaterials = new T.MeshPhongMaterial({ color: "white" });
const simpleHouse1TextureMaterials = new T.MeshPhongMaterial({ color: "white", map: simpleHouse1Texture });
export class GrSimpleHouse1 extends GrObject {
  constructor(params = {}) {
    const house = new T.Group();
    super(`SimpleHouse1-${++simpleHouse1Count}`, house);
    const x = params.x || 0; // Position x
    const y = params.y || 0; // Position y
    const z = params.z || 0; // Position z
    const door = simpleHouse1TextureMaterials;
    const wall = simpleHouseMaterials;
    const base = new T.Mesh(boxGeometry, [wall, wall, wall, wall, door, door]);
    const roof = new T.Mesh(triangleGeometry, wall);
    base.scale.set(1, 1, 1);
    base.translateY(0.5); 
    roof.scale.set(1, 0.5, 1);
    roof.position.set(0, 1, -0.5); 
    house.add(base, roof);
    house.position.set(x, y, z); 

    this.whole_ob = house;
        let scale = params.size ? Number(params.size) : 1;
        this.whole_ob.scale.set(scale,scale,scale);
        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0: 
                break;
            case 1:
                house.rotation.y = Math.PI/2;
                break;
            case 2:
                house.rotation.y = -Math.PI/2;
                break;
        } 
  }
}

//body
let geometry = new T.BufferGeometry();
//first step set the vertices
const vertices = new Float32Array([
    0,0,0,  2,0,0,  2,0,2,  0,0,2,  //bottom surface 0123
    0,1,0,  2,1,0,  2,1,2,  0,1,2,  //top surface   4567
    2,0,0,  2,0,2,  2,1,2,  2,1,0,  //right 8 9 10 11
    0,0,0,  0,0,2,  0,1,2,  0,1,0,  //left 12 13 14 15
    0,0,2,  2,0,2,  2,1,2,  0,1,2,   //front 16 17 18 19
    0,0,0,  2,0,0,  2,1,0,  0,1,0,  //back  20 21 22 23
]);
geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));
//left bottom and back need to be clockwise
let indices = [
    0,2,3,  0,1,2,  //bottom
    6,5,4,  7,6,4,  //top
    10,9,8, 11,10,8,    //right
    12,14,15,   12,13,14,    //left
    16,17,18,   16,18,19,   //back
    23,22,20,   22,21,20    //front
];
geometry.setIndex(indices);
let uvs = new Float32Array([
    0,0,    0.5,0,  0.5,1, 0,1, //bot
    0,0,    0.5,0,  0.5,1, 0,1, //top
    0.5,0,   1,0,   1,1, 0.5,1, //right
    0.5,0,   1,0,   1,1, 0.5,1, //left
    0,0,    0.5,0,  0.5,1, 0,1, //back
    0,0,    0.5,0,  0.5,1, 0,1  //front
]);

//windows
let recgeom = new T.BoxGeometry(1, 1, 0.1);
geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));
let simpleHouse2Count = 0;
let t1 = new T.TextureLoader().load("./images/wall32.jpg");
let t2 = new T.TextureLoader().load("./images/roof1.jpg");
let t3 = new T.TextureLoader().load("./images/window2.jpg");
let t4 = new T.TextureLoader().load("./images/door1.jpg");
let housemat = new T.MeshPhongMaterial({map: t1});
let windowmat = new T.MeshPhongMaterial({map: t3});
let roofmat = new T.MeshPhongMaterial({map: t2});
let doormat = new T.MeshPhongMaterial({map: t4});
export class GrSimpleHouse2 extends GrObject{
    constructor(params = {}){
        const house = new T.Group();
        super(`SimpleHouse2-${++simpleHouse2Count}`, house);
        const x = params.x || 0; // Position x
        const y = params.y || 0; // Position y
        const z = params.z || 0; // Position z
        const door = new T.Mesh(recgeom,doormat);
        door.position.set(1.2,0.5,1.99);
        door.scale.set(0.5, 0.9, 0.5);
        house.add(door);
        const base = new T.Mesh(geometry, housemat);
        const roof = new T.Mesh(triangleGeometry, roofmat);
        base.scale.set(1, 1, 1);
        roof.scale.set(2, 0.5, 2);
        roof.position.set(1, 1, 0); 
        house.add(base, roof);
        house.position.set(x, y, z); 
        const windows = new T.Mesh(recgeom, windowmat);
        windows.scale.set(0.5,0.5,0.5);
        windows.position.set(0.5,0.5,1.99);
        house.add(windows);

        this.whole_ob = house;
        let scale = params.size ? Number(params.size) : 1;
        this.whole_ob.scale.set(scale,scale,scale);
        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0: 
                break;
            case 1:
                house.rotation.y = Math.PI/2;
                break;
            case 2:
                house.rotation.y = -Math.PI/2;
                break;
        } 
    }
    
}

let simpleHouse3Count = 0;
let chimneygeom = new T.BoxGeometry( 0.3, 0.5, 0.3 );
let chimneymat = new T.MeshStandardMaterial({color:"white", metalness:0.2, roughness:0.5});
let t5 = new T.TextureLoader().load("./images/wall4.jpg");
let t6 = new T.TextureLoader().load("./images/roof2.jpg");
let t7 = new T.TextureLoader().load("./images/window1.jpg");
let t8 = new T.TextureLoader().load("./images/door3.jpg");
let housemat1 = new T.MeshPhongMaterial({map: t5});
let roofmat1 = new T.MeshPhongMaterial({map: t6});
let windowmat1 = new T.MeshPhongMaterial({map: t7});
let doormat1 = new T.MeshPhongMaterial({map: t8});
export class GrSimpleHouse3 extends GrObject{
    constructor(params = {}){
        let chimney = new T.Mesh(chimneygeom, chimneymat);
        chimney.translateY(1.4);
        chimney.translateZ(1.3);
        chimney.translateX(0.5);
        const house = new T.Group();
        super(`SimpleHouse3-${++simpleHouse3Count}`, house);
        const x = params.x || 0; // Position x
        const y = params.y || 0; // Position y
        const z = params.z || 0; // Position z
        const door = new T.Mesh(recgeom,doormat1);
        door.position.set(1.2,0.5,1.99);
        door.scale.set(0.5, 0.9, 0.5);
        house.add(door);
        const base = new T.Mesh(geometry, housemat1);
        const roof = new T.Mesh(triangleGeometry, roofmat1);
        base.scale.set(1, 1, 1);
        roof.scale.set(2, 0.5, 2);
        roof.position.set(1, 1, 0); 
        house.add(base, roof);
        house.position.set(x, y, z); 
        const windows = new T.Mesh(recgeom, windowmat1);
        windows.scale.set(0.5,0.5,0.5);
        windows.position.set(0.5,0.5,1.99);
        house.add(windows);
        house.add(chimney);

        this.whole_ob = house;
        let scale = params.size ? Number(params.size) : 1;
        this.whole_ob.scale.set(scale,scale,scale);
        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0: 
                break;
            case 1:
                house.rotation.y = Math.PI/2;
                break;
            case 2:
                house.rotation.y = -Math.PI/2;
                break;
        } 
    }
    
}


let size = 70;
let roadgeom1 = new T.BoxGeometry( size * 0.8, 0.02, 4 );
let roadgeom2 = new T.BoxGeometry( 3, 0.05, size * 0.8 );
let roadmat = new T.MeshStandardMaterial({color:"grey", metalness:0, roughness:1});
export class GrRoad extends GrObject {
    constructor() {
        let roads = new T.Group();
        let road1 = new T.Mesh(roadgeom1, roadmat);
        let road2 = new T.Mesh(roadgeom1, roadmat);
        let road3 = new T.Mesh(roadgeom2, roadmat);
        let road4 = new T.Mesh(roadgeom2, roadmat);
        road1.translateZ(size/5);
        road2.translateZ(-size/5);
        road3.translateX(size/5);
        road4.translateX(-size/5);
        roads.add(road1, road2, road3, road4);
        roads.translateY(0.1);
        super("Roads",roads);
    }
}

let lighthousecount = 0;
export class GrSimpleLightHouse extends GrObject {
    constructor(params={}) {
        
        let holder = new T.Group();
        let lighthouse;
        let loader = new OBJLoader();
	    loader.load('./images/lighthouse.obj', function(obj)
	    {
		    lighthouse = obj;
		    lighthouse.position.set(0, 3.5, 0);
		    lighthouse.scale.set(0.3,0.3,0.3);
		    holder.add(lighthouse);
		    lighthouse.translateY(1.0);
	    });
        super(`Lighthouse-${lighthousecount++}`,holder);
        this.whole_ob = holder;
        holder.rotateX(-Math.PI/2);
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
		this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        holder.scale.set(scale,scale,scale);
        this.rotate = params.rotate ? Number(params.rotate) : 0;
        switch(this.rotate) {
            case 0: 
                break;
            case 1:
                holder.rotation.y = Math.PI/2;
                break;
            case 2:
                holder.rotation.y = -Math.PI/2;
                break;
            case 3:
                holder.rotation.y = Math.PI;
                break;
        } 
    }
}
