interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface TechStack {
  category: string;
  items: {
    name: string;
    icon?: string;
    level?: number;
  }[];
}

export const profile = {
  name: '홍길동',
  role: '프론트엔드 개발자',
  bio: '안녕하세요. 웹 개발을 좋아하는 프론트엔드 개발자입니다.',
  avatar: '/images/profile.jpg',
  social: [
    {
      platform: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'github'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin'
    }
  ] as SocialLink[],
  contact: {
    email: 'your.email@example.com',
    location: '서울, 대한민국'
  }
};

export const techStack = [
  {
    category: '프론트엔드',
    items: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 }
    ]
  },
  {
    category: '백엔드',
    items: [
      { name: 'Node.js', level: 75 },
      { name: 'Express', level: 70 }
    ]
  }
] as TechStack[]; 