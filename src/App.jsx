import { useState } from "react";

const weeks = [
  { label: "Week 1", type: "normal", intensity: "Normal Load" },
  { label: "Week 2", type: "normal", intensity: "Normal Load" },
  { label: "Week 3", type: "overload", intensity: "Progressive Overload" },
  { label: "Week 4", type: "deload", intensity: "Deload Week" },
];

const absCircuits = {
  A: {
    label: "Abs Circuit A",
    note: "Lower abs & rotation focus — ~12 min",
    exercises: [
      { name: "Hanging Leg Raises", sets: "3", reps: "12–15", tip: "Dead hang, raise legs to 90° or higher. Avoid swinging.", video: "https://www.youtube.com/results?search_query=hanging+leg+raises+form" },
      { name: "Cable Woodchops", sets: "3", reps: "12 each side", tip: "High to low, rotate from core not arms. Keep hips square.", video: "https://www.youtube.com/results?search_query=cable+woodchop+form" },
      { name: "Plank", sets: "3", reps: "45–60 sec", tip: "Squeeze glutes, tuck pelvis slightly. Don't let hips sag.", video: "https://www.youtube.com/results?search_query=plank+form+core" },
    ],
  },
  B: {
    label: "Abs Circuit B",
    note: "Upper abs & stability focus — ~12 min",
    exercises: [
      { name: "Cable Crunch", sets: "3", reps: "12–15", tip: "Kneel, curl spine forward. Pull from abs, not hip flexors.", video: "https://www.youtube.com/results?search_query=cable+crunch+form" },
      { name: "Ab Wheel Rollout", sets: "3", reps: "8–12", tip: "Go as far as you can with a flat back. Pull back slowly.", video: "https://www.youtube.com/results?search_query=ab+wheel+rollout+form" },
      { name: "Dead Bug", sets: "3", reps: "10 each side", tip: "Press lower back into floor. Extend opposite arm & leg slowly.", video: "https://www.youtube.com/results?search_query=dead+bug+exercise+form" },
    ],
  },
  C: {
    label: "Abs Circuit C",
    note: "Obliques & anti-rotation focus — ~12 min",
    exercises: [

      { name: "Side Plank", sets: "3", reps: "30–45 sec each", tip: "Stack feet, lift hips. Body in a straight line head to heel.", video: "https://www.youtube.com/results?search_query=side+plank+form" },
      { name: "Pallof Press", sets: "3", reps: "12 each side", tip: "Anti-rotation exercise. Press out slowly, resist the cable's pull.", video: "https://www.youtube.com/results?search_query=pallof+press+form" },
      { name: "Bicycle Crunches", sets: "3", reps: "20 each side", tip: "Slow and deliberate. Rotate fully, don't just nod your head.", video: "https://www.youtube.com/results?search_query=bicycle+crunch+form" },
    ],
  },
};

