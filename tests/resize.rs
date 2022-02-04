#[test]
fn resize() {
    let data = vec!(1., 2., 3., 4., 5., 6., 7., 8., 1., 2., 3., 4., 5., 6., 7., 8., 9., 1., 2., 3., 4., 5., 6., 7., 8., 9.);

    let mut positive = Vec::new();
    let mut negative = Vec::new();

    let data_positive = &data;
    let data_negative = &data;

    let chunk_size = 13;

    for i in (0..data.len()).step_by(chunk_size) {
        let chunk_end = i + chunk_size;

        let sum_positive: f32 = data_positive[i..chunk_end].into_iter().sum();
        let sum_negative: f32 = data_negative[i..chunk_end].into_iter().sum();

        positive.push(sum_positive / chunk_size as f32);
        negative.push(sum_negative / chunk_size as f32);
    }

    print!("{:?}", positive);
}

#[test]
fn time() {
    let start = std::time::Instant::now();
}