

const { createApp, ref } = Vue

createApp({
    setup() {
        
        const baseUrl = 'https://paper-demo.oss-cn-hongkong.aliyuncs.com/'
        
        const keys = [{ title: 'sample3', sent: 'Her shoes were like fishes.' }, { title: 'sample2', sent: 'And what are doves. And what are doves.' }]
        const selectedKeyTitle = ref('sample3')
        
        const existing_emos = ['Neutral', 'Angry', 'Happy', 'Sad', 'Surprise']
        const guidance_scales = [...Array.from({ length: 21 }, (_, i) => i), ...[30, 40, 50]] 
        // egtts/Guidance Distortion/Angry_/w0_A1.0/sample_2_20.wav
        const guidance_distortion = {'sample_2': {}, 'sample_3': {}}
        for (const ee of existing_emos) {
            for (const gs of guidance_scales) {
                const link = baseUrl + 'egtts/Guidance_Distortion/' + ee + '_/w' + gs + '_' + ee[0] + '1.0/sample_3_20.wav'
                if (guidance_distortion['sample_3'][ee]) {
                    guidance_distortion['sample_3'][ee].push({link, gs})
                } else {
                    guidance_distortion['sample_3'][ee] = [{link, gs}]
                }
            }
        }
        
        const nl_emos = ['Angry and sad', 'Excited', 'Joyful', 'Objective', 'Outraged', 'Shocked', 'a bit sad', 'in a happy tone']
        const nlc = []
        for (const ne of nl_emos) {
            nlc.push({ link: baseUrl + 'egtts/DESC_Comparison/' + ne + '_/w1_' + ne[0] + '1.0/sample_3_20.wav', ne })
        }
        
        const mixed_emos = ['Happy_Angry', 'Sad_Angry', 'Surprise_Angry', 'Happy_Surprise', 'Sad_Surprise']
        const mixed = {}
        for (const me of mixed_emos) {
            for (let i = 0; i <= 1; i += 0.1) {
                const link = baseUrl + 'egtts/Mixed_Emotion_Perception/' + me + '_/w3_' + me[0] + i.toFixed(1) + me.split('_')[1][0] + (1-i).toFixed(1) + '/sample_3_10.wav'
                if (mixed[me]) {
                    mixed[me].push({ link, i })
                } else {
                    mixed[me] = [{ link, i }]
                }
            }
        }

        function changeKeyTitle(title) {
            selectedKeyTitle.value = title
        }
        
        return {
            keys,
            guidance_distortion,
            nlc,
            mixed
        }
    }
}).mount('#app')

