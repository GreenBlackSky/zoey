# Zoey (theory) — roadmap

Planned, not built yet. How paths, lessons, videos and drills work in
general is in `../honmoon/docs/ROADMAP.md`.

Zoey already has a Learn tab (the staff, rhythm, intervals, the scale
explorer, scale degrees, vocabulary). Those pages move to the shared lesson
format and get arranged into a path of six stages, together with today's
drills (reading, names and keys, the ear, scales, rhythm levels).

## The path

**1. First steps**
- the staff in treble and bass clef, landmark notes
- note names and accidentals
- whole, half and quarter notes and rests; 4/4
- drills: staff reading in a small range, rhythm level 1

**2. Foundations**
- ledger lines
- eighths, dots, ties; 3/4
- half and whole steps; how the major scale is built
- key signatures with few sharps or flats
- intervals up to a fifth, by name

**3. Keys and intervals**
- all key signatures; the circle of fifths
- relative minor keys
- every interval, by name and by ear
- triads: major, minor, diminished, augmented
- scale degrees and movable do

**4. Harmony**
- the chords of a key (I to vii°), Roman numerals
- seventh chords
- common progressions and cadences
- ear: chord quality, cadence type

**5. Rhythm and form**
- sixteenths, syncopation, triplets
- 6/8 and compound time
- song form: verse, chorus, bridge; reading a lead sheet

**6. Advanced**
- modes; pentatonic and blues scales
- secondary dominants and borrowed chords
- alto and tenor clefs; transposition
- odd time signatures

## Exercises

- **Knowledge** for every lesson
- existing drills, assigned to stages
- new: name the key signature · find a key on the circle of fifths · chord
  to Roman numeral in a given key · triad quality by ear · cadence by ear

## Placement test

Offered when the path is first opened (optional). Most useful here, since
much of the early material may already be familiar.

## Code

Zoey has almost no code of its own; its screens are the engine's. The deep
refactors that matter most here are in the engine's roadmap
(`../honmoon/docs/ROADMAP.md`, "Code: deep refactors"), especially the two
6/8 rhythm bugs (Zoey has the rhythm-reading drills) and splitting the
drill screen.

## Google backend

Planned, not started (design in `../honmoon/docs/ROADMAP.md`): this app on
its own Firebase Hosting site as an installable PWA, optional Google
sign-in, and progress synced through Firestore so it follows you between
devices. Without signing in, everything keeps working as now.
