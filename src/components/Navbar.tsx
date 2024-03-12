import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

function Navbar() {
  return (
    <header className='fixed bg-background z-10 top-0 right-0 left-0 p-4 items-center  flex justify-between'>
      <div>
        <Image
          src={'./assets/plura-logo.svg'}
          width={40}
          height={40}
          alt='plura logo'
        />
      </div>
      <nav className='hidden md:block'>
        <menu className='flex gap-4'>
          <li>
            <Link href={'#pricing'}>Pricing</Link>
          </li>
          <li>
            <Link href={'#about'}>About</Link>
          </li>
          <li>
            <Link href={'#documentation'}>Documentation</Link>
          </li>
          <li>
            <Link href={'#features'}>Features</Link>
          </li>
        </menu>
      </nav>
      <div className='flex items-center gap-4'>
        <Link
          href={'/agency'}
          className='bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80'
        >
          Login
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Navbar;
