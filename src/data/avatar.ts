interface Avatar {
    id: number;
    name: string;
    image: string;
    voices: {
        en: string;
        hi: string;
        mr: string;
    };
}
export const Avatars : Avatar[] = [
    {
        id: 1,
        name: "ananya",
        image: "https://res.cloudinary.com/heatherlead/image/upload/v1742641320/ft6muoalremyzvtz7epg.png",
        voices: {
            en: "en-IN-AnanyaNeural",
            hi: "hi-IN-AnanyaNeural",
            mr: "mr-IN-AarohiNeural",
        },
    },
    {
        id: 2,
        name: "kunal",
        image: "https://res.cloudinary.com/heatherlead/image/upload/v1742641320/wv762gdi8slwikbyf77p.png",
        voices: {
            en: "en-IN-KunalNeural",
            hi: "hi-IN-KunalNeural",
            mr: "mr-IN-ManoharNeural",
        },
    },
];

export const Styles = {
    advertisementUpbeat: "advertisement_upbeat",
    affectionate: "affectionate",
    angry: "angry",
    assistant: "assistant",
    calm: "calm",
    chat: "chat",
    cheerful: "cheerful",
    customerService: "customerservice",
    depressed: "depressed",
    disgruntled: "disgruntled",
    documentaryNarration: "documentary-narration",
    embarrassed: "embarrassed",
    empathetic: "empathetic",
    envious: "envious",
    excited: "excited",
    fearful: "fearful",
    friendly: "friendly",
    gentle: "gentle",
    hopeful: "hopeful",
    lyrical: "lyrical",
    narrationProfessional: "narration-professional",
    narrationRelaxed: "narration-relaxed",
    newscast: "newscast",
    newscastCasual: "newscast-casual",
    newscastFormal: "newscast-formal",
    poetryReading: "poetry-reading",
    sad: "sad",
    serious: "serious",
    shouting: "shouting",
    sportsCommentary: "sports_commentary",
    sportsCommentaryExcited: "sports_commentary_excited",
    whispering: "whispering",
    terrified: "terrified",
    unfriendly: "unfriendly",
};
  