import { techStack } from '@/config/about'

export default function TechStackSection() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        기술 스택
      </h2>
      <div className="space-y-8">
        {techStack.map((category) => (
          <div key={category.category}>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.items.map((tech) => (
                <div key={tech.name} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {tech.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {tech.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${tech.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 