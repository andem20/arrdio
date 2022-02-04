use crate::audio::audio_data::AudioData;

pub struct WAV {}
// Could be generi c
impl WAV {
    pub fn sample_rate(data: &Vec<u8>) -> u32 {
        u32::from_str_radix(&format!("{:08b}{:08b}", data[25], data[24]), 2).unwrap()
    }

    pub fn bit_rate(data: &Vec<u8>) -> u8 {
        data[34]
    }

    pub fn data(data: Vec<u8>) -> Vec<f32> {
        data[43..]
            .to_vec()
            .windows(2)
            .skip(1)
            .step_by(2)
            // Concat bits little endian and convert to f32
            .map(|x| ((((x[1] as i8) as i32) << 8) | x[0] as i32) as f32 / (i16::MAX as f32))
            .collect()
    }

    pub fn split_data(data: Vec<f32>) -> AudioData {
        let mut positive = vec![0.0; data.len()];
        let mut negative = vec![0.0; data.len()];

        for i in 0..data.len() {
            if data[i] > 0.0 {
                positive[i] = data[i];
            } else {
                negative[i] = data[i];
            }
        }

        AudioData::new(positive, negative)
    }
}