import { useTranslations } from 'next-intl'

const DepartmentTitle = ({ department }: { department: string }) => {
  const t = useTranslations()

  return (
    <h2 className="text-7xl md:text-8xl font-medium uppercase break-words">
      {t(`departments.${department}`)}
    </h2>
  )
}

export default DepartmentTitle
