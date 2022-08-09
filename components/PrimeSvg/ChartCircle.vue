<template>
    <circle ref="coordinatorcircle"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking"
    v-bind="{...data, ...shapeFeatures, ...coordFeatures}">
        <slot>

        </slot>
    </circle>
</template>
<script>
import { ShapeFeatures } from './mixins/ShapeFeatures'
import { Coordinates } from './mixins/Coordinates'

export default {
    mixins: [ ShapeFeatures, Coordinates ],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        data: {
            type: Object,
            default: function(){
                return {
                    'cx'           : "0"                   ,
                    'cy'           : "0"                   ,
                    'r'            : "10"                   ,
                    'fill'         : "none"                ,
                    'transform'    : false                 ,
                    'stroke'       : "black"               ,
                    'stroke-width' : 3                     ,
                    'id'           : ""                    ,
                    'class'        : []                    ,
                }
            }
        }
    }
}
</script>