<template>
   <div class="shell">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
</template>

<script>
export default {

created() {
    this.mousemove()
},
    methods: {
        mousemove(){
             document.addEventListener('mousemove',e => {
            const item = document.querySelectorAll(".item")

            const mouseX = e.clientX
            const mouseY = e.clientY

            item.forEach(sqr => {
                const sqrX = sqr.offsetLeft
                const sqrY = sqr.offsetTop

                const diffX = mouseX -sqrX
                const diffY = mouseY -sqrY

                const radians = Math.atan2(diffY,diffX)

                const angle = radians * 180 / Math.PI

                sqr.style.transform = `rotate(${angle}deg)`
            })
        })
        }
    },
}
</script>

<style>
        .shell{
            display: grid;
            grid-template-columns: repeat(7,40px);
            grid-template-rows: repeat(7,40px);
            grid-gap: 1.5rem;
        }
        .item{
            background-color: rgb(40, 40, 40);
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .5);	
            border-left: solid 10px #fff;
        }
        .item::after,.item::before{
            content: '';
            width: 5px;
            height: 5px;
            display: block;
            position: absolute;
            border-radius: 50%;
            left: 20px;
            background-color: #fff;
        }
        .item::after{
            top: 25px;
        }
        .item::before{
            bottom: 25px;
        }
</style>