const _storage = window.localStorage

const storage={

    set(key,val){
        if (_storage) {
            _storage.setItem(key,val)
        }
    },
    get(key) {
        if (_storage) {
          return _storage.getItem(key) 
        }
      },
    clear(key) {
        if (_storage) {
          _storage.removeItem(key)
        }
      }
}


const VOLUME_KEY = '__audio_volume__'
export function setVolume(volume) {
    storage.set(VOLUME_KEY,volume)
}

export function getVolume() {
    const volume = storage.get(VOLUME_KEY)
  return Number(volume)
}