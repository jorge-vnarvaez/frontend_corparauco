<template>
    <rect ref="coordinatorrect"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking"
    v-bind="{...shapeFeatures, ...coordFeatures}">
        <slot>

        </slot>
    </rect>
</template>
<script>
import { ShapeFeatures } from './mixins/ShapeFeatures'
import { Coordinates } from './mixins/Coordinates'

export default {
    mixins: [ ShapeFeatures, Coordinates ],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
    },
    watcher:{
        
    },
}
</script>