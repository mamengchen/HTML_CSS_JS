import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { getData } from './data.js';
import { input } from '@tensorflow/tfjs';

window.onload = async () => {
    const data = getData(400);
    //console.log(data);

    tfvis.render.scatterplot(
        {name: '逻辑回归数据模型'},
        {
            // filter 筛选的作用
            values:[
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    )

    // 如果shape不知道则可以看你的数据转换为tensor后的shape
    // console.log(tf.tensor([2,3]));
    // 特征变成2个x，y
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units:1,
        inputShape:[2],
        activation: 'sigmoid'
    }));
    model.compile({
        loss:tf.losses.logLoss,
        optimizer: tf.train.adam(0.1)
    })

    const inputs = tf.tensor(data.map(p=>[p.x,p.y]));
    const labels = tf.tensor(data.map(p=>p.label));

    await model.fit(inputs,labels, {
        batchSize: 40,
        epochs: 50,
        callbacks: tfvis.show.fitCallbacks(
            {name: '训练过程'},
            ['loss']
        )
    });

    window.predict = (form)=>{
        const pred = model.predict(tf.tensor([[form.x.value * 1,form.y.value *1]]));
        alert('预测结果：'+pred.dataSync()[0]);
    }
}