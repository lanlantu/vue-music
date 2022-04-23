export const formatTopSongs = function formatTopList(list) {
    let Songs = []
    list.forEach(item => {
      const musicData = item
      if (musicData.id) {
        Songs.push(createTopList(musicData))
      }
    })
    return Songs
  }
  
  export class Song {
    constructor({ id, name, singer, album, image, duration, url }) {
      this.id = id
      this.name = name
      this.singer = singer
      this.album = album
      this.image = image
      this.duration = duration
      this.url = url
    }
  }


  

  export function createTopList(music) {
    return new Song({
      id: music.id,
      name: music.name,
      singer: music.ar.length > 0 && filterSinger(music.ar),
      album: music.al.name,
      image: toHttps(music.al.picUrl),
      duration: music.dt / 1000,
      url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
  }

  //http 链接转化成 https
export function toHttps(url) {
  if (!isString(url)) {
    return url
  }
  return url.replace('http://', 'https://')
}

// 判断 string 类型
export function isString(v) {
    return typeof v === 'string'
  }

function filterSinger(singers) {
    let arr = []
    singers.forEach(item => {
      arr.push(item.name)
    })
    return arr.join('/')
  }