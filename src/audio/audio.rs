use wasm_bindgen::prelude::*;
use crate::audio::utils::WAV;
use crate::audio::audio_data::AudioData;

#[wasm_bindgen]
pub struct Audio {
    sample_rate: u32,
    bit_rate: u8,
    sample_length: usize,
    positive: Vec<f32>,
    negative: Vec<f32>
}

#[wasm_bindgen]
impl Audio {
    pub fn get_sample_rate(&self) -> u32 {
        self.sample_rate
    }

    pub fn get_bit_rate(&self) -> u8 {
        self.bit_rate
    }

    pub fn get_sample_length(&self) -> usize {
        self.sample_length
    }

    pub fn resize(&self, chunk_size: usize) -> AudioData {
        let mut positive = Vec::new();
        let mut negative = Vec::new();

        let data_positive = &self.positive;
        let data_negative = &self.negative;

        for i in (0..data_positive.len()).step_by(chunk_size) {
            let mut chunk_end = i + chunk_size;

            if chunk_end > data_positive.len() {
                chunk_end = data_positive.len() - 1;
            }

            let sum_positive: f32 = data_positive[i..chunk_end].iter().sum();
            let sum_negative: f32 = data_negative[i..chunk_end].iter().sum();

            positive.push(sum_positive / chunk_size as f32);
            negative.push(sum_negative / chunk_size as f32);
        }

        AudioData::new(positive, negative)
    }
}

#[wasm_bindgen]
pub fn load_data(data: Vec<u8>) -> Audio {
    let sample_rate = WAV::sample_rate(&data);
    let bit_rate = WAV::bit_rate(&data);
    let audio_data = WAV::split_data(WAV::data(data));
    let sample_length = audio_data.get_positive().len();

    Audio {
        sample_rate,
        bit_rate,
        sample_length,
        positive: audio_data.get_positive(),
        negative: audio_data.get_negative()
    }
}