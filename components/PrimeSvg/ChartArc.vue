<template>
    <path v-bind="{...arcFeatures, ...shapeFeatures}">
        <slot name="default" :arcPath="arcPath"></slot>
    </path>
</template>
<script>
import * as d3 from "d3"
import { Coordinates } from "./mixins/Coordinates";
import { ShapeFeatures } from './mixins/ShapeFeatures'
export default {
    mixins: [ Coordinates, ShapeFeatures ],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        ri: {
            type: Number,
            default: 0,
            description: 'Inner radius es el radio que hay entre el centro de la circunferencia y el inicio interno del arco. Si es 0, es un círculo.',
        },
        ro: {
            type: Number,
            default: 10,
            description: 'Outer radius es el radio que hay entre el fin del radio interno y el límite del radio de la circunferencia. Esto es hasta donde llega el círculo o arco.',
        },
        startAngle: {
            type: Number,
            default: 0,
            description: 'Start angle es el ángulo de la circunferencia donde empieza arco',
            validator: (value) => (value >= -360 && value <= 360) ?? console.warn('El valor de "as" debe ser un radio válido, entre -360 y 360')         
        },
        endAngle: {
            type: Number,
            default: 0,
            description: 'End angle es el ángulo donde termina el arco',
            validator: (value) => (value >= -360 && value <= 360) ?? console.warn('El valor de "as" debe ser un radio válido, entre -360 y 360')         
        },
        cornerRadius: {
            type: [Number, String],
            default: 0,
        }
    },
    computed: {
        // Convierte ángulos en pi a ángulos regulares
        angulosNumericos(){
            let piTo360 = 360 / (Math.PI  * 2);
            return {
                startAngle: this.$props.startAngle / piTo360,
                endAngle  : this.$props.endAngle   / piTo360,
            }
        },
        arcPath(){
            let arc = d3.arc()
                .innerRadius(this.$props.ri)
                .outerRadius(this.$props.ro)
                .cornerRadius(parseFloat(this.$props.cornerRadius))
                .startAngle(this.angulosNumericos.startAngle)
                .endAngle(this.angulosNumericos.endAngle)();
            return arc;
        },
        arcFeatures(){
            return {
                ri: this.$props.ri,
                ro: this.$props.ro,
                as: this.$props.as,
                d:  this.arcPath,
            }
        }
    }
}
</script>