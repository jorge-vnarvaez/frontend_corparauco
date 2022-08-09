<template>
    <polyline v-bind="{...polylineFeatures, ...shapeFeatures}">
        <slot>

        </slot>
    </polyline>
</template>
<script>
import { ShapeFeatures } from './mixins/ShapeFeatures'
import { Coordinates } from './mixins/Coordinates'

export default {
    mixins: [ ShapeFeatures ],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        data: {
            type: [Array],
            default: function(value){
                return [[10,10], [40,10], [70,20]]
            }
        }
    },

    computed:{
        polylinePoints(){
            let puntosEditados = this.oValue('xy', this.$props.data);
            return puntosEditados;
        },
        polylineFeatures(){

            let coordenadas = '';
            this.polylinePoints.forEach(element => {
                let el = element[0]+","+element[1]+" ";
                coordenadas += el;
            });

            return {
                points: coordenadas
            }
        }
    }
    
}
</script>