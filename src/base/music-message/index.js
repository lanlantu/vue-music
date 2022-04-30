import TempMessage from './music-message.vue'


let instance
let showToast = false
let time 
const musicMessage={
    install(Vue,options={}){
        let opt =TempMessage.data()
        Object.assign(opt,options)//合并信息,若有相同的键，则后面会覆盖前面值
        Vue.prototype.$musicMessage=(message,position) =>{
                if(showToast){
                    clearTimeout(time)
                    instance.vm.visible = showToast = false
                    document.body.removeChild(instance.vm.$el)
                }
                if (message) {
                    opt.message = message // 如果有传message，则使用所传的message
                  }
                  if (position) {
                    opt.position = position // 如果有传type，则使用所传的type
                  }
                  let TempMessageConstructor = Vue.extend(TempMessage)
                  instance = new TempMessageConstructor({
                    data: opt
                  })

                  instance.vm = instance.$mount()
                  document.body.appendChild(instance.vm.$el)
                  instance.vm.visible = showToast = true

                  time = setTimeout(function() {
                    instance.vm.visible = showToast = false
                    document.body.removeChild(instance.vm.$el)
                  }, opt.duration)

        }
    }
}

export default musicMessage