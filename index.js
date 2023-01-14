import * as th from './three/build/three.module.js';
import {OrbitControls} from './three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from './three/examples/jsm/loaders/GLTFLoader.js'
import {FontLoader} from './three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from './three/examples/jsm/geometries/TextGeometry.js'

let camera, renderer, scene
let control

const model=()=>{

    let loader = new GLTFLoader()
    loader.load('./assets/model/scene.gltf', (gltf)=>{
        let dModel = gltf.scene
        dModel.position.set(0,16,0)

        dModel.castShadow = true
        dModel.receiveShadow = true

        scene.add(dModel)
    })
    
}

const light=()=>{

    let point=()=>{

        let pointL = new th.PointLight(0xFFFFFF,0.9,1000)
        pointL.position.set(-30,50,70)
        pointL.castShadow = true

        scene.add(pointL)
    }

    let spot=()=>{

        let spotL = new th.SpotLight(0xFAD5A5, 1, 1000)
        spotL.position.set(-50,50,160)
        spotL.castShadow = true

        scene.add(spotL)

    }
    point()
    spot()
}

const text=()=>{

    let loader = new FontLoader()
    let type = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json', font=>{
        let geo = new TextGeometry('MineZraft', {
            font: font,
            size: 20,
            height: 2,
            map: type
        })

        let mat = new th.MeshBasicMaterial({
            color: 0xFFFFFF,
        })

        let mesh = new th.Mesh(geo, mat)
        mesh.position.set(0,140,-140)
        geo.center()

        scene.add(mesh)
    })

}

