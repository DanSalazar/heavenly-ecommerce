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

export const ShoppingBagIcon = ({ ...props }: IconComponent) => (
  <svg
    width="24px"
    height="24px"
    stroke-width="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33122C4.10545 21 3.16809 19.9074 3.35448 18.6959L4.73909 9.69589C4.8892 8.72022 5.7287 8 6.71584 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M9 11L9 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M15 11L15 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
  </svg>
)

export const TrashIcon = ({ ...props }: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    stroke-width="1"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
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

export const Truck = ({ ...props }: IconComponent) => (
  <svg
    width="20px"
    height="20px"
    stroke-width="1.5"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor">
    <path
      d="M8 19C9.10457 19 10 18.1046 10 17C10 15.8954 9.10457 15 8 15C6.89543 15 6 15.8954 6 17C6 18.1046 6.89543 19 8 19Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-miterlimit="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17C16 18.1046 16.8954 19 18 19Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-miterlimit="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M10.05 17H15V6.6C15 6.26863 14.7314 6 14.4 6H1"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"></path>
    <path
      d="M5.65 17H3.6C3.26863 17 3 16.7314 3 16.4V11.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"></path>
    <path
      d="M2 9L6 9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"></path>
    <path
      d="M15 9H20.6101C20.8472 9 21.0621 9.13964 21.1584 9.35632L22.9483 13.3836C22.9824 13.4604 23 13.5434 23 13.6273V16.4C23 16.7314 22.7314 17 22.4 17H20.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"></path>
    <path
      d="M15 17H16"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"></path>
  </svg>
)
