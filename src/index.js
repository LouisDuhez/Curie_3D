import * as THREE from "three";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";

//Responsive
const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

//Scène
const scene = new THREE.Scene(); 
const aspect = window.innerWidth / window.innerHeight;

//Caméra
const camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 20);

const initialCameraPosition = new THREE.Vector3(0, 0.4, 2); 
const targetCameraPosition = new THREE.Vector3(0, 0.4, 1.3); 
camera.position.copy(initialCameraPosition);

const initialLookAt = new THREE.Vector3(0, 0.4, 0); 
const currentLookAt = initialLookAt.clone(); 


//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Build
const loader = new GLTFLoader();
loader.load('/scene.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            // Vérifie si l'objet a déjà une texture
            if (child.material.map) {
                console.log("Texture détectée :", child.material.map);
            } else {
                console.warn("Pas de texture trouvée sur :", child.name);
            }

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    gltf.scene.position.set(-0.27, 0, 0);
    scene.add(gltf.scene);
});
//Frames
const button = `<button class="close-info-frame"><i class="fa-solid fa-arrow-left"></i></button>`
const frameInfo = {
    "frame1": `
    <a  class="btn-laboratory" href="https://mariecurielaboratoire.duhez.butmmi.o2switch.site/">
        <div class="arrow"><div class="point"></div><div class="line"></div> <div class="dot"></div><div class="button-text">Découvrir&nbsp;son&nbsp;laboratoire</div>
    </a>
    <div class="text-container">
        <h2>Radioactivité : Entre promesses et périls</h2>
        <p>À la fin du XIXᵉ siècle, une découverte bouleverse le monde scientifique : la radioactivité. Mise en évidence par Henri Becquerel et approfondie par Pierre et Marie Curie, elle révèle que certains éléments, comme l’uranium et le radium, émettent spontanément un rayonnement invisible et puissant.<br> <br>

        C’est dans son laboratoire que Marie Curie consacre des années de travail acharné à l’étude de ces mystérieux éléments. Entourée de fioles, de tubes et d’appareils de mesure rudimentaires, elle isole le radium et le polonium, mettant en lumière des propriétés jusque-là inconnues de la matière. Ce lieu devient le cœur de ses recherches, où elle repousse les limites de la science malgré des conditions de travail difficiles et les risques liés à l’exposition prolongée aux radiations.
<br> <br>
        Grâce à son dévouement, la radioactivité révolutionne non seulement la physique, mais aussi la médecine. Ses découvertes ouvrent la voie à des avancées majeures, comme les traitements contre le cancer et l’imagerie médicale. Pourtant, cette formidable énergie se révélera aussi redoutable, utilisée aussi bien pour soigner que pour détruire. De la radiothérapie aux centrales nucléaires, en passant par la bombe atomique, la radioactivité incarne à la fois un immense progrès et un défi éthique majeur pour l’humanité.</p>
        ${button}
        
    </div>
    `,
    "frame2": `<div class="text-container">
        <h2>Marie Curie : Un voyage vers l'inconnu </h2>
        <p>Née en 1867 à Varsovie, sous domination russe, Marie Curie se distingue dès son plus jeune âge. À quatre ans, elle sait déjà lire et écrire, et à quinze ans, elle obtient son baccalauréat. Mais en Pologne, les femmes sont exclues des études supérieures. À vingt-quatre ans, après plusieurs années de sacrifices, elle part pour Paris, déterminée à étudier les mathématiques et la physique à la Sorbonne.<br> <br>
        En 1893, elle décroche son diplôme en physique, suivi de celui en mathématiques en 1894. Mais Marie ne s’arrête pas là. L’ambition de percer les mystères de la science la pousse à rechercher un laboratoire pour approfondir ses études. C’est alors qu'elle obtient un contrat modeste, financé par la Société pour l’encouragement de l'industrie nationale (SEIN), pour mesurer les propriétés magnétiques de divers aciers. C’est dans ce laboratoire qu'elle croise Pierre Curie, un homme qui deviendra bien plus qu’un collègue, mais l’âme sœur avec qui elle partagera ses découvertes extraordinaires..<br> <br>
        Avant de percer les mystères de la radioactivité, Marie Curie trace son chemin avec une détermination et une passion sans égales, prête à bouleverser la science.</p>
        ${button}
    </div>
    `,
    "frame3": `<div class="text-container">
        <h2>Au prix de la science : Le sacrifice de Marie Curie</h2>
        <p>Marie Curie meurt le 4 juillet 1934, des suites d'une anémie pernicieuse, une maladie liée à l'exposition prolongée aux radiations. Tout au long de sa carrière, elle a travaillé sans relâche, manipulant des substances radioactives sans connaître les dangers qu’elles représentaient. Sa passion pour la science et sa quête de découverte l'ont poussée à repousser ses limites, jusqu'à ce que cette même passion la ronge..<br> <br>
        Malgré les avertissements, elle n’a jamais cessé de consacrer son corps et son esprit à ses recherches, ignorant les risques invisibles mais mortels liés à la radioactivité. En fin de compte, c’est cette même quête de la vérité scientifique qui lui a coûté la vie..<br> <br>
        Marie Curie, icône de la science, est restée un modèle de dévouement. Ce n’est qu’en 1995, plus de six décennies après sa mort, que ses cendres, ainsi que celles de son mari Pierre, ont été transférées au Panthéon, en hommage à son incroyable héritage.</p>
        ${button}
    </div>
    `,
    "frame4": `<div class="text-container">
        <h2>Deux prix Nobel, mille obstacles : Le combat de Marie Curie</h2>
        <p>En 1903, Marie Curie reçoit le Prix Nobel de physique, partagé avec son mari Pierre et Henri Becquerel, pour leurs travaux sur la radioactivité. Elle devient ainsi la première femme à recevoir cette distinction. Cependant, malgré cette reconnaissance, Marie ressent une profonde déception : son rôle est souvent minimisé, et c'est son mari qui est souvent mis en avant..<br> <br>
        En 1911, elle surmonte ces obstacles et obtient un second Prix Nobel, cette fois en chimie, pour ses découvertes du radium et du polonium. Elle devient la première personne à recevoir deux Prix Nobel dans des disciplines différentes. Ce nouveau prix, bien que symbolique de son génie, ne change pas la perception des milieux scientifiques, et Marie continue à se battre pour être reconnue à sa juste valeur..<br> <br>
        Marie Curie est bien plus qu’une figure scientifique : elle incarne la lutte contre les préjugés et l'injustice, ouvrant la voie à une égalité encore trop distante pour les femmes dans le domaine scientifique.</p>
        ${button}
    </div>
    `,
    "frame5": `<div class="text-container">
        <h2>Les Petites Curies : La science au secours des blessés</h2>
        <p>Pendant quatre ans, la radiologie devient une arme au service des blessés. Marie Curie, accompagnée de sa fille Irène et de trois autres femmes, se consacre à la formation d’infirmières et au développement de la radiologie mobile. Grâce à son engagement, 18 véhicules sont équipés d’appareils à rayons X, permettant d’apporter la science au plus près des zones de combat. Ces unités mobiles offrent aux médecins un moyen inédit de localiser avec précision les éclats d’obus et les fractures, facilitant ainsi des interventions plus sûres et rapides..<br> <br>
        Surnommées plus tard les “Petites Curies” par sa fille Ève, ces unités rejoignent les convois militaires et viennent compléter les équipements de l’armée. Grâce à elles, plus d’un million de soldats bénéficient d’un diagnostic précis, évitant ainsi de nombreuses amputations inutiles. Cette avancée majeure ne transforme pas seulement la médecine de guerre : elle marque un tournant décisif dans l’utilisation de la radiologie et ouvre la voie à son développement dans les hôpitaux civils. Ainsi, en pleine tourmente, la science s’impose comme un espoir face aux ravages du conflit.</p>
        ${button}
    </div>
    `
};


