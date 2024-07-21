import Link from 'next/link';

import IconGithub from '@/components/icon/Github';
import IconLinkedin from '@/components/icon/LinkedIn';

export const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center gap-4 pb-16 pt-20 text-center'>
      <a href='https://hits.sh/www.seonghunlee.com/blog/'>
        <img
          alt='Hits'
          src='https://hits.sh/www.seonghunlee.com/blog.svg?view=today-total&style=for-the-badge&&color=0891b2'
        />
      </a>
      <div>
        © 2024. <span className='font-semibold'>seonghun lee</span>
      </div>
    </footer>
  );
};
