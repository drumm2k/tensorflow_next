import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';

export default function Index() {
  const [inputValue, setInputValue] = useState<number>(1);
  const [processing, setProcessing] = useState<boolean>(true);
  const [result, setResult] = useState<any>('');

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  useEffect(() => {
    // Train the model
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    model.fit(xs, ys, { epochs: 500 }).then(() => {
      setProcessing(false);
    });
  }, []);

  const handleInputChange = (e: any) => {
    setInputValue(+e.target.value);
  };

  const handleClick = async () => {
    const result = await model.predict(tf.tensor2d([inputValue], [1, 1])).data();
    setResult(result);
  };

  return (
    <Container>
      <Title>TF test</Title>
      <input type="number" onChange={(e) => handleInputChange(e)}></input>
      <button type="button" onClick={handleClick} disabled={processing}>
        {processing ? 'Processing' : 'Start'}
      </button>
      <div>{result}</div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin: 50px 0;
`;