const loaderTexture = new THREE.TextureLoader();
const frames = [];

function createFrame(url, position, rotation, name) {
    loaderTexture.load(
        url,
        function (texture) {
            const laboratory = new THREE.MeshStandardMaterial({ map: texture });
            const materials = [
                new THREE.MeshStandardMaterial({ color: 0X909090 }), // left side
                new THREE.MeshStandardMaterial({ color: 0X909090 }), // right side
                new THREE.MeshStandardMaterial({ color: 0X909090 }), // top side
                new THREE.MeshStandardMaterial({ color: 0X909090 }), // bottom side
                laboratory, // front side with texture
                new THREE.MeshStandardMaterial({ color: 0X909090 })  // back side
            ];
            const boxGeometry = new THREE.BoxGeometry(0.45, 0.63, 0.05);
            const frame = new THREE.Mesh(boxGeometry, materials);
            frame.position.set(...position);
            frame.rotation.set(...rotation);
            frame.castShadow = true; 
            frame.receiveShadow = true; 
            frame.name = name; // Assigner un nom unique à chaque frame
            scene.add(frame);
            frames.push(frame); 
        },
        undefined,
        function (err) {
            console.error('An error happened.');
        }
    );
}

createFrame('/textures/Marielaboratory.jpg', [0, 0.45, 0.12], [0, 0, 0], "frame1");
createFrame('/textures/Varsovie.jpg', [-1.3, 0.45, -0.45], [0, 1.5708, 0], "frame2");
createFrame('/textures/Atom.jpg', [-0.95, 0.45, -1.1], [0, 0, 0], "frame3");
createFrame('/textures/nobel.jpg', [0.95, 0.45, -1.1], [0, 0, 0], "frame4");
createFrame('/textures/war.jpg', [1.3, 0.45, -0.45], [0, -1.5708, 0], "frame5");


