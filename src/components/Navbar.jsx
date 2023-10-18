'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@nextui-org/react'
import { SearchIcon } from './SearchIcon.jsx'
import { useState } from 'react'
import Link from 'next/link.js'

const NavbarUi = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    'Top songs',
    'Top artists'
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-transparent backdrop-saturate-1'>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand className='mr-2 grow-0'>
          <Link href={'/'}><p className="hidden sm:block font-bold text-inherit">SOUNDVAULT</p></Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link color="foreground" href="#">
                {item}
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
            inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
          }}
          placeholder="Search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        {/* <UserDropDown /> */}
        <LoginButtons />

      </NavbarContent>

      <NavbarMenu className='bg-transparent backdrop-saturate-1'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className='flex gap-1'>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
            <Button as={Link} color="success" href="#" variant="flat">
              Sign In
            </Button>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

// eslint-disable-next-line no-unused-vars
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
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

const LoginButtons = () => {
  return (
    <div className='hidden sm:flex gap-1'>
      <Button as={Link} color="primary" href="#" variant="flat">
        Sign Up
      </Button>
      <Button as={Link} color="success" href="#" variant="flat">
        Sign In
      </Button>
    </div>
  )
}

export default NavbarUi
