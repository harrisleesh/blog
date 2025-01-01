import ProfileSection from '@/components/about/ProfileSection'
import TechStackSection from '@/components/about/TechStackSection'
import ContactSection from '@/components/about/ContactSection'
import SEO from '@/components/SEO'

export default function AboutPage() {
  return (
    <>
      <SEO
        title="소개"
        description="블로그 운영자의 프로필과 기술 스택을 소개합니다."
        url="/about"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileSection />
        <TechStackSection />
        <ContactSection />
      </div>
    </>
  )
} 