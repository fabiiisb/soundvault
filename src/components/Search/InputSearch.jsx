'use client'
import { Input } from '@nextui-org/react'
import { SearchNormal1, ArrowCircleRight2 } from 'iconsax-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const InputSearch = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const SearchArrow = () => {
    return (
      <ArrowCircleRight2
        className='cursor-pointer text-white/90 hover:text-niceOrange-400'
        size={30}
        onClick={pushToSearch}
      />
    )
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') pushToSearch()
  }

  const pushToSearch = async () => {
    if (search.trim() !== '') {
      router.push(`/search/${search}`)
      setSearch('')
    }
  }

  return (
    <Input
      classNames={{
        base: 'max-w-full sm:max-w-[17rem] h-10',
        mainWrapper: 'h-full',
        input: 'text-small',
        inputWrapper: 'h-full font-normal text-default-500 bg-content2'
      }}
      placeholder="Search..."
      size="sm"
      startContent={search ? undefined : <SearchNormal1 size={18} />}
      endContent={search && <SearchArrow />}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleEnterPress}
    />
  )
}

export default InputSearch