const objects=()=>{

    let ground=()=>{

        let geo = new th.PlaneGeometry(200,200)
        let loader = new th.TextureLoader()
        let texture = loader.load('./assets/texture/grass.jpg')
        let mat = new th.MeshPhongMaterial({
            color: 0xFFFFFF,
            map: texture,
            side: th.DoubleSide
        })

        let mesh = new th.Mesh(geo, mat)
        mesh.position.set(0,0,0)
        mesh.rotation.set(Math.PI/2,0,0)
        mesh.receiveShadow = true


        scene.add(mesh)
    }

    let creeper=()=>{

        let head=()=>{
            
            let geo = new th.BoxGeometry(12,10,15)
            let loader = new th.TextureLoader()
            let texture = loader.load('./assets/texture/creeperBody.jpg')
            let mat = new th.MeshPhongMaterial({
                color: 0xFFFFFF,
                map: texture
            })

            let mesh = new th.Mesh(geo, mat)
            mesh.position.set(66,32,-60)
            mesh.rotation.set(0,-7,0)
            mesh.receiveShadow = true

            scene.add(mesh)
        }

        const eye=()=>{

            let Leye=()=>{

                let geo = new th.PlaneGeometry(2.5,2.5)
                let mat = new th.MeshPhongMaterial({
                    color: 0x000000
                })
                let mesh = new th.Mesh(geo,mat)
                mesh.position.set(58,33,-56)
                mesh.rotation.set(0,-7,0)
                mesh.receiveShadow = true

                scene.add(mesh)
            }

            let Reye=()=>{

                let geo = new th.PlaneGeometry(2.5, 2.5)
                let mat = new th.MeshPhongMaterial({
                    color: 0x000000
                })
                let mesh = new th.Mesh(geo, mat)
                mesh.position.set(63,33,-52)
                mesh.rotation.set(0,-7,0)
                mesh.receiveShadow = true
                
                scene.add(mesh)
            }

            Leye()
            Reye()
        }

        let body=()=>{

            let geo = new th.BoxGeometry(10,18,8)
            let loader = new th.TextureLoader()
            let texture = loader.load('./assets/texture/creeperBody.jpg')
            let mat = new th.MeshPhongMaterial({
                color: 0xFFFFFF,
                map: texture
            })

            let mesh = new th.Mesh(geo, mat)
            mesh.position.set(66,18,-60)
            mesh.rotation.set(0,-7,0)
            mesh.receiveShadow = true

            scene.add(mesh)
        }

        const legs=()=>{

            let Fleg=()=>{

                let geo = new th.BoxGeometry(12,9,5)
                let loader = new th.TextureLoader()
                let texture = loader.load('./assets/texture/creeperBody.jpg')
                let mat = new th.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    map: texture
                })

                let mesh = new th.Mesh(geo, mat)
                mesh.position.set(63,5,-57)
                mesh.rotation.set(0,-7,0)
                mesh.receiveShadow = true
                
                scene.add(mesh)
            }

            let Hleg=()=>{

                let geo = new th.BoxGeometry(12,9,5)
                let loader = new th.TextureLoader()
                let texture = loader.load('./assets/texture/creeperBody.jpg')
                let mat = new th.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    map: texture
                })

                let mesh = new th.Mesh(geo, mat)
                mesh.position.set(68,5,-64)
                mesh.rotation.set(0,-7,0)
                mesh.receiveShadow = true

                scene.add(mesh)
            }

            Fleg()
            Hleg()
        }

        head()
        eye()
        body()
        legs()
    }

    const firstTree=()=>{

        let trunk=(x,y,z)=>{

            let geo = new th.BoxGeometry(15,15,15,)
            let loader = new th.TextureLoader()
            let texture = loader.load('./assets/texture/trunk.jpg')
            let mat = new th.MeshPhongMaterial({
                color: 0xFFFFFF,
                map: texture
            })

            let mesh = new th.Mesh(geo, mat)

            mesh.receiveShadow = true
            mesh.position.set(x,y,z)

            scene.add(mesh)
        }

        let leaf=(x,y,z)=>{
            
            let geo = new th.BoxGeometry(15,15,15)
            let loader = new th.TextureLoader()
            let texture = loader.load('./assets/texture/leaves1.jpg')
            let mat = new th.MeshPhongMaterial({
                color: 0xFFFFFF,
                map: texture
            })

            let mesh = new th.Mesh(geo, mat)
            mesh.receiveShadow = true
            mesh.position.set(x,y,z)
            scene.add(mesh)
        }

        trunk(-60,8+(15*0),-55)
        trunk(-60,8+(15*1),-55)
        trunk(-60,8+(15*2),-55)
        trunk(-60,8+(15*3),-55)

    // Daun Tingkat 1

        // Bagian tengah
        leaf(-60,8+(15*4), -55)
        leaf(-60+(-15*1),8+(15*4), -55)
        leaf(-60+(-15*2),8+(15*4), -55)
        leaf(-60+(15*1),8+(15*4), -55)
        leaf(-60+(15*2),8+(15*4), -55)

        // Bagian depan
        leaf(-60+(-15*2),8+(15*4), -55+(15*1))
        leaf(-60+(-15*1),8+(15*4), -55+(15*1))
        leaf(-60+(-15*0),8+(15*4), -55+(15*1))
        leaf(-60+(15*1),8+(15*4), -55+(15*1))
        leaf(-60+(15*2),8+(15*4), -55+(15*1))

        // Bagian belakang
        leaf(-60+(15*2),8+(15*4), -55+(-15*1))
        leaf(-60+(15*1),8+(15*4), -55+(-15*1))
        leaf(-60+(15*0),8+(15*4), -55+(-15*1))
        leaf(-60+(15*-1),8+(15*4), -55+(-15*1))
        leaf(-60+(15*-2),8+(15*4), -55+(-15*1))

    //  Daun Tingkat 2

        // Bagian tengah
        leaf(-60,8+(15*5), -55)
        leaf(-60+(-15*1),8+(15*5), -55)
        leaf(-60+(-15*2),8+(15*5), -55)
        leaf(-60+(15*1),8+(15*5), -55)
        leaf(-60+(15*2),8+(15*5), -55)

        // Bagian depan
        leaf(-60+(-15*2),8+(15*5), -55+(15*1))
        leaf(-60+(-15*1),8+(15*5), -55+(15*1))
        leaf(-60+(-15*0),8+(15*5), -55+(15*1))
        leaf(-60+(15*1),8+(15*5), -55+(15*1))
        leaf(-60+(15*2),8+(15*5), -55+(15*1))

        // Bagian belakang
        leaf(-60+(15*2),8+(15*5), -55+(-15*1))
        leaf(-60+(15*1),8+(15*5), -55+(-15*1))
        leaf(-60+(15*0),8+(15*5), -55+(-15*1))
        leaf(-60+(15*-1),8+(15*5), -55+(-15*1))
        leaf(-60+(15*-2),8+(15*5), -55+(-15*1))

    // Daun Tingkat 3

        leaf(-60,8+(15*6), -55)
        leaf(-60+(-15*1),8+(15*6), -55)
        leaf(-60+(15*1),8+(15*6), -55)


    // Daun Tingkat 4

        leaf(-60,8+(15*7), -55)
    }

    const secondTree=()=>{
        let trunk=(x,y,z)=>{

            let geo = new th.BoxGeometry(15,15,15,)
            let loader = new th.TextureLoader()
            let texture = loader.load('./assets/texture/trunk.jpg')
            let mat = new th.MeshPhongMaterial({
                color: 0xFFFFFF,
                map: texture
            })

            let mesh = new th.Mesh(geo, mat)

            mesh.receiveShadow = true
            mesh.position.set(x,y,z)

            scene.add(mesh)
        }

        let leaf=(x,y,z)=>{
            
            let geo = new th.BoxGeometry(15,15,15)
            let loader = new th.TextureLoader()
            let texture = loader.load('./assets/texture/leaves1.jpg')
            let mat = new th.MeshPhongMaterial({
                color: 0xFFFFFF,
                map: texture
            })

            let mesh = new th.Mesh(geo, mat)
            mesh.receiveShadow = true
            mesh.position.set(x,y,z)
            scene.add(mesh)
        }

        trunk(50,8+(15*0),55)
        trunk(50,8+(15*1),55)

    // Daun Tingkat 1

        // Bagian Tengah
        leaf(50,8+(15*2),55)
        leaf(50,8+(15*2),55+(15*1))
        leaf(50,8+(15*2),55+(15*-1))

        // Bagian Depan
        leaf(50+(15*-1),8+(15*2),55+(15*-1))
        leaf(50+(15*-1),8+(15*2),55+(15*0))
        leaf(50+(15*-1),8+(15*2),55+(15*1))


        // Bagian Belakang
        leaf(50+(15*1),8+(15*2),55+(15*-1))
        leaf(50+(15*1),8+(15*2),55+(15*0))
        leaf(50+(15*1),8+(15*2),55+(15*1))

    // Daun Tingkat 2

        // Bagian Tengah
        leaf(50,8+(15*3),55)
        leaf(50,8+(15*3),55+(15*1))
        leaf(50,8+(15*3),55+(15*-1))

        // Bagian Depan
        leaf(50+(15*-1),8+(15*3),55+(15*-1))
        leaf(50+(15*-1),8+(15*3),55+(15*0))
        leaf(50+(15*-1),8+(15*3),55+(15*1))


        // Bagian Belakang
        leaf(50+(15*1),8+(15*3),55+(15*-1))
        leaf(50+(15*1),8+(15*3),55+(15*0))
        leaf(50+(15*1),8+(15*3),55+(15*1))
        // Daun Tingkat 3
        leaf(50,8+(15*4),55)
    }

    let Dskybox=()=>{

        let loader = new th.CubeTextureLoader()
        let texture = loader.load([
            './assets/skybox/skyboxDay/nx.png',
            './assets/skybox/skyboxDay/ny.png',
            './assets/skybox/skyboxDay/nz.png',
            './assets/skybox/skyboxDay/px.png',
            './assets/skybox/skyboxDay/py.png',
            './assets/skybox/skyboxDay/pz.png'
        ])
        scene.background = texture
    }

    let Nskybox=()=>{

        let loader = new th.CubeTextureLoader()
        let texture = loader.load([
            './assets/skybox/skyboxNight/ny.png',
            './assets/skybox/skyboxNight/nz.png',
            './assets/skybox/skyboxNight/px.png',
            './assets/skybox/skyboxNight/py.png',
            './assets/skybox/skyboxNight/nx.png',
            './assets/skybox/skyboxNight/pz.png'
        ])
        scene.background = texture
    }

    let sun=()=>{

        let geo = new th.SphereGeometry(15,64,64)
        let loader = new th.TextureLoader()
        let texture = loader.load('./assets/texture/sun.jpg')
        let mat = new th.MeshPhongMaterial({
            color: 0xFFD500,
            map: texture
        })

        let mesh = new th.Mesh(geo, mat)
        mesh.position.set(140,280,-600)

        scene.add(mesh)
    }

    let moon=()=>{
        
        let geo = new th.SphereGeometry(15,64,64)
        let loader = new th.TextureLoader()
        let texture = loader.load('./assets/texture/moon.jpg')
        let mat = new th.MeshPhongMaterial({
            color: 0xFFFFFF,
            map: texture
        })

        let mesh = new th.Mesh(geo, mat)
        mesh.position.set(140,280,-600)
        scene.add(mesh)
    }
    ground()
    creeper()
    firstTree()
    secondTree()
    // Dskybox()
    Nskybox()
    // sun()
    moon()
    model()
}

let init=()=>{

    scene = new th.Scene()

    let height = innerHeight
    let width = innerWidth

    let aspect = width / height
    let fov = 45
    camera = new th.PerspectiveCamera(fov, aspect)
    camera.position.set(0,50,220)
    camera.lookAt(0,0,0)

    renderer = new th.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.updateShadowMap= true

    control = new OrbitControls(camera, renderer.domElement)
    document.body.appendChild(renderer.domElement)

    light()
    text()
    objects()
}

let render=()=>{
    requestAnimationFrame(render)
    control.update()
    // camera.lookAt(camera.target)
    renderer.render(scene, camera)
}

window.onload=()=>{
    init()
    render()
}