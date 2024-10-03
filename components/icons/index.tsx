import { SVGProps } from 'react'

type IconComponent = SVGProps<SVGSVGElement>

export const HeartIcon = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
    {...props}>
    <path
      d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"></path>
  </svg>
)

export const HeartIconSolid = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
    strokeWidth="1.5"
    {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z"
      fill="currentColor"></path>
  </svg>
)

export const TrashIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    strokeWidth="1"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const MinusIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    strokeWidth="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M6 12H18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const PlusIcon = (props: IconComponent) => (
  <svg
    width="16px"
    height="16px"
    strokeWidth="2"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M6 12H12M18 12H12M12 12V6M12 12V18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const MarkIcon = (props: IconComponent) => (
  <svg
    width="16px"
    height="16px"
    {...props}
    strokeWidth="2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const ArrowRight = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    strokeWidth="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const PackageIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    strokeWidth="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M20 5.99999L20 18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1045 4 19.9999 4.89543 20 5.99999Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 9V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const HomeIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const SettingsIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    strokeWidth="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const SunIcon = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    strokeWidth="2"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M22 12L23 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 2V1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 23V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M20 20L19 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M20 4L19 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 20L5 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 4L5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M1 12L2 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const MoonIcon = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    strokeWidth="2"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const ListIcon = (props: IconComponent) => (
  <svg
    width="24px"
    height="24px"
    {...props}
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M8 6L20 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 6.01L4.01 5.99889"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 12.01L4.01 11.9989"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 18.01L4.01 17.9989"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M8 12L20 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M8 18L20 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const CheckIcon = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    strokeWidth="2"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M5 13L9 17L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const CircleUserIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    strokeWidth="2"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"></path>
    <path
      d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"></circle>
  </svg>
)

export const MenuIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    strokeWidth="2"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M3 5H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M3 12H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M3 19H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const MoreHorizontalIcon = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M20 12.5C20.2761 12.5 20.5 12.2761 20.5 12C20.5 11.7239 20.2761 11.5 20 11.5C19.7239 11.5 19.5 11.7239 19.5 12C19.5 12.2761 19.7239 12.5 20 12.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 12.5C4.27614 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.27614 11.5 4 11.5C3.72386 11.5 3.5 11.7239 3.5 12C3.5 12.2761 3.72386 12.5 4 12.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const ListFilterIcon = (props: IconComponent) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"></line>
    <line x1="4" y1="10" x2="4" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="3"></line>
    <line x1="20" y1="21" x2="20" y2="16"></line>
    <line x1="20" y1="12" x2="20" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line>
    <line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
)

export const PlusCircleIcon = (props: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M8 12H12M16 12H12M12 12V8M12 12V16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const DollarSignIcon = () => (
  <svg
    width="18px"
    height="18px"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M16.1538 7.15382C15.2054 6.20538 13.5351 5.54568 12 5.50437M7.84619 16.1538C8.73855 17.3436 10.3977 18.0222 12 18.0798M12 5.50437C10.1735 5.45522 8.5385 6.2815 8.5385 8.53845C8.5385 12.6923 16.1538 10.6154 16.1538 14.7692C16.1538 17.1383 14.127 18.1562 12 18.0798M12 5.50437V3M12 18.0798V20.9999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const CreditCardIcon = () => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M22 9V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V9ZM22 9H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const FacebookIcon = (props: IconComponent) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
  </svg>
)

export const XIcon = (props: IconComponent) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
)

export const InstagramLogo = (props: IconComponent) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
)

