<template>
    <text 
    ref="coordinatortext"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking"
    v-bind="{...shapeFeatures,...coordFeatures}">
        <slot>

        </slot>
    </text>
</template>
<script>
import { ShapeFeatures } from './mixins/ShapeFeatures'
import { Coordinates } from './mixins/Coordinates'

export default {
    mixins: [ ShapeFeatures, Coordinates ],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        fill: {
            type: String,
            default: 'black'
        },
        stroke: {
            type: String,
            default: 'none'
        },
    },
}
</script>