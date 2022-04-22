import axios from '@/axios/axios'
import {formatTopSongs} from '@/utils/song'
const api= '/api'
const test='/test'
// 排行榜列表
export function getToplistDetail() {
    return axios.get(api+'/toplist/detail')
}

// 歌单详情
export function getPlaylistDetail(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(api+'/playlist/detail', {
          params: { id }
        })
        .then(({ playlist }) => playlist || {})
        .then(playlist => {
          const { trackIds, tracks } = playlist
          if (!Array.isArray(trackIds)) {
            reject(new Error('获取歌单详情失败'))
            return
          }
          // 过滤完整歌单 如排行榜
          if (tracks.length === trackIds.length) {
            playlist.tracks = formatTopSongs(playlist.tracks)
            resolve(playlist)
            return
          }
        //   // 限制歌单详情最大 500
        //   const ids = trackIds
        //     .slice(0, 500)
        //     .map(v => v.id)
        //     .toString()
        //   getMusicDetail(ids).then(({ songs }) => {
        //     playlist.tracks = formatTopSongs(songs)
        //     resolve(playlist)
        //   })
        })
    })
  }