export const VisaSVG = () => (
  <svg width="48" height="32" viewBox="0 0 48 32">
    <rect
      width="46.6"
      height="30.6"
      x="0.7"
      y="0.7"
      rx="3.301"
      fill="#fff"></rect>
    <path
      d="M43.999 1.4A2.604 2.604 0 0 1 46.6 4.001V28a2.604 2.604 0 0 1-2.601 2.601H4A2.604 2.604 0 0 1 1.4 27.999V4A2.604 2.604 0 0 1 4.001 1.4H44m0-1.4H4A4.001 4.001 0 0 0 0 4.001V28A4.001 4.001 0 0 0 4.001 32H44A4.001 4.001 0 0 0 48 27.999V4A4.001 4.001 0 0 0 43.999 0Z"
      fill="#ddd"></path>
    <path
      d="m23.824 10.624-2.43 11.357h-2.938l2.43-11.357Zm12.36 7.333 1.548-4.265.89 4.265Zm3.279 4.024h2.717L39.81 10.624H37.3a1.338 1.338 0 0 0-1.25.833l-4.408 10.524h3.085l.612-1.696h3.77Zm-7.668-3.708c.012-2.998-4.146-3.163-4.117-4.502.009-.407.397-.84 1.246-.951a5.544 5.544 0 0 1 2.897.508l.516-2.408a7.89 7.89 0 0 0-2.748-.504c-2.904 0-4.949 1.544-4.966 3.755-.018 1.635 1.46 2.547 2.573 3.09 1.144.557 1.529.914 1.524 1.411-.008.763-.913 1.099-1.758 1.112a6.142 6.142 0 0 1-3.018-.717l-.533 2.488a8.906 8.906 0 0 0 3.268.604c3.086 0 5.106-1.525 5.116-3.886Zm-12.17-7.65-4.76 11.358H11.76l-2.342-9.064a1.244 1.244 0 0 0-.699-.998 12.279 12.279 0 0 0-2.898-.965l.07-.33h5a1.369 1.369 0 0 1 1.354 1.158l1.237 6.572 3.058-7.73Z"
      fill="#233065"
      fillRule="evenodd"></path>
  </svg>
)

export const PaypalSVG = () => (
  <svg width="48" height="32" viewBox="0 0 48 32" aria-hidden="true">
    <g fill="none">
      <path
        fill="#FFF"
        d="M4 1.333h40c1.467 0 2.667 1.2 2.667 2.667v24c0 1.467-1.2 2.667-2.667 2.667H4A2.675 2.675 0 0 1 1.333 28V4c0-1.467 1.2-2.667 2.667-2.667"></path>
      <path
        fill="#DDD"
        d="M44 1.333c1.467 0 2.667 1.2 2.667 2.667v24c0 1.467-1.2 2.667-2.667 2.667H4A2.675 2.675 0 0 1 1.333 28V4c0-1.467 1.2-2.667 2.667-2.667zM44 0H4C1.733 0 0 1.733 0 4v24c0 2.267 1.733 4 4 4h40c2.267 0 4-1.733 4-4V4c0-2.267-1.733-4-4-4"></path>
      <path
        fill="#253B80"
        d="M18.533 13.467H16.4a.29.29 0 0 0-.267.266l-.8 5.334c0 .133 0 .266.134.266h.933a.29.29 0 0 0 .267-.266l.266-1.467c0-.133.134-.267.267-.267h.667q2 0 2.4-2c.133-.533 0-1.066-.267-1.333-.133-.4-.667-.533-1.467-.533m.267 2c-.133.8-.667.8-1.2.8h-.267l.267-1.334c0-.133.133-.133.133-.133h.134c.4 0 .666 0 .933.267 0-.134.133.133 0 .4m6-.134h-.933c-.134 0-.134 0-.134.134v.266L23.6 15.6q-.4-.4-1.2-.4c-1.067 0-2 .8-2.267 2-.133.533 0 1.2.4 1.467.267.4.8.533 1.2.533.934 0 1.334-.533 1.334-.533v.266c0 .134 0 .267.133.267h.933a.29.29 0 0 0 .267-.267l.533-3.466s0-.134-.133-.134m-1.333 2c-.134.534-.534.934-1.067.934-.267 0-.533-.134-.667-.267-.133-.133-.266-.4-.133-.667.133-.533.533-.933 1.067-.933.266 0 .533.133.666.267.134.133.134.4.134.666m6.666-2h-1.066c-.134 0-.134 0-.267.134l-1.333 2-.534-2a.29.29 0 0 0-.266-.267h-.934c-.133 0-.266.133-.133.267l1.067 3.2-1.067 1.466c-.133.134 0 .267.133.267h.934c.133 0 .133 0 .266-.133l3.334-4.8c.133.133 0-.134-.134-.134"></path>
      <path
        fill="#179BD7"
        d="M33.467 13.467h-2.134a.29.29 0 0 0-.266.266l-.8 5.334c0 .133 0 .266.133.266h1.067c.133 0 .133-.133.133-.133l.267-1.467c0-.133.133-.266.266-.266h.667q2 0 2.4-2c.133-.534 0-1.067-.267-1.334-.266-.533-.8-.666-1.466-.666m.133 2c-.133.8-.667.8-1.2.8h-.267l.267-1.334c0-.133.133-.133.133-.133h.134c.4 0 .666 0 .933.267.133-.134.133.133 0 .4m6-.134h-.933c-.134 0-.134 0-.134.134v.266L38.4 15.6q-.4-.4-1.2-.4c-1.067 0-2 .8-2.267 2-.133.533 0 1.2.4 1.467.267.4.8.533 1.2.533.934 0 1.334-.533 1.334-.533v.266c0 .134 0 .267.133.267h.933a.29.29 0 0 0 .267-.267l.533-3.466c.134 0 0-.134-.133-.134m-1.333 2c-.134.534-.534.934-1.067.934-.267 0-.533-.134-.667-.267-.133-.133-.266-.4-.133-.667.133-.533.533-.933 1.067-.933.266 0 .533.133.666.267.134.133.134.4.134.666M40.8 13.6l-.8 5.467c0 .133 0 .266.133.266h.8a.29.29 0 0 0 .267-.266l.8-5.334c0-.133 0-.266-.133-.266h-.934s-.133 0-.133.133"></path>
      <path
        fill="#253B80"
        d="m6.8 20.267.133-1.067H4.8L6 11.733h2.8c.933 0 1.6.134 2 .534.133.133.267.4.267.533v1.067L11.2 14c.133.133.267.133.267.267.4.133.533.4.533.533v.8c-.133.4-.133.667-.4.933-.133.267-.267.4-.533.667-.267.133-.4.267-.8.4-.267.133-.534.133-.934.133H9.2c-.133 0-.267 0-.4.134-.133.133-.267.266-.267.4v.133l-.266 1.733c-.134.134-1.467.134-1.467.134"></path>
      <path
        fill="#179BD7"
        d="M11.6 13.733v.134C11.2 15.733 10 16.4 8.267 16.4h-.934q-.4 0-.4.4l-.4 2.667-.133.8c0 .133.133.266.267.266h1.466c.134 0 .267-.133.4-.266v-.134L8.8 18.4v-.133c0-.134.133-.267.4-.267h.133c1.467 0 2.534-.533 2.934-2.267.133-.666 0-1.333-.267-1.733-.133-.133-.267-.133-.4-.267"></path>
      <path
        fill="#222D65"
        d="M11.2 13.6H7.733c-.133 0-.133.133-.133.267l-.533 3.066v.134c0-.134.266-.4.4-.4h.8c1.6 0 2.933-.667 3.333-2.534V14q-.2-.4-.4-.4"></path>
      <path
        fill="#253B80"
        d="M7.467 13.733c0-.133.133-.266.133-.266h3.6c.133 0 .267.133.267.133q.2-1-.4-1.6c-.267-.4-1.067-.533-2.134-.533h-2.8q-.4 0-.4.4l-1.2 7.466c0 .134.134.267.267.267h1.733l.4-2.8z"></path>
    </g>
  </svg>
)

