import { useState, useEffect } from 'react'
import './App.css'

const ANIMACIONES = [
  { id: 'ninguna', label: 'Sin animación' },
  { id: 'entrada', label: '✨ Entrada suave' },
  { id: 'rebote', label: '🎈 Rebote' },
  { id: 'brillo', label: '💫 Brillo' },
  { id: 'balanceo', label: '💕 Balanceo' },
  { id: 'flotar', label: '🫧 Flotar' },
]

const FIGURAS_MENSAJE = [
  { id: 'ninguna', label: 'Sin figura' },
  { id: 'corazones', label: '❤️ Corazones' },
  { id: 'burbuja', label: '💬 Burbuja' },
  { id: 'cinta', label: '🎀 Cinta' },
  { id: 'estrellas', label: '⭐ Estrellas' },
  { id: 'marco', label: '🖼️ Marco' },
]

const IMAGENES_PRINCIPALES = [
  { id: 'corazon', label: '❤️ Corazón', emoji: '❤️' },
  { id: 'globos', label: '🎈 Globos', emoji: '🎈' },
  { id: 'flores', label: '🌸 Flores', emoji: '🌸' },
  { id: 'ramo', label: '💐 Ramo', emoji: '💐' },
  { id: 'rosa', label: '🌹 Rosa', emoji: '🌹' },
  { id: 'panda', label: '🐼 Osito panda', emoji: '🐼' },
  { id: 'osito', label: '🧸 Osito', emoji: '🧸' },
  { id: 'snoopy', label: '🐕 Snoopy', emoji: '🐕' },
  { id: 'mariposa', label: '🦋 Mariposa', emoji: '🦋' },
  { id: 'cupido', label: '💘 Cupido', emoji: '💘' },
  { id: 'carita', label: '🥰 Carita feliz', emoji: '🥰' },
]

function useSearchParams() {
  return useState(() => {
    const search = new URLSearchParams(window.location.search)
    return {
      de: search.get('de') || '',
      para: search.get('para') || '',
      mensaje: search.get('mensaje') || '',
      animacion: search.get('animacion') || 'entrada',
      animacionMensaje: search.get('animacionMensaje') || 'entrada',
      figuraMensaje: search.get('figuraMensaje') || 'ninguna',
      imagen: search.get('imagen') || 'corazon',
    }
  })[0]
}

function Tarjeta({ de, para, mensaje, animacion = 'entrada', animacionMensaje = 'entrada', figuraMensaje = 'ninguna', imagen = 'corazon' }) {
  const animClass = animacion && animacion !== 'ninguna' ? `tarjeta-anim-${animacion}` : ''
  const msgAnimClass = animacionMensaje && animacionMensaje !== 'ninguna' ? `mensaje-anim-${animacionMensaje}` : ''
  const msgFiguraClass = figuraMensaje && figuraMensaje !== 'ninguna' ? `mensaje-figura-${figuraMensaje}` : ''
  const imgOpt = IMAGENES_PRINCIPALES.find((i) => i.id === imagen) || IMAGENES_PRINCIPALES[0]
  return (
    <div className={`tarjeta ${animClass}`.trim()}>
      <div className="tarjeta-icono">{imgOpt.emoji}</div>
      <h1 className="tarjeta-titulo">Para {para || 'alguien especial'}</h1>
      <p className={`tarjeta-mensaje ${msgAnimClass} ${msgFiguraClass}`.trim()}>{mensaje || 'Con todo mi cariño en este día especial 💕'}</p>
      <p className="tarjeta-firma">— {de || 'Alguien que te quiere'}</p>
    </div>
  )
}

