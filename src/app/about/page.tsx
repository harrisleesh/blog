import ProfileSection from '@/components/about/ProfileSection'
import TechStackSection from '@/components/about/TechStackSection'
import ContactSection from '@/components/about/ContactSection'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileSection />
      <TechStackSection />
      <ContactSection />
    </div>
  )
} 