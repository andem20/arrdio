use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone)]
pub struct AudioData {
    positive: Vec<f32>,
    negative: Vec<f32>
}

#[wasm_bindgen]
impl AudioData {
    pub fn new(positive: Vec<f32>, negative: Vec<f32>) -> AudioData {
        AudioData {
            positive,
            negative
        }
    }

    pub fn get_positive(&self) -> Vec<f32> {
        self.positive.clone()
    }

    pub fn get_negative(&self) -> Vec<f32> {
        self.negative.clone()
    }
}