function App() {
  const params = useSearchParams()
  const [de, setDe] = useState(params.de)
  const [para, setPara] = useState(params.para)
  const [mensaje, setMensaje] = useState(params.mensaje)
  const [animacion, setAnimacion] = useState(params.animacion || 'entrada')
  const [animacionMensaje, setAnimacionMensaje] = useState(params.animacionMensaje || 'entrada')
  const [figuraMensaje, setFiguraMensaje] = useState(params.figuraMensaje || 'ninguna')
  const [imagen, setImagen] = useState(params.imagen || 'corazon')
  const [enlaceGenerado, setEnlaceGenerado] = useState('')
  const [copiado, setCopiado] = useState(false)

  const tieneParams = params.de || params.para || params.mensaje

  useEffect(() => {
    setDe(params.de)
    setPara(params.para)
    setMensaje(params.mensaje)
    setAnimacion(params.animacion || 'entrada')
    setAnimacionMensaje(params.animacionMensaje || 'entrada')
    setFiguraMensaje(params.figuraMensaje || 'ninguna')
    setImagen(params.imagen || 'corazon')
  }, [params.de, params.para, params.mensaje, params.animacion, params.animacionMensaje, params.figuraMensaje, params.imagen])

  const generarEnlace = () => {
    const search = new URLSearchParams()
    if (de) search.set('de', de)
    if (para) search.set('para', para)
    if (mensaje) search.set('mensaje', mensaje)
    if (animacion && animacion !== 'ninguna') search.set('animacion', animacion)
    if (animacionMensaje && animacionMensaje !== 'ninguna') search.set('animacionMensaje', animacionMensaje)
    if (figuraMensaje && figuraMensaje !== 'ninguna') search.set('figuraMensaje', figuraMensaje)
    if (imagen && imagen !== 'corazon') search.set('imagen', imagen)
    const url = `${window.location.origin}${window.location.pathname}?${search.toString()}`
    setEnlaceGenerado(url)
  }

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(enlaceGenerado)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  // Si hay parámetros en la URL, mostrar la tarjeta
  if (tieneParams) {
    return (
      <div className="app">
        <div className="fondos-corazones" aria-hidden="true">
          <span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span>
        </div>
        <Tarjeta de={params.de} para={params.para} mensaje={params.mensaje} animacion={params.animacion} animacionMensaje={params.animacionMensaje} figuraMensaje={params.figuraMensaje} imagen={params.imagen} />
      </div>
    )
  }

  // Formulario de personalización
  return (
    <div className="app">
      <div className="fondos-corazones" aria-hidden="true">
        <span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span>
      </div>

      <div className="contenedor-formulario">
        <h1>💕 San Valentín</h1>
        <p className="subtitulo">Personaliza tu mensaje y comparte el enlace</p>

        <form onSubmit={(e) => { e.preventDefault(); generarEnlace(); }}>
          <label>
            <span>De (tu nombre)</span>
            <input
              type="text"
              value={de}
              onChange={(e) => setDe(e.target.value)}
              placeholder="Ej: Carlos"
            />
          </label>
          <label>
            <span>Imagen principal</span>
            <select
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            >
              {IMAGENES_PRINCIPALES.map((i) => (
                <option key={i.id} value={i.id}>{i.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Para (nombre de tu pareja)</span>
            <input
              type="text"
              value={para}
              onChange={(e) => setPara(e.target.value)}
              placeholder="Ej: María"
            />
          </label>
          <label>
            <span>Animación de la tarjeta</span>
            <select
              value={animacion}
              onChange={(e) => setAnimacion(e.target.value)}
            >
              {ANIMACIONES.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Figura del mensaje</span>
            <select
              value={figuraMensaje}
              onChange={(e) => setFiguraMensaje(e.target.value)}
            >
              {FIGURAS_MENSAJE.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Efecto del mensaje</span>
            <select
              value={animacionMensaje}
              onChange={(e) => setAnimacionMensaje(e.target.value)}
            >
              {ANIMACIONES.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Tu mensaje</span>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe algo especial..."
              rows={4}
            />
          </label>
          <button type="submit" className="btn-primario">Crear mi mensaje</button>
        </form>

        {enlaceGenerado && (
          <div className="enlace-caja">
            <p>Comparte este enlace con tu persona especial:</p>
            <div className="enlace-input-wrap">
              <input type="text" readOnly value={enlaceGenerado} />
              <button type="button" onClick={copiarEnlace} className="btn-copiar">
                {copiado ? '¡Copiado! ✓' : 'Copiar'}
              </button>
            </div>
          </div>
        )}

        <div className="preview-mini">
          <p>Vista previa:</p>
          <Tarjeta de={de || 'Tu nombre'} para={para || 'Su nombre'} mensaje={mensaje || 'Tu mensaje aquí...'} animacion={animacion} animacionMensaje={animacionMensaje} figuraMensaje={figuraMensaje} imagen={imagen} />
        </div>
      </div>
    </div>
  )
}

export default App
