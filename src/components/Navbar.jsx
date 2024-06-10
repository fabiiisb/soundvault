'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, DropdownSection, Button, Skeleton } from '@nextui-org/react'
import { SearchNormal1, MessageEdit, MusicPlaylist, Setting2, LogoutCurve, UserSquare, Lovely, MusicSquareAdd } from 'iconsax-react'
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
    }
  ]

  const UserMenuItems = [
    {
      key: 'likes',
      icon: <Lovely />,
      title: 'My likes',
      url: '/private/likes'
    },
    {
      key: 'collections',
      icon: <MusicPlaylist />,
      title: 'My collections',
      url: '/private/collections'
    },
    {
      key: 'editCollections',
      icon: <MessageEdit />,
      title: 'Edit my collections',
      url: '/private/editCollections'
    },
    {
      key: 'upload',
      icon: <MusicSquareAdd />,
      title: 'Upload songs',
      url: '/private/upload'
    },
    {
      key: 'configurations',
      icon: <Setting2 />,
      title: 'Configurations',
      url: '/'
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
        {
          isLoading
            ? (
                <Skeleton className='rounded-full'>
                  <Avatar
                    isBordered
                    size="sm"
                  />
                </Skeleton>
              )
            : (
                session?.user
                  ? <UserDropDown
                      username={session.user.name}
                      image={session.user.image}
                      UserMenuItems={UserMenuItems}
                    />
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
        <NavbarContent className='hidden sm:flex gap-1'>

          <NavLinks menuItems={menuItems} />

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

        <NavLinks menuItems={menuItems} />

        <AuthNavItem />

      </NavbarMenu>
    </Navbar>
  )
}

const UserDropDown = ({ username, image, UserMenuItems }) => {
  return (
    <>
      <div className='hidden sm:block'>
        <Dropdown placement="bottom-end">
          <DropdownTrigger >
            <Avatar
              as="button"
              className='bg-niceOrange-400'
              size="md"
              src={image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat"
            className=" sm:w-60"
          >
            <DropdownSection showDivider >
              <DropdownItem
                as={Link} href={`/user/${username}`}
                startContent={<UserSquare variant='Bulk' />}
                isReadOnly

              >
                <p className="font-semibold">{username}</p>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider className=''>
              {
                UserMenuItems.map((item) => (
                  <DropdownItem
                    key={item.key}
                    as={Link}
                    href={item.url}
                    startContent={item.icon}
                  >
                    {item.title}
                  </DropdownItem>
                ))
              }
            </DropdownSection>

            <DropdownItem key="logout" className='text-danger' color="danger"
              startContent={<LogoutCurve />}
              onClick={signOut}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className='flex flex-col gap-2 sm:hidden '>

        <NavbarItem
          className='hover:bg-default-600/40 hover:text-white text-white/80 rounded-lg px-3 py-3 text-center bg-default-500/20 sm:bg-transparent w-full'
          key="profile"
          as={Link}
          href={`/user/${username}`}
        >
          My profile
        </NavbarItem>

        {UserMenuItems.map((item) => (
          <NavbarItem
            className='hover:bg-default-600/40 hover:text-white text-white/80 rounded-lg px-3 py-3 text-center bg-default-500/20 sm:bg-transparent '
            key={item.key}
            as={Link}
            href={item.url}
          >
            {item.title}
          </NavbarItem>
        ))}

        <NavbarItem
          className='hover:bg-danger hover:text-white hover:cursor-pointer bg-black/50 text-danger rounded-lg px-3 py-3 text-center sm:bg-transparent '
          onClick={signOut}
        >
          Log Out
        </NavbarItem>

      </div>
    </>
  )
}

const LoginButtons = () => {
  return (
    <div className='flex gap-2'>
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
    </div>
  )
}

const NavLinks = ({ menuItems }) => {
  return (
    <>
      {
        menuItems.map((item, index) => (
          <NavbarItem
            className='hover:bg-default-600/40 sm:hover:bg-default-500/20 hover:text-white text-white/80 rounded-lg px-3 py-3 sm:py-1 text-center bg-default-500/20 sm:bg-transparent'
            key={index}
            as={Link}
            href={item.url}
          >
            {item.title}
          </NavbarItem>
        ))
      }
    </>
  )
}

export default NavbarUi
