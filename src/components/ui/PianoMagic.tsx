import { useEffect, useRef, useState } from 'react';
import { Music2, Volume2, VolumeX } from 'lucide-react';

const NOTES = [
  { note: 'C4', label: 'До', freq: 261.63 },
  { note: 'D4', label: 'Ре', freq: 293.66 },
  { note: 'E4', label: 'Ми', freq: 329.63 },
  { note: 'F4', label: 'Фа', freq: 349.23 },
  { note: 'G4', label: 'Соль', freq: 392.0 },
  { note: 'A4', label: 'Ля', freq: 440.0 },
  { note: 'B4', label: 'Си', freq: 493.88 },
  { note: 'C5', label: 'До', freq: 523.25 },
];

// Небольшая спокойная петля: мелодия + мягкие аккордовые ноты.
const MELODY = [
  [0, 0.45], [2, 0.45], [4, 0.55], [7, 0.8],
  [6, 0.42], [4, 0.42], [2, 0.55], [0, 0.9],
  [4, 0.45], [5, 0.45], [7, 0.65], [5, 0.45],
  [4, 0.45], [2, 0.65], [0, 0.9],
] as const;

const CHORDS = [
  [0, 4, 7],
  [5, 0, 2],
  [3, 7, 2],
  [4, 0, 2],
] as const;

export default function PianoMagic() {
  const audioRef = useRef<AudioContext | null>(null);
  const ambientTimerRef = useRef<number | null>(null);
  const chordTimerRef = useRef<number | null>(null);
  const melodyStepRef = useRef(0);
  const chordStepRef = useRef(0);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [ambient, setAmbient] = useState(false);

  const getAudio = () => {
    if (!audioRef.current) audioRef.current = new AudioContext();
    if (audioRef.current.state === 'suspended') void audioRef.current.resume();
    return audioRef.current;
  };

  const playNote = (frequency: number, duration = 0.9, volume = 0.22) => {
    const ctx = getAudio();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3600, now);
    filter.Q.value = 0.55;
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    master.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    master.connect(filter).connect(ctx.destination);

    [1, 2.01, 3.98].forEach((multiplier, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = index === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(frequency * multiplier, now);
      gain.gain.value = index === 0 ? 1 : index === 1 ? 0.14 : 0.045;
      osc.connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + duration + 0.06);
    });
  };

  const pressKey = (index: number) => {
    setActiveKey(index);
    playNote(NOTES[index].freq, 1.0, 0.22);
    window.setTimeout(() => setActiveKey((current) => (current === index ? null : current)), 170);
  };

  const stopAmbient = () => {
    if (ambientTimerRef.current) window.clearInterval(ambientTimerRef.current);
    if (chordTimerRef.current) window.clearInterval(chordTimerRef.current);
    ambientTimerRef.current = null;
    chordTimerRef.current = null;
  };

  useEffect(() => stopAmbient, []);

  useEffect(() => {
    if (!ambient) {
      stopAmbient();
      return;
    }

    melodyStepRef.current = 0;
    chordStepRef.current = 0;

    const playMelody = () => {
      const [index, duration] = MELODY[melodyStepRef.current % MELODY.length];
      playNote(NOTES[index].freq, duration + 0.35, 0.105);
      melodyStepRef.current += 1;
    };

    const playChord = () => {
      const chord = CHORDS[chordStepRef.current % CHORDS.length];
      chord.forEach((index, i) => {
        window.setTimeout(() => playNote(NOTES[index].freq / 2, 2.3, 0.025), i * 55);
      });
      chordStepRef.current += 1;
    };

    playMelody();
    playChord();
    ambientTimerRef.current = window.setInterval(playMelody, 520);
    chordTimerRef.current = window.setInterval(playChord, 2080);

    return stopAmbient;
  }, [ambient]);

  return (
    <div className="piano-magic relative overflow-hidden rounded-3xl border border-graphite/10 bg-white/80 p-4 shadow-xl shadow-graphite/5 backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brass/15 blur-3xl" />
      <div className="relative mb-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-graphite">
            <Music2 size={16} className="text-brass" />
            Попробуйте сыграть
          </p>
          <p className="mt-0.5 text-xs text-graphite/50">Нажмите на клавишу</p>
        </div>
        <button
          type="button"
          onClick={() => setAmbient((value) => !value)}
          className={`inline-flex w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-3 ${
            ambient
              ? 'border-brass/30 bg-brass/10 text-graphite'
              : 'border-graphite/10 bg-cream text-graphite'
          }`}
          aria-pressed={ambient}
        >
          {ambient ? <Volume2 size={14} className="text-brass" /> : <VolumeX size={14} className="text-graphite/50" />}
          {ambient && <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span>}
          {ambient ? 'Музыка играет' : 'Включить музыку'}
        </button>
      </div>

      <div className="relative flex h-24 w-full select-none sm:h-28">
        {NOTES.map((item, index) => (
          <button
            key={item.note}
            type="button"
            aria-label={`Нота ${item.label}`}
            onPointerDown={(event) => {
              event.preventDefault();
              pressKey(index);
            }}
            className={`piano-key group relative h-full min-w-0 flex-1 rounded-b-xl border border-graphite/15 bg-gradient-to-b from-white to-[#f2eee8] shadow-[0_5px_0_rgba(26,26,26,0.08)] transition-all duration-150 ease-out ${
              activeKey === index
                ? 'translate-y-1 shadow-[0_1px_0_rgba(26,26,26,0.08)] from-[#eee8df] to-[#e5ded4]'
                : 'hover:-translate-y-0.5 hover:shadow-[0_7px_0_rgba(26,26,26,0.08)]'
            }`}
          >
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium text-graphite/30 transition-colors group-hover:text-brass/70">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
