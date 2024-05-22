'use client'
import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { MusicFilter, MusicPlaylist, Music } from 'iconsax-react'
import ViewAllAlbums from './private/ViewAllAlbums'
import ViewAllPlaylists from './private/ViewAllPlaylists'
import ViewAllSingles from './private/ViewAllSingles'

const CollectionsPage = () => {
  const tabs = [
    {
      id: 'singles',
      label: 'Singles',
      icon: <Music />,
      content: <ViewAllSingles />
    },
    {
      id: 'playlist',
      label: 'Playlists',
      icon: <MusicFilter />,
      content: <ViewAllPlaylists />
    },
    {
      id: 'albums',
      label: 'Albums',
      icon: <MusicPlaylist />,
      content: <ViewAllAlbums />
    }
  ]

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id}
            title={
              <div className="flex items-center gap-2">
                {item.label}
                {item.icon}
              </div>
            }
          >
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default CollectionsPage
