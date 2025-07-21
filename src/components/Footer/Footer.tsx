import css from './Footer.module.css';

export default function Footer() {
  return (
    <div className={css.footer}>
      <div className={css.footerContent}>
        <div className={css.footerLogo}>
          <h3>Pawtrait</h3>
          <p>AI로 만드는 반려동물 초상화</p>
        </div>
        <div className={css.footerInfo}>
          <p>© 2025 Pawtrait. All rights reserved.</p>
          <p>문의: support@pawtrait.com</p>
        </div>
      </div>
    </div>
  );
}
