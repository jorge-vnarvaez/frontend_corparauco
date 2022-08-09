<template>
    <line v-bind="{...lineFeatures, ...shapeFeatures}">
        <slot>

        </slot>
    </line>
</template>
<script>
import * as d3 from "d3"
import { ShapeFeatures } from './mixins/ShapeFeatures'

export default {
    mixins: [ ShapeFeatures ],
    props: {
        ...ShapeFeatures.props,
        x1: {
            default: 0,
            type: [Number, String],
            required: false,
        },
        y1: {
            default: 0,
            type: [Number, String],
            required: false,
        },
        x2: {
            default: 0,
            type: [Number, String],
            required: false,
        },
        y2: {
            default: 0,
            type: [Number, String],
            required: false,
        },
    },
    computed:{
        lineFeatures(){
            return {
                x1: this.oValue('x',this.$props.x1),
                x2: this.oValue('x',this.$props.x2),
                y1: this.oValue('y',this.$props.y1),
                y2: this.oValue('y',this.$props.y2),
            }
        }
    }
}
</script>