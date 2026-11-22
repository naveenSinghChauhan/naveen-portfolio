export default function Footer({ text }) {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {text}</p>
    </footer>
  )
}
