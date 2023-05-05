import React, { Component } from "react";
import * as THREE from "three";
import { AxesHelper } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


class ThreeScene extends Component {
  componentDidMount() {
    // scene
    this.scene = new THREE.Scene();
    
    const scene = new THREE.Scene();
    // this.scene.add( new AxesHelper(5));
    scene.add(new AxesHelper(5));
    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //control
    const controls = new OrbitControls(camera,renderer.domElement);
    controls.minPolarAngle = controls.maxPolarAngle= Math.PI/2;
    controls.update();
    

    // this.scene.add(camera);
    scene.add(camera);
    //light
    const Light = new THREE.DirectionalLight(0xfffff, 2, 2) 
    Light.position.set(20,20,20);
   


    // this.scene.add(Light);
    scene.add(Light);
   



    const loader = new GLTFLoader();
    loader.load('abcd.glb',function(gltf){
        console.log(gltf)
        const root = gltf.scene;
        // this.scene.add(root)
        scene.add(root);
    })



    this.scene = scene;
    camera.position.z = 10;
    camera.position.y = 0;
    renderer.render(this.scene,camera);
   

    const animate = () => {
        requestAnimationFrame(animate);
  
        renderer.render(this.scene, camera);
      };
  
      animate()
    
  }

  render() {
    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;