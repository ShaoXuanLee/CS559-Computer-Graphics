/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class GrSimpleCurve extends GrObject{
    constructor(params = {}){
        const group = new T.Group();
        const curve = new T.CatmullRomCurve3( [
            new T.Vector3( -30, 0, -30 ),
            new T.Vector3( -30, 0, 30),
            new T.Vector3( 30, 0, 30 ),
            new T.Vector3( 30, 0, -30 )
        ] ,true);
        
        const points = curve.getPoints( 50 );
        const geometry = new T.BufferGeometry().setFromPoints( points );
        
        const material = new T.LineBasicMaterial( { color: 0xff0000 } );
        
        // Create the final object to add to the scene
        const curveObject = new T.Line( geometry, material );
        curveObject.translateY(1);
        group.add(curveObject);

        let train = new T.Group();
        
		let basegeom = new T.BoxGeometry( 2, 2, 4 );
		let basemat = new T.MeshStandardMaterial({color:"red", metalness:0.5, roughness:0.7});
        let base = new T.Mesh(basegeom, basemat);
        base.translateY(1);
        train.add(base);

        
        let wheelgeom = new T.CylinderGeometry( 0.5, 0.5, 2.2, 15 );
        let wheelmat = new T.MeshStandardMaterial({color:"white", metalness:0.5, roughness:0.7});
        let wheel1 = new T.Mesh(wheelgeom, wheelmat);
        let wheel2 = new T.Mesh(wheelgeom, wheelmat);
        let wheel3 = new T.Mesh(wheelgeom, wheelmat);
        wheel1.translateZ(1.5);
        wheel1.translateX(0);
        wheel1.rotateZ(Math.PI/2);
        wheel2.translateZ(0);
        wheel2.translateX(0);
        wheel2.rotateZ(Math.PI/2);
        wheel3.translateZ(-1.5);
        wheel3.translateX(0);
        wheel3.rotateZ(Math.PI/2);
        train.add(wheel1, wheel2, wheel3);

        let horngeom = new T.CylinderGeometry( 1, 0.5, 2 );
		let hornmat = new T.MeshStandardMaterial({color:"black", metalness:0.5, roughness:0.7});
        let horn = new T.Mesh(horngeom, hornmat);
        horn.translateZ(1);
        horn.translateY(3);
        train.add(horn);
        train.translateY(3);
        group.add(train);
        super('trainsystem', group);
        this.whole_ob = group;
        this.train = train;
        this.curve = curve;
        this.time = 0;
    }

    stepWorld(delta, timeOfDay){
        this.time += delta / 6000;
        this.train.position.copy(this.curve.getPoint(this.time));
        this.train.lookAt(new T.Vector3().addVectors(this.train.position, this.curve.getTangent(this.time)));
    }
}
