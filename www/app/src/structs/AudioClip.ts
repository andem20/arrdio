import { Audio } from 'arrdio';

export class AudioClip {
    private _audio: Audio;
    private _sampleRate = 44100;
    private _position: number;
    private _width: number;

    constructor (audio: Audio, sampleRate: number, position: number, width: number) {
        this._audio = audio;
        this._position = position;
        this._width = width;
        this._sampleRate = sampleRate;
    }

    // Getters & Setters

    get audio(): Audio { return this._audio; }
    get position(): number { return this._position; }
    set position(position: number) { this._position = position; }
    get width(): number { return this._width; }
    set width(width: number) { this._width = width; }
    get sampleRate(): number { return this._sampleRate }

}