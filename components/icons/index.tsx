import { SVGProps } from 'react'

type IconComponent = SVGProps<SVGSVGElement>

export const HeartIcon = ({ ...props }: IconComponent) => (
  <svg
    width="24px"
    height="24px"
    strokeWidth="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"></path>
  </svg>
)

export const HeartIconSolid = ({ ...props }: IconComponent) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
    strokeWidth="2">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z"
      fill="currentColor"></path>
  </svg>
)

export const ShoppingBagIcon = ({ ...props }: IconComponent) => (
  <svg
    width="24px"
    height="24px"
    strokeWidth="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33122C4.10545 21 3.16809 19.9074 3.35448 18.6959L4.73909 9.69589C4.8892 8.72022 5.7287 8 6.71584 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M9 11L9 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M15 11L15 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const TrashIcon = ({ ...props }: IconComponent) => (
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

export const MinusIcon = ({ ...props }: IconComponent) => (
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

export const PlusIcon = ({ ...props }: IconComponent) => (
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

export const TruckIcon = ({ ...props }: IconComponent) => (
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
      d="M8 19C9.10457 19 10 18.1046 10 17C10 15.8954 9.10457 15 8 15C6.89543 15 6 15.8954 6 17C6 18.1046 6.89543 19 8 19Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17C16 18.1046 16.8954 19 18 19Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M10.05 17H15V6.6C15 6.26863 14.7314 6 14.4 6H1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"></path>
    <path
      d="M5.65 17H3.6C3.26863 17 3 16.7314 3 16.4V11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"></path>
    <path
      d="M2 9L6 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M15 9H20.6101C20.8472 9 21.0621 9.13964 21.1584 9.35632L22.9483 13.3836C22.9824 13.4604 23 13.5434 23 13.6273V16.4C23 16.7314 22.7314 17 22.4 17H20.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"></path>
    <path
      d="M15 17H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"></path>
  </svg>
)

export const MarkIcon = ({ ...props }: IconComponent) => (
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

export const ArrowRight = ({ ...props }: IconComponent) => (
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

export const PackageIcon = ({ ...props }: IconComponent) => (
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

export const HomeIcon = ({ ...props }: IconComponent) => (
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

export const SettingsIcon = ({ ...props }: IconComponent) => (
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
    {...props}
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M22 12L23 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 2V1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M12 23V22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M20 20L19 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M20 4L19 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 20L5 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M4 4L5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M1 12L2 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)

export const MoonIcon = (props: IconComponent) => (
  <svg
    {...props}
    width="18px"
    height="18px"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
      stroke="currentColor"
      strokeWidth="1.5"
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
      strokeWidth="2"
      strokeWidth="1.5"></circle>
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

export const SearchIcon = (props: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M17 17L21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
    <path
      d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"></path>
  </svg>
)
