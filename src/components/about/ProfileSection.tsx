import Image from 'next/image'
import { profile } from '@/config/about'

export default function ProfileSection() {
  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 relative rounded-full overflow-hidden">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            {profile.role}
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {profile.bio}
          </p>
        </div>
      </div>
    </section>
  )
} 