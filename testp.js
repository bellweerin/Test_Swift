const axios = require('axios')
const tf = require('@tensorflow/tfjs')

async function predict() {
    try {
        let datas = await getData()
        let arr = []

        let model = tf.read;
        model.summary();

        // console.log(typeof (datas))

        // let a = Object.values(datas)
        // for (i = 0, i < a.length; i++;){
        //     console.log(a[i])
        //     let k = Object.values(a[i])
        //     // console.log(k)
        //     arr.push(k)
        // }

        // console.log(arr)

        
        
        // for (let data in datas) {
        //     let a = Object.values(data)
        //     arr.push(a)
        // }
        // console.log(a)
        // tf.read_json(datas)
       
        
        
    } catch (error) {
        console.log(error)

    }

}

async function getData() {
    let request = await axios.get("http://3.1.189.234:8091/data/ttntest")
    let datas = request.data
         
    return datas

}

predict()
module.exports = { predict, getData }











// async function trainModel(inputs, outputs, trainingsize, window_size, n_epochs, learning_rate, n_layers, callback){

//     const input_layer_shape  = window_size;
//     const input_layer_neurons = 100;
  
//     const rnn_input_layer_features = 10;
//     const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features;
  
//     const rnn_input_shape  = [rnn_input_layer_features, rnn_input_layer_timesteps];
//     const rnn_output_neurons = 20;
  
//     const rnn_batch_size = window_size;
  
//     const output_layer_shape = rnn_output_neurons;
//     const output_layer_neurons = 1;
  
//     const model = tf.sequential();
  
//     let X = inputs.slice(0, Math.floor(trainingsize / 100 * inputs.length));
//     let Y = outputs.slice(0, Math.floor(trainingsize / 100 * outputs.length));
  
//     const xs = tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10));
//     const ys = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1]).div(tf.scalar(10));
  
//     model.add(tf.layers.dense({units: input_layer_neurons, inputShape: [input_layer_shape]}));
//     model.add(tf.layers.reshape({targetShape: rnn_input_shape}));
  
//     let lstm_cells = [];
//     for (let index = 0; index < n_layers; index++) {
//          lstm_cells.push(tf.layers.lstmCell({units: rnn_output_neurons}));
//     }
  
//     model.add(tf.layers.rnn({
//       cell: lstm_cells,
//       inputShape: rnn_input_shape,
//       returnSequences: false
//     }));
  
//     model.add(tf.layers.dense({units: output_layer_neurons, inputShape: [output_layer_shape]}));
  
//     model.compile({
//       optimizer: tf.train.adam(learning_rate),
//       loss: 'meanSquaredError'
//     });
  
//     const hist = await model.fit(xs, ys,
//       { batchSize: rnn_batch_size, epochs: n_epochs, callbacks: {
//         onEpochEnd: async (epoch, log) => {
//           callback(epoch, log);
//         }
//       }
//     });
  
//     return { model: model, stats: hist };
//   }