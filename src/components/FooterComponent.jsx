
import "./component.css"
const FooterComponent = () => {
  return (
    <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-white text-darl-50">
    <div class="footer-container">
      <small>Copyright &copy;{new Date().getFullYear()} QURAN</small>
    </div>
  </footer>
  );
}
export default FooterComponent