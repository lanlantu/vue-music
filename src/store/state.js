import {playMode} from '@/utils/config'
import {getMode,getUserId} from '@/utils/storage'
const state={

    audioEle:null,//audio元素
    playlist:[], //播放列表
    playing: false, // 播放状态
    currentIndex:-1,//当前音乐索引
    mode: Number(getMode()) || playMode.listLoop, // 播放模式，默认列表循环

    uid: getUserId() || null // 网易云用户UID
}



export default state