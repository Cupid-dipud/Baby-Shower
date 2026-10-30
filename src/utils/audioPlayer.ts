// Audio synthesizer & player for Royal Jain Celebration
// Combines Web Audio API synthesized royal raag (works 100% offline & without external dependencies)
// with pleasant chimes, gong, and auspicious temple music.

class RoyalAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private listeners: ((playing: boolean) => void)[] = [];
  private externalAudio: HTMLAudioElement | null = null;

  constructor() {
    // Try to prepare an external ambient track as secondary option
    if (typeof window !== 'undefined') {
      try {
        // High quality royalty-free Indian classical shehnai/sitar stream or local fallback
        this.externalAudio = new Audio(
          'https://actions.google.com/sounds/v1/ambiences/temple_bell_extended.ogg'
        );
        this.externalAudio.loop = true;
        this.externalAudio.volume = 0.35;
      } catch (e) {
        // Fallback gracefully
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Subscribe to play/pause state changes
  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Start royal ambient background raag
  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    // Start synthetic Indian Raag sequence
    this.startIndianRaagDrone();
    this.scheduleRaagNotes();

    if (this.externalAudio) {
      this.externalAudio.play().catch(() => {});
    }
  }

  // Stop music
  public pauseMusic() {
    this.isPlaying = false;
    this.notify();

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.droneOsc && this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          this.droneOsc?.stop();
          this.droneOsc?.disconnect();
          this.droneOsc = null;
        }, 900);
      } catch (e) {}
    }
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
  }

  public toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.startMusic();
    }
  }

  // Continuous harmonic Tanpura/Bhairavi drone
  private startIndianRaagDrone() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sa - Pa (Base C3 = 130.81Hz, Pa = 196.00Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130.81, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();

      this.droneOsc = osc;
      this.droneGain = gain;
    } catch (e) {}
  }

  // Melodic shehnai/sitar meditative notes in auspicious Bilawal/Yaman
  private scheduleRaagNotes() {
    if (!this.ctx) return;

    // Frequencies for Indian classical scale: Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa'
    const notes = [
      261.63, // C4 (Sa)
      293.66, // D4 (Re)
      329.63, // E4 (Ga)
      349.23, // F4 (Ma)
      392.00, // G4 (Pa)
      440.00, // A4 (Dha)
      493.88, // B4 (Ni)
      523.25, // C5 (Taar Sa)
      587.33  // D5 (Taar Re)
    ];

    let step = 0;
    this.timerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;

      const baseFreq = notes[step % notes.length];
      this.playPluckNote(baseFreq, 1.4);

      // Harmonize occasionally
      if (step % 3 === 0) {
        setTimeout(() => {
          if (this.isPlaying) this.playPluckNote(baseFreq * 1.5, 1.2);
        }, 320);
      }

      step++;
    }, 1100);
  }

  // Soft plucked note (Sitar / Veena harmonic envelope)
  private playPluckNote(freq: number, duration: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration + 0.1);
    } catch (e) {}
  }

  // Sound effect: Royal Palace Gong / Gate Opening Chime
  public playGateSound() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, this.ctx.currentTime + 3.5);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 4.0);

      // Also trigger bright brass / trumpet herald
      setTimeout(() => {
        this.playPluckNote(523.25, 2.0);
        this.playPluckNote(659.25, 2.2);
      }, 300);
    } catch (e) {}
  }

  // Sound effect: Bell chime when flowers shower
  public playBlessingChime() {
    this.initContext();
    if (!this.ctx) return;
    try {
      [880, 1046.5, 1318.51, 1567.98].forEach((f, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 1.3);
        }, idx * 120);
      });
    } catch (e) {}
  }
}

export const royalAudio = new RoyalAudioManager();
