<template>
    <ellipse v-bind="{...data, ...shapeFeatures}">
        <slot>

        </slot>
    </ellipse>
</template>
<script>
import { ShapeFeatures } from './mixins/ShapeFeatures'

export default {
    mixins: [ ShapeFeatures ],
    props: {
        ...ShapeFeatures.props,
        data: {
            type: Object,
            default: function(){
                return {
                    'cx'           : "0"                   ,
                    'cy'           : "0"                   ,
                    'rx'           : "5"                  ,
                    'ry'           : "10"                   ,
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