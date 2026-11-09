import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { TEAM_MEMBERS } from '../../data/teamMembers'
import { RotateCw, Sparkles, Move3d, Eye, ZoomIn, ZoomOut } from 'lucide-react'

const BUILDER_LORE = [
  {
    // Adnane
    title: 'JEDI AI ARCHITECT',
    faction: 'Neural Order',
    accentColor: 0xF59E0B,
    accessory: 'Amber Holocron',
    description: 'Autonomous AI orchestration & quantized neural models'
  },
  {
    // Radouane
    title: 'CLOUD FLEET COMMANDER',
    faction: 'Infra Vanguard',
    accentColor: 0xEF4444,
    accessory: 'Server Datapad',
    description: 'Zero-allocation microservices & distributed consensus'
  },
  {
    // Marwane
    title: 'HOLOGRAPHIC UI MASTER',
    faction: 'Design Enclave',
    accentColor: 0x14B8A6,
    accessory: 'Cyan Light-Grid',
    description: 'WebGL shaders, fluid micro-interactions & reactive systems'
  },
  {
    // Amine
    title: 'OPEN-SOURCE SHIPWRIGHT',
    faction: 'Hyperdrive Core',
    accentColor: 0x3B82F6,
    accessory: 'Hydrospanner',
    description: 'Monorepo engineering, developer tooling & CLI architecture'
  },
  {
    // Mohammed
    title: 'KYBER VAULT GUARDIAN',
    faction: 'ZK Bastion',
    accentColor: 0xA855F7,
    accessory: 'Kyber Pod',
    description: 'Security protocols, cryptography & hackathon roadmap'
  }
]

