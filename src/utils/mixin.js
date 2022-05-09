
export const loadMixin = {
  data() {
    return {
      LoadShow: true // loading状态
    }
  },
  methods: {
    _hideLoad() {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.LoadShow = false
      }, 200)
    }
  }
}
