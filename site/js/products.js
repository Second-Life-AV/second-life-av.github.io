// Sample stock for the preview, taken from the Second Life AV eBay store (17 Oct 2026).
// Prices are the eBay listing prices, treated as VAT-inclusive.
// Grades are illustrative until each unit is graded against the published standard.
// art = product illustration id (see the sprite in src/partials/footer.html).
window.SLAV_CATEGORIES = [
  { id: "vc",       name: "Video conferencing",        blurb: "Video bars, cameras, touch controllers, conference phones", art: "p-vcbar" },
  { id: "displays", name: "Displays & LED",            blurb: "Commercial displays, LED wall parts, sensors",             art: "p-display" },
  { id: "audio",    name: "Audio & DSP",               blurb: "DSP, expanders, amplifiers, interfaces",                    art: "p-rack" },
  { id: "control",  name: "Control & switching",       blurb: "Processors, touch panels, AV over IP",                      art: "p-touch" },
  { id: "booking",  name: "Room booking",              blurb: "Booking panels and availability light bars",                art: "p-lightbar" },
  { id: "infra",    name: "Mounts, cabling & docks",   blurb: "HDBaseT extenders, docks, brackets",                        art: "p-extender" }
];

window.SLAV_PRODUCTS = [
  { id: "crestron-tsw-760", brand: "Crestron", title: "TSW-760 7in Touch Screen Control Panel", part: "TSW-760-NC-B-S", cat: "control", grade: "A", price: 95.00, spec: "7in capacitive touch screen · PoE · Black smooth finish", art: "p-touch", added: 20 },
  { id: "crestron-rmc3", brand: "Crestron", title: "RMC3 3-Series Room Media Controller", part: "6505761", cat: "control", grade: "B", price: 50.00, spec: "3-Series control processor · Ethernet · IR, serial and relay ports", art: "p-rack", added: 6 },
  { id: "crestron-hd-tx3", brand: "Crestron", title: "HD-TX3-C 4K HDMI over HDBaseT Transmitter", part: "HD-TX3-C-B · 6506330", cat: "infra", grade: "B", price: 15.99, spec: "4K HDMI over HDBaseT · pairs with HD-RX3-C", art: "p-extender", added: 12 },
  { id: "crestron-hd-rx3", brand: "Crestron", title: "HD-RX3-C HDBaseT HDMI Receiver", part: "HD-RX3-C-B", cat: "infra", grade: "B", price: 15.99, spec: "4K HDMI over shielded twisted pair · pairs with HD-TX3-C", art: "p-extender", added: 11 },
  { id: "crestron-tsw-760-lb", brand: "Crestron", title: "TSW-760 Room Availability Light Bar", part: "TSW-760-LB-B · 6509981", cat: "booking", grade: "A", price: 50.00, spec: "Clip-on red/green availability LEDs for TSW-760 panels", art: "p-lightbar", added: 19 },
  { id: "biamp-ex-aec", brand: "Biamp", title: "Tesira EX-AEC Mic/Line Expander", part: "EX-AEC", cat: "audio", grade: "A", price: 180.00, spec: "4 mic/line inputs with AEC · AVB networked · PoE+", art: "p-rack", added: 17 },
  { id: "biamp-ex-logic", brand: "Biamp", title: "Tesira EX-LOGIC Logic Expander", part: "EX-LOGIC", cat: "audio", grade: "A", price: 89.99, spec: "16 logic inputs/outputs · AVB networked · PoE", art: "p-rack", added: 2 },
  { id: "biamp-apart-ac128", brand: "Biamp / Apart", title: "AudioControl12.8 Matrix DSP", part: "AUDIOCONTROL12.8", cat: "audio", grade: "B", price: 99.99, spec: "12 in / 8 out audio matrix · zone control · DSP", art: "p-rack", added: 8 },
  { id: "bss-blu-hif", brand: "BSS Audio", title: "BLU-HIF VoIP Headset Interface", part: "BLU-HIF", cat: "audio", grade: "B", price: 50.00, spec: "BLU link headset/handset interface for VoIP", art: "p-rack", added: 3 },
  { id: "crown-180a", brand: "Crown", title: "180A Commercial Mixer-Amplifier", part: "180A", cat: "audio", grade: "C", price: 65.00, spec: "Commercial mixer-amplifier · 70/100V line and low-impedance outputs", art: "p-rack", added: 9 },
  { id: "poly-studio-usb", brand: "Poly", title: "Studio 4K USB Video Bar", part: "P009 · 2201-85308-001", cat: "vc", grade: "B", price: 27.99, spec: "4K USB video bar · auto-framing · built-in mics and speaker", art: "p-vcbar", added: 16 },
  { id: "poly-trio-c60", brand: "Poly", title: "Trio C60 Smart IP Conference Phone", part: "Trio C60", cat: "vc", grade: "A", price: 34.99, spec: "Conference phone for Teams, Zoom and SIP · PoE", art: "p-phone", added: 15 },
  { id: "polycom-trio-8500", brand: "Polycom", title: "RealPresence Trio 8500 Conference Phone", part: "Trio 8500", cat: "vc", grade: "C", price: 16.99, spec: "IP conference phone · PoE · Bluetooth and USB", art: "p-phone", added: 5 },
  { id: "cisco-sx10", brand: "Cisco", title: "TelePresence SX10 Quick Set", part: "68-100504-01", cat: "vc", grade: "B", price: 25.78, spec: "All-in-one HD video endpoint with integrated camera", art: "p-camera", added: 4 },
  { id: "cisco-touch-10", brand: "Cisco", title: "TelePresence Touch 10 Controller", part: "TTC5-09", cat: "vc", grade: "B", price: 15.99, spec: "10in touch controller for Cisco room systems · PoE", art: "p-touch", added: 13 },
  { id: "qbic-td-1050", brand: "Qbic", title: "TD-1050 10.1in Room Booking Panel", part: "TD-1050", cat: "booking", grade: "B", price: 30.00, spec: "10.1in Android touch panel PC · PoE · LED status bars", art: "p-lightbar", added: 18 },
  { id: "condeco-t201502", brand: "Condeco", title: "Room Booking Touch Screen V2", part: "T201502 V2", cat: "booking", grade: "B", price: 24.99, spec: "Meeting-room booking display for Condeco", art: "p-touch", added: 7 },
  { id: "novastar-ns060", brand: "NovaStar", title: "NS060-30A LED Ambient Light Sensor", part: "NS060-30A", cat: "displays", grade: "N", price: 79.99, spec: "Auto-brightness sensor for LED walls · 30m cable", art: "p-sensor", added: 14 },
  { id: "startech-usb3dock", brand: "StarTech", title: "USB 3.0 Triple-Video Docking Station", part: "USB3DOCKH2DP", cat: "infra", grade: "A", price: 80.00, spec: "Triple video (HDMI + 2× DisplayPort) · USB 3.0 · Gigabit Ethernet", art: "p-dock", added: 1 },
  { id: "qbic-brackets", brand: "Qbic", title: "TD-1050 Mounting Brackets (Lot of 46)", part: "TD-1050 bracket", cat: "infra", grade: "B", price: 50.00, spec: "Wall brackets for TD-1050 panels · sold as one lot", art: "p-mount", added: 10 }
];

window.SLAV_GRADES = {
  N: "New / unused",
  A: "Grade A · As new",
  B: "Grade B · Very good",
  C: "Grade C · Good"
};