export function Lego3DViewer({ memberIndex = 0 }) {
  const mountRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  const member = TEAM_MEMBERS[memberIndex] || TEAM_MEMBERS[0]
  const lore = BUILDER_LORE[memberIndex] || BUILDER_LORE[0]

  const stateRef = useRef({
    targetRotY: 0,
    rotY: 0,
    targetRotX: 0.1,
    rotX: 0.1,
    cameraDist: 6.8,
    targetDist: 6.8,
    pointerDown: false,
    prevX: 0,
    prevY: 0,
    accessoryObj: null,
    particles: null,
    beamMesh: null,
    isPaused: false
  })

  // Handle Zoom
  const handleZoom = useCallback((direction) => {
    stateRef.current.targetDist = THREE.MathUtils.clamp(
      stateRef.current.targetDist + (direction === 'in' ? -1.0 : 1.0),
      4.5,
      9.0
    )
    setZoomLevel(direction === 'in' ? 1.2 : 0.9)
  }, [])

  // Reset Angle
  const handleResetAngle = useCallback(() => {
    stateRef.current.targetRotY = 0
    stateRef.current.targetRotX = 0.1
    stateRef.current.targetDist = 6.8
    setAutoRotate(true)
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const s = stateRef.current
    const accentHex = lore.accentColor

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 50)
    camera.position.set(0, 1.2, 6.8)
    camera.lookAt(0, 0.4, 0)

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(5, 10, 8)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    scene.add(keyLight)

    // Vibrant Under-Pedestal Holo Glow Light
    const holoLight = new THREE.PointLight(accentHex, 3.5, 8)
    holoLight.position.set(0, 0.2, 0)
    scene.add(holoLight)

    // Dramatic Rim Light
    const rimLight = new THREE.PointLight(accentHex, 2.5, 10)
    rimLight.position.set(-3, 3, -4)
    scene.add(rimLight)

    // 4. Heavy Gunmetal Star Wars Holo-Terminal Base
    const terminalGroup = new THREE.Group()

    // Outer Beveled Base
    const baseGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.4, 48)
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x11131A,
      roughness: 0.3,
      metalness: 0.85
    })
    const baseMesh = new THREE.Mesh(baseGeo, gunmetalMat)
    baseMesh.position.y = -1.2
    baseMesh.receiveShadow = true
    terminalGroup.add(baseMesh)

    // Inner Metallic Rim with Cooling Grooves
    const innerRimGeo = new THREE.CylinderGeometry(1.9, 1.95, 0.15, 48)
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x242838,
      roughness: 0.2,
      metalness: 0.95
    })
    const innerRim = new THREE.Mesh(innerRimGeo, chromeMat)
    innerRim.position.y = -0.95
    terminalGroup.add(innerRim)

    // Center Glowing Holo-Emitter Core
    const coreGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.05, 32)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0A0B10,
      emissive: accentHex,
      emissiveIntensity: 0.6,
      roughness: 0.2
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.position.y = -0.85
    terminalGroup.add(coreMesh)

    // Glowing Laser Aperture Rings
    const ringGeoA = new THREE.RingGeometry(1.65, 1.75, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      side: THREE.DoubleSide
    })
    const ringA = new THREE.Mesh(ringGeoA, ringMat)
    ringA.rotation.x = -Math.PI / 2
    ringA.position.y = -0.83
    terminalGroup.add(ringA)

    const ringGeoB = new THREE.RingGeometry(1.1, 1.18, 36)
    const ringB = new THREE.Mesh(ringGeoB, ringMat)
    ringB.rotation.x = -Math.PI / 2
    ringB.position.y = -0.82
    terminalGroup.add(ringB)

    scene.add(terminalGroup)

    // 5. Volumetric 3D Hologram Projection Beam Cylinder
    const beamGeo = new THREE.CylinderGeometry(1.5, 0.9, 3.6, 32, 1, true)
    const beamMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    const beamMesh = new THREE.Mesh(beamGeo, beamMat)
    beamMesh.position.y = 0.9
    scene.add(beamMesh)
    s.beamMesh = beamMesh

    // 6. 3D Character Hologram Slab (Precision Beveled Crystal Plinth)
    const characterGroup = new THREE.Group()

    const textureLoader = new THREE.TextureLoader()
    const charTexture = textureLoader.load(member.legoImage)
    charTexture.colorSpace = THREE.SRGBColorSpace

    // Front Holographic Character Display Plate (3D Slab with thickness)
    const slabGeo = new THREE.BoxGeometry(2.6, 3.4, 0.12)
    
    // Multi-material box: front has character, sides have glowing sci-fi edge
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: 0x161822,
      emissive: accentHex,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    })

    const frontMat = new THREE.MeshPhysicalMaterial({
      map: charTexture,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9
    })

    const backMat = new THREE.MeshStandardMaterial({
      color: 0x0E1017,
      roughness: 0.4,
      metalness: 0.8
    })

    const materials = [
      edgeMat, // Right
      edgeMat, // Left
      edgeMat, // Top
      edgeMat, // Bottom
      frontMat, // Front (Character)
      backMat   // Back
    ]

    const slabMesh = new THREE.Mesh(slabGeo, materials)
    slabMesh.position.y = 0.85
    slabMesh.castShadow = true
    characterGroup.add(slabMesh)

    // Glowing Neon Framing Bezel around the 3D Slab
    const frameGeo = new THREE.BoxGeometry(2.64, 3.44, 0.14)
    const frameMat = new THREE.MeshBasicMaterial({
      color: accentHex,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    })
    const frameMesh = new THREE.Mesh(frameGeo, frameMat)
    frameMesh.position.y = 0.85
    characterGroup.add(frameMesh)

    // 7. Interactive 3D Accessory Floating & Orbiting Beside Character
    const accGroup = new THREE.Group()
    accGroup.position.set(1.6, 0.8, 0.4)

    if (memberIndex === 0) {
      // Adnane - 3D Amber Holocron (Nested Octahedron & Wireframe Cage)
      const holoGeo = new THREE.OctahedronGeometry(0.35, 0)
      const holoMat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        emissive: 0xF59E0B,
        emissiveIntensity: 2.8,
        roughness: 0.1,
        metalness: 0.8
      })
      const holoMesh = new THREE.Mesh(holoGeo, holoMat)
      accGroup.add(holoMesh)

      const cageGeo = new THREE.IcosahedronGeometry(0.42, 1)
      const cageMat = new THREE.MeshBasicMaterial({ color: 0xFFE082, wireframe: true })
      accGroup.add(new THREE.Mesh(cageGeo, cageMat))
    } else if (memberIndex === 1) {
      // Radouane - 3D Sci-Fi Server Datapad
      const padGeo = new THREE.BoxGeometry(0.65, 0.45, 0.08)
      const padMat = new THREE.MeshStandardMaterial({ color: 0x222634, metalness: 0.85, roughness: 0.25 })
      const padMesh = new THREE.Mesh(padGeo, padMat)
      accGroup.add(padMesh)

      const screenGeo = new THREE.PlaneGeometry(0.55, 0.35)
      const screenMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 })
      const screenMesh = new THREE.Mesh(screenGeo, screenMat)
      screenMesh.position.z = 0.045
      accGroup.add(screenMesh)
    } else if (memberIndex === 2) {
      // Marwane - 3D Cyan Light-Grid UI Projector
      const projGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 16)
      const projMat = new THREE.MeshStandardMaterial({ color: 0x222634, metalness: 0.9 })
      const projMesh = new THREE.Mesh(projGeo, projMat)
      accGroup.add(projMesh)

      const gridGeo = new THREE.PlaneGeometry(0.9, 0.9)
      const gridMat = new THREE.MeshBasicMaterial({
        color: 0x14B8A6,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      })
      const gridMesh = new THREE.Mesh(gridGeo, gridMat)
      gridMesh.position.set(0, 0.45, 0.1)
      gridMesh.rotation.x = -Math.PI / 6
      accGroup.add(gridMesh)
    } else if (memberIndex === 3) {
      // Amine - 3D Metallic Chrome Hydrospanner Wrench
      const handleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 12)
      const chromeToolMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, metalness: 0.95, roughness: 0.15 })
      const handleMesh = new THREE.Mesh(handleGeo, chromeToolMat)
      handleMesh.rotation.z = Math.PI / 4
      accGroup.add(handleMesh)

      const headGeo = new THREE.TorusGeometry(0.18, 0.06, 8, 16, Math.PI * 1.4)
      const headMesh = new THREE.Mesh(headGeo, chromeToolMat)
      headMesh.position.set(0.3, 0.3, 0)
      accGroup.add(headMesh)
    } else {
      // Mohammed - 3D Glowing Kyber Crystal Container
      const podGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.75, 16)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x222233,
        transmission: 0.85,
        opacity: 1,
        transparent: true,
        roughness: 0.1
      })
      const podMesh = new THREE.Mesh(podGeo, glassMat)
      accGroup.add(podMesh)

      const crystalGeo = new THREE.OctahedronGeometry(0.15, 0)
      crystalGeo.scale(1, 2.2, 1)
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xA855F7,
        emissive: 0xA855F7,
        emissiveIntensity: 3.2
      })
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat)
      accGroup.add(crystalMesh)
    }

    // Add glowing light on accessory
    const accLight = new THREE.PointLight(accentHex, 2.5, 4)
    accGroup.add(accLight)

    characterGroup.add(accGroup)
    s.accessoryObj = accGroup

    scene.add(characterGroup)

    // 8. Rising 3D Hologram Energy Particles
    const particleCount = 45
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 0.2 + Math.random() * 1.3
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = -0.8 + Math.random() * 3.2
      positions[i * 3 + 2] = Math.sin(angle) * radius
      particleSpeeds[i] = 0.01 + Math.random() * 0.02
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: accentHex,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)
    s.particles = { system: particleSystem, speeds: particleSpeeds }

    // 9. Interactive 3D Pointer Handlers (Rotate & Orbit)
    const onPointerDown = (e) => {
      s.pointerDown = true
      s.prevX = e.clientX
      s.prevY = e.clientY
      setAutoRotate(false)
      setIsDragging(true)
    }

    const onPointerMove = (e) => {
      if (!s.pointerDown) return
      const deltaX = e.clientX - s.prevX
      const deltaY = e.clientY - s.prevY
      s.prevX = e.clientX
      s.prevY = e.clientY

      s.targetRotY += deltaX * 0.012
      s.targetRotX = THREE.MathUtils.clamp(s.targetRotX + deltaY * 0.008, -0.3, 0.4)
    }

    const onPointerUp = () => {
      s.pointerDown = false
      setIsDragging(false)
    }

    const dom = renderer.domElement
    dom.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // 10. Background Optimization via IntersectionObserver
    let animationFrameId = null
    const clock = new THREE.Clock()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        s.isPaused = !entry.isIntersecting
        if (entry.isIntersecting && !animationFrameId) {
          clock.start()
          renderLoop()
        }
      })
    }, { rootMargin: '150px' })

    observer.observe(container)

    // 11. 60-120fps Render Loop
    const renderLoop = () => {
      if (s.isPaused) {
        animationFrameId = null
        return
      }

      const time = clock.getElapsedTime()

      // Smooth Turntable & Camera Lerp
      if (autoRotate && !s.pointerDown) {
        s.targetRotY += 0.006
      }

      s.rotY = THREE.MathUtils.lerp(s.rotY, s.targetRotY, 0.08)
      s.rotX = THREE.MathUtils.lerp(s.rotX, s.targetRotX, 0.08)
      s.cameraDist = THREE.MathUtils.lerp(s.cameraDist, s.targetDist, 0.1)

      characterGroup.rotation.y = s.rotY
      characterGroup.rotation.x = s.rotX

      // Floating / Breathing levitation
      characterGroup.position.y = Math.sin(time * 2.0) * 0.06

      // Camera distance zoom
      camera.position.z = s.cameraDist

      // Accessory Spin & Bobbing
      if (s.accessoryObj) {
        s.accessoryObj.rotation.y += 0.03
        s.accessoryObj.rotation.x = Math.sin(time * 2.5) * 0.15
        s.accessoryObj.position.y = 0.8 + Math.sin(time * 3) * 0.08
      }

      // Beam Breathing Opacity
      if (s.beamMesh) {
        s.beamMesh.material.opacity = 0.06 + Math.sin(time * 3) * 0.03
      }

      // Rotating Aperture Rings on Base
      ringA.rotation.z += 0.015
      ringB.rotation.z -= 0.02

      // Animate Rising Hologram Particles
      if (s.particles) {
        const posAttr = s.particles.system.geometry.attributes.position
        for (let i = 0; i < particleCount; i++) {
          let y = posAttr.getY(i)
          y += s.particles.speeds[i]
          if (y > 2.6) y = -0.8
          posAttr.setY(i, y)
        }
        posAttr.needsUpdate = true
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(renderLoop)
    }

    renderLoop()

    // 12. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    resizeObserver.observe(container)

    // 13. Cleanup
    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      dom.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose())
            } else {
              obj.material.dispose()
            }
          }
        }
      })
      renderer.dispose()
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom)
      }
    }
  }, [memberIndex, autoRotate, lore.accentColor, member.legoImage])

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl bg-[#08090C] border border-white/[0.08] overflow-hidden flex flex-col justify-between shadow-2xl select-none">
      
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className={`w-full h-full absolute inset-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        title="Click and drag to rotate the 3D Star Wars Holo-Plinth"
      />

      {/* Top 3D Indicator & Camera Controls Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold border backdrop-blur-md flex items-center gap-1.5"
            style={{
              color: `#${lore.accentColor.toString(16).padStart(6, '0')}`,
              borderColor: `#${lore.accentColor.toString(16).padStart(6, '0')}40`,
              backgroundColor: `#${lore.accentColor.toString(16).padStart(6, '0')}15`
            }}
          >
            <Move3d className="w-3.5 h-3.5" />
            <span>3D HOLO-PROJECTOR</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Zoom Buttons */}
          <button
            type="button"
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-lg border border-white/10 bg-[#0C0D14]/80 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer backdrop-blur-md"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-lg border border-white/10 bg-[#0C0D14]/80 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer backdrop-blur-md"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Turntable Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider border backdrop-blur-md transition-all cursor-pointer ${
              autoRotate
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
            }`}
          >
            {autoRotate ? 'Orbit: ON' : 'Orbit: OFF'}
          </button>

          {/* Reset Angle */}
          <button
            type="button"
            onClick={handleResetAngle}
            aria-label="Reset 3D Angle"
            className="p-1.5 rounded-lg border border-white/10 bg-[#0C0D14]/80 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer backdrop-blur-md"
            title="Reset Angle"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom 360° Drag Instructions Toast */}
      <div className="relative z-10 p-3.5 flex items-center justify-between text-[11px] font-mono text-white/50 pointer-events-none border-t border-white/[0.06] bg-[#08090C]/85 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>DRAG 360° TO ROTATE // INTERACTIVE 3D HOLOCRON</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/40">
          <Eye className="w-3 h-3 text-[#38BDF8]" />
          <span>{lore.accessory.toUpperCase()} // 60 FPS</span>
        </div>
      </div>

    </div>
  )
}
