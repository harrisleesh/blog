'use client';

import CopyLinkButton from './CopyLinkButton';
import { ScrollTop } from './TocButtons';
import { cn } from '@/lib/utils';

const FloatingButton = () => {
  return (
    <div className='group fixed bottom-4 right-4 xl:hidden'>
      <div className='group relative flex flex-col-reverse'>
        <CopyLinkButton
          size={22}
          className={cn('absolute bottom-0 right-0 z-10 transition')}
        />
        <ScrollTop
          className={cn('absolute bottom-0 right-0 transition', '-translate-y-12')}
          size={22}
        />
      </div>
    </div>
  );
};

export default FloatingButton;