export const MasterCardSVG = () => (
  <svg width="48" height="32" viewBox="0 0 48 32">
    <g fill="none">
      <rect
        width="45.333"
        height="29.333"
        x="1.333"
        y="1.333"
        fill="#FFF"
        rx="2"></rect>
      <path
        fill="#DDD"
        d="M44 1.333A2.667 2.667 0 0 1 46.667 4v24A2.667 2.667 0 0 1 44 30.667H4A2.667 2.667 0 0 1 1.333 28V4A2.667 2.667 0 0 1 4 1.333h40ZM44 0H4a4.012 4.012 0 0 0-4 4v24a4.012 4.012 0 0 0 4 4h40a4.012 4.012 0 0 0 4-4V4a4.012 4.012 0 0 0-4-4Z"></path>
      <path
        fill="#231F20"
        d="M13.568 27.975V26.38a.946.946 0 0 0-1-1.01.983.983 0 0 0-.893.453.933.933 0 0 0-.84-.452.84.84 0 0 0-.744.377v-.313H9.54v2.54h.559v-1.398a.597.597 0 0 1 .621-.674c.367 0 .553.238.553.669v1.413h.559v-1.408a.598.598 0 0 1 .621-.674c.378 0 .559.238.559.669v1.413l.556-.01Zm8.257-2.542h-.909v-.77h-.559v.77h-.504v.506h.516v1.169c0 .59.228.941.883.941.244.002.484-.068.69-.197l-.16-.473a1.034 1.034 0 0 1-.489.144c-.265 0-.366-.171-.366-.426V25.94h.904l-.006-.506Zm4.715-.064a.748.748 0 0 0-.67.372v-.308h-.547v2.54h.553V26.55c0-.42.181-.653.532-.653a.897.897 0 0 1 .345.064l.171-.532a1.197 1.197 0 0 0-.393-.07l.009.011Zm-7.128.266a1.886 1.886 0 0 0-1.036-.266c-.643 0-1.063.308-1.063.814 0 .414.308.669.878.749l.265.037c.303.043.447.123.447.266 0 .196-.202.308-.579.308a1.355 1.355 0 0 1-.845-.266l-.266.431c.323.225.708.34 1.1.33.734 0 1.159-.346 1.159-.83s-.335-.68-.888-.76l-.265-.037c-.239-.032-.431-.08-.431-.25 0-.169.181-.297.484-.297.28.003.555.079.797.217l.243-.446Zm14.805-.266a.748.748 0 0 0-.669.372v-.308H33v2.542h.553V26.55c0-.42.182-.654.532-.654a.897.897 0 0 1 .346.064l.17-.532a1.197 1.197 0 0 0-.393-.069l.01.01Zm-7.121 1.328a1.282 1.282 0 0 0 1.236 1.33c.04.001.08.001.12-.002.332.018.659-.09.915-.302l-.266-.447c-.19.145-.424.225-.664.228a.817.817 0 0 1 0-1.627c.24.003.474.083.664.228l.266-.446a1.326 1.326 0 0 0-.915-.303 1.284 1.284 0 0 0-1.356 1.33v.011Zm5.176 0v-1.265h-.552v.308a.962.962 0 0 0-.797-.372 1.33 1.33 0 0 0-.015 2.657h.015a.962.962 0 0 0 .797-.372v.308h.553l-.001-1.264Zm-2.056 0a.763.763 0 1 1-.001.062c-.002-.022 0-.042.001-.062Zm-6.67-1.328a1.33 1.33 0 0 0 .031 2.659h.006c.382.02.758-.104 1.054-.345l-.265-.41c-.21.168-.47.262-.739.266a.703.703 0 0 1-.76-.622h1.887v-.212a1.208 1.208 0 0 0-1.207-1.329l-.008-.007Zm0 .495a.628.628 0 0 1 .642.616h-1.33c.02-.355.32-.63.675-.616h.012Zm13.847.839v-2.291h-.532v1.33a.962.962 0 0 0-.797-.373 1.33 1.33 0 0 0 0 2.659.962.962 0 0 0 .797-.372v.308h.532v-1.261Zm.923.901a.25.25 0 0 1 .239.348.256.256 0 0 1-.139.133.243.243 0 0 1-.101.022.266.266 0 0 1-.239-.155.25.25 0 0 1 0-.196.26.26 0 0 1 .247-.152h-.007Zm0 .45a.191.191 0 1 0-.077-.367.186.186 0 0 0-.064.042.192.192 0 0 0 .149.324h-.008Zm.016-.318a.107.107 0 0 1 .07.021.068.068 0 0 1 .023.056.066.066 0 0 1-.018.048.097.097 0 0 1-.056.024l.077.088h-.061l-.072-.088h-.024v.088h-.051v-.233l.112-.004Zm-2.983-1.033a.763.763 0 1 1-.001.061l.001-.061Zm-18.664.001v-1.27h-.552v.307a.962.962 0 0 0-.797-.372 1.33 1.33 0 0 0 0 2.659.962.962 0 0 0 .797-.372v.308h.554l-.002-1.26Zm-2.056 0a.71.71 0 1 1-.006.065l.001-.065h.005Z"></path>
      <path fill="#F26122" d="M19.228 6.072H27.6v15.044h-8.372z"></path>
      <path
        fill="#EA1D25"
        d="M19.76 13.596a9.555 9.555 0 0 1 3.653-7.524C19.26 2.808 13.244 3.529 9.98 7.684a9.568 9.568 0 0 0 13.435 13.433 9.549 9.549 0 0 1-3.655-7.521Z"></path>
      <path
        fill="#F69E1E"
        d="M38.895 13.596c0 5.284-4.283 9.568-9.567 9.568a9.571 9.571 0 0 1-5.913-2.045c4.154-3.266 4.874-9.28 1.609-13.435a9.588 9.588 0 0 0-1.61-1.61 9.567 9.567 0 0 1 15.48 7.52v.002Z"></path>
    </g>
  </svg>
)
