/**
 * * Coordinates:  
 */
import * as d3 from "d3"
export const Coordinates = {
    props: {
        cId : {
            type: [String, Boolean],
            default: false,
        },
        watchHover: {
            type: Boolean,
            default: false,
        },
        watchSelect: {
            type: Boolean,
            default: false,
        },
        watchClick: {
            type: Boolean,
            default: false,
        },
        watchTime: {
            type: [Boolean, Number],
            default: false,
        },
        watchScreenResize: {
            type: Boolean,
            default: false,
        },
        watchScreenScroll: {
            type: Boolean,
            default: false,
        },
        // ? Establecedores de coordenadas
        centered:{
            type: Boolean,
            default: false,
        },
        centeredX:{
            type: Boolean,
            default: false,
        },
        centeredY:{
            type: Boolean,
            default: false,
        },
        top:{
            type: Boolean,
            default: false,
        },
        bottom:{
            type: Boolean,
            default: false,
        },
        left:{
            type: Boolean,
            default: false,
        },
        right:{
            type: Boolean,
            default: false,
        },
        // ?
        callResize:{
            type: Boolean,
            default: false,
        },

    },
    watch: {
        // ? Se ejecutan transformaciones
        centered(newValue, oldValue) {
            this.orient()
        },
        centeredX(newValue, oldValue) {
            this.orient()
        },
        centeredY(newValue, oldValue) {
            this.orient()
        },
        top(newValue, oldValue) {
            this.orient()
        },
        bottom(newValue, oldValue) {
            this.orient()
        },
        left(newValue, oldValue) {
            this.orient()
        },
        right(newValue, oldValue) {
            this.orient()
        },
        tx(newValue, oldValue) {
            this.orient()
        },
        ty(newValue, oldValue) {
            this.orient()
        },
        bx(newValue, oldValue) {
            this.orient()
        },
        by(newValue, oldValue) {
            this.orient()
        },
        oy(newValue, oldValue) {
            this.orient()
        },
        ox(newValue, oldValue) {
            this.orient()
        },
        manualResize(n,o) {
            console.log("siempre")
            if(n == true){
                console.log("cambio")
            } else {
                console.log("no cambio")
            }
            // if(newValue){
                // this.getElSize()
            // }
        },
    },
    data(){
        return {

            cid: false,

            hoveredX:   0,
            hoveredY:   0,
            hovering:   false,
            hovers: 0,

            selectedX1: 0,
            selectedY1: 0,
            selectedX2: 0,
            selectedY2: 0,
            selectedXD: 0,
            selectedYD: 0,
            selectedValidXY: false,
            selectedValidX: false,
            selectedValidY: false,

            w:0,
            h:0,
            sw:0,
            sh:0,
            sx:0,
            sy:0,
            l:0,

            clickedX:   0,
            clickedY:   0,
            clicks:     0,

            manualResize: this.$props.callResize,

        }
    },
    methods: {
        getElSize(){            
            if(this.$refs.coordinatorsvg){
                let dom = this.$el
                this.w = Math.round(dom.clientWidth * 100) / 100
                this.h = Math.round(dom.clientHeight * 100) / 100
            }
            if(!this.$refs.coordinatorsvg){
                let dom = this.$el.getBoundingClientRect()
                this.w = Math.round(dom.width * 100) / 100
                this.h = Math.round(dom.height * 100) / 100   
            }
            
            if(this.$refs.coordinatorpath || this.$refs.coordinatorrect){
                let dom = this.$el
                this.l = Math.round(dom.getTotalLength() * 100) / 100
            }


            
            let svgspace = this.$el
            this.sw = svgspace.getBBox().width
            this.sh = svgspace.getBBox().height
            this.sx = svgspace.getBBox().x
            this.sy = svgspace.getBBox().y
            

            if(this.manualResize){
                // this.$emit('coordinates', this.eventsRes)            
            }

        },
        updateCoords(){
            this.getElSize()           
            this.$emit('coordinates', this.eventsRes)
        },
        mouseLeft: function(event){
            this.hovering = false
        },
        mouseIsMoving: function(event){
            var target = event.target
            
            var x = event.offsetX;
            var y = event.offsetY;

            this.hoveredX = (x > 0) ? x : 0
            this.hoveredY = (y > 0) ? y : 0
            if(this.$refs.coordinatorsvg){
                // console.log("svg")
            }
            if(this.$refs.coordinatorg){
                // console.log("g")
            }
            if(this.$refs.coordinatorrect){
                // console.log(this.$el.getBoundingClientRect())
                // console.log(this.$refs.coordinatorrect.getBoundingClientRect())
                // console.log(event)
            }
            if(this.$refs.coordinatorg){
                let gx = this.$refs.coordinatorg.getBoundingClientRect()
                let gy = this.$refs.coordinatorg.getBoundingClientRect()
            }
            if(!this.hovering){
                this.hovers++
            }
            this.hovering = true

            this.updateCoords()
            this.$emit('hovered', this.hoveredRes)                    
        },
        mouseIsClicking: function(event){
            var target = event.target
            
            var x = event.offsetX;
            var y = event.offsetY;

            this.clickedX = (x > 0) ? x : 0
            this.clickedY = (y > 0) ? y : 0
            this.clicks++

            this.updateCoords()
            this.$emit('clicked', this.clickedRes)
        },
        selectIn: function(event){
            var target = event.target
            
            var x = event.offsetX;
            var y = event.offsetY;

            this.selectedX1 = (x > 0) ? x : 0
            this.selectedY1 = (y > 0) ? y : 0

        },
        selectOut: function(event){
            var target = event.target
            
            var x = event.offsetX;
            var y = event.offsetY;

            this.selectedX2 = (x > 0) ? x : 0
            this.selectedY2 = (y > 0) ? y : 0

            // ? Si los puntos del eje x son distintos, se movió, es válido
            if(this.selectedX1 !== this.selectedX2){
                this.selectedValidX = true
            }
            // ? Si los puntos del eje x son iguales, no se movió, es inválido
            if(this.selectedX1 == this.selectedX2){
                this.selectedValidX = false
            }
            // ? Si los puntos del eje y son distintos, se movió, es válido
            if(this.selectedY1 !== this.selectedY2){
                this.selectedValidY = true
            }
            // ? Si los puntos del eje y son iguales, no se movió, es inválido
            if(this.selectedY1 == this.selectedY2){
                this.selectedValidY = false
            }

            // ? Si ambas selecciones horizontales y verticales son válidas
            if(this.selectedValidY && this.selectedValidX){
                this.selectedValidXY = true
            } else {
                this.selectedValidXY = false
            }

            this.updateCoords()
            this.$emit('selected', this.selectedRes)
        },
        orient(){

            if(!this.$props.centered){
                this.gtx = (typeof(this.$props.tx) !== 'undefined') ? this.$props.tx : 0
                this.gty = (typeof(this.$props.ty) !== 'undefined') ? this.$props.ty : 0
            }
            if(!this.$props.centeredX && !this.$props.left && !this.$props.right){
                this.gtx = (typeof(this.$props.tx) !== 'undefined') ? this.$props.tx : 0
            }
            if(!this.$props.centeredY && !this.$props.top && !this.$props.bottom){
                this.gty = (typeof(this.$props.ty) !== 'undefined') ? this.$props.ty : 0
            }

            if(this.$props.centered){
                // * Si va a la derecha, se resta
                this.gtx = (this.sw / 2) * ((this.$props.ox == '+') ? -1 : 1)
                // * Si va a hacia arriba, se suma (sube)
                this.gty = (this.sh / 2) * ((this.$props.oy == '+') ? 1 : -1)
            } 
            if(this.$props.centeredX){
                this.gtx = (this.sw / 2) * ((this.$props.ox == '+') ? -1 : 1)
            }
            if(this.$props.left){
                this.gtx = (this.sw) * ((this.$props.ox == '+') ? 1 : -1)
            }
            if(this.$props.right){
                this.gtx = (this.sw) * ((this.$props.ox == '+') ? -1 : 1)
            }

            if(this.$props.centeredY){
                this.gty = (this.sh / 2) * ((this.$props.oy == '+') ? 1 : -1)
            } 
            if(this.$props.top){
                this.gty = (this.sh) * ((this.$props.oy == '+') ? -1 : 1)
            } 
            if(this.$props.bottom){
                this.gty = (this.sh) * ((this.$props.oy == '+') ? 1 : -1)
            } 
        }
    },
    computed: {
        /**
         * * hovered(): entrega la coordenada donde se está ubicado
         */
        hoveredRes:{
            cache: false,
            get(){
                return {
                    x: this.hoveredX,
                    y: this.hoveredY,
                    w: this.w,
                    h: this.h,
                    l: this.l,
                    sw: this.sw,
                    sh: this.sh,
                    sx: this.sx,
                    sy: this.sy,
                    cid: this.cid,
                    hovering: this.hovering,
                    hovers: this.hovers,
                    a: this.watchHover,
    
                }
            }
        },
        /**
         * * selected(): entrega las coordenadas de donde se está seleccionando
         */
        selectedRes:{
            cache: false,
            get(){
                return {
                    x1: this.selectedX1,
                    x2: this.selectedX2,
                    y1: this.selectedY1,
                    y2: this.selectedY2,
                    w: this.w,
                    h: this.h,
                    l: this.l,
                    sw: this.sw,
                    sh: this.sh,
                    sx: this.sx,
                    sy: this.sy,
                    cid: this.cid,
                    sXY: this.selectedValidXY,
                    sX: this.selectedValidX,
                    sY: this.selectedValidY,
                    a: this.watchSelect,
                }
            }
        },
        /**
         * * clicked(): entrega las coordenadas de donde se hizo click
         */
        clickedRes:{
            cache: false,
            get(){
                return {
                    x: this.clickedX,
                    y: this.clickedY,
                    w: this.w,
                    h: this.h,
                    l: this.l,
                    sw: this.sw,
                    sh: this.sh,
                    sx: this.sx,
                    sy: this.sy,
                    cid: this.cid,
                    clicks: this.clicks,
                    a: this.watchClick,
                }
            }
        },
        eventsRes:{
            cache: false,
            get(){
                return {
                    click: this.clickedRes,
                    hover: this.hoveredRes,
                    select: this.selectedRes,
                }
            }
        },
        coordFeatures(){
            return {
                cid: this.cid,
                w: this.w,
                h: this.h,
                l: this.l,  
                sw: this.sw,
                sh: this.sh,    
                sx: this.sx,
                sy: this.sy,    
            }
        },
        /**
         * * mayMousemove(): des||habilita el evento mousemove
         * @returns 
         */
        mayMousemove(){
            return this.watchHover ? 'mousemove' : null
        },
        /**
         * * mayMouseleave(): des||habilita el evento mouseleave
         * @returns 
         */
        mayMouseleave(){
            return this.watchHover ? 'mouseleave' : null
        },
        /**
         * * mayMousedown(): des||habilita el evento mousedown
         * @returns 
         */
        mayMousedown(){
            return this.watchSelect ? 'mousedown' : null
        },
        /**
         * * mayMouseup(): des||habilita el evento mouseup
         * @returns 
         */
        mayMouseup(){
            return this.watchSelect ? 'mouseup' : null
        },
        /**
         * * mayClick(): des||habilita el evento click
         * @returns 
         */
        mayClick(){
            return this.watchClick ? 'click' : null
        },
    },
    mounted(){
        this.getElSize()
        this.orient()
        this.cid = this._uid
        this.$emit('coordinates', this.eventsRes)

        // ? Crear un actualizador constante de coordenadas
        if(this.$props.watchTime){
            this.coordTimer = setInterval(() => {
                this.updateCoords();
            }, 1000)
        }
    },
    updated() {
        
    },
    
}