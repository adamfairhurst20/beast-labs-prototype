export const manifest = {
  screens: {
    scr_sotc6h: { name: "Q1 - Branch question", route: "/", state: { "answers": {}, "stepIndex": 0 }, position: { "x": 160, "y": 220 } },
    scr_1ua4xr: { name: "NP - Prior steps", route: "/", state: { "answers": { "branch": "new-patient" }, "stepIndex": 1 }, position: { "x": 160, "y": 2200 } },
    scr_2s47u8: { name: "NP - Symptom duration", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"] }, "stepIndex": 2 }, position: { "x": 2960, "y": 2200 } },
    scr_fjh7y2: { name: "NP - Symptoms", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"], "symptomDuration": "6-12" }, "stepIndex": 3 }, position: { "x": 1560, "y": 2200 } },
    scr_ngwmbp: { name: "NP - Severity", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"], "symptomDuration": "6-12", "symptoms": ["fatigue", "libido"] }, "stepIndex": 4 }, position: { "x": 4360, "y": 2200 } },
    scr_41vs1u: { name: "NP - Kit recommendation", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"], "symptomDuration": "6-12", "symptoms": ["fatigue", "libido", "focus"], "severity": "moderate" }, "stepIndex": 5 }, position: { "x": 5760, "y": 2200 } },
    scr_dig84c: { name: "NP - Added to basket", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"], "symptomDuration": "6-12", "symptoms": ["fatigue", "libido", "focus"], "severity": "moderate" }, "stepIndex": 6 }, position: { "x": 9960, "y": 2200 } },
    scr_ctofgy: { name: "NP - Delivery address", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"], "symptomDuration": "6-12", "symptoms": ["fatigue", "libido", "focus"], "severity": "moderate" }, "stepIndex": 7 }, position: { "x": 7160, "y": 2200 } },
    scr_hdll6r: { name: "NP - Order confirmation", route: "/", state: { "answers": { "branch": "new-patient", "priorSteps": ["research"], "symptomDuration": "6-12", "symptoms": ["fatigue", "libido", "focus"], "severity": "moderate", "deliveryAddress": { "line1": "14 Beaumont Street", "city": "London", "postcode": "SW1A 1AA", "country": "United Kingdom" }, "email": "alex@example.com" }, "stepIndex": 8 }, position: { "x": 8560, "y": 2200 } },
    scr_daeb5f: { name: "SW - Current medication", route: "/", state: { "answers": { "branch": "switcher" }, "stepIndex": 1 }, position: { "x": 2960, "y": 4180 } },
    scr_zr46ih: { name: "SW - Two low results", route: "/", state: { "answers": { "branch": "switcher", "currentMeds": ["cypionate"] }, "stepIndex": 2 }, position: { "x": 1560, "y": 4180 } },
    scr_wm10dh: { name: "SW - Upload blood tests", route: "/", state: { "answers": { "branch": "switcher", "currentMeds": ["cypionate"], "twoLowResults": "yes" }, "stepIndex": 3 }, position: { "x": 160, "y": 4180 } },
    scr_v89kku: { name: "SW - Create account", route: "/", state: { "answers": { "branch": "switcher", "currentMeds": ["cypionate"], "twoLowResults": "yes" }, "stepIndex": 4 }, position: { "x": 4360, "y": 4180 } },
    scr_y8aw8s: { name: "SW - Confirmation", route: "/", state: { "answers": { "branch": "switcher", "currentMeds": ["cypionate"], "twoLowResults": "yes", "email": "alex@example.com" }, "stepIndex": 5 }, position: { "x": 5760, "y": 4180 } }
  },
  sections: {
    sec_upwkpz: { name: "Q1 Branch", x: 0, y: 0, width: 1520, height: 1180 },
    sec_h765j3: { name: "NP Protocol Flow", x: 0, y: 1980, width: 11320, height: 1180 },
    sec_k8rqa6: { name: "SW Blood Test Flow", x: 0, y: 3960, width: 7120, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_upwkpz", children: [
    { kind: "screen", id: "scr_sotc6h" }]
  },
  { kind: "section", id: "sec_h765j3", children: [
    { kind: "screen", id: "scr_1ua4xr" },
    { kind: "screen", id: "scr_fjh7y2" },
    { kind: "screen", id: "scr_2s47u8" },
    { kind: "screen", id: "scr_ngwmbp" },
    { kind: "screen", id: "scr_41vs1u" },
    { kind: "screen", id: "scr_ctofgy" },
    { kind: "screen", id: "scr_hdll6r" },
    { kind: "screen", id: "scr_dig84c" }]
  },
  { kind: "section", id: "sec_k8rqa6", children: [
    { kind: "screen", id: "scr_wm10dh" },
    { kind: "screen", id: "scr_zr46ih" },
    { kind: "screen", id: "scr_daeb5f" },
    { kind: "screen", id: "scr_v89kku" },
    { kind: "screen", id: "scr_y8aw8s" }]
  }]

};