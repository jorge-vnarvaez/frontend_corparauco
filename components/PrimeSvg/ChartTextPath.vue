<template>
    <text 
    ref="coordinatortextpath"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking"
    :style="textStyle" :fill="fill" :stroke="stroke">
        <textPath :href="'#'+href" :startOffset="startOffset">
            <slot>
    
            </slot>
        </textPath>
    </text>
</template>
<script>

export default {
    props: {
        'textAnchor':{
            type: String,
            default: 'unset'
        }, 
        'href':{
            type: String,
            default: ''
        }, 
        'startOffset':{
            type: String,
            default: '50%'
        }, 
        'stroke':{
            type: String,
            default: 'transparent'
        }, 
        'fill':{
            type: String,
            default: 'black'
        }, 
    },
    computed: {
        textStyle(){
            return {
                'text-anchor' : this.$props.textAnchor
            }
        }
    }
}
</script>