const days = [
  {
    id: "push1", label: "Day 1", tag: "PUSH", color: "#FF6B6B",
    focus: "Chest · Shoulders · Triceps · Abs A", absCircuit: "A",
    exercises: [
      { name: "Barbell Bench Press", sets: "4", reps: "6–8", mins: 5, tip: "Arch slightly, drive feet into floor. Bar touches lower chest.", video: "https://www.youtube.com/results?search_query=barbell+bench+press+form" },
      { name: "Incline Dumbbell Press", sets: "3", reps: "8–10", mins: 4, tip: "Set bench to 30–45°. Keep wrists neutral, elbows at 75°.", video: "https://www.youtube.com/results?search_query=incline+dumbbell+press+form" },
      { name: "Overhead Press", sets: "3", reps: "8–10", mins: 4, tip: "Brace core, don't flare elbows. Bar travels in front of face.", video: "https://www.youtube.com/results?search_query=overhead+press+form" },
      { name: "Lateral Raises", sets: "3", reps: "12–15", mins: 3, tip: "Slight forward lean. Lead with elbows, light weight & strict form.", video: "https://www.youtube.com/results?search_query=lateral+raises+form" },
      { name: "Tricep Pushdowns", sets: "3", reps: "10–12", mins: 3, tip: "Keep elbows pinned to sides. Fully extend and squeeze at bottom.", video: "https://www.youtube.com/results?search_query=tricep+pushdown+form" },
      { name: "Overhead Tricep Extension", sets: "2", reps: "12–15", mins: 3, tip: "Keep upper arms close to head. Full stretch at top.", video: "https://www.youtube.com/results?search_query=overhead+tricep+extension+form" },
    ],
  },
  {
    id: "pull1", label: "Day 2", tag: "PULL", color: "#4ECDC4",
    focus: "Back · Biceps · Rear Delts · Abs B", absCircuit: "B",
    exercises: [
      { name: "Deadlift", sets: "4", reps: "5–6", mins: 6, tip: "Neutral spine, bar over mid-foot. Push floor away, don't pull bar up.", video: "https://www.youtube.com/results?search_query=deadlift+form+tutorial" },
      { name: "Weighted Pull-Ups", sets: "3", reps: "6–8", mins: 5, tip: "Full hang at bottom, chin clears bar. Slow on the way down.", video: "https://www.youtube.com/results?search_query=pull+ups+form+tutorial" },
      { name: "Cable Rows", sets: "3", reps: "8–10", mins: 4, tip: "Sit tall, drive elbows back past torso. Squeeze shoulder blades.", video: "https://www.youtube.com/results?search_query=cable+row+form" },
      { name: "Face Pulls", sets: "3", reps: "12–15", mins: 3, tip: "Pull to forehead, elbows high. Great for shoulder health.", video: "https://www.youtube.com/results?search_query=face+pulls+form" },
      { name: "Barbell Curl", sets: "3", reps: "10–12", mins: 3, tip: "No swinging. Full extension at bottom, squeeze hard at top.", video: "https://www.youtube.com/results?search_query=barbell+curl+form" },
      { name: "Hammer Curls", sets: "2", reps: "12–15", mins: 3, tip: "Neutral grip throughout. Works brachialis for arm thickness.", video: "https://www.youtube.com/results?search_query=hammer+curl+form" },
    ],
  },

  {
    id: "legs1", label: "Day 3", tag: "LEGS", color: "#FFE66D",
    focus: "Quads · Hamstrings · Glutes · Calves", absCircuit: null,
    exercises: [
      { name: "Barbell Back Squat", sets: "4", reps: "6–8", mins: 6, tip: "High or low bar — pick one and commit. Break at hips and knees together.", video: "https://www.youtube.com/results?search_query=barbell+back+squat+form" },
      { name: "Romanian Deadlift", sets: "3", reps: "8–10", mins: 5, tip: "Soft knee bend, hinge at hips. Feel stretch in hamstrings, not lower back.", video: "https://www.youtube.com/results?search_query=romanian+deadlift+form" },
      { name: "Leg Press", sets: "3", reps: "10–12", mins: 4, tip: "Feet shoulder-width. Don't lock knees at top. Full range of motion.", video: "https://www.youtube.com/results?search_query=leg+press+form" },
      { name: "Walking Lunges", sets: "3", reps: "12 each", mins: 4, tip: "Long stride, back knee nearly touches floor. Keep torso upright.", video: "https://www.youtube.com/results?search_query=walking+lunges+form" },
      { name: "Leg Curl", sets: "3", reps: "10–12", mins: 4, tip: "Point toes slightly inward. Full contraction, slow eccentric.", video: "https://www.youtube.com/results?search_query=leg+curl+machine+form" },
      { name: "Standing Calf Raises", sets: "4", reps: "15–20", mins: 4, tip: "Full stretch at bottom, full contraction at top. Pause at peak.", video: "https://www.youtube.com/results?search_query=standing+calf+raises+form" },
    ],
  },
  {
    id: "push2", label: "Day 4", tag: "PUSH", color: "#FF6B6B",
    focus: "Volume Focus · Chest · Shoulders · Triceps · Abs C", absCircuit: "C",
    exercises: [
      { name: "Incline Barbell Press", sets: "4", reps: "8–10", mins: 5, tip: "Slightly wider grip than flat bench. Control the descent.", video: "https://www.youtube.com/results?search_query=incline+barbell+press+form" },
      { name: "Cable Chest Flyes", sets: "3", reps: "12–15", mins: 3, tip: "Set cables at chest height. Slight bend in elbows throughout.", video: "https://www.youtube.com/results?search_query=cable+chest+fly+form" },
      { name: "Dumbbell Shoulder Press", sets: "3", reps: "10–12", mins: 4, tip: "Neutral grip variation reduces shoulder strain. Full range.", video: "https://www.youtube.com/results?search_query=dumbbell+shoulder+press+form" },
      { name: "Cable Lateral Raises", sets: "3", reps: "15", mins: 3, tip: "Cable keeps tension at the bottom unlike dumbbells. Go light.", video: "https://www.youtube.com/results?search_query=cable+lateral+raise+form" },
      { name: "Skull Crushers", sets: "3", reps: "10–12", mins: 3, tip: "Lower bar to forehead. Elbows stay fixed, pointing to ceiling.", video: "https://www.youtube.com/results?search_query=skull+crushers+form" },
      { name: "Dips", sets: "2", reps: "To failure", mins: 3, tip: "Lean slightly forward for chest emphasis. Full lockout at top.", video: "https://www.youtube.com/results?search_query=dips+chest+form" },
    ],
  },
  {
    id: "pull2", label: "Day 5", tag: "PULL", color: "#4ECDC4",
    focus: "Volume Focus · Back · Biceps · Abs A", absCircuit: "A",
    exercises: [
      { name: "Barbell Row", sets: "4", reps: "6–8", mins: 5, tip: "Hinged 45° forward. Drive bar to belly button, not chest.", video: "https://www.youtube.com/results?search_query=barbell+row+form" },
      { name: "Lat Pulldown", sets: "3", reps: "10–12", mins: 4, tip: "Slight lean back, pull to upper chest. Initiate with lats.", video: "https://www.youtube.com/results?search_query=lat+pulldown+form" },
      { name: "Single-Arm DB Row", sets: "3", reps: "10–12", mins: 4, tip: "Brace on bench. Row to hip, not shoulder. Full stretch at bottom.", video: "https://www.youtube.com/results?search_query=single+arm+dumbbell+row+form" },
      { name: "Reverse Pec Deck", sets: "3", reps: "12–15", mins: 3, tip: "Targets rear delts. Keep arms parallel to floor, squeeze back.", video: "https://www.youtube.com/results?search_query=reverse+pec+deck+rear+delt" },

      { name: "Incline DB Curl", sets: "3", reps: "10–12", mins: 3, tip: "Full stretch on incline hits long head of bicep. Go slow.", video: "https://www.youtube.com/results?search_query=incline+dumbbell+curl+form" },
      { name: "Cable Curl", sets: "2", reps: "15", mins: 3, tip: "Low pulley. Constant tension throughout full range of motion.", video: "https://www.youtube.com/results?search_query=cable+curl+form" },
    ],
  },
  {
    id: "legs2", label: "Day 6", tag: "LEGS", color: "#FFE66D",
    focus: "Posterior Focus · Hamstrings · Glutes · Abs B", absCircuit: "B",
    exercises: [
      { name: "Romanian Deadlift", sets: "4", reps: "6–8", mins: 5, tip: "Heavier than Day 3. Control the eccentric — 3 seconds down.", video: "https://www.youtube.com/results?search_query=romanian+deadlift+form" },
      { name: "Hack Squat", sets: "3", reps: "8–10", mins: 5, tip: "Feet low and narrow for quad focus. Full depth, stay controlled.", video: "https://www.youtube.com/results?search_query=hack+squat+form" },
      { name: "Bulgarian Split Squat", sets: "3", reps: "10 each", mins: 5, tip: "Hardest leg exercise. Front foot further out = more glute.", video: "https://www.youtube.com/results?search_query=bulgarian+split+squat+form" },
      { name: "Lying Leg Curl", sets: "3", reps: "10–12", mins: 4, tip: "Curl all the way up, squeeze at peak. Slow 3-second negative.", video: "https://www.youtube.com/results?search_query=lying+leg+curl+form" },
      { name: "Hip Thrust", sets: "3", reps: "10–12", mins: 4, tip: "Chin to chest, drive through heels. Full extension at top.", video: "https://www.youtube.com/results?search_query=barbell+hip+thrust+form" },
      { name: "Seated Calf Raises", sets: "4", reps: "15–20", mins: 4, tip: "Soleus focus (bent knee). Pause 2s at top and bottom.", video: "https://www.youtube.com/results?search_query=seated+calf+raise+form" },
    ],
  },
];

