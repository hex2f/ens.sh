export default function GradientBackground() {
  return (
    <div
      id="gradient-background"
      className="hidden md:block gradient-bg"
      style={{
        width: '200vw',
        height: '200vh',
        transform: 'translate(-50vw, -100vh)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  )
}