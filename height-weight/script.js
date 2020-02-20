import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
window.onload = async () =>{
    const heights = [150,160,170];
    const weights = [40,50,60];

    tfvis.render.scatterplot(
        {name: "身高体重"},
        {values:heights.map((x,i)=>({x, y:weights[i]}))},
        {
            xAxisDomain: [140,180],
            yAxisDomain: [30,70]
        }
    );

    // 归一化 全部减去150 在除了最后170-150的20 ，范围就压缩到0-1
    const inputs = tf.tensor(heights).sub(150).div(20);
    // inputs.print();
    const labels = tf.tensor(weights).sub(40).div(20);
    // labels.print();

    const model = tf.sequential();
    model.add(tf.layers.dense({units:1,inputShape:[1]}));
    model.compile({
        loss:tf.losses.meanSquaredError,
        optimizer:tf.train.sgd(0.1)
    });

    await model.fit(inputs, labels, {
        batchSize:3,
        epochs: 200,
        callbacks: tfvis.show.fitCallbacks(
            {name:'身高体重'},
            ['loss']
        )
    });

    const output = model.predict(tf.tensor([180]).sub(150).div(20));
    alert('如果身高为180，则体重为 '+output.mul(20).add(40).dataSync()[0]);
};