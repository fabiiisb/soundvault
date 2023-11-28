import { NextResponse } from 'next/server'

const arraytest = [
  {
    songName: 'Rap God',
    user: 'Eminem',
    duration: '6:03',
    id: 'similarsong1'
  },
  {
    songName: 'Lose Yourself',
    user: 'Eminem',
    duration: '5:26',
    id: 'similarsong2'
  },
  {
    songName: 'Juicy',
    user: 'The Notorious B.I.G.',
    duration: '5:02',
    id: 'similarsong3'
  },
  {
    songName: 'Nuthin\' But a \'G\' Thang asd asdasd asd asdasd as dasda sdasd xd',
    user: 'Dr. Dre',
    duration: '3:58',
    id: 'similarsong4'
  },
  {
    songName: 'Gin and Juice',
    user: 'Snoop Dogg',
    duration: '3:31',
    id: 'similarsong5'
  },
  {
    songName: 'Empire State of Mind',
    user: 'Jay-Z',
    duration: '4:37',
    id: 'similarsong6'
  },
  {
    songName: 'HUMBLE.',
    user: 'Kendrick Lamar',
    duration: '2:57',
    id: 'similarsong7'
  },
  {
    songName: 'In Da Club',
    user: '50 Cent',
    duration: '3:13',
    id: 'similarsong8'
  },
  {
    songName: 'Hotline Bling',
    user: 'Drake',
    duration: '4:27',
    id: 'similarsong9'
  },
  {
    songName: 'Can\'t Tell Me Nothing',
    user: 'Kanye West',
    duration: '4:31',
    id: 'similarsong10'
  }
]

export function GET () {
  return NextResponse.json(
    arraytest
  )
}
