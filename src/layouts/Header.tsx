'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import ScrollProgressBar from '@/components/common/ScrollProgressBar';
import {Button} from '@/components/ui/button';
import {useSpyElem} from '@/hook/useSpy';
import ThemeSwitch from '@/layouts/theme/Switch';
import {cn} from '@/lib/utils';
import {Github} from 'lucide-react';
import IconGithub from "@/components/icon/Github";
import IconLinkedin from "@/components/icon/LinkedIn";
import LinkedIn from "@/components/icon/LinkedIn";

const navList = [
    {name: '주간 이성훈', href: '/blog'},
    {name: 'About', href: '/about'},
];

export const Header = () => {
    const {ref, marginTop} = useSpyElem(65);
    const pathname = usePathname();

    return (
        <nav
            style={{marginTop}}
            ref={ref}
            className='fixed z-40 flex w-full flex-col items-center justify-center border-b bg-background shadow-sm'
        >
            <div className='mt-1 flex h-[64px] w-full max-w-[950px] items-center justify-between px-4'>
                <div className='flex items-center text-lg font-medium'>
                    {navList.map((navItem, index) => (
                        <Link
                            href={navItem.href}
                            key={navItem.name}
                            className={cn(
                                'rounded-full px-4 py-1 text-center text-base transition-colors hover:text-primary',
                                pathname?.startsWith(navItem.href)
                                    ? 'bg-muted font-medium text-primary'
                                    : 'text-muted-foreground'
                            )}
                        >
                            {navItem.name}
                        </Link>
                    ))}
                </div>
                <div className='flex gap-3'>
                    <Button asChild variant='ghost' size='icon'>
                        <Link href='https://github.com/harrisleesh' target='_blank'>
                            <Github className='size-[1.2rem]'/>
                        </Link>
                    </Button>
                    <Button asChild variant='ghost' size='icon'>
                        <Link href='https://www.linkedin.com/in/harris-lee-4947ba238' target='_blank'>
                            <LinkedIn className='size-[1.2rem]'/>
                        </Link>
                    </Button>
                    <ThemeSwitch/>
                </div>
            </div>
            <ScrollProgressBar/>
        </nav>
    );
};
