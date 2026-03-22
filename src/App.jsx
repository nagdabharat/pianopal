import { useState, useEffect, useRef, useCallback } from "react";

const SONGS = [
  // Kids Classics
  {id:1,title:"Twinkle Twinkle",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"You just played the C major scale — the most important scale in piano!"},
  {id:2,title:"Happy Birthday",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:375},{note:"C4",dur:125},{note:"D4",dur:500},{note:"C4",dur:500},{note:"F4",dur:500},{note:"E4",dur:1000},{note:"C4",dur:375},{note:"C4",dur:125},{note:"D4",dur:500},{note:"C4",dur:500},{note:"G4",dur:500},{note:"F4",dur:1000},{note:"C4",dur:375},{note:"C4",dur:125},{note:"C5",dur:500},{note:"A4",dur:500},{note:"F4",dur:500},{note:"E4",dur:500},{note:"D4",dur:1000},{note:"A#4",dur:375},{note:"A#4",dur:125},{note:"A4",dur:500},{note:"F4",dur:500},{note:"G4",dur:500},{note:"F4",dur:1000}],fact:"This song uses skips — jumping over notes — a key piano technique!"},
  {id:3,title:"Mary Had a Little Lamb",category:"Kids Classic",difficulty:1,notes:[{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:800},{note:"D4",dur:400},{note:"D4",dur:400},{note:"D4",dur:800},{note:"E4",dur:400},{note:"G4",dur:400},{note:"G4",dur:800},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"This melody moves mostly by steps — each note is right next to the previous one!"},
  {id:4,title:"Baby Shark",category:"Kids Classic",difficulty:1,notes:[{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"B4",dur:600},{note:"B4",dur:300},{note:"B4",dur:300},{note:"B4",dur:300},{note:"B4",dur:300},{note:"B4",dur:300},{note:"C5",dur:600},{note:"C5",dur:300},{note:"C5",dur:300},{note:"C5",dur:300},{note:"C5",dur:300},{note:"C5",dur:300},{note:"B4",dur:300},{note:"A4",dur:600},{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"B4",dur:600}],fact:"Baby Shark uses just 3 notes — A, B, and C. Simple patterns make catchy songs!"},
  {id:5,title:"Hot Cross Buns",category:"Kids Classic",difficulty:1,notes:[{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"C4",dur:200},{note:"C4",dur:200},{note:"C4",dur:200},{note:"C4",dur:200},{note:"D4",dur:200},{note:"D4",dur:200},{note:"D4",dur:200},{note:"D4",dur:200},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"Hot Cross Buns only uses 3 notes — E, D, C. One of the simplest songs ever written!"},
  {id:6,title:"Baa Baa Black Sheep",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"G4",dur:800},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"Same melody as Twinkle Twinkle and the Alphabet Song — one melody, three songs!"},
  {id:7,title:"Old MacDonald",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:400},{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"G4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"C4",dur:400},{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"Old MacDonald uses a simple pattern that repeats — repetition is a key tool in songwriting!"},
  {id:8,title:"Row Row Row Your Boat",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:600},{note:"C4",dur:600},{note:"C4",dur:400},{note:"D4",dur:200},{note:"E4",dur:600},{note:"E4",dur:400},{note:"D4",dur:200},{note:"E4",dur:400},{note:"F4",dur:200},{note:"G4",dur:800},{note:"C5",dur:300},{note:"C5",dur:300},{note:"C5",dur:300},{note:"G4",dur:300},{note:"G4",dur:300},{note:"G4",dur:300},{note:"E4",dur:300},{note:"E4",dur:300},{note:"E4",dur:300},{note:"C4",dur:300},{note:"C4",dur:300},{note:"C4",dur:300},{note:"G4",dur:400},{note:"F4",dur:200},{note:"E4",dur:400},{note:"D4",dur:200},{note:"C4",dur:800}],fact:"This song builds upward step by step — composers call that an ascending scale run!"},
  {id:9,title:"Wheels on the Bus",category:"Kids Classic",difficulty:1,notes:[{note:"G4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:800},{note:"G4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"Uses call-and-response structure — a technique used in lots of pop and jazz music!"},
  {id:10,title:"Itsy Bitsy Spider",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"G4",dur:300},{note:"A4",dur:600},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:600},{note:"A4",dur:300},{note:"G4",dur:600},{note:"F4",dur:600},{note:"C4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"G4",dur:300},{note:"A4",dur:600},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:600}],fact:"Starts with a 4th leap (C to F) right at the start — a musical interval jump!"},
  {id:11,title:"ABC Song",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"The ABC Song shares its melody with Twinkle Twinkle — they're the exact same tune!"},
  {id:12,title:"If You're Happy",category:"Kids Classic",difficulty:1,notes:[{note:"C4",dur:300},{note:"C4",dur:300},{note:"F4",dur:600},{note:"F4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:600},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:600},{note:"C4",dur:300},{note:"C4",dur:300},{note:"F4",dur:600},{note:"F4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:600}],fact:"In triple feel — you can tap your foot 3 times per measure!"},
  // Disney
  {id:13,title:"Let It Go",category:"Disney",difficulty:2,notes:[{note:"A4",dur:400},{note:"A4",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"E5",dur:800},{note:"D5",dur:800},{note:"A4",dur:400},{note:"A4",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"F5",dur:800},{note:"E5",dur:800},{note:"A4",dur:400},{note:"A4",dur:400},{note:"E5",dur:400},{note:"D5",dur:600},{note:"C5",dur:400},{note:"A4",dur:800},{note:"A4",dur:400},{note:"C5",dur:400},{note:"D5",dur:400},{note:"C5",dur:400},{note:"A4",dur:800}],fact:"Let It Go is in Ab major — a key that uses lots of black keys called flats!"},
  {id:14,title:"A Whole New World",category:"Disney",difficulty:2,notes:[{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"C5",dur:800},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"C4",dur:800}],fact:"Uses stepwise motion — notes moving up or down by just one step at a time!"},
  {id:15,title:"Circle of Life",category:"Disney",difficulty:3,notes:[{note:"C4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"C5",dur:600},{note:"B4",dur:200},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"C5",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"C5",dur:400},{note:"D5",dur:600},{note:"C5",dur:200},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"Opens with a C major chord — C, E, and G together. That's your first chord!"},
  {id:16,title:"Under the Sea",category:"Disney",difficulty:2,notes:[{note:"C4",dur:400},{note:"C4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"E4",dur:800},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:800}],fact:"A calypso-style song — a Caribbean rhythm that makes you want to dance!"},
  {id:17,title:"Part of Your World",category:"Disney",difficulty:2,notes:[{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:600},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"A4",dur:800},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:600},{note:"C5",dur:400},{note:"D5",dur:400},{note:"C5",dur:400},{note:"B4",dur:800}],fact:"Climbs upward phrase by phrase — composers call that a rising sequence!"},
  {id:18,title:"Be Our Guest",category:"Disney",difficulty:2,notes:[{note:"G4",dur:300},{note:"G4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:300},{note:"A4",dur:600},{note:"G4",dur:600},{note:"G4",dur:300},{note:"A4",dur:300},{note:"B4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:800}],fact:"Be Our Guest is a waltz — a dance in 3/4 time. Count 1-2-3, 1-2-3!"},
  {id:19,title:"Hakuna Matata",category:"Disney",difficulty:2,notes:[{note:"C4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:800},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:800}],fact:"Has a bouncy syncopated rhythm — notes that land in unexpected places!"},
  {id:20,title:"How Far I'll Go",category:"Disney",difficulty:2,notes:[{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:600},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:800},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"C5",dur:600},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"Uses a rising 3rd leap (E to G) which creates a feeling of longing and wonder!"},
  {id:21,title:"Remember Me",category:"Disney",difficulty:2,notes:[{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:600},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:600},{note:"E4",dur:400},{note:"G4",dur:800}],fact:"From Coco — based on son jarocho, a beautiful Mexican folk tradition!"},
  {id:22,title:"When You Wish Upon a Star",category:"Disney",difficulty:2,notes:[{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:800},{note:"F4",dur:400},{note:"D4",dur:400},{note:"E4",dur:800},{note:"C4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:800},{note:"G4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"Starts with a rising 6th — a big leap that sounds magical and hopeful!"},
  {id:23,title:"Colors of the Wind",category:"Disney",difficulty:2,notes:[{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:800},{note:"D4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"Uses pentatonic notes — a 5-note scale found in music across every culture!"},
  {id:24,title:"I See the Light",category:"Disney",difficulty:2,notes:[{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"E4",dur:800},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"C5",dur:800}],fact:"From Tangled — uses a waltz rhythm in 3/4 time that feels like gently swaying!"},
  {id:25,title:"Reflection",category:"Disney",difficulty:2,notes:[{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"B4",dur:400},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"From Mulan — uses a pentatonic scale inspired by Chinese musical traditions!"},
  // Classical
  {id:26,title:"Ode to Joy",category:"Classical",difficulty:2,notes:[{note:"E4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"E4",dur:600},{note:"D4",dur:200},{note:"D4",dur:800},{note:"E4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"D4",dur:600},{note:"C4",dur:200},{note:"C4",dur:800}],fact:"Beethoven wrote this when completely deaf — he could only hear it in his mind!"},
  {id:27,title:"Fur Elise",category:"Classical",difficulty:3,notes:[{note:"E5",dur:300},{note:"D#5",dur:300},{note:"E5",dur:300},{note:"D#5",dur:300},{note:"E5",dur:300},{note:"B4",dur:300},{note:"D5",dur:300},{note:"C5",dur:300},{note:"A4",dur:600},{note:"C4",dur:300},{note:"E4",dur:300},{note:"A4",dur:300},{note:"B4",dur:600},{note:"E4",dur:300},{note:"G#4",dur:300},{note:"B4",dur:300},{note:"C5",dur:600},{note:"E4",dur:300},{note:"E5",dur:300},{note:"D#5",dur:300},{note:"E5",dur:300},{note:"D#5",dur:300},{note:"E5",dur:300},{note:"B4",dur:300},{note:"D5",dur:300},{note:"C5",dur:300},{note:"A4",dur:600}],fact:"Uses chromatic movement — half steps that give it a mysterious, haunting sound!"},
  {id:28,title:"Moonlight Sonata",category:"Classical",difficulty:3,notes:[{note:"G#4",dur:400},{note:"C5",dur:400},{note:"E5",dur:400},{note:"G#4",dur:400},{note:"C5",dur:400},{note:"E5",dur:400},{note:"G#4",dur:400},{note:"C5",dur:400},{note:"E5",dur:400},{note:"F#4",dur:400},{note:"C5",dur:400},{note:"E5",dur:400},{note:"F4",dur:400},{note:"C5",dur:400},{note:"E5",dur:400},{note:"F4",dur:400},{note:"B4",dur:400},{note:"D5",dur:400}],fact:"Uses a repeating broken chord pattern called an arpeggiated triplet!"},
  {id:29,title:"Canon in D",category:"Classical",difficulty:2,notes:[{note:"F#4",dur:500},{note:"E4",dur:500},{note:"D4",dur:500},{note:"C#4",dur:500},{note:"B4",dur:500},{note:"A4",dur:500},{note:"B4",dur:500},{note:"C#5",dur:500},{note:"D5",dur:500},{note:"C#5",dur:500},{note:"B4",dur:500},{note:"A4",dur:500},{note:"G4",dur:500},{note:"F#4",dur:500},{note:"G4",dur:500},{note:"A4",dur:500}],fact:"Pachelbel's Canon uses a bass line that repeats all the way through — a ground bass!"},
  // Folk
  {id:30,title:"Amazing Grace",category:"Folk",difficulty:1,notes:[{note:"C4",dur:400},{note:"E4",dur:600},{note:"G4",dur:200},{note:"E4",dur:600},{note:"G4",dur:400},{note:"A4",dur:800},{note:"G4",dur:400},{note:"E4",dur:600},{note:"C4",dur:200},{note:"E4",dur:800},{note:"D4",dur:800},{note:"C4",dur:400},{note:"E4",dur:600},{note:"G4",dur:200},{note:"E4",dur:600},{note:"G4",dur:400},{note:"A4",dur:800},{note:"G4",dur:800}],fact:"In 3/4 time — a waltz feel. You can feel 3 beats in each measure!"},
  {id:31,title:"Oh When the Saints",category:"Folk",difficulty:1,notes:[{note:"C4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:800},{note:"C4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:800},{note:"C4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:600},{note:"E4",dur:200},{note:"G4",dur:600},{note:"F4",dur:400},{note:"E4",dur:800},{note:"C4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"G4",dur:600},{note:"F4",dur:200},{note:"E4",dur:800}],fact:"One of the most famous jazz standards — musicians love to improvise over it!"},
  {id:32,title:"Scarborough Fair",category:"Folk",difficulty:2,notes:[{note:"A4",dur:600},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"G4",dur:600},{note:"A4",dur:400},{note:"C5",dur:800},{note:"A4",dur:400},{note:"B4",dur:400},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"In Dorian mode — an old medieval scale that sounds slightly mysterious!"},
  {id:33,title:"Danny Boy",category:"Folk",difficulty:2,notes:[{note:"G4",dur:400},{note:"C5",dur:600},{note:"C5",dur:200},{note:"C5",dur:400},{note:"D5",dur:400},{note:"E5",dur:600},{note:"C5",dur:200},{note:"E5",dur:400},{note:"D5",dur:600},{note:"C5",dur:400},{note:"B4",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:400},{note:"C5",dur:600},{note:"B4",dur:200},{note:"A4",dur:800}],fact:"Uses large interval leaps — jumping from low to high notes — which adds drama!"},
  // Nursery
  {id:34,title:"London Bridge",category:"Nursery",difficulty:1,notes:[{note:"G4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:600},{note:"D4",dur:300},{note:"E4",dur:300},{note:"F4",dur:600},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:600},{note:"G4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"F4",dur:300},{note:"G4",dur:600}],fact:"Uses quarter notes and half notes — the two most basic note values in music!"},
  {id:35,title:"Jingle Bells",category:"Nursery",difficulty:1,notes:[{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:800},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:800},{note:"E4",dur:400},{note:"G4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:800},{note:"F4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"G4",dur:800}],fact:"Starts with the same note 3 times — that repeated note is called an ostinato!"},
  // Pop
  {id:36,title:"Believer",category:"Pop",difficulty:2,notes:[{note:"A4",dur:300},{note:"A4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"D4",dur:600},{note:"A4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:600},{note:"A4",dur:300},{note:"G4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"D4",dur:600}],fact:"Uses a minor key — minor keys often sound dramatic and powerful!"},
  {id:37,title:"Happy (Pharrell)",category:"Pop",difficulty:2,notes:[{note:"F4",dur:300},{note:"A4",dur:300},{note:"F4",dur:300},{note:"F4",dur:300},{note:"A4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"D4",dur:600},{note:"F4",dur:300},{note:"A4",dur:300},{note:"F4",dur:300},{note:"G4",dur:600},{note:"F4",dur:300},{note:"A4",dur:300},{note:"F4",dur:300},{note:"E4",dur:300},{note:"D4",dur:600}],fact:"Uses a Mixolydian mode — a scale that sounds bright and funky, used in soul music!"},
  {id:38,title:"Shake It Off",category:"Pop",difficulty:2,notes:[{note:"E4",dur:300},{note:"E4",dur:300},{note:"G4",dur:300},{note:"G4",dur:300},{note:"A4",dur:600},{note:"G4",dur:300},{note:"E4",dur:300},{note:"D4",dur:300},{note:"E4",dur:300},{note:"G4",dur:600},{note:"E4",dur:300},{note:"G4",dur:300},{note:"A4",dur:300},{note:"G4",dur:300},{note:"E4",dur:600}],fact:"In G major — a very guitar-friendly key with lots of open strings!"},
  {id:39,title:"Roar",category:"Pop",difficulty:2,notes:[{note:"E4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:800},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"In C major — the simplest key with no sharps or flats!"},
  {id:40,title:"Counting Stars",category:"Pop",difficulty:2,notes:[{note:"A4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:800},{note:"A4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800}],fact:"Alternates between minor and major — creating tension and release!"},
  {id:41,title:"Someone Like You",category:"Pop",difficulty:2,notes:[{note:"A4",dur:500},{note:"E4",dur:500},{note:"F4",dur:500},{note:"D4",dur:500},{note:"E4",dur:500},{note:"A4",dur:500},{note:"B4",dur:500},{note:"A4",dur:500},{note:"G4",dur:500},{note:"F4",dur:800},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:800}],fact:"Uses a broken chord pattern in the left hand — called an Alberti bass!"},
  {id:42,title:"Shape of You",category:"Pop",difficulty:2,notes:[{note:"C#5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G#4",dur:400},{note:"F#4",dur:600},{note:"C#5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G#4",dur:400},{note:"E4",dur:800},{note:"F#4",dur:400},{note:"G#4",dur:400},{note:"A4",dur:400},{note:"B4",dur:800}],fact:"Uses a minor pentatonic scale — the same scale used in lots of blues music!"},
  {id:43,title:"Shallow",category:"Pop",difficulty:2,notes:[{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"B4",dur:400},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:800}],fact:"The big chorus changes key — that key change adds emotional impact!"},
  {id:44,title:"Blinding Lights",category:"Pop",difficulty:2,notes:[{note:"E4",dur:300},{note:"E4",dur:300},{note:"G4",dur:300},{note:"A4",dur:300},{note:"B4",dur:600},{note:"A4",dur:300},{note:"G4",dur:300},{note:"E4",dur:300},{note:"D4",dur:300},{note:"E4",dur:600},{note:"G4",dur:300},{note:"A4",dur:300},{note:"B4",dur:300},{note:"A4",dur:300},{note:"G4",dur:600}],fact:"Inspired by 1980s synth music — uses minor key with a driving beat!"},
  {id:45,title:"Levitating",category:"Pop",difficulty:2,notes:[{note:"F4",dur:400},{note:"A4",dur:400},{note:"C5",dur:400},{note:"A4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"F4",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"C5",dur:400},{note:"A4",dur:800}],fact:"In F major with a disco-influenced groove — feel the 4 beats per measure!"},
  {id:46,title:"Stay With Me",category:"Pop",difficulty:2,notes:[{note:"C4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800}],fact:"Uses a gospel-inspired chord progression — church music influence!"},
  // Video Game
  {id:47,title:"Minecraft Theme",category:"Video Game",difficulty:2,notes:[{note:"C5",dur:800},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:600},{note:"A4",dur:400},{note:"B4",dur:800},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:1000},{note:"A4",dur:600},{note:"B4",dur:400},{note:"C5",dur:800},{note:"B4",dur:400},{note:"A4",dur:800}],fact:"Minimalist music — simple notes with lots of space create a dreamy feeling!"},
  {id:48,title:"Super Mario Theme",category:"Video Game",difficulty:2,notes:[{note:"E5",dur:200},{note:"E5",dur:200},{note:"E5",dur:400},{note:"C5",dur:200},{note:"E5",dur:400},{note:"G5",dur:600},{note:"G4",dur:600},{note:"C5",dur:400},{note:"G4",dur:400},{note:"E4",dur:600},{note:"A4",dur:400},{note:"B4",dur:400},{note:"A#4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E5",dur:400},{note:"G5",dur:400},{note:"A5",dur:400},{note:"F5",dur:400},{note:"G5",dur:400},{note:"E5",dur:400},{note:"C5",dur:400},{note:"D5",dur:400},{note:"B4",dur:400}],fact:"In C major and uses staccato notes — short, detached notes that sound bouncy!"},
  {id:49,title:"Zelda Lullaby",category:"Video Game",difficulty:2,notes:[{note:"B4",dur:300},{note:"D5",dur:300},{note:"A5",dur:600},{note:"G5",dur:300},{note:"A5",dur:300},{note:"B4",dur:600},{note:"D5",dur:300},{note:"A5",dur:600},{note:"G5",dur:600},{note:"F#5",dur:800},{note:"B4",dur:300},{note:"D5",dur:300},{note:"A5",dur:600},{note:"G5",dur:600},{note:"E5",dur:800}],fact:"In G major with a 3/4 waltz rhythm that feels magical and mysterious!"},
  {id:50,title:"Pokemon Theme",category:"Video Game",difficulty:2,notes:[{note:"A4",dur:400},{note:"A4",dur:400},{note:"A4",dur:400},{note:"E4",dur:300},{note:"A4",dur:400},{note:"B4",dur:400},{note:"C5",dur:400},{note:"B4",dur:400},{note:"A4",dur:400},{note:"C5",dur:400},{note:"B4",dur:800},{note:"A4",dur:400},{note:"B4",dur:400},{note:"C5",dur:400},{note:"D5",dur:400},{note:"E5",dur:800}],fact:"In A major — a key popular for its bright, heroic, adventurous sound!"},
  {id:51,title:"Tetris Theme",category:"Video Game",difficulty:2,notes:[{note:"E5",dur:400},{note:"B4",dur:200},{note:"C5",dur:200},{note:"D5",dur:400},{note:"C5",dur:200},{note:"B4",dur:200},{note:"A4",dur:400},{note:"A4",dur:200},{note:"C5",dur:200},{note:"E5",dur:400},{note:"D5",dur:200},{note:"C5",dur:200},{note:"B4",dur:600},{note:"C5",dur:200},{note:"D5",dur:400},{note:"E5",dur:400},{note:"C5",dur:400},{note:"A4",dur:400},{note:"A4",dur:800}],fact:"A Russian folk song called Korobeiniki — one of the most played songs in history!"},
  // Hindi
  {id:52,title:"Tum Hi Ho",category:"Hindi",difficulty:2,notes:[{note:"E4",dur:600},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:600},{note:"E4",dur:400},{note:"D4",dur:800},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:800},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"E4",dur:800}],fact:"Tum Hi Ho from Aashiqui 2 (2013) is in a minor key — that's why it sounds so emotional!"},
  {id:53,title:"Kal Ho Na Ho",category:"Hindi",difficulty:2,notes:[{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:400},{note:"C5",dur:600},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:800},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:800}],fact:"Kal Ho Na Ho (2003) — the melody rises and falls like a wave, called a melodic arc!"},
  {id:54,title:"Chak De India",category:"Hindi",difficulty:1,notes:[{note:"C4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"C4",dur:800}],fact:"Chak De India (2007) uses a major key with a march-like rhythm — perfect for a sports anthem!"},
  {id:55,title:"Jai Ho",category:"Hindi",difficulty:1,notes:[{note:"D4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:600},{note:"F4",dur:800}],fact:"Jai Ho from Slumdog Millionaire (2008) blends Indian folk scales with western pop style!"},
  {id:56,title:"Rang De Basanti",category:"Hindi",difficulty:2,notes:[{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:400},{note:"A4",dur:400},{note:"B4",dur:600},{note:"A4",dur:400},{note:"G4",dur:800}],fact:"Rang De Basanti (2006) uses a Bhairavi-inspired scale — a classical Indian raga!"},
  {id:57,title:"Dil Se Re",category:"Hindi",difficulty:2,notes:[{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"E4",dur:600},{note:"G4",dur:400},{note:"A4",dur:800},{note:"B4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:800}],fact:"Dil Se (1998) uses Khamaj raga — one of the most popular ragas in Bollywood music!"},
  {id:58,title:"Barso Re",category:"Hindi",difficulty:2,notes:[{note:"G4",dur:300},{note:"A4",dur:300},{note:"B4",dur:300},{note:"C5",dur:300},{note:"B4",dur:600},{note:"A4",dur:300},{note:"G4",dur:300},{note:"E4",dur:600},{note:"G4",dur:300},{note:"A4",dur:300},{note:"B4",dur:300},{note:"A4",dur:300},{note:"G4",dur:600}],fact:"Barso Re from Guru (2007) — A.R. Rahman used Raag Megh Malhar, the rain raga of India!"},
  {id:59,title:"Lakshya",category:"Hindi",difficulty:1,notes:[{note:"C4",dur:400},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:400},{note:"A4",dur:600},{note:"G4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800},{note:"D4",dur:400},{note:"E4",dur:400},{note:"G4",dur:600},{note:"E4",dur:400},{note:"C4",dur:800}],fact:"The Lakshya title track (2004) uses a rising pentatonic scale — sounds uplifting and heroic!"},
  {id:60,title:"Vande Mataram",category:"Hindi",difficulty:1,notes:[{note:"C4",dur:400},{note:"E4",dur:400},{note:"F4",dur:400},{note:"G4",dur:600},{note:"F4",dur:400},{note:"E4",dur:400},{note:"C4",dur:800},{note:"G4",dur:400},{note:"A4",dur:400},{note:"G4",dur:400},{note:"F4",dur:400},{note:"E4",dur:400},{note:"D4",dur:400},{note:"C4",dur:800}],fact:"Vande Mataram by A.R. Rahman (1997) blends Carnatic classical music with modern pop!"},
];

const NOTE_FREQS = {
  C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392.00,A4:440.00,B4:493.88,
  C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880.00,B5:987.77,
  "C#4":277.18,"D#4":311.13,"F#4":369.99,"G#4":415.30,"A#4":466.16,
  "C#5":554.37,"D#5":622.25,"F#5":739.99,"G#5":830.61,"A#5":932.33
};

const NOTE_FINGER = {
  C4:1,D4:2,E4:3,F4:1,G4:2,A4:3,B4:4,
  C5:1,D5:2,E5:3,F5:1,G5:2,A5:3,B5:4,
  "C#4":2,"D#4":3,"F#4":2,"G#4":3,"A#4":4,
  "C#5":2,"D#5":3,"F#5":2,"G#5":3,"A#5":4,"A#4":4
};

const KEYS = [
  {note:"C4",type:"white",label:"C"},{note:"C#4",type:"black",label:"C#"},
  {note:"D4",type:"white",label:"D"},{note:"D#4",type:"black",label:"D#"},
  {note:"E4",type:"white",label:"E"},{note:"F4",type:"white",label:"F"},
  {note:"F#4",type:"black",label:"F#"},{note:"G4",type:"white",label:"G"},
  {note:"G#4",type:"black",label:"G#"},{note:"A4",type:"white",label:"A"},
  {note:"A#4",type:"black",label:"A#"},{note:"B4",type:"white",label:"B"},
  {note:"C5",type:"white",label:"C"},{note:"C#5",type:"black",label:"C#"},
  {note:"D5",type:"white",label:"D"},{note:"D#5",type:"black",label:"D#"},
  {note:"E5",type:"white",label:"E"},{note:"F5",type:"white",label:"F"},
  {note:"F#5",type:"black",label:"F#"},{note:"G5",type:"white",label:"G"},
  {note:"G#5",type:"black",label:"G#"},{note:"A5",type:"white",label:"A"},
  {note:"A#5",type:"black",label:"A#"},{note:"B5",type:"white",label:"B"}
];

const CATEGORIES = ["All","Kids Classic","Disney","Pop","Hindi","Classical","Folk","Nursery","Video Game","My Songs"];

const BADGE_DEFS = [
  {id:"first",label:"First Song",icon:"★",desc:"Completed your first song!"},
  {id:"perfect",label:"Perfect!",icon:"♛",desc:"3 stars on any song!"},
  {id:"streak3",label:"Hat Trick",icon:"♣",desc:"Completed 3 songs!"},
  {id:"streak10",label:"Superstar",icon:"♦",desc:"Completed 10 songs!"},
  {id:"explorer",label:"Explorer",icon:"✦",desc:"Tried My Songs mode!"},
  {id:"challenge",label:"Challenger",icon:"⚡",desc:"Completed Challenge mode!"},
  {id:"disney",label:"Disney Fan",icon:"✿",desc:"Played 5 Disney songs!"},
  {id:"classical",label:"Maestro",icon:"♪",desc:"Played all Classical songs!"},
  {id:"hindi",label:"Bollywood Star",icon:"✨",desc:"Played 3 Hindi songs!"},
  {id:"listener",label:"Piano Listener",icon:"🎙",desc:"Used mic to play!"},
];

function detectPitch(buffer, sampleRate) {
  const SIZE = buffer.length, MAX = Math.floor(SIZE/2);
  let rms = 0;
  for (let i=0;i<SIZE;i++) rms+=buffer[i]*buffer[i];
  rms = Math.sqrt(rms/SIZE);
  if (rms<0.01) return -1;
  let best=-1, bestCorr=0;
  for (let offset=0;offset<MAX;offset++) {
    let corr=0;
    for (let i=0;i<MAX;i++) corr+=Math.abs(buffer[i]-buffer[i+offset]);
    corr=1-corr/MAX;
    if (corr>bestCorr){bestCorr=corr;best=offset;}
  }
  return bestCorr>0.9&&best>0 ? sampleRate/best : -1;
}

function freqToNote(freq) {
  if (freq<=0) return null;
  let closest=null, minDiff=Infinity;
  for (const [note,f] of Object.entries(NOTE_FREQS)) {
    const d=Math.abs(f-freq);
    if (d<minDiff){minDiff=d;closest=note;}
  }
  return minDiff<20?closest:null;
}

function playTone(note, dur, audioCtx) {
  if (!audioCtx) return;
  const freq=NOTE_FREQS[note]; if(!freq) return;
  const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.type="triangle"; osc.frequency.value=freq;
  gain.gain.setValueAtTime(0.4,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+dur/1000);
  osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime+dur/1000);
}

function Stars({count}) {
  return <div style={{display:"flex",gap:4}}>{[1,2,3].map(i=><span key={i} style={{fontSize:20,color:i<=count?"#f59e0b":"#d1d5db"}}>★</span>)}</div>;
}

function Confetti() {
  const colors=["#f59e0b","#10b981","#6366f1","#ec4899","#3b82f6"];
  const pieces=Array.from({length:30},(_,i)=>({x:Math.random()*100,delay:Math.random()*0.8,color:colors[i%5],size:6+Math.random()*8}));
  return (
    <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999}}>
      {pieces.map((p,i)=><div key={i} style={{position:"absolute",left:`${p.x}%`,top:"-10px",width:p.size,height:p.size,background:p.color,borderRadius:Math.random()>0.5?"50%":"2px",animation:`fall 2s ${p.delay}s ease-in forwards`}}/>)}
      <style>{`@keyframes fall{to{transform:translateY(110vh) rotate(360deg);opacity:0}}`}</style>
    </div>
  );
}

export default function PianoPal() {
  const [screen,setScreen]=useState("home");
  const [selectedSong,setSelectedSong]=useState(null);
  const [gameMode,setGameMode]=useState(null);
  const [activeNote,setActiveNote]=useState(null);
  const [flashNote,setFlashNote]=useState(null);
  const [highlightNote,setHighlightNote]=useState(null);
  const [currentStep,setCurrentStep]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [paused,setPaused]=useState(false);
  const [waitingForInput,setWaitingForInput]=useState(false);
  const [score,setScore]=useState(0);
  const [mistakes,setMistakes]=useState(0);
  const [finished,setFinished]=useState(false);
  const [stars,setStars]=useState(0);
  const [showFact,setShowFact]=useState(false);
  const [showConfetti,setShowConfetti]=useState(false);
  const [progress,setProgress]=useState({});
  const [badges,setBadges]=useState([]);
  const [mySongs,setMySongs]=useState([]);
  const [searchQuery,setSearchQuery]=useState("");
  const [loadingSong,setLoadingSong]=useState(false);
  const [loadingMsg,setLoadingMsg]=useState("");
  const [searchError,setSearchError]=useState("");
  const [activeCat,setActiveCat]=useState("All");
  const [songSearch,setSongSearch]=useState("");
  const [micActive,setMicActive]=useState(false);
  const [micError,setMicError]=useState("");
  const [detectedNote,setDetectedNote]=useState(null);

  const audioRef=useRef(null);
  const timeoutRef=useRef(null);
  const pausedRef=useRef(false);
  const listenIndexRef=useRef(0);
  const listenSongRef=useRef(null);
  const micStreamRef=useRef(null);
  const analyserRef=useRef(null);
  const micRafRef=useRef(null);
  const waitingRef=useRef(false);
  const currentStepRef=useRef(0);
  const scoreRef=useRef(0);
  const mistakesRef=useRef(0);
  const selectedSongRef=useRef(null);
  const gameModeRef=useRef(null);
  const finishedRef=useRef(false);

  useEffect(()=>{
    try{audioRef.current=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}
    const saved=localStorage.getItem("pianopal_v2");
    if(saved){const d=JSON.parse(saved);setProgress(d.progress||{});setBadges(d.badges||[]);setMySongs(d.mySongs||[]);}
  },[]);

  useEffect(()=>{waitingRef.current=waitingForInput;},[waitingForInput]);
  useEffect(()=>{currentStepRef.current=currentStep;},[currentStep]);
  useEffect(()=>{scoreRef.current=score;},[score]);
  useEffect(()=>{mistakesRef.current=mistakes;},[mistakes]);
  useEffect(()=>{selectedSongRef.current=selectedSong;},[selectedSong]);
  useEffect(()=>{gameModeRef.current=gameMode;},[gameMode]);
  useEffect(()=>{finishedRef.current=finished;},[finished]);
  useEffect(()=>{pausedRef.current=paused;},[paused]);

  const save=(p,b,ms)=>localStorage.setItem("pianopal_v2",JSON.stringify({progress:p,badges:b,mySongs:ms}));

  const checkBadges=(newProg,curBadges,mode,usedMic)=>{
    let b=[...curBadges];
    const add=id=>{if(!b.includes(id))b.push(id);};
    const completed=Object.keys(newProg).length;
    if(completed>=1)add("first");
    if(completed>=3)add("streak3");
    if(completed>=10)add("streak10");
    if(mode==="challenge")add("challenge");
    if(usedMic)add("listener");
    if(SONGS.filter(s=>s.category==="Disney"&&newProg[s.id]).length>=5)add("disney");
    if(SONGS.filter(s=>s.category==="Classical").every(s=>newProg[s.id]))add("classical");
    if(SONGS.filter(s=>s.category==="Hindi"&&newProg[s.id]).length>=3)add("hindi");
    return b;
  };

  const playNoteUI=note=>{
    setActiveNote(note);
    playTone(note,300,audioRef.current);
    setTimeout(()=>setActiveNote(null),300);
  };

  const handleCorrect=useCallback((fromMic=false)=>{
    const song=selectedSongRef.current; if(!song)return;
    const next=currentStepRef.current+1;
    const newScore=scoreRef.current+1;
    scoreRef.current=newScore; setScore(newScore);
    setFlashNote({note:song.notes[currentStepRef.current].note,color:"#bbf7d0"});
    setTimeout(()=>setFlashNote(null),300);
    if(next>=song.notes.length){
      waitingRef.current=false; setWaitingForInput(false); setHighlightNote(null);
      finishSong(newScore,mistakesRef.current,song,fromMic||micActive);
    } else {
      currentStepRef.current=next; setCurrentStep(next);
      if(gameModeRef.current==="follow")setHighlightNote(song.notes[next].note);
    }
  },[micActive]);

  const handleWrong=useCallback(playedNote=>{
    const song=selectedSongRef.current; if(!song)return;
    const nm=mistakesRef.current+1; mistakesRef.current=nm; setMistakes(nm);
    if(playedNote){setFlashNote({note:playedNote,color:"#fecaca"});setTimeout(()=>setFlashNote(null),400);}
    setHighlightNote(song.notes[currentStepRef.current].note);
  },[]);

  const handleKeyPress=note=>{
    playNoteUI(note);
    if(!waitingRef.current||finishedRef.current||pausedRef.current)return;
    const song=selectedSongRef.current; if(!song)return;
    const expected=song.notes[currentStepRef.current].note;
    if(note===expected)handleCorrect(false); else handleWrong(note);
  };

  // --- Listen playback with pause support ---
  const scheduleListen=useCallback((song,startIdx)=>{
    if(startIdx>=song.notes.length){setPlaying(false);setHighlightNote(null);return;}
    listenIndexRef.current=startIdx;
    const n=song.notes[startIdx];
    setHighlightNote(n.note);
    playTone(n.note,n.dur,audioRef.current);
    setTimeout(()=>setHighlightNote(null),n.dur-50);
    timeoutRef.current=setTimeout(()=>{
      if(pausedRef.current)return;
      scheduleListen(song,startIdx+1);
    },n.dur+100);
  },[]);

  const startListen=song=>{
    listenIndexRef.current=0; listenSongRef.current=song;
    setCurrentStep(0); setPlaying(true); setPaused(false); setFinished(false);
    scheduleListen(song,0);
  };

  const togglePauseListen=()=>{
    if(!paused){
      clearTimeout(timeoutRef.current);
      setHighlightNote(null);
      setPaused(true); pausedRef.current=true;
    } else {
      setPaused(false); pausedRef.current=false;
      scheduleListen(listenSongRef.current,listenIndexRef.current+1);
    }
  };

  const startFollow=song=>{
    currentStepRef.current=0; scoreRef.current=0; mistakesRef.current=0;
    setCurrentStep(0); setScore(0); setMistakes(0); setFinished(false);
    setPaused(false); pausedRef.current=false;
    setWaitingForInput(true); waitingRef.current=true;
    setHighlightNote(song.notes[0].note);
  };

  const togglePauseFollow=()=>{
    if(!paused){
      setPaused(true); pausedRef.current=true;
      setWaitingForInput(false); waitingRef.current=false;
      setHighlightNote(null);
    } else {
      setPaused(false); pausedRef.current=false;
      setWaitingForInput(true); waitingRef.current=true;
      const song=selectedSongRef.current;
      if(song) setHighlightNote(song.notes[currentStepRef.current].note);
    }
  };

  const startChallenge=song=>{
    currentStepRef.current=0; scoreRef.current=0; mistakesRef.current=0;
    setCurrentStep(0); setScore(0); setMistakes(0); setFinished(false);
    setPaused(false); pausedRef.current=false;
    setWaitingForInput(true); waitingRef.current=true;
    setHighlightNote(null);
  };

  // Mic
  const startMicListening=useCallback(()=>{
    if(!analyserRef.current)return;
    const analyser=analyserRef.current;
    const buffer=new Float32Array(analyser.fftSize);
    let lastDetected=null, lastTime=0;
    const loop=()=>{
      micRafRef.current=requestAnimationFrame(loop);
      if(!waitingRef.current||finishedRef.current||pausedRef.current)return;
      analyser.getFloatTimeDomainData(buffer);
      const freq=detectPitch(buffer,audioRef.current.sampleRate);
      const note=freqToNote(freq);
      setDetectedNote(note);
      if(note&&note!==lastDetected&&Date.now()-lastTime>400){
        lastDetected=note; lastTime=Date.now();
        const song=selectedSongRef.current; if(!song)return;
        const expected=song.notes[currentStepRef.current].note;
        if(note===expected)handleCorrect(true); else handleWrong(note);
      }
    };
    loop();
  },[handleCorrect,handleWrong]);

  const stopMic=()=>{
    if(micRafRef.current)cancelAnimationFrame(micRafRef.current);
    if(micStreamRef.current)micStreamRef.current.getTracks().forEach(t=>t.stop());
    micStreamRef.current=null; analyserRef.current=null;
    setMicActive(false); setDetectedNote(null);
  };

  const toggleMic=async()=>{
    if(micActive){stopMic();return;}
    setMicError("");
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      micStreamRef.current=stream;
      const ctx=audioRef.current;
      if(ctx.state==="suspended")await ctx.resume();
      const source=ctx.createMediaStreamSource(stream);
      const analyser=ctx.createAnalyser(); analyser.fftSize=2048;
      source.connect(analyser); analyserRef.current=analyser;
      setMicActive(true); startMicListening();
    } catch(e){setMicError("Microphone access denied. Please allow mic permissions.");}
  };

  const finishSong=(sc,mis,song,usedMic=false)=>{
    finishedRef.current=true;
    const total=song.notes.length, pct=sc/total;
    const s=pct>=0.95?3:pct>=0.75?2:1;
    setStars(s); setFinished(true);
    if(s>=2){setShowConfetti(true);setTimeout(()=>setShowConfetti(false),2500);}
    setShowFact(false);
    const newProg={...progress,[song.id]:Math.max(progress[song.id]||0,s)};
    setProgress(newProg);
    let curBadges=checkBadges(newProg,badges,gameModeRef.current,usedMic);
    if(s===3&&!badges.includes("perfect"))curBadges=[...curBadges,"perfect"];
    setBadges(curBadges); save(newProg,curBadges,mySongs); stopMic();
  };

  const fetchSongFromAI=async()=>{
    if(!searchQuery.trim())return;
    setLoadingSong(true); setSearchError(""); setLoadingMsg("Searching for the song...");
    try{
      const resp=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          tools:[{type:"web_search_20250305",name:"web_search"}],
          messages:[{role:"user",content:`Return ONLY valid JSON for the melody of "${searchQuery}" simplified for an 8-year-old piano beginner. No markdown. Format: {"title":"...","category":"Custom","difficulty":2,"notes":[{"note":"C4","dur":500}],"fact":"one music theory fact"} Use only: C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5 G5 A5 B5 C#4 D#4 F#4 G#4 A#4 C#5 D#5 F#5 G#5 A#5. 12-20 notes, dur 250-1000ms.`}]})
      });
      const data=await resp.json();
      setLoadingMsg("Setting up the game...");
      const textBlock=data.content?.find(b=>b.type==="text");
      if(!textBlock)throw new Error("No response");
      const parsed=JSON.parse(textBlock.text.replace(/```json|```/g,"").trim());
      parsed.id=`custom_${Date.now()}`; parsed.category="My Songs";
      const updated=[parsed,...mySongs]; setMySongs(updated);
      let cb=[...badges]; if(!cb.includes("explorer"))cb.push("explorer");
      setBadges(cb); save(progress,cb,updated);
      setSearchQuery(""); setSelectedSong(parsed); selectedSongRef.current=parsed; setScreen("song");
    } catch(e){setSearchError("Couldn't find that song. Try a different title!");}
    setLoadingSong(false); setLoadingMsg("");
  };

  const resetGame=()=>{
    clearTimeout(timeoutRef.current); stopMic();
    setPlaying(false); setPaused(false); pausedRef.current=false;
    setWaitingForInput(false); waitingRef.current=false;
    setFinished(false); finishedRef.current=false;
    setCurrentStep(0); currentStepRef.current=0;
    setScore(0); scoreRef.current=0; setMistakes(0); mistakesRef.current=0;
    setHighlightNote(null); setShowFact(false); setGameMode(null);
    setFlashNote(null); setDetectedNote(null);
    listenIndexRef.current=0;
  };

  const allSongs=[...SONGS,...mySongs];
  const filteredSongs=allSongs.filter(s=>{
    const catOk=activeCat==="All"||(activeCat==="My Songs"?String(s.id).startsWith("custom"):s.category===activeCat);
    return catOk&&s.title.toLowerCase().includes(songSearch.toLowerCase());
  });
  const totalStars=Object.values(progress).reduce((a,b)=>a+b,0);

  const KeyboardUI=({showFinger=false})=>{
    const whites=KEYS.filter(k=>k.type==="white");
    const ww=42,bw=26,kh=130,bh=82,totalW=whites.length*ww;
    const blackOffsets={"C#4":29,"D#4":71,"F#4":155,"G#4":197,"A#4":239,"C#5":323,"D#5":365,"F#5":449,"G#5":491,"A#5":533};
    return (
      <div style={{overflowX:"auto",overflowY:"hidden",width:"100%"}}>
        <svg width={totalW} height={kh+8} style={{display:"block",margin:"0 auto",userSelect:"none"}}>
          {whites.map((k,i)=>{
            const isActive=activeNote===k.note,isHL=highlightNote===k.note,flash=flashNote?.note===k.note;
            const finger=showFinger&&isHL?NOTE_FINGER[k.note]:null;
            const fill=flash?flashNote.color:isHL?"#fbbf24":isActive?"#bfdbfe":"white";
            return (
              <g key={k.note} onClick={()=>handleKeyPress(k.note)} style={{cursor:"pointer"}}>
                <rect x={i*ww+1} y={0} width={ww-2} height={kh} rx={3} fill={fill} stroke="#9ca3af" strokeWidth={1}/>
                <text x={i*ww+ww/2} y={kh-10} textAnchor="middle" fontSize={9} fill={isHL?"#92400e":isActive?"#1e40af":"#6b7280"} fontWeight={isHL||isActive?"600":"400"}>{k.label}</text>
                {finger&&<><circle cx={i*ww+ww/2} cy={kh-30} r={10} fill="#f59e0b"/><text x={i*ww+ww/2} y={kh-26} textAnchor="middle" fontSize={11} fontWeight="600" fill="#78350f">{finger}</text></>}
              </g>
            );
          })}
          {KEYS.filter(k=>k.type==="black").map(k=>{
            const x=blackOffsets[k.note]; if(!x)return null;
            const isActive=activeNote===k.note,isHL=highlightNote===k.note,flash=flashNote?.note===k.note;
            const finger=showFinger&&isHL?NOTE_FINGER[k.note]:null;
            const fill=flash?flashNote.color:isHL?"#f59e0b":isActive?"#60a5fa":"#1f2937";
            return (
              <g key={k.note} onClick={()=>handleKeyPress(k.note)} style={{cursor:"pointer"}}>
                <rect x={x} y={0} width={bw} height={bh} rx={3} fill={fill}/>
                <text x={x+bw/2} y={bh-8} textAnchor="middle" fontSize={8} fill={isHL?"#1f2937":"#e5e7eb"}>{k.label}</text>
                {finger&&<><circle cx={x+bw/2} cy={bh-26} r={9} fill="#f59e0b"/><text x={x+bw/2} y={bh-22} textAnchor="middle" fontSize={10} fontWeight="600" fill="#78350f">{finger}</text></>}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // HOME
  if(screen==="home") return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
        <div style={{fontSize:34,marginBottom:4}}>🎹</div>
        <h1 style={{fontSize:24,fontWeight:500,margin:0,color:"var(--color-text-primary)"}}>Piano Pal</h1>
        <p style={{color:"var(--color-text-secondary)",margin:"4px 0 0",fontSize:13}}>Learn piano the fun way!</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:"1.5rem"}}>
        {[{label:"Stars earned",val:totalStars,icon:"★"},{label:"Songs played",val:Object.keys(progress).length,icon:"♪"},{label:"Badges",val:badges.length,icon:"♛"}].map(m=>(
          <div key={m.label} style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:"0.75rem",textAlign:"center"}}>
            <div style={{fontSize:16,marginBottom:2}}>{m.icon}</div>
            <div style={{fontSize:22,fontWeight:500,color:"var(--color-text-primary)"}}>{m.val}</div>
            <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>{m.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:"1.5rem"}}>
        {["Songs","My Songs","Badges"].map(tab=>(
          <button key={tab} onClick={()=>setScreen(tab==="Songs"?"songs":tab==="My Songs"?"mysongs":"badges")} style={{flex:1,padding:"10px 0",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",fontSize:13,fontWeight:500,color:"var(--color-text-primary)"}}>{tab}</button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <h2 style={{fontSize:14,fontWeight:500,color:"var(--color-text-secondary)",margin:0}}>Recent songs</h2>
        <button onClick={()=>setScreen("songs")} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"var(--color-text-secondary)"}}>See all {allSongs.length} →</button>
      </div>
      {allSongs.slice(0,4).map(song=>(
        <div key={song.id} onClick={()=>{setSelectedSong(song);selectedSongRef.current=song;resetGame();setScreen("song");}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",marginBottom:7,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",cursor:"pointer"}}>
          <div><div style={{fontWeight:500,fontSize:14,color:"var(--color-text-primary)"}}>{song.title}</div><div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{song.category} · {"⭐".repeat(song.difficulty)}</div></div>
          <div>{progress[song.id]?<Stars count={progress[song.id]}/>:<span style={{fontSize:12,color:"var(--color-text-secondary)"}}>New</span>}</div>
        </div>
      ))}
    </div>
  );

  // SONGS
  if(screen==="songs") return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",fontSize:13,padding:0,marginBottom:"1rem"}}>← Back</button>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem"}}>
        <h2 style={{fontSize:18,fontWeight:500,margin:0,color:"var(--color-text-primary)"}}>All Songs</h2>
        <span style={{fontSize:12,color:"var(--color-text-secondary)"}}>{filteredSongs.length} songs</span>
      </div>
      <input value={songSearch} onChange={e=>setSongSearch(e.target.value)} placeholder="Search songs..." style={{width:"100%",padding:"9px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",fontSize:13,marginBottom:"0.75rem",boxSizing:"border-box"}}/>
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6,marginBottom:"1rem"}}>
        {CATEGORIES.map(cat=>(
          <button key={cat} onClick={()=>setActiveCat(cat)} style={{padding:"5px 12px",borderRadius:20,border:`0.5px solid ${activeCat===cat?"#f59e0b":"var(--color-border-secondary)"}`,background:activeCat===cat?"#fef3c7":"var(--color-background-primary)",cursor:"pointer",fontSize:12,whiteSpace:"nowrap",color:activeCat===cat?"#92400e":"var(--color-text-secondary)",fontWeight:activeCat===cat?500:400}}>{cat}</button>
        ))}
      </div>
      {filteredSongs.map(song=>(
        <div key={song.id} onClick={()=>{setSelectedSong(song);selectedSongRef.current=song;resetGame();setScreen("song");}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",marginBottom:7,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",cursor:"pointer"}}>
          <div><div style={{fontWeight:500,fontSize:14,color:"var(--color-text-primary)"}}>{song.title}</div><div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{song.category} · {"⭐".repeat(song.difficulty)}</div></div>
          <div>{progress[song.id]?<Stars count={progress[song.id]}/>:<span style={{fontSize:12,color:"var(--color-text-secondary)"}}>New</span>}</div>
        </div>
      ))}
    </div>
  );

  // MY SONGS
  if(screen==="mysongs") return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",fontSize:13,padding:0,marginBottom:"1rem"}}>← Back</button>
      <h2 style={{fontSize:18,fontWeight:500,margin:"0 0 0.5rem",color:"var(--color-text-primary)"}}>My Songs</h2>
      <p style={{fontSize:13,color:"var(--color-text-secondary)",marginBottom:"1rem"}}>Type any song name and the AI will learn it for you!</p>
      <div style={{display:"flex",gap:8,marginBottom:"1rem"}}>
        <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchSongFromAI()} placeholder="e.g. Believer, Minecraft theme, Baby Shark..." style={{flex:1,padding:"9px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",fontSize:13}}/>
        <button onClick={fetchSongFromAI} disabled={loadingSong||!searchQuery.trim()} style={{padding:"9px 14px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",fontSize:13,fontWeight:500,color:"var(--color-text-primary)",opacity:loadingSong||!searchQuery.trim()?0.5:1}}>{loadingSong?"...":"Find it"}</button>
      </div>
      {loadingMsg&&<p style={{fontSize:13,color:"var(--color-text-secondary)",textAlign:"center",marginBottom:"1rem"}}>{loadingMsg}</p>}
      {searchError&&<p style={{fontSize:13,color:"#ef4444",marginBottom:"1rem"}}>{searchError}</p>}
      {mySongs.length===0&&!loadingSong&&<div style={{textAlign:"center",padding:"2rem",color:"var(--color-text-secondary)",fontSize:14}}>No custom songs yet. Search above to add your first one!</div>}
      {mySongs.map(song=>(
        <div key={song.id} onClick={()=>{setSelectedSong(song);selectedSongRef.current=song;resetGame();setScreen("song");}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",marginBottom:7,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",cursor:"pointer"}}>
          <div><div style={{fontWeight:500,fontSize:14,color:"var(--color-text-primary)"}}>{song.title}</div><div style={{fontSize:12,color:"var(--color-text-secondary)"}}>My Songs · {"⭐".repeat(song.difficulty||2)}</div></div>
          <div>{progress[song.id]?<Stars count={progress[song.id]}/>:<span style={{fontSize:12,color:"var(--color-text-secondary)"}}>New</span>}</div>
        </div>
      ))}
    </div>
  );

  // BADGES
  if(screen==="badges") return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"1.5rem 1rem",fontFamily:"var(--font-sans)"}}>
      <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",fontSize:13,padding:0,marginBottom:"1rem"}}>← Back</button>
      <h2 style={{fontSize:18,fontWeight:500,margin:"0 0 1rem",color:"var(--color-text-primary)"}}>Badges</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {BADGE_DEFS.map(b=>{
          const earned=badges.includes(b.id);
          return (
            <div key={b.id} style={{padding:"1rem",background:"var(--color-background-primary)",border:`0.5px solid ${earned?"#f59e0b":"var(--color-border-tertiary)"}`,borderRadius:"var(--border-radius-lg)",opacity:earned?1:0.4}}>
              <div style={{fontSize:22,marginBottom:4}}>{b.icon}</div>
              <div style={{fontWeight:500,fontSize:14,color:"var(--color-text-primary)"}}>{b.label}</div>
              <div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{b.desc}</div>
              {earned&&<div style={{fontSize:11,color:"#f59e0b",marginTop:4,fontWeight:500}}>Earned!</div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  // SONG SCREEN
  if(screen==="song"&&selectedSong){
    const song=selectedSong;
    const showFinger=gameMode==="listen"||gameMode==="follow";
    const showMicBtn=(gameMode==="follow"||gameMode==="challenge")&&!finished;
    const isListenMode=gameMode==="listen";
    const isFollowMode=gameMode==="follow";
    const canPause=(isListenMode&&playing)||(isFollowMode&&(waitingForInput||paused));
    const progress_pct=finished?100:waitingForInput?Math.round((currentStep/song.notes.length)*100):0;

    return (
      <div style={{maxWidth:640,margin:"0 auto",padding:"1rem",fontFamily:"var(--font-sans)"}}>
        {showConfetti&&<Confetti/>}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:"1rem"}}>
          <button onClick={()=>{resetGame();setScreen("home");}} style={{background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",fontSize:13,padding:0}}>← Home</button>
          <div style={{flex:1}}/>
          <span style={{fontSize:12,color:"var(--color-text-secondary)"}}>{song.category}</span>
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.75rem"}}>
          <div>
            <h2 style={{fontSize:19,fontWeight:500,margin:0,color:"var(--color-text-primary)"}}>{song.title}</h2>
            <div style={{fontSize:12,color:"var(--color-text-secondary)"}}>{"⭐".repeat(song.difficulty)} difficulty</div>
          </div>
          {progress[song.id]&&<Stars count={progress[song.id]}/>}
        </div>

        {!gameMode&&!finished&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:"1rem"}}>
            {[{key:"listen",label:"Listen",desc:"Watch & hear",icon:"▶"},{key:"follow",label:"Follow",desc:"Keys light up",icon:"✦"},{key:"challenge",label:"Challenge",desc:"No hints!",icon:"⚡"}].map(m=>(
              <div key={m.key} onClick={()=>{setGameMode(m.key);gameModeRef.current=m.key;if(m.key==="listen")startListen(song);else if(m.key==="follow")startFollow(song);else startChallenge(song);}} style={{padding:"12px 8px",textAlign:"center",background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-lg)",cursor:"pointer"}}>
                <div style={{fontSize:18,marginBottom:4}}>{m.icon}</div>
                <div style={{fontWeight:500,fontSize:13,color:"var(--color-text-primary)"}}>{m.label}</div>
                <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>{m.desc}</div>
              </div>
            ))}
          </div>
        )}

        {gameMode&&!finished&&(
          <div style={{marginBottom:"0.75rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:"var(--color-text-secondary)",marginBottom:4}}>
              <span style={{textTransform:"capitalize"}}>{gameMode} mode {paused&&"· Paused"}</span>
              <span>{currentStep}/{song.notes.length} notes</span>
            </div>
            <div style={{height:6,background:"var(--color-background-secondary)",borderRadius:3}}>
              <div style={{height:"100%",background:paused?"#9ca3af":"#f59e0b",borderRadius:3,width:`${progress_pct}%`,transition:"width 0.2s"}}/>
            </div>
            {(gameMode==="follow"||gameMode==="challenge")&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                <div style={{display:"flex",gap:16,fontSize:12}}>
                  <span style={{color:"#10b981"}}>✓ {score} correct</span>
                  <span style={{color:"#ef4444"}}>✗ {mistakes} mistakes</span>
                </div>
                {detectedNote&&<span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Hearing: {detectedNote}</span>}
              </div>
            )}
          </div>
        )}

        {showFinger&&gameMode&&!finished&&(
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:"0.5rem",padding:"5px 10px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>Fingers:</span>
            {["thumb","index","middle","ring","pinky"].map((f,i)=>(
              <span key={i} style={{fontSize:11,color:"var(--color-text-secondary)",display:"flex",alignItems:"center",gap:3}}>
                <span style={{background:"#fef3c7",borderRadius:"50%",display:"inline-flex",width:16,height:16,alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:500,color:"#92400e"}}>{i+1}</span>
                {f}
              </span>
            ))}
          </div>
        )}

        {finished&&(
          <div style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-lg)",padding:"1rem",marginBottom:"1rem",textAlign:"center"}}>
            <div style={{marginBottom:8}}><Stars count={stars}/></div>
            <div style={{fontWeight:500,fontSize:16,color:"var(--color-text-primary)",marginBottom:4}}>{stars===3?"Perfect! Amazing job!":stars===2?"Great playing!":"Keep practicing!"}</div>
            <div style={{fontSize:13,color:"var(--color-text-secondary)"}}>{score} / {song.notes.length} notes correct · {mistakes} mistakes</div>
            <button onClick={()=>setShowFact(f=>!f)} style={{marginTop:10,padding:"6px 14px",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",background:"transparent",cursor:"pointer",fontSize:12,color:"var(--color-text-secondary)"}}>{showFact?"Hide":"Did you know? 🎵"}</button>
            {showFact&&<div style={{marginTop:10,fontSize:13,color:"var(--color-text-primary)",background:"var(--color-background-primary)",padding:"10px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-tertiary)",textAlign:"left"}}>{song.fact}</div>}
            <div style={{display:"flex",gap:8,marginTop:12,justifyContent:"center"}}>
              <button onClick={resetGame} style={{padding:"8px 16px",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",background:"transparent",cursor:"pointer",fontSize:13,color:"var(--color-text-primary)"}}>Try again</button>
              <button onClick={()=>{resetGame();setScreen("songs");}} style={{padding:"8px 16px",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",background:"transparent",cursor:"pointer",fontSize:13,color:"var(--color-text-primary)"}}>More songs</button>
            </div>
          </div>
        )}

        {gameMode==="listen"&&playing&&!paused&&<div style={{textAlign:"center",marginBottom:"0.5rem",fontSize:13,color:"var(--color-text-secondary)"}}>Watch the keys light up! The number shows which finger to use.</div>}
        {gameMode==="follow"&&(waitingForInput||paused)&&!finished&&<div style={{textAlign:"center",marginBottom:"0.5rem",fontSize:13,color:"var(--color-text-secondary)"}}>{paused?"Paused — tap Resume to continue!":"Press the highlighted key using the numbered finger!"}</div>}
        {gameMode==="challenge"&&waitingForInput&&!finished&&<div style={{textAlign:"center",marginBottom:"0.5rem",fontSize:13,color:"var(--color-text-secondary)"}}>Note {currentStep+1} of {song.notes.length} — you got this!</div>}

        <KeyboardUI showFinger={showFinger}/>

        {gameMode&&!finished&&(
          <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:"0.75rem",flexWrap:"wrap"}}>
            {canPause&&(
              <button onClick={isListenMode?togglePauseListen:togglePauseFollow}
                style={{padding:"8px 20px",borderRadius:"var(--border-radius-md)",border:`1.5px solid ${paused?"#10b981":"var(--color-border-secondary)"}`,background:paused?"#d1fae5":"var(--color-background-primary)",cursor:"pointer",fontSize:13,fontWeight:500,color:paused?"#065f46":"var(--color-text-primary)"}}>
                {paused?"▶ Resume":"⏸ Pause"}
              </button>
            )}
            {showMicBtn&&(
              <button onClick={toggleMic}
                style={{padding:"8px 20px",borderRadius:"var(--border-radius-md)",border:`1.5px solid ${micActive?"#10b981":"var(--color-border-secondary)"}`,background:micActive?"#d1fae5":"var(--color-background-primary)",cursor:"pointer",fontSize:13,fontWeight:500,color:micActive?"#065f46":"var(--color-text-primary)"}}>
                {micActive?"🎙 Listening...":"🎙 Use real piano"}
              </button>
            )}
            <button onClick={resetGame} style={{padding:"8px 16px",border:"0.5px solid var(--color-border-secondary)",borderRadius:"var(--border-radius-md)",background:"transparent",cursor:"pointer",fontSize:13,color:"var(--color-text-secondary)"}}>Restart</button>
          </div>
        )}
        {micError&&<p style={{fontSize:12,color:"#ef4444",textAlign:"center",marginTop:6}}>{micError}</p>}
      </div>
    );
  }
  return null;
}