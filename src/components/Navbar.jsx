'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@nextui-org/react'
import { SearchNormal1 } from 'iconsax-react'
import { useState, useEffect } from 'react'
import Link from 'next/link.js'
import { useSession, signOut } from 'next-auth/react'

const NavbarUi = () => {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const menuItems = [
    {
      title: 'Test page',
      url: '/test'
    },
    {
      title: 'Top artists',
      url: '/test'
    }
  ]

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [status])

  const AuthNavItem = () => {
    return (
      <>
        {isLoading
          ? (
            <p> Loading...</p >
            )
          : (
              session
                ? <UserDropDown />
                : <LoginButtons />
            )
        }
      </>
    )
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-transparent backdrop-saturate-1 shadow-medium'>
      <NavbarContent justify="start" className='data-[justify=start] flex-[none]'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden  grow-0"
        />
        <NavbarBrand className='mr-2 grow-0'>
          <Link href={'/'}>
            <p
              className='font-bold'>
              SOUNDVAULT
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-3'>
          {menuItems.map((item, index) => (
            <NavbarItem key={index} className='hover:underline hover:underline-offset-[3px] hover:decoration-niceOrange-400 hover:decoration-2'>
              <Link href={item.url}>
                {item.title}
              </Link>
            </NavbarItem>
          ))}

        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper: 'h-full font-normal text-default-500 dark:bg-default-500/20'
          }}
          placeholder="Search..."
          size="sm"
          startContent={<SearchNormal1 size={18} />}
          type="search"
        />

        <div className='hidden sm:flex gap-1'>
          <AuthNavItem />
        </div>
      </NavbarContent>

      <NavbarMenu className='bg-transparent backdrop-saturate-1'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              href={item.url}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className='flex flex-col sm:flex gap-2'>
            <AuthNavItem />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

const UserDropDown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 ">
          <p className="">Signed in as:</p>
          <p className="font-semibold">Username</p>
        </DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="logout" color="danger"
          onClick={signOut}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

const LoginButtons = () => {
  return (
    <>
      <Button
        as={Link}
        href='/auth/login'
        variant='flat'
        fullWidth
        className='bg-default-500/20 hover:!bg-bgBlur-800'
      >
        Login
      </Button>
      <Button
        as={Link}
        href='/auth/signup'
        fullWidth
        className='bg-bgBlur-900 hover:bg-bgBlur-800 '
      >
        Sign Up
      </Button>
    </>
  )
}

export default NavbarUi
