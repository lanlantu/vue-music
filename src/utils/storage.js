import {defaultVolume} from '@/utils/config'
const _storage = window.localStorage

const storage = {
  get(key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  set(key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear(key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}



 const MODE_KEY = '__Player_mode__'
 // 获取播放模式
 export function getMode() {
   return storage.get(MODE_KEY)
 }
 // 修改播放模式
 export function setMode(mode) {
   storage.set(MODE_KEY, mode)
   return mode
 }

const VOLUME_KEY = '__audio_volume__'
export function setVolume(volume) {
    storage.set(VOLUME_KEY,volume)
}

export function getVolume() {
    const volume = storage.get(VOLUME_KEY,defaultVolume)
  return Number(volume)
}

/**
 * 网易云用户uid
 * @type USERID_KEY：key值
 */
 const USERID_KEY = '__Player_userID__'
 // 获取用户uid
 export function getUserId() {
   return Number(storage.get(USERID_KEY, null))
 }
 // 修改用户uid
 export function setUserId(uid) {
   storage.set(USERID_KEY, uid)
   return uid
 }
 