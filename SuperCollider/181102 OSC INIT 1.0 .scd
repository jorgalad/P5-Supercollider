s.quit;
s.boot;

(
s.reboot;
thisProcess.openUDPPort(57120);
n = NetAddr("127.0.0.1", 57120);
)
NetAddr.langPort
NetAddr.localAddr


OSCFunc.trace(true);
// Trace dumps all incoming OSC messages somewhere else, best not use it
OSCFunc.trace(false);


(
SynthDef(\syn1, {
	|out = 0, freq = 440, gate = 1|
	var sin = SinOsc.ar(freq);
	var env = EnvGen.ar(Env.perc, gate, doneAction: 2);
	Out.ar(out, sin * env!2 * 0.1);
}).add;
)

OSCdef(\syn, {|msg, time, addr, recvPort| Synth(\syn1, [\freq, msg[1]])}, '/SC/syn1/freq');
OSCdef(\syn, {|msg, time, addr, recvPort| Synth(\syn1, [\cutoff, msg[1]])}, '/SC/syn1/cutoff');


(
OSCdef(\syn,
	{|msg, time, addr, recvPort| Synth(\syn, [\freq, msg[1].midicps])},
	'/Supercollider/Inst/Syn');
)





// stop posting.
thisProcess.removeOSCRecvFunc(f);