//Light
// const pointLight = new THREE.PointLight(new THREE.Color(129 / 255, 203 / 255, 84 / 255), 0.8); 
const pointLight = new THREE.PointLight(0x81CB54, 0.8); 
pointLight.position.set(0, 0.5, -0.5);
pointLight.castShadow = true; 
pointLight.shadow.bias = -0.001;
pointLight.shadow.mapSize.width = 2048; 
pointLight.shadow.mapSize.height = 2048; 
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); 
scene.add(ambientLight);

const rectlightyellow = new THREE.RectAreaLight(0xFFFFFF, 0.3, 1.5, 1); 
rectlightyellow.position.set(0, 1, 0.8);
rectlightyellow.lookAt(0, 0.5, -1.5);
scene.add(rectlightyellow);

//backSpotlight
const backSpotLight = new THREE.SpotLight(0xEBBD04, 1); 
backSpotLight.position.set(0, 0.8, 1.5);
backSpotLight.angle = Math.PI / 4;
backSpotLight.penumbra = 0.5;
backSpotLight.decay = 2;
backSpotLight.castShadow = true; 
backSpotLight.shadow.bias = -0.001; 
backSpotLight.shadow.mapSize.width = 2048; 
backSpotLight.shadow.mapSize.height = 2048; 
backSpotLight.target.position.set(0, 0, 0);
scene.add(backSpotLight);
scene.add(backSpotLight.target);

const listSpotlight = []

function createSpotlight(color, target, position) {
    const spotlight = new THREE.SpotLight(color, 0.4); 
    spotlight.position.set(...position);
    spotlight.angle = Math.PI / 3.5;
    spotlight.penumbra = 0.8;
    spotlight.decay = 2;
    spotlight.castShadow = true; 
    spotlight.shadow.bias = -0.001; 
    spotlight.shadow.mapSize.width = 2048; 
    spotlight.shadow.mapSize.height = 2048; 
    spotlight.target.position.set(...target);
    spotlight.userData.targetColor = new THREE.Color(0xffffff); 
    listSpotlight.push(spotlight)
    scene.add(spotlight);
    scene.add(spotlight.target);
}

createSpotlight(0xffffff, [0, 0.3, 0], [0, 0.93, 0.4]); //Front
createSpotlight(0xFFFFFF, [-1.3, 0.45, -0.45], [-1.1, 0.93, -0.45]);//Left
createSpotlight(0xFFFFFF, [1.3, 0.45, -0.45], [1.1, 0.93, -0.45]);//Right
createSpotlight(0xffffff, [-0.95, 0.45, -1.1], [-0.95, 0.93, -0.9]);//Left Back
createSpotlight(0xffffff, [0.95, 0.5, -1.1], [0.95, 0.93, -0.9]);//Right Back

pointLight.intensity = 0;
ambientLight.intensity = 0;
rectlightyellow.intensity = 0;
backSpotLight.intensity = 0;
listSpotlight.forEach(light => light.intensity = 0);


//Raycaster

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2()


window.addEventListener('mousemove', onMouseMove, false);
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    
    listSpotlight.forEach(spotlight => {
        spotlight.userData.targetColor.set(0xffffff); 
    });

    const intersects = raycaster.intersectObjects(frames);

    if (intersects.length > 0) {
        const intersectedFrame = intersects[0].object;

        let closestSpotlight = null;
        let minDistance = Infinity;

        listSpotlight.forEach(spotlight => {
            const distance = spotlight.position.distanceTo(intersectedFrame.position);
            if (distance < minDistance) {
                minDistance = distance;
                closestSpotlight = spotlight;
            }
        });

        if (closestSpotlight) {
            closestSpotlight.userData.targetColor.set(0x81CB54);
        }
    }
}

const cameraPositions = [
    { frame: [0, 0.45, 0.12], cameraPosition: new THREE.Vector3(0.4, 0.45, 0.9), lookAt: new THREE.Vector3(0.4, 0.45, 0) },
    { frame: [-1.3, 0.45, -0.45], cameraPosition: new THREE.Vector3(-1.3+0.8, 0.45, -0.45-0.4), lookAt: new THREE.Vector3(-1.3, 0.45, -0.45-0.4) },
    { frame: [-0.95, 0.45, -1.1], cameraPosition: new THREE.Vector3(-0.95+0.4, 0.45, -1.1+0.8), lookAt: new THREE.Vector3(-0.95+0.4, 0.45, -1.1) },
    { frame: [0.95, 0.45, -1.1], cameraPosition: new THREE.Vector3(0.95-0.4, 0.45, -1.1+0.8), lookAt: new THREE.Vector3(0.95-0.4, 0.45, -1.1) },
    { frame: [1.3, 0.45, -0.45], cameraPosition: new THREE.Vector3(1.3-0.8, 0.45, -0.45-0.4), lookAt: new THREE.Vector3(1.3, 0.45, -0.45-0.4) }
];

