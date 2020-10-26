s.quit;
(
s.reboot;
thisProcess.openUDPPort(57120);
n = NetAddr("127.0.0.1", 57120);
)

NetAddr.langPort
NetAddr.localAddr

OSCFunc.trace(true);
OSCFunc.trace(false);

(
SynthDef(\syn1, {
	|out = 0, freq = 440, gate = 1|
	var sin = SinOsc.ar(freq);
	var env = EnvGen.ar(Env.perc, gate, doneAction: 2);
	Out.ar(out, sin * env!2 * 0.1);
}).add;
)

OSCdef(\syn, {|msg, time, addr, recvPort| Synth(\syn1, [\freq, msg[1].midicps])}, '/SC/syn1/freq');
s.boot;


(
SynthDef(\syn2, {
		arg note = 60, freq=100, rate=2, cutoff=20, amp=0.1, gate=1,
		attack = 0.1, decay = 0.3, sustain = 0.9, release = 0.2, mw = 10, out=0;
		var lfo1, lfo2, env, env2, modenv, sig, temp, sum;
		lfo1 = SinOsc.kr(1);
		lfo2 = SinOsc.kr(lfo1, 0, 100, 200);
	    env = EnvGen.ar(Env.perc, gate, doneAction: 2);
		sum = 0;
		5.do{
			temp = VarSaw.ar(
			50 + freq,
				0.1*{Rand(0.5, 0.6)} !2,
				{ExpRand(0.01, 0.05)}!2
			);
			sum = sum + temp;
		};
		sum = sum + temp;
	// var env = EnvGen.ar(Env.perc, gate, doneAction: 2);
	    env2 = EnvGen.kr(Env.adsr(1.0, 0.5, 0.2, 1), gate, doneAction:2);
	sig = LPF.ar(sum, 100 + cutoff*8);
	// sig = BRF.ar(sig, 200 + SinOsc.ar(3, mul: 0.2));
	// sig = Resonz.ar(sig, 1200 * SinOsc.ar(1.4, mul: 0.9, add: 0.7) + 500, 1);

	    Out.ar(out, sig * env * amp * 0.2);
	}).add;
)

OSCdef(\syn_a, {|msg, time, addr, recvPort| Synth(\syn2, [\freq, msg[1]])}, '/SC/syn2/freq');
OSCdef(\syn_b, {|msg, time, addr, recvPort| Synth(\syn2, [\cutoff, msg[1]] )}, '/SC/syn2/cutoff');