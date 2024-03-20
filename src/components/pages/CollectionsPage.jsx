'use client'
import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { MusicFilter, MusicPlaylist } from 'iconsax-react'
import ViewAllAlbums from './private/ViewAllAlbums'
import ViewAllPlaylists from './private/ViewAllPlaylists'

const CollectionsPage = () => {
  const tabs = [
    {
      id: 'playlist',
      label: 'Playlists',
      icon: <MusicFilter />,
      content: <ViewAllPlaylists />
    },
    {
      id: 'albums',
      label: 'Album',
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
