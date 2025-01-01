import { profile } from '@/config/about'

export default function ContactSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        연락처
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">📧</span>
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {profile.contact.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">📍</span>
          <span className="text-gray-700 dark:text-gray-300">
            {profile.contact.location}
          </span>
        </div>
        <div className="flex gap-4 mt-4">
          {profile.social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
} 