const ABS_MINS = 12;
const WARMUP_MINS = 5;

const deloadDays = days.map(day => ({
  ...day,
  exercises: day.exercises.map(ex => ({
    ...ex,
    sets: String(Math.max(2, parseInt(ex.sets) - 1)),
    reps: ex.reps.includes("failure") ? "8–10" : ex.reps,
    tip: ex.tip + " (Deload: reduce weight by ~40–50%, focus on form.)",
  })),
}));

const tagColors = { PUSH: "#FF6B6B", PULL: "#4ECDC4", LEGS: "#FFE66D" };


const WORKOUT_TARGET = 60;
const ABS_TARGET = 30;

function getDuration(day) {
  const main = day.exercises.reduce((s, ex) => s + (ex.mins || 4), 0);
  return WARMUP_MINS + main + (day.absCircuit ? ABS_MINS : 0);
}

function DurationBar({ day }) {
  const hasAbs = !!day.absCircuit;
  const mainMins = WARMUP_MINS + day.exercises.reduce((s, ex) => s + (ex.mins || 4), 0);
  const absMins = hasAbs ? ABS_MINS : 0;
  const total = mainMins + absMins;

  if (!hasAbs) {
    // Simple single bar targeting 90 min
    const target = 90;
    const pct = Math.min(100, (total / target) * 100);
    const over = total > target;
    const color = over ? "#FFB347" : "#A8E6CF";
    return (
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <span style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>Est. Duration</span>
          <span style={{ fontSize: 13, fontWeight: "bold", color }}>{total} min {over ? "⚠️" : "✓"}</span>
        </div>
        <div style={{ height: 5, background: "#1e1e1e", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#333", marginTop: 3 }}>
          <span>0</span><span>45 min</span><span>90 min</span>

        </div>
      </div>
    );
  }

  // Split bar: 60 min workout + 30 min abs
  const workoutPct = Math.min(100, (mainMins / WORKOUT_TARGET) * 100);
  const absPct = Math.min(100, (absMins / ABS_TARGET) * 100);
  const workoutOver = mainMins > WORKOUT_TARGET;
  const absOver = absMins > ABS_TARGET;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>Est. Duration</span>
        <span style={{ fontSize: 13, fontWeight: "bold", color: "#A8E6CF" }}>{total} min total</span>
      </div>

      {/* Workout bar */}
      <div style={{ marginBottom: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: workoutOver ? "#FFB347" : "#A8E6CF" }} />
            <span style={{ fontSize: 11, color: "#666" }}>Workout</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: "bold", color: workoutOver ? "#FFB347" : "#A8E6CF" }}>
            {mainMins} / {WORKOUT_TARGET} min {workoutOver ? "⚠️" : "✓"}
          </span>
        </div>
        <div style={{ height: 5, background: "#1e1e1e", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${workoutPct}%`, background: `linear-gradient(90deg, ${workoutOver ? "#FFB347" : "#A8E6CF"}88, ${workoutOver ? "#FFB347" : "#A8E6CF"})`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>

      </div>

      {/* Abs bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: absOver ? "#FFB347" : "#C77DFF" }} />
            <span style={{ fontSize: 11, color: "#666" }}>Abs</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: "bold", color: absOver ? "#FFB347" : "#C77DFF" }}>
            {absMins} / {ABS_TARGET} min {absOver ? "⚠️" : "✓"}
          </span>
        </div>
        <div style={{ height: 5, background: "#1e1e1e", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${absPct}%`, background: `linear-gradient(90deg, ${absOver ? "#FFB347" : "#C77DFF"}88, ${absOver ? "#FFB347" : "#C77DFF"})`, borderRadius: 3, transition: "width 0.4s" }} />
        </div>
      </div>
    </div>
  );
}

