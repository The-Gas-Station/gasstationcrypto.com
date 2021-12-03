import { useEffect } from 'react';

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import { useDarkMode } from '../library/hooks/useDarkMode';

export const ColorModeSwitcher = () => {
  const { isDarkMode, toggle } = useDarkMode(true);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.dataset.theme = `theme-${isDarkMode ? 'dark' : 'light'}`;
    }
  }, [isDarkMode]);

  return (
    <MDBBtn tag="a" onClick={toggle} color="none" className="mode-switcher">
      <MDBIcon className={isDarkMode ? '' : 'active'} >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9C13.65 9 15 10.35 15 12C15 13.65 13.65 15 12 15C10.35 15 9 13.65 9 12C9 10.35 10.35 9 12 9ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM2 13H4C4.55 13 5 12.55 5 12C5 11.45 4.55 11 4 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13ZM20 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20C19.45 11 19 11.45 19 12C19 12.55 19.45 13 20 13ZM11 2V4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2ZM11 20V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20C13 19.45 12.55 19 12 19C11.45 19 11 19.45 11 20ZM5.99 4.58C5.89749 4.4873 5.7876 4.41375 5.66662 4.36357C5.54565 4.31339 5.41597 4.28756 5.285 4.28756C5.15403 4.28756 5.02435 4.31339 4.90338 4.36357C4.7824 4.41375 4.67251 4.4873 4.58 4.58C4.4873 4.67251 4.41375 4.7824 4.36357 4.90338C4.31339 5.02435 4.28756 5.15403 4.28756 5.285C4.28756 5.41597 4.31339 5.54565 4.36357 5.66662C4.41375 5.7876 4.4873 5.89749 4.58 5.99L5.64 7.05C6.03 7.44 6.67 7.44 7.05 7.05C7.43 6.66 7.44 6.02 7.05 5.64L5.99 4.58ZM18.36 16.95C18.2675 16.8573 18.1576 16.7837 18.0366 16.7336C17.9157 16.6834 17.786 16.6576 17.655 16.6576C17.524 16.6576 17.3944 16.6834 17.2734 16.7336C17.1524 16.7837 17.0425 16.8573 16.95 16.95C16.8573 17.0425 16.7837 17.1524 16.7336 17.2734C16.6834 17.3944 16.6576 17.524 16.6576 17.655C16.6576 17.786 16.6834 17.9157 16.7336 18.0366C16.7837 18.1576 16.8573 18.2675 16.95 18.36L18.01 19.42C18.4 19.81 19.04 19.81 19.42 19.42C19.5127 19.3275 19.5863 19.2176 19.6364 19.0966C19.6866 18.9757 19.7124 18.846 19.7124 18.715C19.7124 18.584 19.6866 18.4543 19.6364 18.3334C19.5863 18.2124 19.5127 18.1025 19.42 18.01L18.36 16.95ZM19.42 5.99C19.5127 5.89749 19.5863 5.7876 19.6364 5.66662C19.6866 5.54565 19.7124 5.41597 19.7124 5.285C19.7124 5.15403 19.6866 5.02435 19.6364 4.90338C19.5863 4.7824 19.5127 4.67251 19.42 4.58C19.3275 4.4873 19.2176 4.41375 19.0966 4.36357C18.9757 4.31339 18.846 4.28756 18.715 4.28756C18.584 4.28756 18.4543 4.31339 18.3334 4.36357C18.2124 4.41375 18.1025 4.4873 18.01 4.58L16.95 5.64C16.56 6.03 16.56 6.67 16.95 7.05C17.34 7.43 17.98 7.44 18.36 7.05L19.42 5.99ZM7.05 18.36C7.1427 18.2675 7.21625 18.1576 7.26643 18.0366C7.31661 17.9157 7.34244 17.786 7.34244 17.655C7.34244 17.524 7.31661 17.3944 7.26643 17.2734C7.21625 17.1524 7.1427 17.0425 7.05 16.95C6.95749 16.8573 6.8476 16.7837 6.72662 16.7336C6.60565 16.6834 6.47597 16.6576 6.345 16.6576C6.21403 16.6576 6.08435 16.6834 5.96338 16.7336C5.8424 16.7837 5.73251 16.8573 5.64 16.95L4.58 18.01C4.19 18.4 4.19 19.04 4.58 19.42C4.97 19.8 5.61 19.81 5.99 19.42L7.05 18.36Z" fill="#8A92A6" />
        </svg>
      </MDBIcon> /{' '}
      <MDBIcon className={isDarkMode ? 'active' : ''} >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1236_1640)">
            <path d="M19.524 14.721H19.532C20.176 14.721 20.807 14.662 21.418 14.549L21.355 14.559C20.209 18.681 16.489 21.657 12.074 21.657H12.016H12.019C6.676 21.651 2.346 17.321 2.341 11.978V11.977C2.35353 9.8749 3.04445 7.83299 4.31093 6.15515C5.57742 4.47731 7.35179 3.25322 9.37 2.66504L9.439 2.64804C9.32971 3.24817 9.27548 3.85704 9.277 4.46704V4.47404C9.282 10.132 13.867 14.717 19.524 14.722H19.525L19.524 14.721ZM12.006 0.47004C11.8869 0.309302 11.7283 0.18204 11.5456 0.100575C11.3628 0.0191111 11.1622 -0.0137961 10.963 0.00503993H10.968C4.813 0.59604 0.034 5.72404 0 11.976V11.979C0.008 18.614 5.385 23.991 12.019 24H12.08C18.323 24 23.447 19.214 23.985 13.111L23.988 13.066C24.0052 12.8761 23.9757 12.6848 23.9019 12.5089C23.8282 12.3331 23.7125 12.1779 23.565 12.057L23.563 12.055C23.4141 11.9325 23.2371 11.8489 23.0479 11.8117C22.8587 11.7746 22.6632 11.785 22.479 11.842L22.487 11.84L21.963 11.996C21.1771 12.2537 20.355 12.3837 19.528 12.381H19.521C17.4257 12.3787 15.4169 11.5453 13.9354 10.0637C12.4538 8.58209 11.6204 6.57331 11.618 4.47804V4.46004C11.618 3.43004 11.816 2.44604 12.176 1.54504L12.157 1.59804C12.2305 1.41159 12.2549 1.20936 12.2278 1.01077C12.2006 0.812187 12.1229 0.623915 12.002 0.46404L12.004 0.46704L12.006 0.47004Z" fill="#28CCAB" />
          </g>
          <defs>
            <clipPath id="clip0_1236_1640">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

      </MDBIcon>
    </MDBBtn>
  );
};