window.addEventListener('click', onMouseClick, false);


function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(frames);

    if (intersects.length > 0) {
        const intersectedFrame = intersects[0].object;
        const framePosition = intersectedFrame.position;

        const cameraPos = cameraPositions.find(pos => {
            return new THREE.Vector3(...pos.frame).equals(framePosition);
        });

        if (cameraPos) {
            gsap.to(camera.position, {
                duration: 3,
                x: cameraPos.cameraPosition.x,
                y: cameraPos.cameraPosition.y,
                z: cameraPos.cameraPosition.z,
                ease: "power2.inOut"
            });

            gsap.to(currentLookAt, {
                duration: 3,
                x: cameraPos.lookAt.x,
                y: cameraPos.lookAt.y,
                z: cameraPos.lookAt.z,
                ease: "power2.inOut"
            });

            // Mettre à jour le texte de #frame-info
            const frameInfoElement = document.getElementById('frame-info');
            const frameName = intersectedFrame.name;
            if (frameInfo[frameName]) {
                frameInfoElement.innerHTML = frameInfo[frameName];
                frameInfoElement.style.opacity = 1;
                


                if (frameName === 'frame4' || frameName === 'frame5') {
                    frameInfoElement.style.right =''
                    frameInfoElement.style.left = '0%'
                    frameInfoElement.style.background = "linear-gradient(270deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)";
                    document.querySelector('#frame-info div').style.marginRight = '';
                    document.querySelector('#frame-info div').style.marginLeft = '100px';
                    frameInfoElement.style.justifyContent = 'start';
                    gsap.from(frameInfoElement, {
                        duration: 3.5,
                        left:'-100%',
                        ease: 'power1.inOut'
                    });
                } else {
                    frameInfoElement.style.left = ''
                    frameInfoElement.style.right = '0%'
                    frameInfoElement.style.background = "linear-gradient(90deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0.5)50%, rgba(0,0,0,0.8) 100%)";
                    document.querySelector('#frame-info div').style.marginLeft = '';
                    document.querySelector('#frame-info div').style.marginRight = '';
                    frameInfoElement.style.justifyContent = 'end';
                    gsap.from(frameInfoElement, {
                        duration: 3.5,
                        right: '-100%',
                        ease: 'power1.inOut'
                    });
                }
                document.querySelector('.close-info-frame').addEventListener('click', (e)=> {
                    e.stopPropagation();
                    gsap.to(camera.position, {
                                duration: 2,
                                x: 0,
                                y: 0.4,
                                z: 1.3,
                                ease: "power2.inOut"
                            });
                    
                            gsap.to(currentLookAt, {
                                duration: 2,
                                x: initialLookAt.x,
                                y: initialLookAt.y,
                                z: initialLookAt.z,
                                ease: "power2.inOut"
                            });
                    
                            // Réinitialiser le texte si aucune frame n'est sélectionnée
                            document.getElementById('frame-info').style.opacity = 0;
                })
            }
        }
    } 
}




const InitialCameraLook = new THREE.Vector3(0, 0.4, 0);
const targetCameraLook = InitialCameraLook;

//Clock
const clock = new THREE.Clock();

//Animation
const animation = () => {
    const elapsedTime = clock.getElapsedTime();

    camera.lookAt(currentLookAt);


    listSpotlight.forEach(spotlight => {
        spotlight.color.lerp(spotlight.userData.targetColor, 0.1); 
    });

    //Render
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}
animation();

const timeline = gsap.timeline({ delay: 0.5 });

timeline.to(camera.position, {
    duration: 2,
    x: targetCameraPosition.x,
    y: targetCameraPosition.y,
    z: targetCameraPosition.z,
    ease: "power2.inOut",
    onUpdate: () => {
        camera.lookAt(targetCameraLook);
    }
})
.to(listSpotlight, { intensity: 0.3, duration: 5, stagger: 0.1 }, 0)
.to(rectlightyellow, { intensity: 0.5, duration: 20 }, "<0.3")
.to(ambientLight, { intensity: 1, duration: 20 }, "<1")
.to(backSpotLight, { intensity: 1.5, duration: 20 }, 0)
.to(pointLight, { intensity: 0.5, duration: 20 }, "<1");

const timelinePointlight = gsap.timeline({delay: 3, yoyo: true, repeat:-1});

timelinePointlight.to(pointLight,{intensity:0.7,duration: 3})

