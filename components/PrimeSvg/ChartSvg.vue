<template>
    <svg ref="coordinatorsvg"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking" class="chart-svg" width="100%" @resize="sayHello"
    :style="{
        background: background
    }"
    v-bind="{...shapeFeatures,...coordFeatures,...svgFeatures}">

        <chart-g class="chart-g" watch-hover watch-time @coordinates="svgResize" :callResize="applyResize">
            
            <!-- Inner container -->
            <!-- <ChartRect :bx="-containXMargin" :by="containYMargin" class="inner-svg-container" :fill="containColor" :width="containWidth" :height="containHeight"></ChartRect> -->
            <!-- Inner container -->

            <slot v-bind="{scales: scalesRes, hovered: hoveredRes, clicked: clickedRes, selected: selectedRes}"></slot>

        </chart-g>
    </svg>
</template>
<script>
import * as d3 from "d3"
import { ShapeFeatures } from './mixins/ShapeFeatures'
import { Coordinates } from './mixins/Coordinates'
import { Scaler } from './mixins/Scaler'
import ChartG from './ChartG.vue'
import ChartRect from './ChartRect.vue'

export default {
    mixins: [ ShapeFeatures, Scaler, Coordinates ],
    components: {ChartG, ChartRect},
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        ...Scaler.props,
        background: {
            type: [String],
            default: 'transparent',
        },
        viewBox: {
            type: [String, Boolean],
            default: false,
        },
        contain: {
            type: [Boolean],
            default: false,
        },
        containX: {
            type: [Boolean],
            default: false,
        },
        containY: {
            type: [Boolean],
            default: false,
        },
        containXPadding: {
            type: [Boolean,Number],
            default: false,
        },
        containYPadding: {
            type: [Boolean,Number],
            default: false,
        },
        containPadding: {
            type: [Boolean,Number,String],
            default: 0,
        },
        containWidth: {
            type: [Boolean,Number,String],
            default: 0,
        },
        containHeight: {
            type: [Boolean,Number,String],
            default: 0,
        },
        containColor: {
            type: [Boolean,String],
            default: "transparent",
        },
        containXMargin: {
            type: [Number],
            default: 0,
        },
        containYMargin: {
            type: [Number],
            default: 0,
        },
        limitX:{
            type: [Number, String],
            default: 100,
        },
        limitY:{
            type: [Number, String],
            default: 100,
        },
        scrollable: {
            type: [Boolean],
            default: false,
        },
        align: {
            type: [String],
            default: 'center',
        },
    },
    data(){
        return {

            resViewBox: this.$props.viewBox,

            runResize: false,

            outerPaddingX: 0,
            outerPaddingY: 0,
            renderWidth: 0,
            renderHeight: 0,
        }
    },
    methods: {
        sayHello(){
            console.log('hello')
        },
        svgResize(data){
            let padding = parseInt(this.$props.containPadding) * 2
            let outerPadding = ((padding/2)*-1)
            let outerPaddingX = (outerPadding + data.hover.sx).toString()
            let outerPaddingY = (outerPadding + data.hover.sy).toString()
            if(this.$props.contain){

                this.outerPaddingX = outerPaddingX                

                this.outerPaddingY = (this.align == 'top') ? (Number.parseFloat(outerPaddingY) + Number.parseFloat(((this.h - data.select.h )/2) + outerPadding)) : outerPaddingY
                this.renderWidth = data.hover.sw+padding
                this.renderHeight = data.hover.sh+padding

                let viewBox = `${this.outerPaddingX} ${this.outerPaddingY} ${this.renderWidth} ${this.renderHeight}`
                this.resViewBox = viewBox 
            }
        }
    },
    computed: {
        svgFeatures(){
            return {
                viewBox: this.resViewBox
            }
        },
        applyResize(){
            return this.runResize
        }
    },
    mounted(){
        if(this.$props.contain){
                this.runResize = true
        }
        window.addEventListener('resize', (event) => {
            
            this.runResize = true
        });
        
    }
}
</script>