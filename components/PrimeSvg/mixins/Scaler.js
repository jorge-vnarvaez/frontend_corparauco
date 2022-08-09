export const Scaler = {
    props: {
        scales: {
            type: [Object, Boolean],
            default: false,
        }
    },
    computed: {
        scalesRes(){
            // scale
            // domain
            // range
            // clamp
            // round
            // paddingOuter
            // paddingInner
            // bands
            // align
            let input = this.$props.scales
            let inputKeys = Object.keys(input)
            let outputScales = {}

            inputKeys.forEach(el => {
                if(
                    (input[el].scale == 'scaleLinear' || input[el].scale == 'scaleTime') 
                    && input[el].domain 
                    && input[el].range
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        domain: input[el].domain, 
                        range: input[el].range, 
                        round: (input[el].round) ?? false,
                        clamp: (input[el].clamp) ?? false,
                    });
                }
                if(
                    input[el].scale == 'scaleBand' 
                    && input[el].bands 
                    && input[el].range 
                    && input[el].align
                ){
                    outputScales[el] = this.scaler({
                        scale: input[el].scale, 
                        bands: input[el].bands, 
                        range: input[el].range, 
                        align: input[el].align, 
                        paddingInner: (input[el].paddingInner) ?? 0, 
                        paddingOuter: (input[el].paddingOuter) ?? 0, 
                        round: (input[el].round) ?? false,
                    });
                }

                if(input[el].scale !== 'scaleLinear' && input[el].scale !== 'scaleTime' && input[el].scale !== 'scaleBand'){
                    outputScales[el] = false;
                }
            })

            return this.$props.scales ? outputScales : false;
        }
    },
    methods: {

    },
}