import * as THREE from 'three'
import { OrbitControls } from 'OrbitControls'
import { GLTFLoader } from 'GLTFLoader'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

function initThree() {
  const model = document.querySelector('.model')
  const scene = new THREE.Scene()
  scene.background = null // 🔸 Прозрачный фон

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.set(-30, 15, -40)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) // 🔸 Альфа-канал включен
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  model.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  let houseModel = null

  loader.load(
    './threeD/sweater.glb',
    (gltf) => {
      houseModel = gltf.scene
      houseModel.scale.set(1.2, 1.2, 1.2)
      scene.add(houseModel)
      console.log("Модель загружена!")

      const box = new THREE.Box3().setFromObject(houseModel)
      const center = box.getCenter(new THREE.Vector3())
      camera.lookAt(center)

      updateScale()
    },
    undefined,
    (error) => {
      console.log('Error:', error)
    }
  )

  const light = new THREE.AmbientLight(0xeeeeee)
  scene.add(light)

  const dirLight1 = new THREE.DirectionalLight(0xeeeeee, 1)
  dirLight1.position.set(-80, 100, 0)
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0xeeeeee, 1)
  dirLight2.position.set(50, 100, 0)
  scene.add(dirLight2)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true
  controls.autoRotateSpeed = 3
  controls.enableDamping = true
  controls.maxDistance = 200
  controls.minDistance = 20
  controls.maxPolarAngle = Math.PI / 2.2

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  function updateScale() {
    if (!houseModel) return

    if (window.innerWidth <= 414) {
      camera.position.set(-5, 5, 15) // ← было 10, стало 15
      houseModel.scale.set(0.15, 0.15, 0.15)
      console.log("Масштаб 0.15 при ширине <= 414px")
    } else if (window.innerWidth <= 768) {
      camera.position.set(-15, 10, 25) // ← было 15, стало 25
      houseModel.scale.set(0.9, 0.9, 0.9)
      console.log("Масштаб 0.9 при ширине <= 768px")
    } else {
      camera.position.set(-20, 15, 30) // ← было 20, стало 30
      houseModel.scale.set(1.2, 1.2, 1.2)
      console.log("Масштаб 1.2 при ширине > 768px")
    }

    const box = new THREE.Box3().setFromObject(houseModel)
    const center = box.getCenter(new THREE.Vector3())
    camera.lookAt(center)
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    updateScale()
  })
}
