<template>
    <path
    ref="coordinatorpath"
    @[mayMousemove]="mouseIsMoving" @[mayMouseleave]="mouseLeft"
    @[mayMousedown]="selectIn" @[mayMouseup]="selectOut" 
    @[mayClick]="mouseIsClicking"
    v-bind="{...curveFeatures, ...shapeFeatures,...coordFeatures}">
        <slot name="default" :curvePath="curvePath">

        </slot>
    </path>
</template>
<script>
import * as d3 from "d3"
import { ShapeFeatures } from './mixins/ShapeFeatures';
import { Coordinates } from './mixins/Coordinates'


export default {
    mixins: [ ShapeFeatures, Coordinates ],
    props: {
        ...ShapeFeatures.props,
        ...Coordinates.props,
        data: {
            type: Array,
            default: () => {
                return [[0, 400],[100, 300],[200, 400],[300, 200],[400, 400],[500,100],[600,550],[1300,300]];
            }
        },
        curveStyle: {
            type: String,
            default: 'curveLinearClosed',
            required: false,
        },
        autoPoints: {
            type: Boolean,
            default: false,
            required: false,
        },
        width: {
            type: Number,
            default: 500,   
        },
        height: {
            type: Number,
            default: 500,    
        },
        reverse: {
            type: Boolean,
            default: false
        },
        area: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 100
        },
        max: {
            type: Number,
            default: 100
        },
        lvl: {
            type: [Number],
            default: 0.5
        },
    },
    computed: {
        funcionCurva(){
            return (this.$props.area) ? 'area' : 'line'
        },
        dataCurva(){
            return this.$props.data;
        },
        puntosInput(){

            let datosInput = this.dataCurva;
            let output = false;


            let escalerX = this.scaler({
                d3: d3,
                scale: 'scaleLinear',
                domain: [1, datosInput.length], 
                range: [0, this.$props.width], 
                clamp: false, 
                round: false,
                paddingOuter: 0,
                paddingInner: 0,
            })

            let escalerY = this.scaler({
                d3: d3,
                scale: 'scaleLinear',
                domain: [this.$props.min, this.$props.max], 
                range: [0, this.$props.height], 
                clamp: false, 
                round: false,
                paddingOuter: 0,
                paddingInner: 0,
            })

            if(this.autoPoints){
                let res = output =  [];
                let contador = 1;
                for (let index = 0; index < datosInput.length; index++) {
                    res[index] = [escalerX(contador), escalerY(datosInput[index])]
                    contador++
                }
                return res
            } else {

                output = datosInput;
                return output
            }
        },
        
        curvePath(){

            let datosCurva = this.puntosInput;

            // ? Sanitizar dirección de puntos
            let curvaFormateada = this.oValue('xy', datosCurva);

            if(this.$props.area){
                let firstX = datosCurva[0][0];
                let lastX  = datosCurva[datosCurva.length - 1][0];
                curvaFormateada.unshift([firstX,0])
                curvaFormateada.push([lastX,0])
            }

            // ? Definir puntos definitivos
            let puntos = curvaFormateada;


            let funcion = this.funcionCurva;
            let curvePath = (funcion == 'line') ? d3.line()(puntos) : d3.area()(puntos);

            switch (this.$props.curveStyle) {
                
                case 'curveBasis': 
                    // Curva suave
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveBasis)(puntos) : d3.area().curve(d3.curveBasis)(puntos)
                    break;
                
                case 'curveBasisClosed': 
                    // Une el primero y último
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveBasisClosed)(puntos) : d3.area().curve(d3.curveBasisClosed)(puntos)
                    break;
                
                case 'curveBasisOpen': 
                    // Ignora el primero y último
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveBasisOpen)(puntos) : d3.area().curve(d3.curveBasisOpen)(puntos)
                    break;
                
                case 'curveCatmullRom': 
                    // Curva suave con nivel de suavidad
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveCatmullRom.alpha(this.$props.lvl))(puntos) : d3.area().curve(d3.curveCatmullRom.alpha(this.$props.lvl))(puntos)
                    break;
                
                case 'curveCatmullRomClosed': 
                    // Curva suave con nivel de suavidad
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveCatmullRomClosed.alpha(this.$props.lvl))(puntos) : d3.area().curve(d3.curveCatmullRomClosed.alpha(this.$props.lvl))(puntos)
                    break;
                
                case 'curveCatmullRomOpen': 
                    // Curva suave con nivel de suavidad
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveCatmullRomOpen.alpha(this.$props.lvl))(puntos) : d3.area().curve(d3.curveCatmullRomOpen.alpha(this.$props.lvl))(puntos)
                    break;
                
                case 'curveBundle': 
                    // Curva suave. Permite Suavizar en función del eje x, pudiendo volver una curva en diagonal. 1 es normal <> 0 es plana
                    let targetLvl = 1
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveBundle.beta(targetLvl))(puntos) : d3.area().curve(d3.curveBundle.beta(targetLvl))(puntos)
                    break;
                
                case 'curveCardinal': 
                    // Curva con tensión entre conexiones flexible. 
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveCardinal.tension(this.$props.lvl))(puntos) : d3.area().curve(d3.curveCardinal.tension(this.$props.lvl))(puntos)
                    break;
                
                case 'curveCardinalClosed': 
                    // Curva con tensión entre conexiones flexible. Cierra los extremos.
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveCardinalClosed.tension(this.$props.lvl))(puntos) : d3.area().curve(d3.curveCardinalClosed.tension(this.$props.lvl))(puntos)
                    break;
                
                case 'curveCardinalOpen': 
                    // Curva con tensión entre conexiones flexible. No considera extremos
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveCardinalOpen.tension(this.$props.lvl))(puntos) : d3.area().curve(d3.curveCardinalOpen.tension(this.$props.lvl))(puntos)
                    break;
                
                case 'curveLinear': 
                    // Curva lineal
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveLinear)(puntos) : d3.area().curve(d3.curveLinear)(puntos)
                    break;
                
                case 'curveLinearClosed': 
                    // Curva lineal cerrada
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveLinearClosed)(puntos) : d3.area().curve(d3.curveLinearClosed)(puntos)
                    break;
                
                case 'curveMonotoneX': 
                    // Curva lineal cerrada
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveMonotoneX)(puntos) : d3.area().curve(d3.curveMonotoneX)(puntos)
                    break;
                
                case 'curveMonotoneY': 
                    // Curva lineal cerrada
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveMonotoneY)(puntos) : d3.area().curve(d3.curveMonotoneY)(puntos)
                    break;
                
                case 'curveStep': 
                    // Como escalera
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveStep)(puntos) : d3.area().curve(d3.curveStep)(puntos)
                    break;
                
                case 'curveStepAfter': 
                    // Como escalera. Considera hor-inicio/ver-fin
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveStepAfter)(puntos) : d3.area().curve(d3.curveStepAfter)(puntos)
                    break;
                
                case 'curveStepBefore': 
                    // Como escalera. Considera ver-inicio/hor-fin
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveStepBefore)(puntos) : d3.area().curve(d3.curveStepBefore)(puntos)
                    break;
                
                case 'curveNatural': 
                    // Curva lineal cerrada
                    curvePath = (funcion == 'line') ? d3.line().curve(d3.curveNatural)(puntos) : d3.area().curve(d3.curveNatural)(puntos)
                    break;
            
            
                default:

                curvePath = (funcion == 'line') ? d3.line().curve(d3.curveBasis)(puntos) : d3.area().curve(d3.curveBasis)(puntos);

                    break;
                
            }

            return curvePath;


        },
        curveFeatures(){
            return {
                d: this.curvePath,
            }
        }
    },
    watcher:{
        
    },
    methods: {
        methodThatForcesUpdate() {
            // ...
            this.$forceUpdate();  // Notice we have to use a $ here
            // ...
        }
    },
    created(){

    }
}
</script>