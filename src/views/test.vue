<template>
  <div>
      我是测试页面
      {{list}}
  </div>
</template>

<script>
import {getToplistDetail} from '@/axios/api'
export default {
      name:'Test',
      data() {
        return {
          list:[],
          hotList:[]
        }
      },
      created() {
         Promise.all([getToplistDetail()])
      .then(([topList]) => {
        this.list = topList.list.filter(v => v.ToplistType)
      })
      .catch(() => {})
      
      },
      methods: {
    
      },
}
</script>

<style>
div{
    width: 200px;
    height: 200px;
    background-color: aqua;
}
</style>