import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import {getData} from './data.js';
import { input } from '@tensorflow/tfjs';

window.onload = async () => {
    const data = getData(400);
    
    tfvis.render.scatterplot(
        {name: 'xor_data'},
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );
    
    const model = tf.sequential();

    //添加全链接层 神经元个数为4, relu主要提供非线性激活函数 第二层的sigmord用来压缩数据的
    model.add(tf.layers.dense({
        units: 4,
        inputShape: [2],
        activation: 'relu'
    }));

    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));

    // 设置损失函数和优化器
    model.compile({
        loss: tf.losses.logLoss,
        optimizer: tf.train.adam(0.1)
    });

    const inputs = tf.tensor(data.map(p => [p.x,p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    await model.fit(inputs, labels,{
        epochs: 50,
        batchSize: 100,
        callbacks: tfvis.show.fitCallbacks(
            {name: '训练过程'},
            ['loss']
        )
    });

    window.predict = async (form) => {
        const pred = await model.predict(tf.tensor([[form.x.value * 1, form.y.value * 1]]));
        alert('预测结果： '+pred.dataSync()[0]);
    }
};