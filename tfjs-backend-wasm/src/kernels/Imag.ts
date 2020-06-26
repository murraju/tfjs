/* Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ===========================================================================*/

import {Imag, ImagInputs, registerKernel, TensorInfo} from '@tensorflow/tfjs-core';

import {BackendWasm} from '../backend_wasm';

export function imag(args: {backend: BackendWasm, inputs: ImagInputs}):
    TensorInfo {
  const {backend, inputs} = args;
  const {input} = inputs;

  const inputData = backend.dataIdMap.get(input.dataId);
  const imagPart = inputData.complexTensors.imag;

  const imagClone = backend.makeOutput(imagPart.shape, imagPart.dtype);
  return imagClone;
}

registerKernel({kernelName: Imag, backendName: 'wasm', kernelFunc: imag});