import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs'
import { input } from '@tensorflow/tfjs';

window.onload = async () => {
    const xs = [1,2,3,4];
    const ys = [1,3,5,7];
    //散点图
    tfvis.render.scatterplot(
        {name: '线性回归散点图'},
        {values: xs.map((x,i)=>({x, y: ys[i]}))},
        {xAxisDomain: [0,5],yAxisDomain:[0,8]}
    );
    
    //初始化一个模型 sequential 创建一个连续的模型
    const model = tf.sequential();
    
    // 创建一个全链接层 units设置一个神经元，inputShape 矩阵内部数字代表几个特征
    model.add(tf.layers.dense({units:1,inputShape: [1]}));

    // 对模型设置损失函数 optimizer 设置优化器sgd 内部为学习率
    model.compile({loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1)});
    
    const inputs = tf.tensor(xs);
    const labels = tf.tensor(ys);
    await model.fit(inputs, labels,{
        batchSize: 4,
        epochs: 200,
        callbacks: tfvis.show.fitCallbacks(
            {name: '训练过程'},
            ['loss']
        )
    });

    // perdict 你输入一个tensor会预测一个结果
    const output = model.predict(tf.tensor([5]));
    // output.print();
    alert('如果 x 为5，那么预测 y 为 '+output.dataSync()[0]);
};