// Set tick dots component
function SetTracker({ totalSets, completedSets, color, onToggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
      <span style={{ fontSize: 11, color: "#555", marginRight: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sets</span>
      {Array.from({ length: totalSets }).map((_, i) => {
        const done = i < completedSets;
        return (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onToggle(i); }}

            style={{
              width: 32, height: 32, borderRadius: "50%", border: `2px solid ${done ? color : "#333"}`,
              background: done ? color : "transparent",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.18s", flexShrink: 0,
              boxShadow: done ? `0 0 8px ${color}55` : "none",
            }}
          >
            {done && (
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#0D0D0D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        );
      })}
      <span style={{ fontSize: 11, color: completedSets === totalSets ? color : "#444", marginLeft: 2, fontWeight: completedSets === totalSets ? "bold" : "normal" }}>
        {completedSets}/{totalSets}
      </span>
    </div>
  );
}

export default function WorkoutApp() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [activeSection, setActiveSection] = useState("main");
  // checkedSets[dayId][section][exIndex] = number of completed sets
  const [checkedSets, setCheckedSets] = useState({});

  const currentWeek = weeks[selectedWeek];

  const isDeload = currentWeek.type === "deload";
  const activeDays = isDeload ? deloadDays : days;
  const currentDay = activeDays[selectedDay];
  const circuit = currentDay?.absCircuit ? absCircuits[currentDay.absCircuit] : null;
  const duration = selectedDay < 6 ? getDuration(currentDay) : null; // kept for tab display

  const exerciseList = activeSection === "abs" && circuit ? circuit.exercises : currentDay?.exercises;
  const activeColor = activeSection === "abs" ? "#C77DFF" : currentDay?.color;

  function getSetsKey(dayId, section, exIndex) {
    return `${dayId}__${section}__${exIndex}`;
  }

  function getCompletedSets(dayId, section, exIndex) {
    return checkedSets[getSetsKey(dayId, section, exIndex)] || 0;
  }

  function handleToggleSet(dayId, section, exIndex, setIndex, totalSets) {
    const key = getSetsKey(dayId, section, exIndex);
    const current = checkedSets[key] || 0;
    // Clicking the next unchecked set checks it; clicking the last checked set unchecks it
    let next;
    if (setIndex === current) {
      next = current + 1; // check next
    } else if (setIndex === current - 1) {
      next = current - 1; // uncheck last
    } else {
      next = setIndex + 1; // jump to clicked
    }
    next = Math.max(0, Math.min(next, totalSets));
    setCheckedSets(prev => ({ ...prev, [key]: next }));
  }


  // Calculate overall day progress
  function getDayProgress(day, section) {
    if (!day) return { done: 0, total: 0 };
    const list = section === "abs" && day.absCircuit ? absCircuits[day.absCircuit].exercises : day.exercises;
    let done = 0, total = 0;
    list.forEach((ex, i) => {
      const sets = parseInt(ex.sets);
      total += sets;
      done += Math.min(getCompletedSets(day.id, section, i), sets);
    });
    return { done, total };
  }

  const mainProgress = selectedDay < 6 ? getDayProgress(currentDay, "main") : null;
  const absProgress = selectedDay < 6 && circuit ? getDayProgress(currentDay, "abs") : null;

  const allMainDone = mainProgress && mainProgress.done === mainProgress.total && mainProgress.total > 0;
  const allAbsDone = absProgress && absProgress.done === absProgress.total && absProgress.total > 0;
  const workoutComplete = allMainDone && (!circuit || allAbsDone);

  function resetDay() {
    if (!currentDay) return;
    const newState = { ...checkedSets };
    const allExercises = [...currentDay.exercises, ...(circuit ? circuit.exercises : [])];
    allExercises.forEach((_, i) => {
      const sec = i < currentDay.exercises.length ? "main" : "abs";
      const exI = i < currentDay.exercises.length ? i : i - currentDay.exercises.length;
      delete newState[getSetsKey(currentDay.id, sec, exI)];
    });
    setCheckedSets(newState);
  }


  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", fontFamily: "'Georgia', serif", color: "#F0EDE8", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "24px 18px 14px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#666", marginBottom: 3, textTransform: "uppercase" }}>6-Day Push · Pull · Legs + Abs</div>
        <div style={{ fontSize: 23, fontWeight: "bold", letterSpacing: "-0.02em" }}>Muscle Building Program</div>
        <div style={{ display: "flex", gap: 7, marginTop: 13, overflowX: "auto", paddingBottom: 2 }}>
          {weeks.map((w, i) => {
            const accent = w.type === "deload" ? "#A8E6CF" : w.type === "overload" ? "#FFB347" : "#C8B89A";
            const active = selectedWeek === i;
            return (
              <button key={i} onClick={() => setSelectedWeek(i)} style={{
                flexShrink: 0, padding: "6px 11px", borderRadius: 6, cursor: "pointer",
                fontFamily: "'Georgia', serif", transition: "all 0.2s",
                border: active ? `1.5px solid ${accent}` : "1.5px solid #262626",
                background: active ? `${accent}15` : "transparent",
                color: active ? accent : "#555",
              }}>
                <div style={{ fontWeight: "bold", fontSize: 12, marginBottom: 1 }}>{w.label}</div>
                <div style={{ fontSize: 10, opacity: 0.75 }}>{w.intensity}</div>
              </button>
            );
          })}
        </div>
        {isDeload && (
          <div style={{ marginTop: 10, padding: "8px 11px", background: "rgba(168,230,207,0.06)", border: "1px solid rgba(168,230,207,0.18)", borderRadius: 8, fontSize: 12, color: "#A8E6CF", lineHeight: 1.5 }}>
            🌿 <strong>Deload Week:</strong> ~50% weight, 1 fewer set. Same exercises, low intensity. Recover and come back stronger.
          </div>
        )}
      </div>


      {/* Day Tabs */}
      <div style={{ display: "flex", overflowX: "auto", background: "#0D0D0D", borderBottom: "1px solid #1a1a1a", padding: "0 12px" }}>
        {activeDays.map((day, i) => {
          const dp = getDayProgress(day, "main");
          const ap = day.absCircuit ? getDayProgress(day, "abs") : { done: 0, total: 0 };
          const totalDone = dp.done + ap.done;
          const totalAll = dp.total + ap.total;
          const dayDone = totalAll > 0 && totalDone === totalAll;
          return (
            <button key={i} onClick={() => { setSelectedDay(i); setExpandedExercise(null); setActiveSection("main"); }} style={{
              flexShrink: 0, padding: "10px 13px", background: "transparent", border: "none",
              borderBottom: selectedDay === i ? `2px solid ${tagColors[day.tag]}` : "2px solid transparent",
              color: selectedDay === i ? tagColors[day.tag] : "#484848",
              cursor: "pointer", fontSize: 12, fontFamily: "'Georgia', serif",
              fontWeight: selectedDay === i ? "bold" : "normal", transition: "all 0.2s",
              position: "relative",
            }}>
              <div style={{ fontSize: 10, marginBottom: 2, opacity: 0.65 }}>{day.label}</div>
              {day.tag}
              {dayDone && <div style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: "#A8E6CF" }} />}
            </button>
          );
        })}
        <button onClick={() => { setSelectedDay(6); setExpandedExercise(null); }} style={{
          flexShrink: 0, padding: "10px 13px", background: "transparent", border: "none",
          borderBottom: selectedDay === 6 ? "2px solid #555" : "2px solid transparent",
          color: selectedDay === 6 ? "#888" : "#383838",
          cursor: "pointer", fontSize: 12, fontFamily: "'Georgia', serif", transition: "all 0.2s",
        }}>
          <div style={{ fontSize: 10, marginBottom: 2, opacity: 0.65 }}>Day 7</div>
          REST

        </button>
      </div>

      <div style={{ padding: "15px 15px" }}>
        {selectedDay === 6 ? (
          <div style={{ textAlign: "center", padding: "50px 18px", background: "#111", borderRadius: 16, border: "1px solid #1e1e1e" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🛌</div>
            <div style={{ fontSize: 21, fontWeight: "bold", marginBottom: 7 }}>Rest & Recovery</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 290, margin: "0 auto" }}>
              Muscle grows during rest, not during training. Sleep 7–9 hours, stay hydrated, and hit your protein target.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, maxWidth: 265, margin: "22px auto 0" }}>
              {["🧘 Light stretching or yoga", "🚶 Easy 20-min walk", "🧊 Contrast shower for recovery", "📖 Log your lifts from the week"].map((t, i) => (
                <div key={i} style={{ padding: "9px 12px", background: "#161616", borderRadius: 8, fontSize: 12, color: "#666", textAlign: "left", border: "1px solid #222" }}>{t}</div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Workout Complete Banner */}
            {workoutComplete && (
              <div style={{
                padding: "14px 16px", marginBottom: 13,
                background: "linear-gradient(135deg, rgba(168,230,207,0.12), rgba(168,230,207,0.06))",
                border: "1px solid rgba(168,230,207,0.35)", borderRadius: 12,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ fontSize: 28 }}>🏆</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#A8E6CF" }}>Session Complete!</div>
                  <div style={{ fontSize: 12, color: "#6baa8a", marginTop: 2 }}>Every set done. Great work today.</div>
                </div>

                <button onClick={resetDay} style={{
                  marginLeft: "auto", padding: "6px 11px", borderRadius: 7, border: "1px solid rgba(168,230,207,0.25)",
                  background: "transparent", color: "#A8E6CF", fontSize: 11, cursor: "pointer", fontFamily: "'Georgia', serif",
                }}>Reset</button>
              </div>
            )}

            {/* Day Card */}
            <div style={{ padding: "15px", background: "#111", borderRadius: 13, border: `1px solid ${currentDay.color}1a`, borderLeft: `3px solid ${currentDay.color}`, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, flexWrap: "wrap" }}>
                <span style={{ background: `${currentDay.color}1a`, color: currentDay.color, fontSize: 10, fontWeight: "bold", letterSpacing: "0.14em", padding: "3px 9px", borderRadius: 20, border: `1px solid ${currentDay.color}33` }}>{currentDay.tag}</span>
                {circuit && <span style={{ background: "rgba(199,125,255,0.09)", color: "#C77DFF", fontSize: 10, padding: "3px 9px", borderRadius: 20, border: "1px solid rgba(199,125,255,0.25)" }}>+ ABS</span>}
                {isDeload && <span style={{ background: "rgba(168,230,207,0.07)", color: "#A8E6CF", fontSize: 10, padding: "3px 9px", borderRadius: 20, border: "1px solid rgba(168,230,207,0.2)" }}>DELOAD</span>}
              </div>
              <div style={{ fontSize: 17, fontWeight: "bold" }}>{currentDay.label}</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{currentDay.focus}</div>
              <DurationBar day={currentDay} />

              {/* Overall progress */}
              {mainProgress && mainProgress.total > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { label: "Main", ...mainProgress, color: currentDay.color },
                      ...(absProgress ? [{ label: "Abs", ...absProgress, color: "#C77DFF" }] : []),
                    ].map(p => (
                      <div key={p.label} style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 10, color: "#555" }}>{p.label}</span>
                          <span style={{ fontSize: 10, color: p.done === p.total ? p.color : "#444", fontWeight: "bold" }}>{p.done}/{p.total} sets</span>
                        </div>
                        <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>

                          <div style={{ height: "100%", width: `${p.total > 0 ? (p.done / p.total) * 100 : 0}%`, background: p.color, borderRadius: 2, transition: "width 0.3s" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section Toggle */}
            {circuit && (
              <div style={{ display: "flex", gap: 6, marginBottom: 11, background: "#0D0D0D", borderRadius: 9, padding: 3, border: "1px solid #1a1a1a" }}>
                {[
                  { id: "main", label: `💪 Main · ${mainProgress?.done}/${mainProgress?.total}` },
                  { id: "abs", label: `🔥 Abs · ${absProgress?.done}/${absProgress?.total}` },
                ].map(sec => (
                  <button key={sec.id} onClick={() => { setActiveSection(sec.id); setExpandedExercise(null); }} style={{
                    flex: 1, padding: "9px 8px", borderRadius: 7, border: "none", cursor: "pointer",
                    background: activeSection === sec.id ? (sec.id === "abs" ? "rgba(199,125,255,0.13)" : "rgba(255,255,255,0.05)") : "transparent",
                    color: activeSection === sec.id ? (sec.id === "abs" ? "#C77DFF" : "#F0EDE8") : "#484848",
                    fontFamily: "'Georgia', serif", fontSize: 12, fontWeight: activeSection === sec.id ? "bold" : "normal",
                    transition: "all 0.2s",
                  }}>{sec.label}</button>
                ))}
              </div>
            )}

            {/* Abs Banner */}
            {activeSection === "abs" && circuit && (
              <div style={{ padding: "11px 13px", marginBottom: 11, background: "rgba(199,125,255,0.06)", borderRadius: 9, border: "1px solid rgba(199,125,255,0.18)", borderLeft: "3px solid #C77DFF" }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: "#C77DFF", marginBottom: 2 }}>{circuit.label}</div>
                <div style={{ fontSize: 12, color: "#777" }}>{circuit.note}</div>

                <div style={{ fontSize: 11, color: "#444", marginTop: 5 }}>Do this after your main workout. Rest 45–60 sec between sets.</div>
              </div>
            )}

            {/* Exercise List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {exerciseList.map((ex, i) => {
                const isOpen = expandedExercise === i;
                const totalSets = parseInt(ex.sets);
                const completedSets = getCompletedSets(currentDay.id, activeSection, i);
                const exDone = completedSets >= totalSets;

                return (
                  <div key={i} style={{
                    background: exDone ? `${activeColor}08` : "#111",
                    borderRadius: 11, overflow: "hidden",
                    border: exDone ? `1px solid ${activeColor}33` : isOpen ? `1px solid ${activeColor}44` : "1px solid #1a1a1a",
                    transition: "all 0.25s",
                  }}>
                    <button onClick={() => setExpandedExercise(isOpen ? null : i)} style={{
                      width: "100%", padding: "14px", background: "transparent", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                        {/* Number / check indicator */}
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                          background: exDone ? activeColor : `${activeColor}14`,
                          border: `2px solid ${exDone ? activeColor : activeColor + "38"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.25s",
                          boxShadow: exDone ? `0 0 10px ${activeColor}44` : "none",

                        }}>
                          {exDone ? (
                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                              <path d="M1.5 5L5 8.5L11.5 1.5" stroke="#0D0D0D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <span style={{ fontSize: 12, color: activeColor, fontWeight: "bold", fontFamily: "'Georgia', serif" }}>{i + 1}</span>
                          )}
                        </div>
                        <div style={{ textAlign: "left", minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: "bold", color: exDone ? "#888" : "#F0EDE8", textDecoration: exDone ? "line-through" : "none", transition: "all 0.2s" }}>{ex.name}</div>
                          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{ex.sets} sets · {ex.reps} reps</div>
                        </div>
                      </div>
                      {/* Mini set dots preview */}
                      <div style={{ display: "flex", gap: 3, alignItems: "center", flexShrink: 0 }}>
                        {Array.from({ length: totalSets }).map((_, si) => (
                          <div key={si} style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: si < completedSets ? activeColor : "#2a2a2a",
                            transition: "background 0.2s",
                          }} />
                        ))}
                      </div>
                      <div style={{ color: isOpen ? activeColor : "#333", fontSize: 17, flexShrink: 0, transition: "transform 0.2s, color 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</div>
                    </button>

                    {/* Set Tracker (always visible inline) */}
                    <div style={{ padding: "0 14px 12px" }}>
                      <SetTracker
                        totalSets={totalSets}
                        completedSets={completedSets}

                        color={activeColor}
                        onToggle={(setIndex) => handleToggleSet(currentDay.id, activeSection, i, setIndex, totalSets)}
                      />
                    </div>

                    {isOpen && (
                      <div style={{ padding: "0 14px 14px", borderTop: "1px solid #181818", paddingTop: 12 }}>
                        <div style={{ display: "flex", gap: 7, marginBottom: 10, flexWrap: "wrap" }}>
                          {[`${ex.sets} sets`, `${ex.reps} reps`, ...(isDeload ? ["~50% weight"] : [])].map((pill, pi) => (
                            <div key={pi} style={{
                              padding: "5px 10px", borderRadius: 20, fontSize: 11,
                              background: pi === 2 ? "rgba(168,230,207,0.07)" : `${activeColor}10`,
                              border: `1px solid ${pi === 2 ? "rgba(168,230,207,0.18)" : activeColor + "28"}`,
                              color: pi === 2 ? "#A8E6CF" : activeColor,
                            }}>{pill}</div>
                          ))}
                        </div>
                        <div style={{ padding: "9px 11px", background: "#0D0D0D", borderRadius: 7, fontSize: 13, color: "#888", lineHeight: 1.65, marginBottom: 10, borderLeft: `2px solid ${activeColor}44` }}>
                          💡 {isDeload ? `${ex.tip.split("(Deload:")[0].trim()} — Reduce weight ~40–50%, focus on form.` : ex.tip}
                        </div>
                        <a href={ex.video} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 12px", background: "rgba(255,50,50,0.07)", border: "1px solid rgba(255,50,50,0.16)", borderRadius: 7, fontSize: 12, color: "#FF6B6B", textDecoration: "none", fontFamily: "'Georgia', serif" }}>
                          ▶ Watch Form on YouTube
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Week Note */}
            {!isDeload && (

              <div style={{ marginTop: 16, padding: "11px 13px", background: "#111", borderRadius: 9, border: "1px solid #1a1a1a", fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                {currentWeek.type === "overload"
                  ? "🔺 Week 3 — Progressive Overload: add 2.5–5kg on main lifts or 1–2 more reps vs Week 1."
                  : "💪 Weeks 1 & 2 — Normal Load: establish your working weights and nail your form."}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
