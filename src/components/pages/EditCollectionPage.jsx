'use client'
import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'
import { MusicFilter, MusicPlaylist, Music } from 'iconsax-react'
import PrivAlbums from './private/PrivAlbumsPage'
import PrivPlaylists from './private/PrivPlaylistsPage'
import PrivSingles from './private/PrivSinglesPage'

const EditCollectionPage = () => {
  const tabs = [
    {
      id: 'singles',
      label: 'Singles',
      icon: <Music />,
      content: <PrivSingles />
    },
    {
      id: 'playlist',
      label: 'Playlists',
      icon: <MusicFilter />,
      content: <PrivPlaylists />
    },
    {
      id: 'albums',
      label: 'Album',
      icon: <MusicPlaylist />,
      content: <PrivAlbums />
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

export default EditCollectionPage
